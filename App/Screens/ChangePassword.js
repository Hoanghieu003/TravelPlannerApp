import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import analytics from '@react-native-firebase/analytics';
import React from 'react';
import { Alert, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BaseHeaderApp from '../../App/Components/BaseHeaderApp';
import changeMemberInfoMutation from '../../Common/gql/mutations/changeMemberInfo.gql';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, ptText } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { ICON } from '../../asset/image/ImagePath';

export default class ChangePassword extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPassword: '',
      newPassword: '',
      checkPassword: '',
    };

    this.onClickChangePassword = this.onClickChangePassword.bind(this);

    this.onChangeCurrent = this.onChangeCurrent.bind(this);
    this.onChangeNew = this.onChangeNew.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
  }
  componentDidMount() {
    analytics().setCurrentScreen('Change-password');
  }

  async onClickChangePassword() {
    if (
      this.state.currentPassword === '' ||
      this.state.newPassword === '' ||
      this.state.checkPassword === ''
    ) {
      Alert.alert('', 'You cannot skip one of them', [{ text: RootStore.i18n.t('global.close') }], {
        cancelable: false,
      });
    } else if (this.state.newPassword.length < 6 && this.state.newPassword !== '') {
      Alert.alert(
        '',
        RootStore.i18n.t('change-password.new-error'),
        [{ text: RootStore.i18n.t('global.close') }],
        { cancelable: false },
      );
    } else if (
      this.state.newPassword !== this.state.checkPassword &&
      this.state.newPassword !== '' &&
      this.state.checkPassword !== ''
    ) {
      Alert.alert(
        '',
        RootStore.i18n.t('change-password.check-error'),
        [{ text: RootStore.i18n.t('global.close') }],
        { cancelable: false },
      );
    } else {
      const result = await RootStore.client.mutate({
        mutation: changeMemberInfoMutation,
        variables: {
          password: this.state.currentPassword,
          new_password: this.state.newPassword,
        },
      });
      console.log('memberinfo.result', result.data.changeMemberInfo);
      if (result.data.changeMemberInfo.result) {
        Alert.alert(
          '',
          RootStore.i18n.t('change-password.success'),
          [
            {
              text: RootStore.i18n.t('global.close'),
              onPress: () => {
                Actions.jump('myPage');
              },
            },
          ],
          { cancelable: false },
        );
      }
    }
  }

  onChangeCurrent(param) {
    this.setState({ currentPassword: param });
  }

  onChangeNew(param) {
    this.setState({ newPassword: param });
  }

  onChangeCheck(param) {
    this.setState({ checkPassword: param });
  }

  onClickGoBack() {
    if (!this.props.disabled) {
      Actions.pop();
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <BaseHeaderApp
          title={RootStore.i18n.t('change-password.title')}
          isClose
          color={COLOR.GREY80}
          rightIconType={null}
          leftIconStyle={{ tintColor: COLOR.appColor }}
        />

        <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }}>
          <View style={{ alignItems: 'center', marginTop: 60 * HEIGHT_SCALE_RATIO }}>
            <Image
              source={ICON.LOCK_ICON2}
              style={{
                height: 96 * HEIGHT_SCALE_RATIO,
                width: 96 * WIDTH_SCALE_RATIO,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              padding: 16 * WIDTH_SCALE_RATIO,
              marginTop: 40 * HEIGHT_SCALE_RATIO,
            }}>
            <View
              style={{
                marginTop: 16 * WIDTH_SCALE_RATIO,
                height: 70 * HEIGHT_SCALE_RATIO,
              }}>
              <PText style={[style.textSubTitle, { padding: 4 * WIDTH_SCALE_RATIO }]}>
                {RootStore.i18n.t('change-password.current')}
              </PText>
              <TextInput
                ref={(input) => (this.onChangeCurrent = input)}
                placeholderStyle={[style.textSubTitle, { color: COLOR.GREY80 }]}
                placeholder="******"
                onChangeText={this.onChangeTextPassword()}
                returnKeyType="next"
                secureTextEntry
                autoCapitalize="none"
                style={styles.inputDataForm}
                onSubmitEditing={this.onSubmitEditingPassword()}
              />
            </View>
            <View
              style={{
                marginTop: 20 * WIDTH_SCALE_RATIO,
                height: 70 * HEIGHT_SCALE_RATIO,
              }}>
              <PText style={[style.textSubTitle, { padding: 4 * WIDTH_SCALE_RATIO }]}>
                {RootStore.i18n.t('change-password.new')}
              </PText>
              <TextInput
                ref={(input) => (this.onChangeNew = input)}
                placeholderStyle={[style.textSubTitle, { color: COLOR.GREY80 }]}
                placeholder="******"
                onChangeText={this.onChangeTextPasswordNew()}
                returnKeyType="next"
                secureTextEntry
                autoCapitalize="none"
                style={styles.inputDataForm}
                onSubmitEditing={this.onSubmitEditingPasswordNew()}
              />
            </View>
            <View
              style={{
                marginTop: 20 * WIDTH_SCALE_RATIO,
                height: 70 * HEIGHT_SCALE_RATIO,
              }}>
              <PText style={[style.textSubTitle, { padding: 4 * WIDTH_SCALE_RATIO }]}>
                {RootStore.i18n.t('change-password.check')}
              </PText>
              <TextInput
                ref={(input) => (this.onChangeCheck = input)}
                placeholderStyle={[style.textSubTitle, { color: COLOR.GREY80 }]}
                placeholder="******"
                onChangeText={this.onChangeTextEditingPasswordCheck()}
                returnKeyType={'done'}
                secureTextEntry
                autoCapitalize="none"
                style={styles.inputDataForm}
                onSubmitEditing={this.onSubmitEditingPasswordCheck()}
              />
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View
              style={[
                style.buttonOutline,
                {
                  borderRadius: style.buttonOutline.borderRadius * 5,
                  marginTop: 80 * HEIGHT_SCALE_RATIO,
                  marginBottom: 51 * WIDTH_SCALE_RATIO,
                  height: 32 * HEIGHT_SCALE_RATIO,
                  paddingHorizontal: 26 * WIDTH_SCALE_RATIO,
                },
              ]}>
              <TouchableOpacity onPress={this.onChangePassword()}>
                <PText style={[ptText.BODY2, { color: COLOR.appColor }]}>
                  {RootStore.i18n.t('change-password.change')}
                </PText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  onChangePassword() {
    return () => {
      this.onClickChangePassword();
    };
  }

  onSubmitEditingPasswordCheck() {
    return () => this.onClickChangePassword();
  }

  onChangeTextEditingPasswordCheck() {
    return (input) => {
      this.setState({ checkPassword: input });
    };
  }

  onSubmitEditingPasswordNew() {
    return () => {
      this.onChangeCheck.focus();
    };
  }

  onSubmitEditingPassword() {
    return () => {
      this.onChangeNew.focus();
    };
  }

  onChangeTextPasswordNew() {
    return (input) => {
      this.setState({ newPassword: input });
    };
  }

  onChangeTextPassword() {
    return (input) => {
      this.setState({ currentPassword: input });
    };
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  inputDataForm: {
    width: '100%',
    color: 'black',
    padding: 3 * HEIGHT_SCALE_RATIO,
    borderBottomWidth: 1,
    borderColor: COLOR.appBorderColor,
  },
});
