/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { Bar } from './Bar';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../../Constant/constant';

const FULL_HEIGHT = Dimensions.get('window').height;
const FULL_WIDTH = Dimensions.get('window').width;
const CONTAINER_HEIGHT = FULL_HEIGHT - 180 * HEIGHT_SCALE_RATIO;

export default class SwipeablePanel extends React.PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    fullWidth: PropTypes.bool,
    onPressCloseButton: PropTypes.func,
    noBackgroundOpacity: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      opacity: new Animated.Value(0),
      canScroll: false,
      status: 0, // {0: close, 1: small, 2: large}
    };
    this.pan = new Animated.ValueXY({ x: 0, y: FULL_HEIGHT });
    this.oldPan = { x: 0, y: 0 };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (this.state.status == 1) {
          this.pan.setOffset({ x: this.pan.x._value, y: FULL_HEIGHT * 0.25 });
        } else if (this.state.status == 2) {
          this.pan.setOffset({ x: this.pan.x._value, y: 0 });
        }
        this.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (evt, gestureState) => {
        const currentTop = this.pan.y._offset + gestureState.dy;
        if (currentTop > 0) this.pan.setValue({ x: 0, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, { vx, vy }) => {
        this.pan.flattenOffset();

        const distance = this.oldPan.y - this.pan.y._value;
        const absDistance = Math.abs(distance);

        if (this.state.status == 2) {
          if (absDistance > 0 && absDistance < 100 * HEIGHT_SCALE_RATIO)
            this._animateToLargePanel();
          else if (
            absDistance > 100 * HEIGHT_SCALE_RATIO &&
            absDistance < CONTAINER_HEIGHT - 200 * HEIGHT_SCALE_RATIO
          ) {
            this._animateToSmallPanel();
          } else if (CONTAINER_HEIGHT - 200 * HEIGHT_SCALE_RATIO < absDistance) {
            this._animateClosingAndOnCloseProp();
          }
        } else if (distance < -100 * HEIGHT_SCALE_RATIO) this._animateClosingAndOnCloseProp(false);
        else if (distance > 0 && distance > 50 * HEIGHT_SCALE_RATIO) this._animateToLargePanel();
        else this._animateToSmallPanel();
      },
    });
  }

  componentDidMount = () => {};

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isActive != this.props.isActive) {
      if (this.props.isActive) {
        if (this.props.openLarge) this.openLarge();
        else this.openDetails();
      } else this.closeDetails(true);
    }
  }

  onPressCloseButton = () => {
    this._animateClosingAndOnCloseProp(true);
  };

  _animateToLargePanel = () => {
    Animated.spring(this.pan, {
      toValue: { x: 0, y: 0 },
      easing: Easing.bezier(0.05, 1.35, 0.2, 0.95),
      duration: 200,
      useNativeDriver: true,
    }).start();
    this.setState({ canScroll: true, status: 2 });
    this.oldPan = { x: 0, y: 0 };
  };

  _animateToSmallPanel = () => {
    Animated.spring(this.pan, {
      toValue: { x: 0, y: FULL_HEIGHT * 0.25 },
      easing: Easing.bezier(0.05, 1.35, 0.2, 0.95),
      duration: 300,
      useNativeDriver: true,
    }).start();
    this.setState({ status: 1 });
    this.oldPan = { x: 0, y: FULL_HEIGHT * 0.25 };
  };

  openLarge = () => {
    this.setState({ showComponent: true, status: 2, canScroll: true });
    Animated.parallel([
      Animated.timing(this.pan, {
        toValue: { x: 0, y: 0 },
        easing: Easing.bezier(0.05, 1.35, 0.2, 0.95),
        duration: 500,
        useNativeDriver: true,
      }).start(),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        easing: Easing.bezier(0.5, 0.5, 0.5, 0.5),
        duration: 300,
        useNativeDriver: true,
      }).start(),
    ]);
    this.oldPan = { x: 0, y: 0 };
  };

  openDetails = () => {
    this.setState({ showComponent: true, status: 1 });
    Animated.parallel([
      Animated.timing(this.pan, {
        toValue: { x: 0, y: FULL_HEIGHT * 0.25 },
        easing: Easing.bezier(0.05, 1.35, 0.2, 0.95),
        duration: 500,
        useNativeDriver: true,
      }).start(),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        easing: Easing.bezier(0.5, 0.5, 0.5, 0.5),
        duration: 300,
        useNativeDriver: true,
      }).start(),
    ]);
    this.oldPan = { x: 0, y: FULL_HEIGHT * 0.25 };
  };

  closeDetails = isCloseButtonPress => {
    Animated.parallel([
      Animated.timing(this.pan, {
        toValue: { x: 0, y: FULL_HEIGHT },
        easing: isCloseButtonPress ? Easing.bezier(0.98, -0.11, 0.44, 0.59) : Easing.linear,
        duration: this.state.status == 2 ? 500 : 300,
        useNativeDriver: true,
      }).start(),
      Animated.timing(this.state.opacity, {
        toValue: this.state.status == 1 ? 0 : 1,
        easing: Easing.bezier(0.5, 0.5, 0.5, 0.5),
        duration: this.state.status == 2 ? 500 : 300,
        useNativeDriver: true,
      }).start(),
    ]);

    setTimeout(
      () => {
        this.setState({ showComponent: false, canScroll: false, status: 0 });
        if (this.props.onClose != 'undefined' && this.props.onClose) {
          this.props.onClose();
        }
      },
      this.state.status == 2 ? 477 : 250,
    );
  };

  _animateClosingAndOnCloseProp = isCloseButtonPress => {
    this.closeDetails(isCloseButtonPress);
  };

  render() {
    const { showComponent, opacity } = this.state;
    const { noBackgroundOpacity } = this.props;

    return showComponent ? (
      <Animated.View
        style={[
          SwipeablePanelStyles.background,
          {
            opacity,
            backgroundColor: noBackgroundOpacity ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.2)',
          },
        ]}>
        <Animated.View
          onPress={this.props.onPressButton}
          style={[
            {
              position: 'absolute',
              right: 20,
              top: 120 * HEIGHT_SCALE_RATIO,
              flex: 1,
            },
            { transform: this.pan.getTranslateTransform(), zIndex: 9999999 },
          ]}>
          {this.props.button}
        </Animated.View>
        <Animated.View
          style={[
            SwipeablePanelStyles.container,
            { width: this.props.fullWidth ? FULL_WIDTH : FULL_WIDTH * 0.9 },
            { transform: this.pan.getTranslateTransform() },
          ]}
          {...this._panResponder.panHandlers}>
          <Bar />
          {/* {this.props.onPressCloseButton && (
            <Close onPress={this.onPressCloseButton} />
          )} */}
          <ScrollView contentContainerStyle={{ width: '100%' }}>
            {this.state.canScroll ? (
              <TouchableHighlight>
                <React.Fragment>{this.props.children}</React.Fragment>
              </TouchableHighlight>
            ) : (
              this.props.children
            )}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    ) : null;
  }
}

const SwipeablePanelStyles = StyleSheet.create({
  background: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: FULL_WIDTH,
    height: FULL_HEIGHT,
  },
  container: {
    padding: 16 * HEIGHT_SCALE_RATIO,
    position: 'absolute',
    height: CONTAINER_HEIGHT,
    width: FULL_WIDTH * 0.9,
    transform: [{ translateY: FULL_HEIGHT - 100 * HEIGHT_SCALE_RATIO }],
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    bottom: 0,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    zIndex: 2,
  },
});
