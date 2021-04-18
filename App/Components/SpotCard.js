import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import Const from '../../Common/Const';
import changeLike from '../../Common/gql/mutations/changeLike.gql';
import Util from '../../Common/Util';
import { HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, {
  COLOR,
  heightCarouselSpotAccomodation,
  ptColor,
  ptShadow,
  ptText,
} from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import Divider from './Divider';
import HeartButton from './HeartButton';
import MyImage from './MyImage';
import MyTouchableOpacity from './MyTouchableOpacity';
import PText from './PText';
// import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

Number.prototype.format = function () {
  return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
export default class SpotCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClickHeart = this.onClickHeart.bind(this);
    this.isLike = this.isLike.bind(this);
    // this.getImage = this.getImage.bind(this);

    const trans =
      this.props.spotData &&
      this.props.spotData.translations &&
      this.props.spotData.translations.find((v) => v.language === RootStore.language);
    const defaultTrans =
      this.props.spotData &&
      this.props.spotData.translations &&
      this.props.spotData.translations.find((v) => v.is_default);

    const spotName =
      trans && trans.spot_name
        ? trans.spot_name
        : defaultTrans && defaultTrans.spot_name
        ? defaultTrans.spot_name
        : '';
    const view_count =
      this.props.spotData && this.props.spotData.view_count > 0
        ? this.props.spotData.view_count
        : 0;

    // this.getImage();

    const useDefault = !(
      this.props.spotData &&
      this.props.spotData.images &&
      this.props.spotData.images.length
    );
    const normalSpot =
      this.props.spotData &&
      this.props.spotData.reserve_info &&
      this.props.spotData.reserve_info === null;

    let rating = 5.0;
    if (this.props.spotData && this.props.spotData.rating_review_count > 0) {
      rating = Util.floorRating(
        this.props.spotData.review_total_score / this.props.spotData.rating_review_count,
      );
    } else {
      rating = Const.Default.Spot_Rating;
    }

    const isLike = this.isLike();

    const cityTag =
      this.props.spotData &&
      this.props.spotData.tags &&
      this.props.spotData.tags.filter((v) => v && v.type && v.type === Const.TagType.City.code);
    const regionTag =
      this.props.spotData &&
      this.props.spotData.tags &&
      this.props.spotData.tags.filter((v) => v && v.type && v.type === 7);
    const region =
      regionTag && regionTag.length > 0 && regionTag[0].name
        ? regionTag[0].name
        : regionTag &&
          regionTag.length > 0 &&
          regionTag[0].translations.filter((v) => v.language === RootStore.language).length > 0
        ? regionTag[0].translations.filter((v) => v.language === RootStore.language)[0].name
        : '';
    //   &&
    //   regionTag[0].translations[0] &&
    //   regionTag[0].translations[0].name
    // ? regionTag[0].translations.filter(v => v.language === RootStore.language).name
    // : '';

    const interestTag =
      this.props.spotData &&
      this.props.spotData.tags &&
      this.props.spotData.tags.filter((v) => v && v.type && v.type === Const.TagType.Category.code);

    // phat chua chinh xac
    // const city = cityTag.length > 0 ? cityTag[0].name : '';

    const city =
      cityTag && cityTag.length > 0 && cityTag[0].name
        ? cityTag[0].name
        : cityTag &&
          cityTag.length > 0 &&
          cityTag[0].translations.filter((v) => v.language === RootStore.language).length > 0
        ? cityTag[0].translations.filter((v) => v.language === RootStore.language)[0].name
        : '';

    // const interest = interestTag.length > 0 ? interestTag[0].name : '';
    const interest =
      interestTag && interestTag.length > 0 && interestTag[0].name
        ? interestTag[0].name
        : interestTag &&
          interestTag.length > 0 &&
          interestTag[0].translations &&
          interestTag[0].translations[0] &&
          interestTag[0].translations[0].name
        ? interestTag[0].translations[0].name
        : '';

    let titlePriceJson = false;
    if (trans && typeof trans.title_price !== 'undefined' && trans && trans.length !== 0) {
      titlePriceJson = JSON.parse(trans.title_price);
    }
    // const price = titlePriceJson && titlePriceJson.normal ? titlePriceJson.normal : '';
    // const discountPrice = titlePriceJson && titlePriceJson.cancel ? titlePriceJson.cancel : '';
    let price = null;
    let discountPrice = null;
    if (Number(titlePriceJson.normal)) {
      price = '￦' + Number(titlePriceJson.normal).format();
    } else {
      price = titlePriceJson.normal;
    }
    if (Number(titlePriceJson.cancel)) {
      discountPrice = '￦' + Number(titlePriceJson.cancel).format();
    } else {
      discountPrice = titlePriceJson.cancel;
    }

    this.state = {
      spotName,
      rating,
      city,
      region,
      interest,
      isLike,
      useDefault,
      view_count,
      price,
      discountPrice,
      normalSpot,
      image:
        this.props.spotData &&
        this.props.spotData.images &&
        this.props.spotData.images.length > 0 &&
        this.props.spotData.images[0].url
          ? this.props.spotData.images[0].url + '?d=450'
          : this.props.spotData &&
            this.props.spotData.images &&
            this.props.spotData.images.length > 0 &&
            this.props.spotData.images[0].origin_path
          ? `${RootStore.config.imgHost_500}/${this.props.spotData.images[0].origin_path}`
          : '',
    };
  }

  onUpdateImage = (arraySize) => {
    // const foundMaximumQualityIndex = arraySize.findIndex(e => e && e === Math.max(...arraySize)); //get maximum
    const foundMaximumQualityIndex = arraySize.findIndex((e) => e && e === 200); //only get 200px image

    let image = '';
    if (foundMaximumQualityIndex >= 0) {
      image = this.props.spotData.images[foundMaximumQualityIndex].url
        ? this.props.spotData.images[foundMaximumQualityIndex].url
        : this.props.spotData.images[foundMaximumQualityIndex].origin_path
        ? `${RootStore.config.imgHost_500}/${this.props.spotData.images[foundMaximumQualityIndex].origin_path}`
        : '';
    } else if (this.props.spotData.images && this.props.spotData.images[0]) {
      //lay thang item dau tien
      image = this.props.spotData.images[0].url
        ? this.props.spotData.images[0].url
        : this.props.spotData.images[0].origin_path
        ? `${RootStore.config.imgHost_500}/${this.props.spotData.images[0].origin_path}`
        : '';
    }
    this.setState({
      image,
    });
  };

  async getImage() {
    const arraySize = [];
    this.props.spotData.images.forEach((e, i) => {
      if (e.url) {
        Image.getSize(
          e.url,
          (width, height) => {
            arraySize.push(width);
            if (i === arraySize.length - 1) {
              this.onUpdateImage(arraySize);
            }
          },
          (error) => {
            arraySize.push(null);
            if (i === arraySize.length - 1) {
              this.onUpdateImage(arraySize);
            }
          },
        );
      } else {
        Image.getSize(
          `${RootStore.config.imgHost_500}/${e.origin_path}`,
          (width, height) => {
            arraySize.push(width);
            if (i === arraySize.length - 1) {
              this.onUpdateImage(arraySize);
            }
          },
          (error) => {
            arraySize.push(null);
            if (i === arraySize.length - 1) {
              this.onUpdateImage(arraySize);
            }
          },
        );
      }
    });
  }

  isLike() {
    if (this.props.spotData && this.props.spotData.like && RootStore.auth.id !== '') {
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
      code: this.props.spotData.code,
    };
    const result = await RootStore.client.mutate({
      mutation: changeLike,
      variables,
    });

    if (this.props.onCLickHeartProps) {
      this.props.onCLickHeartProps(this.props.spotData.code, this.state.isLike);
    }

    if (result.data.changeLike) {
      this.setState({ isLike: !this.state.isLike });
    }
  }

  render() {
    if (this.props.layout2) {
      return (
        <View style={{}}>
          <MyTouchableOpacity
            key={`touchSpotCard-${this.props.spotData.code}`}
            onPress={this.props.click.bind(
              this,
              this.props.spotData.code,
              this.state.city,
              this.state.region,
            )}
            style={[
              this.state.normalSpot !== null || this.props.slider ? ptShadow.BLUR0 : null,
              {
                borderRadius: 4 * HEIGHT_SCALE_RATIO,
                width: 343 * WIDTH_SCALE_RATIO,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'blue',
                height: this.props.heightLayout2
                  ? this.props.heightLayout2
                  : 120 * HEIGHT_SCALE_RATIO,
              }}>
              <MyImage
                source={{ uri: this.state.image }}
                key={this.state.image}
                style={{
                  flex: 1,
                  // borderRadius: 4 * HEIGHT_SCALE_RATIO,
                  borderTopLeftRadius: 4 * HEIGHT_SCALE_RATIO,
                  borderBottomLeftRadius: 4 * HEIGHT_SCALE_RATIO,
                  width: 148 * WIDTH_SCALE_RATIO,
                  height: this.props.heightLayout2
                    ? this.props.heightLayout2
                    : 120 * HEIGHT_SCALE_RATIO,
                }}
              />
              {/* <View
              style={{
                width: 20 * WIDTH_SCALE_RATIO,
                left: -10 * WIDTH_SCALE_RATIO,
                height: this.props.heightLayout2
                  ? this.props.heightLayout2
                  : 120 * HEIGHT_SCALE_RATIO,
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: 20 * WIDTH_SCALE_RATIO,
                  height: 10 * WIDTH_SCALE_RATIO,
                  overflow: 'hidden',
                  borderBottomLeftRadius: 25 * WIDTH_SCALE_RATIO,
                  borderBottomRightRadius: 25 * WIDTH_SCALE_RATIO,
                  backgroundColor: '#fafafa',
                }}
              />
              <View
                style={{
                  width: 20 * WIDTH_SCALE_RATIO,
                  height: 10 * WIDTH_SCALE_RATIO,
                  overflow: 'hidden',
                  borderTopLeftRadius: 25 * WIDTH_SCALE_RATIO,
                  borderTopRightRadius: 25 * WIDTH_SCALE_RATIO,
                  backgroundColor: '#fafafa',
                }}
              />
            </View> */}
              <View
                style={{
                  marginLeft: 8 * WIDTH_SCALE_RATIO,
                  width: (343 - 148 - 16) * WIDTH_SCALE_RATIO,
                  paddingRight: 16 * WIDTH_SCALE_RATIO,
                  paddingVertical: 10 * HEIGHT_SCALE_RATIO,
                  overflow: 'hidden',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: 2 * HEIGHT_SCALE_RATIO,
                  }}>
                  {this.state.city !== '' && (
                    <PText style={[style.textSubTitle, ptText.BODY2]} numberOfLines={1}>
                      {this.state.city} {this.state.region ? this.state.region : ''}
                    </PText>
                  )}

                  {/* {this.state.city !== '' && this.state.interest !== '' && (
                    <PText style={[style.textSubTitle, ptText.BODY2]}> &middot; </PText>
                  )}
                  {this.state.interest !== '' && (
                    <PText style={[style.textSubTitle, ptText.BODY2]}>{this.state.interest}</PText>
                  )} */}
                  {/* nếu null hiện khảong trắng */}
                  <PText style={[style.textSubTitle, ptText.BODY2]}>{'  '}</PText>
                </View>
                <View>
                  <PText style={[style.text, {}]} numberOfLines={2}>
                    {this.state.spotName}
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
                        { maxWidth: this.state.discountPrice ? '50%' : null },
                      ]}>
                      {this.state.price}
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
                      {this.state.discountPrice}
                    </PText>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <PText style={[ptText.BODY2, ptColor.GREY20]}>{this.state.view_count}</PText>
                  <Icon
                    type="Feather"
                    name="eye"
                    style={[
                      ptText.BODY2,
                      ptColor.GREY20,
                      {
                        marginLeft: 8 * WIDTH_SCALE_RATIO,
                        fontSize: ptText.BODY2.fontSize * 1.2,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          </MyTouchableOpacity>
          {!this.props.slider ? (
            <Divider
              style={{
                marginTop: 16 * HEIGHT_SCALE_RATIO,
                marginBottom: 16 * HEIGHT_SCALE_RATIO,
              }}
            />
          ) : (
            <View style={{ height: 20 * HEIGHT_SCALE_RATIO }} />
          )}

          <HeartButton
            grey
            isSpot
            data={this.props.spotData}
            isLike={this.state.isLike}
            click={this.onClickHeart.bind(this)}
            style={{
              position: 'absolute',
              elevation: 999,
              top: 0,
              right: 0,
              backgroundColor: '#fff',
              borderRadius: 4 * HEIGHT_SCALE_RATIO,
              margin: 8 * WIDTH_SCALE_RATIO,
              zIndex: 999,
            }}
          />
        </View>
      );
    } else if (this.props.layoutAccomodation) {
      return (
        <View
          style={[
            ptShadow.BLUR0,
            {
              marginBottom: 8 * HEIGHT_SCALE_RATIO,
              borderRadius: 4 * HEIGHT_SCALE_RATIO,
              //borderBottomLeftRadius: 4 * HEIGHT_SCALE_RATIO,
              // backgroundColor: 'red',
            },
          ]}>
          <MyTouchableOpacity
            style={{
              // backgroundColor: 'red',
              borderRadius: 4 * HEIGHT_SCALE_RATIO,
              height: this.props.heightLayout2
                ? this.props.heightLayout2
                : heightCarouselSpotAccomodation,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={this.props.click.bind(
              this,
              this.props.spotData.code,
              this.state.city,
              this.state.region,
            )}>
            <MyImage
              source={{ uri: this.state.image }}
              key={this.state.image}
              style={{
                // borderRadius: 4 * HEIGHT_SCALE_RATIO,
                borderBottomLeftRadius: 4 * HEIGHT_SCALE_RATIO,
                borderTopLeftRadius: 4 * HEIGHT_SCALE_RATIO,
                width: (343 * WIDTH_SCALE_RATIO) / 2,
                height: '100%',
                backgroundColor: COLOR.appTextPlaceholderColor,
              }}
            />

            {/* <View
              style={{
                width: 20 * WIDTH_SCALE_RATIO,
                height: 10 * WIDTH_SCALE_RATIO,
                overflow: 'hidden',
                borderBottomLeftRadius: 25 * WIDTH_SCALE_RATIO,
                borderBottomRightRadius: 25 * WIDTH_SCALE_RATIO,
                backgroundColor: '#fafafa',
              }}
            /> */}
            {/* <View
              style={{
                width: 20 * WIDTH_SCALE_RATIO,
                height: 10 * WIDTH_SCALE_RATIO,
                overflow: 'hidden',
                borderTopLeftRadius: 25 * WIDTH_SCALE_RATIO,
                borderTopRightRadius: 25 * WIDTH_SCALE_RATIO,
                backgroundColor: '#fafafa',
              }}
            /> */}

            <View
              style={{
                // backgroundColor: 'green',
                height: '100%',
                marginLeft: 12 * WIDTH_SCALE_RATIO,
                width:
                  WIDTH -
                  (343 * WIDTH_SCALE_RATIO) / 2 -
                  20 * WIDTH_SCALE_RATIO * 2 -
                  4 * WIDTH_SCALE_RATIO,
              }}>
              <View
                style={{
                  // backgroundColor: 'green',
                  flexDirection: 'row',
                  alignItems: 'center',
                  top: 16 * HEIGHT_SCALE_RATIO,
                  marginBottom: 24 * HEIGHT_SCALE_RATIO,
                }}>
                {this.state.city !== '' && (
                  <PText numberOfLines={1} uppercase style={[style.textSubTitle, ptText.BODY2]}>
                    {this.state.city}
                  </PText>
                )}
                {this.state.city !== '' && this.state.interest !== '' && (
                  <PText numberOfLines={1} style={[style.textSubTitle, ptText.BODY2]}>
                    {' '}
                    &middot;{' '}
                  </PText>
                )}
                {this.state.interest !== '' && (
                  <PText numberOfLines={1} style={[style.textSubTitle, ptText.BODY2]}>
                    {this.state.interest}
                  </PText>
                )}
                <PText style={[style.textSubTitle, ptText.BODY2]}>{'  '}</PText>
              </View>
              <View style={{ marginTop: 24 * HEIGHT_SCALE_RATIO }}>
                <PText style={[style.text, {}]} numberOfLines={2}>
                  {this.state.spotName}
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
                      ptColor.GREY80,
                      { maxWidth: this.state.discountPrice ? '50%' : null },
                    ]}>
                    {this.state.price}
                  </PText>
                  <PText
                    numberOfLines={1}
                    style={[
                      ptText.SMALL1,
                      ptColor.GREY20,
                      {
                        width: '50%',
                        marginLeft: 5 * WIDTH_SCALE_RATIO,
                        textDecorationLine: 'line-through',
                      },
                    ]}>
                    {this.state.discountPrice ? this.state.discountPrice : ''}
                  </PText>
                </View>
              </View>
              <View />

              <View
                style={{
                  //marginTop: 5 * HEIGHT_SCALE_RATIO,
                  position: 'absolute',
                  bottom: 12 * HEIGHT_SCALE_RATIO,
                  // backgroundColor: 'black',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <PText style={[ptText.BODY2, ptColor.GREY20]}>{this.state.view_count}</PText>
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
              <PText style={[ptText.SMALL1, ptColor.GREY80, { textAlign: 'right', bottom: 0 }]} />
            </View>
          </MyTouchableOpacity>

          <HeartButton
            grey
            isLike={this.state.isLike}
            click={this.onClickHeart.bind(this)}
            style={{
              position: 'absolute',
              elevation: 999,
              top: 0,
              right: 0,
              margin: 8 * WIDTH_SCALE_RATIO,
              zIndex: 99999999,
            }}
            data={this.props.spotData}
            isSpot
          />
        </View>
      );
    } else if (this.props.proxyShopping) {
      return (
        <View
          style={{
            marginBottom: 8 * HEIGHT_SCALE_RATIO,
            borderRadius: 8 * HEIGHT_SCALE_RATIO,
            //borderBottomLeftRadius: 4 * HEIGHT_SCALE_RATIO,
          }}>
          <MyTouchableOpacity
            style={{
              borderRadius: 8 * HEIGHT_SCALE_RATIO,
              height: 260 * HEIGHT_SCALE_RATIO,
              width: (!this.props.normalProduct ? 148 : 165) * WIDTH_SCALE_RATIO,
            }}
            onPress={this.props.click.bind(
              this,
              this.props.spotData.code,
              this.state.city,
              this.state.region,
            )}>
            <MyImage
              source={{ uri: this.state.image }}
              key={this.state.image}
              style={{
                borderRadius: 8 * HEIGHT_SCALE_RATIO,
                height: 152 * HEIGHT_SCALE_RATIO,
                width: (!this.props.normalProduct ? 156 : 165) * WIDTH_SCALE_RATIO,
                backgroundColor: COLOR.appTextPlaceholderColor,
              }}
            />

            <View
              style={
                {
                  // backgroundColor: 'green',
                  // height: '100%',
                  // marginLeft: 12 * WIDTH_SCALE_RATIO,
                  // width: 165 * WIDTH_SCALE_RATIO,
                }
              }>
              <View
                style={{
                  // backgroundColor: 'green',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: (!this.props.normalProduct ? 156 : 165) * WIDTH_SCALE_RATIO,
                  // top: 8 * HEIGHT_SCALE_RATIO,
                  marginBottom: 2 * HEIGHT_SCALE_RATIO,
                }}>
                <View style={{}}>
                  <PText
                    numberOfLines={1}
                    uppercase
                    style={[
                      { maxWidth: 105 * WIDTH_SCALE_RATIO },
                      style.textSubTitle,
                      ptText.BODY2,
                    ]}>
                    {this.state.region ? this.state.region : ' '}
                  </PText>
                </View>
                {/* //eyes nè nha */}
                <View
                  style={{
                    //marginTop: 5 * HEIGHT_SCALE_RATIO,
                    // position: 'absolute',
                    // width: 165 * WIDTH_SCALE_RATIO,
                    // bottom: 12 * HEIGHT_SCALE_RATIO,
                    // backgroundColor: 'black',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <PText style={[ptText.BODY2, ptColor.GREY20]}>{this.state.view_count}</PText>
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
              <PText
                style={[
                  style.text,
                  {
                    width: this.props.normalProduct
                      ? 165 * WIDTH_SCALE_RATIO
                      : 156 * WIDTH_SCALE_RATIO,
                  },
                ]}
                numberOfLines={2}>
                {this.state.spotName}
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
                    // { maxWidth: this.state.discountPrice ? '50%' : null },
                  ]}>
                  {this.state.price}
                </PText>
                <PText
                  numberOfLines={1}
                  style={[
                    ptText.SMALL1,
                    ptColor.GREY20,
                    {
                      // width: '50%',
                      marginLeft: 5 * WIDTH_SCALE_RATIO,
                      textDecorationLine: 'line-through',
                    },
                  ]}>
                  {this.state.discountPrice ? this.state.discountPrice : ''}
                </PText>
              </View>

              <PText style={[ptText.SMALL1, ptColor.GREY80, { textAlign: 'right', bottom: 0 }]} />
            </View>
          </MyTouchableOpacity>

          <HeartButton
            grey
            isLike={this.state.isLike}
            click={this.onClickHeart.bind(this)}
            style={{
              position: 'absolute',
              elevation: 999,
              top: 0,
              right: this.props.normalProduct ? 2 * WIDTH_SCALE_RATIO : -6 * WIDTH_SCALE_RATIO,
              margin: 4 * WIDTH_SCALE_RATIO,
              zIndex: 99999999,
            }}
            data={this.props.spotData}
            isSpot
          />
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          // height: 140 * HEIGHT_SCALE_RATIO,
          marginBottom: 12 * HEIGHT_SCALE_RATIO,
        }}>
        <MyTouchableOpacity
          style={[ptShadow.BLUR0, { zIndex: -1, borderRadius: 4 * HEIGHT_SCALE_RATIO }]}
          onPress={this.props.click.bind(
            this,
            this.props.spotData.code,
            this.state.city,
            this.state.region,
          )}>
          <MyImage
            source={{ uri: this.state.image }}
            key={this.state.image}
            style={{
              borderTopLeftRadius: 4 * WIDTH_SCALE_RATIO,
              borderTopRightRadius: 4 * WIDTH_SCALE_RATIO,
              width: '100%',
              height: 90 * HEIGHT_SCALE_RATIO,
            }}
          />

          {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
          {this.state.city !== '' && (
            <PText
              style={{
                fontSize: RootStore.fontSize(2.2),
                fontWeight: '400',
                color: '#00afa0',
              }}
            >
              {this.state.city}
            </PText>
          )}
          {this.state.city !== '' && this.state.interest !== '' && (
            <PText
              style={{ fontSize: RootStore.fontSize(2.2), fontWeight: '400' }}
            >
              {' '}
              &middot;{' '}
            </PText>
          )}
          {this.state.interest !== '' && (
            <PText
              style={{
                fontSize: RootStore.fontSize(2.2),
                fontWeight: '400',
                color: '#00afa0',
              }}
            >
              {this.state.interest}
            </PText>
          )}
        </View> */}
          <View
            style={{
              justifyContent: 'space-between',
              height: 70 * HEIGHT_SCALE_RATIO,
              paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
              paddingTop: 2 * HEIGHT_SCALE_RATIO,
              paddingBottom: 3 * HEIGHT_SCALE_RATIO,
            }}>
            <PText style={[ptColor.GREY40, ptText.BODY2]}>
              {this.state.city ? this.state.city + ' ' : null}
              {this.state.region ? this.state.region : null}
            </PText>

            <PText
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[style.textCaption, ptColor.GREY80, { fontSize: ptText.BODY2.fontSize - 1 }]}>
              {this.state.spotName}
            </PText>
            <PText
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                style.textCaption,
                ptColor.GREY80,
                {
                  marginTop: -3,
                  fontSize: ptText.BODY2.fontSize - 1,
                  // maxWidth: this.state.discountPrice ? '50%' : null,
                },
              ]}>
              {/* {this.state.price} */}
              {this.props.totalPayment
                ? '￦ ' + this.props.totalPayment.format()
                : this.state.price}
              {'  '}
              <PText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  style.textCaption,
                  ptColor.GREY40,
                  {
                    // width: '50%',
                    textDecorationLine: 'line-through',
                  },
                ]}>
                {this.props.totalPayment ? '' : this.state.discountPrice}
              </PText>
            </PText>
          </View>
        </MyTouchableOpacity>
        {this.props.hideLike ? null : (
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: 4 * WIDTH_SCALE_RATIO,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              elevation: 999,
              zIndex: 999,
            }}>
            <HeartButton
              isLike={this.state.isLike}
              click={this.onClickHeart.bind(this)}
              data={this.props.spotData}
              isSpot
            />
          </View>
        )}

        {this.props.style ? (
          <View
            style={[
              this.props.style,
              {
                position: 'absolute',
                zIndex: 999,
                flex: 1,
                borderRadius: 4 * WIDTH_SCALE_RATIO,
                elevation: 999,
                width: '100%',
                height: '99%',
              },
            ]}
          />
        ) : null}
      </View>
    );
  }
}

SpotCard.propTypes = {
  spotData: PropTypes.object,
  click: PropTypes.func,
};
