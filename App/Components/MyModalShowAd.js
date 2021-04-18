import React from 'react';
import { Image, View } from 'react-native';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HEIGHT, HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, ptShadow, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import MyTouchableOpacity from './MyTouchableOpacity';
import PFlatList from './PFlatList';
import PText from './PText';
import { ICON } from '../../asset/image/ImagePath';

const AdvertiseListItem = React.memo((props) => {
  const { item, blog, onClickCard } = props;
  const image = item.translations?.length > 0 ? item.translations[0].image : '';
  const title = item.translations?.length > 0 ? item.translations[0].title : '';
  const code = blog ? item?.blog?.code : item?.spot?.code;
  const locationTag = item && item.tags && item.tags.filter((v) => v && v.type && v.type === 7);
  const detailLocation =
    (locationTag &&
      locationTag?.length > 0 &&
      locationTag[0]?.translations?.length > 0 &&
      locationTag[0]?.translations[0]?.name) ||
    '';

  const onPress = () => {
    onClickCard(code);
  };

  return (
    <MyTouchableOpacity
      onPress={onPress}
      style={{
        // backgroundColor: 'black',
        paddingRight: 8 * WIDTH_SCALE_RATIO,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{ backgroundColor: 'black', borderRadius: 6 * WIDTH_SCALE_RATIO }}>
        <Image
          resizeMode="cover"
          source={{
            uri: image,
          }}
          style={{
            borderRadius: 5 * WIDTH_SCALE_RATIO,
            width: 343 * WIDTH_SCALE_RATIO,
            opacity: 0.95,
            height: 240 * HEIGHT_SCALE_RATIO,
            backgroundColor: 'black',
          }}
        />
      </View>

      <View
        style={{
          width: 343 * WIDTH_SCALE_RATIO,
          backgroundColor: COLOR.WHITE,
          alignSelf: 'center',
          paddingVertical: 8 * WIDTH_SCALE_RATIO,
        }}>
        <PText style={[style.textTitle, ptText.H4, { color: COLOR.GREY80, textAlign: 'center' }]}>
          {title.toUpperCase()}
        </PText>
        <PText
          style={[style.textSubTitle, ptText.H4, { color: COLOR.GREY40, alignSelf: 'center' }]}>
          {detailLocation}
        </PText>
      </View>
    </MyTouchableOpacity>
  );
});

export default class MyModalShowAd extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  onClickCard = async (code) => {
    if (this.props.blog) {
      Actions.blogDetail({ blogCode: code });
    } else if (this.props.spot) {
      Actions.spotDetail({ spotCode: code, isProxyShopping: this.props.proxyShopping });
    }
    this.setState({ visible: !this.state.visible });
  };

  open = () => {
    this.setState({ visible: true });
  };

  renderAdvertise = ({ item }) => {
    return <AdvertiseListItem item={item} blog={this.props.blog} onClickCard={this.onClickCard} />;
  };

  render() {
    console.log('29148 MyModalShowAd chay cai nay ne nen en e', this.props.data);
    return (
      <Modal
        backdropColor={'transparent'}
        overlayStyle={{ backgroundColor: COLOR.WHITE }}
        animationOut="fadeOutRightBig"
        animationIn="fadeInRight"
        animationInTiming={500}
        animationOutTiming={500}
        isVisible={this.state.visible}
        onRequestClose={() => {
          this.setState({ visible: false });
        }}
        style={[
          ptShadow.BLUR10,
          {
            borderTopLeftRadius: 20 * WIDTH_SCALE_RATIO,
            margin: 8 * WIDTH_SCALE_RATIO,
            marginTop: 10 * HEIGHT_SCALE_RATIO,
            marginRight: 0 * WIDTH_SCALE_RATIO,
            marginBottom: 0 * HEIGHT_SCALE_RATIO,
            height: HEIGHT,
          },
        ]}>
        <View
          style={{
            width: WIDTH,
            height: HEIGHT,
            marginTop: 20 * HEIGHT_SCALE_RATIO,
            borderTopLeftRadius: 20 * WIDTH_SCALE_RATIO,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: WIDTH,
              justifyContent: 'space-between',
              alignSelf: 'flex-end',
              marginTop: 16 * HEIGHT_SCALE_RATIO,
              padding: 5 * WIDTH_SCALE_RATIO,
            }}>
            <View style={{ width: 30 * WIDTH_SCALE_RATIO }} />
            <PText style={[ptText.H2, { color: COLOR.GREY40 }]}>
              {RootStore.i18n.t('global.see-all')}
            </PText>
            <MyTouchableOpacity
              style={{
                padding: 5 * WIDTH_SCALE_RATIO,
                paddingRight: 16 * WIDTH_SCALE_RATIO,
              }}
              onPress={() => {
                this.setState({ visible: false });
              }}>
              <Image
                source={ICON.CLOSE_ICON}
                style={{
                  width: 15 * WIDTH_SCALE_RATIO,
                  height: 15 * WIDTH_SCALE_RATIO,
                  tintColor: COLOR.GREY20,
                }}
                resizeMode="contain"
              />
            </MyTouchableOpacity>
          </View>
          <PFlatList
            style={{
              paddingVertical: 24 * HEIGHT_SCALE_RATIO,
            }}
            data={this.props.data}
            renderItem={this.renderAdvertise}
          />
          <View style={{ height: 52 * HEIGHT_SCALE_RATIO }} />
        </View>
      </Modal>
    );
  }
}
