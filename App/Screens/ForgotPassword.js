import analytics from '@react-native-firebase/analytics';
import { Input, Item } from 'native-base';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import reqResetPassword from '../../Common/gql/mutations/reqResetPassword.gql';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, ptShadow } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { ICON } from '../../asset/image/ImagePath';

export default class ForgotPassword extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      needGuest: Platform.OS === 'ios',
      email: '',
      modalAlreadyUserName: false,
      date: new Date(),
      titleModal: '',
      loading: false,
    };
  }

  onClickForgotPass = async () => {
    const { email } = this.state;
    const at = email.indexOf('@');
    const dot = email.lastIndexOf('.');
    const space = email.indexOf(' ');

    if (
      at !== -1 &&
      at !== 0 &&
      dot !== -1 &&
      dot > at + 1 &&
      dot < email.length - 1 &&
      space === -1
    ) {
      this.setState({ loading: true });
      const result = await RootStore.client.mutate({
        mutation: reqResetPassword,
        variables: {
          email: this.state.email,
          locale: RootStore.language,
        },
      });
      console.log('phat: ForgotPassword -> onClickForgotPass -> result', result);
      if (result) {
        this.isSuccess = true;
        this.modalNoti(RootStore.i18n.t('success-send-mail-forgot-password'));
      } else {
        this.modalNoti(RootStore.i18n.t('fail-send-mail-forgot-password'));
      }

      this.setState({ loading: false });
    } else if (email === '') {
      this.modalNoti(`Email is not empty`);
    } else {
      this.modalNoti(`Email ${email} !\nIncorrect input please re-enter`);
      this.setState({
        email: '',
      });
    }
  };
  modalNoti = (titleModal) => {
    this.setState({ titleModal, modalAlreadyUserName: !this.state.modalAlreadyUserName }, () => {});
  };
  componentDidMount() {
    analytics().setCurrentScreen('Forgot-Password');
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <BaseHeaderWithSearch
          backgroundColorWhite
          showBack
          leftIconStyle={{ tintColor: COLOR.appColor }}
        />

        <ScrollView style={{ flex: 1 }}>
          <View style={styles.block}>
            <Row size={12} style={{ marginTop: 20 }}>
              <Col sm={12} style={{ alignItems: 'center' }}>
                <Item>
                  <Image
                    source={ICON.EMAIL_ICON}
                    style={{ width: 30, height: 24 }}
                    resizeMode={'contain'}
                  />
                  <Input
                    onChangeText={(text) => this.setState({ email: text })}
                    onSubmitEditing={this.onClickForgotPass}
                    keyboardType="email-address"
                    placeholder="EMAIL"
                    value={this.state.email}
                    autoCapitalize="none"
                    style={style.textInput}
                    placeholderTextColor={COLOR.appTextPlaceholderColor}
                    borderColor={COLOR.appTextPlaceholderColor}
                    autoFocus
                  />
                </Item>
              </Col>
            </Row>

            <View style={{ marginTop: 20 * HEIGHT_SCALE_RATIO }}>
              {this.state.loading ? (
                <ActivityIndicator size="large" color="#00afa0" style={{ alignSelf: 'center' }} />
              ) : (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <PText
                    style={{
                      textAlign: 'center',
                      color: COLOR.GREY40,
                      marginBottom: 15 * HEIGHT_SCALE_RATIO,
                    }}>
                    {RootStore.i18n.t('tip-forgot-password')}
                  </PText>
                </View>
              )}
              <MyTouchableOpacity
                style={[
                  ptShadow.BLUR0,
                  {
                    backgroundColor: COLOR.appColor,
                    alignSelf: 'flex-end',
                    width: 50 * WIDTH_SCALE_RATIO,
                    height: 50 * WIDTH_SCALE_RATIO,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10 * WIDTH_SCALE_RATIO,
                    marginTop: 70 * HEIGHT_SCALE_RATIO,
                    marginRight: -20 * WIDTH_SCALE_RATIO,
                    borderRadius: 25 * WIDTH_SCALE_RATIO,
                    zIndex: 999999,
                  },
                ]}
                onPress={this.onClickForgotPass.bind(this)}>
                <Image
                  source={ICON.NEXT_ICON}
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: 18 * WIDTH_SCALE_RATIO,
                    tintColor: 'white',
                  }}
                />
              </MyTouchableOpacity>
              <Modal isVisible={this.state.modalAlreadyUserName}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{}}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 300,
                        borderRadius: 10,
                      }}>
                      <View style={{ paddingTop: 20 }}>
                        <Image style={{ width: 30, height: 30 }} source={ICON.ATTENTION_ICON} />
                      </View>
                      <PText
                        style={{
                          paddingBottom: 30 * HEIGHT_SCALE_RATIO,
                          padding: 10,
                          textAlign: 'center',
                        }}>
                        {this.state.titleModal}
                      </PText>

                      <TouchableOpacity
                        style={{ paddingBottom: 20 }}
                        onPress={() => {
                          this.modalNoti();
                          if (this.isSuccess) {
                            Actions.pop();
                          }
                        }}>
                        <View
                          style={{
                            width: 120,
                            height: 40,
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            borderColor: COLOR.appColor,
                          }}>
                          <PText style={{ color: COLOR.appColor }}>OK</PText>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    maxWidth: 320 * WIDTH_SCALE_RATIO,
    height: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 20 * WIDTH_SCALE_RATIO,
    paddingRight: 20 * WIDTH_SCALE_RATIO,
    paddingTop: 10 * HEIGHT_SCALE_RATIO,
    paddingBottom: 0,
  },
});
