import moment from 'moment';
import React from 'react';
import PText from '../Components/PText';

export default class TimeAgo extends React.PureComponent {
  static defaultProps = {
    hideAgo: false,
    interval: 60000,
  };

  componentDidMount() {
    this.createTimer();
  }

  createTimer = () => {
    this.setState({
      timer: setTimeout(() => {
        this.update();
      }, this.props.interval),
    });
  };

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  update = () => {
    this.forceUpdate();
    this.createTimer();
  };

  render() {
    const { time, hideAgo } = this.props;
    return <PText {...this.props}>{moment(time).fromNow(hideAgo)}</PText>;
  }
}
