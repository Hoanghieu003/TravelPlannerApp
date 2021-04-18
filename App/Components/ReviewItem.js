import { Card, Left, List, ListItem, Right } from 'native-base';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import SwipableRating from 'react-native-swipeable-rating';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Filter from '../../Common/Filter';
import Divider from '../Components/Divider';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import ReviewInput from '../Components/ReviewInput';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR, ptColor } from '../Constants/styles';
import { checkLogin } from '../Constants/utils';
import TimeAgo from '../Screens/TimeAgo';
import RootStore from '../Stores/RootStore';
import MyImage from './MyImage';
import PText from './PText';
import { ICON, IMAGE } from '../../asset/image/ImagePath';

const borderRadius = 10;

const ReviewChildListItem = React.memo((props) => {
  const { item, isDeleteable, onDeleteChildReview } = props;
  const [openedMenu, setOpenedMenu] = useState(false);

  const deleteChildItemFunc = () => {
    closeChildMenu();
    onDeleteChildReview(item);
  };

  const openChildMenu = () => {
    setOpenedMenu(true);
  };

  const closeChildMenu = () => {
    setOpenedMenu(false);
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <Image
        source={ICON.REPLY_ICON}
        resizeMode="contain"
        style={{
          marginRight: 12 * WIDTH_SCALE_RATIO,
          marginLeft: 16 * WIDTH_SCALE_RATIO,
          marginTop: 22 * HEIGHT_SCALE_RATIO,
          height: 16 * WIDTH_SCALE_RATIO,
          width: 15 * WIDTH_SCALE_RATIO,
        }}
      />
      <View
        style={{
          flex: 9,
          borderRadius,
          backgroundColor: '#FAFAFA',
          borderColor: '#FAFAFA',
          marginTop: 8 * HEIGHT_SCALE_RATIO,
          paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
          paddingTop: 8 * HEIGHT_SCALE_RATIO,
          paddingBottom: 16 * HEIGHT_SCALE_RATIO,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <MyImage
              style={{
                width: 40 * WIDTH_SCALE_RATIO,
                height: 40 * WIDTH_SCALE_RATIO,
                opacity: item.writer.picture ? 1 : 0.8,
                borderRadius: 36 * WIDTH_SCALE_RATIO,
              }}
              resizeMode="cover"
              source={
                item.writer.picture ? { uri: item.writer.picture } : IMAGE.DEFAULT_PROFILE_IMAGE
              }
            />
            <View
              style={{
                marginLeft: 12 * WIDTH_SCALE_RATIO,
                width: '68%',
              }}>
              <View
                style={{
                  alignSelf: 'flex-start',
                }}>
                <PText style={[style.textCaption, ptColor.GREY80]}>
                  {Filter.limitString(
                    item.writer.nickname
                      ? item.writer.nickname
                      : RootStore.i18n.t('global.unknown-contributor'),
                    13,
                  )}
                </PText>
              </View>
              <TimeAgo
                time={item.created_at}
                style={[
                  style.textCaption,
                  ptColor.GREY40,
                  {
                    fontSize: style.textCaption.fontSize - 1,
                    marginLeft: item.star_rating > 0 ? 10 * WIDTH_SCALE_RATIO : 0,
                  },
                ]}
              />
            </View>
          </View>
          {!isDeleteable(item) ? (
            <View />
          ) : (
            <Right style={{ position: 'absolute', right: 0, top: 0, borderBottomWidth: 0 }}>
              {/* Phát Nhánh 2 */}
              <Menu opened={openedMenu} style={{ marginRight: -15 * WIDTH_SCALE_RATIO }}>
                <MenuTrigger
                  style={{
                    width: 16 * WIDTH_SCALE_RATIO,
                    marginRight: 15 * WIDTH_SCALE_RATIO,
                  }}
                  onPress={openChildMenu}>
                  <Image
                    source={ICON.MORE_3_DOT_ICON}
                    resizeMode="contain"
                    style={{
                      width: 16 * WIDTH_SCALE_RATIO,
                      height: 16 * WIDTH_SCALE_RATIO,
                    }}
                  />
                </MenuTrigger>
                <MenuOptions
                  optionsContainerStyle={{
                    borderRadius,
                    marginTop: -10 * HEIGHT_SCALE_RATIO,
                  }}
                  customStyles={{ flexDirection: 'row' }}>
                  {/* Blog Place */}

                  <MenuOption>
                    {isDeleteable(item) && (
                      <MyTouchableOpacity
                        style={{ padding: 10 * WIDTH_SCALE_RATIO }}
                        onPress={deleteChildItemFunc}>
                        <PText
                          style={[
                            style.textButton,
                            {
                              textAlign: 'left',
                              textTransform: 'uppercase',
                            },
                          ]}>
                          {RootStore.i18n.t('review.delete')}
                        </PText>
                      </MyTouchableOpacity>
                    )}
                  </MenuOption>
                  <MyTouchableOpacity
                    onPress={closeChildMenu}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      zIndex: 9999,
                    }}>
                    <MaterialIcons
                      name="close"
                      size={25}
                      color={COLOR.appBorderColor}
                      style={{ padding: 10 * WIDTH_SCALE_RATIO }}
                    />
                  </MyTouchableOpacity>
                </MenuOptions>
              </Menu>
            </Right>
          )}
        </View>

        <View
          style={{
            backgroundColor: '#FAFAFA',
            paddingLeft: 52 * WIDTH_SCALE_RATIO,
            paddingTop: 12 * HEIGHT_SCALE_RATIO,

            alignSelf: 'flex-start',
          }}>
          <PText style={[style.textCaption, ptColor.GREY80]}>
            {item.translations[0].review_content}
          </PText>
        </View>
      </View>
    </View>
  );
});

