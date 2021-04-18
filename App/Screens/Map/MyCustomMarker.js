import React from 'react';
import { Image, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { WIDTH_SCALE_RATIO } from '../../Constant/constant';
import { ICON } from '../../../asset/image/ImagePath';
export default class MyCustomMarker extends React.PureComponent {
  state = {
    tracksViewChanges: false,
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.coordinate !== this.props.coordinate || //* set true only when props changed
      prevProps.like !== this.props.like ||
      prevProps.isReserved !== this.props.isReserved
    ) {
      this.setState({ tracksViewChanges: true });
    } else if (this.state.tracksViewChanges) {
      //* set to false immediately after rendering with tracksViewChanges is true
      this.setState({ tracksViewChanges: false });
    }
  }

  onPress = () => {
    if (this.props.onMarkerPress) {
      this.props.onMarkerPress(this.props.marker);
    }
  };

  renderMarkerContent = () => {
    const { isFocused, marker, categorySourceImage, like, isReserved } = this.props;
    if (isReserved) {
      return (
        <Image
          style={{
            tintColor: '#fdca04',
            width: 15 * WIDTH_SCALE_RATIO,
            height: 15 * WIDTH_SCALE_RATIO,
          }}
          defaultSource={ICON.MAP_TAG_YELLOW}
          source={ICON.MAP_TAG_YELLOW}
        />
      );
    } else if (like) {
      return (
        <Image
          style={{
            tintColor: 'red',
            width: 15 * WIDTH_SCALE_RATIO,
            height: 13 * WIDTH_SCALE_RATIO,
          }}
          defaultSource={ICON.MAP_HEART}
          source={ICON.MAP_HEART}
        />
      );
    }
    return (
      <View>
        <Image
          style={{
            tintColor: isFocused ? 'yellow' : '#00c6a0',
            width: 25 * WIDTH_SCALE_RATIO,
            height: 33 * WIDTH_SCALE_RATIO,
          }}
          defaultSource={ICON.MAP_MARKER_LOCATION}
          source={ICON.MAP_MARKER_LOCATION}
        />
        <Image
          progressiveRenderingEnabled
          style={{
            position: 'absolute',
            top: 7.5 * WIDTH_SCALE_RATIO,
            left: 8.5 * WIDTH_SCALE_RATIO,
            tintColor: 'white',
            width: 8.5 * WIDTH_SCALE_RATIO,
            height: 11 * WIDTH_SCALE_RATIO,
          }}
          onError={(err) => {
            console.log('29148 cai hinjh nay bi loi :', marker, err);
          }}
          key={categorySourceImage}
          source={categorySourceImage}
          defaultSource={categorySourceImage}
        />
      </View>
    );
  };

  render() {
    const { marker, categorySourceImage } = this.props;
    return (
      <Marker.Animated
        identifier={`${marker.code} ${marker.like} ${marker.isReserved} ${categorySourceImage}`}
        key={`${marker.code} ${marker.like} ${marker.isReserved} ${categorySourceImage}`}
        coordinate={marker}
        style={{ zIndex: marker.code }}
        tracksViewChanges={this.state.tracksViewChanges}
        onPress={this.onPress}>
        {this.renderMarkerContent()}
      </Marker.Animated>
    );
  }
}
