import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ICON } from '../../asset/image/ImagePath';

export default class GoBackButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickGoBack = this.onClickGoBack.bind(this);
  }
  onClickGoBack() {
    if (!this.props.disabled) {
      Actions.pop();
    }
  }
  render() {
    return (
      <TouchableOpacity style={[styles.box, this.props.customStyle]} onPress={this.onClickGoBack}>
        <Image source={ICON.GO_BACK_ICON} style={[styles.image, this.props.customImageStyle]} />
      </TouchableOpacity>
    );
  }
}
GoBackButton.propTypes = {
  customStyle: PropTypes.object,
  customImageStyle: PropTypes.object,
  disabled: PropTypes.bool,
};
const styles = StyleSheet.create({
  box: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  image: {
    width: 10,
    height: 18,
  },
});
