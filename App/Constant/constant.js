import { Dimensions, Platform } from 'react-native';
import { IMAGE } from '../../asset/image/ImagePath';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

// Use iPhone6 as base size which is 375 x 667
const baseWidth = 375;
const baseHeight = 667;

///screen scale
export const WIDTH_SCALE_RATIO = WIDTH / baseWidth;
export const HEIGHT_SCALE_RATIO = HEIGHT / baseHeight;
export const PAGING_LIMIT = 5;
///Data test
// export const avatarDefault = 'https://png.pngtree.com/svg/20170913/offline_1147544.png';

export const FLIGHTTIME = [
  {
    country: 'flightTime.Taiwan',
    flag_image: IMAGE.FLAG_TAIWAN,
    blog: 3725,
  },
  {
    country: 'flightTime.Hong-Kong',
    flag_image: IMAGE.FLAG_HONGKONG,
    blog: 5211,
  },
  {
    country: 'flightTime.Thailand',
    flag_image: IMAGE.FLAG_THAILAND,
    blog: 5517,
  },
  {
    country: 'flightTime.Indonesia',
    flag_image: IMAGE.FLAG_INDONESIA,
    blog: 5300,
  },
  {
    country: 'flightTime.Malaysia',
    flag_image: IMAGE.FLAG_MALAYSIA,
    blog: 5297,
  },
  {
    country: 'flightTime.Macau',
    flag_image: IMAGE.FLAG_MACAU,
    blog: 5301,
  },
  {
    country: 'flightTime.Philippines',
    flag_image: IMAGE.FLAG_PHILIPPINES,
    blog: 5473,
  },
  {
    country: 'flightTime.China',
    flag_image: IMAGE.FLAG_CHINA,
    blog: 5304,
  },
  {
    country: 'flightTime.UnitedState',
    flag_image: IMAGE.FLAG_UNITEDSTATE,
    blog: 5352,
  },

  {
    country: 'flightTime.Singapore',
    flag_image: IMAGE.FLAG_SINGAPORE,
    blog: 5299,
  },

  {
    country: 'flightTime.Japan',
    flag_image: IMAGE.FLAG_JAPAN,
    blog: 5351,
  },

  {
    country: 'flightTime.India',
    flag_image: IMAGE.FLAG_INDIA,
    blog: 5303,
  },
];

export const PLUSINFORMATION = [
  {
    country: 'home.flight-info',
    blog: 0,
  },
  {
    country: 'home.visa-info',
    blog: 5483,
  },
  {
    country: 'home.entracnce-info',
    blog: 2847,
  },
  {
    country: 'home.exchange-info',
    blog: 1491,
  },
  {
    country: 'home.tex-refund-info',
    blog: 414,
  },
  {
    country: 'home.transportation',
    blog: 5362,
  },
  {
    country: 'home.korean-culture',
    blog: 5404,
  },
  {
    country: 'home.accommodation-info',
    blog: 4506,
  },
  {
    country: 'home.duty-free-info',
    blog: 5075,
  },

  {
    country: 'home.hanbok-info',
    blog: 158,
  },

  {
    country: 'home.delivery-guide',
    blog: 4480,
  },
];

export const SLIDETEST = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    title2: '여행정보',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    title2: '예약혜택',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    title2: '문화상식',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    title2: '숙박상식',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    title2: '비행시간',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    title: 'Middle Earth, Germany',
    title2: '비자확인',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/lceHsT6l.jpg',
  },
];

export const DATA_ALERT = [
  {
    title: '궁가는 여우 예약이 확정되었습니다.',
    date: '2019.06.08',
    time: '23:25',
  },
  {
    title: '궁가는 여우 예약이 확정되었습니다.',
    date: '2019.06.08',
    time: '23:25',
  },
  {
    title: '궁가는 여우 예약이 확정되었습니다.',
    date: '2019.06.08',
    time: '23:25',
  },
  {
    title: '궁가는 여우 예약이 확정되었습니다.',
    date: '2019.06.08',
    time: '23:25',
  },
];

export const CUSTOM_MAP_STYLE = [
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.attraction',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.government',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'poi.medical',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.place_of_worship',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'poi.school',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit.line',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'transit.station',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'transit.station.airport',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit.station.bus',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'transit.station.rail',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
];

export const KOREA_NEWS_TAG_CODE = 6119;
