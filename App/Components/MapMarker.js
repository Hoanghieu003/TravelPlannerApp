import isEqual from 'lodash.isequal';
import React, { PureComponent } from 'react';
import MapView from 'react-native-maps';

type Props = {
  children: React.Node,
};

type State = {
  tracksViewChanges: boolean,
};

export default class MapMarker extends PureComponent<Props, State> {
  state = {
    tracksViewChanges: true,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.setState(() => ({
        tracksViewChanges: true,
      }));
    }
  }

  componentDidUpdate() {
    if (this.state.tracksViewChanges) {
      setTimeout(() => {
        this.setState(() => ({
          tracksViewChanges: false,
        }));
      }, 200);
    }
  }

  render() {
    return (
      <MapView.Marker tracksViewChanges={this.state.tracksViewChanges} {...this.props}>
        {this.props.children}
      </MapView.Marker>
    );
  }
}
