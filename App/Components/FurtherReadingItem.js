import React from 'react';
import { Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import changeLike from '../../Common/gql/mutations/changeLike.gql';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, ptColor, ptShadow, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import HeartButton from './HeartButton';
import MyTouchableOpacity from './MyTouchableOpacity';
import PText from './PText';
import { IMAGE } from '../../asset/image/ImagePath';

export default class FurtherReadingItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickHeart = this.onClickHeart.bind(this);
    this.isLike = this.isLike.bind(this);
    const isLike = this.isLike();
    this.state = {
      isLike,
    };
  }

  isLike() {
    if (
      this.props.item &&
      this.props.item.like_members &&
      this.props.item.like_members.length > 0 &&
      RootStore.auth.id !== ''
    ) {
      return true;
    }
    return false;
  }

  async onClickHeart(change) {
    if (RootStore.auth.id === '') {
      return;
    }

    const variables = {
      nowState: this.state.isLike,
      where: 'spot',
      code: this.props.item.code,
    };
    const result = await RootStore.client.mutate({
      mutation: changeLike,
      variables,
    });

    if (result.data.changeLike) {
      this.setState({ isLike: !this.state.isLike });
    }
  }

  onClickSuggestCard(code) {
    Actions.spotDetail({ spotCode: code });
  }

  render() {
    let cityTags = null;
    let regionTag = null;
    let region = '';
    let city = '';
    let titlePrice = '';
    if (!this.props.isSpot) {
      cityTags = this.props.item.tags.filter((v) => v && v.type && v.type === 1);
      regionTag = this.props.item.tags.filter((v) => v && v.type && v.type === 7);
      region = regionTag && regionTag.length > 0 && regionTag[0] ? regionTag[0].name : '';
      city =
        cityTags && cityTags.length > 0 && cityTags[0].name
          ? cityTags[0].name
          : cityTags &&
            cityTags.length > 0 &&
            cityTags[0].translations &&
            cityTags[0].translations[0] &&
            cityTags[0].translations[0].name
          ? cityTags[0].translations[0].name
          : '';
    } else {
      titlePrice = JSON.parse(this.props.item.translations[0].title_price);
    }
    return this.props.isSpot ? (
      this.props.item ? (
        <View
          style={{
            width: 165 * WIDTH_SCALE_RATIO,
            borderRadius: 3 * WIDTH_SCALE_RATIO,
            marginRight:
              this.props.index === this.props.suggestSpot.length - 1 ? 0 : 8 * WIDTH_SCALE_RATIO,
            marginBottom: 4 * HEIGHT_SCALE_RATIO,
            paddingHorizontal: 2 * WIDTH_SCALE_RATIO,
          }}>
          <MyTouchableOpacity
            onPress={this.onClickSuggestCard.bind(this, this.props.item.code)}
            style={[ptShadow.BLUR0, { borderRadius: 3 * WIDTH_SCALE_RATIO }]}>
            <Image
              source={
                this.props.item && this.props.item.images && this.props.item.images.length > 0
                  ? { uri: this.props.item.images[0].url }
                  : IMAGE.UNAVAILABLE_IMG
              }
              style={{
                borderTopLeftRadius: 3 * WIDTH_SCALE_RATIO,
                borderTopRightRadius: 3 * WIDTH_SCALE_RATIO,
                width: '100%',
                height: 90 * HEIGHT_SCALE_RATIO,
              }}
            />

            <View
              style={{
                paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
                paddingVertical: 8 * HEIGHT_SCALE_RATIO,
                borderBottomLeftRadius: 3 * WIDTH_SCALE_RATIO,
                borderBottomRightRadius: 3 * WIDTH_SCALE_RATIO,
                backgroundColor: 'white',
              }}>
              <PText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  style.textCaption,
                  { fontSize: ptText.BODY2.fontSize - 1, color: 'black' },
                ]}>
                {this.props.item.translations[0].spot_name}
              </PText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <PText
                  numberOfLines={1}
                  style={[
                    style.textCaption,
                    ptColor.GREY40,
                    {
                      fontSize: ptText.BODY2.fontSize - 1,
                      maxWidth: titlePrice.cancel ? '50%' : null,
                    },
                  ]}>
                  {titlePrice.normal}
                </PText>
                <PText
                  style={[
                    style.textCaption,
                    ptColor.GREY20,
                    {
                      maxWidth: '50%',
                      fontSize: ptText.BODY2.fontSize - 1,
                      marginLeft: 8 * WIDTH_SCALE_RATIO,
                      textDecorationLine: 'line-through',
                    },
                  ]}>
                  {titlePrice.cancel}
                </PText>
              </View>
            </View>
          </MyTouchableOpacity>
          <View
            style={{
              position: 'absolute',
              top: 5 * WIDTH_SCALE_RATIO,
              right: 7 * WIDTH_SCALE_RATIO,
            }}>
            <HeartButton
              size={22 * WIDTH_SCALE_RATIO}
              isLike={this.state.isLike}
              click={this.onClickHeart.bind(this)}
              data={this.props.item}
              isSpot
            />
          </View>
        </View>
      ) : (
        <View />
      )
    ) : this.props.item ? (
      <View
        style={{
          width: 165 * WIDTH_SCALE_RATIO,
          borderRadius: 3 * WIDTH_SCALE_RATIO,
          marginRight:
            this.props.index === this.props.suggestSpot.length - 1 ? 0 : 8 * WIDTH_SCALE_RATIO,
          marginBottom: 4 * HEIGHT_SCALE_RATIO,
          paddingHorizontal: 2 * WIDTH_SCALE_RATIO,
        }}>
        <MyTouchableOpacity
          onPress={this.onClickSuggestCard.bind(this, this.props.item.code)}
          style={[ptShadow.BLUR0, { borderRadius: 3 * WIDTH_SCALE_RATIO }]}>
          <Image
            source={
              this.props.item && this.props.item.images && this.props.item.images.length > 0
                ? { uri: this.props.item.images[0].url }
                : IMAGE.UNAVAILABLE_IMG
            }
            style={{
              borderTopLeftRadius: 3 * WIDTH_SCALE_RATIO,
              borderTopRightRadius: 3 * WIDTH_SCALE_RATIO,
              width: '100%',
              height: 90 * HEIGHT_SCALE_RATIO,
            }}
          />

          <View
            style={{
              paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
              paddingVertical: 8 * HEIGHT_SCALE_RATIO,
              borderBottomLeftRadius: 3 * WIDTH_SCALE_RATIO,
              borderBottomRightRadius: 3 * WIDTH_SCALE_RATIO,
              //backgroundColor: 'blue',
              backgroundColor: 'white',
            }}>
            <PText
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[
                style.textCaption,
                { fontSize: ptText.BODY2.fontSize - 2, color: COLOR.GREY40 },
              ]}>
              {city} {region}
            </PText>
            <PText
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                style.textCaption,
                //ptColor.GREY40,
                {
                  color: 'black',
                  fontSize: ptText.BODY2.fontSize - 1,
                },
              ]}>
              {this.props.item.translations[0].spot_name}
            </PText>
          </View>
        </MyTouchableOpacity>
        <View
          style={{
            position: 'absolute',
            top: 5 * WIDTH_SCALE_RATIO,
            right: 7 * WIDTH_SCALE_RATIO,
          }}>
          <HeartButton
            grey
            size={22 * WIDTH_SCALE_RATIO}
            isLike={this.state.isLike}
            click={this.onClickHeart.bind(this)}
            data={this.props.item}
            isSpot
          />
        </View>
      </View>
    ) : (
      <View />
    );
  }
}
