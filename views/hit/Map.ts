import CTXMap from "@goengine/canvas/src/map/CTX";
import HitMod, { HitModNode } from "@goengine/canvas/src/mod/Hit";
import Rect from "@goengine/canvas/src/node/shape/Rect";
import Euler from "@goengine/core/src/object/math/transfrom/Euler";
import Vector2 from "@goengine/core/src/object/math/vector/Vector2";
import Vector3 from "@goengine/core/src/object/math/vector/Vector3";
import { EventState } from "@goengine/core/src/supplement/Event";
import Interaction from "@goengine/web/src/control/Interaction";

/**
 * 命中地图
 */
export default class HitMap extends CTXMap {
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
     * 矩形
     */
    private rect = new Rect({
        radii: 20,
        size: Vector2.fromScalar(100),
        scale: new Vector3(0.5, 0.5, 1),
        rotation: Euler.fromZ(Math.PI / 4),
        position: new Vector3(100, 100),
        style: {
            fillStyle: "red",
        },
    });
    /**
     * 边框
     */
    private border = new Rect({
        style: { lineWidth: 2, strokeStyle: "white" },
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
     * 处理命中
     */
    private handleHit({
        detail: { type, node, offset },
    }: CustomEvent<HitModNode>): void {
        switch (type) {
            case "move":
                if (node) {
                    this.border.setConfig({
                        visible: true,
                        size: node.size,
                        position: node.position,
                        rotation: node.rotation,
                        scale: node.scale,
                    });
                } else this.border.visible = false;
                break;
        }
    }

    protected addEvents(): void {
        super.addEvents();

        const {
            hitEventState,
            hitMod: { moveNodes },
        } = this;

        // 添加移动节点监听
        moveNodes.add(this.rect);
        // 激活命中事件状态
        hitEventState.wake();
    }

    protected init(): void {
        this.scene.add(this.rect, this.border);
    }

    public destroy(): void {
        this.hitEventState.break();

        this.hitMod.destroy();
        this.interaction.destroy();

        Object.assign(this, {
            hitMod: void 0,
            rect: void 0,
            border: void 0,
            interaction: void 0,
            hitEventState: void 0,
        });

        super.destroy();
    }
}
