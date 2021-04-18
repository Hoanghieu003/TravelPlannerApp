// import PropTypes from 'prop-types';
// import React, { Component } from 'react';
// import { Text, View, Flatlist } from 'react-native';
// import MyTouchableOpacity from '../Components/MyTouchableOpacity';
// import style, { COLOR } from '../Constants/styles';

// export default class AlertNotification extends React.PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//             dataNotification: [
//                 { title: '궁가는 여우 예약이 확정되었습니다.', date: '2019.06.08', time: '23:25' },
//                 { title: '궁가는 여우 예약이 확정되었습니다.', date: '2019.06.08', time: '23:25' },
//                 { title: '궁가는 여우 예약이 확정되었습니다.', date: '2019.06.08', time: '23:25' },
//                 { title: '궁가는 여우 예약이 확정되었습니다.', date: '2019.06.08', time: '23:25' },
//             ]
//         };
//     }
//     renderItem({ item }) {
//         return (
//             <MyTouchableOpacity>
//                 <View style={{ borderBottomWidth: 1, }}>
//                     <PText style={style.textCaption}>{item.title}</PText>
//                     <View style={{ flexDirection: 'row' }}>
//                         <PText >{item.date}</PText>
//                         <PText style={{ marginLeft: 10 }}>{item.time}</PText>
//                     </View>
//                 </View >
//             </MyTouchableOpacity>
//         );
//     }
//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 <Flatlist
//                     showsVerticalScrollIndicator={false}
//                     data={this.state.dataNotification}
//                     numColumns={1}
//                     renderItem={this.renderItem}
//                 // columnWrapperStyle={{
//                 //     backgroundColor: 'white',
//                 //     justifyContent: 'space-evenly',
//                 // }}
//                 // contentContainerStyle={style.paddingBottomTabbar}
//                 />
//             </View>
//         );
//     }
// }
// AlertNotification.propTypes = {
//     RootStore: PropTypes.object,
// };

/* eslint-disable global-require */
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import { WIDTH } from '../Constant/constant';
import style, { COLOR } from '../Constants/styles';

export default class AlertEvent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataNotification: [
        {
          title: '궁가는 여우 예약이 확정되었습니다.',
          date: '2019.06.08',
          time: '23:25',
        },
        {
          title: '궁가는 여우 예약이 확정되었습니다.',
          date: '2019.06.08',
          time: '23:25',
        },
        {
          title: '궁가는 여우 예약이 확정되었습니다.',
          date: '2019.06.08',
          time: '23:25',
        },
        {
          title: '궁가는 여우 예약이 확정되었습니다.',
          date: '2019.06.08',
          time: '23:25',
        },
      ],
    };
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
          // showsVerticalScrollIndicator={false}
          data={this.state.dataNotification}
          numColumns={1}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

AlertEvent.propTypes = {
  RootStore: PropTypes.object,
};
