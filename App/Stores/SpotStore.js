import { observable, action, computed } from 'mobx';

class spotStore {
  @observable exchangeSpotData = [];

  constructor() {
    this.init = this.init.bind(this);
  }

  init() {
    //
  }

  @computed get getExchangeSpotDataArray() {
    //rare uses (normally should use getLikeBlogLists)
    // return this.likeBlogs.slice().map(e => toJS(e));
    return Object.values(this.exchangeSpotData).map(e => toJS(e));
  }

  @action async setExchangeSpotList(newList) {
    this.exchangeSpotData = newList;
  }
}

const SpotStore = new spotStore();

export default SpotStore;
