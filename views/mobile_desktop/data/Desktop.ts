import { Components } from "../type/Component";

export default [
    {
        type: "scene",
        backgroundType: "image",
        background:
            "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/19/5eb7b44b281ccbf947d60658e1de13af.png",
        children: [
            {
                // 状态栏
                type: "group",
                position: [0, 5],
                children: [
                    {
                        type: "group",
                        position: [18],
                        children: [
                            {
                                type: "text",
                                text: "16:24",
                                baseline: "middle",
                                position: [0, 17 / 2],
                            },
                        ],
                    },
                    {
                        type: "group",
                        position: [204],
                        children: [
                            {
                                type: "group",
                                children: [
                                    {
                                        type: "image",
                                        filter: "invert(1)",
                                        position: [0],
                                        size: [0, 17],
                                        mode: "cover",
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202407/23/1ee637bc77b6ef78c84f6dea9b7eeb4c.png",
                                    },
                                    {
                                        type: "image",
                                        filter: "invert(1)",
                                        position: [25],
                                        size: [0, 17],
                                        mode: "cover",
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202407/23/a5fa0910f9061d465a8a2575bd28e4a5.png",
                                    },
                                    {
                                        type: "image",
                                        filter: "invert(1)",
                                        position: [50],
                                        size: [0, 17],
                                        mode: "cover",
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202407/02/d0285a12ebd0fd9b88330fa93cb3fd34.png",
                                    },
                                    {
                                        type: "image",
                                        filter: "invert(1)",
                                        position: [75],
                                        size: [0, 17],
                                        mode: "cover",
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202407/23/7c567186e8115fdb38fe9ae169d9cdb4.png",
                                    },
                                    {
                                        type: "image",
                                        filter: "invert(1)",
                                        position: [100],
                                        size: [0, 17],
                                        mode: "cover",
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202407/11/36851cc7eede821208fc662f74e6b477.png",
                                    },
                                    {
                                        type: "image",
                                        filter: "invert(1)",
                                        position: [125],
                                        size: [0, 17],
                                        mode: "cover",
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202407/09/0f01913effc9c8e4d8b7322b6ef36f38.png",
                                    },
                                    {
                                        type: "group",
                                        position: [150],
                                        children: [
                                            {
                                                type: "group",
                                                children: [
                                                    {
                                                        type: "image",
                                                        filter: "invert(1)",
                                                        size: [30, 17],
                                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202506/06/eb1f73b062e166cdff8b096b40e0cbe0.png",
                                                    },
                                                    {
                                                        type: "image",
                                                        filter: "invert(1)",
                                                        size: [30, 17],
                                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202506/06/d3b757548c239ef403145bed0f8e65d3.png",
                                                    },
                                                    {
                                                        type: "image",
                                                        filter: "invert(1)",
                                                        size: [15, 17],
                                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202506/06/06536cd411f1dc36632e2494ea69f732.png",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "text",
                                                text: "50",
                                                position: [15, 8.5],
                                                size: "bold 12px",
                                                color: "#000",
                                                align: "center",
                                                baseline: "middle",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: "scroll",
                position: [0, 80],
                size: [390, 550],
                group: {
                    size: [390 * 2, 550],
                },
                children: [
                    {
                        // 时间
                        type: "group",
                        children: [
                            {
                                type: "text",
                                text: "04月17日 周五",
                                size: "15px",
                                align: "center",
                                position: [195],
                            },
                            {
                                type: "group",
                                position: [107.5, 10],
                                children: [
                                    {
                                        type: "image",
                                        size: [40, 60],
                                        position: [0],
                                        src: "https://storepic.oppomobile.com/uploadFiles/admin_appstore/202003/04/eda89298232c9ce935a9e5f5a269cee7.png",
                                    },
                                    {
                                        type: "image",
                                        size: [40, 60],
                                        position: [40],
                                        src: "https://storepic.oppomobile.com/uploadFiles/admin_appstore/202003/04/be820272e8e5933a0bdb29290c55279c.png",
                                    },
                                    {
                                        type: "image",
                                        size: [15, 60],
                                        position: [80],
                                        src: "https://storepic.oppomobile.com/uploadFiles/admin_appstore/202003/04/a21e4d131da54b297df6f81010d39981.png",
                                    },
                                    {
                                        type: "image",
                                        size: [40, 60],
                                        position: [95],
                                        src: "https://storepic.oppomobile.com/uploadFiles/admin_appstore/202003/04/eda89298232c9ce935a9e5f5a269cee7.png",
                                    },
                                    {
                                        type: "image",
                                        size: [40, 60],
                                        position: [135],
                                        src: "https://storepic.oppomobile.com/uploadFiles/admin_appstore/202003/04/5ba70dca32c00318cf4527f91fc5c6a4.png",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        // 组
                        type: "group",
                        position: [0, 100],
                        children: [
                            {
                                type: "group",
                                position: [18],
                                children: [
                                    {
                                        type: "image",
                                        size: [168, 168],
                                        src: "/webs/canvas-example/static/img_gallery.png",
                                    },
                                    {
                                        type: "text",
                                        text: "精选照片",
                                        size: "12px",
                                        align: "center",
                                        position: [84, 190],
                                    },
                                ],
                            },
                            {
                                type: "group",
                                position: [204],
                                children: [
                                    {
                                        type: "group",
                                        children: [
                                            {
                                                type: "image",
                                                size: [168, 168],
                                                src: "data:image/png;base64,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",
                                            },
                                            {
                                                type: "group",
                                                children: [
                                                    {
                                                        type: "image",
                                                        size: [36, 36],
                                                        position: [15, 15],
                                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/affa6150a3e3137de8b66709421bf056.png",
                                                    },
                                                    {
                                                        type: "image",
                                                        size: [36, 36],
                                                        position: [66, 15],
                                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/a4fd59ef95f65642f8d2094e392ffa1a.png",
                                                    },
                                                    {
                                                        type: "image",
                                                        size: [36, 36],
                                                        position: [117, 15],
                                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/c14de2d3fc5f1e6c2455298cd415b811.png",
                                                    },
                                                    {
                                                        type: "image",
                                                        size: [36, 36],
                                                        position: [15, 66],
                                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/9c5f859d08d8ce5db5c3a5d706d236c9.png",
                                                    },
                                                    {
                                                        type: "image",
                                                        size: [36, 36],
                                                        position: [66, 66],
                                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/f87535616627fbc167043266d6cd1f3a.png",
                                                    },
                                                    {
                                                        type: "image",
                                                        size: [36, 36],
                                                        position: [117, 66],
                                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/e5961b04ff4b351de46a2b61144aeb98.png",
                                                    },
                                                    {
                                                        type: "image",
                                                        size: [36, 36],
                                                        position: [15, 117],
                                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/5e32a1984bb2bc6fbf68b57752959f57.png",
                                                    },
                                                    {
                                                        type: "image",
                                                        size: [36, 36],
                                                        position: [66, 117],
                                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/d0119638533625b9edf6fbfe04f18464.png",
                                                    },
                                                    {
                                                        type: "group",
                                                        position: [117, 117],
                                                        children: [
                                                            {
                                                                type: "image",
                                                                size: [15, 15],
                                                                position: [
                                                                    0, 0,
                                                                ],
                                                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/5402ae4e41d6451abad4733673ec1e30.png",
                                                            },
                                                            {
                                                                type: "image",
                                                                size: [15, 15],
                                                                position: [
                                                                    21, 0,
                                                                ],
                                                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/c3587d1ad80c0173695321e84e0dd0a6.png",
                                                            },
                                                            {
                                                                type: "image",
                                                                size: [15, 15],
                                                                position: [
                                                                    0, 21,
                                                                ],
                                                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/07a700236748fafab24eb9bfb993538d.png",
                                                            },
                                                            {
                                                                type: "image",
                                                                size: [15, 15],
                                                                position: [
                                                                    21, 21,
                                                                ],
                                                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/d34050a82df03242c8333fc128251ece.png",
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: "text",
                                                text: "工具",
                                                size: "12px",
                                                align: "center",
                                                position: [84, 190],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        // 图标
                        type: "group",
                        position: [0, 300],
                        children: [
                            {
                                type: "group",
                                position: [18],
                                children: [
                                    {
                                        type: "image",
                                        size: [75, 75],
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/13/df0a403530a6903f26fdfaec6f8e61d8.png",
                                    },
                                    {
                                        type: "text",
                                        text: "微博",
                                        size: "12px",
                                        align: "center",
                                        position: [37.5, 100],
                                    },
                                ],
                            },
                            {
                                type: "group",
                                position: [111],
                                children: [
                                    {
                                        type: "image",
                                        size: [75, 75],
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/13/a198643bb02f2d6f92c499e0a9e2496c.png",
                                    },
                                    {
                                        type: "text",
                                        text: "百度",
                                        size: "12px",
                                        align: "center",
                                        position: [37.5, 100],
                                    },
                                ],
                            },
                            {
                                type: "group",
                                position: [204],
                                children: [
                                    {
                                        type: "image",
                                        size: [75, 75],
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/13/d894c21db84679a5a40572690a06d9ae.png",
                                    },
                                    {
                                        type: "text",
                                        text: "高德地图",
                                        size: "12px",
                                        align: "center",
                                        position: [37.5, 100],
                                    },
                                ],
                            },
                            {
                                type: "group",
                                position: [297],
                                children: [
                                    {
                                        type: "image",
                                        size: [75, 75],
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202602/05/97533d201fc6ccb34eb89568aad5b390.png",
                                    },
                                    {
                                        type: "text",
                                        text: "腾讯手机管家",
                                        size: "12px",
                                        align: "center",
                                        position: [37.5, 100],
                                    },
                                ],
                            },
                            {
                                type: "group",
                                position: [18, 120],
                                children: [
                                    {
                                        type: "image",
                                        size: [75, 75],
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/13/e09719a982e6c05373dbe85a08411275.png",
                                    },
                                    {
                                        type: "text",
                                        text: "京东",
                                        size: "12px",
                                        align: "center",
                                        position: [37.5, 100],
                                    },
                                ],
                            },
                            {
                                type: "group",
                                position: [111, 120],
                                children: [
                                    {
                                        type: "image",
                                        size: [75, 75],
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/13/c378e52b30d1928b6e8f2771effae732.png",
                                    },
                                    {
                                        type: "text",
                                        text: "淘宝",
                                        size: "12px",
                                        align: "center",
                                        position: [37.5, 100],
                                    },
                                ],
                            },
                            {
                                type: "group",
                                position: [204, 120],
                                children: [
                                    {
                                        type: "image",
                                        size: [75, 75],
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/13/9ddfe96b01baf4892173eb2502bccc75.png",
                                    },
                                    {
                                        type: "text",
                                        text: "拼多多",
                                        size: "12px",
                                        align: "center",
                                        position: [37.5, 100],
                                    },
                                ],
                            },
                            {
                                type: "group",
                                position: [297, 120],
                                children: [
                                    {
                                        type: "image",
                                        size: [75, 75],
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/13/681a05297db8231c46c6c641c6b8ebab.png",
                                    },
                                    {
                                        type: "text",
                                        text: "今日头条",
                                        size: "12px",
                                        align: "center",
                                        position: [37.5, 100],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        // 图标1
                        type: "group",
                        position: [390],
                        children: [
                            {
                                type: "group",
                                position: [18],
                                children: [
                                    {
                                        type: "image",
                                        size: [75, 75],
                                        src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/13/df0a403530a6903f26fdfaec6f8e61d8.png",
                                    },
                                    {
                                        type: "text",
                                        text: "微博",
                                        size: "12px",
                                        align: "center",
                                        position: [37.5, 100],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                // 分页
                type: "group",
                position: [0, 680],
                children: [
                    {
                        type: "entrust",
                        position: [176],
                        components: [
                            {
                                type: "image",
                                size: [5, 5],
                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202206/14/6747f513046ebc3f34763c7a7b708186.png",
                            },
                            {
                                type: "image",
                                size: [5, 5],
                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202206/14/c546df35c63769e9a17259b95167e546.png",
                            },
                        ],
                    },
                    {
                        type: "entrust",
                        position: [187],
                        components: [
                            {
                                type: "image",
                                size: [5, 5],
                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202206/14/6747f513046ebc3f34763c7a7b708186.png",
                            },
                            {
                                type: "image",
                                size: [5, 5],
                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202206/14/c546df35c63769e9a17259b95167e546.png",
                            },
                        ],
                    },
                    {
                        type: "entrust",
                        position: [198],
                        components: [
                            {
                                type: "image",
                                size: [5, 5],
                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202206/14/6747f513046ebc3f34763c7a7b708186.png",
                            },
                            {
                                type: "image",
                                size: [5, 5],
                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202206/14/c546df35c63769e9a17259b95167e546.png",
                            },
                        ],
                    },
                    {
                        type: "entrust",
                        position: [209],
                        components: [
                            {
                                type: "image",
                                size: [5, 5],
                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202206/14/6747f513046ebc3f34763c7a7b708186.png",
                            },
                            {
                                type: "image",
                                size: [5, 5],
                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202206/14/c546df35c63769e9a17259b95167e546.png",
                            },
                        ],
                    },
                ],
            },
            {
                // 底部图标
                type: "group",
                position: [0, 720],
                children: [
                    {
                        type: "group",
                        position: [18],
                        children: [
                            {
                                type: "image",
                                size: [75, 75],
                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/161856a4cf093f3621511e39f8cfbf76.png",
                            },
                        ],
                    },
                    {
                        type: "group",
                        position: [111],
                        children: [
                            {
                                type: "image",
                                size: [75, 75],
                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/a940c5a105d94cdbf02ebb545c30baac.png",
                            },
                        ],
                    },
                    {
                        type: "group",
                        position: [204],
                        children: [
                            {
                                type: "image",
                                size: [75, 75],
                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/3e0fbc4a517cf808f47971443abd1547.png",
                            },
                        ],
                    },
                    {
                        type: "group",
                        position: [297],
                        children: [
                            {
                                type: "image",
                                size: [75, 75],
                                src: "https://store.heytapimage.com/uploadFiles/admin_appstore/202309/14/f5e0f473bb3d1430fbc653be5104c1a8.png",
                            },
                        ],
                    },
                ],
            },
        ],
    },
] satisfies Components.ComponentItem[];
