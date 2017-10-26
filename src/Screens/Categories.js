import React, { Component } from 'react';

import CategoryListContainer from '../CategoryListContainer';

import apiFacade from '../Api/Facade'

export default class CategoriesScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    let title = "Home";
    if (navigation.state.params && navigation.state.params.rootCategory) {
      title =  navigation.state.params.rootCategory.name;
    }

    return {title: title};
  };

  componentWillMount() {
    const { dispatch } = this.props.navigation;

    apiFacade.fetchCategories()
      .then((categories) => {
        return dispatch({
          type: 'REPLACE_CATEGORIES',
          categories: categories
        });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    const { dispatch, state, setParams } = this.props.navigation;
    let rootId = null;
    if (state.params && state.params.rootCategory) {
      rootId = state.params.rootCategory.id;
    }

    return (
        <CategoryListContainer rootId={rootId} onCategoryClick={(category) => {
              if (category.subcategories.length > 0) {
                dispatch({type: 'CATEGORIES', category: category});
              } else {
                dispatch({type: 'PRODUCTS', category: category});
              }
            }
          }
        />
    );
  }
}