export default class ReviewItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowTranslate: false,
      isLoading: false,

      reviews: [],
      reviewCount: 0,
    };
    this.self = this.props.this;
  }

  onDeleteChildReview = (item) => {
    this.self.onClickChildDeleteReview(this.props.review, item);
  };

  renderChildrenComment = ({ item }) => {
    return (
      <ReviewChildListItem
        item={item}
        isDeleteable={this.self.isDeleteable}
        onDeleteChildReview={this.onDeleteChildReview}
      />
    );
  };

  render() {
    const children =
      this.props.review && this.props.review.childReview ? this.props.review.childReview : [];
    const content =
      this.props.review &&
      this.props.review.translations &&
      this.props.review.translations.review_content
        ? this.props.review.translations.review_content
        : this.props.review.content
        ? this.props.review.content
        : '';

    return (
      <View style={{}} key={`review-${this.props.index}`}>
        {/* card1 */}
        <List style={{ flexDirection: 'row', paddingTop: 16 }}>
          <View style={{ flex: 0.7 }} />
          <Card
            style={{
              flex: 9,
              borderRadius,
              marginLeft: -3 * WIDTH_SCALE_RATIO,
            }}>
            <ListItem avatar noBorder style={{}}>
              <Left
                style={{
                  borderBottomWidth: 0,
                  marginLeft: -39 * WIDTH_SCALE_RATIO,
                  marginTop: -8 * HEIGHT_SCALE_RATIO,
                }}>
                <MyImage
                  profilePicture
                  style={{
                    opacity:
                      this.props.review.writer.picture &&
                      this.props.review.writer.picture.includes('.jpg')
                        ? 1
                        : 0.8,
                    width: 40 * WIDTH_SCALE_RATIO,
                    height: 40 * WIDTH_SCALE_RATIO,
                    borderRadius: 36 * WIDTH_SCALE_RATIO,
                  }}
                  resizeMode="cover"
                  source={
                    this.props.review.writer.picture
                      ? { uri: `${this.props.review.writer.picture}` }
                      : IMAGE.DEFAULT_PROFILE_IMAGE
                  }
                />
              </Left>
              <View
                style={{
                  marginLeft: 12 * WIDTH_SCALE_RATIO,
                  marginTop: 3 * HEIGHT_SCALE_RATIO,
                  width: '80%',
                }}>
                <View style={{ alignSelf: 'flex-start' }}>
                  <PText style={[style.textCaption, ptColor.GREY80]}>
                    {Filter.limitString(
                      this.props.review.writer.nickname
                        ? this.props.review.writer.nickname
                        : RootStore.i18n.t('global.unknown-contributor'),
                      13,
                    )}
                  </PText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {this.props.review.star_rating > 0 && (
                    <View>
                      <SwipableRating
                        color={COLOR.appColor}
                        emptyColor={COLOR.appTextPlaceholderColor}
                        size={12 * WIDTH_SCALE_RATIO}
                        swipeable={false}
                        rating={+this.props.review.star_rating}
                      />
                    </View>
                  )}
                  <TimeAgo
                    time={this.props.review.created_at}
                    style={[
                      style.textCaption,
                      ptColor.GREY40,
                      {
                        fontSize: style.textCaption.fontSize - 1,
                        marginLeft: this.props.review.star_rating > 0 ? 10 * WIDTH_SCALE_RATIO : 0,
                      },
                    ]}
                  />
                  {/* <PText
                    style={[
                      style.textCaption,
                      ptColor.GREY40,
                      {
                        fontSize: style.textCaption.fontSize - 1,
                        marginLeft: this.props.review.star_rating > 0 ? 10 * WIDTH_SCALE_RATIO : 0,
                      },
                    ]}
                  >
                    {Filter.relativeTimeNow(this.props.review.created_at)}
                  </PText> */}
                </View>
              </View>
              <Right style={{ position: 'absolute', right: 0, top: -4 * HEIGHT_SCALE_RATIO }}>
                <Menu ref="menuRef" style={{ marginRight: -15 * WIDTH_SCALE_RATIO }}>
                  <MenuTrigger
                    style={{
                      width: 16 * WIDTH_SCALE_RATIO,
                      marginRight: 15 * WIDTH_SCALE_RATIO,
                    }}>
                    <Image
                      source={ICON.MORE_3_DOT_ICON}
                      resizeMode="contain"
                      style={{
                        width: 16 * WIDTH_SCALE_RATIO,
                        height: 16 * WIDTH_SCALE_RATIO,
                      }}
                    />
                  </MenuTrigger>
                  <MenuOptions
                    optionsContainerStyle={{
                      borderRadius,
                      marginTop: -10 * HEIGHT_SCALE_RATIO,
                    }}
                    customStyles={{ flexDirection: 'row' }}>
                    {/* Blog Place */}

                    <MenuOption>
                      <MyTouchableOpacity
                        style={{ padding: 10 * WIDTH_SCALE_RATIO }}
                        onPress={() => {
                          this.refs.menuRef.close();
                          checkLogin(() => this.self.onClickCreateReplyForm(this.props.index));
                        }}>
                        <PText
                          style={[
                            style.textButton,
                            {
                              textTransform: 'uppercase',
                              textAlign: 'left',
                            },
                          ]}>
                          {RootStore.i18n.t('spot.reply')}
                        </PText>
                      </MyTouchableOpacity>
                      {this.self.isDeleteable(this.props.review) && (
                        <MyTouchableOpacity
                          style={{ padding: 10 * WIDTH_SCALE_RATIO }}
                          onPress={() => {
                            this.refs.menuRef.close();
                            checkLogin(() => {
                              Alert.alert(
                                '',
                                'Do you want to delete your comment?',
                                [
                                  {
                                    text: 'Cancel',
                                    onPress: () => {},
                                    style: 'destructive',
                                  },
                                  {
                                    text: 'OK',
                                    style: 'cancel',
                                    onPress: async () => {
                                      this.self.onClickDeleteReview(this.props.review);
                                    },
                                  },
                                ],
                                { cancelable: false },
                              );
                            });
                          }}>
                          <PText
                            style={[
                              style.textButton,
                              {
                                textAlign: 'left',
                                textTransform: 'uppercase',
                              },
                            ]}>
                            {RootStore.i18n.t('review.delete')}
                          </PText>
                        </MyTouchableOpacity>
                      )}
                    </MenuOption>
                    <MyTouchableOpacity
                      onPress={() => {
                        this.forceUpdate();
                        if (this.refs.menuRef) {
                          this.refs.menuRef.close();
                        } else {
                          console.log(this.refs);
                        }
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 9999,
                      }}>
                      <MaterialIcons
                        name="close"
                        size={25}
                        color={COLOR.appBorderColor}
                        style={{ padding: 10 * WIDTH_SCALE_RATIO }}
                      />
                    </MyTouchableOpacity>
                  </MenuOptions>
                </Menu>
              </Right>
            </ListItem>
            <View
              style={{
                paddingLeft: 32 * WIDTH_SCALE_RATIO,
                paddingRight: 12 * WIDTH_SCALE_RATIO,
                paddingBottom: 8 * HEIGHT_SCALE_RATIO,
                marginTop: 4 * HEIGHT_SCALE_RATIO,
              }}>
              <PText style={[style.textCaption, ptColor.GREY80]}>{content}</PText>
              <View
                style={{
                  alignSelf: 'flex-end',
                }}>
                {this.state.isLoading ? <ActivityIndicator color={COLOR.appColor} /> : null}
              </View>
              {this.state.isShowTranslate ? (
                <View style={{ width: '100%' }}>
                  <Divider
                    style={{
                      marginTop: 9 * HEIGHT_SCALE_RATIO,
                      marginBottom: 16 * WIDTH_SCALE_RATIO,
                      marginLeft: -18,
                    }}
                  />
                  <PText
                    style={[
                      style.textCaption,
                      ptColor.GREY80,
                      { paddingBottom: 24 * HEIGHT_SCALE_RATIO },
                    ]}>
                    {content}
                  </PText>
                </View>
              ) : null}
            </View>
          </Card>
        </List>
        {this.props.review.addReply && (
          <ReviewInput
            layout2
            childReview
            childInfo={{
              code: this.props.review.code,
              index: this.props.index,
            }}
            registReview={this.self.onClickChildRegistReview.bind(this)}
          />
        )}
        {/* user co cmnt roi */}
        <FlatList
          keyExtractor={(item) => `${item.code}`}
          showsVerticalScrollIndicator={false}
          extraData={this.state}
          data={children}
          renderItem={this.renderChildrenComment}
        />
      </View>
    );
  }
}
