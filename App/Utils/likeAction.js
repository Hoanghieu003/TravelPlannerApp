import store from 'react-native-simple-store';
import Const from '../../Common/Const';
import RootStore from '../Stores/RootStore';
import getAllLikeBlog from '../../Common/gql/queries/getAllLikeBlog.gql';
import getAllLikeSpot from '../../Common/gql/queries/getAllLikeSpot.gql';
import getBlogListNew from '../../Common/gql/queries/getBlogListNew.gql';
import getSpotListNew from '../../Common/gql/queries/getSpotListNew.gql';
import Api from '../../Common/Api';
import LikeStore from '../Stores/LikeStore';
import globalUtils from '../Constants/globalUtils';

const getListLikeSpot = async (variables) => {
  try {
    const result = await RootStore.client.query({
      query: getSpotListNew,
      variables,
    });
    if (result && result.data && result.data.getSpotListNew && result.data.getSpotListNew.spots) {
      return result.data.getSpotListNew.spots;
    }
    return [];
  } catch (error) {
    return error;
  }
};

export const getMyLikeSpot = async () => {
  if (globalUtils.isLogin === false) {
    return;
  }
  let finalData = [];
  const defaultVariables = {
    // type: Const.PostType.Spot.code,
    languages: [RootStore.language],
    limit: 100000,
    offset: 0,
    isMine: true,
    isConfirm: true,
  };
  //reserved:
  try {
    const listReservedLikeSpot = await getListLikeSpot({...defaultVariables, isReserved: true});
    if (listReservedLikeSpot && listReservedLikeSpot.length > 0) {
      finalData = [...finalData, ...listReservedLikeSpot];
    }
  } catch (error) {
    console.log('29148 likeSpot of reserved was crashed:', error);
  }

  //unreserved:
  try {
    const listUnreservedLikeSpot = await getListLikeSpot({
      ...defaultVariables,
      isReserved: false,
    });
    if (listUnreservedLikeSpot && listUnreservedLikeSpot.length > 0) {
      finalData = [...finalData, ...listUnreservedLikeSpot];
    }
  } catch (error) {
    console.log('29148 likeSpot of reserved was crashed:', error);
  }

  if (finalData && finalData.length > 0) {
    LikeStore.setLikeSpotLists(finalData);
  } else {
    LikeStore.setLikeSpotLists([]);
  }
};

export const getMyLikeBlog = async () => {
  if (globalUtils.isLogin === false) {
    return;
  }
  const variables = {
    // type: Const.PostType.Blog.code,
    languages: [RootStore.language],
    limit: 100000,
    isPublish: true,
    isMine: true,
    offset: 0,
  };

  const result = await RootStore.client.query({
    query: getBlogListNew,
    variables,
  });

  if (result.data.getBlogListNew.blogs && result.data.getBlogListNew.blogs.length) {
    LikeStore.setLikeBlogLists(result.data.getBlogListNew.blogs);
  } else {
    LikeStore.setLikeBlogLists([]);
  }
};

export const convertLikeSpotToMobx = (newList, onDoneFunc = () => {}) => {
  newList.forEach((e) => {
    if (e && e.like_members && e.like_members.length > 0 && RootStore.auth.id !== '') {
      LikeStore.onChangeLikeSpot(e, true);
    }
  });
  setTimeout(() => {
    onDoneFunc();
  }, 10);
};

export const convertLikeBlogToMobx = (newList, onDoneFunc = () => {}) => {
  newList.forEach((e) => {
    if (e && e.like_members && e.like_members.length > 0 && RootStore.auth.id !== '') {
      LikeStore.onChangeLikeBlog(e, true);
    }
  });
  setTimeout(() => {
    onDoneFunc();
  }, 10);
};
