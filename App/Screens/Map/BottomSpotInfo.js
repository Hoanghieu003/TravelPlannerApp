import React from 'react';
import { View } from 'react-native';
import MyTouchableOpacity from '../../Components/MyTouchableOpacity';
import { WIDTH_SCALE_RATIO, HEIGHT_SCALE_RATIO } from '../../Constant/constant';
import MyImage from '../../Components/MyImage';
import PText from '../../Components/PText';
import { Icon, Input } from 'native-base';
import style, { ptText, ptColor } from '../../Constants/styles';
import RootStore from '../../Stores/RootStore';
import HeartButton from '../../Components/HeartButton';
import Const from '../../../Common/Const';
import { IMAGE } from '../../../asset/image/ImagePath';

export default class BottomSpotInfo extends React.PureComponent {
  onClickLike = () => {
    const spot = this.props.item;
    this.props.onClickHeart(spot.code, spot.like);
  };

  render() {
    const spot = this.props.item;

    const priceTitle = spot?.translations[0]?.title_price
      ? JSON.parse(spot?.translations[0]?.title_price).normal
      : spot.normalPriceStr;

    const cancelPriceTitle = spot?.translations[0]?.title_price
      ? JSON.parse(spot?.translations[0]?.title_price).cancel
      : spot.cancelPriceStr;

    const cityTag =
      spot &&
      spot.tags &&
      spot.tags.filter((v) => v && v.type && v.type === Const.TagType.City.code);

    const regionTag = spot && spot.tags && spot.tags.filter((v) => v && v.type && v.type === 7);

    const region =
      regionTag && regionTag.length > 0 && regionTag[0].name
        ? regionTag[0].name
        : regionTag &&
          regionTag.length > 0 &&
          regionTag[0].translations &&
          regionTag[0].translations[0] &&
          regionTag[0].translations[0].name
        ? regionTag[0].translations[0].name
        : '';

    const city =
      cityTag && cityTag.length > 0 && cityTag[0].name
        ? cityTag[0].name
        : cityTag &&
          cityTag.length > 0 &&
          cityTag[0].translations &&
          cityTag[0].translations[0] &&
          cityTag[0].translations[0].name
        ? cityTag[0].translations[0].name
        : '';

    return (
      <View key={`spot ${spot.code}`}>
        <MyTouchableOpacity
          style={{
            width: 343 * WIDTH_SCALE_RATIO,
            marginBottom: 20,
            backgroundColor: '#fff',
            borderRadius: 3 * HEIGHT_SCALE_RATIO,
            height: 120 * HEIGHT_SCALE_RATIO,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}
          onPress={() => {
            this.props.onClickSpotCard(spot, '', '');
          }}>
          <MyImage
            resizeMode="cover"
            source={
              spot.images && spot.images.length > 0 && spot.images[0].url
                ? { uri: spot.images[0].url }
                : IMAGE.DEFAULT_PROFILE_IMAGE
            }
            style={{
              borderRadius: 3 * HEIGHT_SCALE_RATIO,
              width: 148 * WIDTH_SCALE_RATIO,
              height: '100%',
            }}
          />

          <View
            style={{
              marginLeft: 16 * WIDTH_SCALE_RATIO,
              width: (343 - 148) * WIDTH_SCALE_RATIO,
              paddingRight: 16 * WIDTH_SCALE_RATIO,
              paddingVertical: 16 * HEIGHT_SCALE_RATIO,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 8 * HEIGHT_SCALE_RATIO,
                paddingRight: 8 * WIDTH_SCALE_RATIO,
              }}>
              <PText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[style.textSubTitle, ptText.BODY2]}>
                {city} {region}
              </PText>
            </View>

            <PText
              style={[style.text, { paddingBottom: 5 * HEIGHT_SCALE_RATIO }]}
              numberOfLines={1}>
              {spot.translations && spot.translations.find((e) => e.language === RootStore.language)
                ? `${spot.translations.find((e) => e.language === RootStore.language).spot_name}`
                : spot.translations && spot.translations.length > 0
                ? `${spot.translations[0].spot_name}`
                : ``}
            </PText>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 5 * HEIGHT_SCALE_RATIO,
              }}>
              <PText
                numberOfLines={1}
                style={[
                  ptText.BODY2,
                  ptColor.PRIMARY,
                  {
                    maxWidth: spot.cancelPriceStr && spot.cancelPriceStr !== '' ? '50%' : null,
                  },
                ]}>
                {priceTitle}
              </PText>

              <PText
                style={[
                  ptText.SMALL1,
                  ptColor.GREY20,
                  {
                    maxWidth: '50%',
                    marginLeft: 5 * WIDTH_SCALE_RATIO,
                    textDecorationLine: 'line-through',
                  },
                ]}>
                {cancelPriceTitle}
              </PText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <PText style={[ptText.BODY2, ptColor.GREY20]}>
                {spot.view_count ? spot.view_count : 0}
              </PText>

              <Icon
                type="Feather"
                name="eye"
                style={[
                  ptText.BODY2,
                  ptColor.GREY20,
                  {
                    marginLeft: 8,
                    fontSize: ptText.BODY2.fontSize * 1.2,
                  },
                ]}
              />
            </View>
          </View>
        </MyTouchableOpacity>

        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0 * WIDTH_SCALE_RATIO,
            paddingRight: 8 * WIDTH_SCALE_RATIO,
            paddingTop: 8 * WIDTH_SCALE_RATIO,
            zIndex: 99999999,
            height: ptText.BODY2.lineHeight,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <HeartButton grey isLike={spot?.like} click={this.onClickLike} data={spot} isSpot />
        </View>
      </View>
    );
  }
}
