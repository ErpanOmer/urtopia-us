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
      {
        name: "Bike Attack Playa Vista",
        phone: "310-862-5001",
        email: "sales@bikeattack.com",
        timezone: "Los Angeles, CA, USA (GMT-7)",
        add: "12775 W Millennium, Los Angeles, CA 90094",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-BikeAttackPlayaVista.jpg?v=1665374977",
        testrideSpot: "California",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon One Size M/L',
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
        name: "DTLA Bikes",
        phone: "213-533-8000",
        email: "rodney@dtlabikes.com",
        timezone: "Los Angeles, CA, USA (GMT-7)",
        add: "425 S. Broadway, Los Angeles, CA 90013",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-dtla_bikes.jpg?v=1665374977",
        testrideSpot: "California",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon One Size M/L',
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
        phone: "888-612-9883",
        email: "doug@elvmotors.com",
        timezone: "Santa Clara, CA, USA (GMT-7)",
        add: "2332 El Camino Real, Santa Clara, CA 95050",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-ELV_Motors_ca_san_jose.jpg?v=1665374977",
        testrideSpot: "California",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon One Size M/L',
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
        email: "manager@ezeryders.com, sales@ezeryders.com",
        timezone: "San Diego, CA, USA (GMT-7)",
        add: "4051 Voltaire St Ste C, San Diego, CA 92107",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Eze_Ryders_Electric_Bikes_san_dieago.jpg?v=1665374977",
        testrideSpot: "California",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon One Size M/L',
        ],
        businessHours: [
          "10:00-17:00",
          "",
          "12:00-17:00",
          "12:00-17:00",
          "12:00-17:00",
          "12:00-17:00",
          "10:00-17:00"
        ],
      },
    ]
  },
  {
    city: 'New York',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Spokesman_Cycles_LIC_ny.jpg?v=1665374977',
    stores: [
      {
        name: "Spokesman Cycles (LIC)",
        phone: "718-433-0450",
        email: "bikesnyc@gmail.com",
        timezone: "Long Island City, Queens, NY, USA (GMT-4)",
        add: "49-04 Vernon Blvd, Long Island City, NY 11101",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Spokesman_Cycles_LIC_ny.jpg?v=1665374977",
        testrideSpot: "New York",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon One Size M/L',
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
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Spokesman_Cycles_Midtown.jpg",
        testrideSpot: "New York",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon One Size M/L',
        ],
        businessHours: [
          "",
          "",
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
    city: 'Washington DC',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977',
    stores: [
      {
        name: "Buna Bicycle Works",
        phone: "202-209-8563",
        email: "guy@bunabicycleworks.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "4828 MacArthur Blvd NW, Washington, DC 20007",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977",
        testrideSpot: "Washington DC",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon One Size M/L',
        ],
        businessHours: [
          "08:00-15:00",
          "08:00-18:00",
          "08:00-18:00",
          "08:00-18:00",
          "08:00-18:00",
          "08:00-18:00",
          "08:00-15:00",
        ],
      },
    ]
  },
  {
    city: 'Florida',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-E-Cycle_Adventures_fl.jpg?v=1665374977',
    stores: [
      {
        name: "E-Cycle Adventures",
        phone: "+1 352-600-6422",
        email: "ecycleadventures@gmail.com",
        timezone: "New Port Richey, FL, USA (GMT-4)",
        add: "9904 Little Rd, New Port Richey, FL 34654",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-E-Cycle_Adventures_fl.jpg?v=1665374977",
        testrideSpot: "Florida",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon One Size M/L',
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
        name: "Wheel Works E-Bikes",
        phone: "407-614-4539",
        email: "ebikes@wgwheelworks.com",
        timezone: "Orlando, FL (GMT-4)",
        add: "855 E Plant St Suite 600, Winter Garden, FL 34787",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Wheel_Works_E-Bikes.jpg?v=1667368641",
        testrideSpot: "Florida",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon One Size M/L',
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
    city: 'Texas',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Playtri_dallas.jpg?v=1665374977',
    stores: [
      {
        name: "Playtri",
        phone: "214-370-9010",
        email: "store@playtri.com",
        timezone: "Dallas, TX, USA (GMT-5)",
        add: "6465 E Mockingbird Ln #358, Dallas, TX 75214",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-E-Cycle_Adventures_fl.jpg?v=1665374977",
        testrideSpot: "Texas",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon One Size M/L',
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
    ]
  }
]
