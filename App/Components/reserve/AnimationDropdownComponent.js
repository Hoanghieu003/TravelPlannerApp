import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { WIDTH_SCALE_RATIO, HEIGHT_SCALE_RATIO } from '../../Constant/constant';
import { ICON } from '../../../asset/image/ImagePath';
import style, { COLOR, ptShadow, ptText } from '../../Constants/styles';
import { Easing } from 'react-native-reanimated';
import PText from '../PText';
import Util from '../../../Common/Util';
import MyTouchableOpacity from '../MyTouchableOpacity';
import RootStore from '../../Stores/RootStore';

const numberOfLineNameProduct = 3;
const numberOfLineNameItem = 2;

export default function AnimationDropdownComponent(props) {
  const { data, visible, hideClose, value } = props;
  const [toggle, setToggle] = useState(false);
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));
  // const [value, setValue] = useState(null);

  const borderColor = COLOR.appBorderColor; // '#f6f6f6';
  const onPressFunc = () => {
    setToggle(!toggle);
  };

  Animated.timing(spinValue, {
    toValue: toggle ? 1 : 0,
    duration: 200,
    useNativeDriver: true,
  }).start();

  useEffect(() => {
    if (!visible) {
      setToggle(false);
      // setValue(null);
    }
  }, [visible]);

  if (!visible) {
    return <Fragment />;
  }
  console.log('1009 cuong xem value', value);
  return (
    <View
      style={{
        // borderBottomWidth: 1,
        // borderColor,allData
        paddingTop: 12 * HEIGHT_SCALE_RATIO,
        marginBottom: 12 * HEIGHT_SCALE_RATIO,
      }}>
      <View style={{ marginHorizontal: 25 * WIDTH_SCALE_RATIO }}>
        <View
          style={{
            borderColor,
            borderWidth: toggle ? 1 : 0,
            borderRadius: toggle ? 10 * WIDTH_SCALE_RATIO : 0,
            overflow: 'hidden',
          }}>
          <TouchableOpacity onPress={onPressFunc}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 42 * WIDTH_SCALE_RATIO,
                  borderRadius: 10 * WIDTH_SCALE_RATIO,
                  borderColor,
                  paddingHorizontal: 10 * WIDTH_SCALE_RATIO,
                },
                toggle
                  ? {
                      borderBottomWidth: 1,
                    }
                  : {
                      borderWidth: 1,
                    },
              ]}>
              <PText
                focusable={false}
                style={[
                  style.text,
                  { flex: 1 },
                  value
                    ? { textTransform: 'uppercase' }
                    : {
                        color: COLOR.GREY40,
                        textTransform: 'uppercase',
                      },
                ]}>
                {value ? value.name : RootStore.i18n.t('reserve.select-an-option')}
              </PText>
              <Animated.Image
                source={ICON.DROPDOWN_ICON}
                style={{
                  marginLeft: 8 * WIDTH_SCALE_RATIO,
                  width: 14 * WIDTH_SCALE_RATIO,
                  height: 14 * WIDTH_SCALE_RATIO,
                  tintColor: COLOR.appTextSubColor,
                  transform: [
                    {
                      rotate: spinValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {toggle &&
            !data[0].is_dropdown &&
            data.map((v, i) => {
              if (v.options.length > 0) {
                return (
                  <View key={v?.name}>
                    <TouchableOpacity
                      onPress={() => {
                        // setValue(v);
                        setToggle(false);
                        props.onSelect(v, i);
                      }}
                      style={{
                        marginHorizontal: 16 * WIDTH_SCALE_RATIO,
                        paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
                        paddingVertical: 16 * HEIGHT_SCALE_RATIO,
                        justifyContent: 'center',
                        borderWidth: 0,
                        borderBottomColor: COLOR.appBorderColor,
                        borderBottomWidth: 1 * WIDTH_SCALE_RATIO,
                        backgroundColor: COLOR.WHITE,
                      }}
                      key={`step2-2-${i}`}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 4 * HEIGHT_SCALE_RATIO,
                        }}>
                        <PText
                          numberOfLines={numberOfLineNameItem}
                          style={[
                            ptText.BODY1,
                            {
                              color: COLOR.GREY80,
                              textTransform: 'uppercase',
                              marginBottom: 4 * HEIGHT_SCALE_RATIO,
                            },
                          ]}>
                          {v.name || v.ko_name}
                        </PText>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <PText
                          style={[
                            style.text,
                            {
                              color: COLOR.GREY80,
                            },
                          ]}>
                          {v.discount_price &&
                          v.discount_price !== 'null' &&
                          parseInt(v.discount_price, 10)
                            ? `￦ ${Util.price_comma(v.discount_price)}`
                            : ''}
                          {'   '}
                          <PText
                            style={[
                              style.textCaption,
                              {
                                color: COLOR.GREY20,
                                textDecorationLine: 'line-through',
                              },
                            ]}>
                            {v.price && v.price !== 'null' && parseInt(v.price, 10)
                              ? `￦ ${Util.price_comma(v.price)}`
                              : ''}
                          </PText>
                        </PText>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }
              return (
                <View key={v?.name}>
                  <MyTouchableOpacity
                    onPress={() => {
                      // this.addFirstParentToCart(v, this.state.selectProductFirst);
                      // this.setState({ chosenProductLevel2: i });
                      // setValue(v);
                      setToggle(false);
                      props.onSelect(v, i);
                    }}
                    style={[
                      {
                        // paddingHorizontal: 2 * WIDTH_SCALE_RATIO,
                        paddingVertical: 8 * HEIGHT_SCALE_RATIO,
                        marginHorizontal: 8 * WIDTH_SCALE_RATIO,
                        backgroundColor: COLOR.WHITE,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      },
                      i < data.length - 1
                        ? {
                            borderWidth: 0,
                            borderBottomColor: COLOR.appBorderColor,
                            borderBottomWidth: 1 * WIDTH_SCALE_RATIO,
                          }
                        : {},
                    ]}
                    key={`price-${i}`}>
                    <View style={{}}>
                      <PText
                        numberOfLines={numberOfLineNameItem}
                        style={[
                          ptText.BODY1,
                          {
                            color: COLOR.GREY80,
                            textTransform: 'uppercase',
                            marginBottom: 4 * HEIGHT_SCALE_RATIO,
                          },
                        ]}>
                        {v.name || v.ko_name}
                      </PText>
                      <View style={{ flexDirection: 'row' }}>
                        <PText
                          style={[
                            style.text,
                            {
                              width: '100%',
                              color: COLOR.GREY80,
                            },
                          ]}>
                          {v.discount_price &&
                          v.discount_price !== 'null' &&
                          parseInt(v.discount_price, 10)
                            ? `￦ ${Util.price_comma(v.discount_price)}`
                            : ''}
                          {'   '}
                          <PText
                            style={[
                              style.textCaption,
                              {
                                color: COLOR.GREY20,
                                textDecorationLine: 'line-through',
                              },
                            ]}>
                            {v.price && v.price !== 'null' && parseInt(v.price, 10)
                              ? `￦ ${Util.price_comma(v.price)}`
                              : ''}
                          </PText>
                        </PText>
                      </View>
                    </View>
                  </MyTouchableOpacity>
                </View>
              );
            })}
        </View>

        {!hideClose && (
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              paddingVertical: 12 * HEIGHT_SCALE_RATIO,
            }}>
            <TouchableOpacity onPress={props.onClose}>
              <PText
                style={[
                  style.text,
                  {
                    color: COLOR.GREY40,
                  },
                ]}>
                CLOSE X
              </PText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
