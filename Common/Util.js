import { Dimensions, Platform } from 'react-native';

import moment from 'moment';
import momentTZ from 'moment-timezone';

import shortid from 'shortid';

export default class Util {
  static generateUniqueID() {
    return shortid();
  }

  static getIOSPadding(position) {
    return 0;

    if (
      Platform.OS === 'ios' &&
      (Dimensions.get('window').height === 812 ||
        Dimensions.get('window').width === 812 ||
        Dimensions.get('window').height === 896 ||
        Dimensions.get('window').width === 896)
    ) {
      // ios x, xs = 812
      // ios xr, xs max = 896
      if (position === 'top') {
        return 34;
      }

      if (position === 'bottom') {
        return 20;
      }
    } else if (Platform.OS === 'ios') {
      if (position === 'top') {
        return 20;
      }
    }

    return 0;
  }

  static parseInt(val) {
    if (val) {
      if (typeof val === 'string') {
        return Math.floor(parseInt(val, 10));
      }

      if (val === true) {
        return 1;
      }

      return Math.floor(val);
    }

    return 0;
  }

  static parseFloat(val) {
    if (val) {
      if (typeof val === 'string') {
        return Math.floor(parseFloat(val, 10));
      }

      if (val === true) {
        return 1;
      }

      return Math.floor(val);
    }

    return 0;
  }

  static floorRating(rating) {
    const tempRating = rating * 10;
    const pointNumber = tempRating % 10;
    const mainNumber = tempRating - pointNumber;

    if (pointNumber < 3) {
      return mainNumber / 10;
    } else if (pointNumber < 8) {
      return (mainNumber + 5) / 10;
    }

    return (mainNumber + 10) / 10;
  }

  static toDate(timestamp, dateOnly = true) {
    let format = 'YYYY-MM-DD HH:mm:ss';

    if (dateOnly) {
      format = 'YYYY-MM-DD';
    }

    return moment(timestamp).format(format);
  }

  static toDateTimeZone(timestamp, timeZone, dateOnly = true) {
    let format = 'YYYY-MM-DD HH:mm:ss';

    if (dateOnly) {
      format = 'YYYY-MM-DD';
    }

    const date = new Date(timestamp);
    const timeSeoul = momentTZ.tz(date, timeZone);

    return moment(timeSeoul).format(format);
  }

  static encodeURI(uri) {
    // const regExp = /[:\/?#\[\]@!$&\'\"\(\)*+,;=\\]/gi; // reserved characters - rfc 3986
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\t\r\n ]/g; // avoid percent encode

    return uri
      .replace(regExp, '-')
      .replace(/-+/g, '-')
      .replace(/-$/g, '');
  }

  static trim(string) {
    return string.replace(/^\s+|\s+$/g, '');
  }

  static price_comma(_price) {
    const price = `${_price}`;

    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  static encodeURI(uri = '') {
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\t\r\n ]/g;

    return uri
      .replace(regExp, '-')
      .replace(/-+/g, '-')
      .replace(/-$/g, '');
  }

  static isObjectEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
}
