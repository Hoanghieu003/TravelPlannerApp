import { Content } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Const from '../../Common/Const';
import getRecommendList from '../../Common/gql/queries/getRecommendList.gql';
import PText from '../Components/PText';
import RootStore from '../Stores/RootStore';

export default class Category extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      city: [],
      offset: 0,
      search: '',
    };
  }

  async componentDidMount() {
    this.search();
  }

  async search() {
    const defaultTags = await RootStore.client.query({
      query: getRecommendList,
      variables: {
        tagType: Const.TagType.City.code,
        language: RootStore.language,
      },
    });
    const city = [];
    defaultTags.data.getRecommendList.recommends.forEach((v) => {
      city.push(v.city);
    });

    this.setState({ city });
  }

  onClickCity(index) {
    Actions.city({
      city: this.state.city[index].translations[0].name,
      search: '',
    });
  }

  onClickKorean(search) {
    Actions.search({ search });
  }

  onClickExchange() {
    Actions.exchange();
  }

  render() {
    return (
      <View style={styles.screen}>
        <Content style={styles.categoryBox}>
          <Row size={12} style={[styles.rowHeight, styles.borderBottomBox]}>
            <Col sm={12} style={styles.searchTitle}>
              <PText style={styles.title}>{RootStore.i18n.t('category.recent')}</PText>
            </Col>
          </Row>
          <Row size={12} style={[styles.rowHeight, styles.borderBottomBox]}>
            <Col sm={6} style={styles.borderRightBox}>
              <TouchableOpacity onPress={this.onClickCity.bind(this, 0)} style={styles.touchBox}>
                <PText style={styles.item}>
                  {this.state.city[0] && this.state.city[0].translations[0].name}
                </PText>
              </TouchableOpacity>
            </Col>
            <Col sm={6}>
              <TouchableOpacity onPress={this.onClickCity.bind(this, 1)} style={styles.touchBox}>
                <PText style={styles.item}>
                  {this.state.city[1] && this.state.city[1].translations[0].name}
                </PText>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={12} style={[styles.rowHeight, styles.borderBottomBox]}>
            <Col sm={6} style={styles.borderRightBox}>
              <TouchableOpacity onPress={this.onClickCity.bind(this, 2)} style={styles.touchBox}>
                <PText style={styles.item}>
                  {this.state.city[2] && this.state.city[2].translations[0].name}
                </PText>
              </TouchableOpacity>
            </Col>
            <Col sm={6}>
              <TouchableOpacity onPress={this.onClickCity.bind(this, 3)} style={styles.touchBox}>
                <PText style={styles.item}>
                  {this.state.city[3] && this.state.city[3].translations[0].name}
                </PText>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={12} style={[styles.rowHeight, styles.borderBottomBox]}>
            <Col sm={6} style={styles.borderRightBox}>
              <TouchableOpacity onPress={this.onClickCity.bind(this, 4)} style={styles.touchBox}>
                <PText style={styles.item}>
                  {this.state.city[4] && this.state.city[4].translations[0].name}
                </PText>
              </TouchableOpacity>
            </Col>
            <Col sm={6}>
              <TouchableOpacity onPress={this.onClickCity.bind(this, 5)} style={styles.touchBox}>
                <PText style={styles.item}>
                  {this.state.city[5] && this.state.city[5].translations[0].name}
                </PText>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={12} style={[styles.rowHeight, styles.borderBottomBox]}>
            <Col sm={12}>
              <TouchableOpacity
                onPress={this.onClickExchange.bind(this)}
                style={styles.searchTextBox}>
                <PText style={styles.item}>{RootStore.i18n.t('category.exchange')}</PText>
                <View style={styles.icon}>
                  <Icon name="chevron-right" color="#767676" size={15} />
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={12} style={[styles.rowHeight, styles.borderBottomBox]}>
            <Col sm={12}>
              <TouchableOpacity
                onPress={this.onClickKorean.bind(
                  this,
                  RootStore.i18n.t('category.notice-tag-name'),
                )}
                style={styles.searchTextBox}>
                <PText style={styles.item}>{RootStore.i18n.t('category.notice')}</PText>
                <View style={styles.icon}>
                  <Icon name="chevron-right" color="#767676" size={15} />
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={12} style={[styles.rowHeight, styles.borderBottomBox]}>
            <Col sm={12}>
              <TouchableOpacity
                onPress={this.onClickKorean.bind(
                  this,
                  RootStore.i18n.t('category.meet-friend-tag-name'),
                )}
                style={styles.searchTextBox}>
                <PText style={styles.item}>{RootStore.i18n.t('category.meet-friend')}</PText>
                <View style={styles.icon}>
                  <Icon name="chevron-right" color="#767676" size={15} />
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={12} style={[styles.rowHeight, styles.borderBottomBox]}>
            <Col sm={12}>
              <TouchableOpacity
                onPress={this.onClickKorean.bind(
                  this,
                  RootStore.i18n.t('category.korean-learn-tag-name'),
                )}
                style={styles.searchTextBox}>
                <PText style={styles.item}>{RootStore.i18n.t('category.korean-learn')}</PText>
                <View style={styles.icon}>
                  <Icon name="chevron-right" color="#767676" size={15} />
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={12} style={[styles.rowHeight, styles.borderBottomBox]}>
            <Col sm={12}>
              <TouchableOpacity
                onPress={this.onClickKorean.bind(
                  this,
                  RootStore.i18n.t('category.korean-culture-tag-name'),
                )}
                style={styles.searchTextBox}>
                <PText style={styles.item}>{RootStore.i18n.t('category.korean-culture')}</PText>
                <View style={styles.icon}>
                  <Icon name="chevron-right" color="#767676" size={15} />
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={12} style={styles.rowHeight}>
            <Col sm={12}>
              <TouchableOpacity
                onPress={this.onClickKorean.bind(
                  this,
                  RootStore.i18n.t('category.korean-news-tag-name'),
                )}
                style={styles.searchTextBox}>
                <PText style={styles.item}>{RootStore.i18n.t('category.korean-news')}</PText>
                <View style={styles.icon}>
                  <Icon name="chevron-right" color="#767676" size={15} />
                </View>
              </TouchableOpacity>
            </Col>
          </Row>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  categoryBox: {
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    height: '100%',
  },
  borderBottomBox: {
    borderColor: '#767676',
    borderBottomWidth: 1,
  },
  borderRightBox: {
    borderColor: '#767676',
    borderRightWidth: 1,
  },
  rowHeight: {
    maxHeight: 50,
    height: 50,
  },
  title: {
    fontSize: RootStore.fontSize(3.8),
    fontWeight: '400',
    color: '#00afa0',
  },
  searchTitle: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchTextBox: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    fontSize: RootStore.fontSize(2.8),
    fontWeight: '400',
    color: '#767676',
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
  touchBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
