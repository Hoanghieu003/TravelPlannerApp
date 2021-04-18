import analytics from '@react-native-firebase/analytics';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Const from '../../Common/Const';
import Util from '../../Common/Util';
import BaseHeaderApp from '../Components/BaseHeaderApp';
import MyWebView from '../Components/MyWebView';
import PFlatList from '../Components/PFlatList';
import SpotCard from '../Components/SpotCard';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import { COLOR } from '../Constants/styles';
import RootStore from '../Stores/RootStore';

//* 블로그에서 스팟 예약할때 목록일경우 보여주는 페이지
export default class BlogSpotReserve extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClickGoBack = this.onClickGoBack.bind(this);
  }

  onClickLink(selectedSpot) {
    var spot = selectedSpot;
    const requireInfo = spot && spot.spot && spot.spot.reserve_info && spot.spot.reserve_info;

    switch (spot.spot.reserve_info.type) {
      case Const.ReserveType.Stand.code:
        Actions.spotDetail({ spotCode: spot.spot.code, requireInfo });
        break;

      case Const.ReserveType.MemberBenefit.code:
        const caution = [];
        if (spot && spot.precautions) {
          spot.precautions.split(/\r\n|\r|\n/).forEach(i => {
            if (Util.trim(i) !== '') {
              caution.push(i);
            }
          });
        }

        Actions.spotMemberBenefit({
          spotCode: spot.code,
          spotName: spot.name,
          benefits: caution,
        });
        break;

      case Const.ReserveType.Outside.code:
        this.refs.modalWebView.open(spot.spot.reserve_info.outside_url);
        break;

      default:
        Actions.spotDetail({ spotCode: spot.spot.code, requireInfo });
    }
  }

  onClickGoBack() {
    Actions.pop();
  }
  componentDidMount() {
    analytics().setCurrentScreen('Show-spot-reserve');
  }
  render() {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <BaseHeaderApp
          isClose
          title={RootStore.i18n.t('blog.go-reserve')}
          rightIconType={null}
          leftIconStyle={{ tintColor: COLOR.appColor }}
        />
        <MyWebView ref="modalWebView" />
        <PFlatList
          contentContainerStyle={{ padding: 16 * WIDTH_SCALE_RATIO }}
          extraData={this.state}
          data={this.props.spotLink}
          renderItem={this.renderItem()}
        />
      </View>
    );
  }

  renderItem() {
    return ({ item }) => {
      return (
        <SpotCard
          layout2
          heightLayout2={120 * HEIGHT_SCALE_RATIO}
          spotData={item.spot}
          click={this.onClickLink.bind(this, item)}
        />
      );
    };
  }
}

BlogSpotReserve.propTypes = {
  spotLink: PropTypes.array,
};
