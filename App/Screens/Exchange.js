import analytics from '@react-native-firebase/analytics';
import moment from 'moment';
import { Input } from 'native-base';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Actions } from 'react-native-router-flux';
import getExchange from '../../Common/gql/queries/getExchange.gql';
import getSpotInfo from '../../Common/gql/queries/getSpot.gql';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, IS_IOS, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, {
  COLOR,
  fontSize,
  FS,
  heightBottomBar,
  ptColor,
  ptFont,
  ptText,
} from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import { IMAGE, ICON } from '../../asset/image/ImagePath';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import Const from '../../Common/Const';
// import { Icon } from 'react-native-vector-icons/Icon';

export default class Exchange extends React.PureComponent {
  constructor(props) {
    super(props);
    //* fix Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    this._isMounted = false;
    this.state = {
      exchange: [],
      nameMoney: [],
      dataPicker: [
        { label: 'TWD', value: 'zh-TW' },
        { label: 'HKD', value: 'zh-HK' },
        { label: 'SGD', value: 'zh-CN' },
        { label: 'USD', value: 'en' },
        { label: 'JPY', value: 'jp' },
        { label: 'THB', value: 'th' },
      ],
      sellPrice: [],
      update: '',
      convertedValue: '0.00',
      moneyBeExchange: RootStore.language,
      currency: '',
      resultExchange: 'ko',
      text: '1.00',
      text2: null,
    };

    this.convertCurrency = this.convertCurrency.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    //* fix Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    this._isMounted = true;
    analytics().setCurrentScreen('Currency-Exchange');
    this.search();
  }
  componentWillUnmount() {
    //* fix Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    this._isMounted = false;
  }
  render() {
    if (!this.state.sellPrice || this.state.sellPrice.length === 0) {
      return <View />;
    }
    return (
      <ScrollView
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <BaseHeaderWithSearch
          ref={(instance) => (this.baseHeaderWithSearchRef = instance)}
          backgroundColorWhite
          // showSuggest
          showBack
          postType={Const.PostType.Blog.code}
          color={COLOR.appColor}
          isFromTravelInfo={true}
          onChangeKeyword={null}
          onShowSearch={this.onOpenSearchFunc}
        />
        <View
          style={{
            paddingLeft: 16 * WIDTH_SCALE_RATIO,
            paddingRight: 24 * WIDTH_SCALE_RATIO,
            paddingTop: 50 * HEIGHT_SCALE_RATIO,
          }}>
          {this.renderCurrencyRate()}
          {this.renderExchangeShopRate()}
        </View>
        <View style={{ height: heightBottomBar + 30 * HEIGHT_SCALE_RATIO }} />
      </ScrollView>
    );
  }

  onMoneyBeExchangeChange(value) {
    this.setState(
      {
        moneyBeExchange: value,
      },
      () => {
        let newNumber = 0;
        if (this.state.text) {
          try {
            newNumber = +this.state.text;
          } catch (e) {}
        }
        const newConvertedValue = this.convertCurrency(newNumber);

        this.setState({
          convertedValue: newConvertedValue.toString(),
        });
      },
    );
  }

  oneResultExchangeChange(value) {
    this.setState(
      {
        resultExchange: value,
      },
      () => {
        //
        let newNumber = 0;
        if (this.state.text) {
          try {
            newNumber = +this.state.text;
          } catch (e) {}
        }
        const newConvertedValue = this.convertCurrency(newNumber);

        this.setState({
          convertedValue: newConvertedValue.toString(),
        });
      },
    );
  }

  async search() {
    try {
      const result = await RootStore.client.query({ query: getExchange });
      const exchange = result.data.getExchange;
      let update = exchange && exchange.length ? exchange[0].updated_at : moment().valueOf();
      exchange.forEach((e) => {
        if (e && e.updated_at) {
          const mmUpdate = moment(update);
          const mmNewTime = moment(e.updated_at);
          if (mmUpdate && mmNewTime && mmNewTime.isAfter(mmUpdate)) {
            update = e.updated_at;
          }
        }
      });
      // 팔때 s 살때는 b
      this.getCurrencySymbolByPickerKey();
      this.setState({ update });
      const tempExchange = [];
      const tempSellPrice = [];
      const tempNameMoney = [];
      for (let i = 0; i < exchange.length; i++) {
        let found = false;
        tempExchange.push(exchange[i]);
        tempSellPrice.push(JSON.parse(exchange[i].sell_price));
        for (let j = 0; j < exchange[i].translations.length; j++) {
          if (exchange[i].translations[j].language === RootStore.language) {
            found = true;
            tempNameMoney.push(exchange[i].translations[j].name);
          }
        }
        if (!found && exchange[i].translations[0]) {
          tempNameMoney.push(exchange[i].translations[0].name);
        }
      }
      this.setState(
        {
          exchange: tempExchange,
          nameMoney: tempNameMoney,
          sellPrice: tempSellPrice,
        },
        () => {
          console.log('bambi state hien tai cua nameMoney', tempExchange);
        },
      );
    } catch (error) {}
  }

