import CTXMap from "@goengine/canvas/src/map/CTX";
import HitMod, { HitModNode } from "@goengine/canvas/src/mod/Hit";
import Scroll from "@goengine/canvas/src/node/component/Scroll";
import Batch from "@goengine/canvas/src/node/advanced/Batch";
import Rect, { RectRule } from "@goengine/canvas/src/node/shape/Rect";
import { CheckUtils } from "@goengine/canvas/src/util/Check";
import { TransformUtils } from "@goengine/canvas/src/util/Transform";
import Vector2 from "@goengine/core/src/object/math/vector/Vector2";
import { EventState } from "@goengine/core/src/supplement/Event";
import { GridUtils } from "@goengine/core/src/util/Grid";
import Interaction from "@goengine/web/src/control/Interaction";

const UNIT_COUNT: number = 60 ** 2,
    UNIT_SIZE: number = 16;
/**
 * 批处理地图
 */
export default class BatchMap extends CTXMap {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    /**
     * 交互
     */
    private interaction = new Interaction(this.canvas);
    /**
     * 命中模块
     */
    private hitMod = new HitMod(this.interaction);
    /**
     * 滚动组件
     */
    private scroll = new Scroll(new HitMod(this.interaction), {
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
        size: Vector2.fromScalar(UNIT_SIZE),
        anchor: Vector2.fromScalar(UNIT_SIZE / 2),
    });
    /**
     * 批处理
     */
    private readonly batch = new Batch<Rect, RectRule>({
        sample: this.unitRect,
        offset: this.unitRect.anchor.clone(),
    });
    /**
     * 命中事件状态
     */
    private hitEventState = new EventState(
        this.hitMod,
        "active",
        this.handleHit.bind(this),
    );

    /**
     * 初始化规则
     */
    private initRules(): void {
        const { batch } = this,
            { size, rules, sample } = batch,
            { width, height } =
                // 构建规则
                GridUtils.buildSqrt(
                    UNIT_COUNT,
                    sample.size,
                    (index, position) => {
                        const rule: (typeof rules)[number] = {
                            position,
                            style: {
                                fillStyle: `hsl(${Math.random() * 360}, 100%, 50%)`,
                            },
                        };

                        // 设置规则
                        rules[index] = rule;
                    },
                );

        // 设置尺寸
        size.set(width, height);
    }
    /**
     * 更新批处理
     * @param param0
     */
    private updateBatch(point: Vector2): void {
        const { rules, sample, offset, worldMatrix } = this.batch,
            { path } = sample;

        for (const rule of rules.toReversed()) {
            const config = TransformUtils.generateByRule(
                    rule,
                    sample,
                    worldMatrix,
                ),
                hit = CheckUtils.checkHitPath2D(
                    point,
                    path,
                    TransformUtils.composeOffset(config, offset),
                );

            if (!hit) continue;

            rule.style = {
                fillStyle: "white",
            };

            break;
        }
    }
    /**
     * 处理命中
     */
    private handleHit({
        detail: { type, node, offset },
    }: CustomEvent<HitModNode>): void {
        switch (type) {
            case "move":
                node === this.batch && this.updateBatch(offset);
                break;
        }
    }

    protected init(): void {
        const { scene, batch, scroll } = this,
            { group } = scroll;

        // 初始化规则
        this.initRules();
        // 组适配
        group.adapt(batch);
        // 添加滚动组件
        scene.add(scroll);
    }

    protected update(time: DOMHighResTimeStamp): void {
        super.update(time);

        this.unitRect.rotation.z += 0.01;
    }

    protected addEvents(): void {
        super.addEvents();

        const {
            batch,
            hitEventState,
            hitMod: { moveNodes },
        } = this;

        // 添加移动节点监听
        moveNodes.add(batch);
        // 激活事件监听
        hitEventState.wake();
    }

    public resize(): void {
        super.resize();

        const {
            width,
            height,
            halfWidth,
            halfHeight,
            scroll: { size, position },
        } = this;

        // 设置滚动尺寸
        size.set(width, height);
        // 剧中滚动位置
        position.set(halfWidth - size.width / 2, halfHeight - size.height / 2);
    }

    public destroy(): void {
        this.batch.clearRely();
        this.scroll.clearRely();

        this.hitEventState.break();

        this.hitMod.destroy();
        this.interaction.destroy();

        Object.assign(this, {
            batch: void 0,
            scroll: void 0,
            hitMod: void 0,
            unitRect: void 0,
            interaction: void 0,
            hitEventState: void 0,
        });

        super.destroy();
    }
}
