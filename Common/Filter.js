import moment from 'moment';
import Util from './Util';

export default class Filter {
  static limitString(text, limit) {
    let result = '';
    if (text === undefined || text === null || text === '') {
      return result;
    }

    result = text.substring(0, limit);
    if (text.length > limit) {
      result = `${result}...`;
    }

    return result;
  }

  static relativeTimeNow(date) {
    //change UTC to local GMT time

    date = moment.utc(date).local()._d;
    const diffTime = moment().diff(moment(date, 'ddd MMM D YYYY HH:mm:ss'));
    const diffTimetoSecond = diffTime / 1000;
    if (diffTimetoSecond < 60 * 60) {
      // display minutes
      return moment(date, 'ddd MMM D YYYY HH:mm:ss').fromNow();
    } else if (diffTimetoSecond < 60 * 60 * 24) {
      // display hours
      return moment(date, 'ddd MMM D YYYY HH:mm:ss').fromNow();
    } else if (diffTimetoSecond < 60 * 60 * 24 * 7) {
      // desplay days
      return moment(date, 'ddd MMM D YYYY HH:mm:ss').fromNow();
    } else if (diffTimetoSecond < 60 * 60 * 24 * 30) {
      // display weeks
      const weeks = Util.parseInt(moment.duration(diffTime).asWeeks());
      return `${weeks} weeks ago`;
    } else if (diffTimetoSecond < 60 * 60 * 24 * 365) {
      // display months
      return moment(date, 'ddd MMM D YYYY HH:mm:ss').fromNow();
    } else {
      // display years
      return moment(date, 'ddd MMM D YYYY HH:mm:ss').fromNow();
    }
  }
}
