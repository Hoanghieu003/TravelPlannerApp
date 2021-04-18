import { Picker } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import Const from '../../Common/Const';
import RootStore from '../Stores/RootStore';

export default class LanguageDropDown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      languages: Object.values(Const.Language),
      language: RootStore.language,
    };
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
  }
  onChangeLanguage(param) {
    this.setState({ language: param }, async () => {
      await store.update('language', param);
      RootStore.setLanguage(param);
      Actions.replace('load');
    });
  }
  render() {
    return (
      <Picker
        mode="dropdown"
        selectedValue={this.state.language}
        onValueChange={this.onChangeLanguage}
        textStyle={{ fontSize: RootStore.fontSize(2.8), fontWeight: '400' }}
        style={{ color: '#767676' }}>
        {this.state.languages.map((v, i) => (
          <Picker.Item label={v.view} value={v.code} key={`language-${i}`} />
        ))}
      </Picker>
    );
  }
}

LanguageDropDown.propTypes = {
  select: PropTypes.func,
};
