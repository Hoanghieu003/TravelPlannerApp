import Geolocation from '@react-native-community/geolocation';
import analytics from '@react-native-firebase/analytics';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import apolloLogger from 'apollo-link-logger';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { AppState, Dimensions, Image, Linking, Text, View } from 'react-native';
import Config from 'react-native-config';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import VersionCheck from 'react-native-version-check';
import Api from '../../Common/Api';
import { myAlert } from '../Components/MyAlert';
import { HEIGHT_SCALE_RATIO } from '../Constant/constant';
import { setSelectedCity } from '../Constants/asyncStorage';
import globalUtils from '../Constants/globalUtils';
import { COLOR } from '../Constants/styles';
import LikeStore from '../Stores/LikeStore';
import RootStore from '../Stores/RootStore';
import TagStore from '../Stores/TagStore';
import { getMyLikeBlog, getMyLikeSpot } from '../Utils/likeAction';
import { getListCity } from '../Utils/tagAction';
import { IMAGE } from '../../asset/image/ImagePath';

export default class Load extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      appState: 'active',
    };
    this.setConfigFromServer = this.setConfigFromServer.bind(this);
    this.height = Dimensions.get('window').height / 2 - 25;
  }

  async continueUserApp() {}

  async componentDidMount() {
    analytics().setCurrentScreen('openApplication');
    Geolocation.setRNConfiguration({ skipPermissionRequests: false });
    this.checkVersion();
    await setSelectedCity('');
    await RootStore.init();
    LikeStore.init();
    await TagStore.init();
    setTimeout(() => {
      getListCity().then((res) => {
        res.unshift({
          code: null,
          cityCode: null,
          cityName: RootStore.i18n.t('home.search-city'),
          translations: [{ name: RootStore.i18n.t('home.search-city') }],
        });
        TagStore.setListCitiesArray(res);
        const tagData = [];
        res.forEach((v) => tagData.push(v.city));
        RootStore.setCityTags(tagData);
      });
      getMyLikeSpot();
      getMyLikeBlog();
    }, 100);

    this.setConfigFromServer();
    const httpLink = new HttpLink({ uri: `${RootStore.config.host}/graphql` });
    const authMiddleware = new ApolloLink((operation, forward) => {
      // 매번 토큰을 갱신하기 위해 함수로 교체
      operation.setContext(() => {
        const token = RootStore.auth.token;
        return {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        };
      });

      return forward(operation);
    });

    const defaultOptions = {
      watchQuery: { fetchPolicy: 'network-only', errorPolicy: 'ignore' },
      query: { fetchPolicy: 'network-only', errorPolicy: 'all' },
    };

    const errorLink = new onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log('graphQLErrors', graphQLErrors);
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    });
    const link = ApolloLink.from([errorLink, apolloLogger, authMiddleware.concat(httpLink)]);

    const client = new ApolloClient({
      link,
      cache: new InMemoryCache(),
      defaultOptions,
    });

    RootStore.setClient(client);
  }
  handleAppStateChange = (nextAppState) => {
    //the app from background to front
    if (nextAppState === 'active') {
      Actions.reset('mainStack');
    }
    this.setState({ appState: nextAppState });
  };
  async checkVersion() {
    const currentVersion = VersionCheck.getCurrentVersion(); //current version app
    // Actions.replace('home');

    await VersionCheck.getLatestVersion() // Automatically choose profer provider using `Platform.select` by device platform.
      .then((latestVersion) => {
        VersionCheck.needUpdate({
          currentVersion: currentVersion, //version on device debugger
          latestVersion: latestVersion, //version on store
        }).then((res) => {
          //check new version?
          //if need to update
          setTimeout(() => {
            SplashScreen.hide();
          }, 200);
          if (res.isNeeded) {
            // 2 case: 1. important version is first number ==> must be update if not --> alway show alert
            //         2. NOT important version is second number and last number --> current logic
            const importantCurrentVersion = currentVersion.split('.')[0];
            const importantLatestVersion = latestVersion.split('.')[0];
            if (importantCurrentVersion < importantLatestVersion) {
              AppState.addEventListener('change', this.handleAppStateChange);

              myAlert(
                '',
                RootStore.i18n.t('need-update'),
                () => {
                  Linking.canOpenURL(res.storeUrl)
                    .then(() => {
                      Linking.openURL(res.storeUrl)
                        .then(() => {
                          console.log('29148 krowjr902ej92 ');
                        })
                        .catch((err2) => {
                          console.log('29i1 chay cai nay mo url err2:', err2);
                        });
                    })
                    .catch((err) => {
                      console.log('err29i1 chay cai nay mo url 2:', err);
                    });
                },
                'Agree',
              );
            } else {
              myAlert(
                '',
                RootStore.i18n.t('need-update'),
                () => {
                  Linking.canOpenURL(res.storeUrl)
                    .then(() => {
                      Linking.openURL(res.storeUrl)
                        .then(() => {
                          console.log('29148 krowjr902ej92 ');
                        })
                        .catch((err2) => {
                          console.log('29i1 chay cai nay mo url err2:', err2);
                        });
                    })
                    .catch((err) => {
                      console.log('err29i1 chay cai nay mo url 2:', err);
                    });
                },
                'Agree',
              );
              Actions.replace('home');
            }
            //if not need to update
          } else {
            Actions.replace('home');
          }
        });
      });
  }
  setConfigFromServer() {
    const config = {
      name: Config.name,
      defaultURL: Config.defaultURL,
      host: Config.host,
      imgHost: Config.imgHost,
      imgHost_1280: Config.imgHost_1280,
      imgHost_500: Config.imgHost_500,
      exim_payment_id: Config.exim_payment_id,
      exim_payment_url: Config.exim_payment_url,
      payment_host: Config.payment_host,
      iamport_id: Config.iamport_id,
    };
    RootStore.config = config;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.WHITE,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <Image
          source={IMAGE.LOGO_PRIMARY}
          style={{
            marginTop: 10,
            marginBottom: 10,
            height: 29 * HEIGHT_SCALE_RATIO,
          }}
          resizeMode="contain"
        />
        <Text style={{ color: COLOR.GREY20, fontFamily: 'Raleway' }}>
          {RootStore.i18n.t('global.slogan', {})}
        </Text> */}
      </View>
    );
  }
}
