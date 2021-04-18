import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BaseHeaderApp from '../Components/BaseHeaderApp';
import PText from '../Components/PText';
import { HEIGHT, HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, heightBottomBar, ptColor, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { ICON } from '../../asset/image/ImagePath';

export default class MemberBenefit extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      nickname: '',
      modifyNickname: false,
      home: '',
      modifyHome: false,
      introduce: '',
      modifyIntroduce: false,
    };
  }

  onClickGoDiscount() {
    Actions.reserve({ discount: true, reserve: false });
  }

  onClickGoReserve() {
    Actions.reserve({ discount: false, reserve: true });
  }

  render() {
    return (
      <View style={styles.screen}>
        <BaseHeaderApp
          noShadow
          isClose
          title={RootStore.i18n.t('my-page.verify-creatrip-membership')}
          leftIconStyle={{ tintColor: COLOR.PRIMARY }}
          rightIconType={null}
        />
        {/* <BaseHeader
          title={RootStore.i18n.t('my-page.verify-creatrip-membership')}
          rightIconType={null}
          isClose
          color={COLOR.appColor}
        /> */}
        <ScrollView
          bounces={false}
          contentContainerStyle={[style.paddingBottomTabbar, { backgroundColor: '#fafafa' }]}
          showsVerticalScrollIndicator={false}>
          <View
            style={[
              style.shadow,
              {
                backgroundColor: '#fff',
                paddingBottom: 60 * HEIGHT_SCALE_RATIO,
              },
            ]}>
            <Image
              source={ICON.MEMBER_ICON}
              resizeMode="contain"
              style={{
                marginTop: 40 * HEIGHT_SCALE_RATIO,
                marginVertical: 10 * HEIGHT_SCALE_RATIO,
                height: HEIGHT * 0.25,
                alignSelf: 'center',
              }}
            />
            <PText style={[style.titleHeader, { marginTop: 10 * HEIGHT_SCALE_RATIO }]}>
              본 매장은 크리에이트립 제휴처입니다
            </PText>
            <PText style={[style.titleHeader, {}]}>점장님께 문의 후 혜택을 제공해주세요</PText>
          </View>
          <View
            style={{
              paddingTop: 25 * HEIGHT_SCALE_RATIO,
              paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
            }}>
            <PText style={[ptText.H4, ptColor.GREY80]}>
              {RootStore.i18n.t('my-page.how-to-verify-creatrip-membership')}
              {/* {RootStore.i18n.i('my-page.how-to-verify-creatrip-membership')} */}
            </PText>
            <View
              style={{
                borderWidth: 0,
                marginTop: 10 * HEIGHT_SCALE_RATIO,
                backgroundColor: '#fff',
                borderRadius: 8 * WIDTH_SCALE_RATIO,
              }}>
              <View style={styles.block}>
                <View style={{ width: '80%' }}>
                  <PText style={[style.textSubTitle, ptText.BODY2, { textTransform: 'uppercase' }]}>
                    {RootStore.i18n.t('my-page.step', { step: 1 })}.
                  </PText>
                  <PText style={[ptText.BODY1, ptColor.GREY80]}>
                    {RootStore.i18n.t('membership-method.visit-creatrip-partner-store')}
                  </PText>
                </View>
                <Image
                  source={ICON.MEMBER_ICON_01}
                  resizeMode="contain"
                  style={{
                    width: 36 * WIDTH_SCALE_RATIO,
                    height: 36 * WIDTH_SCALE_RATIO,
                    alignSelf: 'center',
                  }}
                />
              </View>

              <View style={styles.block}>
                <View style={{ width: '80%' }}>
                  <PText style={[style.textSubTitle, ptText.BODY2, { textTransform: 'uppercase' }]}>
                    {RootStore.i18n.t('my-page.step', { step: 2 })}.
                  </PText>
                  <PText style={[ptText.BODY1, ptColor.GREY80]}>
                    {RootStore.i18n.t('membership-method.verify-creatrip-membership-onsite')}
                  </PText>
                  <PText style={[ptText.BODY2, ptColor.GREY40]}>
                    {/* {RootStore.i18n.t('membership-method.if-booked-in-advance')} */}
                    사전 예약한 경우{' '}
                    <PText
                      onPress={() => Actions.myPage()}
                      style={[
                        style.textSubTitle,
                        {
                          color: COLOR.appColor,
                          textDecorationLine: 'underline',
                        },
                      ]}>
                      나의 예약
                    </PText>{' '}
                    에서 바우처 확인
                  </PText>
                </View>
                <Image
                  source={ICON.MEMBER_ICON_02}
                  resizeMode="contain"
                  style={{
                    width: 36 * WIDTH_SCALE_RATIO,
                    height: 36 * WIDTH_SCALE_RATIO,
                    alignSelf: 'center',
                  }}
                />
              </View>

              <View style={[styles.block, { borderBottomWidth: 0 }]}>
                <View style={{ width: '80%' }}>
                  <PText style={[style.textSubTitle, ptText.BODY2, { textTransform: 'uppercase' }]}>
                    {RootStore.i18n.t('my-page.step', { step: 3 })}.
                  </PText>
                  <PText style={[ptText.BODY1, ptColor.GREY80]}>
                    {RootStore.i18n.t('membership-method.enjoy-benefits')}.
                  </PText>
                </View>
                <Image
                  source={ICON.MEMBER_ICON_03}
                  resizeMode="contain"
                  style={{
                    width: 36 * WIDTH_SCALE_RATIO,
                    height: 36 * WIDTH_SCALE_RATIO,
                    alignSelf: 'center',
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ marginBottom: heightBottomBar }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20 * WIDTH_SCALE_RATIO,
    paddingVertical: 15 * HEIGHT_SCALE_RATIO,
    borderBottomWidth: 1 * WIDTH_SCALE_RATIO,
    borderBottomColor: COLOR.appBorderColor,
  },
  screen: {
    // flex: 1,
    // backgroundColor: '#00000005',
  },
});
