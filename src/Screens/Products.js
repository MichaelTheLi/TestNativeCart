import React, { Component } from 'react';
import { Text } from 'react-native';

import ProductsListContainer from '../ProductsListContainer';

import apiFacade from '../Api/Facade'

export default class ProductsScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    let title = "Category";
    if (navigation.state.params && navigation.state.params.rootCategory) {
      title =  navigation.state.params.rootCategory.name;
    }

    return {title: title};
  };

  constructor(props) {
    super(props);

    this.state = {products: []};
  }

  _getRootId() {
    const { dispatch, state } = this.props.navigation;

    let rootId = 'root';

    if (state.params && state.params.rootCategory) {
      rootId = state.params.rootCategory.id;
    }

    return rootId;
  }

  _fetchMore(start, callback) {
    const rootId = this._getRootId();

    apiFacade.fetchProducts(rootId, start)
      .then((products) => {
        callback(products);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    const { navigate, state } = this.props.navigation;
    const params = state.params || {categoryId: null};
    const rootId = params.categoryId;

    return (
      <ProductsListContainer products={this.state.products} fetchMore={this._fetchMore.bind(this)} />
    );
  }
}
