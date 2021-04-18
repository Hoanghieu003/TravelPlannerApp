import { observable, action, computed } from 'mobx';
import store from 'react-native-simple-store';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import * as RNLocalize from 'react-native-localize';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import Util from '../../Common/Util';

import Config from '../../Common/Config';
import Const from '../../Common/Const';

import i18n from '../../Common/i18n';
import globalUtils from '../Constants/globalUtils';

class rootStore {
  @observable auth = {
    token: '',
    code: 0,
    id: '',
    level: Const.MemberLevel.L0.code,
    nickname: '',
    picture: '',
    city_tags: [],
    home_tag_code: '',

    isGuest: false,
  };

  @observable config = {
    defaultURL: '',
    host: '',
    imgHost: '',
    imgHost_500: '',
    imgHost_1280: '',
  };

  @observable i18n = null;
  @observable language = 'en';
  @observable spinner = false;
  @observable client = null;

  constructor() {
    this.init = this.init.bind(this);
    this.isLogin = this.isLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.refreshInfo = this.refreshInfo.bind(this);

    this.createLanguage = this.createLanguage.bind(this);

    this.i18n = i18n;
    this.createLanguage();
  }

  async createLanguage() {
    let language = RNLocalize.getLocales();
    language = language[0].languageCode;
    language = language.toLowerCase();

    switch (language) {
      case 'en':
      case 'en_us':
      case 'en-us':
      case 'en_gb':
      case 'en-gb':
        i18n.locale = 'en';
        this.language = 'en';
        break;

      case 'cn':
      case 'CN':
      case 'zh_cn':
      case 'zh-cn':
      case 'zh-hans':
        i18n.locale = 'cn';
        this.language = 'zh-CN';
        break;

      case 'tw':
      case 'zh':
      case 'zh-hant':
      case 'zh-hant-tw':
      case 'zh_tw':
      case 'zh-tw':
      case 'zh_mo':
      case 'zh-mo':
      case 'zh_sg':
      case 'zh-sg':
      case 'hk':
      case 'zh_hk':
      case 'zh-hk':
        i18n.locale = 'tw';
        this.language = 'zh-TW';
        break;
      case 'vn':
      case 'vi':
        i18n.locale = 'vn';
        this.language = 'vi';
        break;
      default:
        i18n.locale = 'en';
        this.language = 'en';
    }

    this.i18n = i18n;
  }

  @computed get clientInfo() {
    return this.client;
  }

  @computed get token() {
    return this.auth.token;
  }

  @computed get memberTags() {
    return this.auth.city_tags;
  }

  @action setClient(client) {
    this.client = client;
  }

  @action setCityTags(tagData) {
    this.auth.city_tags = tagData;
  }

  @action setLanguage(language) {
    switch (language) {
      case 'en':
        i18n.locale = 'en';
        this.language = 'en';
        break;

      case 'ko':
        i18n.locale = 'ko';
        this.language = 'ko';
        break;

      case 'zh-CN':
        i18n.locale = 'cn';
        this.language = 'zh-CN';
        break;

      case 'zh-TW':
        i18n.locale = 'tw';
        this.language = 'zh-TW';
        break;

      case 'jp':
        i18n.locale = 'jp';
        this.language = 'jp';
        break;

      case 'th':
        i18n.locale = 'th';
        this.language = 'th';
        break;

      case 'hk':
      case 'zh-HK':
        i18n.locale = 'hk';
        this.language = 'zh-HK';
        break;

      case 'vi':
        i18n.locale = 'vn';
        this.language = 'vi';
        break;

      default:
        i18n.locale = 'en';
        this.language = 'en';
    }

    this.i18n = i18n;
  }

  @action async init() {
    const data = await store.get([
      'token',
      'code',
      'id',
      'level',
      'nickname',
      'picture',
      'home_tag_code',
      'is_guest',
      'language',
    ]);
    if (!Util.isObjectEmpty(data[0])) {
      globalUtils.isLogin = true;
    }
    console.log('29148 data cua rootstore ne:', data);
    this.auth.token = Util.isObjectEmpty(data[0]) ? null : data[0];
    this.auth.code = Util.isObjectEmpty(data[1]) ? null : data[1];
    this.auth.id = Util.isObjectEmpty(data[2]) ? null : data[2];
    this.auth.level = Util.isObjectEmpty(data[3]) ? null : data[3];
    this.auth.nickname = Util.isObjectEmpty(data[4]) ? null : data[4];
    // this.auth.picture = data[5];
    this.auth.picture = Util.isObjectEmpty(data[5]) ? null : data[5];
    this.auth.home_tag_code = Util.isObjectEmpty(data[6]) ? null : data[6];
    this.auth.isGuest = data[7] === true;
    console.log('29148 data cua this.auth ne:', this.auth);

    this.config = { ...Config };

    if (data[8]) {
      this.setLanguage(data[8]);
    }
  }

  @action async refreshInfo() {
    const data = await store.get([
      'token',
      'code',
      'id',
      'level',
      'nickname',
      'picture',
      'home_tag_code',
      'is_guest',
      'language',
    ]);

    this.auth.token = data[0];
    this.auth.code = data[1];
    this.auth.id = data[2];
    this.auth.level = data[3];
    this.auth.nickname = data[4];
    this.auth.picture = data[5];
    this.auth.home_tag_code = data[6];
    this.auth.isGuest = data[7] === true;

    this.config = { ...Config };

    if (data[8]) {
      this.setLanguage(data[8]);
    }
  }

  @action async login(token, code, id, level, nickname, picture, home_tag_code, is_guest = false) {
    this.auth.token = token;
    this.auth.code = code;
    this.auth.id = id;
    this.auth.level = level;
    this.auth.nickname = nickname;
    this.auth.picture = picture;
    this.auth.home_tag_code = home_tag_code;

    this.auth.isGuest = is_guest;
  }

  @action async guestLogin() {
    this.auth.token = 'guest';
    this.auth.code = 0;
    this.auth.id = 'guest';
    this.auth.level = Const.MemberLevel.L0.code;
    this.auth.nickname = 'guest';
    this.auth.picture = 'profile_default.svg';
    this.auth.home_tag_code = null;

    this.auth.isGuest = true;
  }

  @action isLogin() {
    if (this.auth.token === '' || !this.auth.token) {
      return false;
    }

    return true;
  }

  @action logout() {
    return new Promise((resolve, reject) => {
      store
        .delete('token')
        .then(() => store.delete('is_guest'))
        .then(() => store.delete('code'))
        .then(() => store.delete('id'))
        .then(() => store.delete('level'))
        .then(() => store.delete('nickname'))
        .then(() => store.delete('picture'))
        .then(() => store.delete('home_tag_code'))
        .then(() => {
          this.auth.token = '';
          this.auth.isGuest = false;
          const isLoginGoogle = GoogleSignin.isSignedIn();
          if (isLoginGoogle) {
            GoogleSignin.revokeAccess();
            GoogleSignin.signOut();
          }

          resolve();
        })
        .catch(e => reject(e));
    });
  }

  @action startSpinner(scene) {
    if (this.spinner) {
      return false;
    }

    this.spinner = true;
    scene.forceUpdate();
    return true;
  }

  @action stopSpinner(scene) {
    this.spinner = false;
    scene.forceUpdate();
  }

  fontSize(size) {
    return RFPercentage(size - 0.6);
  }
}

const RootStore = new rootStore();
export default RootStore;
