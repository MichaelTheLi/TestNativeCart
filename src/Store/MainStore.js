import { createStore } from 'redux'

import categoriesReducer from './Reducer/Categories';
import navigationReducerCreator from './Reducer/Navigation';

export default (AppNavigator) => {
    const initialState = AppNavigator.router.getStateForAction(
        AppNavigator.router.getActionForPathAndParams('Categories')
    );

    let navigationReducer = navigationReducerCreator(AppNavigator, initialState);

    const mainStore = (state = [], action) => {
      return {
        categories: categoriesReducer(state.categories, action),
        navigation: navigationReducer(state.navigation, action),
      }
    }

    return createStore(mainStore);
};
