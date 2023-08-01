const global_config = {
    // 活动产品id
    event_bike_product_id: '7902779474168',
    // 活动送配件 variant_id
    event_accessories_variant_ids: ['43830635561208', '43944029552888', '43858617204984'],

    // 是否是手机
    is_mobile: document.documentElement.clientWidth < 768,

    // 邮件弹窗有关配置
    subscribe_email_dialog_config: {
        // 是否隐藏 邮件弹窗
        is_hide: false,
        // 邮件弹窗 延迟弹出时间，单位:s
        show_delay_time: 10,
        // 邮件 pc 背景图
        background_imgae_pc: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20220619-untitled-0871_2x_e63191d7-5f9d-4404-b894-f4b28129f24b.jpg?v=1690854939',
        // 邮件 mobile 背景图
        background_imgae_mb: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20220619-untitled-0871_2x_91cbff9f-2300-461f-8787-99af11d73d76.jpg?v=1690854946'
    },


    // carbon 产品页面配置
    carbon_order_page_config: {
        // carbon 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
        default_variant: 43556895916280,
        // 产品系列图
        product_images: {
            "Carbon 1 · 250W · Carbon Belt": {
                Sirius: [
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18718.png?v=1688710795",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18719.png?v=1688710795",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18720.png?v=1688710795"
                ],
                Lyra: [
                    'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18721.png?v=1688710795'
                ],
                "Midnight in Paris": [
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18722.png?v=1688710795"
                ],
                Vanilla: [],
                // 公共图片
                commonSwiper: [
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18729.png?v=1688710794",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18728.png?v=1688710795",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18727.png?v=1688710794",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18726.png?v=1688710795",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18725.png?v=1688710795",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18724.png?v=1688710795",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/ssss.png?v=1688710795"
                ]
            },
            "Carbon 1s · 350W · Shimano 7-Speed": {
                Sirius: [
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18748.png?v=1688711251",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18749.png?v=1688711251",
                ],
                Lyra: [
                    'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18746.png?v=1688711251'
                ],
                Vanilla: [
                    'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18750.png?v=1688711251'
                ],
                "Midnight in Paris": [
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18747.png?v=1688711251"
                ],
                commonSwiper: [
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18741.png?v=1688711251",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/45.png?v=1688711251",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18739.png?v=1688711251",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18738.png?v=1688711251",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18737.png?v=1688711251",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18736.png?v=1688711251",
                    "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/ssss_42ab57d5-1e69-4b74-8cba-ffc1452a3dec.png?v=1688711251"
                ]
            }
        },
        // 产品图下面的media模块, 根据产品图 循环轮播 
        product_media_images: [
            {
                text: `“Best Electric Bike for 2022”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/t/63/assets/cnet-1671527740909.png"
            },
            {
                text: `“One of the smartest and lightest ebike”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/t/63/assets/img_v2_1f5341a218124ab39b4bb5cd49cc335g-1668500914564.png"
            },
            {
                text: `“Like a phone’s than a next-gen fixie”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/t/63/assets/mask-group-181222x-1672131955609.png"
            },
            {
                text: `“Does phone tech better than some phones”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/t/63/assets/img_v2_c977d9efae3a4c46ad2ddac55c5dabfg-1668500914568.png"
            },
            {
                text: `“It’s incredibly fun to ride”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/t/63/assets/20221227174330-1672134242872.png"
            }
        ],
        // 默认的发货时间 文案
        ebike_default_delivery_time: 'Free shipping <span>within 5 days</span>',
        // 发货时间映射表
        // key:    vairant_id
        // value:  发货时间文案
        ebike_delivery_time: {
            // carbon 1
            43556899913976: 'Ships within <span>3 business days</span> from L.A. warehouse.',
            43556899979512: 'Ships within <span>3 business days</span> from L.A. warehouse.',
            43556899946744: 'Ships within <span>3 business days</span> from L.A. warehouse.',
            43645495443704: 'Ships within <span>3 business days</span> from L.A. warehouse.',
            43556900012280: 'Ships within <span>3 business days</span> from L.A. warehouse.',
            43556900077816: 'Ships within <span>3 business days</span> from L.A. warehouse.',
            43556900045048: 'Ships within <span>3 business days</span> from L.A. warehouse.',
            43645495476472: 'Ships within <span>3 business days</span> from L.A. warehouse.',
            // carbon 1s
            43556899651832: 'Ships within <span>10 business days</span> from L.A. warehouse.',
            //lb l
            43556896014584: 'Ships between <span>August 1-15, 2023 </span>from L.A. warehouse.',
            //pb s
            43556899684600: 'Ships within <span>5 business days</span> from L.A. warehouse.',
            //pw s
            43556899750136: 'Ships within <span>5 business days</span> from L.A. warehouse.',
            //pw l
            43556899881208: 'Ships between <span>August 1-15, 2023 </span>from L.A. warehouse.',
            //sb m
            43556895916280: 'Ships within <span>5 business days</span> from L.A. warehouse.',
            //pb m
            43556896047352: 'Ships between <span>August 1-15, 2023 </span>from L.A. warehouse.',
            43556899619064: 'Ships within <span>10 business days </span>from L.A. warehouse.',
            43645495345400: 'Ships within <span>10 business days </span>from L.A. warehouse.',
            //pw m
            43556899815672: 'Ships within <span>5 business days</span> from L.A. warehouse.',
            //lb m
            43556895981816: 'Ships between <span>August 1-15, 2023 </span>from L.A. warehouse.',
            43645495378168: 'Ships within <span>10 business days </span>from L.A. warehouse.',
            //sb l
            43556895949048: 'Ships within <span>5 business days</span> from L.A. warehouse.',
            //pb l
            43556896080120: 'Ships between <span>August 1-15, 2023 </span>from L.A. warehouse.',
            43645495410936: 'Ships within <span>10 business days </span>from L.A. warehouse.',
            //日期写法： 'Ships between <span>July 10-20, 2023 </span>from L.A. warehouse.',
            // chord
            // chord x
        },
    },
    // chrod order page 配置项
    chord_order_page_config: {
        // chord 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
        default_variant: 43694976729336,
        // 产品图
        product_images: {
            "High-Step": {
                White: [
                    "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18755.png?v=1689236358",
                    "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18760.png?v=1689236358",
                    "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18762.png?v=1689236358",

                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18765.png?v=1689236562',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18769.png?v=1689236563',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18766.png?v=1689236562'
                ],
                Black: [
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18754.png?v=1689236445',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18758.png?v=1689236445',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18759.png?v=1689236445',

                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18770_ae2056ef-cd08-42d1-a7b4-e8f125eae35a.png?v=1689237082',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18771.png?v=1689237081',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18772.png?v=1689237082'
                ],
                commonSwiper: [
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145020_4c046e1d-5af9-48af-a786-4b35087a5a87.png?v=1689236898',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145010_f48cb52f-2d3d-4a4f-b7f7-c6c2980349c9.png?v=1689236897',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_-1.png?v=1689236897',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSCF-1.png?v=1689236898'
                ]
            },
            "Step-Through": {
                White: [
                    "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18757.png?v=1689237250",
                    "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18763.png?v=1689237250",
                    "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18764.png?v=1689237251",

                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18765.png?v=1689236562',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18769.png?v=1689236563',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18766.png?v=1689236562'
                ],
                Black: [
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18756.png?v=1689237251',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18767.png?v=1689237251',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18768.png?v=1689237250',

                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18770_ae2056ef-cd08-42d1-a7b4-e8f125eae35a.png?v=1689237082',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18771.png?v=1689237081',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18772.png?v=1689237082'
                ],
                commonSwiper: [
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145020_4c046e1d-5af9-48af-a786-4b35087a5a87.png?v=1689236898',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145010_f48cb52f-2d3d-4a4f-b7f7-c6c2980349c9.png?v=1689236897',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_-1.png?v=1689236897',
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSCF-1.png?v=1689236898'
                ]
            }
        },
        // 默认的发货时间 文案
        ebike_default_delivery_time: 'Pre-order items ships from August 15 - 30, 2023',
        // 每一种variant 的发货时间文案
        ebike_delivery_time: {
            // chord
            // chord x
        }
    }
}