/* eslint-disable react-native/no-inline-styles */
import { Container, ScrollableTab, Tab, Tabs } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BaseHeaderApp from '../Components/BaseHeaderApp';
import { DATA_ALERT, HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import styles, { COLOR, FS, ptColor } from '../Constants/styles';
import RootStore from '../Stores/RootStore';
import AlertAll from './AlertAll';

export default class AlertComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    alert('Waiting for API');
  }

  onClickClose() {
    if (!this.props.disabled) {
      Actions.pop();
    }
  }

  render() {
    return (
      <Container>
        <BaseHeaderApp
          noShadow
          isClose
          title={RootStore.i18n.t('alert.notifications')}
          leftIconStyle={{ tintColor: COLOR.appColor }}
          rightIconType={null}
        />
        <Tabs
          tabBarUnderlineStyle={{
            backgroundColor: COLOR.PRIMARY,
            height: 2 * HEIGHT_SCALE_RATIO,
          }}
          tabBarBackgroundColor="white"
          ref
          renderTabBar={(e, i) => (
            <ScrollableTab
              underlineStyle={{ height: 2 }}
              style={{
                marginHorizontal: 16 * WIDTH_SCALE_RATIO,
                height: 40 * HEIGHT_SCALE_RATIO,
                borderWidth: 2 * HEIGHT_SCALE_RATIO,
                borderColor: COLOR.appBorderColor,
                backgroundColor: COLOR.WHITE,
              }}
            />
          )}>
          {[
            { title: RootStore.i18n.t('alert.all') },
            { title: RootStore.i18n.t('alert.reservation') },
            { title: RootStore.i18n.t('alert.event') },
            { title: RootStore.i18n.t('alert.announcement') },
          ].map((e, i) => (
            <Tab
              underlineColor={COLOR.appColor}
              tabStyle={{
                backgroundColor: 'white',
              }}
              activeTabStyle={{
                backgroundColor: 'white',
              }}
              scrollContainerStyle={{
                marginLeft: -23 * WIDTH_SCALE_RATIO,
              }}
              style={{
                borderBottomWidth: FS(1.5),
                borderBottomColor: COLOR.appBorderColor,
              }}
              tabBarTextStyle={[
                style.text,
                ptColor.GREY20,
                {
                  paddingLeft: 5 * WIDTH_SCALE_RATIO,
                  paddingRight: 5 * WIDTH_SCALE_RATIO,
                },
              ]}
              activeTabTextStyle={[
                style.text,
                {
                  color: COLOR.PRIMARY,
                  paddingLeft: 5 * WIDTH_SCALE_RATIO,
                  paddingRight: 5 * WIDTH_SCALE_RATIO,
                },
              ]}
              key={`tab ${e.title}`}
              textStyle={[styles.text, ptColor.GREY20]}
              heading={e.title}
              activeTextStyle={[styles.text]}>
              <AlertAll data={DATA_ALERT} />
            </Tab>
          ))}
        </Tabs>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  tab: {
    backgroundColor: 'white',
    width: 60,
  },
});
AlertComponent.propTypes = {
  RootStore: PropTypes.object,
};
