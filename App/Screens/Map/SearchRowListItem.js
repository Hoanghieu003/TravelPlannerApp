import React from 'react';
import { TouchableOpacity } from 'react-native';
import { WIDTH_SCALE_RATIO } from '../../Constant/constant';
import PText from '../../Components/PText';
import style from '../../Constants/styles';

export default class SearchRowListItem extends React.PureComponent {
  onPress = () => {
    if (this.props.onPressItem) {
      this.props.onPressItem(this.props.item);
    }
  };

  render() {
    const { item } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={{
          flex: 1,
          marginTop: 5 * WIDTH_SCALE_RATIO,
          flexDirection: 'row',
        }}
      >
        <PText style={[style.text, { flex: 9, marginRight: 10 * WIDTH_SCALE_RATIO }]}>
          {item.name}
        </PText>

        <PText style={[style.textCaption, { flex: 2, textAlign: 'right' }]}>{item.cityName}</PText>
      </TouchableOpacity>
    );
  }
}
