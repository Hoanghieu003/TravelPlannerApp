import { PixelRatio, Platform, StyleSheet } from 'react-native';
import {
  HEIGHT_SCALE_RATIO,
  WIDTH,
  WIDTH_SCALE_RATIO,
  IS_IOS,
  IS_ANDROID,
} from '../Constant/constant';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import RootStore from '../Stores/RootStore';

export const headerHeight = 48 * HEIGHT_SCALE_RATIO;
export const iconSize = 20 * WIDTH_SCALE_RATIO;
export const heightBottomBar = (100 - getBottomSpace()) * HEIGHT_SCALE_RATIO;
export const textInputHeight = 36 * HEIGHT_SCALE_RATIO;

export const heightCarouselSpotAccomodation = 160 * HEIGHT_SCALE_RATIO;
export const heightCarouselBlog = 188 * HEIGHT_SCALE_RATIO;
export const heightCarouselSpot = 120 * HEIGHT_SCALE_RATIO;
/*
        Returns the device pixel density. Some examples:
            PixelRatio.get() === 1
            mdpi Android devices (160 dpi)
            PixelRatio.get() === 1.5
            hdpi Android devices (240 dpi)
            PixelRatio.get() === 2
            iPhone 4, 4S
            iPhone 5, 5c, 5s
            iPhone 6
            xhdpi Android devices (320 dpi)
            PixelRatio.get() === 3
            iPhone 6 plus
            xxhdpi Android devices (480 dpi)
            PixelRatio.get() === 3.5
            Nexus 6
*/
export const fontSize =
  PixelRatio.get() <= 1.5 ? 13 : PixelRatio.get() > 1.5 && PixelRatio.get() < 3 ? 14 : 15;
//font scale
const scale = Math.min(WIDTH_SCALE_RATIO, HEIGHT_SCALE_RATIO);
export const isUseRaleway = IS_ANDROID
  ? RootStore.language === 'en' || RootStore.language === 'vi'
    ? true
    : false
  : false;
export const FS = (size = fontSize) => Math.ceil(size * scale);

export const COLOR = {
  appColor: '#00AFA0',
  appColorHover: '#F2F2F2',
  appColor2: '#FFC900',
  appTextColor: '#292929',
  appTextPlaceholderColor: '#CCCCCC',
  appTextSubColor: '#999999',
  appBorderColor: '#F2F2F2',
  appBorderColor2: '#70707010',
  BLACK: '#000000',
  GREY80: '#333333',
  GREY60: '#666666',
  GREY40: '#999999',
  GREY20: '#CCCCCC',
  PRIMARY: '#00AFA0',
  WHITE: '#FFFFFF',
  DIVIDER: '#F2F2F2',
};

export const ptFont = {
  REGULAR: null,
  MEDIUM: null,
  // Regular: 'NotoSansCJKkr-Regular',
  // Medium: 'NotoSansCJKkr-Medium',
};

export const ptColor = {
  GREY80: { color: '#333333' },
  GREY40: { color: '#999999' },
  GREY20: { color: '#CCCCCC' },
  PRIMARY: { color: '#00AFA0' },
  WHITE: { color: '#ffffff' },
  DIVIDER: { color: '#F2F2F2' },
};

export const ptText = {
  H1: {
    fontSize: FS(fontSize) + 10,
    lineHeight: !isUseRaleway ? FS(fontSize) + 19 : FS(fontSize) + 15,
    fontFamily: ptFont.REGULAR,
  },
  H2: {
    fontSize: FS(fontSize) + 8,
    lineHeight: !isUseRaleway ? FS(fontSize) + 19 : FS(fontSize) + 15,
    fontFamily: ptFont.REGULAR,
  },
  H3: {
    fontSize: FS(fontSize) + 4,
    lineHeight: !isUseRaleway ? FS(fontSize) + 13 : FS(fontSize) + 8,
    fontFamily: ptFont.REGULAR,
  },
  H4: {
    fontSize: FS(fontSize) + 2,
    lineHeight: !isUseRaleway ? FS(fontSize) + 10 : FS(fontSize) + 6,
    fontFamily: ptFont.REGULAR,
  },
  BODY1: {
    fontSize: FS(fontSize),
    lineHeight: !isUseRaleway ? FS(fontSize) + 7 : FS(fontSize) + 3,
    fontFamily: ptFont.REGULAR,
  },
  BODY2: {
    fontSize: FS(fontSize) - 2,
    lineHeight: !isUseRaleway ? FS(fontSize) + 4 : FS(fontSize),
    fontFamily: ptFont.REGULAR,
  },
  SMALL1: {
    fontSize: FS(fontSize) - 3,
    lineHeight: !isUseRaleway ? FS(fontSize) + 2.5 : FS(fontSize) - 2,
    fontFamily: ptFont.REGULAR,
  },
  SMALL2: {
    fontSize: FS(fontSize) - 5,
    lineHeight: !isUseRaleway ? FS(fontSize) : FS(fontSize) - 4,
    fontFamily: ptFont.REGULAR,
  },
  BUTTON: {
    fontSize: FS(fontSize) - 2,
    fontWeight: '600',
    fontFamily: ptFont.MEDIUM,
  },
};
export const ptButton = {
  FILL: {
    width: 128 * WIDTH_SCALE_RATIO,
    height: 40 * WIDTH_SCALE_RATIO,
    borderRadius: 5 * WIDTH_SCALE_RATIO,
    backgroundColor: COLOR.PRIMARY,
  },
  OUTLINE: {
    borderWidth: FS(1),
    borderColor: COLOR.PRIMARY,
    width: 128 * WIDTH_SCALE_RATIO,
    height: 40 * WIDTH_SCALE_RATIO,
    borderRadius: 5 * WIDTH_SCALE_RATIO,
    backgroundColor: COLOR.WHITE,
  },
  CIRCLE: {
    width: 48 * WIDTH_SCALE_RATIO,
    height: 48 * WIDTH_SCALE_RATIO,
    borderRadius: 24 * WIDTH_SCALE_RATIO,
    backgroundColor: COLOR.PRIMARY,
  },
};
export const ptShadow = {
  BLUR0: {
    ...Platform.select({
      android: { backgroundColor: 'white', elevation: 3 * WIDTH_SCALE_RATIO },
      ios: {
        backgroundColor: 'white',
        shadowColor: '#00000050',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3 * WIDTH_SCALE_RATIO,
        shadowOpacity: 0.6 * WIDTH_SCALE_RATIO,
      },
    }),
  },
  BLUR10: {
    ...Platform.select({
      android: { backgroundColor: 'white', elevation: 6 * WIDTH_SCALE_RATIO },
      ios: {
        backgroundColor: 'white',
        shadowColor: '#00000050',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6 * WIDTH_SCALE_RATIO,
        shadowOpacity: 0.6 * WIDTH_SCALE_RATIO,
      },
    }),
  },
  BLUR20: {
    ...Platform.select({
      android: { backgroundColor: 'white', elevation: 11 * WIDTH_SCALE_RATIO },
      ios: {
        backgroundColor: 'white',
        shadowColor: '#00000050',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 11 * WIDTH_SCALE_RATIO,
        shadowOpacity: 0.6 * WIDTH_SCALE_RATIO,
      },
    }),
  },
};

