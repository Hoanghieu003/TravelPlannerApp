import { action, computed, observable } from 'mobx';
import store from 'react-native-simple-store';
import { toJS } from 'mobx';
import { arrayToObject } from '../../Common/arrayUtils';
import { getMyLikeBlog, getMyLikeSpot } from '../Utils/likeAction';

class likeStore {
  //observable:
  @observable likeSpots = {}; // used this.getLikeBlogLists to get the data of liked Spots
  @observable likeBlogs = {}; // used this.getLikeBlogLists to get the data of liked Blogs
  constructor() {
    this.init = this.init.bind(this);
  }

  @action async init() {
    const data = await store.get(['likeSpots', 'likeBlogs']);
  }
  @computed get getLikeBlogLists() {
    return toJS(this.likeBlogs);
  }

  @computed get getLikeSpotLists() {
    return toJS(this.likeSpots);
  }

  @computed get getLikeBlogListsArray() {
    //rare uses (normally should use getLikeBlogLists)
    return Object.values(this.likeBlogs).map((e) => toJS(e));
  }

  @computed get getLikeSpotListsArray() {
    //rare uses (normally should use getLikeSpotLists)
    return Object.values(this.likeSpots).map((e) => toJS(e));
  }

  @action async setLikeBlogLists(newList) {
    const convertedToObj = arrayToObject(newList.map((e) => ({ ...e, like: true })));

    this.likeBlogs = convertedToObj;
  }

  @action async setLikeSpotLists(newList) {
    const convertedToObj = arrayToObject(newList.map((e) => ({ ...e, like: true })));

    this.likeSpots = convertedToObj;
  }

  @action async onChangeLikeBlog(blog, isForcesLike = false) {
    const newLiked = { ...blog }; //new created object (for blog: we only store code property is enough)
    let temp = this.getLikeBlogLists; //initial list before change.
    let isExisted = null;
    if (isForcesLike) {
      temp = { [newLiked.code]: { ...newLiked }, ...temp };
    } else {
      isExisted = this.getLikeBlogLists[newLiked.code]; //check existed (if have value then it means this item is liked or else).
      if (!isExisted) {
        temp = { [newLiked.code]: { ...newLiked }, ...temp };
      } else {
        delete temp[newLiked.code];
      }
    }
    this.likeBlogs = temp;
    // await store.update('likeBlogs', temp);
    return isForcesLike ? true : !isExisted;
  }

  @action async onChangeLikeSpot(spot, isForcesLike = false) {
    const newLiked = spot;
    let temp = this.getLikeSpotLists; //initial list before change.
    let isExisted = null;
    if (isForcesLike) {
      //force the list to add this item anyways
      temp = { [newLiked.code]: { ...newLiked }, ...temp };
    } else {
      //switch item between like / unlike
      isExisted = this.getLikeSpotLists[newLiked.code]; //check existed (if have value then it means this item is liked or else).
      if (!isExisted) {
        temp = { [newLiked.code]: { ...newLiked }, ...temp };
      } else {
        delete temp[newLiked.code];
      }
    }
    // console.log('29148 onChangeLikeSpot after like list:', temp);
    this.likeSpots = temp;
    // await store.update('likeSpots', temp);
    return isForcesLike ? true : !isExisted;
  }
}

const LikeStore = new likeStore();

export default LikeStore;
