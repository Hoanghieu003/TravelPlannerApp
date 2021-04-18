import PropTypes from 'prop-types';
import React from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import SwipableRating from 'react-native-swipeable-rating';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, ptShadow } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import MyImage from './MyImage';
import MyTouchableOpacity from './MyTouchableOpacity';
import { ICON, IMAGE } from '../../asset/image/ImagePath';
import { myAlert } from './MyAlert';

export default class ReviewInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClickRegistReview = this.onClickRegistReview.bind(this);
    this.handleRating = this.handleRating.bind(this);

    this.state = {
      isQuestion: false,
      rating: 5,
      content: '',
    };
  }

  onClickRegistReview() {
    if (this.state.content === '') {
      myAlert('', RootStore.i18n.t('global.type-empty'));
    } else {
      if (this.props.childReview) {
        this.props.registReview(this.state, this.props.childInfo.code, this.props.childInfo.index);
      } else {
        this.props.registReview(this.state);
      }
    }

    this.setState({
      isQuestion: false,
      content: '',
    });
  }

  handleRating = (rating) => {
    this.setState({ rating });
  };

  onChangeText = (text) => {
    this.setState({ content: text });
  };

  render() {
    if (this.props.layout2) {
      return (
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 16 * WIDTH_SCALE_RATIO,
          }}>
          <Image
            source={ICON.REPLY_ICON}
            resizeMode="contain"
            style={{
              marginRight: 12 * WIDTH_SCALE_RATIO,
              marginLeft: 16 * WIDTH_SCALE_RATIO,
              marginTop: 10 * HEIGHT_SCALE_RATIO,
              height: 16 * WIDTH_SCALE_RATIO,
              width: 15 * WIDTH_SCALE_RATIO,
            }}
          />
          <View style={{ width: '85%', flexDirection: 'row' }}>
            <MyImage
              style={{
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                opacity: RootStore.auth.picture ? 1 : 0.8,
                height: 40 * WIDTH_SCALE_RATIO,
                width: 40 * WIDTH_SCALE_RATIO,
                borderRadius: 36 * WIDTH_SCALE_RATIO,
              }}
              source={
                RootStore.auth.picture
                  ? { uri: RootStore.auth.picture }
                  : IMAGE.DEFAULT_PROFILE_IMAGE
              }
            />
            <View
              style={[
                ptShadow.BLUR0,
                {
                  marginLeft: 12 * WIDTH_SCALE_RATIO,
                  width: '83%',
                  borderRadius: 24 * WIDTH_SCALE_RATIO,
                  paddingRight: 8 * WIDTH_SCALE_RATIO,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                },
              ]}>
              <KeyboardAvoidingView style={{ flex: 1 }}>
                <TextInput
                  multiline
                  value={this.state.content}
                  autoFocus={this.props.autoFocus}
                  onChangeText={(text) => {
                    this.setState({ content: text });
                  }}
                  clearButtonMode="while-editing"
                  style={[
                    style.textInput,
                    {
                      maxHeight: 160 * HEIGHT_SCALE_RATIO,
                      width: '90%',
                      paddingVertical: 4 * HEIGHT_SCALE_RATIO,
                      paddingLeft: 20 * WIDTH_SCALE_RATIO,
                    },
                  ]}
                />
              </KeyboardAvoidingView>
              <MyTouchableOpacity onPress={this.onClickRegistReview}>
                <Image source={ICON.RIGHT_ARROW_ICON} style={styles.icon} resizeMode={'contain'} />
              </MyTouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={{ marginTop: 20 * HEIGHT_SCALE_RATIO }}>
        {this.props.isSpot && (
          <SwipableRating
            color={COLOR.appColor}
            style={{
              marginLeft: 52 * WIDTH_SCALE_RATIO,
              marginBottom: 2 * HEIGHT_SCALE_RATIO,
            }}
            emptyColor={COLOR.appTextPlaceholderColor}
            size={17 * WIDTH_SCALE_RATIO}
            rating={+this.state.rating}
            onPress={this.handleRating}
            swipeable={false}
          />
        )}
        <View style={{ flexDirection: 'row', marginTop: 5 * HEIGHT_SCALE_RATIO }}>
          <MyImage
            style={{
              opacity: RootStore.auth.picture ? 1 : 0.8,
              height: 40 * WIDTH_SCALE_RATIO,
              width: 40 * WIDTH_SCALE_RATIO,
              borderRadius: 36 * WIDTH_SCALE_RATIO,
            }}
            source={
              RootStore.auth.picture ? { uri: RootStore.auth.picture } : IMAGE.DEFAULT_PROFILE_IMAGE
            }
          />
          <View
            style={[
              ptShadow.BLUR0,
              {
                marginLeft: 12 * WIDTH_SCALE_RATIO,
                width: '83%',
                borderRadius: 24 * WIDTH_SCALE_RATIO,
                paddingRight: 8 * WIDTH_SCALE_RATIO,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
              },
            ]}>
            <TextInput
              multiline
              value={this.state.content}
              autoFocus={this.props.autoFocus}
              onChangeText={this.onChangeText}
              clearButtonMode="while-editing"
              style={[
                style.textInput,
                {
                  maxHeight: 160 * HEIGHT_SCALE_RATIO,
                  width: '90%',
                  paddingVertical: 4 * HEIGHT_SCALE_RATIO,
                  paddingLeft: 20 * WIDTH_SCALE_RATIO,
                },
              ]}
            />
            <MyTouchableOpacity onPress={this.onClickRegistReview}>
              <Image source={ICON.RIGHT_ARROW_ICON} style={styles.icon} resizeMode={'contain'} />
            </MyTouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

ReviewInput.propTypes = {
  childReview: PropTypes.bool,
  childInfo: PropTypes.object,
  registReview: PropTypes.func,
};

const styles = StyleSheet.create({
  icon: {
    width: 24 * WIDTH_SCALE_RATIO,
    height: 24 * HEIGHT_SCALE_RATIO,
    tintColor: COLOR.appColor,
  },
});
