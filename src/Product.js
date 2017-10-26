import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Product extends Component {
  render() {
    let product = this.props.product;
    return (
      <Text style={{fontSize: 24}}>{product.product_name}</Text>
    );
  }
}

