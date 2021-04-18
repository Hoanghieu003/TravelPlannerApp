import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import { WIDTH } from '../Constant/constant';
import style, { COLOR } from '../Constants/styles';

export default class AlertAll extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem({ item }) {
    return (
      <MyTouchableOpacity style={{ width: WIDTH * 0.9 }}>
        <View
          style={{
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderColor: COLOR.appBorderColor,
            paddingVertical: 12,
          }}>
          <PText style={[style.text, { fontWeight: 'normal' }]}>{item.title}</PText>
          <View style={{ flexDirection: 'row', paddingTop: 4 }}>
            <PText
              style={[
                style.textSubTitle,
                { fontWeight: 'normal', fontSize: style.text.fontSize - 2 },
              ]}>
              {item.date}
            </PText>
            <PText
              style={[
                style.textSubTitle,
                {
                  fontWeight: 'normal',
                  fontSize: style.text.fontSize - 2,
                  marginLeft: 10,
                },
              ]}>
              {item.time}
            </PText>
          </View>
        </View>
      </MyTouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
          data={this.props.data}
          numColumns={1}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

AlertAll.propTypes = {
  RootStore: PropTypes.object,
};
