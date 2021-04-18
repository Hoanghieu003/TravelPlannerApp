import { action, computed, observable } from 'mobx';
import store from 'react-native-simple-store';
import { toJS } from 'mobx';
import RootStore from './RootStore';

class tagStore {
  //observable:
  @observable listCities = []; // used this.getLikeBlogLists to get the data of liked Spots
  @observable selectedCity = {};

  constructor() {
    this.init = this.init.bind(this);
  }

  @action async init() {
    const data = await store.get(['listCities']);
    this.listCities = data[0] ? Object.values(data[0]) : [];
    this.selectedCity = {
      code: null,
      translations: [{ name: RootStore.i18n.t('home.search-city') }],
    };
  }

  @computed get getSelectedCityObj() {
    return toJS(this.selectedCity);
  }

  @computed get getListCitiesArray() {
    return this.listCities.slice().map(e => toJS(e));
  }

  @action async setListCitiesArray(list) {
    const newList = list.map(e => ({
      ...e,
      code: e.code,
      cityCode: e.code,
      cityName:
        e.translations && e.translations[0] && e.translations[0].name ? e.translations[0].name : '',
    }));
    this.listCities = newList;
    await store.update('listCities', newList);
  }

  @action changeSelectedCity(selectedCity, onDoneFunc = () => {}) {
    if (this.selectedCity === selectedCity) return;
    console.log('29148 changeSelectedCity : this.getListCitiesArray', this.getListCitiesArray);
    const newCities = this.getListCitiesArray.map(e =>
      e &&
      e.translations &&
      e.translations[0] &&
      e.translations[0].name &&
      e.translations[0].name === RootStore.i18n.t('home.search-city')
        ? { code: null, translations: [{ name: RootStore.i18n.t('global.all') }] }
        : e,
    );
    console.log('29148 changeSelectedCity : newCities', newCities);

    this.setListCitiesArray(newCities);
    this.selectedCity = selectedCity;
    setTimeout(() => {
      onDoneFunc();
    }, 10);
  }
}

const TagStore = new tagStore();

export default TagStore;
