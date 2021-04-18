import { Button, Content } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Util from '../../Common/Util';
import GoBackButton from '../Components/GoBackButton';
import PText from '../Components/PText';
import RootStore from '../Stores/RootStore';

export default class SpotMemberBenefit extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      paddingBottom: Util.getIOSPadding('bottom'),
    };
  }

  onClickGoMyPage() {
    Actions.myPage();
  }

  render() {
    return (
      <View style={[styles.screen, { paddingBottom: this.state.paddingBottom }]}>
        <View style={styles.header}>
          <View>
            <GoBackButton customStyle={styles.headerLeft} />
          </View>
          <View style={styles.headerTitleBox}>
            <PText style={styles.headerTitle}>
              {RootStore.i18n.t('member-benefit.reserve-title', { spotName: this.props.spotName })}
            </PText>
          </View>
        </View>
        <Content style={styles.content}>
          {this.props.benefits.map((v, i) => {
            return (
              <View style={styles.tableBodyBoxBottom} key={v}>
                <PText>- {v}</PText>
              </View>
            );
          })}
        </Content>
        <View
          style={{
            position: 'absolute',
            bottom: this.state.paddingBottom,
            width: '100%',
            alignSelf: 'flex-end',
          }}>
          <Button block onPress={this.onClickGoMyPage.bind(this)}>
            <PText uppercase={false} style={{ color: '#fff' }}>
              {RootStore.i18n.t('spot.go-benefit')}
            </PText>
          </Button>
        </View>
      </View>
    );
  }
}

SpotMemberBenefit.propTypes = {
  spotCode: PropTypes.number,
  spotName: PropTypes.string,
  benefits: PropTypes.array,
};
const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { width: '100%', padding: 10, flexDirection: 'row', flexWrap: 'wrap' },
  headerLeft: { width: '20%', padding: 10 },
  headerTitleBox: { marginLeft: 10, width: '80%', alignItems: 'center', alignSelf: 'center' },
  headerTitle: { fontSize: RootStore.fontSize(3.8), fontWeight: '400', color: '#00afa0' },
  content: { width: '100%', height: '90%', padding: 10 },
});
