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
      },
      {
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
      },
      {
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
      },
      {
        name: 'Icar Lifestyle',
        phone: '310-926-6999',
        email: 'royfang@icarlifestyle.com',
        timezone: "Newport Beach, CA, USA (GMT-8)",
        add: "414 Rolyn Pl, Arcadia, CA 91007, United States",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Icar_Lifestyle.jpg?v=1686878451",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Size M/L',
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
        name: "Bike Attack Playa Vista",
        phone: "310-862-5001",
        email: "info@BikeAttack.com",
        timezone: "Los Angeles, CA, USA (GMT-7)",
        add: "12775 W Millennium, Los Angeles, CA 90094",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-BikeAttackPlayaVista.jpg?v=1665374977",
        testrideSpot: "California",
        availableSizes: [
          'Carbon 1 Size L',
          'Carbon 1s Size M'
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
        phone: "888-612-9883",
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
        add: "4051 Voltaire St Ste C, San Diego, CA 92107",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Eze_Ryders_Electric_Bikes_san_dieago.jpg?v=1686878451",
        testrideSpot: "California",
        testRideSize: "M/L",
        availableSizes: [
          'Carbon 1 Size M',
          'Carbon 1s Size M'
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
       /*{
        name: "Burn The Ships Electrics",
        phone: "310-372-1122",
        email: "info@burntheshipselectrics.com ",
        timezone: "San Diego, CA, USA (GMT-7)",
        add: "1012 S Pacific Coast Hwy Suite B, Redondo Beach, CA 90277",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Burn_The_Ships_Electrics.png?v=1687327236",
        testrideSpot: "California",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
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
      },*/
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
        phone: "347-699-1935",
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
    ]
  },
  {
    city: 'New Jersey',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977',
    stores: [
      {
        name: "Jersey City Bicycle Co.",
        phone: "551-229-7894",
        email: "jcbcscorp@gmail.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "231 Pavonia Ave, Jersey City, NJ 07302",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Jersey_City_Bicycles_Co.jpg?v=1686878451",
        testrideSpot: "New Jersey",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "",
          "12:00-15:00",
          "12:00-15:00",
          "12:00-15:00",
          "12:00-15:00",
          "",
        ],
      },
    ]
  },
  {
    city: 'Georgia',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977',
    stores: [
      {
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
      },
    ]
  },
  {
    city: 'Pennsylvania',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977',
    stores: [
      {
        name: "Bell's Bike Shop",
        phone: "215-857-5793",
        email: "steve@bellsbikeshop.com",
        timezone: "Washington, DC, USA (GMT-4)",
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
      },
      {
        name: "Drexel Hill Cyclery",
        phone: "610-626-4477",
        email: "drexhillcycles@gmail.com",
        timezone: "Washington, DC, USA (GMT-4)",
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
        timezone: "Washington, DC, USA (GMT-4)",
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
    ]
  },
  {
    city: 'Massachusetts',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977',
    stores: [
      {
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
      },
      {
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
          'Carbon 1 Size M/L',
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
        phone: "352-600-6422",
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
        email: "jorge.samano@hotmail.com",
        timezone: "Dallas, TX, USA (GMT-5)",
        add: "1300 S Polk St, Suite #152, Dallas, TX 75224",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Oak_Cliff_Bike_Synergy.jpg?v=1686878451",
        testrideSpot: "Texas",
        availableSizes: [
          'Carbon 1 Size M',
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
    city: 'Lowa',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Ebike_Iowa.png?v=1687327236',
    stores: [
      {
        name: "Ebike Iowa",
        phone: "(515) 400-3970",
        email: "john.burdine@gmail.com",
        timezone: "Lowa, USA (GMT-5)",
        add: "1900 E Lincoln Way, Suite B, Ames, Lowa 50010",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Ebike_Iowa.png?v=1687327236",
        testrideSpot: "Lowa",
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
  }
]
