const oneDay = 24 * 60 * 60 * 1000
const now = +new Date()

// 禁用日期 最大天数
const disable_date_max_limit = 60

const getData = (date = new Date()) => {
  if (typeof date !== 'object') {
    if (typeof date === 'string') {
      date = date.replace(/-/g, '/')
    }

    date = new Date(date)
  }

  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)

  return date
}

const getDateString = function (date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

// 查询日期偏移量
const findOffset = ([nowWeek, vailableWeek]) => {
  if (nowWeek === vailableWeek) {
    return 0
  }

  return vailableWeek > nowWeek ? vailableWeek - nowWeek : 7 - (nowWeek - vailableWeek)
}

function getBikeAndSeries (availableSizes = []) {
  return availableSizes.map(size => {
      const [bike, series] = size.split(' ')

      return `${bike}${series ? ' ' + series : ''}`
  })
}

// 查找可预约到星期几
const findAvailableWeek = (d, businessHours) => {
  if (businessHours[d]) {
    return d
  }

  for (let i = d; i < d + 7; i++) {

    if (businessHours[i % 7]) {
      return i % 7
    }
  }

  return -1
}

// 查询禁用日期
const findDisable = (str, index = 0, disableDate = []) => {
  for (let i = index; i < disableDate.length; i++) {
    if (disableDate[i] === str) {
      return i
    }
  }
}

const dateToString = (time = new Date()) => {
  time = time.toString().split(' ')
  return `${time[2]}. ${time[1]}`
}

// 可用日期计算
const findAvalibaleDate = store => {
  let index = 0
  let date = now

  for (let i = 0; index < disable_date_max_limit; index++) {
    const d = getData(date)
    const str = getDateString(d)

    // 保存上次 循环的index
    index = findDisable(str, index, store.disableDate)

    if (!isNaN(index)) {
      date = Number(d) + oneDay
      continue
    }

    const currentWeek = d.getDay()
    const AvailableWeek = findAvailableWeek(currentWeek, store.businessHours)

    if (AvailableWeek === -1) {
      date = now
      break
    }

    if (currentWeek === AvailableWeek) {
      date = str
      break
    }

    date = Number(d) + (oneDay * findOffset([currentWeek, AvailableWeek]))
  }

  return dateToString(getData(date))
}

//  禁用日期动态生成函数
//  disable_limit:  禁用几天               格式:  365 或者区间 [['2023-9-10', '2023-10-10'], ['2023-10-22', '2023-11-10']]
//  ignore_date：   跳过某些日期不禁用      格式:  ['2023-7-27', '2023-7-28', '2023-7-29']  
//  start_time:     从什么时候开始禁用      格式： 2023-7-27 （默认今天)

function createdisableDates(disable_limit = 0, ignore_date = [], start_time = new Date()) {
  let temp = []

  if (Array.isArray(disable_limit)) {
    for (const iterator of disable_limit) {
      if (typeof iterator === 'string') {
        temp.push(getDateString(getData(iterator)))
        continue
      }

      let start = getData(iterator[0])
      let end = getData(iterator[1])

      for (let index = 0; index < disable_date_max_limit; index++) {
        if (Number(start) === Number(end)) {
          break
        }

        temp.push(getDateString(start))

        start = getData(oneDay + Number(start))
      }


      temp.push(getDateString(end))
    }
  } else {
    let start = getData(start_time)

    for (let index = 0; index < disable_limit; index++) {
      temp.push(getDateString(start))
      start = getData(oneDay + Number(start))
    }
  }

  temp = temp.slice(0, Math.min(disable_date_max_limit, temp.length))

  for (const iterator of ignore_date) {
    const date = getDateString(getData(iterator))

    const index = temp.findIndex(t => t === date)

    if (index > -1) {
      temp.splice(index, 1)
    }
  }

  return temp
}


const testRides = [
  {
    city: 'California',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/what-is-california-known-for-the-golden-gate-bridge-hero.webp?v=1697020664',
    stores: [
      /*{
        name: 'Bicycle Garage Fremont',
        phone: '510-795-9622',
        email: 'bikeshoptina@gmail.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "5006 Mowry Avenue, Fremont, CA 94538",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Bicycle_Garage_Fremont_ca_fremont.jpg?v=1686878451",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Size M'
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
      },*/
      /*{
        name: 'Velocipede Cyclery',
        phone: '415-796-3465',
        email: 'bikeshoptina@gmail.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "2405 3rd street San Francisco, CA 94107",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Velocipede_Cyclery.jpg?v=1686878451",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Size M'
        ],
        businessHours: [
          "10:00-17:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "",
          "10:00-19:00",
          "09:00-18:00"
        ],
      },*/
      /*{
        name: 'Groove E-Bikes',
        phone: '949-274-7944',
        email: 'bob@grooveebikes.com',
        timezone: "Newport Beach, CA, USA (GMT-8)",
        add: "3740 Campus Drive, Suite A, Newport Beach, 92660",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Groove_E-Bikes_3.jpg?v=1686878451",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
        ],
      },*/
      {
        name: 'Icar Lifestyle',
        phone: '310-926-6999',
        email: 'sales@icarlifestyle.com',
        timezone: "Newport Beach, CA, USA (GMT-8)",
        add: "414 Rolyn Pl, Arcadia, CA 91007, United States",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Icar_Lifestyle.jpg?v=1686878451",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1s Size M',
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "",
        ],
      },
      {
        name: 'InnoStudio',
        phone: '857-320-5186',
        email: 'baronwang@longhamtec.com',
        timezone: "Newport Beach, CA, USA (GMT-8)",
        add: "9621 Brighton Way Beverly Hills CA, 90210",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Icar_Lifestyle.jpg?v=1686878451",
        testrideSpot: "Beverly Hills",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "",
        ],
      },
      {
        name: 'E-bike Premier',
        phone: '818-478-5262',
        email: 'ebikes@boostmore.com',
        timezone: "Newport Beach, CA, USA (GMT-8)",
        add: "18247 Parthenia St, Northridge, CA 91325",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Icar_Lifestyle.jpg?v=1686878451",
        testrideSpot: "Northridge",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "12:30-16:30",
        ],
      },
      {
        name: "Bike Attack Playa Vista",
        phone: "310-862-5001",
        email: "info@BikeAttack.com",
        timezone: "Los Angeles, CA, USA (GMT-7)",
        add: "12775 W Millennium, Los Angeles, CA 90094",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-BikeAttackPlayaVista.jpg?v=1665374977",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Size L'
        ],
        businessHours: [
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
      {
        name: "Bike Attack Santa Monica",
        phone: "(424) 744-8148",
        email: "info@BikeAttack.com",
        timezone: "Los Angeles, CA, USA (GMT-7)",
        add: "2904 Main St, Santa Monica, CA 90405",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-BikeAttackPlayaVista.jpg?v=1665374977",
        testrideSpot: "Santa Monica",
        availableSizes: [
          'Carbon 1 Pro Size M'
        ],
        businessHours: [
          "10:00-17:30",
          "10:00-17:30",
          "10:00-17:30",
          "10:00-17:30",
          "10:00-17:30",
          "10:00-17:30",
          "10:00-17:30",
        ],
      },
      {
        name: "DTLA Bikes",
        phone: "213-533-8000",
        email: "rodney@dtlabikes.com",
        timezone: "Los Angeles, CA, USA (GMT-7)",
        add: "425 S. Broadway, Los Angeles, CA 90013",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-dtla_bikes.jpg?v=1665374977",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "9:30-18:30",
          "9:30-18:30",
          "9:30-18:30",
          "9:30-18:30",
          "9:30-18:30",
          "9:30-18:30",
          "",
        ],
      },
      {
        name: "ELV Motors",
        phone: "408-850-8191",
        email: "doug@elvmotors.com",
        timezone: "Santa Clara, CA, USA (GMT-7)",
        add: "2332 El Camino Real, Santa Clara, CA 95050",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-ELV_Motors_ca_san_jose.jpg?v=1665374977",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Size M/L',
        ],
        businessHours: [
          "12:00-16:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-17:00"
        ],
      },
      {
        name: "Eze Ryders Electric Bikes",
        phone: "619-786-7161",
        email: "sales@ezeryders.com",
        timezone: "San Diego, CA, USA (GMT-7)",
        add: "1926 Bacon St, San Diego, CA 92107",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Eze_Ryders_Electric_Bikes_san_dieago.jpg?v=1686878451",
        testrideSpot: "California",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon 1 Size M',
          'Carbon 1 Pro Size M'
        ],
        businessHours: [
          "11:00-18:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
       {
        name: "Burn The Ships Electrics",
        phone: "310-372-1122",
        email: "info@burntheshipselectrics.com ",
        timezone: "San Diego, CA, USA (GMT-7)",
        add: "1012 S Pacific Coast Hwy Suite B, Redondo Beach, CA 90277",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output.png?v=1712745720",
        testrideSpot: "California",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1s Size M',
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "12:00-17:00",
          "",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00"
        ],
      },
      {
        name: "Rebel Bikes Electric",
        phone: "(951) 894-2453",
        email: "shelliekay122@gmail.com",
        timezone: "San Diego, CA, USA (GMT-7)",
        add: "26175 Jefferson Ave STE 200, Murrieta, CA 92562",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20230718-121032.jpg?v=1689658963",
        testrideSpot: "California",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00"
        ],
      },
      {
        name: "California eBikes",
        phone: "(916) 699-7872",
        email: "fairoakscoastalcruisers@gmail.com ",
        timezone: "San Diego, CA, USA (GMT-7)",
        add: "8522 Madison Ave, Fair Oaks, CA 95628, United States ",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20230725-174130.jpg?v=1690278127",
        testrideSpot: "California",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-16:00"
        ],
      },
      {
        name: "Bakari Chavanu",
        phone: "916-402-5841",
        email: "bakaric@me.com",
        timezone: "San Diego, CA, USA (GMT-7)",
        add: "Elk Grove, CA 95624 ",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/No1-DJI_0605-1024x576.jpg?v=1693830949",
        testrideSpot: "California",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "12:00-18:00",
          "",
          "",
          "",
          "",
          "",
          "12:00-18:00"
        ],
        isPartner: true,
      },
      {
        name: 'IB Rents',
        phone: '(619)-227-7734',
        email: 'ibeachrents@gmail.com',
        timezone: "California, USA (GMT-7)",
        add: "235 Palm Ave. Imperial Beach, CA 91932",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/IB_Rents.jpg?v=1695291344",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Size M'
        ],
        businessHours: [
          "10:00-17:00",
          "",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "10:00-17:00",
        ],
      },
      {
        name: 'Dawna Stone',
        phone: '559760-5838',
        email: 'dawnastone2525@gmail.com',
        timezone: "California, USA (GMT-7)",
        add: "Cara Way, Temecula, CA 92591",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/what-is-california-known-for-the-golden-gate-bridge-hero.webp?v=1697020664",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Size M',
          'Carbon 1s Size S'
        ],
        businessHours: [
          "10:00-19:00",
          "",
          "",
          "",
          "",
          "",
          "10:00-19:00",
        ],
        isPartner: true,
      },
      {
        name: 'Fred DiDominick',
        phone: '(630) 291-7648',
        email: 'fdidominick@gmail.com',
        timezone: "California, USA (GMT-7)",
        add: "Fire Barrel Drive, La Quinta, CA. 92253",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/what-is-california-known-for-the-golden-gate-bridge-hero.webp?v=1697020664",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
        ],
        isPartner: true,
      },
      {
        name: "Buy My Bikes",
        phone: "949-493-5611",
        email: "jim@buymybikes.com",
        timezone: "California, USA (GMT-7)",
        add: "32302 Camino Capistrano St 101, San Juan Capistrano, CA 92675",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Buy_My_Bikes.jpg?v=1702462014",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "10:00-16:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-16:00",
        ],
      },
      {
        name: "Cycling World",
        phone: "(626) 775-4141",
        email: "contact@cyclingworldusa.com",
        timezone: "California, USA (GMT-7)",
        add: "503 W. Duarte Road, Monrovia, CA 91016",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_701250bb-5882-4a90-9d1c-e44d230dc75a.jpg?v=1712713565",
        testrideSpot: "Monrovia",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Chord',
          'Chord X'
        ],
        businessHours: [
          "10:00-16:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "",
        ],
      },
      {
        name: "Hero Boy Bike Shop",
        phone: "(310) 686-6902",
        email: "eltohamyaly@gmail.com",
        timezone: "California, USA (GMT-7)",
        add: "12848 Hawthorne Blvd, Hawthorne, CA 90250",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_1.jpg?v=1712713664",
        testrideSpot: "Hawthorne",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
        ],
      },
    ]
  },
  {
    city: 'New York',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/New_york_times_square-terabass.jpg?v=1696759734',
    stores: [
      {
        name: "Spokesman Cycles (LIC)",
        phone: "718-433-0450",
        email: "bikesnyc@gmail.com",
        timezone: "Long Island City, Queens, NY, USA (GMT-4)",
        add: "49-04 Vernon Blvd, Long Island City, NY 11101",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Spokesman_Cycles_LIC_ny.jpg?v=1665374977",
        testrideSpot: "New York",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
        ],
      },
      {
        name: "Spokesman Cycles (Glendale)",
        phone: "929-295-0955",
        email: "bikesnyc@gmail.com",
        timezone: "Queens, NY, USA (GMT-4)",
        add: "78-17 Myrtle Ave, Queens, NY 11385",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Spokesman_Cycles_Midtown.jpg?v=1667438644",
        testrideSpot: "New York",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "11:00-18:00",
          "",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
        ],
      },
      {
        name: "BikeFixNYC",
        phone: "347 463 3876",
        email: "bikefixnyc@gmail.com",
        timezone: "Long Island City, Queens, NY, USA (GMT-4)",
        add: "334 E 6th St, New York, NY 10003",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/BikeFixNYC.jpg?v=1686878451",
        testrideSpot: "New York",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "14:00-19:00",
          "13:00-19:00",
          "13:00-19:00",
          "13:00-19:00",
          "13:00-19:00",
          "13:00-19:00",
          "13:00-19:00",
        ],
      },
      
      {
        name: "Liberty Cycles",
        phone: "212-375-3360",
        email: "libertycycles846@gmail.com",
        timezone: "Long Island City, Queens, NY, USA (GMT-4)",
        add: "846 9th Ave, New York, NY 10019",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Liberty_Cycles.jpg?v=1686878451",
        testrideSpot: "New York",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "10:00-18:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
        ],
      },
      {
        name: "Richard Fine",
        phone: "914-523-3207",
        email: "richardfine42@hotmail.com",
        timezone: "New York, Queens, NY, USA (GMT-4)",
        add: "Rhinebeck NY, 12572",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/New_york_times_square-terabass.jpg?v=1696759734",
        testrideSpot: "New York",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
        ],
        isPartner: true,
      },
    ]
  },
  {
    city: 'New Jersey',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977',
    stores: [
      {
        name: "Tailor Fit Cycles",
        phone: "(800) 401-0693",
        email: "info@tailorfitcycles.com",
        timezone: "New Jersey, USA (GMT-4)",
        add: "19 Russling Rd, Hackettstown, NJ 07840",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Jersey_City_Bicycles_Co.jpg?v=1686878451",
        testrideSpot: "Hackettstown",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "11:00-18:00",
          "",
          "",
          "",
          "",
          "15:00-19:00",
          "09:00-18:00",
        ],
      },
      {
        name: "Clinton Rides ",
        phone: "908-312-3264",
        email: "info@clintonrides.com",
        timezone: "New Jersey, USA (GMT-4)",
        add: "26 Main Street, Clinton, New Jersey 08809",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Clinton_Rides.jpg?v=1709086589",
        testrideSpot: "New Jersey",
        availableSizes: [
          'Chord',
          'Chord X',
        ],
        businessHours: [
          "12:00-18:00 (By Appointment)",
          "12:00-18:00 (By Appointment)",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00",
        ],
      },
    ]
  },
  {
    city: 'Georgia',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977',
    stores: [
      /*{
        name: "Aztec Cycles",
        phone: "678-636-9043",
        email: "aztec718@gmail.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "901 Main Street, Stone Mountain, GA 30083",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Aztec_Cycles.jpg?v=1686878451",
        testrideSpot: "Georgia",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-17:00",
        ],
      },*/
    ]
  },
  {
    city: 'Pennsylvania',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977',
    stores: [
      /*{
        name: "Bell's Bike Shop",
        phone: "215-857-5793",
        email: "steve@bellsbikeshop.com",
        timezone: "Pennsylvania, USA (GMT-4)",
        add: "1320 E Passyunk Ave, Philadelphia, PA 19147",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Bell_s_Bike_Shop.jpg?v=1686878451",
        testrideSpot: "Pennsylvania",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-18:00",
          "10:00-17:00",
        ],
      },*/
      {
        name: "Drexel Hill Cyclery",
        phone: "610-626-4477",
        email: "drexhillcycles@gmail.com",
        timezone: "Pennsylvania, USA (GMT-4)",
        add: "703 Burmont Rd, Drexel Hill, PA 19026",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Drexel_Hill_Cyclery_pa.jpg?v=1686878451",
        testrideSpot: "Pennsylvania",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "09:00-17:00",
        ],
      },
      {
        name: "Kayuh Bicycles & Cafe",
        phone: "215-235-1838",
        email: "henry@kayuhbicycles.com",
        timezone: "Pennsylvania, USA (GMT-4)",
        add: "1900 W Girard Ave, Philadelphia, PA 19130",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Kayuh_Bicycles_Cafe.jpg?v=1686878451",
        testrideSpot: "Pennsylvania",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "07:00-16:00",
          "07:00-16:00",
          "07:00-16:00",
          "07:00-16:00",
          "07:00-16:00",
          "07:00-16:00",
        ],
      },
      {
        name: "FITNESS EXCHANGE CONSHOHOCKEN",
        phone: "610-551-9266",
        email: "sales@fitnessexchange.com",
        timezone: "Pennsylvania, USA (GMT-4)",
        add: "1004 Ridge Pike Conshohocken, PA 19428",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/FITNESS_EXCHANGE_CONSHOHOCKEN.jpg?v=1696118203",
        testrideSpot: "Pennsylvania",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "11:00-17:00",
        ],
      },
      {
        name: "FITNESS EXCHANGE EMMAUS",
        phone: "610-551-9266",
        email: "sales@fitnessexchange.com",
        timezone: "Pennsylvania, USA (GMT-4)",
        add: "693 State Ave I Emmaus, PA 18049 ",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/FITNESS_EXCHANGE_EMMAUS.webp?v=1696118202",
        testrideSpot: "Pennsylvania",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
      {
        name: "Marty's Bicycle Shop",
        phone: "(570) 546-3142",
        email: "Marty@martysbicycles.com",
        timezone: "Pennsylvania, USA (GMT-4)",
        add: "160 E Water St, Muncy, PA 17756",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Muncy_Ritz.jpg?v=1713857360",
        testrideSpot: "Muncy",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "",
          "10:00-19:00",
          "10:00-19:00",
          "",
          "10:00-19:00",
          "10:00-19:00",
          "09:00-15:00",
        ],
      },
    ]
  },
  {
    city: 'Massachusetts',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977',
    stores: [
      /*{
        name: "Battle Road Bikes",
        phone: "781-734-6464",
        email: "jimc@battleroadbikes.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "145 Massachusetts Ave, Lexington, MA 02420",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Battle_Road_Bikes.jpg?v=1686878451",
        testrideSpot: "Massachusetts",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "11:00-17:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },*/
      /*{
        name: "Dedham Bike",
        phone: "781-326-1531",
        email: "info@dedhambike.com, matt@dedhambike.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "403 Washington St, Dedham, MA 02026",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Dedham_Bike.jpg?v=1686878451",
        testrideSpot: "Massachusetts",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "12:00-16:00",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "09:00-17:00",
        ],
      },*/
      {
        name: "Evolution E-Bikes",
        phone: "888-545-2453",
        email: "David@EvolutionE-Bikes.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "25 Accord Park Dr.  Unit 3 Rockland, MA 02341",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Evolution_E-Bikes.jpg?v=1691635464",
        testrideSpot: "Massachusetts",
        availableSizes: [
          'Carbon 1s Size S',
        ],
        businessHours: [
          "",
          "",
          "14:00-17:00",
          "14:00-17:00",
          "14:00-17:00",
          "14:00-17:00",
          "10:00-11:00,14:00-16:00",
        ],
      },
    ]
  },
  {
    city: 'Washington',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_3_c6001537-5c6a-4915-8ed1-9f21dfc55d76.png?v=1718085498',
    stores: [
      {
        name: "Baby-Boomer Bikes",
        phone: "564-233-5898",
        email: "chazz@babyboomerbikes.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "8300 28th Ct NE #500, Lacey, WA 98516",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_3_c6001537-5c6a-4915-8ed1-9f21dfc55d76.png?v=1718085498",
        testrideSpot: "Lacey",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Chord X'
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "09:00-17:00",
        ],
      },
    ]
  },
  {
    city: 'Maryland',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_4_0d6b1e4d-def2-4565-9aba-0d2241618ead.png?v=1718085649',
    stores: [
      {
        name: "The Bicycle Place",
        phone: "301-588-6160",
        email: "thebicycleplace1@gmail.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "11770 Parklawn Drive, Rockville, MD 20852",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_4_0d6b1e4d-def2-4565-9aba-0d2241618ead.png?v=1718085649",
        testrideSpot: "Rockville",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "12:00-17:00",
        ],
      },
    ]
  },
  {
    city: 'Florida',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/shutterstock_469708088.jpg?v=1697188978',
    stores: [
      {
        name: "E-Cycle Adventures",
        phone: "+1 727-819-0627",
        email: "ecycleadventures@gmail.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "9904 Little Rd, New Port Richey, FL 34654",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-E-Cycle_Adventures_fl.jpg?v=1665374977",
        testrideSpot: "Florida",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "12:00-16:00",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
      {
        name: "Meca Ebikes",
        phone: "305-431-5520",
        email: "sales@MECAeBIKES.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "8115 NW 93 Street, Medley FL 33166",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-E-Cycle_Adventures_fl.jpg?v=1665374977",
        testrideSpot: "Florida",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-15:00",
        ],
      },
      {
        name: "ELECRUISER ELECTRIC BIKES",
        phone: "561-680-2454",
        email: "info@elecruiser.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "1954 NE 5th Avenue 5th Avenue Shops, Boca Raton, Florida 33431",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_6_13c365c1-87a3-41d3-8879-b6dd7d62a503.png?v=1718329085",
        testrideSpot: "Boca Raton",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
        ],
        businessHours: [
          "11:00-16:00",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
      {
        name: "Wheel Works E-Bikes",
        phone: "407-614-4539",
        email: "dennis@wgwheelworks.com, shanna@wgwheelworks.com",
        timezone: "Orlando, FL (GMT-4)",
        add: "855 E Plant St Suite 600, Winter Garden, FL 34787",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Wheel_Works_E-Bikes.jpg?v=1667368641",
        testrideSpot: "Florida",
        availableSizes: [
          'Carbon 1 Size M',
          'Carbon 1s Size M'
        ],
        businessHours: [
          "11:00-17:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "09:00-17:00",
        ],
      },
      {
        name: "Espresso Bicycle Repairs",
        phone: "941-893-5209",
        email: "espressobicyclerepairs@gmail.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "7632 Lockwood Ridge Rd, Sarasota, FL 34243",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20230731-114143.jpg?v=1690775188",
        testrideSpot: "Florida",
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "10:00-17:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-17:00",
        ],
      },
      {
        name: "José Luis",
        phone: "951-451-1300",
        email: "adonai01@me.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "6970 Bird Rd. 108. Miami Fl 33155, US",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/shutterstock_469708088.jpg?v=1697188978",
        testrideSpot: "Florida",
        availableSizes: [
          'Carbon 1s Size M',
          'Chord',
        ],
        businessHours: [
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
        ],
        isPartner: true,
      },
      {
        name: "Robert Ryba",
        phone: "443-994-9060",
        email: "robert.ryba@yahoo.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "Joes Point Road Stuart Fl 34996",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/shutterstock_469708088.jpg?v=1697188978",
        testrideSpot: "Florida",
        noBook: 'Must call for an appoitment.  ---Robert Ryba',
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
        ],
        isPartner: true,
      },
      {
        name: "E-Station Sarasota",
        phone: "941-705-2528",
        email: "ty@estationsrq.com",
        timezone: "FL, USA (GMT-4)",
        add: "4450 S. Tamiami Trail Sarasota, FL 34231",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/E-Station_Sarasota.png?v=1700672076",
        testrideSpot: "Florida",
        availableSizes: [
          'Carbon 1 Size L',
          'Carbon 1s Size M/L',
          'Chord',
          'Chord X',
        ],
        businessHours: [
          "11:00-16:00",
          "",
          "9:00-18:00",
          "9:00-18:00",
          "",
          "9:00-18:00",
          "9:00-18:00",
        ],
      },
      {
        name: "E-Bikes and Cycles",
        phone: "(941) 531-2453",
        email: "russ@ebikesandcycles.com",
        timezone: "FL, USA (GMT-4)",
        add: "7941 Pinehurst St, Sarasota, FL 34243",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/E-Bikes_and_Cycles.jpg?v=1709124879",
        testrideSpot: "Florida",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
          'Chord',
          'Chord X',
        ],
        businessHours: [
          "",
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
        ],
      },
    ]
  },
  {
    city: 'Texas',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Playtri_dallas.jpg?v=1665374977',
    stores: [
      {
        name: "Bay Area Cycling",
        phone: "713-472-6651",
        email: "salespas@bayareacycling.com",
        timezone: "Dallas, TX, USA (GMT-5)",
        add: "2049 S Richey St, Pasadena, TX 77502",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Bay_Area_Cycling_tx.jpg?v=1686878451",
        testrideSpot: "Texas",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "12:00-17:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "09:00-17:00",
        ],
      },
      {
        name: "Oak Cliff Bike Synergy",
        phone: "469-456-1136",
        email: "jorge@oakcliffbikesynergy.com",
        timezone: "Dallas, TX, USA (GMT-5)",
        add: "1300 S Polk St, Suite #152, Dallas, TX 75224",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Oak_Cliff_Bike_Synergy.jpg?v=1686878451",
        testrideSpot: "Texas",
        availableSizes: [
          'Carbon 1 Size M',
          'Carbon 1s Size S/M/L',
          'Chord',
          'Chord X',
        ],
        businessHours: [
          "10:00-18:00",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
    ]
  },
  {
    city: 'West Virginia',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Playtri_dallas.jpg?v=1665374977',
    stores: [
      {
        name: "The Emporium",
        phone: "304-913-4290",
        email: "eccoproperties1@gmail.com",
        timezone: "Dallas, TX, USA (GMT-5)",
        add: "921 Mercer St, Princeton, WV 24740, United States",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/The_Emporium.jpg?v=1686878451",
        testrideSpot: "West Virginia",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
    ]
  },
    {
    city: 'Alaska',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/LoopEride.png?v=1687327237',
    stores: [
      {
        name: "LoopEride",
        phone: "907-435-7437",
        email: "dale@loopylupine.com",
        timezone: "AK, USA (GMT-5)",
        add: "195 E Bunnell Ave, Homer, AK 99603, United States",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/LoopEride.png?v=1687327237",
        testrideSpot: "Alaska",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "",
          "",
          "",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00",
        ],
      },
    ]
  },
   {
    city: 'Iowa',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Ebike_Iowa.png?v=1687327236',
    stores: [
      {
        name: "Ebike Iowa",
        phone: "(515) 400-3970",
        email: "john.burdine@gmail.com",
        timezone: "Iowa, USA (GMT-5)",
        add: "1900 E Lincoln Way, Suite B, Ames, Iowa 50010",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Ebike_Iowa.png?v=1687327236",
        testrideSpot: "Iowa",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "12:00-17:00",
          "12:00-17:00",
          "",
          "",
          "12:00-17:00",
          "10:00-14:00",
        ],
      },
    ]
  },
  {
    city: 'Utah',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/WinterSkyline-DouglasPuslipher-Alamy-D44ETX31-1024x683_jpg.webp?v=1689229044',
    stores: [
      {
        name: "E-Power Bike and Board",
        phone: "435-315-3044",
        email: "epowerbb@gmail.com",
        timezone: "Utah, USA (GMT-7)",
        add: "44 West 100 South Heber City, UT 84032",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/E-Power_Bike_and_Board_1.jpg?v=1689228575",
        testrideSpot: "Utah",
        availableSizes: [
          'Carbon 1 Size M/L',
          'Carbon 1 now instock',
        ],
        businessHours: [
          "",
          "",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-15:00",
        ],
      },
    ]
  },
  {
    city: 'Oklahoma',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/OP7039_oklahoma-city.jpg?v=1692092307',
    stores: [
      {
        name: "Thomas J. Kerr Jr",
        phone: "405-474-5965",
        email: "tjkok67@gmail.com",
        timezone: "Oklahoma, USA (GMT-7)",
        add: "Edmond, OK 73013",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/OP7039_oklahoma-city.jpg?v=1692092307",
        testrideSpot: "Oklahoma",
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "12:00-19:00",
          "16:00-19:00",
          "16:00-19:00",
          "16:00-19:00",
          "16:00-19:00",
          "16:00-19:00",
          "12:00-19:00",
        ],
        isPartner: true,
      },
      {
        name: "Bixby Bicycles",
        phone: "918-943-6700",
        email: "info@bixbybicycles.com",
        timezone: "Oklahoma, USA (GMT-7)",
        add: "8315 E. 111th St S, Unit C, Bixby, Oklahoma 74008",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Bixby_Bicycles.jpg?v=1710818582",
        testrideSpot: "Oklahoma",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
          'Chord',
          'Chord X',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-17:00",
        ],
      },
    ]
  },
  {
    city: 'Mississippi',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/The_Bike_Crossing.png?v=1692265471',
    stores: [
      {
        name: "The Bike Crossing",
        phone: "691-856-0069",
        email: "tbcridgeland@gmail.com",
        timezone: "Mississippi, USA (GMT-7)",
        add: "192 Old Town Crossing, Ridgeland, MS 39157",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/The_Bike_Crossing.png?v=1692265471",
        testrideSpot: "Mississippi",
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-17:00",
        ],
      },
    ]
  },
  {
    city: 'Illinois',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Jason_Mathews.jpg?v=1692617852',
    stores: [
      {
        name: "Jason Mathews",
        phone: "708-493-4896",
        email: "akafenoy@gmail.com",
        timezone: "Illinois, USA (GMT-7)",
        add: "1542 King Drive Berkeley, ILL 60163",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Jason_Mathews.jpg?v=1692617852",
        testrideSpot: "Illinois",
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "",
          "10:00-17:00",
          "",
          "",
          "",
          "10:00-17:00",
          "10:00-17:00",
        ],
        isPartner: true,
      },
    ]
  },
  {
    city: 'Colorado',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/co.webp?v=1695291345',
    stores: [
      {
        name: "Ebike Tours & Rental",
        phone: "719-246-2675",
        email: "gcobble@gmail.com",
        timezone: "Colorado, USA (GMT-7)",
        add: "906 Manitou Avenue, #102, Manitou Springs, CO. 80829",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/E-Bike_Sales_and_Rental.png?v=1695291344",
        testrideSpot: "Colorado",
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "11:00-16:00",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-17:00",
        ],
      },
      {
        name: "Bill Mestrezat",
        phone: "941-223-4865",
        email: "eyefxer@aim.com",
        timezone: "Colorado, USA (GMT-7)",
        add: "Washburn Ave, Lakewood, CO 80228",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/co.webp?v=1695291345",
        testrideSpot: "Colorado",
        noBook: 'Contact Bill to schedule a time.',
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
        ],
        isPartner: true,
      },
      {
        name: "EForce Bikes",
        phone: "(720) 724-9777",
        email: "info@eforcebikes.com",
        timezone: "Colorado, USA (GMT-7)",
        add: "3871 Tennyson St, Denver, CO 80212",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/co.webp?v=1695291345",
        testrideSpot: "Denver",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
        ],
        businessHours: [
          "13:00-17:00",
          "",
          "12:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
        ],
      },
    ]
  },
  {
    city: 'Boulder',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Boulder_Large_2223a94d-810c-44ad-a54a-5cf0b16e76e7.jpg?v=1697019539',
    stores: [
      /*{
        name: "Michael Gehmeyr",
        phone: "303-324-6617",
        email: "michael_gehmeyr@hotmail.com",
        timezone: "Boulder, USA (GMT-7)",
        add: "Scrub Oak Cir, Boulder, CO 80305",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Boulder_Large_2223a94d-810c-44ad-a54a-5cf0b16e76e7.jpg?v=1697019539",
        testrideSpot: "Boulder",
        availableSizes: [
          'Carbon 1s Size S',
        ],
        businessHours: [
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
        isPartner: true,
      },*/
    ]
  },
  {
    city: 'North Carolina',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/North-Carolina.jpg?v=1697188784',
    stores: [
      {
        name: "Ben Major",
        phone: "910-964-4528",
        email: "benjaminmajor2019@gmail.com",
        timezone: "North Carolina, USA (GMT-7)",
        add: "Gables Dr.  Fayetteville, NC 28311",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/North-Carolina.jpg?v=1697188784",
        testrideSpot: "North Carolina",
        availableSizes: [
          'Carbon 1s Size M/L',
        ],
        businessHours: [
          "11:00-19:00",
          "14:00-19:00",
          "14:00-19:00",
          "14:00-19:00",
          "14:00-19:00",
          "14:00-19:00",
          "14:00-19:00",
        ],
        isPartner: true,
      },
      {
        name: "Asheville Custom E-Bikes",
        phone: "828-595-4295",
        email: "admin@theacebikes.com",
        timezone: "North Carolina, USA (GMT-7)",
        add: "732 Haywood Rd, Asheville, NC 28806",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Asheville_Custom_E-Bikes.jpg?v=1709124879",
        testrideSpot: "North Carolina",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
          'Chord',
          'Chord X',
        ],
        businessHours: [
          "",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
    ]
  },
  {
    city: 'Delaware',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Milton_Delaware.jpg?v=1702122567',
    stores: [
      {
        name: "Gilberto Medina",
        phone: "610-675-5108",
        email: "gilbertmedina1@gmail.com",
        timezone: "Delaware, USA (GMT-7)",
        add: "Millstone Drive Milton, Delaware 19968",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Milton_Delaware.jpg?v=1702122567",
        testrideSpot: "Delaware",
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "7:00-17:00",
          "",
          "",
          "",
          "",
          "",
          "7:00-17:00",
        ],
        isPartner: true,
      },
      {
        name: "Seaside Eco Bikes",
        phone: "302-329-8088",
        email: "Gilberto.medina@seasideecobikes.com",
        timezone: "Delaware, USA (GMT-7)",
        add: "16779 Coastal Highway unit 1, Lewes DE 19958",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_5_8de340fe-da72-48e6-a73c-772a830b0a27.png?v=1718328789",
        testrideSpot: "Lewes",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Chord'
        ],
        businessHours: [
          "10:00-18:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
        isPartner: true,
      },
    ]
  },
  {
    city: 'Ohio',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/OHIO.jpg?v=1702380729',
    stores: [
      {
        name: "Bill Connelly",
        phone: "513-703-7777",
        email: "bill@wbconnelly.com",
        timezone: "Ohio, USA (GMT-7)",
        add: "1071 Celestial St.Cincinnati, OH 45202",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Bill_Connelly.jpg?v=1710809963",
        testrideSpot: "Ohio",
        availableSizes: [
          'Carbon 1s Size L',
        ],
        businessHours: [
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
        ],
        isPartner: true,
      },
    ]
  },
  {
    city: 'Virginia',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Strictly_Ebikes.jpg?v=1709208572',
    stores: [
      {
        name: "Strictly Ebikes",
        phone: "571-312-5505",
        email: "info@strictly-ebikes.com",
        timezone: "Virginia, USA (GMT-7)",
        add: "683 N Washington St, Alexandria, VA 22314",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Strictly_Ebikes.jpg?v=1709208572",
        testrideSpot: "Virginia",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
          'Carbon 1s Size M',
          'Chord',
        ],
        businessHours: [
          "10:00-18:00",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
    ]
  },
  {
    city: 'Minnesota',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Power_Pedal_Center.png?v=1710818584',
    stores: [
      {
        name: "Power Pedal Center",
        phone: "612-564-9207",
        email: "michael@appliancerenew.com",
        timezone: "Minnesota, USA (GMT-7)",
        add: "821 3rd Street, Suite 140, Farmington, Minnesota 55024",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Power_Pedal_Center.png?v=1710818584",
        testrideSpot: "Minnesota",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
          'Chord X',
        ],
        businessHours: [
          "",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-15:00",
        ],
      },
      {
        name: "MINN Ebikes",
        phone: "507-382-4404",
        email: "john@northsole.co",
        timezone: "Minnesota, USA (GMT-7)",
        add: "13000 Maywood Ln, Minnetonka, MN 55343",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Power_Pedal_Center.png?v=1710818584",
        testrideSpot: "Minnetonka",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-17:00",
        ],
      },
    ]
  },
  {
    city: 'Michigan',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/West_Michigan_eBikes.jpg?v=1710818582',
    stores: [
      {
        name: "West Michigan eBikes",
        phone: "616-826-3574",
        email: "william@greenprojectsgroup.com",
        timezone: "Michigan, USA (GMT-7)",
        add: "2651 Brooklane Ave SE, Grand Rapids, MI 49507",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/West_Michigan_eBikes.jpg?v=1710818582",
        testrideSpot: "Michigan",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
          'Chord X',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
    ]
  },
  {
    city: 'Arizona',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urban_Electrica.jpg?v=1710818582',
    stores: [
      {
        name: "Urban Electrica",
        phone: "(602) 856-4566",
        email: "info@urbanelectrica.com",
        timezone: "Arizona, USA (GMT-7)",
        add: "7101 E Stetson Drive, Scottsdale, AZ 85251",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urban_Electrica.jpg?v=1710818582",
        testrideSpot: "Arizona",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
        ],
        businessHours: [
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
        ],
      },
    ]
  },
  {
    city: 'Ontario',
    country: 'Canada',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urban_Electrica.jpg?v=1710818582',
    stores: [
      {
        name: "iCycle Electric Bike Co",
        phone: "613-532-0426",
        email: "info@icycleebikes.com",
        timezone: "Arizona, USA (GMT-7)",
        add: "25 Fort Henry Drive, Kingston, ON, Canada K7K 5G8",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Kingston_Ontario_Canada_-_Laslovarga__28.jpg?v=1712714811",
        testrideSpot: "Kingston",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "10:00-17:00",
          "",
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
        ],
      },
    ]
  },
]


