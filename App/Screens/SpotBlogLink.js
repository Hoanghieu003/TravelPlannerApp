import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BaseHeaderApp from '../Components/BaseHeaderApp';
import BlogCard from '../Components/BlogCard';
import { WIDTH_SCALE_RATIO } from '../Constant/constant';
import style, { COLOR } from '../Constants/styles';
import RootStore from '../Stores/RootStore';

// 스팟에서 블로그 링크 보여주는 페이지
export default class SpotBlogLink extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickGoBack = this.onClickGoBack.bind(this);
  }

  onClickLink(blog) {
    Actions.blogDetail({ blogCode: blog.code });
  }

  onClickGoBack() {
    Actions.pop();
  }

  render() {
    return (
      <View style={style.container}>
        <BaseHeaderApp
          isClose
          noShadow
          title={this.props.title || RootStore.i18n.t('spot.show-link')}
          leftIconStyle={{ tintColor: COLOR.appColor }}
          rightIconType={null}
        />
        <FlatList
          contentContainerStyle={{ padding: 16 * WIDTH_SCALE_RATIO }}
          keyExtractor={item => `${item.code}`}
          showsVerticalScrollIndicator={false}
          extraData={this.state}
          data={this.props.blogLink}
          renderItem={this.renderItem()}
        />
      </View>
    );
  }

  renderItem() {
    return ({ item }) => {
      return (
        <BlogCard
          layout2
          city={this.props.city}
          region={this.props.region}
          blogData={item.blog}
          click={this.onClickLink.bind(this, item)}
        />
      );
    };
  }
}

SpotBlogLink.propTypes = {
  blogLink: PropTypes.array,
};
