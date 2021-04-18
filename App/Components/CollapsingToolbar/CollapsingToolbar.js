import PropTypes from 'prop-types';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

const propTypes = {
  children: PropTypes.node.isRequired,
  src: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  leftItem: PropTypes.element,
  leftItemPress: PropTypes.func,
  rightItem: PropTypes.element,
  rightItemPress: PropTypes.func,
  toolbarColor: PropTypes.string,
  toolbarMaxHeight: PropTypes.number,
  toolbarMinHeight: PropTypes.number,
};
const defaultProps = {
  leftItem: null,
  leftItemPress: null,
  rightItem: null,
  rightItemPress: null,
  title: 'Home',
  titleColor: '#fff',
  toolbarColor: '#e91e63',
  toolbarMaxHeight: 400,
  toolbarMinHeight: 200,
};

class CollapsingToolbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  render() {
    const {
      children,
      src,
      leftItem,
      leftItemPress,
      rightItem,
      rightItemPress,
      title,
      titleColor,
      toolbarColor,
      toolbarMaxHeight,
      toolbarMinHeight,
      children2,
      headerHide,
    } = this.props;
    const scrollDistance = toolbarMaxHeight - toolbarMinHeight;
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, scrollDistance],
      outputRange: [0, -scrollDistance],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, scrollDistance / 2, scrollDistance],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, scrollDistance],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, scrollDistance / 2, scrollDistance],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    /*
    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, scrollDistance / 2, scrollDistance],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });*/

    return (
      <View style={styles.fill}>
        {/* <StatusBar backgroundColor={'transparent'} translucent /> */}
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
        >
          <View
            style={{
              marginTop: toolbarMaxHeight,
              minHeight: 700,
              backgroundColor: 'red',
            }}
          >
            {children}
          </View>
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.header,
            {
              backgroundColor: toolbarColor,
              height: toolbarMaxHeight,
              transform: [{ translateY: headerTranslate }],
            },
          ]}
        >
          {/* <Animated.Image
            style={[
              styles.backgroundImage,
              {
                height: toolbarMaxHeight,
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={src}
          /> */}
          <Animated.View
            style={[
              styles.backgroundImage,
              {
                height: toolbarMaxHeight,
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
          >
            {headerHide}
            {/* <PText style={[styles.title, { color: titleColor }]}>{title}</PText> */}
          </Animated.View>
        </Animated.View>
        <Animated.View style={styles.bar}>
          {children2}
          <TouchableOpacity onPress={leftItemPress}>
            <View style={styles.left}>{leftItem}</View>
          </TouchableOpacity>
          <TouchableOpacity onPress={rightItemPress}>
            <View style={styles.right}>{rightItem}</View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: 'red',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    position: 'absolute',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    resizeMode: 'cover',
  },
  action: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    position: 'absolute',
  },
  bar: {
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  left: {
    top: 0,
    left: 0,
    width: 50,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    top: 0,
    right: 0,
    height: 56,
    minWidth: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Roboto_medium',
    fontSize: 25,
  },
  scrollViewContent: {
    paddingTop: 30,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
CollapsingToolbar.propTypes = propTypes;
CollapsingToolbar.defaultProps = defaultProps;
export default CollapsingToolbar;