const store_list = new Map()
const bike_options = new Set()
let city_options = new Set()

for (const city of testRides) {
  for (const store of city.stores) {
    // 把所属国家也加上
      store.country = city.country || 'USA'
      store.city = city.city
      store.avalibaleDate = findAvalibaleDate(store)


      for (const sizes of store.availableSizes) {
        const [bike, series, ttt] = sizes.split(' ')

        if (ttt === "Pro") {
          bike_options.add(`${bike}${series ? ' ' + series : ''} ${ttt}`) 
        } else {
          bike_options.add(`${bike}${series ? ' ' + series : ''}`)
        }
      }

      city_options.add(`${store.city}---${store.country}`)

      const tags = store.tags || [{ color: 'gray', text: store.isPartner ? 'Ambassadors' : 'Partner Store' }]

      store.html = `
          <div class="name" name="${store.name}">${store.name}<i class="mobileHide"><svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5533"><path d="M748.3 533.3c0.1-0.2 0.3-0.4 0.4-0.6 0.2-0.3 0.5-0.7 0.7-1 0.1-0.1 0.2-0.3 0.2-0.4 0.3-0.4 0.5-0.8 0.8-1.2l0.1-0.1c2.6-4.6 4.1-9.6 4.6-14.7v-0.2c0-0.5 0.1-0.9 0.1-1.4v-0.6-1-1-0.6c0-0.5-0.1-0.9-0.1-1.4v-0.2c-0.4-5.1-2-10.1-4.6-14.7l-0.1-0.1c-0.2-0.4-0.5-0.8-0.8-1.3-0.1-0.1-0.2-0.3-0.2-0.4-0.2-0.3-0.4-0.7-0.7-1-0.1-0.2-0.3-0.4-0.4-0.6-0.2-0.3-0.4-0.5-0.6-0.8-0.2-0.2-0.4-0.5-0.6-0.7-0.1-0.1-0.2-0.2-0.3-0.4-0.1-0.1-0.2-0.2-0.2-0.3-0.2-0.3-0.5-0.5-0.7-0.8-0.2-0.2-0.4-0.4-0.5-0.6l-0.7-0.7-0.6-0.6c-0.2-0.2-0.5-0.4-0.7-0.7l-0.6-0.6-0.3-0.3-414.6-347.6c-15.2-12.7-38-10.7-50.7 4.4-12.7 15.2-10.7 38 4.4 50.7L663.2 512 281.6 832.2c-15.2 12.7-17.2 35.6-4.4 50.7 12.7 15.2 35.6 17.2 50.7 4.4l414.4-347.7 0.3-0.3 0.6-0.6c0.2-0.2 0.5-0.4 0.7-0.7l0.6-0.6 0.7-0.7c0.2-0.2 0.4-0.4 0.5-0.6 0.2-0.3 0.5-0.5 0.7-0.8 0.1-0.1 0.2-0.2 0.2-0.3 0.1-0.1 0.2-0.2 0.3-0.4 0.2-0.2 0.4-0.5 0.6-0.7 0.4-0.1 0.6-0.4 0.8-0.6z" fill="#333333" p-id="5534"></path></svg></i></div>
          <div class="tags">${tags.map(t => `<span class="u14DemiBold_v2 tag-${t.color}">${t.text}</span>`).join('')}</div>
          <div class="u14Light_v2">${store.add}</div>
          <div class="ulli">
             <span class="u14DemiBold_v2">Available Test bikes:</span>
             <ul class="u14Light_v2">
                ${store.availableSizes ? store.availableSizes.map(i => `<li>${i}</li>`).join('') : `<li>Carbon One Size ${store.testRideSize}</li>`}
             </ul>
          </div>
          ${!store.noBook ? `<div class="u17Light_v2 time"><img src="https://cdn.shopify.com/s/files/1/0633/2068/6808/files/calendar_2x_af8d9192-1ff9-43f0-aba6-3547b1129854.jpg?v=1680938382"/> Earliest available time: &nbsp;<div>${store.avalibaleDate}</div></div>` : '' }
          <div class="flex-1 pcHide"></div>
          <div class="buttons pcHide">
            ${!store.noBook ? `<div class="my-button my-button-black" onclick="booknow('${store.name}')">Book Now</div>` : ''}
            <div class="my-button my-button-white" onclick="showContactInfo('${store.name}')">Contact info</div>
        </div>
      `

      store_list.set(store.name.replace(/\s*/g, "").replace(/\'/g, ""), store)
  }
}

city_options = Array.from(city_options).sort((a, b) => a.localeCompare(b))
const country_group = {}

for (const option of city_options) {
    const [city, country] = option.split('---')

    if (country_group[country]) {
      country_group[country].push(city) 
      continue
    }

    country_group[country] = [city]
}

postMessage({
  store_list,
  country_group,
  bike_options
})
