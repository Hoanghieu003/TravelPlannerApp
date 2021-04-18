import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class StarRating extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      score: 5.0,
      rating: [],
    };

    this.createRating = this.createRating.bind(this);
  }

  componentDidMount() {
    this.createRating(this.props.score);
  }

  createRating(param) {
    let score = param;
    if (typeof param === 'string') {
      score = parseFloat(param);
    }

    let rating = [];

    // 0 없음, 1반별, 2완별
    if (score > 4.5) {
      rating = [2, 2, 2, 2, 2];
    } else if (score > 4.0) {
      rating = [2, 2, 2, 2, 1];
    } else if (score > 3.5) {
      rating = [2, 2, 2, 2, 0];
    } else if (score > 3.0) {
      rating = [2, 2, 2, 1, 0];
    } else if (score > 2.5) {
      rating = [2, 2, 2, 0, 0];
    } else if (score > 2.0) {
      rating = [2, 2, 1, 0, 0];
    } else if (score > 1.5) {
      rating = [2, 2, 0, 0, 0];
    } else if (score > 1.0) {
      rating = [2, 1, 0, 0, 0];
    } else if (score > 0.5) {
      rating = [2, 0, 0, 0, 0];
    } else {
      rating = [1, 0, 0, 0, 0];
    }

    this.setState({ score, rating });
  }

  onClickRating(index) {
    if (!this.props.change) {
      return;
    }

    const rating = this.state.rating;
    if (++rating[index] > 2) {
      rating[index] = 1;
    }
    const score = index * 1 + this.state.rating[index] * 0.5;

    this.createRating(score);
    this.props.changeScore(score);
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {this.state.rating.map((score, index) => (
          <TouchableOpacity key={index} onPress={this.onClickRating.bind(this, index)}>
            {score === 2 && (
              <Icon
                style={{ marginRight: 2 }}
                name="star"
                color="#00afa0"
                size={this.props.size ? this.props.size : 15}
              />
            )}
            {score === 1 && (
              <Icon
                style={{ marginRight: 2 }}
                name="star-half-o"
                color="#00afa0"
                size={this.props.size ? this.props.size : 15}
              />
            )}
            {score === 0 && (
              <Icon
                style={{ marginRight: 2 }}
                name="star-o"
                color="#00afa0"
                size={this.props.size ? this.props.size : 15}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

StarRating.propTypes = {
  score: PropTypes.any,
  change: PropTypes.bool,
  changeScore: PropTypes.func,
};
