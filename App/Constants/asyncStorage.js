import AsyncStorage from '@react-native-community/async-storage';

/* eslint-disable prettier/prettier */

//set selected city in search bar
export const setSelectedCity = async cityName => {
  try {
    await AsyncStorage.setItem('@selectedCityName:key', cityName);
  } catch (e) {
    // console.log(e);
  }
};

//get selected city in search bar
export const getSelectedCity = async () => {
  try {
    const city = await AsyncStorage.getItem('@selectedCityName:key');
    return city != null ? city : '';
  } catch (error) {
    return {};
  }
};
