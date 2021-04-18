export default class Const {
  static Default = {
    Spot_Rating: 1, // 스팟 별점 등록이 없을 때.
  };
  static LinkInProxyShoping = {
    HongKong: 'https://creatrip.typeform.com/to/SrtCBs',
    Thailand: 'https://creatrip.typeform.com/to/uYUBQw',
    Taiwan: 'https://creatrip.typeform.com/to/ksr29D',
  };
  static MemberLevel = {
    L0: { code: 0, name: '비회원' },
    L1: { code: 1, name: '일반회원' },
    Blogger: { code: 40, name: '블로그작가' },
    Shop: { code: 50, name: '상인' },
    Admin: { code: 90, name: '일반관리자' },
    AdminMax: { code: 99, name: '최고관리자' },
  };
  static Language = {
    // Korean: { code: 'ko', name: '한국어', view: '한국어', money: 'KRW' },
    Taiwan: {
      code: 'zh-TW',
      name: '번체',
      view: '中文繁體 (台灣)',
      money: 'TWD',
    },
    Hongkong: { code: 'zh-HK', name: '광둥어', view: '中文繁體 (香港)', money: 'HKD' },
    China: { code: 'zh-CN', name: '간체', view: '中文简体', money: 'CNY' },
    English: { code: 'en', name: '영어', view: 'English', money: 'USD' },
    Thailand: { code: 'th', name: '태국어', view: 'ภาษาไทย', money: 'THB' },
    Japan: { code: 'jp', name: '일본어', view: '日本語', money: 'JPY' },
    Vietnam: { code: 'vi', name: '베트남', view: 'Tiếng Việt', money: 'VND' },
  };
  static TagType = {
    City: { code: 1, name: '도시' },
    Interest: { code: 2, name: '관심사' },
    HashTag: { code: 3, name: '해시태그' },
    Category: { code: 4, name: '카테고리' },
    DetailCategory: { code: 5, name: '상세카테고리' }, // this code isn't use in all app
    TravelCity: { code: 6, name: '여행한도시' }, // this code isn't use in all app
    ResidenceCity: { code: 7, name: '거주도시' }, // this code isn't use in all app
  };
  static NewTagType = {
    MIDDLE_GENERAL_CATEGORY: 4,
    MIDDLE_RESERVATION_CATEGORY: 5,
    MIDDLE_PROXY_SHOPPING_CATEGORY: 6,
    MAIN_GENERAL_CATEGORY: 8,
    MAIN_RESERVATION_CATEGORY: 9,
    MAIN_PROXY_SHOPPING_CATEGORY: 10,
  };
  static ScreenInTravel = {
    RESERVATIONSCREEN: { code: 0, name: 'Reservation' },
    COUPONSCREEN: { code: 1, name: 'Coupon' },
    REVIEWS: { code: 2, name: 'Reviews' },
    TIPS: { code: 3, name: 'Tips' },
  };
  static DefaultParentCategorySuggest = {
    FOOD: { code: 7767, name: 'Food' },
    ACTIVITIES: { code: 7766, name: 'Activities' },
  };
  static DefaultChildrenCategorySuggest = {
    DELIVERY: { code: 7273, name: 'Delivery' },
    CAFE: { code: 7270, name: 'Cafe' },
    MUSTEATS: { code: 7271, name: 'Must Eats' },
  };
  static SpotListType = {
    reservation: { code: [0, 2], name: 'Reservation' },
    coupon: { code: [3], name: 'Coupon' },
    proxyshopping: { code: [4], name: 'Proxy Shopping' },
  };
  static CarouselBlogType = {
    Like: { code: 1 },
    Created_at: { code: 2 },
    Random: { code: 3 },
    Updated_at: { code: 4 },
  };
  static CategoryType = {
    Normal: { code: 1, name: '일반' },
    Reserve: { code: 2, name: '예약' },
  };
  static AdvertiseType = {
    Main: { code: 0, name: '메인' },
    BlogMain: { code: 1, name: '블로그메인' },
    Blog: { code: 2, name: '블로그' },
    BlogDetail: { code: 3, name: '블로그사이드바' },
    SpotMain: { code: 4, name: '장소메인' },
    Spot: { code: 5, name: '스팟' },
    SpotDetail: { code: 6, name: '장소사이드바' },
    Reserve: { code: 7, name: '예약메인' },
    Purchase: { code: 8, name: '직구메인' },
  };
  static ReserveType = {
    Stand: { code: 0, name: '일반 예약' },
    MemberBenefit: { code: 1, name: '회원 혜택' },
    Outside: { code: 2, name: '외부 URL' },
    Coupon: { code: 3, name: 'COUPON' },
    Shopping: { code: 4, name: 'Shopping' },
  };
  static ReserveStatus = {
    Ready: { code: 0, name: '진행중' },
    Payment: { code: 1, name: '결제대기' },
    Confirm: { code: 2, name: '승인대기' },
    Complete: { code: 3, name: '완료' },
    Cancel: { code: 4, name: '취소' },
    Refund: { code: 5, name: 'Refund' },
  };
  static GenderType = {
    male: { code: 1, name: '남자' },
    female: { code: 2, name: '여자' },
  };
  static ReservePaymentType = {
    None: { code: 0, name: '결제 무관' },
    Require: { code: 1, name: '결제 필요' },
  };
  static ReserveCheckType = {
    None: { code: 0, name: '확인 무관' },
    Require: { code: 1, name: '확인 필요' },
  };
  static ReserveCancelFailType = {
    None: { code: 0, name: 'None' },
    Already: { code: 1, name: '이미 취소된 예약' },
    Late: { code: 2, name: '예약시간 초과' },
    Today: { code: 3, name: '당일 취소' },
    Voucher: { code: 4, name: '바우처코드 존재' },
  };
  static PostType = {
    Spot: { code: 1, name: 'spot' },
    Blog: { code: 2, name: 'blog' },
    Review: { code: 3, name: 'review' },
  };
  static OrderType = {
    Like: { code: 1, name: 'like_count' },
    Date: { code: 2, name: 'renewal_date' },
    Rand: { code: 3, name: 'random' },
  };
  static SocialType = {
    Creatrip: { code: 0, name: 'Creatrip' },
    Facebook: { code: 1, name: 'Facebook' },
    Google: { code: 2, name: 'Google' },
  };
  static Country = [
    'China',
    'Taiwan',
    'Hong Kong',
    'Macau',
    'Singapore',
    'Malaysia',
    'Indonesia',
    'Philippines',
    'Thailand',
    'South Korea',
    'Japan',
    'Vietnam',
    'United States',
    'Canada',
    'Australia',
    'Others',
  ];
  static ReserveSpotRemarks = {
    'free-reserve': {
      code: 1,
      icon: 'payment.png',
      translationKey: 'reserve-detail.spot-remarks.free-reserve',
    },
    'deposit-reserve': {
      code: 2,
      icon: 'payment.png',
      translationKey: 'reserve-detail.spot-remarks.deposit-reserve',
    },
    'refund-3-day': {
      code: 3,
      icon: 'refund.png',
      translationKey: 'reserve-detail.spot-remarks.refund-3-day',
    },
    'refund-5-day': {
      code: 4,
      icon: 'refund.png',
      translationKey: 'reserve-detail.spot-remarks.refund-5-day',
    },
    'refund-7-day': {
      code: 5,
      icon: 'refund.png',
      translationKey: 'reserve-detail.spot-remarks.refund-7-day',
    },
    'unable-refund': {
      code: 6,
      icon: 'refund.png',
      translationKey: 'reserve-detail.spot-remarks.unable-refund',
    },
    'mobile-voucher': {
      code: 7,
      icon: 'voucher-mobile.png',
      translationKey: 'reserve-detail.spot-remarks.mobile-voucher',
    },
    'print-voucher': {
      code: 8,
      icon: 'voucher-print.png',
      translationKey: 'reserve-detail.spot-remarks.print-voucher',
    },
    'change-ticket': {
      code: 9,
      icon: 'ticket.png',
      translationKey: 'reserve-detail.spot-remarks.change-ticket',
    },
    'no-ticket': {
      code: 10,
      icon: 'voucher-none.png',
      translationKey: 'reserve-detail.spot-remarks.no-ticket',
    },
    'require-4-hour': {
      code: 11,
      icon: 'time.png',
      translationKey: 'reserve-detail.spot-remarks.require-4-hour',
    },
    'require-6-hour': {
      code: 12,
      icon: 'time.png',
      translationKey: 'reserve-detail.spot-remarks.require-6-hour',
    },
    'require-8-hour': {
      code: 13,
      icon: 'time.png',
      translationKey: 'reserve-detail.spot-remarks.require-8-hour',
    },
    'require-date': {
      code: 14,
      icon: 'datetime.png',
      translationKey: 'reserve-detail.spot-remarks.require-date',
    },
    'member-auth': {
      code: 15,
      icon: 'member-auth.png',
      translationKey: 'reserve-detail.spot-remarks.member-auth',
    },
    guarantee: {
      code: 16,
      icon: 'gift.png',
      translationKey: 'reserve-detail.spot-remarks.guarantee',
    },
    'group-join': {
      code: 17,
      icon: 'tour.png',
      translationKey: 'reserve-detail.spot-remarks.group-join',
    },
    'language-korean': {
      code: 18,
      icon: 'language.png',
      translationKey: 'reserve-detail.spot-remarks.language-korean',
    },
    'language-mandarin': {
      code: 19,
      icon: 'language.png',
      translationKey: 'reserve-detail.spot-remarks.language-mandarin',
    },
    'language-english': {
      code: 20,
      icon: 'language.png',
      translationKey: 'reserve-detail.spot-remarks.language-english',
    },
    'show-coupon': {
      code: 21,
      icon: 'member-auth.png',
      translationKey: 'reserve-detail.spot-remarks.show-coupon',
    },
  };
}
