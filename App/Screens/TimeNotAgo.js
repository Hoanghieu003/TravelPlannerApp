import moment from 'moment';
import React from 'react';
import PText from '../Components/PText';

export default class TimeNotAgo extends React.PureComponent {
  render() {
    const { time } = this.props;
    return (
      <PText {...this.props}>
        {moment().format('MMM DD, YYYY') === moment(time).format('MMM DD, YYYY')
          ? moment(time).format('HH:mm')
          : moment(time).format('MMM DD, YYYY')}
      </PText>
    );
  }
}
