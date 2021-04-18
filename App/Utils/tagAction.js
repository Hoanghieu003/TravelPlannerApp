import RootStore from '../Stores/RootStore';
import Const from '../../Common/Const';
import getRecommendList from '../../Common/gql/queries/getRecommendList.gql';

export const getListCity = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await RootStore.client.query({
        query: getRecommendList,
        variables: {
          tagType: Const.TagType.City.code,
          language: RootStore.language,
        },
      });

      const city = [];

      res.data.getRecommendList.recommends.forEach(v => {
        city.push(v.city);
      });

      resolve(city);
    } catch (error) {
      console.log('29148 tagAction.js getListCity err:', error);
    }
    // RootStore.client
    //   .query({
    //     query: getRecommendList,
    //     variables: {
    //       tagType: Const.TagType.City.code,
    //       language: RootStore.language,
    //     },
    //   })
    //   .then(res => {
    //     console.log('29148 tagAction.js getListCity:', res);
    //     const city = [];
    //     city.push({ translations: [{ name: RootStore.i18n.t('global.all') }] });
    //     res.data.getRecommendList.recommends.forEach(v => {
    //       city.push(v.city);
    //     });
    //     resolve(city);
    //   })
    //   .catch(err => {
    //     console.log('29148 tagAction.js getListCity err:', err);
    //     reject(err);
    //   });
  });
};
