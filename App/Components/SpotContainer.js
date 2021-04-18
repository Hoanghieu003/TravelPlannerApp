import { Button } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import { Actions } from 'react-native-router-flux';
import Const from '../../Common/Const';
import RootStore from '../Stores/RootStore';
import PText from './PText';
import SpotCard from './SpotCard';

export default class SpotContainer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  onClickCard(code) {
    Actions.spotDetail({ spotCode: code });
  }

  render() {
    return (
      <View>
        <Row size={12} style={{ margin: 10, marginBottom: 5 }}>
          <PText style={{ fontSize: RootStore.fontSize(3.0), fontWeight: '400', color: '#767676' }}>
            {RootStore.i18n.t('home.spot', { city: this.props.city })}
          </PText>
        </Row>
        <Row size={12} style={{ maxHeight: 220, marginBottom: 20 }}>
          <Col sm={6}>
            {this.props.spots[0] && (
              <SpotCard
                spotData={this.props.spots[0]}
                key={this.props.spots[0].code}
                click={this.onClickCard.bind(this, this.props.spots[0].code)}
              />
            )}
          </Col>
          <Col sm={6}>
            {this.props.spots[1] && (
              <SpotCard
                spotData={this.props.spots[1]}
                key={this.props.spots[1].code}
                click={this.onClickCard.bind(this, this.props.spots[1].code)}
              />
            )}
          </Col>
        </Row>
        <Row size={12} style={{ maxHeight: 220, marginBottom: 20 }}>
          <Col sm={6}>
            {this.props.spots[2] && (
              <SpotCard
                spotData={this.props.spots[2]}
                key={this.props.spots[2].code}
                click={this.onClickCard.bind(this, this.props.spots[2].code)}
              />
            )}
          </Col>
          <Col sm={6}>
            {this.props.spots[3] && (
              <SpotCard
                spotData={this.props.spots[3]}
                key={this.props.spots[3].code}
                click={this.onClickCard.bind(this, this.props.spots[3].code)}
              />
            )}
          </Col>
        </Row>
        <Row size={12} style={{ margin: 10, marginBottom: 20 }}>
          <Col sm={12}>
            <Button
              block
              bordered
              primary
              onPress={this.props.showAll.bind(this, {
                city: this.props.city,
                postType: Const.PostType.Spot.code,
              })}>
              <PText style={{ fontSize: RootStore.fontSize(2.0), fontWeight: '400' }}>
                {RootStore.i18n.t('home.all', { number: this.props.count })}
              </PText>
            </Button>
          </Col>
        </Row>
      </View>
    );
  }
}

SpotContainer.propTypes = {
  city: PropTypes.string,
  spots: PropTypes.array,
  count: PropTypes.number,
  showAll: PropTypes.func,
};
