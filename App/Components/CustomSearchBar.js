import { observer } from 'mobx-react';
import { Icon, View } from 'native-base';
import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';
import { FlatList, Image, TextInput } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { WIDTH, WIDTH_SCALE_RATIO, HEIGHT_SCALE_RATIO } from '../Constant/constant';
import style, {
  COLOR,
  fontSize,
  FS,
  iconSize,
  ptShadow,
  textInputHeight,
  ptText,
} from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import TagStore from '../Stores/TagStore';
import MyTouchableOpacity from './MyTouchableOpacity';
import PText from './PText';
import { ICON, IMAGE } from '../../asset/image/ImagePath';
import { Actions } from 'react-native-router-flux';

@observer
class CustomSearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: this.props.initialSearchText ? this.props.initialSearchText : '',
      city: '',
      hideMenu: this.props.isHomePage,
      autoFocusState: false,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onClickGoSearch = this.onClickGoSearch.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onCloseSearch = this.onCloseSearch.bind(this);
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.setState({
        autoFocusState: true,
      });
    }
  }

  onChangeCity(selectedCity) {
    if (this.props.onChangeCity) {
      this.props.onChangeCity(selectedCity);
    }
  }

  onChangeText(text) {
    clearTimeout(this.timeoutText);
    this.setState({ search: text });
    if (this.props.onTextChanged) {
      if (text === '') {
        this.props.onTextChanged('');
      } else {
        this.timeoutText = setTimeout(() => this.props.onTextChanged(text), 200);
      }
    }
  }

  onClickGoSearch() {
    if (this.props.onClickGoSearch) {
      this.props.onClickGoSearch();
    }
  }

  onCloseSearch() {
    if (this.props.onCloseSearch) {
      this.setState({ search: '' });
      // this.props.onCloseSearch();
    }
  }

  onClearText() {
    this.setState({ search: '' });
    if (this.props.onTextChanged) {
      this.props.onTextChanged('');
    }
  }

  onHideMenu = () => this.setState({ hideMenu: true });

  onShowMenu = () => this.setState({ hideMenu: false });

  render() {
    const { hideMenu } = this.state;
    const { searchPlaceHolderText, hideClearSearch, isHomePage, isFromSearch } = this.props;

    const selectedCityName =
      TagStore.getSelectedCityObj && TagStore.getSelectedCityObj.cityName
        ? TagStore.getSelectedCityObj.cityName
        : RootStore.i18n.t('home.search-city');

    return (
      <View
        style={[
          isHomePage || isFromSearch ? ptShadow.BLUR0 : null,
          style.center,
          // style.input,
          {
            marginHorizontal: 3 * WIDTH_SCALE_RATIO,
            alignItems: 'center',
            paddingHorizontal: 0,
            paddingRight: isHomePage || isFromSearch ? 0 : 12 * WIDTH_SCALE_RATIO,
            // marginVertical: 0,
            flexDirection: 'row',
            width: isHomePage ? WIDTH * 0.9 : isFromSearch ? WIDTH * 0.95 : WIDTH,
            backgroundColor: COLOR.WHITE,
            // overflow: 'hidden',
            borderRadius: isFromSearch || isHomePage ? textInputHeight : null,
          },
        ]}>
        {/* --------------------------Menu-------------------------- */}
        {isHomePage ? (
          <Fragment />
        ) : // !hideMenu &&
        this.props.isFromSearch ? (
          <MyTouchableOpacity onPress={() => Actions.home()}>
            <Image
              source={IMAGE.logo}
              style={{
                width: 30 * WIDTH_SCALE_RATIO,
                height: 30 * WIDTH_SCALE_RATIO,
                borderRadius: 40 * WIDTH_SCALE_RATIO,
                // tintColor: COLOR.GREY40,
                // backgroundColor: 'red',
                marginLeft: 4 * WIDTH_SCALE_RATIO,
                marginRight: 16 * WIDTH_SCALE_RATIO,
              }}
              resizeMode="contain"
            />
          </MyTouchableOpacity>
        ) : (
          <MyTouchableOpacity
            onPress={() => {
              if (this.props.onCloseSearch) {
                this.props.onCloseSearch();
              }
            }}>
            <Image
              source={ICON.GO_BACK_ARROW_ICON}
              style={{
                width: iconSize,
                height: iconSize,
                tintColor: COLOR.GREY40,
                // backgroundColor: 'red',
                marginHorizontal: 16 * WIDTH_SCALE_RATIO,
              }}
              resizeMode="contain"
            />
          </MyTouchableOpacity>
        )}
        {/* ------------------------Input---------------------------- */}
        <TextInput
          onTouchEnd={() => {
            this.onShowMenu();
            if (this.props.onFocusFunc) {
              this.props.onFocusFunc(this.state.search);
            }
          }}
          ref={(input) => {
            this.searchInput = input;
          }}
          editable={!isHomePage && !isFromSearch}
          value={this.state.search}
          autoFocus={this.state.autoFocusState}
          onFocus={() => {
            console.log('ahihihi');
            this.onShowMenu();
            if (this.props.onFocusFunc) {
              this.props.onFocusFunc(this.state.search);
            }
          }}
          autoCorrect={false}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onClickGoSearch}
          placeholder={
            this.props.isHomePage || this.props.isFromSearch ? searchPlaceHolderText : ''
          }
          returnKeyType="search"
          placeholderTextColor={isHomePage ? COLOR.GREY20 : COLOR.GREY80}
          style={[
            style.input,
            {
              fontSize: FS(fontSize) + 2,
              lineHeight: FS(fontSize) + 5,
              fontFamily: 'Raleway-Regular',
              paddingHorizontal: isHomePage || isFromSearch ? 8 * WIDTH_SCALE_RATIO : 0,
              paddingVertical: 0,
              paddingTop: 0,
              paddingBottom: 0,
              marginTop: 0,
            },
          ]}
        />
        {isFromSearch && (
          <View
            // onPress={this.onClickGoSearch}
            style={{
              height: style.input.height,
              alignItem: 'center',
              justifyContent: 'center',
              paddingRight: 10 * WIDTH_SCALE_RATIO,
            }}>
            <Image
              source={ICON.CLOSE_ICON}
              style={{
                width: iconSize * 0.7,
                height: iconSize * 0.7,
                tintColor: COLOR.GREY20,
              }}
              resizeMode="contain"
            />
          </View>
        )}
        {isHomePage && (
          <View
            // onPress={this.onClickGoSearch}
            style={{
              height: style.input.height,
              alignItem: 'center',
              justifyContent: 'center',
              paddingRight: 10 * WIDTH_SCALE_RATIO,
            }}>
            <Image
              source={ICON.SEARCH_ICON}
              style={{
                width: iconSize,
                height: iconSize,
                tintColor: COLOR.GREY20,
              }}
              resizeMode="contain"
            />
          </View>
        )}

        {this.state.search ? (
          <MyTouchableOpacity
            onPress={() => {
              if (this.props.onClearSearch) {
                this.setState({ search: '' });
                this.props.onClearSearch();
              } else {
                this.onCloseSearch();
              }
            }}
            style={{
              height: style.input.height,
              alignItem: 'center',
              justifyContent: 'center',
              paddingLeft: 10 * WIDTH_SCALE_RATIO,
              paddingRight: 6 * WIDTH_SCALE_RATIO,
            }}>
            <Image
              source={ICON.CLOSE_ICON}
              style={{
                width: 12 * WIDTH_SCALE_RATIO,
                height: 12 * WIDTH_SCALE_RATIO,
                tintColor: COLOR.GREY20,
              }}
              resizeMode="contain"
            />
          </MyTouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

CustomSearchBar.propTypes = {
  initialSearchText: PropTypes.string,
  onChangeCity: PropTypes.func,
  onTextChanged: PropTypes.func,
  onClickGoSearch: PropTypes.func,
  closeSearch: PropTypes.func,
  searchPlaceHolderText: PropTypes.string,
  backgroundColorWhite: PropTypes.string,
  hideClearSearch: PropTypes.bool,
  hideMenu: PropTypes.bool,
  isHomePage: PropTypes.bool,
};

export default CustomSearchBar;