const style = StyleSheet.create({
  text: {
    ...ptText.BODY1,
    ...ptColor.GREY80,
  },
  textHeader: {
    ...ptText.H3,
    ...ptColor.GREY80,
  },
  textTitle: {
    ...ptText.H3,
    ...ptColor.GREY80,
  },
  textSubTitle: {
    ...ptText.BODY1,
    ...ptColor.GREY40,
  },
  textCaption: {
    ...ptText.BODY2,
    ...ptColor.GREY20,
  },

  textInput: {
    ...ptText.BODY1,
    ...ptColor.GREY40,
  },
  textButton: {
    ...ptText.BODY2,
    ...ptColor.GREY80,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '600',
    // fontFamily: ptFont.MEDIUM,
  },
  textButtonOutLine: {
    ...ptText.BODY2,
    ...ptColor.PRIMARY,
    textAlign: 'center',
    textTransform: 'uppercase',
    // fontFamily: ptFont.MEDIUM,
  },
  textShadow: {
    textShadowColor: '#ffffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10 * WIDTH_SCALE_RATIO,
  },
  textShadow2: {
    textShadowColor: '#00000090',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5 * WIDTH_SCALE_RATIO,
  },
  //header
  titleHeader: {
    ...ptText.H3,
    ...ptColor.PRIMARY,
    textAlign: 'center',
  },
  // khi text bị null thì hiện cái vạch màu
  textNull: {
    ...ptText.BODY1,
    ...ptColor.DIVIDER,
    height: ptText.BODY1.fontSize,
    width: '90%',
  },
  textNull2: {
    ...ptText.H3,
    ...ptColor.DIVIDER,
    height: ptText.H3.fontSize,
    width: '30%',
  },
  //Button
  button: {
    ...ptButton.FILL,
    paddingHorizontal: 21 * WIDTH_SCALE_RATIO,
    // paddingVertical: 6 * HEIGHT_SCALE_RATIO,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonOutline: {
    ...ptButton.OUTLINE,
    paddingHorizontal: 21 * WIDTH_SCALE_RATIO,
    // paddingVertical: 6 * HEIGHT_SCALE_RATIO,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  input: {
    ...ptText.BODY1,
    ...ptColor.GREY40,
    flex: 1,
    borderBottomWidth: 0,
    height: textInputHeight,
    // marginVertical: 6 * HEIGHT_SCALE_RATIO,
    paddingHorizontal: 20 * WIDTH_SCALE_RATIO,
  },
  icon: {
    fontSize: FS(iconSize),
    color: COLOR.appColor,
  },
  iconSectionImage: {
    height: 24 * WIDTH_SCALE_RATIO,
    width: 24 * WIDTH_SCALE_RATIO,
    tintColor: COLOR.GREY60,
  },
  //shadow
  shadow: {
    ...ptShadow.BLUR0,
  },
  shadow2: {
    borderColor: COLOR.appBorderColor,
    borderWidth: WIDTH_SCALE_RATIO,
    ...ptShadow.BLUR0,
  },

  header: {
    borderTopWidth: 0,
    height: headerHeight,
    width: WIDTH,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: COLOR.appTextPlaceholderColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  //modal
  textModal: {
    ...ptText.H3,
    ...ptColor.GREY80,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  content: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  paddingBottomTabbar: {
    paddingBottom: heightBottomBar + 0 * HEIGHT_SCALE_RATIO,
  },
});

export default style;
