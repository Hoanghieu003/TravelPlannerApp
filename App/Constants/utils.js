import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RootStore from '../Stores/RootStore';
import Const from '../../Common/Const';

export const RandomNumber = Math.floor(Math.random() * 100) + 1;
export const RandomTime = `${Math.floor(Math.random() * 23) + 1} : ${
  Math.floor(Math.random() * 59) + 1
}`;
export const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

export const checkLogin = (onDone) => {
  if (RootStore.auth.token === null || RootStore.auth.token === '') {
    Alert.alert(
      '',
      RootStore.i18n.t('global.require-login'),
      [
        {
          text: RootStore.i18n.t('global.close'),
        },
        {
          text: RootStore.i18n.t('global.login'),
          onPress: () => {
            Actions.jump('aboutStack');
          },
        },
      ],
      { cancelable: true },
    );
    return;
  }
  onDone();
};
export const checkOwner = (id = 0) => {
  if (
    id !== 0 &&
    RootStore.auth &&
    ((RootStore.auth.level && RootStore.auth.level >= Const.MemberLevel.AdminMax.code) ||
      (RootStore.auth.id && RootStore.auth.id === id))
  ) {
    return true;
  } else {
    return false;
  }
};

export const getTranslationObj = (initInfoObj) => {
  let temp = null;
  if (
    initInfoObj &&
    initInfoObj.translations &&
    initInfoObj.translations.find((e) => e.language === RootStore.language)
  ) {
    temp = initInfoObj.translations.find((e) => e.language === RootStore.language);
  } else {
    temp = initInfoObj && initInfoObj.translations && initInfoObj.translations[0];
  }
  return temp;
};
