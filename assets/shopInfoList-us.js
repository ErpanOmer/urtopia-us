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
       {
        name: "Burn The Ships Electrics",
        phone: "310-372-1122",
        email: "info@burntheshipselectrics.com ",
        timezone: "San Diego, CA, USA (GMT-7)",
        add: "1012 S Pacific Coast Hwy Suite B, Redondo Beach, CA 90277",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Burn_The_Ships_Electrics.png?v=1687327236",
        testrideSpot: "California",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1s Size M',
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
        name: "Epic Power Bikes",
        phone: "(949) 503-3525",
        email: "epiccyclessc@gmail.com ",
        timezone: "San Diego, CA, USA (GMT-7)",
        add: "85 Via Pico Plaza, San Clemente, CA 92672, United States",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Epic_Power_Bikes2.jpg?v=1689228574",
        testrideSpot: "California",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "10:00-16:00",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-16:00"
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
  /*{
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
  },*/
  {
    city: 'Pennsylvania',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/testrideshopimg-Buna_Bicycle_Works_Washington_dc.jpg?v=1665374977',
    stores: [
      {
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
        phone: "610-965-6597",
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
      {
        name: "Evolution E-Bikes",
        phone: "888-545-2453",
        email: "David@EvolutionE-Bikes.com",
        timezone: "Washington, DC, USA (GMT-4)",
        add: "25 Accord Park Dr.  Unit 3 Rockland, MA 02341",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Evolution_E-Bikes.jpg?v=1691635464",
        testrideSpot: "Massachusetts",
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "12:00-17:00",
          "12:00-17:00",
          "12:00-17:00",
          "12:00-17:00",
          "12:00-17:00",
          "12:00-17:00",
          "10:00-16:00",
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
          'Carbon 1s Size S',
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
          "09:00-15:00",
        ],
      },
    ]
  },
  {
    city: 'New Mexico',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/istockphoto-1160412954-612x612.jpg?v=1691482552',
    stores: [
      {
        name: "E-BIKES OF SOUTHERN NEW MEXICO",
        phone: "575-635-9961",
        email: "ebikesnewmexico.com",
        timezone: "New Mexico, USA (GMT-7)",
        add: "1230 Osage Ct  Las Cruces NM 88005",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/166556405_938400133573480_4023440075912235609_n.jpg?v=1691482553",
        testrideSpot: "New Mexico",
        availableSizes: [
          'Carbon 1 Size M/L',
          'Carbon 1s Size M',
        ],
        businessHours: [
          "",
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
          "10:00-14:00",
          "10:00-14:00",
          "10:00-14:00",
          "10:00-14:00",
          "10:00-14:00",
          "10:00-14:00",
          "10:00-14:00",
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
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "",
          "13:00-16:00",
          "13:00-16:00",
          "13:00-16:00",
          "13:00-16:00",
          "13:00-16:00",
          "",
        ],
        isPartner: true,
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
          'Carbon 1s Size L',
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
    ]
  },
]
