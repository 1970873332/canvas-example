import { RouteObject } from "@goengine/vue/src/router/Config";

/** 示例列表 - 用于侧边栏显示 */
export default [
    {
        name: "test",
        icon: "👻",
        path: "/test",
        component: () => import("../views/test/Index.vue"),
    },
    {
        name: "Hit",
        icon: "👆",
        path: "/hit",
        component: () => import("../views/hit/Index.vue"),
    },
    {
        name: "Batch Rect",
        icon: "📦",
        path: "/batch_rect",
        component: () => import("../views/batch_rect/Index.vue"),
    },
    {
        name: "Batch Image",
        icon: "📦",
        path: "/batch_image",
        component: () => import("../views/batch_image/Index.vue"),
    },
    {
        name: "Batch Nested",
        icon: "📦",
        path: "/batch_nested",
        component: () => import("../views/batch_nested/Index.vue"),
    },
    {
        name: "Mobile Desktop",
        icon: "📱",
        path: "/mobile_desktop",
        component: () => import("../views/mobile_desktop/Index.vue"),
    },
    {
        name: "Template",
        icon: "✂",
        path: "/template",
        component: () => import("../views/template/Index.vue"),
    },
] satisfies ExampleItem[];

interface ExampleItem {
    name: string;
    icon: string;
    path: string;
    component: RouteObject["component"];
}
