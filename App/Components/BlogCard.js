import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Const from '../../Common/Const';
import changeLike from '../../Common/gql/mutations/changeLike.gql';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { ptColor, ptShadow, ptText } from '../Constants/styles';
import TimeAgo from '../Screens/TimeAgo';
import RootStore from '../Stores/RootStore';
import HeartButton from './HeartButton';
import MyImage from './MyImage';
import MyTouchableOpacity from './MyTouchableOpacity';
import PText from './PText';
import { IMAGE } from '../../asset/image/ImagePath';

export default class BlogCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickHeart = this.onClickHeart.bind(this);
    this.isLike = this.isLike.bind(this);

    const trans =
      this.props.blogData &&
      this.props.blogData.translations &&
      this.props.blogData.translations.find((v) => v.language === RootStore.language);
    const defaultTrans =
      this.props.blogData &&
      this.props.blogData.translations &&
      this.props.blogData.translations.find((v) => v.is_default);

    const blogName =
      trans && trans.title
        ? trans.title
        : defaultTrans && defaultTrans.title
        ? defaultTrans.title
        : '';

    // const useDefault = !(
    //   this.props.blogData &&
    //   this.props.blogData.images &&
    //   this.props.blogData.images.length > 0
    // );

    const writer =
      this.props.blogData && this.props.blogData.writer && this.props.blogData.writer.nickname
        ? this.props.blogData.writer.nickname
        : this.props.blogData &&
          this.props.blogData.writer &&
          this.props.blogData.writer.name &&
          this.props.blogData.writer.name !== ''
        ? this.props.blogData.writer.name
        : '무명작가';

    const cityTag =
      this.props.blogData && this.props.blogData.tags
        ? this.props.blogData.tags.filter((v) => v && v.type && v.type === Const.TagType.City.code)
        : this.props.blogData.blog_tags &&
          this.props.blogData.blog_tags.filter(
            (v) => v && v.type && v.type === Const.TagType.City.code,
          );
    const regionTag =
      this.props.blogData && this.props.blogData.tags
        ? this.props.blogData.tags.filter((v) => v && v.type && v.type === 7)
        : this.props.blogData.blog_tags &&
          this.props.blogData.blog_tags.filter((v) => v && v.type && v.type === 7);
    const interestTag =
      this.props.blogData &&
      this.props.blogData.tags &&
      this.props.blogData.tags.filter((v) => v && v.type && v.type === Const.TagType.Interest.code);

    const city = this.props.city
      ? this.props.city
      : cityTag &&
        cityTag.length > 0 &&
        cityTag[0] &&
        cityTag[0].translations &&
        cityTag[0].translations[0] &&
        cityTag[0].translations[0].name
      ? cityTag[0].translations[0].name
      : cityTag && cityTag[0] && cityTag[0].name
      ? cityTag[0].name
      : '';
    const region = this.props.region
      ? this.props.region
      : regionTag &&
        regionTag.length > 0 &&
        regionTag[0] &&
        regionTag[0].translations &&
        regionTag[0].translations[0] &&
        regionTag[0].translations[0].name
      ? regionTag[0].translations[0].name
      : regionTag && regionTag[0] && regionTag[0].name
      ? regionTag[0].name
      : '';

    const interest =
      interestTag && interestTag.length > 0 && interestTag[0] && interestTag[0].name
        ? interestTag[0].name
        : '';

    const view_count =
      this.props.blogData && this.props.blogData.view_count ? this.props.blogData.view_count : 0;

    const isLike = this.isLike();

    this.state = {
      blogName,
      writer,
      // useDefault,
      view_count,
      isLike,
      city,
      region,
      interest,
      image:
        this.props.blogData &&
        this.props.blogData.translations &&
        this.props.blogData.translations.length &&
        this.props.blogData.translations[0].main_image_url &&
        `https://d1hha1kg4g6udi.cloudfront.net/${this.props.blogData.translations[0].main_image_url}?d=750`,

      // this.props.blogData &&
      // this.props.blogData.images &&
      // this.props.blogData.images.length &&
      // this.props.blogData.images[0].url
      //   ? this.props.blogData.images[0].url + '?d=450'
      //   : this.props.blogData &&
      //     this.props.blogData.images &&
      //     this.props.blogData.images.length &&
      //     this.props.blogData.images[0].origin_path
      //   ? `${RootStore.config.imgHost_500}/${this.props.blogData.images[0].origin_path}?d=450`
      //   : '',
    };
  }

  isLike() {
    if (this.props.blogData && this.props.blogData.like && RootStore.auth.id !== '') {
      return true;
    }
    return false;
  }

  async onClickHeart() {
    if (RootStore.auth.id === '') {
      return;
    }
    const variables = {
      nowState: this.state.isLike,
      where: 'blog',
      code: this.props.blogData.code,
    };
    const result = await RootStore.client.mutate({
      mutation: changeLike,
      variables,
    });

    if (this.props.onCLickHeartProps) {
      this.props.onCLickHeartProps(this.props.blogData.code, this.state.isLike);
    }

    if (result.data.changeLike) {
      this.setState({ isLike: !this.state.isLike });
    }
  }

  render() {
    if (this.props.layout2) {
      // this.state.image
      return (
        <View
          style={{
            backgroundColor: 'white',
            marginBottom: 36 * HEIGHT_SCALE_RATIO,
          }}>
          <MyTouchableOpacity onPress={this.props.click.bind(this, this.props.blogData.code)}>
            <MyImage
              source={!this.state.image ? IMAGE.UNAVAILABLE_IMG : { uri: this.state.image }}
              key={this.state.image}
              style={{
                width: '100%',
                borderRadius: 3 * WIDTH_SCALE_RATIO,
                height: 180 * HEIGHT_SCALE_RATIO,
              }}
            />
            <View
              style={{
                // backgroundColor: 'grey',
                flexDirection: 'row',
                justifyContent: 'space-between',
                maxheight: 60 * HEIGHT_SCALE_RATIO,
                // alignItems: 'center',
                marginTop: 5 * HEIGHT_SCALE_RATIO,
              }}>
              <View
                style={{
                  width: '70%',
                  paddingRight: 10 * WIDTH_SCALE_RATIO,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {this.state.city === '' &&
                  this.state.interest === '' &&
                  this.state.interest === '' ? (
                    <PText
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[style.textSubTitle, ptText.BODY2]}>
                      {this.state.city} {this.state.region}
                    </PText>
                  ) : null}
                  {this.state.city !== '' && (
                    <PText style={[style.textSubTitle, ptText.BODY2]}>{this.state.city}</PText>
                  )}
                  {this.state.region !== '' && (
                    <PText style={[style.textSubTitle, ptText.BODY2]}> {this.state.region}</PText>
                  )}
                  {this.state.city !== '' && this.state.interest !== '' && (
                    <PText style={[style.textSubTitle, ptText.BODY2]}> &middot; </PText>
                  )}
                  {this.state.interest !== '' && (
                    <PText style={[style.textSubTitle, ptText.BODY2]}>{this.state.interest}</PText>
                  )}
                </View>
                <PText
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={[style.text, { marginTop: 0 * HEIGHT_SCALE_RATIO }]}>
                  {this.state.blogName}
                </PText>
              </View>
              <View style={{ width: '30%' }}>
                <PText style={[style.textSubTitle, ptText.BODY2, { textAlign: 'right' }]}>
                  {this.state.view_count}{' '}
                  <Icon
                    type="Feather"
                    name="eye"
                    style={[
                      style.textSubTitle,
                      ptText.BODY2,
                      {
                        textAlign: 'right',
                      },
                    ]}
                  />
                </PText>
                <TimeAgo
                  time={this.props.blogData?.translations[0]?.renewal_date}
                  style={[
                    style.textCaption,
                    ptColor.GREY40,
                    {
                      textAlign: 'right',
                      fontSize: style.textCaption.fontSize - 1,
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
              right: 0,
              padding: 5 * WIDTH_SCALE_RATIO,
              zIndex: 99999999,
            }}>
            <HeartButton
              isLike={this.state.isLike}
              click={this.onClickHeart}
              isBlog
              data={this.props.blogData}
            />
          </View>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          marginBottom: 10 * WIDTH_SCALE_RATIO,
        }}>
        <MyTouchableOpacity
          style={[
            ptShadow.BLUR0,
            {
              zIndex: -1,
              borderRadius: 4 * HEIGHT_SCALE_RATIO,
            },
          ]}
          onPress={this.props.click.bind(this, this.props.blogData.code)}>
          <MyImage
            source={!this.state.image ? IMAGE.UNAVAILABLE_IMG : { uri: this.state.image }}
            key={this.state.image}
            style={{
              borderTopLeftRadius: 4 * WIDTH_SCALE_RATIO,
              borderTopRightRadius: 4 * WIDTH_SCALE_RATIO,
              width: '100%',
              height: 90 * HEIGHT_SCALE_RATIO,
            }}
          />
          <View
            style={{
              paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
              paddingTop: 2 * HEIGHT_SCALE_RATIO,
              paddingBottom: 3 * HEIGHT_SCALE_RATIO,
              height: 55 * HEIGHT_SCALE_RATIO,
            }}>
            <PText style={[ptColor.GREY40, ptText.SMALL2]}>
              {this.state.city}
              {this.state.region ? ' ' + this.state.region : null}
            </PText>
            <PText
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[style.textCaption, ptColor.GREY80, { fontSize: ptText.BODY2.fontSize - 1 }]}>
              {this.state.blogName}
            </PText>
          </View>
        </MyTouchableOpacity>

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
            grey
            isLike={this.state.isLike}
            click={this.onClickHeart.bind(this)}
            isBlog
            data={this.props.blogData}
          />
        </View>
      </View>
    );
  }
}

BlogCard.propTypes = {
  blogData: PropTypes.object,
  click: PropTypes.func,
};
