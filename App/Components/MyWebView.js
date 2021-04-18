import React from 'react';
import { ActivityIndicator, Linking, View } from 'react-native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WebView from 'react-native-webview';
import { HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR } from '../Constants/styles';
import MyTouchableOpacity from './MyTouchableOpacity';
import PText from './PText';
export default class MyWebView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      canGoBack: false,
      titleWebView: '',
      url: '',
    };

    this.isLoading = true;
    this.onLoadEnd = this.onLoadEnd.bind(this);
  }
  onLoadEnd() {
    this.isLoading = false;
  }
  extractHostname(url) {
    let matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    return matches && matches[1] && matches[1].replace('www.', '');
  }
  onNavigationStateChange = navState => {
    if (navState && navState.url) {
      console.log('phat: MyWebView -> navState', navState.url);
      console.log('1803phat: MyWebView -> navState', navState.url.includes('bit.ly'));

      if (navState.url.includes('drive.google.com')) {
        Linking.openURL(navState.url);
        this.webView.stopLoading();
      } else {
        this.setState({
          // url: navState.url,
          titleWebView: this.extractHostname(navState.url ? navState.url : ''),
          canGoBack: navState.canGoBack,
        });
      }
    }
  };

  open(url) {
    const titleWebView = this.extractHostname(url ? url : '');
    this.setState({ visible: true, url, titleWebView });
  }

  render() {
    console.log('29148 MyWebView chay cai nay ne nen en e');

    return (
      <Modal
        backdropColor="#fff"
        backdropOpacity={1}
        animationIn="fadeInDown"
        animationInTiming={0}
        animationOutTiming={500}
        isVisible={this.state.visible}
        onRequestClose={() => {
          this.setState({ visible: false });
        }}
        style={{
          margin: 0,
          padding: 0,
          paddingVertical: 20 * HEIGHT_SCALE_RATIO,
          flex: 1,
          backgroundColor: 'white',
        }}>
        {console.log(
          '29148 MyWebView trong modal con chay cai nay nua ne la cai content ben trong a',
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {this.state.canGoBack && (
              <MyTouchableOpacity
                style={{
                  padding: 5 * WIDTH_SCALE_RATIO,
                  paddingLeft: 10 * WIDTH_SCALE_RATIO,
                }}
                onPress={() => {
                  console.log(
                    'phat: MyWebView -> render -> this.webView.goBack()',
                    this.webView.goBack(),
                  );

                  this.webView.goBack();
                }}>
                <MaterialCommunityIcons name="chevron-left" size={25 * WIDTH_SCALE_RATIO} />
              </MyTouchableOpacity>
            )}

            <MyTouchableOpacity
              style={{
                padding: 5 * WIDTH_SCALE_RATIO,
                paddingLeft: this.state.canGoBack ? 0 * WIDTH_SCALE_RATIO : 10 * WIDTH_SCALE_RATIO,
              }}
              onPress={() => {
                this.setState({ visible: false });
              }}>
              <MaterialCommunityIcons name="close" size={25 * WIDTH_SCALE_RATIO} />
            </MyTouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              maxWidth: WIDTH - 30 * WIDTH_SCALE_RATIO * 4.5,
            }}>
            <FontAwesome name="lock" size={style.textCaption.fontSize} color={COLOR.appColor} />
            <PText
              style={[
                style.textSubTitle,
                {
                  paddingLeft: 5 * WIDTH_SCALE_RATIO,
                  color: COLOR.appColor,
                },
              ]}
              numberOfLines={1}>
              {this.state.titleWebView}
            </PText>
          </View>

          <View
            style={{ padding: 5 * WIDTH_SCALE_RATIO, paddingRight: 10 * WIDTH_SCALE_RATIO }}
            onPress={() => {}}>
            <Feather name="more-horizontal" size={23 * WIDTH_SCALE_RATIO} color="transparent" />
          </View>
        </View>
        <WebView
          ref={webView => {
            this.webView = webView;
          }}
          onNavigationStateChange={this.onNavigationStateChange}
          source={{ uri: this.state.url }}
          javaScriptEnabled
          directionalLockEnabled
          thirdPartyCookiesEnabled
          startInLoadingState
          domStorageEnabled
          automaticallyAdjustContentInsets
          onLoadEnd={this.onLoadEnd}
          renderLoading={() => (
            <ActivityIndicator
              size="small"
              color={COLOR.appColor}
              style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            />
            // <SkypeIndicator
            //   color={COLOR.appColor}
            //   size={35 * WIDTH_SCALE_RATIO}
            //   style={{
            //     alignItems: 'center',
            //     justifyContent: 'flex-start',
            //   }}
            // />
          )}
          {...this.props}
        />
      </Modal>
    );
  }
}