  toDate(timestamp, dateOnly = true) {
    const format = 'YYYY-MM-DD HH:mm:ss';
    return moment(timestamp).format(format);
  }

  getCurrencySymbolByPickerKey() {
    switch (RootStore.language) {
      case 'ko':
        return this.setState({ currency: 'KRW' });
      case 'zh-TW':
        return this.setState({ currency: 'TWD' });
      case 'zh-CN':
        return this.setState({ currency: 'SGD' });
      case 'en':
        return this.setState({ currency: 'USD' });
      case 'zh-HK':
        return this.setState({ currency: 'HKD' });
      case 'jp':
        return this.setState({ currency: 'JPY' });
      case 'th':
        return this.setState({ currency: 'THB' });
    }

    return '';
  }

  convertCurrency(currencyValue) {
    const myeongdongEmbassyExchange =
      this.state.sellPrice && this.state.sellPrice[2] ? this.state.sellPrice[2] : null;

    if (!myeongdongEmbassyExchange) {
      return currencyValue;
    }

    let currencyValueInKRW = 0;
    switch (this.state.moneyBeExchange) {
      case 'ko':
        currencyValueInKRW = currencyValue;
        break;
      case 'zh-TW':
        currencyValueInKRW = currencyValue * myeongdongEmbassyExchange.twd;
        break;
      case 'zh-CN':
        currencyValueInKRW = currencyValue * myeongdongEmbassyExchange.sgd;
        break;
      case 'en':
        currencyValueInKRW = currencyValue * myeongdongEmbassyExchange.usd;
        break;
      case 'zh-HK':
        currencyValueInKRW = currencyValue * myeongdongEmbassyExchange.hkd;
        break;
      case 'jp':
        currencyValueInKRW = currencyValue * myeongdongEmbassyExchange.jpy;
        break;
      case 'th':
        currencyValueInKRW = currencyValue * myeongdongEmbassyExchange.thb;
        break;
    }

    let finalResult = currencyValue;
    switch (this.state.resultExchange) {
      case 'ko':
        finalResult = currencyValueInKRW;
        break;
      case 'zh-TW':
        finalResult = currencyValueInKRW / myeongdongEmbassyExchange.twd;
        break;
      case 'zh-CN':
        finalResult = currencyValueInKRW / myeongdongEmbassyExchange.sgd;
        break;
      case 'en':
        finalResult = currencyValueInKRW / myeongdongEmbassyExchange.usd;
        break;
      case 'zh-HK':
        finalResult = currencyValueInKRW / myeongdongEmbassyExchange.hkd;
        break;
      case 'jp':
        finalResult = currencyValueInKRW / myeongdongEmbassyExchange.jpy;
        break;
      case 'th':
        finalResult = currencyValueInKRW / myeongdongEmbassyExchange.thb;
        break;
    }
    if (finalResult === Infinity || finalResult === NaN || !finalResult) {
      finalResult = 0;
    }

    return this.numberWithCommas(finalResult.toFixed(2));
  }
  convertCurrency2(currencyValue) {
    const myeongdongEmbassyExchange =
      this.state.sellPrice && this.state.sellPrice[2] ? this.state.sellPrice[2] : null;

    if (!myeongdongEmbassyExchange) {
      return currencyValue;
    }

    let currencyValueInKRW = 0;
    switch (this.state.moneyBeExchange) {
      case 'ko':
        currencyValueInKRW = currencyValue;
        break;
      case 'zh-TW':
        currencyValueInKRW = currencyValue / myeongdongEmbassyExchange.twd;
        break;
      case 'zh-CN':
        currencyValueInKRW = currencyValue / myeongdongEmbassyExchange.sgd;
        break;
      case 'en':
        currencyValueInKRW = currencyValue / myeongdongEmbassyExchange.usd;
        break;
      case 'zh-HK':
        currencyValueInKRW = currencyValue / myeongdongEmbassyExchange.hkd;
        break;
      case 'jp':
        currencyValueInKRW = currencyValue / myeongdongEmbassyExchange.jpy;
        break;
      case 'th':
        currencyValueInKRW = currencyValue / myeongdongEmbassyExchange.thb;
        break;
    }

    let finalResult = currencyValue;
    switch (this.state.resultExchange) {
      case 'ko':
        finalResult = currencyValueInKRW;
        break;
      case 'zh-TW':
        finalResult = currencyValueInKRW * myeongdongEmbassyExchange.twd;
        break;
      case 'zh-CN':
        finalResult = currencyValueInKRW * myeongdongEmbassyExchange.sgd;
        break;
      case 'en':
        finalResult = currencyValueInKRW * myeongdongEmbassyExchange.usd;
        break;
      case 'zh-HK':
        finalResult = currencyValueInKRW * myeongdongEmbassyExchange.hkd;
        break;
      case 'jp':
        finalResult = currencyValueInKRW * myeongdongEmbassyExchange.jpy;
        break;
      case 'th':
        finalResult = currencyValueInKRW * myeongdongEmbassyExchange.thb;
        break;
    }
    if (finalResult === Infinity || finalResult === NaN || !finalResult) {
      finalResult = 0;
    }

    return this.numberWithCommas(finalResult.toFixed(2));
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getSpot = async (spotCode) => {
    try {
      const variables = {
        code: spotCode,
      };

      const result = await RootStore.client.query({
        query: getSpotInfo,
        variables,
      });
      return result.data.getSpot.spot;
    } catch (error) {
      console.log('29148 Exchange >>> getSpot code ' + spotCode + ' error:', error);
      return null;
    }
  };

  onClickMap = (spotCode) => {
    this.getSpot(spotCode)
      .then((newSpot) => {
        //navigate to map with newSpot data
        Actions.push('map', {
          spot: newSpot,
          isFromExchange: true,
        });
      })
      .catch((err) => {});
  };
  onOpenSearchFunc = () => {
    this.setState(
      {
        showSearch: true,
      },
      () => {
        if (this.baseHeaderWithSearchRef) {
          this.baseHeaderWithSearchRef.onTextUpdate();
          if (this.baseHeaderWithSearchRef.searchBarRef) {
            this.baseHeaderWithSearchRef.searchBarRef.setState({
              search: this.state.search,
              autoFocusState: true,
            });
          }
        }
      },
    );
  };

  renderCurrencyRate = () => {
    return (
      <View>
        {this.renderHeaderPart(
          ICON.EXCHANGE_MONEY_ICON,
          RootStore.i18n.t('exchange.bank-currency-rate'),
        )}
        <View
          style={{
            flexDirection: 'row',
            height: 70 * HEIGHT_SCALE_RATIO,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20 * HEIGHT_SCALE_RATIO,
            paddingLeft: 8 * WIDTH_SCALE_RATIO,
            paddingRight: 0,
          }}>
          {this.renderLeftCurrencyRate()}
          <View>
            <PText style={{ fontSize: FS(40), color: COLOR.GREY20 }}>=</PText>
          </View>
          {this.renderRightCurrencyRate()}
        </View>
      </View>
    );
  };

  renderRightCurrencyRate = () => {
    return (
      <View>
        <View
          style={{
            borderBottomWidth: 0.5,
            width: 130 * WIDTH_SCALE_RATIO,
            height: 70 * WIDTH_SCALE_RATIO,
            borderColor: COLOR.GREY40,
            // paddingTop: 5 * HEIGHT_SCALE_RATIO,
          }}>
          <PText style={[ptText.BODY2, ptText.H4, { color: COLOR.GREY40 }]}>KWR</PText>
          {/* <RNPickerSelect
            style={{
              inputIOSContainer: {
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: 8 * WIDTH_SCALE_RATIO,
              },
              inputAndroid: [
                {
                  fontSize: FS(fontSize),
                  lineHeight: FS(fontSize) + 7,
                  fontFamily: ptFont.REGULAR,
                  color: COLOR.GREY80,
                  flex: 1,
                },
              ],
              viewContainer: {
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
              },
              iconContainer: {
                position: IS_IOS ? null : 'absolute',
                left: IS_IOS ? null : 35 * WIDTH_SCALE_RATIO + style.text.fontSize,
                marginTop: 8 * WIDTH_SCALE_RATIO,
              },
            }}
            textInputProps={style.text}
            placeholderTextColor={style.text.color}
            value={this.state.resultExchange}
            Icon={() => {
              return (
                <Image
                  source={ICON.DROPDOWN_ICON}
                  style={{
                    marginTop: 16 * HEIGHT_SCALE_RATIO,
                    marginLeft: 8 * WIDTH_SCALE_RATIO,
                    width: 14 * WIDTH_SCALE_RATIO,
                    height: 14 * WIDTH_SCALE_RATIO,
                    tintColor: 'transparent',
                  }}
                  resizeMode="contain"
                />
              );
            }}
            disabled
            onValueChange={this.oneResultExchangeChange.bind(this)}
            placeholder={{ label: 'KRW', value: 'ko' }}
            items={this.state.dataPicker}
          /> */}
          <Input
            autoFocus={false}
            autoCorrect={false}
            style={[
              ptText.H3,
              ptColor.GREY40,
              {
                marginBottom: 0 * HEIGHT_SCALE_RATIO,
                fontFamily:
                  RootStore.language === 'en' || RootStore.language === 'vi' ? 'Raleway' : 'Roboto',
              },
            ]}
            keyboardType="number-pad"
            numberOfLines={1}
            value={
              this.state.convertedValue === '0.00'
                ? this.convertCurrency(1)
                : this.state.convertedValue
            }
            onChangeText={(text2) => {
              let newNumber = 0;
              if (text2) {
                try {
                  newNumber = +text2;
                } catch (e) {}
              }
              const newConvertedValue = this.convertCurrency2(newNumber);
              this.setState({
                convertedValue: text2,
                text: newConvertedValue.toString(),
              });
            }}
          />
        </View>
      </View>
    );
  };

  renderLeftCurrencyRate = () => {
    return (
      <View
        style={{
          borderBottomWidth: 0.5,
          width: 130 * WIDTH_SCALE_RATIO,
          height: 70 * WIDTH_SCALE_RATIO,
          borderColor: COLOR.GREY40,
        }}>
        <Menu ref="LeftExchangeRate" rendererProps={{ placement: 'bottom' }}>
          <MenuTrigger style={{ justifyContent: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <PText style={[ptText.BODY2, ptText.H4, { color: COLOR.GREY80 }]}>
                {
                  this.state.dataPicker.find((value) => value.value === this.state.moneyBeExchange)
                    ?.label
                }
              </PText>
              <Image
                source={ICON.DROPDOWN_ICON}
                style={{
                  width: 12 * WIDTH_SCALE_RATIO,
                  height: 12 * WIDTH_SCALE_RATIO,
                  marginHorizontal: 16 * WIDTH_SCALE_RATIO,
                  tintColor: COLOR.GREY80,
                }}
                resizeMode="contain"
              />
            </View>
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              borderRadius: 8 * WIDTH_SCALE_RATIO,
              width: 80 * WIDTH_SCALE_RATIO,
              marginTop: 20 * HEIGHT_SCALE_RATIO,
              paddingTop: 0 * HEIGHT_SCALE_RATIO,
            }}>
            <MenuOption disableTouchable style={{}}>
              {this.state.dataPicker.map((v) => {
                return (
                  <MyTouchableOpacity
                    style={{
                      paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
                      paddingVertical: 8 * HEIGHT_SCALE_RATIO,
                    }}
                    onPress={() => {
                      this.onMoneyBeExchangeChange(v.value);
                      this.refs.LeftExchangeRate.close();
                    }}>
                    <PText>{v.label}</PText>
                  </MyTouchableOpacity>
                );
              })}
            </MenuOption>
          </MenuOptions>
        </Menu>

        <Input
          autoFocus={false}
          autoCorrect={false}
          style={[
            ptText.H3,
            ptColor.GREY40,
            {
              marginBottom: 0 * HEIGHT_SCALE_RATIO,
              fontFamily:
                RootStore.language === 'en' || RootStore.language === 'vi' ? 'Raleway' : 'Roboto',
            },
          ]}
          keyboardType="number-pad"
          value={this.state.text}
          onChangeText={(text) => {
            let newNumber = 0;
            if (text) {
              try {
                newNumber = +text;
              } catch (e) {}
            }
            const newConvertedValue = this.convertCurrency(newNumber);
            this.setState({
              text,
              convertedValue: newConvertedValue.toString(),
            });
          }}
        />
      </View>
    );
  };

  renderHeaderPart = (icon, title) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{
            marginRight: 8 * WIDTH_SCALE_RATIO,
            width: 16 * WIDTH_SCALE_RATIO,
            height: 16 * HEIGHT_SCALE_RATIO,
            tintColor: COLOR.PRIMARY,
            resizeMode: 'contain',
          }}
          source={icon}
        />
        <PText style={styles.invalidName}>{title}</PText>
      </View>
    );
  };

  renderExchangeShopRate() {
    return (
      <View style={{ paddingTop: 60 * HEIGHT_SCALE_RATIO }}>
        {this.renderHeaderPart(
          ICON.EXCHANGE_CHART_ICON,
          `${RootStore.i18n.t('exchange.exchange-shop-rate')} (KRW)`,
        )}
        <PText
          style={[
            style.textCaption,
            {
              color: COLOR.GREY80,
              alignSelf: 'flex-end',
              marginTop: 0,
              marginBottom: 20 * HEIGHT_SCALE_RATIO,
              fontSize: style.textCaption.fontSize * 0.9,
            },
          ]}>
          {RootStore.i18n.t('currency-update-time')} {this.toDate(this.state.update, false)}
        </PText>
        {this.renderTableExchangeShopRate()}
      </View>
    );
  }

  renderTableExchangeShopRate() {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'column' }}>
          {this.renderDepotExchange()}
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 16 * HEIGHT_SCALE_RATIO,
            }}>
            <View style={styles.valueMoney}>
              {this.state.dataPicker.map((value) => this.renderMoneyType(value.label))}
            </View>
            {this.state.sellPrice.map((price) => (
              <View style={[styles.valueMoney, {}]} key={`List-Value-${price.usd}`}>
                {this.renderValueMoney(price.twd, 'TWD')}
                {this.renderValueMoney(price.hkd, 'HKD')}
                {this.renderValueMoney(price.sgd, 'SGD')}
                {this.renderValueMoney(price.usd, 'USD')}
                {this.renderValueMoney(price.jpy, 'JPY')}
                {this.renderValueMoney(price.thb, 'THB')}
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginHorizontal: 0 * WIDTH_SCALE_RATIO,
              paddingTop: 10 * HEIGHT_SCALE_RATIO,
            }}>
            {this.renderMapIconFooter(null)}
            {this.renderMapIconFooter(10369)}
            {this.renderMapIconFooter(10367)}
            {this.renderMapIconFooter(10355)}
          </View>
        </View>
      </ScrollView>
    );
  }

  renderMapIconFooter(showInMap) {
    if (showInMap) {
      return (
        <MyTouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.onClickMap(showInMap);
          }}>
          <Image
            style={{
              flex: 1,
              paddingRight: 10 * WIDTH_SCALE_RATIO,
              width: 60 * WIDTH_SCALE_RATIO,
              height: 60 * WIDTH_SCALE_RATIO,
              resizeMode: 'contain',
            }}
            source={IMAGE.EXCHANGE_MAP_IMAGE}
          />
        </MyTouchableOpacity>
      );
    } else {
      return <View style={{ width: 60 * WIDTH_SCALE_RATIO }} />;
    }
  }

  renderValueMoney(price, name) {
    return (
      <PText
        key={`Price-TWD-${price}`}
        style={[
          styles.textItemExchange,
          {
            color: this.state.currency === name ? COLOR.PRIMARY : COLOR.GREY20,
            // fontWeight: this.state.currency === name ? '900' : null,
          },
        ]}>
        {price}
      </PText>
    );
  }

  renderMoneyType(name) {
    return (
      <PText
        key={`nameMoney-${name}`}
        style={[
          styles.textItemExchange,
          {
            fontWeight: this.state.currency === name ? 'bold' : null,
            color: this.state.currency === name ? COLOR.PRIMARY : COLOR.GREY80,
          },
        ]}>
        {name}
      </PText>
    );
  }

  renderDepotExchange() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 36 * HEIGHT_SCALE_RATIO,
        }}>
        <PText style={[styles.moneyValueTypeExchange, style.textCaption]} />
        {this.state.nameMoney.map((name) => (
          <PText
            key={`nameMoney-${name}`}
            style={[styles.moneyValueTypeExchange, style.textCaption, { color: COLOR.GREY80 }]}>
            {name}
          </PText>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  invalidName: {
    height: 24 * HEIGHT_SCALE_RATIO,
    fontSize: FS(16),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24 * HEIGHT_SCALE_RATIO,
    letterSpacing: 0,
    color: COLOR.PRIMARY,
  },
  moneyValueTypeExchange: {
    width: 90 * WIDTH_SCALE_RATIO,
    height: 36 * HEIGHT_SCALE_RATIO,
    textAlign: 'center',
    fontSize: RootStore.fontSize(2.3),
    flex: 1,
    color: COLOR.GREY80,
  },
  valueMoney: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItemExchange: {
    textAlign: 'center',
    height: 36 * HEIGHT_SCALE_RATIO,
    width: 90 * WIDTH_SCALE_RATIO,
    fontSize: RootStore.fontSize(2.6),
  },
});
