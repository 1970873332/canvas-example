import { SizeMode } from "@goengine/web/src/util/Resource";

export namespace Components {
    export type Item = {
        /**
         * 位置
         */
        position?: [number?, number?];
        /**
         * 子节点
         */
        children?: ComponentItem[];
        /**
         * 是否受控
         */
        controlled?: boolean;
        /**
         * 名称
         */
        name?: string;
    };

    export type SceneItem = Item & {
        /**
         * 场景类型
         */
        type: "scene";
        /**
         * 背景图
         */
        background?: string;
        /**
         * 背景图类型
         */
        backgroundType?: "image" | "video";
    };

    export type GroupItem = Item & {
        /**
         * 分组类型
         */
        type: "group";
        /**
         * 分组大小
         */
        size?: [number, number];
    };

    export type ScrollerItem = Item & {
        /**
         * 滚动器类型
         */
        type: "scroll";
        /**
         * 滚动器大小
         */
        size?: [number, number];
        /**
         * 滚动器组
         */
        group?: Variant.Omit<GroupItem, "type">;
    };

    export type ImageItem = Item & {
        /**
         * 图片类型
         */
        type: "image";
        /**
         * 图片地址
         */
        src: string;
        /**
         * 图片模式
         */
        mode?: SizeMode;
        /**
         * 图片滤镜
         */
        filter?: string;
        /**
         * 图片大小
         */
        size?: [number, number];
    };

    export type VideoItem = Variant.Omit<ImageItem, "type"> & {
        /**
         * 视频类型
         */
        type: "video";
        /**
         * 是否自动播放
         */
        autoplay?: boolean;
    };

    export type TextItem = Item & {
        /**
         * 文本类型
         */
        type: "text";
        /**
         * 文本内容
         */
        text: string;
        /**
         * 文本尺寸
         */
        size?: string;
        /**
         * 文本颜色
         */
        color?: string;
        /**
         * 文本对齐方式
         */
        align?: CanvasTextAlign;
        /**
         * 文本基线
         */
        baseline?: CanvasTextBaseline;
    };

    export type EntrustItem = Item & {
        /**
         * 委托类型
         */
        type: "entrust";
        /**
         * 委托组件
         */
        components: ComponentItem[];
    };

    export type ComponentItem =
        | SceneItem
        | GroupItem
        | ScrollerItem
        | ImageItem
        | VideoItem
        | TextItem
        | EntrustItem;
}
