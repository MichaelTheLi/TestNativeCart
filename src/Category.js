import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Category extends Component {
  render() {
    return (
      <Text style={{fontSize: 24}} onPress={this.props.onPress}>{this.props.category.name}</Text>
    );
  }
}

