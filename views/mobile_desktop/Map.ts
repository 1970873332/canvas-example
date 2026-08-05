import CTXMap from "@goengine/canvas/src/map/CTX";
import HitMod, { HitModNode } from "@goengine/canvas/src/mod/Hit";
import BaseCTXNode, { BaseCTXNodeAny } from "@goengine/canvas/src/node/Base";
import Image from "@goengine/canvas/src/node/common/Image";
import Text from "@goengine/canvas/src/node/common/Text";
import Scroll from "@goengine/canvas/src/node/component/Scroll";
import Entrust, { EntrustAny } from "@goengine/canvas/src/node/advanced/Entrust";
import Group from "@goengine/canvas/src/node/wrap/Group";
import Value from "@goengine/core/src/object/attribute/Value";
import Vector2 from "@goengine/core/src/object/math/vector/Vector2";
import Vector3 from "@goengine/core/src/object/math/vector/Vector3";
import { EventState } from "@goengine/core/src/supplement/Event";
import { ArrayUtils } from "@goengine/core/src/util/Array";
import Interaction from "@goengine/web/src/control/Interaction";
import { Components } from "./type/Component";

export default class MobileDesktopMap extends CTXMap {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    /**
     * 交互
     */
    private interaction = new Interaction(this.canvas);
    /**
     * 命中
     */
    private hitMod = new HitMod(this.interaction);
    /**
     * 悬浮节点
     */
    private hoverNode = new Value<BaseCTXNode<any, any> | undefined>(
        void 0,
    ).bindCallback(this.change.bind(this));
    /**
     * 分页数据
     */
    private paginData = {
        /**
         * 分页节点
         */
        paginNode: new Value<EntrustAny | undefined>(void 0).bindCallback(
            this.paginChange.bind(this),
        ),
        /**
         * 分页控制节点
         */
        paginControls: Array<EntrustAny>(),
    };
    /**
     * 命中事件状态
     */
    private hitEventState = new EventState(
        this.hitMod,
        "active",
        this.handleHit.bind(this),
    );

    /**
     * 分析
     * @param list
     * @param parent
     */
    public analysis(
        list: Components.ComponentItem[],
        parent: BaseCTXNodeAny = this.scene,
    ): void {
        list.forEach((item) => {
            let node = this.obtain(item);

            if (!node) return;

            parent.add(node);

            if (node instanceof Image) {
                this.hitMod.moveNodes.add(node);
            } else if (node instanceof Scroll) node = node.group;

            item.children && this.analysis(item.children, node);
        });
    }
    /**
     * 获取
     * @param item
     * @returns
     */
    private obtain(item: Components.ComponentItem): BaseCTXNodeAny | void {
        const position = Vector3.fromArray(item.position);

        switch (item.type) {
            case "scene":
                // 特殊处理背景
                if (item.background) {
                    const { clientWidth, clientHeight } = this;
                    switch (item.backgroundType) {
                        case "video":
                            return this.obtain({
                                type: "video",
                                src: item.background,
                                size: [clientWidth, clientHeight],
                                autoplay: true,
                                controlled: false,
                            });
                        default:
                            return this.obtain({
                                type: "image",
                                src: item.background,
                                size: [clientWidth, clientHeight],
                                controlled: false,
                            });
                    }
                }
                break;
            case "scroll":
                const scroll = new Scroll(new HitMod(this.interaction), {
                    position,
                    controlled: item.controlled,
                    size: Vector2.fromArray(item.size),
                    group: {
                        size: Vector2.fromArray(item.group?.size),
                    },
                    slide: {
                        mode: "step",
                        constraint: "bound",
                        direction: Vector2.fromX(1),
                        damping: Vector2.fromScalar(50),
                    },
                });

                scroll.slideMod.index.bindCallback(({ x }) => {
                    this.paginData.paginNode.value =
                        this.paginData.paginControls[x];
                });

                return scroll;
            case "group":
                const group = new Group({
                    position,
                    size: Vector2.fromArray(item.size),
                    controlled: item.controlled ?? false,
                });

                return group;
            case "image":
                const image = new Image({
                    position,
                    controlled: item.controlled,
                    source: {
                        type: "img",
                        src: item.src,
                        mode: item.mode ?? "auto",
                        size: Vector2.fromArray(item.size),
                    },
                    style: { filter: item.filter },
                });

                return image;
            case "video":
                const video = new Image({
                    position,
                    controlled: item.controlled,
                    size: Vector2.fromArray(item.size),
                    source: {
                        type: "video",
                        src: item.src,
                        mode: item.mode ?? "auto",
                        size: Vector2.fromArray(item.size),
                    },
                });

                return video;
            case "text":
                const text = new Text({
                    position,
                    text: item.text,
                    controlled: item.controlled,
                    style: {
                        textAlign: item.align,
                        textBaseline: item.baseline,
                        font: `${item.size} sans-serif`,
                        fillStyle: item.color ?? "#fff",
                    },
                });

                return text;
            case "entrust":
                const list = item.components
                    .map((component) => this.obtain(component))
                    .filter((item) => item) as BaseCTXNode<any, any>[];
                const entrust = new Entrust({
                    position,
                    controlled: item.controlled,
                    targets: Object.fromEntries(
                        list.map((item, index) => [index, item]),
                    ),
                });
                this.paginData.paginNode.value ??= entrust;
                this.paginData.paginControls.push(entrust);
                return entrust;
        }
    }
    /**
     * 改变
     */
    private change(nv?: BaseCTXNodeAny, ov?: BaseCTXNodeAny): void {
        document.body.style.cursor = nv ? "pointer" : "default";
    }
    /**
     * 分页改变
     */
    private paginChange(nv?: EntrustAny, ov?: EntrustAny): void {
        nv?.toggle("1");
        ov?.toggle(Entrust.defaultKey);
    }
    /**
     * 处理命中
     */
    private handleHit({
        detail: { type, node, offset },
    }: CustomEvent<HitModNode>): void {
        switch (type) {
            case "move":
                this.hoverNode.value = node;
                break;
        }
    }

    protected addEvents(): void {
        super.addEvents();

        this.hitEventState.wake();
    }

    public destroy(): void {
        ArrayUtils.traverse(
            this.scene.children,
            (item) => item instanceof Image && item.clearRely(),
        );

        this.hitEventState.break();

        this.hoverNode.clearCallback();

        this.paginData.paginControls.length = 0;
        this.paginData.paginNode.clearCallback();

        this.hitMod.destroy();
        this.interaction.destroy();

        Object.assign(this, {
            hitMod: void 0,
            hoverNode: void 0,
            paginData: void 0,
            interaction: void 0,
            hitEventState: void 0,
        });

        super.destroy();
    }
}
