import React from 'react';
import { FlatList, Image } from 'react-native';
import MyTouchableOpacity from '../../Components/MyTouchableOpacity';
import { WIDTH, HEIGHT_SCALE_RATIO } from '../../Constant/constant';
import style, { COLOR } from '../../Constants/styles';
import PText from '../../Components/PText';
import SwipeablePanel from '../../Components/SwipeablePanel/Panel';
import { LISTCATEGORY } from './Map';

export default class SurroundingButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isLoadingCurrentLocation: false,
      swipeablePanelActive: false,
      currentSelectedCategory: null,
    };
  }

  onChangeTag = (item) => {
    this.setState({
      currentSelectedCategory: item,
    });

    if (this.props.onChangeTagDone) {
      setTimeout(() => {
        this.props.onChangeTagDone(item);
      }, 200);
    }
  };

  renderItem = ({ item }) => {
    return (
      <MyTouchableOpacity
        onPress={() => this.onChangeTag(item)}
        style={{
          width: (WIDTH * 0.9) / 4.4,

          paddingVertical: 12 * HEIGHT_SCALE_RATIO,

          alignItems: 'center',

          justifyContent: 'center',
        }}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={{
            width: WIDTH / 14,

            height: WIDTH / 14,

            tintColor: COLOR.appTextSubColor,

            marginBottom: 10 * HEIGHT_SCALE_RATIO,
          }}
        />

        <PText
          // adjustsFontSizeToFit

          style={[style.textCaption, { textAlign: 'center' }]}
          numberOfLines={1}>
          {item.title}
        </PText>
      </MyTouchableOpacity>
    );
  };

  onCloseSwipeablePanel = () => {
    this.props.self?.extraButtonRef?.closePanel();
  };

  render() {
    return (
      <SwipeablePanel
        style={{ zIndex: 99999999999 }}
        fullWidth={false}
        isActive={this.state.swipeablePanelActive}
        onClose={this.onCloseSwipeablePanel}

        // onPressCloseButton={this.closePanel}
      >
        <FlatList
          key="category"
          numColumns={4}
          keyExtractor={(item, index) => `key${index}`}
          showsHorizontalScrollIndicator={false}
          data={LISTCATEGORY}
          renderItem={this.renderItem}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          style={{}}
        />
      </SwipeablePanel>
    );
  }
}
