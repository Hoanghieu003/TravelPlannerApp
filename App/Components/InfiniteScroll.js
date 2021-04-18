'use strict';
import { Content } from 'native-base';
import React from 'react';
import { RefreshControl } from 'react-native';
import { COLOR } from '../Constants/styles';

export default class InfiniteScroll extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      distanceFromEnd: 10,
      refreshing: false,
    };

    this._onRefresh = this._onRefresh.bind(this);
    this._stopRefreshSpinner = this._stopRefreshSpinner.bind(this);
  }

  UNSAFE_UNSAFE_componentWillMount() {
    if (this.props.distanceFromEnd) {
      this.setState({
        distanceFromEnd: this.props.distanceFromEnd,
      });
    }
  }

  _handleScroll(event) {
    if (this.props.onScroll) {
      this.props.onScroll(event);
    }

    if (this._shouldLoadMore(event)) {
      if (this.props.onLoadMoreAsync) {
        this.props.onLoadMoreAsync();
      }
    }
  }

  _shouldLoadMore = (event) => {
    return this._distanceFromEnd(event) < this.state.distanceFromEnd;
  };

  _distanceFromEnd = (event) => {
    const { contentSize, contentInset, contentOffset, layoutMeasurement } = event.nativeEvent;

    let contentLength;
    let trailingInset;
    let scrollOffset;
    let viewportLength;
    const horizontal = this.props.horizontal || false;
    if (horizontal) {
      contentLength = contentSize.width;
      trailingInset = contentInset.right;
      scrollOffset = contentOffset.x;
      viewportLength = layoutMeasurement.width;
    } else {
      contentLength = contentSize.height;
      trailingInset = contentInset.bottom;
      scrollOffset = contentOffset.y;
      viewportLength = layoutMeasurement.height;
    }

    return contentLength + trailingInset - scrollOffset - viewportLength;
  };

  _onRefresh() {
    this.setState({ refreshing: true }, () => {
      if (this.props.onRefresh) {
        this.props.onRefresh();
      }
    });
  }

  _stopRefreshSpinner() {
    this.setState({ refreshing: false });
  }

  render() {
    return (
      <Content
        {...this.props}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            colors={['#009689', COLOR.appColor]}
            tintColor={COLOR.appColor}
            onRefresh={this._onRefresh}
          />
        }
        automaticallyAdjustContentInsets={false}
        onScroll={this._handleScroll.bind(this)}
        scrollEventThrottle={200}>
        {this.props.children}
      </Content>
    );
  }
}
