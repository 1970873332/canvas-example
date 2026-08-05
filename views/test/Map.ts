import CTXMap from "@goengine/canvas/src/map/CTX";
import Image from "@goengine/canvas/src/node/common/Image";

/**
 * 测试地图
 */
export default class TestMap extends CTXMap {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    private image = new Image({
        source: {
            type: "img",
            src: "test/1.jpg",
            mode: "cover",
            size: { width: 300 },
        },
        style: {
            filter: "grayscale(1)",
        },
        offscreen: true,
    });

    protected init(): void {
        this.scene.add(this.image);
    }
}
