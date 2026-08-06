import CTXMap from "@goengine/canvas/src/map/CTX";
import HitMod, { HitModNode } from "@goengine/canvas/src/mod/Hit";
import Batch, { BatchAny } from "@goengine/canvas/src/node/advanced/Batch";
import Scroll from "@goengine/canvas/src/node/component/Scroll";
import Snapshot from "@goengine/canvas/src/node/mutation/Snapshot";
import Rect, { RectRule } from "@goengine/canvas/src/node/shape/Rect";
import { CheckUtils } from "@goengine/canvas/src/util/Check";
import {
    TransformConfig,
    TransformUtils,
} from "@goengine/canvas/src/util/Transform";
import Matrix4 from "@goengine/core/src/object/math/matrix/Matrix4";
import Vector2 from "@goengine/core/src/object/math/vector/Vector2";
import Vector3 from "@goengine/core/src/object/math/vector/Vector3";
import { EventState } from "@goengine/core/src/supplement/Event";
import { GridUtils } from "@goengine/core/src/util/Grid";
import Interaction from "@goengine/web/src/control/Interaction";

const // 单元尺寸
    UNIT_SIZE: number = 16,
    // 锚点缩放
    ANCHOR_SCALE: number = 0.9;

/**
 * 嵌套批处理地图
 */
export default class NestedBatchMap extends CTXMap {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    /**
     * 交互
     */
    private readonly interaction = new Interaction(this.canvas);
    /**
     * 命中模块
     */
    private readonly hitMod = new HitMod(this.interaction);

    /**
     * 命中事件状态
     */
    private readonly hitEventState = new EventState(
        this.hitMod,
        "active",
        this.handleHit.bind(this),
    );

    /**
     * 滚动组件
     */
    private readonly scroll = new Scroll(new HitMod(this.interaction), {
        slide: {
            mode: "inertia",
            constraint: "bound",
            direction: Vector2.one(),
            damping: Vector2.fromScalar(50),
        },
    });

    /**
     * 单元矩形
     */
    private readonly unitRect = new Rect({
        radii: Math.sqrt(UNIT_SIZE),
        size: Vector2.fromScalar(UNIT_SIZE),
        scale: Vector3.fromScalar(ANCHOR_SCALE),
        anchor: Vector3.fromScalar((UNIT_SIZE * (1 - ANCHOR_SCALE)) / -2),
    });
    /**
     * 组件批处理
     */
    private readonly batchTemplate = new Batch<Rect, RectRule>({
        sample: this.unitRect,
    });
    /**
     * 组件快照
     */
    private readonly batchTemplateSnapshot = new Snapshot({
        target: this.batchTemplate,
    });
    /**
     * 组批处理
     */
    private readonly batchGroup = new Batch({
        sample: this.batchTemplateSnapshot,
    });
    /**
     * 组快照
     */
    private readonly batchGroupSnapshot = new Snapshot({
        target: this.batchGroup,
    });
    /**
     * 场景批处理
     */
    private readonly batchScene = new Batch({
        sample: this.batchGroupSnapshot,
    });
    /**
     * 场景快照
     */
    private readonly batchSceneSnapshot = new Snapshot({
        target: this.batchScene,
    });

