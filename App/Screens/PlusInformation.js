/* eslint-disable global-require */
import analytics from '@react-native-firebase/analytics';
import PropTypes from 'prop-types';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';

import React, { Fragment } from 'react';
import { FlatList, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, PLUSINFORMATION, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { ptShadow, COLOR } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { ICON } from '../../asset/image/ImagePath';

export default class PlusInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  componentDidMount() {
    analytics().setCurrentScreen('Korea-Travel-Tips');
  }

  renderItem({ item }) {
    return (
      <View
        style={[
          ptShadow.BLUR0,
          {
            marginVertical: 12 * HEIGHT_SCALE_RATIO,
            borderRadius: 4 * WIDTH_SCALE_RATIO,
            marginHorizontal: 14 * WIDTH_SCALE_RATIO,
          },
        ]}>
        <MyTouchableOpacity
          style={{
            // marginTop: WIDTH * 0.1,
            // width: WIDTH / 3.8,
            height: 48 * HEIGHT_SCALE_RATIO,
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 12 * WIDTH_SCALE_RATIO,
            alignItems: 'center',
          }}
          onPress={() => {
            if (item.blog === 0) {
              Actions.push('flightTime');
            } else {
              Actions.blogDetail({ blogCode: item.blog });
            }
          }}>
          <PText style={[style.textSubTitle, { marginLeft: 12 * WIDTH_SCALE_RATIO }]}>
            {RootStore.i18n.t(item.country)}
          </PText>
          <Image
            source={ICON.RIGHT_ARROW_ICON}
            style={{
              resizeMode: 'contain',
              width: 24 * WIDTH_SCALE_RATIO,
              height: 24 * HEIGHT_SCALE_RATIO,
            }}
            resizeMode="cover"
          />
        </MyTouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.isShowHeader ? (
          <BaseHeaderWithSearch
            showSuggest
            showBack
            backgroundColorWhite
            leftIconStyle={{ tintColor: COLOR.appColor }}
          />
        ) : (
          <Fragment />
        )}

        <FlatList
          style={{
            marginHorizontal: 14 * WIDTH_SCALE_RATIO,
            // paddingTop: 10 * HEIGHT_SCALE_RATIO,
            // marginTop: 10 * HEIGHT_SCALE_RATIO,
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `key ${index}`}
          data={PLUSINFORMATION}
          // numColumns={3}
          renderItem={this.renderItem}
          // columnWrapperStyle={{
          //   backgroundColor: 'white',
          //   justifyContent: 'space-evenly',
          // }}
          contentContainerStyle={style.paddingBottomTabbar}
        />
      </View>
    );
  }
}

PlusInformation.propTypes = {
  RootStore: PropTypes.object,
};
