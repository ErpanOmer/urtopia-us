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
      {
        name: `NAPA VELO`,
        phone: '707-258-8729',
        email: 'duke@napavelo.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "1630 Action Ave Ste B, Napa, CA 94559",
        testrideSpot: "Napa",
        availableSizes: [
         'Carbon Fold 1'
        ],
        businessHours: [
          "10:00-17:00",
          "",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
        ],
      },
      {
        name: `Pedego Electric Bikes Pismo Beach`,
        phone: '(805) 295-6352',
        email: 'pedegopismo@gmail.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "651 Dolliver St STE A Pismo Beach California, 93449 United States",
        testrideSpot: "Pismo Beach",
        availableSizes: [
         'Carbon 1 ST'
        ],
        businessHours: [
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
        ],
      },
      {
        name: `Sirr John Moto`,
        phone: '1 760-658-4739',
        email: 'info@sirrjohnmoto.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "101 West Avenida Vista Hermosa, Suite 174 San Clemente, Ca 92672",
        testrideSpot: "San Clemente",
        availableSizes: [
         'Carbon 1 Pro Size M'
        ],
        businessHours: [
          "10:00-20:00",
          "10:00-20:00",
          "10:00-20:00",
          "10:00-20:00",
          "10:00-20:00",
          "10:00-20:00",
          "10:00-20:00",
        ],
      },
      {
        name: `La Jolla Ebike and Skate`,
        phone: '858-242-9836',
        email: 'mobiusray@gmail.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "7444 Girard Ave. La Jolla Ca 92037",
        testrideSpot: "San Dimas",
        availableSizes: [
          'Carbon Fold 1'
        ],
        businessHours: [
          "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
        ],
      },
      {
        name: `E-bike Cyclery_San Dimas`,
        phone: '909-664-4432',
        email: '',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "347 S. San Dimas Ave San Dimas California, 91773",
        testrideSpot: "San Dimas",
        noBook: true,
        availableSizes: [
          'Carbon Fold 1'
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
      {
        name: `Deer Focus E-bikes and Bicycle Shop`,
        phone: '424-521-9550',
        email: 'deerfocus@gmail.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "1334 W Main St, Alhambra California, 91801 United States",
        testrideSpot: "Alhambra",
        availableSizes: [
          'Carbon 1 Pro Size M'
        ],
        businessHours: [
           "10:00-16:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
        ],
      },
      {
        name: `Synaptic Cycles`,
        phone: '949-484-6409',
        email: 'shawn@synapticcycles.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "34119 Pacific Coast Hwy Ste F, Dana Point, CA 92629",
        testrideSpot: "Dana Point",
        availableSizes: [
          'Carbon 1 Pro Size M'
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
        name: `Orange Cycle`,
        phone: '714-532-6838',
        email: 'orangecycle@aol.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "210 S Glassell St, Orange, CA 92866",
        testrideSpot: "Orange",
        imgUrl: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_2_0ec9af2e-317e-4b58-8115-491478794131.png?v=1735626213',
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Carbon Fold 1',
          'Fusion GT'
        ],
        businessHours: [
           "10:00-17:00",
           "10:00-18:00",
           "10:00-16:00",
           "",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
        ],
      },
      {
        name: `Ride O'Side`,
        phone: '760-583-8737',
        email: '',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "306 N Cleveland St, Oceanside, CA 92054",
        testrideSpot: "Oceanside",
        imgUrl: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_1_b5c3a0c5-590d-44cb-8143-c70d6fb42d5d.png?v=1735626313',
        noBook: 'Call to Schedule Test Riding',
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Carbon Fold 1'
        ],
        businessHours: [
           "",
           "",
           "",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
        ],
      },
      {
        name: `Triabike`,
        phone: '760-340-2840',
        email: 'service@triabike.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "44841 San Pablo Ave. Palm Desert, CA 92260",
        testrideSpot: "Palm Desert",
        availableSizes: [
          'Carbon Fold 1'
        ],
        businessHours: [
           "",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-16:00",
        ],
      },
      {
        name: `Bike Bling`,
        phone: '760-317-5450',
        email: 'kerry@bikebling.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "333 E Grand Ave. Escondido, CA 92025",
        testrideSpot: "Escondido",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Carbon Fold 1',
          'Fusion GT'
        ],
        businessHours: [
           "10:00-16:00",
           "9:00-18:00",
           "9:00-18:00",
           "9:00-18:00",
           "9:00-18:00",
           "9:00-18:00",
           "10:00-16:00",
        ],
      },
      {
        name: `West Coast Cycles`,
        phone: '714-833-5551',
        email: 'info@wcebikes.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "1742 S Euclid St. Anaheim, Ca 92802",
        testrideSpot: "Anaheim",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Carbon Fold 1'
        ],
        businessHours: [
           "",
           "14:00-17:00",
           "14:00-17:00",
           "14:00-17:00",
           "14:00-17:00",
           "14:00-17:00",
           "",
        ],
      },
      {
        name: `Hermosa Cyclery`,
        phone: '310-374-7816',
        email: 'mark@hermosacyclery.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "20 13th Street Hermosa Beach, CA 90254",
        testrideSpot: "Hermosa Beach",
        availableSizes: [
          'Carbon 1 Pro Size M'
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
      },
      {
        name: `San Diego Electric Bike`,
        phone: '858-345-1030',
        email: 'sdebike@gmail.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "10 S coast Hwy 101 Solana Beach, CA 92075",
        testrideSpot: "Solana Beach",
        availableSizes: [
          'Carbon Fold 1'
        ],
        businessHours: [
           "10:00-17:00",
           "10:00-17:00",
           "",
           "",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
        ],
      },
      {
        name: `So Cal Bike`,
        phone: '7607101478',
        email: 'jim@socalbike.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "2028 S. Coast Hwy. Oceanside, CA 92054",
        testrideSpot: "Oceanside",
        availableSizes: [
          'Fusion GT',
          'Carbon Fold 1'
        ],
        businessHours: [
           "10:00-16:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
        ],
      },
      {
        name: `OC Bkieworks`,
        phone: '949-550-7803',
        email: 'milo@ocbikeworks.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "1051 Avenida Pico #B San Clemente, CA 92673",
        testrideSpot: "San Clemente",
        availableSizes: [
          'Fusion GT',
          'Carbon Fold 1'
        ],
        businessHours: [
           "",
           "11:00-18:00",
           "11:00-18:00",
           "11:00-18:00",
           "11:00-18:00",
           "11:00-18:00",
           "11:00-18:00",
        ],
      },
      {
        name: `E-Ryde`,
        phone: '310-640-2453',
        email: 'brandon@e-ryde.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "209 E El Segundo Blvd",
        testrideSpot: "El Segundo",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Fusion GT',
          'Carbon Fold 1'
        ],
        businessHours: [
           "",
           "",
           "11:00-18:00",
           "11:00-18:00",
           "11:00-18:00",
           "11:00-18:00",
           "11:00-18:00",
        ],
      },
      {
        name: `Cycleogical`,
        phone: '949-542-4777',
        email: 'pedal@cycleogical.net',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "34102 La Plaza #A Dana Point, CA",
        testrideSpot: "Carlsbad",
        availableSizes: [
          'Carbon 1 Pro Size M'
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
      {
        name: `Carlsbad ebikes and more`,
        phone: '(760) 729-2453',
        email: 'Info@CarlsbadEbikesAndMore.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "2978 Carlsbad Blvd #130 Carlsbad, CA 92008",
        testrideSpot: "Carlsbad",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Carbon Fold 1'
        ],
        businessHours: [
           "11:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
        ],
      },
      {
        name: `EBike A-Go-Go`,
        phone: '+17608778250',
        email: 'info@e-bikeagogo.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "211 N Main Ave, Fallbrook, CA 92028",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/image_8.png?v=1731725082",
        testrideSpot: "Los Angeles",
        availableSizes: [
          'Fusion GT',
          'Carbon Fold 1'
        ],
        businessHours: [
           "11:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
        ],
      },
      {
        name: `Just Ride L.A`,
        phone: '213 745 6783',
        email: 'info@justridela.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "1626 S Hill St Los Angeles, CA 90015",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/image_8.png?v=1731725082",
        testrideSpot: "Los Angeles",
        availableSizes: [
          'Carbon 1 Pro Size S/M',
          'Carbon Fold 1'
        ],
        businessHours: [
           "11:00-18:00",
           "",
           "10:00-19:00",
           "10:00-19:00",
           "10:00-19:00",
           "10:00-19:00",
           "10:00-19:00",
        ],
      },
      {
        name: `The Bike Palace`,
        phone: '(310) 832-1966',
        email: 'info@adventureebikecompany.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "1600B South Pacific San Pedro, CA 90731",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/image_8.png?v=1731725082",
        testrideSpot: "San Pedro",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Carbon Fold 1',
          'Carbon 1 ST'
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
      {
        name: `Adventure E-bike Company`,
        phone: '805-852-5040',
        email: 'info@adventureebikecompany.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "2863 E Thousand Oaks Blvd Thousand Oaks California, 91362 United States",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/out_8.png?v=1729752038",
        testrideSpot: "Newport Beach",
        availableSizes: [
          'Carbon 1 Pro Size M'
        ],
        businessHours: [
           "",
           "",
           "11:00-18:00",
           "11:00-17:00",
           "11:00-18:00",
           "11:00-18:00",
           "11:00-18:00",
        ],
      },
      {
        name: `Bikehouse`,
        phone: '949-316-4216',
        email: 'info@bikehouseca.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "1000 Bristol St. N #26 Newport Beach, CA 92660",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_6_c6a0eaf2-cad7-4ce9-b23e-1dfa5ec46a0d.png?v=1727431908",
        testrideSpot: "Newport Beach",
        availableSizes: [
          'Carbon 1 Pro Size M'
        ],
        businessHours: [
           "",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
           "10:00-17:00",
        ],
      },
      {
        name: `Don's Bicycles - Redlands`,
        phone: '909-792-3399',
        email: 'donsbikes@att.net',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "740 E Redlands Blvd Ste B1 Redlands, CA 92373",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_6_c6a0eaf2-cad7-4ce9-b23e-1dfa5ec46a0d.png?v=1727431908",
        testrideSpot: "Redlands",
        availableSizes: [
          'Carbon 1 Pro Size S',
          'Fusion GT'
        ],
        businessHours: [
           "11:00-16:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
        ],
      },
      {
        name: `Don's Bicycles - Rialto`,
        phone: '909-875-7310',
        email: 'donsbikes@att.net',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "384 S Riverside Ave. Rialto, CA. 92376",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_6_c6a0eaf2-cad7-4ce9-b23e-1dfa5ec46a0d.png?v=1727431908",
        testrideSpot: "Rialto",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Fusion GT'
        ],
        businessHours: [
           "11:00-16:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
        ],
      },
      {
        name: 'Groove E-Bikes',
        phone: '949-274-7944',
        email: 'bob@grooveebikes.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "3740 Campus Drive, Suite A, Newport Beach, CA 92660",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_16.png?v=1730536068",
        testrideSpot: "Newport Beach",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Carbon Fold 1'
        ],
        businessHours: [
           "",
           "",
           "11:00-17:00",
           "11:00-17:00",
           "11:00-17:00",
           "11:00-17:00",
           "",
        ],
      },
      {
        name: 'Krakatoa Bikes',
        phone: '+1 415-453-0333',
        email: '',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "42 Bolinas Road Fairfax California, 94930 United States",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_6_c6a0eaf2-cad7-4ce9-b23e-1dfa5ec46a0d.png?v=1727431908",
        testrideSpot: "San Diego",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Fusion GT'
        ],
        businessHours: [
           "09:00-17:00",
           "",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
           "09:00-18:00",
           "09:00-17:00",
        ],
      },
      {
        name: 'Bicycle Discovery',
        phone: '858-272-1274',
        email: '',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "742 Felspar St. San Diego, CA 92109",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_2_0b0d2a8b-9804-43ea-97c1-8d2db5f727f6.png?v=1727057227",
        testrideSpot: "San Diego",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size M'
        ],
        businessHours: [
           "10:00-17:00",
           "10:00-19:00",
           "10:00-19:00",
           "10:00-19:00",
           "10:00-19:00",
           "10:00-19:00",
           "10:00-19:00",
        ],
      },
      {
        name: 'Two Wheels One Planet',
        phone: '949-646-7706',
        email: '',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "420 E 17th St Costa Mesa, CA 92627",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_2_0b0d2a8b-9804-43ea-97c1-8d2db5f727f6.png?v=1727057227",
        testrideSpot: "Costa Mesa",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Fusion GT',
          'Carbon Fold 1'
        ],
        businessHours: [
           "",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-17:00",
           "10:00-17:00",
        ],
      },
      {
        name: 'E-bike Cyclery',
        phone: '626-664-1064',
        email: '',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "601 W Huntington Dr Monrovia, CA 91016",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_2_0b0d2a8b-9804-43ea-97c1-8d2db5f727f6.png?v=1727057227",
        testrideSpot: "Monrovia",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Carbon Fold 1'
        ],
        businessHours: [
           "",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "",
        ],
      },
      {
        name: 'Irvine Bicycles',
        phone: '949-453-9999',
        email: 'sales@irvinebicycles.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "6604 Irvine Center Drive, Irvine, CA 92618",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Bell",
        availableSizes: [
          'Carbon 1 Pro Size M'
        ],
        businessHours: [
           "",
           "11:00-19:00",
            "11:00-19:00",
         "11:00-19:00",
            "11:00-19:00",
            "11:00-19:00",
             "10:00-18:00",
        ],
      },
      {
        name: 'Bike Craze Electric Bikes',
        phone: '714 744-0266',
        email: 'customerservice@bikecraze.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "1171 N. Kraemer Blvd Anaheim, Ca 92806",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_13.png?v=1724034334",
        testrideSpot: "Bell",
        availableSizes: [
          'Carbon 1 Pro Size M/L'
        ],
        businessHours: [
           "",
           "10:00-16:00",
            "10:00-16:00",
         "10:00-16:00",
            "10:00-16:00",
            "10:00-16:00",
             "",
        ],
      },
      {
        name: 'Electric Bikes of Santa Barbara',
        phone: '805-963-8885',
        email: '',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "1345 State St,Santa Barbara, CA 93101",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_11.png?v=1724033895",
        testrideSpot: "Santa Barbara",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size M'
        ],
        businessHours: [
           "",
           "12:00-17:00",
            "12:00-17:00",
           "12:00-17:00",
             "12:00-17:00",
            "12:00-17:00",
             "",
        ],
      },
      {
        name: 'E-Motion Sports Newport Beach',
        phone: '(949) 791-2010',
        email: '',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "2815 Newport Blvd Newport Beach, CA 92663",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/image_8.png?v=1731725082",
        testrideSpot: "Newport Beach",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Carbon Fold 1',
          'Fusion GT'
        ],
        businessHours: [
           "11:00-18:00",
           "11:00-18:00",
           "11:00-18:00",
           "11:00-18:00",
           "11:00-18:00",
           "11:00-18:00",
           "11:00-18:00",
        ],
      },
      {
        name: 'ATB Bike LLC',
        phone: '626-287-6936',
        email: '',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "13842 Newport Ave #D-1, Tustin, CA 92780",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_7_1044ac78-4b6d-4259-aa06-8d49e892ce4f.png?v=1722853161",
        testrideSpot: "Tustin",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size S/M/L'
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
        name: 'Temple City Bike Shop',
        phone: '626-287-6936',
        email: '',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "9628 Las Tunas Dr Temple City, CA 91780",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_10.png?v=1724033342",
        testrideSpot: "Temple City",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size S/M'
        ],
        businessHours: [
           "12:00-16:00",
          "09:00-18:00",
           "09:00-18:00",
           "09:00-18:00",
            "09:00-18:00",
            "09:00-18:00",
            "09:00-18:00",
        ],
      },
      {
        name: 'Got Bikes?',
        phone: '408) 455-8074',
        email: 'james@gotbikes.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "5859 Winfield Blvd, San Jose, CA 95123",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_9.png?v=1723170885",
        testrideSpot: "San Jose",
        availableSizes: [
          'Carbon 1 Pro Size S/M'
        ],
        businessHours: [
           "",
           "",
           "10:00-18:00",
            "10:00-18:00",
            "10:00-18:00",
            "10:00-18:00",
            "9:00-15:00",
        ],
      },
      {
        name: 'Woodside bike shop',
        phone: '+1 (650) 299-1071',
        email: 'gregdt1@yahoo.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "1800 El Camino Real, Suite C Menlo Park, CA 94061",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_14.png?v=1730535969",
        testrideSpot: "Menlo Park",
        availableSizes: [
          'Carbon 1 Pro Size M'
        ],
        businessHours: [
           "",
           "10:00-17:00",
           "10:00-17:00",
            "10:00-17:00",
            "10:00-17:00",
            "10:00-17:00",
            "10:00-17:00",
        ],
      },
      {
        name: 'American Canyon Bike Shop',
        phone: '707-334-8122',
        email: 'AmericanCanyonBikeShop@gmail.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "115 Klamath Ct, American Canyon, CA 94503",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/image_9.png?v=1731725225",
        testrideSpot: "California",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Fusion GT',
          'Carbon Fold 1'
        ],
        businessHours: [
           "",
           "",
           "10:00-16:00",
           "10:00-16:00",
           "10:00-16:00",
           "10:00-16:00",
           "10:00-16:00",
        ],
      },
      {
        name: 'Davis Cyclery',
        phone: '(530) 746-2380',
        email: '',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "247 F St, Davis, CA 95616",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_15.png?v=1730536018",
        testrideSpot: "California",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size M'
        ],
        businessHours: [
           "09:00-17:00",
           "09:00-18:00",
           "09:00-18:00",
            "09:00-18:00",
            "09:00-18:00",
            "09:00-18:00",
            "09:00-18:00",
        ],
      },
      {
        name: '562 Ebikes Electric Bicycle',
        phone: '+1 562-784-4370',
        email: 'admin@562ebikes.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "9345 Alondra Boulevard Bellflower, CA 90706",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/image_8.png?v=1731725082",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Pro Size M'
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
        name: 'Fisher E Bikes',
        phone: '805-481-1959',
        email: 'Fisherrealtors@gmail.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "1758 W Grand Ave Grover Beach CA, 93433 United States ",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_13_25ffe174-ed73-46a3-b7d4-c9c7f6ad9a6f.png?v=1730535918",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Pro Size M'
        ],
        businessHours: [
          "",
          "",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          ""
        ],
      },
      {
        name: 'California Computer',
        phone: '323-233-5300',
        email: 'sales@CaliforniaComputer.com',
        timezone: "Fremont, California, USA (GMT-7)",
        add: "9006 W. Pico Blvd, Los Angeles, CA 90035",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Velocipede_Cyclery.jpg?v=1686878451",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Pro Size M'
        ],
        businessHours: [
          "10:00-14:00",
          "",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-17:00",
          "",
          "09:00-14:00",
        ],
      },
      {
        name: 'InnoStudio',
        phone: '857-320-5186',
        email: 'baronwang@longhamtec.com',
        timezone: "Newport Beach, CA, USA (GMT-8)",
        add: "9621 Brighton Way Beverly Hills CA, 90210",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
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
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
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
          'Carbon 1 Pro Size S/M/L',
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
          'Carbon 1 Pro Size S/M/L',
          'Carbon Fold 1'
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
          'Carbon 1 Pro Size S/M/L'
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
        name: "Buy My Bikes",
        phone: "949-493-5611",
        email: "jim@buymybikes.com",
        timezone: "California, USA (GMT-7)",
        add: "32302 Camino Capistrano St 101, San Juan Capistrano, CA 92675",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Buy_My_Bikes.jpg?v=1702462014",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Pro Size M',
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
        email: "Cyclingworld23@outlook.com",
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
        name: "BK Wheels",
        phone: "347-240-7787",
        email: "admin@bkwheels.com",
        timezone: "Long Island City, Queens, NY, USA (GMT-4)",
        add: "9722 Seaview Ave, Brooklyn, NY 11236",
        testrideSpot: "Brooklyn",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
        ],
        businessHours: [
          "",
          "10:00-19:00",
          "10:00-19:00",
         "10:00-19:00",
          "10:00-19:00",
         "10:00-19:00",
         "10:00-18:00",
        ],
      },
      {
        name: "Julio Bicycles",
        phone: "914-239-1312",
        email: "Bicyclejulio@gmail.com",
        timezone: "Long Island City, Queens, NY, USA (GMT-4)",
        add: "45 S. Bedford Rd, Chappaqua, NY 10514",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/image_8.png?v=1731725082",
        testrideSpot: "Chappaqua",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
        ],
        businessHours: [
          "",
          "10:00-17:00",
          "10:00-18:00",
         "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
         "10:00-18:00",
        ],
      },
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
        name: "BK Wheels",
        phone: "347-240-7787",
        email: "admin@bkwheels.com",
        timezone: "Long Island City, Queens, NY, USA (GMT-4)",
        add: "9722 Seaview Ave, Brooklyn, NY 11236",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/BikeFixNYC.jpg?v=1686878451",
        testrideSpot: "Brooklyn",
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
          "10:00-19:00",
        ],
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
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Hackettstown",
        availableSizes: [
          'Carbon 1 Pro Size S/M',
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
    city: 'Oregon',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977',
    stores: [
      {
        name: "E-Bike Central_Oregon",
        phone: "971-243-8428",
        email: "ebikecentralpdx@gmail.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "22415 SW Pine St #105,Sherwood OR 97140",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_8_0ab36051-a5e5-4fff-b231-63bc8b3b9d89.png?v=1729752581",
        testrideSpot: "Sherwood",
        availableSizes: [
          'Carbon 1 Pro Size S/M',
          'Fusion GT',
          'Carbon Fold 1'
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
        name: "All Seasons E-Store",
        phone: "541-653-8185",
        email: "asestore23@gmail.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "2862 Willamette St. STE A Eugene, OR 97405",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Aztec_Cycles.jpg?v=1686878451",
        testrideSpot: "Eugene",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Fusion GT'
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
        name: `Landspeed's Bike Shop`,
        phone: "541-650-2666",
        email: "business@golandspeed.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "630 E 13th Ave, Eugene, OR 97401",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Eugene",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
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
      }
    ]
  },
  {
    city: 'Idaho',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977',
    stores: [
      {
        name: "I Get Around",
        phone: "208-807-4957",
        email: "ben@igaboise.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "609 N Orchard St, Boise, ID 83706",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Boise",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
        ],
        businessHours: [
          "",
          "11:00-20:00",
          "11:00-20:00",
           "11:00-20:00",
           "11:00-20:00",
          "11:00-20:00",
          "11:00-20:00",
        ],
      },
    ]
  },
  {
    city: 'Pennsylvania',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977',
    stores: [
      {
        name: `PEDEGO HARRISBURG`,
        phone: "(717) 857-7993",
        email: "",
        timezone: "Pennsylvania, USA (GMT-4)",
        add: "17 N 3rd St, Harrisburg, PA 17101",
        testrideSpot: "Harrisburg",
        noBook: true,
        availableSizes: [
          'Fusion GT',
          'Carbon 1 Pro Size M',
          'Carbon Fold 1',
        ],
        businessHours: [
          "",
          "",
          "12:00-18:00",
          "14:00-19:00",
          "12:00-18:00",
          "12:00-18:00",
          "11:00-17:00",
        ],
      },
      {
        name: `E Bike Guys of PA`,
        phone: "717-351-3805",
        email: "ebikeguysofpa@gmail.com",
        timezone: "Pennsylvania, USA (GMT-4)",
        add: "135 E Main St,New Holland Pennsylvania, 17557 United States",
        testrideSpot: "New Holland",
        availableSizes: [
          'Carbon Fold 1',
        ],
        businessHours: [
          "",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "",
        ],
      },
      {
        name: `Fitness Exchange - Emmaus`,
        phone: "610-965-6597",
        email: "sales@fitnessexchange.com",
        timezone: "Pennsylvania, USA (GMT-4)",
        add: "693 State Ave, Emmaus, PA 18049",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_17.png?v=1730536142",
        testrideSpot: "Emmaus",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
        ],
        businessHours: [
          "10:00-17:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
      {
        name: `Bell's Bike Shop`,
        phone: "215-543-6000",
        email: "hello@bellsbikeshop.com",
        timezone: "Pennsylvania, USA (GMT-4)",
        add: "1320 E Passyunk Ave, Philadelphia, PA 19147",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_22.png?v=1732178451",
        testrideSpot: "Philadelphia",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
        ],
        businessHours: [
          "",
          "",
          "10:00-21:00",
          "10:00-21:00",
          "10:00-21:00",
          "10:00-18:00",
          "10:00-17:00",
        ],
      },
      {
        name: "AST Bikes",
        phone: "570-994-6431",
        email: "alarmsecurtec@gmail.com",
        timezone: "Pennsylvania, USA (GMT-4)",
        add: "5224 Milford Road, East Stroudsburg, Pennsylvania 18302",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Bell_s_Bike_Shop.jpg?v=1686878451",
        testrideSpot: "East Stroudsburg",
        availableSizes: [
          'Carbon 1 Pro Size M',
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
        name: "Drexel Hill Cyclery",
        phone: "610-626-4477",
        email: "drexhillcycles@gmail.com",
        timezone: "Pennsylvania, USA (GMT-4)",
        add: "703 Burmont Rd, Drexel Hill, PA 19026",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Drexel_Hill_Cyclery_pa.jpg?v=1686878451",
        testrideSpot: "Pennsylvania",
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
        phone: "610-397-1780",
        email: "matt.sauls@fitnessexchange.com",
        timezone: "Pennsylvania, USA (GMT-4)",
        add: "1004 Ridge Pike Conshohocken, PA 19428",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/FITNESS_EXCHANGE_CONSHOHOCKEN.jpg?v=1696118203",
        testrideSpot: "Pennsylvania",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
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
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_1_ffe05ab3-9c6f-4ee8-a8b3-427b76a65427.png?v=1721377450",
        testrideSpot: "Muncy",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Chord',
          'Chord X',
          'Carbon Fold 1',
          'Fusion GT'
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
    city: 'Washington',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_3_c6001537-5c6a-4915-8ed1-9f21dfc55d76.png?v=1718085498',
    stores: [
      {
        name: "BicycleSPACE",
        phone: "202-853-9390",
        email: "",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "Ivy City 1512 Okie St., N.E. Washington, DC 20002",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Washington",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "",
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-16:00",
        ],
      },
      {
        name: "King Electric Bike",
        phone: "(202) 455-4823",
        email: "",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "502 23RD ST NW, WASHINGTON, DC 20037",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Lacey",
        testRideSize: "M/L",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size M/L',
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
          'Carbon 1 Pro Size S/M/L',
          'Chord X',
          'Carbon Fold 1',
          'Fusion GT'
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
    city: 'Louisiana',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_4_0d6b1e4d-def2-4565-9aba-0d2241618ead.png?v=1718085649',
    stores: [
      {
        name: "EZ-e-Bikes",
        phone: "337-385-2146",
        email: "contact@ez-e-bikes.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "1506 Veterans Memorial Dr, Abbeville, Louisiana 70510",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Louisiana",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Chord X'
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
    ]
  },
  {
    city: 'Maryland',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_4_0d6b1e4d-def2-4565-9aba-0d2241618ead.png?v=1718085649',
    stores: [
      {
        name: "Bethesda Bike and Ski",
        phone: "301-321-2453",
        email: "contact@bethesdabikeandski.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "6917 Arlington Rd, Bethesda, MD 20814",
        testrideSpot: "Bethesda",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "09:00-16:00",
          "09:00-20:00",
          "09:00-20:00",
          "09:00-20:00",
          "09:00-20:00",
          "09:00-20:00",
          "09:00-18:00",
        ],
      },
      {
        name: "Just Riding Along Bicycle Shop",
        phone: "(301) 963-1273",
        email: "",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "Olney Laytonsville Rd #6828, Gaithersburg, MD 20882",
        testrideSpot: "Gaithersburg",
        testRideSize: "M/L",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "",
          "08:00-17:00",
          "08:00-17:00",
          "08:00-17:00",
          "08:00-17:00",
          "10:00-16:00",
          "",
        ],
      },
      {
        name: "Pedego Bethesda",
        phone: "603-370-7858",
        email: "David@pedegobethesda.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "4926 Hampden Ln Bethesda, MD 20814",
        testrideSpot: "Bethesda",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon Fold 1',
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
        name: "Bike Doctor_Arnold",
        phone: "(410) 544-3532",
        email: "sruck@bikedoctor.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "953 Ritchie Hwy, Arnold, MD 21012",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_2_0b0d2a8b-9804-43ea-97c1-8d2db5f727f6.png?v=1727057227",
        testrideSpot: "Arnold",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon 1 Pro Size S/M',
        ],
        businessHours: [
          "10:00-17:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "10:00-17:00",
        ],
      },
      {
        name: "College Park Bicycles",
        phone: "(301) 864-2211",
        email: "info@collegeparkbicycles.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "7301 Baltimore Avenue,College Park Maryland, 20740 United States",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "College Park",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "12:00-17:00",
          "10:00-19:00",
         "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-18:00",
        ],
      },
      {
        name: "Mt Airy Bicycles",
        phone: "301-831-5151",
        email: "info@bike123.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "4540 Old National Pike (Rt. 144) Mount Airy, MD 21771",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/img_v3_00ee_2ca3c1e2-d430-4790-a727-d4a1d91abefg.jpg?v=1725519590",
        testrideSpot: "Mount Airy",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Fusion GT',
          'Carbon Fold 1'
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-17:00",
        ],
      },
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
      {
        name: "Mile Marker 99 Bicycle Shop",
        phone: "240-707-8027",
        email: "milemarker99@outlook.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "22 N Conococheague St, Williamsport, MD 21795",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Williamsport",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "12:00-16:00",
          "10:00-18:00",
          "10:00-18:00",
          "08:00-16:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
    ]
  },
  {
    city: 'Florida',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/shutterstock_469708088.jpg?v=1697188978',
    stores: [
      {
        name: "Tampa Bay - Dunedin Store",
        phone: "727-228-1975",
        email: "info@tampabayebikes.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "376 Patricia Ave, Dunedin, FL 34698",
        testrideSpot: "Dunedin",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
          'Carbon 1 ST',
          'Carbon Fold 1'
        ],
        businessHours: [
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00"
        ],
      },
      {
        name: "Pedego St Pete",
        phone: "941-260-5536",
        email: "steve@pedegostpete.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "6730 22nd Ave N STE E, St Petersburg, FL 33710",
        testrideSpot: "St. Petersburg",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
        ],
        businessHours: [
          "10:00-16:00",
          "9:00-17:00",
          "10:00-17:00",
          "",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
        ],
      },
      {
        name: "Pedego Sarasota",
        phone: "941-260-5536",
        email: "steve@pedegosarasota.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "3460 Clark Rd Sarasota Florida 34231",
        testrideSpot: "Sarasota",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
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
      {
        name: "Pedego Boca",
        phone: "561-677-2622",
        email: "kyle@pedegoboca.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "4400 N Federal Hwy, Ste 156 Boca Raton, FL 33431",
        testrideSpot: "Boca Raton",
        availableSizes: [
          'Fusion GT'
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
      },
      {
        name: "Eventure Tour Co",
        phone: "8505986380",
        email: "emily@eventure30a.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "174 Watercolor Way Suite 106, Santa Rosa Beach, FL 32459",
        testrideSpot: "Santa Rosa Beach",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Fusion GT',
          'Carbon Fold 1'
        ],
        businessHours: [
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
        ],
      },
      {
        name: "Voltaire Cycles",
        phone: "941-922-0384",
        email: "ron@voltairecycles-sarasota.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "1260 S Tamiami Trail",
        testrideSpot: "Osprey",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Fusion GT',
          'Carbon Fold 1'
        ],
        businessHours: [
          "12:00-16:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
        ],
      },
      {
        name: "Tampa Bay Ebikes",
        phone: "727-228-1975",
        email: "info@tampabayebikes.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "4004 MacDill Ave #6",
        testrideSpot: "Tampa",
        availableSizes: [
          'Carbon 1 Pro Size M/L'
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
      },
      {
        name: "Bike Sultan",
        phone: "714-916-7831",
        email: "joe@bikesultan.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "11940 US Hwy 1 Ste. 128",
        testrideSpot: "Palm Beach Gardens",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Fusion GT'
        ],
        businessHours: [
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
        ],
      },
      {
        name: "Eventure Tour Co",
        phone: "8505986380",
        email: "emily@eventure30a.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "174 Watercolor Way Suite 106",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/image_8.png?v=1731725082",
        testrideSpot: "Santa Rosa Beach",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Fusion GT'
        ],
        businessHours: [
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
        ],
      },
      {
        name: "Bedir Bikes",
        phone: "+1 727-819-0627",
        email: "bediruna@gmail.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "223 Pelican Ct, Kissimmee, FL 34743",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-E-Cycle_Adventures_fl.jpg?v=1665374977",
        testrideSpot: "Kissimmee",
        availableSizes: [
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
      },
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
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Florida",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
          'Carbon Fold 1',
          'Fusion GT'
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
        phone: "561-680-2453",
        email: "info@elecruiser.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "1954 NE 5th Avenue 5th Avenue Shops, Boca Raton, Florida 33431",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_6_13c365c1-87a3-41d3-8879-b6dd7d62a503.png?v=1718329085",
        testrideSpot: "Boca Raton",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Carbon Fold 1',
          'Fusion GT'
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
        name: "E-Station Sarasota",
        phone: "941-705-2528",
        email: "ty@estationsrq.com",
        timezone: "FL, USA (GMT-4)",
        add: "4450 S. Tamiami Trail Sarasota, FL 34231",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/E-Station_Sarasota.png?v=1700672076",
        testrideSpot: "Florida",
        availableSizes: [
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
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Florida",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Chord',
          'Chord X',
          'Carbon Fold 1',
          'Fusion GT'
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
        name: "E-Bike Central_Waco",
        phone: "254-677-6139",
        email: "ebikecentraltx@gmail.com",
        timezone: "Dallas, TX, USA (GMT-5)",
        add: "112 Mary Ave, Waco, TX 76701",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_8_0ab36051-a5e5-4fff-b231-63bc8b3b9d89.png?v=1729752581",
        testrideSpot: "Waco",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Fusion GT',
          'Carbon Fold 1'
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
        name: "HUB MRKT Bikes",
        phone: "210-334-0205",
        email: "info.hubmrkt@gmail.com",
        timezone: "Dallas, TX, USA (GMT-5)",
        add: "1407 S. Saint Mary’s Street, San Antonio, TX 78210",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_8_0ab36051-a5e5-4fff-b231-63bc8b3b9d89.png?v=1729752581",
        testrideSpot: "San Antonio",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
           "10:00-15:00",
           "10:00-19:00",
           "10:00-19:00",
            "10:00-19:00",
            "10:00-19:00",
            "10:00-19:00",
            "10:00-17:00",
        ],
      },
      {
        name: "Power ON Electric Bikes",
        phone: "7138161390",
        email: "david@poweronebikes.com",
        timezone: "Dallas, TX, USA (GMT-5)",
        add: "17944 Cypress Rosehill Rd, Unit 2-4,United States",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_8_0ab36051-a5e5-4fff-b231-63bc8b3b9d89.png?v=1729752581",
        testrideSpot: "Cypress",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
           "10:00-18:00",
           "",
           "",
            "10:00-18:00",
            "10:00-18:00",
            "10:00-18:00",
            "10:00-18:00",
        ],
      },
      {
        name: "Playtri Las Colinas",
        phone: "(214)-484-9788",
        email: "",
        timezone: "Dallas, TX, USA (GMT-5)",
        add: "5260 North O'Connor Boulevard Irving Texas, 75039 United States",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_8_0ab36051-a5e5-4fff-b231-63bc8b3b9d89.png?v=1729752581",
        testrideSpot: "Irving",
        noBook: 'Please contact the shop directly to arrange test ride',
        availableSizes: [
          'Carbon 1 Pro Size M',
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
        name: "E-Bike Central_Temple",
        phone: "254-677-6139",
        email: "ebikecentraltx@gmail.com",
        timezone: "Dallas, TX, USA (GMT-5)",
        add: "1404 S 31st St, Temple, TX 76504",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_8_0ab36051-a5e5-4fff-b231-63bc8b3b9d89.png?v=1729752581",
        testrideSpot: "Temple",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Fusion GT',
          'Carbon Fold 1'
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
        name: "Cadence Cyclery of McKinney",
        phone: "(972) 548-7400",
        email: "info@cadencecyclery.com",
        timezone: "Dallas, TX, USA (GMT-5)",
        add: "119 Tennessee St, McKinney, TX 75069",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/image_8.png?v=1731725082",
        testrideSpot: "McKinney",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
        ],
        businessHours: [
          "12:00-17:00",
          "12:00-18:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-18:00",
        ],
      },
      {
        name: "Bike Mart",
        phone: "972-231-3993",
        email: "Mhinton@bikemart.com",
        timezone: "Dallas, TX, USA (GMT-5)",
        add: "1451 W Campbell Rd, Richardson, TX 75080, USA",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Bay_Area_Cycling_tx.jpg?v=1686878451",
        testrideSpot: "Texas",
        availableSizes: [
          'Carbon 1 Pro Size S',
        ],
        businessHours: [
          "12:00-17:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "09:00-17:00",
        ],
      },
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
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
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
        name: "Ichi Bike - HIGHLAND PARK",
        phone: "515.630.3625",
        email: "shop@ichibike.com",
        timezone: "Iowa, USA (GMT-5)",
        add: "3705 6TH AVE, DES MOINES, IA 50313",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/image_8.png?v=1731725082",
        testrideSpot: "Des Moines",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Carbon Fold 1'
        ],
        businessHours: [
          "",
          "",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "09:00-16:00",
        ],
      },
      {
        name: "Ichi Bike - EAST VILLAGE",
        phone: "515.274.0397",
        email: "shop@ichibike.com",
        timezone: "Iowa, USA (GMT-5)",
        add: "311 EAST WALNUT STREET, DES MOINES, IA 50312",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/image_8.png?v=1731725082",
        testrideSpot: "Des Moines",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Carbon Fold 1'
        ],
        businessHours: [
          "12:00-15:00",
          "",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
        ],
      },
      {
        name: "Ebike Iowa",
        phone: "(515) 400-3970",
        email: "john.burdine@gmail.com",
        timezone: "Iowa, USA (GMT-5)",
        add: "1900 E Lincoln Way, Suite B, Ames, Iowa 50010",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Ebike_Iowa.png?v=1687327236",
        testrideSpot: "Iowa",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Fusion GT'
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
        name: "Garage Power Sports",
        phone: "801-206-9202",
        email: "contact@garagepowersports.com",
        timezone: "Utah, USA (GMT-7)",
        add: "651 W South Jordan Pkwy South Jordan, UT 84095",
        testrideSpot: "Utah",
        availableSizes: [
          'Carbon 1 Pro Size L',
          'Carbon Fold 1',
          'Fusion GT'
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
      },
      {
        name: "E-Power Bike and Board",
        phone: "435-315-3044",
        email: "epowerbb@gmail.com",
        timezone: "Utah, USA (GMT-7)",
        add: "44 West 100 South Heber City, UT 84032",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/E-Power_Bike_and_Board_1.jpg?v=1689228575",
        testrideSpot: "Utah",
        availableSizes: [
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
          'Carbon Fold 1',
          'Fusion GT'
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
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
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
        name: "Spokes Bikes - Napervill",
        phone: "630-961-8222",
        email: "spokesnaperville@gmail.com",
        timezone: "Illinois, USA (GMT-7)",
        add: "1807 S. Washington St Suite 112, Naperville, IL 60565",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Jason_Mathews.jpg?v=1692617852",
        testrideSpot: "Naperville",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
        ],
        businessHours: [
          "12:00-17:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-17:00",
        ],
      },
      {
        name: "Windy City Wheelers",
        phone: "954-242-7461",
        email: "info@windycitywheelers.com",
        timezone: "Illinois, USA (GMT-7)",
        add: "4242 N Ridge Ave, Arlington Heights, IL 60004",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Chicago",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Chord X'
        ],
        noBook: 'Call to setup an appointment',
        businessHours: [
          "",
          "10:00-17:00",
          "",
          "",
          "",
          "10:00-17:00",
          "10:00-17:00",
        ],
      },
    ]
  },
  {
    city: 'Colorado',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/co.webp?v=1695291345',
    stores: [
      {
        name: "Pedego Castle Rock",
        phone: "720-955-0306",
        email: "info@pedegocastlerock.com",
        timezone: "Colorado, USA (GMT-7)",
        add: "224 Wilcox St, Castle Rock, CO 80104",
        testrideSpot: "Castle Rock",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Carbon 1 ST'
        ],
        businessHours: [
          "11:00-16:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "11:00-17:00",
        ],
      },
      {
        name: "Ebike Tours & Rental",
        phone: "719-219-5702",
        email: "",
        timezone: "Colorado, USA (GMT-7)",
        add: "906 Manitou Ave UNIT 102, Manitou Springs, CO 80829",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_79a58073-e8ed-4779-9e18-fb430821b9d3.png?v=1735625721",
        testrideSpot: "Littleton",
        noBook: 'Call to Schedule Test Riding',
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "11:00-16:00",
        ],
      },
      {
        name: "Boost Ebikes",
        phone: "(303) 503-4748",
        email: "Info@boostebikes.com",
        timezone: "Colorado, USA (GMT-7)",
        add: "1500 W Littleton Blvd #110-E, Littleton, CO 80120",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/E-Bike_Sales_and_Rental.png?v=1695291344",
        testrideSpot: "Littleton",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Carbon Fold 1',
          'Carbon 1 ST',
          'Fusion GT'
        ],
        businessHours: [
          "",
          "",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
        ],
      },
      {
        name: "Colorado EBikes of Glenwood Springs",
        phone: "(970) 948-1292",
        email: "coebikesgws@gmail.com",
        timezone: "Colorado, USA (GMT-7)",
        add: "1301 Grand Ave Ste A, Glenwood Springs, Colorado 81601",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/E-Bike_Sales_and_Rental.png?v=1695291344",
        testrideSpot: "Glenwood",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
        ],
        businessHours: [
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "",
        ],
      },
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
        name: "EForce Bikes",
        phone: "(720) 724-9777",
        email: "info@eforcebikes.com",
        timezone: "Colorado, USA (GMT-7)",
        add: "3871 Tennyson St, Denver, CO 80212",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/co.webp?v=1695291345",
        testrideSpot: "Denver",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
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
        name: "Seaside Eco Bikes",
        phone: "302-329-8088",
        email: "Gilberto.medina@seasideecobikes.com",
        timezone: "Delaware, USA (GMT-7)",
        add: "16779 Coastal Highway unit 1, Lewes DE 19958",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_5_8de340fe-da72-48e6-a73c-772a830b0a27.png?v=1718328789",
        testrideSpot: "Lewes",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Chord',
          'Carbon Fold 1',
          'Fusion GT'
        ],
        businessHours: [
          "10:00-18:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "10:00-18:00",
          "10:00-18:00",
        ]
      },
    ]
  },
  {
    city: 'Virginia',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Strictly_Ebikes.jpg?v=1709208572',
    stores: [
      {
        name: "Electric Bikes of Northern Virginia",
        phone: "703 987 8864",
        email: "todd@pedegoalexandria.com",
        timezone: "Virginia, USA (GMT-7)",
        add: "210 North Lee Street, Unit 102, Alexandria, VA 22314",
        testrideSpot: "Alexandria",
        availableSizes: [
          'Carbon 1 Pro Size M/L',
          'Fusion GT',
          'Carbon Fold 1'
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
        name: "E-Bike Alley Norfolk",
        phone: "757-320-2400",
        email: "Amy@e-bikealley.com",
        timezone: "Virginia, USA (GMT-7)",
        add: "223 E City Hall Ave, Norfolk, VA 23510",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/image_8.png?v=1731725082",
        testrideSpot: "Norfolk",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Fusion GT',
          'Carbon Fold 1'
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
      {
        name: "E-Bike Alley",
        phone: "757-645-4232",
        email: "thomas@e-bikealley.com",
        timezone: "Virginia, USA (GMT-7)",
        add: "100 College Row Ste 2105, Williamsburg, VA 23185",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Williamsburg",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L'
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
      {
        name: "Strictly Ebikes",
        phone: "571-312-5505",
        email: "info@strictly-ebikes.com",
        timezone: "Virginia, USA (GMT-7)",
        add: "683 N Washington St, Alexandria, VA 22314",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Strictly_Ebikes.jpg?v=1709208572",
        testrideSpot: "Virginia",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
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
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "",
        ],
      },
      {
        name: "MINN Ebikes",
        phone: "507-382-4404",
        email: "john@northsole.co",
        timezone: "Minnesota, USA (GMT-7)",
        add: "13000 Maywood Ln, Minnetonka, MN 55343",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
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
        name: "Pedego E-Bikes of Grand Rapids",
        phone: "616-214-8565",
        email: "",
        timezone: "Michigan, USA (GMT-7)",
        add: "6744 Cascade Rd. SE,Grand Rapids, MI 49546",
        noBook: true,
        testrideSpot: "Grand Rapids",
        availableSizes: [
          'Fusion GT',
          'Carbon 1 Pro Size M/L',
          'Carbon 1 ST'
        ],
        businessHours: [
          "",
          "",
          "",
          "11:00-16:00",
          "11:00-16:00",
          "11:00-16:00",
          "11:00-16:00",
        ],
      },
      {
        name: "West Michigan eBikes",
        phone: "616-826-3574",
        email: "william@greenprojectsgroup.com",
        timezone: "Michigan, USA (GMT-7)",
        add: "2651 Brooklane Ave SE, Grand Rapids, MI 49507",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
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
        name: "Pedego Glendale Peoria",
        phone: "(623) 233-4399",
        email: "spike@pedegogp.com",
        timezone: "Arizona, USA (GMT-7)",
        add: "16610 N 75th Ave Suite 107, Peoria, AZ 85382",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urban_Electrica.jpg?v=1710818582",
        testrideSpot: "Peoria",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Carbon 1 ST'
        ],
        businessHours: [
          "",
          "",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-17:00",
          "11:00-15:00",
        ],
      },
      {
        name: "Urban Electrica",
        phone: "(602) 856-4566",
        email: "info@urbanelectrica.com",
        timezone: "Arizona, USA (GMT-7)",
        add: "1425 E University Dr Suite B104, Tempe, AZ 85288",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urban_Electrica.jpg?v=1710818582",
        testrideSpot: "Arizona",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
          'Carbon Fold 1',
          'Fusion GT'
        ],
        businessHours: [
          "",
          "",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
          "11:00-18:00",
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
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Kingston",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
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
  {
    city: 'Tennessee',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urban_Electrica.jpg?v=1710818582',
    stores: [
      {
        name: "ECO E-bikes",
        phone: "(931) 800-8444",
        email: "eco_ebikes@yahoo.com",
        timezone: "Tennessee, USA (GMT-7)",
        add: "1045 W. Main St., Monteagle, Tennessee, 37356",
        testrideSpot: "Pegram",
        availableSizes: [
          'Carbon Fold 1',
        ],
        businessHours: [
          "10:00-16:00",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-15:00",
          "",
        ],
      },
      {
        name: "River Bend Cycles",
        phone: "615-715-2392",
        email: "riverbendrenewalllc@gmail.com",
        timezone: "Tennessee, USA (GMT-7)",
        add: "576 us 70, Pegram, TN 37143",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Pegram",
        availableSizes: [
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
        ],
      },
    ]
  },
  {
    city: 'Connecticut',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urban_Electrica.jpg?v=1710818582',
    stores: [
      {
        name: "Berkshire Bike and Board",
        phone: "860-242-9884",
        email: "kgoeben@berkshirebikeandboard.com",
        timezone: "Tennessee, USA (GMT-7)",
        add: "38 Tunxis Ave, Bloomfield, CT 06002",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Bloomfield",
        availableSizes: [
          'Fusion GT',
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
      },
      {
        name: "River Bicycles",
        phone: "203-532-1718",
        email: "Riverbicycles@yahoo.com",
        timezone: "Tennessee, USA (GMT-7)",
        add: "138 Hamilton Avenue, Greenwich, CT 6830",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_12_86b280fc-a42f-4ee7-8716-1576548b4fa3.png?v=1730535020",
        testrideSpot: "Greenwich",
        availableSizes: [
          'Carbon 1 Pro Size S/M/L',
        ],
        businessHours: [
          "",
          "10:00-18:00",
         "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-16:00",
        ],
      },
    ]
  },
  {
    city: 'Massachusetts',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urban_Electrica.jpg?v=1710818582',
    stores: [
      {
        name: "Berkshire Bike and Board Great Barrington",
        phone: "413-528-5555",
        email: "salessouth@berkshirebikeandboard.com",
        timezone: "Tennessee, USA (GMT-7)",
        add: "29 State Rd, Great Barrington, MA 01230",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Kingston_Ontario_Canada_-_Laslovarga__28.jpg?v=1712714811",
        testrideSpot: "Great Barrington",
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
          "10:00-17:00",
        ],
      },
    ]
  },
  {
    city: 'Rhode Island',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urban_Electrica.jpg?v=1710818582',
    stores: [
      {
        name: "Bristol Bikes",
        phone: "401-675-2000",
        email: "mark@bristolribikes.com",
        timezone: "Tennessee, USA (GMT-7)",
        add: "267 Thames St. Bristol, RI 02809",
        testrideSpot: "Bristol",
        availableSizes: [
          'Carbon 1 Pro Size L',
          'Fusion GT',
          'Carbon Fold 1'
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
      },
    ]
  },
  {
    city: 'New Mexico',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_3_7b7d3f75-8bc1-4592-9b67-8a2844323c38.png?v=1735626823',
    stores: [
      {
        name: "Silver City Cycles",
        phone: "575-388-1444",
        email: "shop@silvercitycycles.bike",
        timezone: "Tennessee, USA (GMT-7)",
        add: "914 N. Pope St. Silver City, NM 88061",
        imgUrl: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_3_7b7d3f75-8bc1-4592-9b67-8a2844323c38.png?v=1735626823',
        testrideSpot: "Silver City",
        availableSizes: [
          'Fusion GT',
          'Carbon Fold 1'
        ],
        businessHours: [
          "",
          "",
         "10:00-17:00",
         "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-16:00",
        ],
      },
    ]
  },
  {
    city: 'Georgia',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_3_7b7d3f75-8bc1-4592-9b67-8a2844323c38.png?v=1735626823',
    stores: [
      {
        name: "eStar Rides",
        phone: "678-383-0296",
        email: "Hello@estarbikes.com",
        timezone: "Tennessee, USA (GMT-7)",
        add: "1728 Campbellton Road SW Unit A1, Atlanta, GA 30311",
        testrideSpot: "Atlanta",
        availableSizes: [
          'Carbon 1 Pro Size L',
        ],
        businessHours: [
          "",
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
  {
    city: 'Nebraska',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_3_7b7d3f75-8bc1-4592-9b67-8a2844323c38.png?v=1735626823',
    stores: [
      {
        name: "Ecocycle",
        phone: "531-217-3030",
        email: "",
        timezone: "Tennessee, USA (GMT-7)",
        add: "6755 S 191st ave Omaha, NE 68135, Omaha/Nebraska",
        testrideSpot: "Atlanta",
        noBook: true,
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Fusion GT'
        ],
        businessHours: [
          "",
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
  {
    city: 'Indiana',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_3_7b7d3f75-8bc1-4592-9b67-8a2844323c38.png?v=1735626823',
    stores: [
      {
        name: "Pedego Indy",
        phone: "(317) 759-6600",
        email: "info@pedegoindy.com",
        timezone: "Tennessee, USA (GMT-7)",
        add: "850 Massachusetts Ave Suite 125, Indianapolis, IN 46204",
        testrideSpot: "Indianapolis",
        availableSizes: [
           'Carbon 1 Pro Size M',
           'Carbon Fold 1',
           'Carbon 1 ST',
           'Fusion GT'
        ],
        businessHours: [
           "12:00-17:00",
           "10:00-17:00",
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
    city: 'Nevada',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_3_7b7d3f75-8bc1-4592-9b67-8a2844323c38.png?v=1735626823',
    stores: [
      {
        name: "E-Bike Hub",
        phone: "775-432-7986",
        email: "ryan@outdoordrivensports.com",
        timezone: "Tennessee, USA (GMT-7)",
        add: "50 S Virginia St, Reno, NV 89501",
        testrideSpot: "Reno",
        availableSizes: [
           'Carbon 1 ST'
        ],
        businessHours: [
           "10:00-17:00",
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
    city: 'Ohio',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_3_7b7d3f75-8bc1-4592-9b67-8a2844323c38.png?v=1735626823',
    stores: [
      {
        name: "Jeff's Bicycle Repair",
        phone: "740-494-7091",
        email: "jeff@jeffsbicyclerepair.com",
        timezone: "Tennessee, USA (GMT-7)",
        add: "131 E Water St, Prospect, OH 43342",
        testrideSpot: "Prospect",
        availableSizes: [
          'Carbon Fold 1'
        ],
        businessHours: [
          "",
          "",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-14:00",
        ],
      },
      {
        name: "Beechwold Bicycles",
        phone: "+1 614-725-0500",
        email: "bg@beechwoldbicycles.com",
        timezone: "Tennessee, USA (GMT-7)",
        add: "4584 North High Street Columbus Ohio, 43214 United States",
        testrideSpot: "Columbus",
        availableSizes: [
          'Fusion GT',
          'Carbon Fold 1',
          'Carbon 1 Pro Size M',
        ],
        businessHours: [
          "",
          "",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00",
          "10:00-18:00",
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
      store.imgUrl = store.imgUrl || `https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_23.png?v=1733120044`


      for (const sizes of store.availableSizes) {
        const [bike, series, ttt] = sizes.split(' ')

        if (ttt === "Pro" || series === 'Fold') {
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
