import analytics from '@react-native-firebase/analytics';
import React from 'react';
import { Image, KeyboardAvoidingView, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import RNSmtpMailer from 'react-native-smtp-mailer';
import Util from '../../Common/Util';
import { HEIGHT, HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import { COLOR, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { myAlert } from './MyAlert';
import MyTouchableOpacity from './MyTouchableOpacity';
import PText from './PText';
import { ICON } from '../../asset/image/ImagePath';

export default class ModalContact extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalMailSupport: this.props.isVisible,
      emailToSupport: '',
      nameToSupport: '',
      contentToSupport: '',
    };

    this.onChangeMailToSupport = this.onChangeMailToSupport.bind(this);
    this.onChangeNameToSupport = this.onChangeNameToSupport.bind(this);
    this.onChangeContentToSupport = this.onChangeContentToSupport.bind(this);
  }

  onChangeMailToSupport(param) {
    this.setState({ emailToSupport: param });
  }
  onChangeNameToSupport(param) {
    this.setState({ nameToSupport: param });
  }
  onChangeContentToSupport(param) {
    this.setState({ contentToSupport: param });
  }
  validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  sendEmail = () => {
    if (this.state.emailToSupport && this.state.nameToSupport && this.state.contentToSupport) {
      if (this.validateEmail(this.state.emailToSupport)) {
        RNSmtpMailer.sendMail({
          mailhost: 'smtp.gmail.com',
          port: '465',
          ssl: true, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
          username: 'support@creatrip.com',
          password: '201810man!2',
          from: 'support@creatrip.com',
          recipients: 'support@creatrip.com',
          // bcc: ['bccEmail1', 'bccEmail2'], //completely optional
          subject: `Request Support - ${this.state.nameToSupport}`,
          htmlBody: `<p>From: ${this.state.emailToSupport}</p></br>${
            this.props.spotCode
              ? `<p>Post-Link: https://www.creatrip.com/${
                  RootStore.language === 'zh-TW' ? '' : RootStore.language + '/'
                }spot/${this.props.spotCode}/${Util.encodeURI(this.state.titleName)}</p></br>`
              : ''
          }
          <p>[Content]</p><p>${this.state.contentToSupport}</p>`,
          attachmentPaths: [],
          attachmentNames: [],
          attachmentTypes: [],
        });
        myAlert('', 'Your request has been sent, thanks for your request', () => {
          this.props.clickClose();
        });
      } else {
        myAlert('', RootStore.i18n.t('reserve.invalid-email'), () => {
          this.onChangeMailToSupport.focus();
        });
      }
    } else {
      myAlert('', RootStore.i18n.t('warning-fill-full'));
    }
  };
  componentDidMount() {
    analytics().setCurrentScreen('Contact-Us');
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        overlayStyle={{ backgroundColor: '#00000030' }}
        style={{
          height: HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 12 * WIDTH_SCALE_RATIO,
          // width: WIDTH,
          // margin: 0,
          padding: 0,
          marginBottom: 50 * HEIGHT_SCALE_RATIO,
        }}
        {...this.props}>
        <View
          style={{
            width: '100%',
            padding: 10 * WIDTH_SCALE_RATIO,
            height: 280 * HEIGHT_SCALE_RATIO,

            marginHorizontal: 12 * WIDTH_SCALE_RATIO,
            backgroundColor: COLOR.WHITE,
          }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <PText style={[ptText.H4, { color: COLOR.PRIMARY }]}>EMAIL</PText>
            <MyTouchableOpacity
              onPress={() => {
                this.props.clickClose();
              }}>
              <Image
                source={ICON.CLOSE_ICON}
                style={{
                  width: 18 * WIDTH_SCALE_RATIO,
                  height: 18 * WIDTH_SCALE_RATIO,
                  tintColor: COLOR.GREY20,
                }}
                resizeMode="contain"
              />
            </MyTouchableOpacity>
          </View>
          <PText style={ptText.BODY1}>support@creatrip.com</PText>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                marginTop: 8 * HEIGHT_SCALE_RATIO,
                borderColor: COLOR.GREY20,
                justifyContent: 'center',
                borderRadius: 18,
                borderWidth: 1,
                height: 36 * HEIGHT_SCALE_RATIO,
                width: '58%',
                marginRight: 8 * WIDTH_SCALE_RATIO,
                paddingHorizontal: 9 * WIDTH_SCALE_RATIO,
                paddingVertical: 0,
                paddingTop: 0,
                paddingBottom: 0,
              }}>
              <TextInput
                ref={input => (this.onChangeMailToSupport = input)}
                onSubmitEditing={() => {
                  // this.onChangeNameToSupport.focus();
                  if (this.validateEmail(this.state.emailToSupport)) {
                    this.onChangeNameToSupport.focus();
                  } else {
                    myAlert('', RootStore.i18n.t('reserve.invalid-email'), () => {
                      this.onChangeMailToSupport.focus();
                    });
                  }
                }}
                placeholder={RootStore.i18n.t('ask-youremail')}
                placeholderTextColor={COLOR.GREY20}
                onChangeText={text => {
                  this.setState({ emailToSupport: text });
                }}
                style={[
                  ptText.BODY2,
                  {
                    marginLeft: 10 * WIDTH_SCALE_RATIO,
                    height: 36 * HEIGHT_SCALE_RATIO,
                    // justifyContent: 'center',
                    // marginBottom: 5 * HEIGHT_SCALE_RATIO,
                    // textAlign: 'center',
                  },
                ]}
              />
            </View>

            <View
              style={{
                marginTop: 8 * HEIGHT_SCALE_RATIO,
                // lineHeight: 0.1,
                justifyContent: 'center',
                borderRadius: 18,
                borderWidth: 1,
                borderColor: COLOR.GREY20,
                flexWrap: 'nowrap',

                height: 36 * HEIGHT_SCALE_RATIO,
                width: '40%',
                paddingRight: 12 * WIDTH_SCALE_RATIO,
                // backgroundColor: COLOR.WHITE,
                paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
                paddingVertical: 0,
                paddingTop: 0,
                paddingBottom: 0,
              }}>
              <TextInput
                ref={input => (this.onChangeNameToSupport = input)}
                onSubmitEditing={() => {
                  this.onChangeContentToSupport.focus();
                }}
                placeholderTextColor={COLOR.GREY20}
                placeholder={RootStore.i18n.t('ask-yourname')}
                onChangeText={text => {
                  this.setState({ nameToSupport: text });
                }}
                keyboardType={'default'}
                style={[
                  ptText.BODY2,
                  {
                    height: 36 * HEIGHT_SCALE_RATIO,
                    marginLeft: 10 * WIDTH_SCALE_RATIO,
                    // marginBottom: 5 * HEIGHT_SCALE_RATIO,
                  },
                ]}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.onChangeContentToSupport.focus();
            }}
            style={{
              // backgroundColor: 'red',
              marginTop: 8 * HEIGHT_SCALE_RATIO,
              // lineHeight: 0.1,
              justifyContent: 'flex-start',
              borderColor: COLOR.GREY20,

              borderRadius: 9,
              borderWidth: 1,
              height: 128 * HEIGHT_SCALE_RATIO,
              width: '100%',
              paddingRight: 12 * WIDTH_SCALE_RATIO,
              // backgroundColor: COLOR.WHITE,
              paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
              paddingVertical: 0,
              paddingTop: 0,
              paddingBottom: 0 * HEIGHT_SCALE_RATIO,
            }}>
            <KeyboardAvoidingView>
              <TextInput
                placeholderTextColor={COLOR.GREY20}
                ref={input => (this.onChangeContentToSupport = input)}
                multiline
                placeholder={RootStore.i18n.t('ask-description')}
                onChangeText={text => {
                  this.setState({ contentToSupport: text });
                }}
                style={[
                  ptText.BODY2,
                  { marginLeft: 5 * WIDTH_SCALE_RATIO, paddingBottom: 10 * HEIGHT_SCALE_RATIO },
                ]}
              />
            </KeyboardAvoidingView>
            <MyTouchableOpacity
              onPress={() => {
                this.sendEmail();
              }}
              style={{
                margin: 5 * WIDTH_SCALE_RATIO,
                right: 0,
                bottom: 0,
                position: 'absolute',
                width: 27 * WIDTH_SCALE_RATIO,
                height: 27 * HEIGHT_SCALE_RATIO,
              }}
              resizeMode="cover">
              <Image
                source={ICON.RIGHT_ARROW_ICON}
                style={{
                  resizeMode: 'contain',
                  width: 27 * WIDTH_SCALE_RATIO,
                  height: 27 * HEIGHT_SCALE_RATIO,
                }}
              />
            </MyTouchableOpacity>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
