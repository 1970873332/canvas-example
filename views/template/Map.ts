import CTXMap from "@goengine/canvas/src/map/CTX";
import Image from "@goengine/canvas/src/node/common/Image";
import Template from "@goengine/canvas/src/node/mutation/Template";
import Arc from "@goengine/canvas/src/node/shape/Arc";
import Rect from "@goengine/canvas/src/node/shape/Rect";
import { ArrayUtils } from "@goengine/core/src/util/Array";

Template.register("arc", Arc);
Template.register("rect", Rect);
Template.register("image", Image);

export default class Map extends CTXMap {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    // TODO: 采用XML格式解析
    private template = new Template({
        children: [
            {
                name: "EnEn",
                type: "arc",
                template: {
                    position: { x: 150, y: 150 },
                    clip: true,
                    radius: 100,
                    angle: Math.PI * 2,
                },
                children: [
                    {
                        name: "xixi",
                        type: "image",
                        template: {
                            position: { x: -100, y: -100 },
                            source: {
                                type: "img",
                                mode: "cover",
                                src: "/webs/canvas-example/static/1.jpg",
                                size: { height: 200 },
                            },
                        },
                    },
                ],
            },
        ],
    });

    private template1 = new Template({
        clip: "evenodd",
        position: { x: 300 },
        paths: [
            {
                type: "rect",
                template: {
                    radii: 50,
                    size: { width: 300, height: 300 },
                },
            },
            {
                type: "arc",
                template: {
                    position: { x: 150, y: 150 },
                    radius: 100,
                    angle: Math.PI * 2,
                },
            },
        ],
        children: [
            {
                name: "img",
                type: "image",
                template: {
                    source: {
                        type: "img",
                        src: "/webs/canvas-example/static/1.jpg",
                        mode: "cover",
                        size: { height: 300 },
                    },
                },
            },
        ],
    });

    protected init(): void {
        this.scene.add(this.template, this.template1);
    }

    public destroy(): void {
        ArrayUtils.traverse(
            this.scene.children,
            (item) => item instanceof Image && item.clearRely(),
        );

        Object.assign(this, {
            template: void 0,
            template1: void 0,
        });

        super.destroy();
    }
}
