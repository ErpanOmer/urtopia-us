const global_config = {
        // 活动产品id
    event_bike_product_id: '7902779474168',
    // 活动送配件 variant_id
    event_accessories_variant_ids: ['43830635561208', '43830633365752', '43858617204984'],

    // 是否是手机
    is_mobile: document.documentElement.clientWidth < 768,
    
    // 邮件弹窗 延迟弹出时间，单位:s
    subscribe_email_show_delay_time: 10,

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
        43556899684600: 'Ships between <span>August 1-15, 2023 </span>from L.A. warehouse.',
        //pw s
        43556899750136: 'Ships between <span>August 1-15, 2023 </span>from L.A. warehouse.',
        //pw l
        43556899881208: 'Ships between <span>August 1-15, 2023 </span>from L.A. warehouse.',
        //sb m
        43556895916280: 'Ships within <span>5 business days</span> from L.A. warehouse.',
        //pb m
        43556896047352: 'Ships within <span>5 business days</span> from L.A. warehouse.',
        43556899619064: 'Ships within <span>10 business days </span>from L.A. warehouse.',
        43645495345400: 'Ships within <span>10 business days </span>from L.A. warehouse.',
        //pw m
        43556899815672: 'Ships within <span>5 business days</span> from L.A. warehouse.',
        //lb m
        43556895981816: 'Ships within <span>5 business days</span> from L.A. warehouse.',
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
        ]
    }
}