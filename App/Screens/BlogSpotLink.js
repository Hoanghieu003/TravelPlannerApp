import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BaseHeaderApp from '../Components/BaseHeaderApp';
import PFlatList from '../Components/PFlatList';
import SpotCard from '../Components/SpotCard';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import { COLOR } from '../Constants/styles';
import RootStore from '../Stores/RootStore';

// 블로그에서 스팟 링크 보여주는 페이지
export default class BlogSpotLink extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickGoBack = this.onClickGoBack.bind(this);
  }

  onClickLink(spot) {
    Actions.spotDetail({ spotCode: spot.code });
  }

  onClickGoBack() {
    Actions.pop();
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <BaseHeaderApp
          isClose
          noShadow
          title={RootStore.i18n.t('blog.show-link')}
          rightIconType={null}
          leftIconStyle={{ tintColor: COLOR.appColor }}
        />
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

BlogSpotLink.propTypes = {
  spotLink: PropTypes.array,
};
