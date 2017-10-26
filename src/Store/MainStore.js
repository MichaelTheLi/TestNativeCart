import { createStore } from 'redux'

import categoriesReducer from './Reducer/Categories';
import productsReducer from './Reducer/Products';
import currentCategoryReducer from './Reducer/CurrentCategory';
import navigationReducerCreator from './Reducer/Navigation';

export default (AppNavigator) => {
    const initialState = AppNavigator.router.getStateForAction(
        AppNavigator.router.getActionForPathAndParams('Categories')
    );


    let navigationReducer = navigationReducerCreator(AppNavigator, initialState);

    const mainStore = (state = [], action) => {
      return {
        categories: categoriesReducer(state.categories, action),
        products: productsReducer(state.products, action),
        viewed_category_id: currentCategoryReducer(state.viewed_category_id, action),
        navigation: navigationReducer(state.navigation, state.viewed_category_id, action),
      }
    }

    return createStore(mainStore);
};
