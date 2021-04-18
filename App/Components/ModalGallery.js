/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-mixed-operators */
import Clipboard from '@react-native-community/clipboard';
import _ from 'lodash';
import React from 'react';
import { ActivityIndicator, StatusBar, TouchableOpacity, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HEIGHT, HEIGHT_SCALE_RATIO, IS_IOS, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import { myAlert } from './MyAlert';
import MyImage from './MyImage';
import MyTouchableOpacity from './MyTouchableOpacity';
import PText from './PText';

// const strings = {};

export default class ModalGallery extends React.PureComponent {
  static instance = null;

  static show(listImage, currentIndex) {
    if (ModalGallery.instance) {
      ModalGallery.instance.setState({
        visible: true,
        listImage,
        currentIndex,
      });
    }
  }

  static hide() {
    if (ModalGallery.instance) {
      ModalGallery.instance.setState({ visible: false });
    }
  }

  constructor(props) {
    super(props);
    ModalGallery.instance = this;

    this.state = {
      visible: false,
      listImage: [],
      modalVisible: false,
      downlaodUrl: '',
      isShowContent: false,
      photoPermission: '',
      step: 0,
      onLoadEnd: false,
      enableImageViewer: true,
      seeMore: false,
      currentIndex: 0,
      showInfo: true,
      hideStatusbar: true,
    };
    this._snapToItem = _.debounce(this._snapToItem, 500);
    this.imageViewerPress = this.imageViewerPress.bind(this);
  }

  writeToClipboard = async (item) => {
    await Clipboard.setString(item);
    myAlert('Đã copy vào clipboard!');
  };

  renderHeader = () => {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          paddingHorizontal: 16 * HEIGHT_SCALE_RATIO,
          // right: 16 * WIDTH_SCALE_RATIO,
          marginTop: IS_IOS ? 20 : 0,
          width: WIDTH,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MyTouchableOpacity
          onPress={this.onRequestClose}
          style={{
            backgroundColor: '#00000020',
            padding: 10 * WIDTH_SCALE_RATIO,
            // borderRadius: 30,
          }}>
          <MaterialCommunityIcons name="arrow-left" size={30} color="white" />
        </MyTouchableOpacity>
        <PText
          style={{
            fontSize: 16 * WIDTH_SCALE_RATIO,
            color: 'white',
          }}>
          {this.state.currentIndex + 1}/{this.state.listImage.length}
        </PText>
      </View>
    );
  };

  _snapToItem = async (index) => {
    console.log('phat: ModalGallery -> _snapToItem -> index ', index);
    this.setState({ currentIndex: index, seeMore: false }, async () => {
      if (this._carousel) {
        await this._carousel.snapToItem(index);
      }
    });
  };
  _renderImage(e) {
    const { item, index } = e;
    // console.log('phat: _renderImage -> item', item);
    return (
      <TouchableOpacity
        onPress={() => this._snapToItem(index)}
        style={{
          transform: [
            { scaleX: this.state.currentIndex === index ? 1 : 0.9 },
            { scaleY: this.state.currentIndex === index ? 1 : 0.9 },
          ],
        }}>
        <MyImage
          style={{
            width: '100%',
            height: '100%',
            opacity: this.state.currentIndex === index ? 1 : 0.7,
          }}
          // resizeMode={FastImage.resizeMode.cover}
          source={{ uri: item }}
        />
      </TouchableOpacity>
    );
  }

  imageViewerPress() {
    this.setState({ showInfo: !this.state.showInfo });
  }

  onRequestClose() {
    ModalGallery.hide();
  }

  onChangeImg = (Index) => {
    this._snapToItem(Index);
  };
  render() {
    const { listImage } = this.state;
    const images = [];
    if (listImage) {
      listImage.forEach((element) => {
        images.push({
          url: element,
          width: WIDTH,
          height: 228 * HEIGHT_SCALE_RATIO,
        });
      });
    }
    return (
      <Modal
        backdropColor="#fff"
        backdropOpacity={1}
        animationIn="fadeInDown"
        animationInTiming={500}
        animationOutTiming={500}
        isVisible={
          ModalGallery.instance &&
          ModalGallery.instance.state &&
          ModalGallery.instance.state.visible
            ? ModalGallery.instance.state.visible
            : false
        }
        onRequestClose={this.onRequestClose}
        style={{
          margin: 0,
          padding: 0,
          flex: 1,
          zIndex: 9999999999,
        }}>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <ImageViewer
          style={{
            flex: 1,
            height: HEIGHT,
          }}
          onClick={this.imageViewerPress}
          maxOverflow={images.length > 1 ? undefined : 0}
          saveToLocalByLongPress={false}
          index={this.state.currentIndex}
          imageUrls={images}
          enableSwipeDown={false}
          loadingRender={() => (
            <ActivityIndicator size="large" color="white" style={{ alignSelf: 'center' }} />
          )}
          onChange={this.onChangeImg}
          renderIndicator={images.length > 1 ? this.renderHeader : () => null}
        />
      </Modal>
    );
  }
}
