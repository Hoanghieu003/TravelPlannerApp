/* eslint-disable global-require */
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { HEIGHT_SCALE_RATIO } from '../Constant/constant';
import { COLOR } from '../Constants/styles';
import { IMAGE } from '../../asset/image/ImagePath';

class MyImage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
    };
  }

  render() {
    const { circle, defaultSource, style, source } = this.props;
    const { isLoading, isError } = this.state;
    const temp =
      source &&
      source.uri &&
      source.uri !== '' &&
      source.uri.includes('http') &&
      source.uri.includes('.jpg');

    return (
      <View style={{}}>
        {isLoading && !isError && (
          <View
            style={[
              {
                borderRadius: circle ? style.height / 2 || 5 * HEIGHT_SCALE_RATIO : null,
                position: 'absolute',
                backgroundColor: `${COLOR.appColor}15`,
                opacity: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                flex: 1,
              },
              style,
            ]}>
            <ActivityIndicator
              size="small"
              color={`${COLOR.appColor}80`}
              style={{ paddingVertical: 10 * HEIGHT_SCALE_RATIO }}
            />
          </View>
        )}
        {source &&
        source.uri &&
        source.uri !== '' &&
        source.uri.includes('http') &&
        source.uri.includes('.jpg') ? (
          <Image
            resizeMode={FastImage.resizeMode.cover}
            source={
              source &&
              source.uri &&
              source.uri !== null &&
              source.uri !== '' &&
              source.uri.includes('http')
                ? { uri: source.uri }
                : defaultSource || IMAGE.UNAVAILABLE_IMG
            }
            onLoadStart={() => this.setState({ isLoading: true })}
            onLoadEnd={() => this.setState({ isLoading: false })}
            onError={() => this.setState({ isError: true })}
            {...this.props}
            style={[
              {
                backgroundColor: 'transparent',
                borderRadius: circle ? style.height / 2 || 5 * HEIGHT_SCALE_RATIO : null,
              },
              style,
            ]}
          />
        ) : (
          <Image
            source={
              this.props.profilePicture
                ? IMAGE.DEFAULT_PROFILE_IMAGE
                : defaultSource || IMAGE.UNAVAILABLE_IMG
            }
            resizeMode="cover"
            onLoadStart={() => this.setState({ isLoading: true })}
            onLoadEnd={() => this.setState({ isLoading: false })}
            onError={() => this.setState({ isError: true })}
            {...this.props}
            style={[
              {
                backgroundColor: 'transparent',
                opacity: this.props.profilePicture ? 0.8 : 1,

                borderRadius: circle ? style.height / 2 || 5 * HEIGHT_SCALE_RATIO : null,
              },
              style,
            ]}
          />
        )}

        {isError && (
          <Image
            source={
              this.props.profilePicture
                ? IMAGE.DEFAULT_PROFILE_IMAGE
                : defaultSource || IMAGE.UNAVAILABLE_IMG
            }
            style={[
              {
                borderRadius: circle ? style.height / 2 || 5 * HEIGHT_SCALE_RATIO : null,
                position: 'absolute',
                backgroundColor: `${COLOR.appColor}15`,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                flex: 1,
              },
              style,
            ]}
          />
        )}
      </View>
    );
  }
}
MyImage.propTypes = {
  circle: PropTypes.bool,
  hideIndicator: PropTypes.bool,
};
export default MyImage;
