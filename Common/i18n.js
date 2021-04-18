import i18n from 'i18n-js';

import en from './i18n-locales/en.json';

import ko from './i18n-locales/ko.json';

import tw from './i18n-locales/tw.json';

import cn from './i18n-locales/cn.json';

import hk from './i18n-locales/hk.json';

import jp from './i18n-locales/jp.json';

import th from './i18n-locales/th.json';

import vn from './i18n-locales/vn.json';

i18n.locale = 'en';

i18n.defaultLocale = 'en';

i18n.fallbacks = true;

i18n.translations = {
  en,

  ko,

  tw,

  cn,

  hk,

  jp,

  th,
  vn,
};

export default i18n;
