import { Platform } from 'react-native';

import RootStore from '../App/Stores/RootStore';

export default class Api {
  static reqTokenLogin = { code: 1, method: 'POST', url: 'auth/tokenlogin' };
  static reqLoginWithEmail = { code: 2, method: 'post', url: 'auth/login' };
  static reqLoginWithGoogle = { code: 3, method: 'POST', url: 'auth/social' };
  static reqLoginWithFacebook = {
    code: 4,
    method: 'post',
    url: 'auth/social',
  };
  static reqLoginWithApple = {
    code: 5,
    method: 'post',
    url: 'auth/social',
  };
  static reqLoginWithLine = {
    code: 6,
    method: 'post',
    url: 'auth/social',
  };
  static reqLoginIntegrationWithGoogle = { code: 7, method: 'POST', url: 'auth/social/integrate' };
  static reqLoginIntegrationWithFacebook = {
    code: 8,
    method: 'post',
    url: 'auth/social/integrate',
  };
  static reqLoginIntegrationWithApple = {
    code: 9,
    method: 'post',
    url: 'auth/social/integrate',
  };
  static reqLoginIntegrationWithLine = {
    code: 10,
    method: 'post',
    url: 'auth/social/integrate',
  };

  static async post(api, param) {
    let result = null;
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      };

      if (RootStore.auth.token !== '') {
        headers.Authorization = `Bearer ${RootStore.auth.token}`;
      }
      let url = null;

      url = `${RootStore.config.host}/${api.url}`;

      const body = param ? JSON.stringify(param) : '';

      const recvData = await fetch(url, { method: api.method, headers, body });

      result = await recvData.json();
    } catch (err) {
      console.log('bambi api post error', err);
    }

    return result;
  }
}
