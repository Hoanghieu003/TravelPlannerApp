import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Util from '../../Common/Util';
import GoBackButton from '../Components/GoBackButton';

const LATITUDE_DELTA = 0.0015;
const LONGITUDE_DELTA = 0.0015;

const default_location = {
  latitude: 37.561641,
  longitude: 126.992382,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default class SpotMap extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      location: default_location,
      paddingBottom: Util.getIOSPadding('bottom'),
    };
  }

  componentDidMount() {
    const location = {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    this.setState({ location });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          region={this.state.location}>
          <Marker
            coordinate={{ latitude: this.props.latitude, longitude: this.props.longitude }}
            color={'#F26F6D'}
          />
        </MapView>

        <GoBackButton customStyle={styles.overlapGoBack} />
      </View>
    );
  }
}

SpotMap.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlapGoBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
  },
});
