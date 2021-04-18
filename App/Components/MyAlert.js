import { Alert } from 'react-native';
import RootStore from '../Stores/RootStore';

export const myAlert = (title, detail, func, text = RootStore.i18n.t('global.close')) => {
  setTimeout(() => {
    Alert.alert(
      title,
      detail,
      [
        {
          text,
          onPress: func,
        },
      ],
      { cancelable: false },
    );
  }, 300);
};
