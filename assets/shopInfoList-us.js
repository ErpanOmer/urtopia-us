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
    city: 'Fremont',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Bicycle_Garage_Fremont_fremont.jpg?v=1665374978',
    stores: [
      {
        name: 'Bicycle Garage Fremont',
        phone: '510-795-9622',
        email: 'bikeshoptina@gmail.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "5006 Mowry Avenue, Fremont, CA 94538",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Bicycle_Garage_Fremont_fremont.jpg?v=1665374978",
        testrideSpot: "Fremont",
        testRideSize: "M/L",
        businessHours: [
          "",
          "09:00-12:00,12:00-18:00",
          "09:00-12:00,12:00-18:00",
          "09:00-12:00,12:00-18:00",
          "09:00-12:00,12:00-18:00",
          "09:00-12:00,12:00-18:00",
          "",
        ],
      },
    ]
  },
]
