import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import { DotIndicator, SkypeIndicator } from 'react-native-indicators';
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR } from '../Constants/styles';

export default class PFlatList extends FlatList {
  static propTypes = {
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: false,
  };
  ListFooterComponent = () => {
    const { isLoading, renderFooter } = this.props;
    if (isLoading) {
      return (
        <SkypeIndicator
          color={COLOR.appColor}
          size={30 * WIDTH_SCALE_RATIO}
          style={{
            paddingTop: 8 * HEIGHT_SCALE_RATIO,
            paddingBottom: 16 * HEIGHT_SCALE_RATIO,
          }}
        />
      );
    }
    return renderFooter ? renderFooter : <View />;
  };
  keyExtractor = (item, index) =>
    item && item?.code
      ? `${item?.code?.toString()}`
      : item && item?.id
        ? `${item?.id?.toString()}`
        : index?.toString();

  render() {
    const { children, isLoading, data, refreshing, onRefresh } = this.props;
    if (data?.length === 0) {
      return (
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing || false} onRefresh={onRefresh} />
          }>
          <View style={[{ flex: 1 }, style.center]}>
            {isLoading ? (
              <DotIndicator color={COLOR.appColor} size={5 * WIDTH_SCALE_RATIO} count={8} />
            ) : (
                <Text
                  style={[
                    style.textSubTitle,
                    {
                      position: 'relative',
                      textAlign: 'center',
                      alignSelf: 'center',
                      paddingTop: 24 * HEIGHT_SCALE_RATIO,
                      paddingBottom: 24 * HEIGHT_SCALE_RATIO,
                    },
                  ]}>
                  No results
                </Text>
              )}
          </View>
        </ScrollView>
      );
    }
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data || []}
        onEndReachedThreshold={0.5}
        ListFooterComponent={this.ListFooterComponent}
        {...this.props}>
        {children}
      </FlatList>
    );
  }
}
