//  禁用日期动态生成函数
//  limit: 从今天开始 禁用几天
//  ignore_date： 忽略日期

function createdisableDates(limit = 0, ignore_date = []) {
  const temp = []
  const one_day = 60 * 60 * 24 * 1000

  for (let index = 0; index < limit; index++) {
    const time = new Date(+new Date() + (one_day * index))
    const str = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`

    if (ignore_date.includes(str)) {
        continue
    }

    temp.push(str)
  }

  return temp
}


const testRides = [
  {
    city: 'California',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Bicycle_Garage_Fremont_fremont.jpg?v=1665374978',
    stores: [
      {
        name: 'Bicycle Garage Fremont',
        phone: '510-795-9622',
        email: 'bikeshoptina@gmail.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "5006 Mowry Avenue, Fremont, CA 94538",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Bicycle_Garage_Fremont_fremont.jpg?v=1665374978",
        testrideSpot: "California",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon One Size M/L',
        ],
        businessHours: [
          "11:00-17:00",
          "10:00-19:00",
          "",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-18:00"
        ],
      },
      {
        name: 'Groove E-Bikes',
        phone: '949-274-7944',
        email: 'bob@grooveebikes.com',
        timezone: "Newport Beach, CA, USA (GMT-8)",
        add: "3740 Campus Drive, Suite A, Newport Beach, 92660",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/test-ride-groove_ebike.png?v=1670312992",
        testrideSpot: "California",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon One Size M/L',
        ],
        businessHours: [
          "11:00-15:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
        ],
      },
    ]
  },
]
