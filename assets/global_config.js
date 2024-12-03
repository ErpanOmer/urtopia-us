const global_config = {
  sale_end_times: [
    {
      sale_name: 'Flash Sale',
      sale_end_time: '2024-12-3'
    },
  ],
    // 活动产品id
    event_bike_product_id: '7902779474168',
    // 活动送配件 variant_id
    event_accessories_variant_ids: ['43830635561208', '43858617204984'],

    // 是否是手机
    is_mobile: document.documentElement.clientWidth < 768,
     // 是否是 pc
    is_pc: !!!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),
    dialog: {
        email: {
          is_hide: false,
          subscribe_email_close_expires_time: 1,              // 邮件进入弹窗 关闭过期时间
          subscribe_email_message_close_expires_time_mb: 3,   // 邮件小弹窗 关闭过期时间 -> 移动端
          subscribe_email_message_close_expires_time_pc: 1,   // 邮件小弹窗 关闭过期时间 -> pc端
          submit_expires_time: 30,                            // 邮件类弹窗 提交过期时间
          close_expires_time: 3,                              // 邮件类弹窗 关闭过去时间
          show_delay_time: 15                                 // 邮件类延迟弹出时间，单位:s
        },
        test_ride: {
          is_hide: false,
          submit_expires_time: 7,
          close_expires_time: 3,
          show_delay_time: 15
        }
      },
      // carbon 产品页面配置
    carbon_order_page_config: {
        // carbon 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
        default_variant: 43556895916280,
        // variant 为 available:false 的情况下 也要强制显示 
        ignore_variants_available_false: [],
        size_map: {
            S: `Fit for 5’3’’~5’9’’ Inseam 30’’`,
            M: `Fit for 5’7’’~6’1’’ Inseam 31’’`,
            L: `Fit for 5’11’’~6’5’’ Inseam 33’’`
        },
      awards: [
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231214-163215.png?v=1702542766',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231214-163208.png?v=1702542765'
      ],
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
                text: `“The AI-powered co-pilot adds a new level<br>of intelligence and interactivity”`,
                img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230913-173450.png?v=1694597715"
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
        ebike_default_delivery_time: 'Free shipping <span>within 5 business days</span> from L.A. warehouse.',
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
            43556896014584: 'Ships within <span>5 business days</span> from L.A. warehouse.',
            //pb s
            43556899684600: 'Ships within <span>5 business days</span> from L.A. warehouse.',
            //pw s
            43556899750136: 'Ships within <span>5 business days</span> from L.A. warehouse.',
            //pw l
            43556899881208: 'Ships within <span>5 business days</span> from L.A. warehouse.',
            //sb m
            43556895916280: 'Ships between <span>January 1-15, 2023 </span>from L.A. warehouse.',
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
            43556896080120: 'Ships within <span>5 business days</span> from L.A. warehouse.',
            43645495410936: 'Ships within <span>10 business days </span>from L.A. warehouse.',
            //日期写法： 'Ships between <span>July 10-20, 2023 </span>from L.A. warehouse.',
            // chord
            // chord x
        },
    },
    // carbon 产品页面配置
    carbon_fold_order_page_config: {
        // carbon 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
        default_variant: 45838852129016,
        // variant 为 available:false 的情况下 也要强制显示 
        ignore_variants_available_false: [],
        size_map: {
            'One Size': `Fit for 5’1’’~6’1’’`,
        },
        // 产品系列图
        product_images: {
            'Saffron Yellow': [
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185158.jpg?v=1729162376',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155815.jpg?v=1731052718',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155759.jpg?v=1731052717',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155820.jpg?v=1731052718',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155810.jpg?v=1731052717',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155805.jpg?v=1731052718',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241113-140713.jpg?v=1731478063',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185203.jpg?v=1729162376',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185140.jpg?v=1729162376',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185210.jpg?v=1729162376',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185150.jpg?v=1729162376',
            ],
            'Aegean Blue': [
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185454.jpg?v=1729162539',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155815.jpg?v=1731052718',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155759.jpg?v=1731052717',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155820.jpg?v=1731052718',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155810.jpg?v=1731052717',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155805.jpg?v=1731052718',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185449.jpg?v=1729162539',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185513.jpg?v=1729162539',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185459.jpg?v=1729162539',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185504.jpg?v=1729162539'
             ],
            commonSwiper: [
          ]
          },
          // 产品图下面的media模块, 根据产品图 循环轮播 
          product_media_images: [
              {
                  text: 'Carbon Fiber Expert',
                  img: "https://newurtopia.com/cdn/shop/files/logo_0707__1.png?v=1684310857"
              },
              {
                  text: `“Visually stunning and lightweight bikes”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19051_2x_3c234be0-e1cb-4ab0-b83c-02282fd42cb4.png?v=1705485418"
              },
              {
                  text: `“The best electric bikes of 2024”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19052_2x_83b17023-7ff5-413b-9a87-571e8e6928ee.png?v=1705485424"
              },
              {
                  text: `“Pack with copious use of technology”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19053_2x_2b4e11dc-d27b-47ad-9478-92c696e1fac7.png?v=1705485431"
              },
              {
                  text: `“Pack with copious use of technology”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19054_2x_7feff357-8d1b-48a0-b9af-662442dc41f6.png?v=1705485437"
              },
              {
                  text: `“The epitome of raw power”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19055_2x_612a45c4-04fe-4477-a252-302e8d11c40e.png?v=1705485444"
              },
              {
                  text: `“Carbon 1 Pro as ‘a bike with spirit”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19056_2x_b61e963a-f2b3-49f3-8bc2-4aee5f8f2a4c.png?v=1705485451"
              },
              {
                  text: `“Standout feature lies in its integration with advanced technology. ”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19057_2x_0eabb26b-a2fe-48e8-b00e-209ef2b986e0.png?v=1705485460"
              },
              {
                  text: `“Interesting innovation or tech for tech’s sake”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19058_2x_b0454fa5-9c44-462e-8f04-5646db60456a.png?v=1705485466"
              },
              {
                  text: `“Completely crazy: This e-bike talks to the rider”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19059_2x_14b271ba-3eae-41ea-8882-e6896e9f9948.png?v=1705485473"
              },
              {
                  text: `“The iPhone among e-bikes”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19060_2x_e094650e-c53d-4e29-b805-7e89d127643d.png?v=1705485481"
              },
              {
                  text: `“Thanks to its full carbon frame, the Urtopia e-bikes is light”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19061_2x_a24c29c4-0fff-421f-9977-25989e38b7e9.png?v=1705485487"
              }
          ],
        // 默认的发货时间 文案
        ebike_default_delivery_time: 'Free shipping within 5 business days.',
        // 发货时间映射表
        // key:    vairant_id
        // value:  发货时间文案
        ebike_delivery_time: {
        },
        sizes_and_specs: {
            sizes: {
                image: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241203-110142.png?v=1733194922',
                parameters: [
                    [
                        '<span style="color: #fff;">xxxx</span>',
                        'Recomm. rider height',
                        'A. Adjustable seat range',
                        'B. Highest point of the seat post',
                        'C. Overall length',
                        'D. Handlebar grips height',
                        'E. Headset height',
                        'F. Seat tube length',
                        'G. Wheel diameter',
                        'H. Wheelbase',
                        'I. Height after folding',
                        'J. Overall length after folding',
                    ],
                    [
                        '<span class="u17DemiBold_v2">One Size</span>',
                        '5’1’’~6’1’’',
                        '220 mm',
                        '1020 mm',
                        '1480 mm',
                        '1090 mm',
                        '400 mm',
                        '310 mm',
                        '450 mm',
                        '1000 mm',
                        '680 mm',
                        '800 mm'
                    ],
                ]
            },
            specs: [
                {
                    title: 'General Info',
                    parameters: [
                        ["Model", "Carbon Folding E-Bike"],
                        ["Weight", "29 lbs"],
                        ["Material", "Carbon fiber (frame, fork)"],
                        ["Range", "40miles"],
                        ["Top Speed", "20mph"],
                        ["Total Weight Limit", "220 lbs"],
                        ["Rider Height", `5’1’’ - 6’1’’`],
                        ["Brakes", "TEKTRO hydraulic disc brakes"],
                        ["Wheels", `INNOVA 18" x 2.0`],
                        ["", ``],
                    ]
                },
                {
                    title: 'Ebike System',
                    parameters: [
                        ["Motor", "Peak 500W hub motor, 42Nm"],
                        ["Battery", "36V 7Ah (252 Wh) seat post battery"],
                        ["Pedal Assist", "5 levels"],
                        ["Charger", "3H fast charger, 42V 2Amp"],
                        ["Display", "Color display"],
                        ["Sensors", "Torque sensor"],
                        ["Headlights", "External headlights 160LM"],
                        ["Rearlights", "Integrated rear lights"],
                    ]
                },
                {
                    title: 'Drivetrain',
                    parameters: [
                        ["Chainrings", "11-32T"],
                        ["Cassette", "11-32T, 8 Speed"],
                        ["Chain", "Chain KMC Z7"],
                        ["Rear Derailleur", "Shimano Altus 8-Speed"],
                        ["Shift Lever", "8 Speed Trigger"],
                        ["", ``],
                    ]
                }
            ] 
          },
    },
    // chrod order page 配置项
    chord_order_page_config: {
        // chord 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
        default_variant: 43694976696568,
        // variant 为 available:false 的情况下 也要强制显示 
        ignore_variants_available_false: [],
        size_map: {
            'High-Step': `Fit for 5’7’’~6’5’’`,
            'Step-Through': `Fit for 5’3’’~6’1’’`
        },
      awards: [
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231214-163200.png?v=1702542765'
      ],
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
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18772_58e3cebc-b65d-42e2-bee0-f40c0662e725.png?v=1695388441'
                ],
                commonSwiper: [
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145010_f48cb52f-2d3d-4a4f-b7f7-c6c2980349c9.png?v=1689236897',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-6129.jpg?v=1695387132',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-6611.jpg?v=1695387132',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSCF2506.jpg?v=1695387132',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-5302.jpg?v=1695387132'
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
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18772_58e3cebc-b65d-42e2-bee0-f40c0662e725.png?v=1695388441'
                ],
              Gray: [
                    'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_side.png?v=1696833425',
                    'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_front.png?v=1696833426',
                    'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_back.png?v=1696833425',

                    'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_bar.png?v=1696833426',
                    'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_gear.png?v=1696833426',
                    'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_downtube.png?v=1696833426'
                ],
                commonSwiper: [
                    'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145010_f48cb52f-2d3d-4a4f-b7f7-c6c2980349c9.png?v=1689236897',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-6129.jpg?v=1695387132',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-6611.jpg?v=1695387132',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSCF2506.jpg?v=1695387132',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-5302.jpg?v=1695387132'
                ]
            }
        },
      product_media_images: [
            {
              text: `“The smoothest and cleanest look”`,
              img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18675_2x_75c49337-c9e2-4f36-8d62-bf676477342b.png?v=1699861700"
            },
            {
              text: `“Battery integrated under the top tube like never before.”`,
              img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18931_2x_4bfe7a5e-d7f8-4241-b453-6f1269875cd7.png?v=1699861708"
            },
            {
              text: `“A lifestyle piece incorporates cutting-edge technology”`,
              img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18927_2x_221c18ab-9822-4bfd-8434-e4da565bc9ac.png?v=1699861715"
            },
            {
              text: `“The unusual smart e-bike is worth a look.”`,
              img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18928_2x_4fa3a41f-c723-4589-be3c-1b499e871a3f.png?v=1699861725"
            },
            {
              text: `“This is a model destined to conquer the public.”`,
              img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18929_2x_ab7441d3-d6ca-49f1-839a-1e01e2712a97.png?v=1699861731"
            },
            {
              text: `“one of the most beautiful and futuristic ebikes of 2023”`,
              img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18930_2x_9c4e218a-1697-41e3-a5da-5e771d4b7a79.png?v=1699861737"
            }
          ],
        // 默认的发货时间 文案
        ebike_default_delivery_time: 'Free shipping <span>within 5 business days</span>',
        // 每一种variant 的发货时间文案
        ebike_delivery_time: {
           // chord
          43694976663800: 'Free shipping <span>within 5 business days</span>',
          43694976696568: 'Free shipping <span>within 5 business days</span>',
          // chord x
              //white
          43694976729336: 'Free shipping <span>within 5 business days</span>',
          43694976762104: 'Pre-order items shipped from October 15 - 30, 2023',
          //gray
          44047038447864:'Free shipping <span>within 5 business days</span>',
            
        }
    },
  carbon1pro_order_page_config: {
        // variant 为 available:false 的情况下 也要强制显示 
        ignore_variants_available_false: [],
        default_variant: 44288621314296,
        size_map: {
            S: `Fit for 5’3’’~5’9’’ Inseam 30’’`,
            M: `Fit for 5’7’’~6’1’’ Inseam 31’’`,
            L: `Fit for 5’11’’~6’5’’ Inseam 33’’`
        },
        product_images: {
          'Matte Black': [
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/3-1.jpg?v=1722064932',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Group_24397.jpg?v=1722064933&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231108-untitled-3641.jpg?v=1722064933&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241015-153933.jpg?v=1728977983&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240910-184640.jpg?v=1725965247&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1pro-_-_c_2x_59857988-2ad6-42c3-ba78-b239cc591367.jpg?v=1721977733',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1pro-_-_c__1_1_2x_1b9d5dea-a84a-442b-80ec-3fa18757aabd.jpg?v=1721977738',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1pro-_1_1.jpg?v=1722064932',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1pro-_c_2x_4d3389e3-6c89-4584-a35d-a7586f6f0dec.jpg?v=1721977750',
          ],
          'Creme': [
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18878.jpg?v=1722064932',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Group_24398.jpg?v=1722064933&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240308-untitled-6217.jpg?v=1722064934&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urtopia-20.jpg?v=1722064933&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urtopia-11.jpg?v=1722064933&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18874.jpg?v=1722064932&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18870.jpg?v=1722064932&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18862.jpg?v=1722064932',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18858.jpg?v=1722064933',
           ],
          'Blu': [
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241120-101942.png?v=1732069202&width=1000',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Group_24398.jpg?v=1722064933&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240308-untitled-6217.jpg?v=1722064934&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urtopia-20.jpg?v=1722064933&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urtopia-11.jpg?v=1722064933&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240924-192253.jpg?v=1727176998&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240924-192241.jpg?v=1727176998&width=800',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240924-192257.jpg?v=1727176997',
            'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240924-192248.jpg?v=1727176998',
           ],
          commonSwiper: [
        ]
        },
        // 产品图下面的media模块, 根据产品图 循环轮播 
        product_media_images: [
            {
                text: 'Carbon Fiber Expert',
                img: "https://newurtopia.com/cdn/shop/files/logo_0707__1.png?v=1684310857"
            },
            {
                text: `“Visually stunning and lightweight bikes”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19051_2x_3c234be0-e1cb-4ab0-b83c-02282fd42cb4.png?v=1705485418"
            },
            {
                text: `“The best electric bikes of 2024”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19052_2x_83b17023-7ff5-413b-9a87-571e8e6928ee.png?v=1705485424"
            },
            {
                text: `“Pack with copious use of technology”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19053_2x_2b4e11dc-d27b-47ad-9478-92c696e1fac7.png?v=1705485431"
            },
            {
                text: `“Pack with copious use of technology”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19054_2x_7feff357-8d1b-48a0-b9af-662442dc41f6.png?v=1705485437"
            },
            {
                text: `“The epitome of raw power”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19055_2x_612a45c4-04fe-4477-a252-302e8d11c40e.png?v=1705485444"
            },
            {
                text: `“Carbon 1 Pro as ‘a bike with spirit”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19056_2x_b61e963a-f2b3-49f3-8bc2-4aee5f8f2a4c.png?v=1705485451"
            },
            {
                text: `“Standout feature lies in its integration with advanced technology. ”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19057_2x_0eabb26b-a2fe-48e8-b00e-209ef2b986e0.png?v=1705485460"
            },
            {
                text: `“Interesting innovation or tech for tech’s sake”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19058_2x_b0454fa5-9c44-462e-8f04-5646db60456a.png?v=1705485466"
            },
            {
                text: `“Completely crazy: This e-bike talks to the rider”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19059_2x_14b271ba-3eae-41ea-8882-e6896e9f9948.png?v=1705485473"
            },
            {
                text: `“The iPhone among e-bikes”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19060_2x_e094650e-c53d-4e29-b805-7e89d127643d.png?v=1705485481"
            },
            {
                text: `“Thanks to its full carbon frame, the Urtopia e-bikes is light”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19061_2x_a24c29c4-0fff-421f-9977-25989e38b7e9.png?v=1705485487"
            }
        ],
        sizes_and_specs: {
            sizes: {
                image: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231221-151050_2x_d883c889-6e52-477d-8672-a7dda6dbbbdd.png?v=1703577530',
                parameters: [
                    [
                        '<span style="color: #fff;">xxxx</span>',
                        'Recomm. rider height',
                        'A. Standover height',
                        'B. Adjustable seat range',
                        'C. Handlebar grips height',
                        'D. Seat tube length',
                        'E. Wheelbase',
                        'F. Overall length',
                        'G. Wheel diameter',
                        'H. Top tube length (effective)',
                        'I. Head tube length',
                        'J. Headset height'
                    ],
                    [
                        '<span class="u17DemiBold_v2">Small</span>',
                        '5’3’’~5’9’’',
                        '779 mm',
                        '60 mm',
                        '995-1025 mm',
                        '421 mm',
                        '1065 mm',
                        '1766 mm',
                        '702 mm',
                        '594 mm',
                        '152 mm',
                        '90-120 mm'
                    ],
                    [
                        '<span class="u17DemiBold_v2">Medium</span>',
                        '5’7’’~6’1’’',
                        '804 mm',
                        '60 mm',
                        '1011-1041 mm',
                        '463 mm',
                        '1093 mm',
                        '1795 mm',
                        '702 mm',
                        '618 mm',
                        '170 mm',
                        '90-120 mm'
                    ],
                    [
                        '<span class="u17DemiBold_v2">Large</span>',
                        '5’11’’~6’5’’',
                        '833 mm',
                        '60 mm',
                        '1023-1053 mm',
                        '498 mm',
                        '1122 mm',
                        '1824 mm',
                        '702 mm',
                        '653 mm',
                        '180 mm',
                        '90-120 mm'
                    ],
                ]
            },
            specs: [
                {
                    title: 'General Info',
                    parameters: [
                        ["Model", "Carbon 1 Pro Lightweight E-bike"],
                        ["Weight", "37 lbs w/o acc."],
                        ["Material", "Carbon fiber (frame, fork)"],
                        ["Range", "Up to 80 miles"],
                        ["Top Speed", "25 mph"],
                        ["Total Weight Limit", "240 lbs"],
                        ["Rider Height", "5’3” - 6’5”"],
                        ["Brakes", "Dual-piston hydraulic disc brakes"],
                        ["Wheels", "27.5 x1.6”, puncture-proof tire"],
                        ["", ""],
                    ]
                },
                {
                    title: 'Ebike System',
                    parameters: [
                        ["Motor", "36V 350W (sustained), 750W (peak), rear hub"],
                        ["Battery", "36V 9.8Ah (352.8Wh), Samsung Li-ion, certified to UL-2271"],
                        ["Pedal Assist", "4 levels"],
                        ["Charger", "2.5H fast charger, 36V 4Amp"],
                        ["Display", "LED dot-matrix (Anti-glare)"],
                        ["Sensors", "Torque sensor, accelerometer, gyroscope"],
                        ["Lights", "Front: Integrated StVZO headlight Rear: StVZO rear light (Not ARES lights)"],
                        ["", ""],
                    ]
                },
                {
                    title: 'Drivetrain',
                    parameters: [
                        ["Chainrings", "44T"],
                        ["Crankset", "Aluminum alloy, 170mm"],
                        ["Cassette", "11-40T, 8 Speed"],
                        ["Chain", "Shimano 8 speed"],
                        ["Rear Derailleur", "Shimano 8 speed"],
                        ["Shift Lever", "8 Speed Trigger"],
                        ["Pedals", "9/16” Alloy Platform"],
                        ["", ""],
                    ]
                },
                {
                    title: 'Cockpit',
                    parameters: [
                        ["Urtopia Smartbar", "Aluminum alloy, Φ28.6mm, 720mm width, adjustable height 0/15/30mm, haptic interaction"],
                        ["Grips", "Durable ergonomic Grips, lockable"],
                        ["Seat Post", "Aluminum Alloy, φ31.6mm, 100mm (size M&L), 80mm (size S)"],
                        ["", ""],
                    ]
                },
                {
                    title: 'Smartbar',
                    parameters: [
                        ["Smartbox", "On-board navigation, fingerprint unlock, AI assistant, voice control, bluetooth speaker, OTA update (wireless firmware update)"],
                        ["Theft Defenses", "Movement alarm, Electronic Fence, Find My Bike (live GPS tracking), Beep"],
                        ["Connectivity", "eSIM with 4G, GPS, Bluetooth"],
                        ["eSIM/Connect Service", "Renewal via App (Urtopia)"],
                        ["App", "Urtopia (iOS & Android)"],
                        ["", ""],
                    ]
                },
            ] 
          },
          // 默认的发货时间 文案
        ebike_default_delivery_time: 'Free shipping within 5 business days',
        // 发货时间映射表
        // key:    vairant_id
        // value:  发货时间文案
        ebike_delivery_time: {}
    },
    fusion_order_page_config: {
        // chord 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
        default_variant: 45844150190328,
        ignore_variants_available_false: [],
        size_map: {
          'One Size': 'Fit for 5’3’’ - 6’3’’'
        },
        product_media_images: [
          {
              text: 'Carbon Fiber Expert',
              img: "https://newurtopia.com/cdn/shop/files/logo_0707__1.png?v=1684310857"
          },
          {
              text: `“Visually stunning and lightweight bikes”`,
              img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19051_2x_3c234be0-e1cb-4ab0-b83c-02282fd42cb4.png?v=1705485418"
          },
          {
              text: `“The best electric bikes of 2024”`,
              img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19052_2x_83b17023-7ff5-413b-9a87-571e8e6928ee.png?v=1705485424"
          },
          {
              text: `“Pack with copious use of technology”`,
              img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19053_2x_2b4e11dc-d27b-47ad-9478-92c696e1fac7.png?v=1705485431"
          },
          {
              text: `“Pack with copious use of technology”`,
              img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19054_2x_7feff357-8d1b-48a0-b9af-662442dc41f6.png?v=1705485437"
          },
          {
              text: `“The epitome of raw power”`,
              img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19055_2x_612a45c4-04fe-4477-a252-302e8d11c40e.png?v=1705485444"
          },
          {
              text: `“Carbon 1 Pro as ‘a bike with spirit”`,
              img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19056_2x_b61e963a-f2b3-49f3-8bc2-4aee5f8f2a4c.png?v=1705485451"
          },
          {
              text: `“Standout feature lies in its integration with advanced technology. ”`,
              img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19057_2x_0eabb26b-a2fe-48e8-b00e-209ef2b986e0.png?v=1705485460"
          },
          {
              text: `“Interesting innovation or tech for tech’s sake”`,
              img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19058_2x_b0454fa5-9c44-462e-8f04-5646db60456a.png?v=1705485466"
          },
          {
              text: `“Completely crazy: This e-bike talks to the rider”`,
              img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19059_2x_14b271ba-3eae-41ea-8882-e6896e9f9948.png?v=1705485473"
          },
          {
              text: `“The iPhone among e-bikes”`,
              img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19060_2x_e094650e-c53d-4e29-b805-7e89d127643d.png?v=1705485481"
          },
          {
              text: `“Thanks to its full carbon frame, the Urtopia e-bikes is light”`,
              img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19061_2x_a24c29c4-0fff-421f-9977-25989e38b7e9.png?v=1705485487"
          }
      ],
        product_images: {
          'Elegant Grey': [
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/19562.jpg?v=1729305262',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174014.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174022.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174027.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174032.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174037.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/24909.jpg?v=1729305263',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1_3e6798ca-c8fa-4177-bd9b-89a4a927ad18.jpg?v=1729305263',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/7c82b2eb5dc055162526ce40f6992a8e.jpg?v=1729305263',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1_f6663af0-be1a-4e39-b23d-b53876ed314e.jpg?v=1729305262',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/92b8d6a675411b07ec7e7e53a0c8b8c7.jpg?v=1729305263'
            ],
            'Blazing Black': [
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/19561.jpg?v=1729305262',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174014.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174022.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174027.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174032.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174037.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/24908.jpg?v=1729305263',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/ed7f58882819b78f9efde45cc0b5a2a2.jpg?v=1729305262',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1_d3123805-ad89-4f47-9f7b-2fd070d0722f.jpg?v=1729305263',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/8ea15d93b62c474589503723f875bcfb.jpg?v=1729305262',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1_f07818b8-80f5-4b35-949b-57a5fa70b4b4.jpg?v=1729305263'
            ],
            'Vital Orange': [
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/19560.jpg?v=1729305262',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174014.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174022.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174027.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174032.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174037.jpg?v=1731577271&width=900',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/24397.jpg?v=1729305263&width=1000',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/2_acb43f5f-677a-4687-ae6f-a2ac348de8a6.jpg?v=1729305263',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/2_0bd94c6b-d30e-4d20-b599-a90e2fb36560.jpg?v=1729305263',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/2.jpg?v=1729305262',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/2_55d5d49f-9210-4f1d-8391-92dfb0471447.jpg?v=1729305263'
            ],
            commonSwiper: []
        },
        // 默认的发货时间 文案
        ebike_default_delivery_time: 'Free shipping within 5 business days.',
        // 每一种variant 的发货时间文案
        ebike_delivery_time: {},
        sizes_and_specs: {
          sizes: {
            image: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20240108-181634.png?v=1704709013',
            parameters: [
              [
                '<span style="color: #fff;">xxxx</span>',
                'Recomm. rider height',
                'A. Adjustable seat range',
                'B. Handlebar grips height',
                'C. Seat tube length',
                'D. Wheelbase',
                'E. Overall length',
                'F. Wheel diameter',
                'G. Top tube length (effective)',
                'H. Head tube length',
                'I. Headset height'
              ],
              [
                '<span style="color: #fff;">One Size</span>',
                '5’3’’ - 6’3’’',
                '140 mm',
                '1085-1115 mm',
                '485 mm',
                '1205 mm',
                '1935 mm',
                '730 mm',
                '633 mm',
                '144 mm',
                '90-120 mm'
              ],
            ]
          },
          specs: [
            {
              title: 'General Info',
              parameters: [
                ["Model", "Carbon Fusion Lightweight E-SUV"],
                ["Net Weight", "55 lbs"],
                ["Material", "Carbon fiber frame"],
                ["Range", "Up to 70 miles Extended to 120miles (Dual baterry)"],
                ["Top Speed", "20mph by default 28mph upon unlock"],
                ["Total Weight Limit", "330 lbs"],
                ["Rider Height", "5’3’’ - 6’3’’"],
                ["Brakes", "TEKTRO hydraulic disc brakes with power cut-off sensor"],
                ["Wheels", "Kenda K1127 (29X2.05), puncture-proof tire"],
                ["", ""],
              ]
            },
            {
              title: 'Ebike System',
              parameters: [
                ["Motor", "1500W peak power (36V 350W 36Nm front hub motor, 36V 350W 36Nm rear drive hub motor)"],
                ["Battery", "36V 14.7Ah (529.2 Wh), Samsung Li-ion, removable battery"],
                ["Pedal Assist", "4 levels"],
                ["Trottle", "Yes (up to 20mph)"],
                ["Charger", "3.5H fast charger, 36V 4Amp"],
                ["Display", "LED dot-matrix (Anti-glare)"],
                ["Sensors", "Torque sensor, accelerometer, gyroscope"],
                ["Lights", "Front: Integrated StVZO headlight Rear: StVZO rear light (Not ARES lights)"]
              ]
            },
            {
              title: 'Drivetrain',
              parameters: [
                ["Chainrings", "44T"],
                ["Crankset", "Aluminum alloy, 170mm"],
                ["Cassette", "11-40T, 8 Speed"],
                ["Chain", "YBN S8e, Silver"],
                ["Rear Derailleur", "Shimano ACERA 8-Speed"],
                ["Shift Lever", "8 Speed Trigger"],
                ["Pedals", "9/16” Alloy Platform"],
                ["", ""],
              ]
            },
            {
              title: 'Cockpit',
              parameters: [
                ["Urtopia Smartbar", "Aluminum alloy, Φ28.6mm, 720mm width, adjustable height 0/15/30mm, haptic interaction"],
                ["Grips", "ZOOM 188NS AMS 700C Suspension fork 60mm travel"],
                ["Grips", "Durable ergonomic Grips, lockable"],
                ["Seat Post", "Aluminum Alloy, φ31.6mm, 100mm (size M&L), 80mm (size S)"],
              ]
            },
            {
              title: 'Smartbar',
              parameters: [
                ["Smartbox", "On-board navigation, fingerprint unlock, AI assistant, voice control, bluetooth speaker, OTA update (wireless firmware update)"],
                ["Theft Defenses", "Movement alarm, Electronic Fence, Find My Bike (live GPS tracking), Beep"],
                ["Connectivity", "eSIM with 4G, GPS, Bluetooth"],
                ["eSIM/Connect Service", "Renewal via App (Urtopia)"],
                ["App", "Urtopia (iOS & Android)"],
                ["", ""],
              ]
            },
          ]
        },
      compare: {
          parameters: [
            ['', 'Fusion GT E-Bike', 'Other E-Bikes'],
            ['Frame Material', 'Carbon Fiber', 'Aluminum Alloy'],
            ['Motor', '1500W', '500W rear-hub motor'],
            ['Battery Option', '900Wh Dual-battery', '672Wh battery'],
            ['Charge Time', '3.5 Hrs', '5 Hrs'],
            ['Max Range', '120 Miles', '60 Miles'],
            ['Throttle', 'Yes, 20mph', 'Yes, 20mph'],
            ['Weight', '60 lbs', '77 lbs'],
            ['Anti-theft', 'GPS', 'X'],
            ['Luggage Rack', 'MIK, max. 60 lbs', 'Regular'],
            ['Max Load', '330 lbs', '300 lbs'],
          ],
          style: {
            image_0: '//newurtopia.com/cdn/shop/files/19566.png?v=1729236036&width=500',
            image_1: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/cccc_2x_366a8576-c889-4210-8bbf-05fa1c327bf8.png?v=1731912593',
            background: 'linear-gradient(180deg, #6b97be, #151d38)',
            title: '<h2 class="u36Medium_v2 mobileHide">What makes Carbon Fusion GT <br class="pcHide">the best e-SUV?</h2>',
            image_pc: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/24890_2x_5ee70e3a-6ae6-4af8-b6f8-de3a0d065224.png?v=1729308382',
            image_mb: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/24891_2x_2fdadff8-8384-4c6b-b678-4e604f8ff504.png?v=1729318520'
          }
        }
      }
}