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
    carbon_bike_config: {
        // carbon 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
        default_variant: 43556895916280,
    }
}