import { Button } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PText from '../Components/PText';
import RootStore from '../Stores/RootStore';
import { COLOR } from '../Constants/styles';
import { IMAGE } from '../../asset/image/ImagePath';
export default class ReserveComplete extends Component {
  constructor(props) {
    super(props);

    let result = true;
    let message = RootStore.i18n.t('payment.success', { name: this.props.spotName });
    let errorMessage = '';
    if (this.props.result === false) {
      result = false;
      message = RootStore.i18n.t('payment.fail', { name: this.props.spotName });
      errorMessage = `${this.props.errorMessage}`;
    }

    this.state = {
      result,
      message,
      errorMessage,
    };

    this.onClickGoReserve = this.onClickGoReserve.bind(this);
    this.onClickGoBack = this.onClickGoBack.bind(this);
  }

  onClickGoReserve() {
    Actions.reset('myPage');
  }

  onClickGoBack() {
    if (!this.props.endGoBack) {
      Actions.reset('myPage');
    } else {
      Actions.reset('myPage');
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.background}>
          <View style={styles.messageBox}>
            <Image
              source={IMAGE.RESERVATION_IMAGE}
              style={{ position: 'absolute', top: -25, width: 50, height: 50, borderRadius: 25 }}
            />
            <PText>{this.state.message}</PText>
            <PText style={{ marginTop: 10, color: '#3b3b3b', fontSize: RootStore.fontSize(2.4) }}>
              {this.state.errorMessage}
            </PText>
            {this.state.result && (
              <Button small onPress={this.onClickGoReserve} style={styles.button}>
                <PText style={styles.buttonText}>
                  {RootStore.i18n.t('payment.payment-complete')}
                </PText>
              </Button>
            )}
            {!this.state.result && (
              <Button small onPress={this.onClickGoBack} style={styles.button}>
                <PText style={styles.buttonText}>
                  {RootStore.i18n.t('payment.payment-fail-retry')}
                </PText>
              </Button>
            )}
          </View>
        </View>
      </View>
    );
  }
}

ReserveComplete.propTypes = {
  spotCode: PropTypes.number,
  reserveCode: PropTypes.number,
  spotName: PropTypes.string,
  result: PropTypes.bool,
  errorMessage: PropTypes.string,
  endGoBack: PropTypes.bool,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: COLOR.PRIMARY,
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  messageBox: {
    width: '80%',
    height: '40%',
    borderRadius: 4,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 10,
  },
  buttonText: {
    fontSize: RootStore.fontSize(2.8),
    fontWeight: '400',
    color: '#fff',
  },
});
