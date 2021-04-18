/* eslint-disable global-require */
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import { FLIGHTTIME, WIDTH } from '../Constant/constant';
import style, { COLOR } from '../Constants/styles';
import RootStore from '../Stores/RootStore';

export default class FlightTime extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  renderItem({ item }) {
    return (
      <View style={[style.shadow2, { margin: 10, borderRadius: 10 }]}>
        <MyTouchableOpacity
          style={{
            // marginTop: WIDTH * 0.1,
            width: WIDTH / 3.8,
            height: WIDTH / 3.8,
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            Actions.blogDetail({ blogCode: item.blog });
          }}>
          <Image
            source={item.flag_image}
            style={{
              alignSelf: 'center',
              width: 28,
              height: 20,
              borderColor: COLOR.appBorderColor,
              borderWidth: 0.5,
              borderRadius: 5,
              marginBottom: 4,
              //resizeMode: 'contain',
              // position: 'absolute',
            }}
            resizeMode="cover"
          />
          <PText style={style.textSubTitle}>{RootStore.i18n.t(item.country)}</PText>
        </MyTouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BaseHeaderWithSearch
          showSuggest
          showBack
          backgroundColorWhite
          leftIconStyle={{ tintColor: COLOR.appColor }}
        />
        <FlatList
          style={{ paddingHorizontal: 20, paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `key ${index}`}
          data={FLIGHTTIME}
          numColumns={3}
          renderItem={this.renderItem}
          columnWrapperStyle={{
            backgroundColor: 'white',
            justifyContent: 'space-evenly',
          }}
          contentContainerStyle={style.paddingBottomTabbar}
        />
      </View>
    );
  }
}

FlightTime.propTypes = {
  RootStore: PropTypes.object,
};