    /**
     * 初始化规则
     * @param batch
     */
    private initRules<T extends BatchAny>(
        batch: T,
        count: number,
        callback?: (position: VectorObject.Vector2) => T["rules"][number],
    ): void {
        const { size, rules, sample } = batch,
            { width, height } =
                // 构建规则
                GridUtils.buildSqrt(count, sample.size, (index, position) => {
                    const rule: (typeof rules)[number] = callback?.(
                        position,
                    ) ?? {
                        position,
                    };

                    // 设置规则
                    rules[index] = rule;
                });

        // 设置尺寸
        size.set(width, height);
    }
    /**
     * 更新场景批处理
     * @param rule
     */
    private updateBatch(point: Vector2): void {
        const sceneReuslt = this.obtainHitRuleConfig(
            point,
            this.batchScene,
            this.batchSceneSnapshot.worldMatrix,
        );

        if (!sceneReuslt) return;

        const { config: groupConfig, rule: groupRule } = sceneReuslt,
            groupMatrix = TransformUtils.obtainMatrix(groupConfig),
            groupResult = this.obtainHitRuleConfig(
                point,
                this.batchGroup,
                groupMatrix,
            );

        if (!groupResult) return;

        const { config: templateConfig, rule: templateRule } = groupResult,
            templateMatrix = TransformUtils.obtainMatrix(templateConfig),
            templateResult = this.obtainHitRuleConfig(
                point,
                this.batchTemplate,
                templateMatrix,
            );

        if (!templateResult) return;

        const {
                batchTemplate: { sample },
            } = this,
            {
                size: { width, height },
            } = sample,
            { rule } = templateResult,
            ctx = this.batchSceneSnapshot.offscreen2D.obtainCtx()!;

        TransformUtils.transfroms(ctx, [
            TransformUtils.generateByRule(groupRule, this.batchGroup),
            TransformUtils.generateByRule(templateRule, this.batchTemplate),
            TransformUtils.generateByRule(rule, sample),
        ]);

        ctx.clearRect(0, 0, width, height);
        sample.draw(ctx, {
            fillStyle: "white",
        });
    }
    /**
     * 获取命中规则配置
     * @param param0
     * @param node
     * @param matrix
     * @returns
     */
    private obtainHitRuleConfig<T extends BatchAny>(
        point: VectorObject.Vector2,
        node: T,
        matrix?: Matrix4,
    ): { config: TransformConfig; rule: T["rules"][number] } | void {
        const { rules, sample, worldMatrix } = node,
            { path } = sample;

        for (const rule of rules) {
            const config = TransformUtils.generateByRule(
                    rule,
                    sample,
                    matrix ?? worldMatrix,
                ),
                hit = CheckUtils.checkHitPath2D(point, path, config);

            if (!hit) continue;

            return { config, rule };
        }
    }

    protected init(): void {
        const {
                scene,
                scroll,
                batchGroup,
                batchScene,
                batchTemplate,
                batchSceneSnapshot,
                batchGroupSnapshot,
                batchTemplateSnapshot,
            } = this,
            { group } = scroll;

        // 初始化规则/预渲染
        this.initRules(batchTemplate, 100, (position) => ({
            position,
            style: { fillStyle: `hsl(${Math.random() * 360}, 100%, 50%)` },
        }));
        batchTemplateSnapshot.syncSize(batchTemplate.size);

        this.initRules(batchGroup, 100);
        batchGroupSnapshot.syncSize(batchGroup.size);

        this.initRules(batchScene, 100);
        batchSceneSnapshot.syncSize(batchScene.size);

        // 适配
        group.adapt(batchSceneSnapshot);

        scene.add(scroll);
    }
    /**
     * 处理命中
     */
    private handleHit({
        detail: { type, node, offset },
    }: CustomEvent<HitModNode>): void {
        switch (type) {
            case "move":
                node === this.batchSceneSnapshot && this.updateBatch(offset);
                break;
        }
    }

    protected addEvents(): void {
        super.addEvents();
        const {
            batchSceneSnapshot,
            hitEventState,
            hitMod: { moveNodes },
        } = this;

        // 添加移动节点监听
        moveNodes.add(batchSceneSnapshot);
        // 激活命中事件状态
        hitEventState.wake();
    }

    public resize(): void {
        super.resize();

        const {
            width,
            height,
            halfWidth,
            halfHeight,
            batchSceneSnapshot,
            scroll: { size, position, group },
        } = this;

        // 设置滚动尺寸
        size.set(width, height);
        // 组适配
        group.adapt(batchSceneSnapshot);
        // 剧中滚动位置
        position.set(halfWidth - size.width / 2, halfHeight - size.height / 2);
    }

    public destroy(): void {
        super.destroy();

        this.hitEventState.break();

        this.hitMod.destroy();
        this.interaction.destroy();

        this.scroll.destroy(true);

        this.batchTemplateSnapshot.destroy(true);
        this.batchGroupSnapshot.destroy(true);
        this.batchSceneSnapshot.destroy(true);

        this.scene.clear(true);
    }
}
