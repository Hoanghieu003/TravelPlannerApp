import React from 'react';
import { Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { HEIGHT } from '../Constant/constant';

const injectedScript = function () {
  window.ReactNativeWebView.postMessage(
    `_webview_height_${Math.max(
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.body.clientHeight,
      document.body.scrollHeight,
    )}`,
    // `_webview_height_${document.documentElement.clientHeight}`,
    // `_webview_height_${document.documentElement.scrollHeight}`,
    // `_webview_height_${document.body.clientHeight}`,
    // `_webview_height_${document.body.scrollHeight}`,
  );
};

export default class WebViewAutoHeight extends React.PureComponent {
  state = {
    webViewHeight: Number,
  };

  static defaultProps = {
    autoHeight: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      webViewHeight: HEIGHT,
    };

    this.isLoading = true;
    this._onMessage = this._onMessage.bind(this);
    this.onLoadEnd = this.onLoadEnd.bind(this);
    this.self = this.props.this;
  }

  _onMessage(e) {
    if (
      e &&
      e.nativeEvent &&
      e.nativeEvent.data &&
      e.nativeEvent.data.indexOf('_webview_height_') >= 0
    ) {
      const height = parseInt(e.nativeEvent.data.replace('_webview_height_', ''));
      if (height > 0 && this.state.webViewHeight < height) {
        this.setState({
          webViewHeight: height,
        });
      }
    }
  }

  onLoadEnd() {
    this.isLoading = false;
  }

  render() {
    const _w = this.props.width || Dimensions.get('window').width;
    const _h = this.props.autoHeight ? this.state.webViewHeight : HEIGHT;
    return (
      <WebView
        ref={(ref) => {
          this.webview = ref;
        }}
        injectedJavaScript={`(${String(injectedScript)})();`}
        scrollEnabled={this.props.scrollEnabled || false}
        onMessage={this._onMessage}
        javaScriptEnabled
        automaticallyAdjustContentInsets={true}
        onLoadEnd={this.onLoadEnd}
        {...this.props}
        style={[{ width: _w }, this.props.style, { height: _h }]}
      />
    );
  }
}
