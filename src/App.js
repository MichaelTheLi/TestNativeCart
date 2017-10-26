import React, { Component } from 'react';
import { Text, AppRegistry, BackHandler } from 'react-native';
import { connect } from 'react-redux'
import { Provider } from 'react-redux'

import {
  StackNavigator,
  addNavigationHelpers
} from 'react-navigation';

import CategoriesScreen from './Screens/Categories';
import ProductsScreen from './Screens/Products';

import storeCreator from './Store/MainStore';

const AppNavigator = StackNavigator({
  Categories: { screen: CategoriesScreen },
  Products: { screen: ProductsScreen },
});

const store = storeCreator(AppNavigator)

BackHandler.addEventListener('hardwareBackPress', function() {
  store.dispatch({ type: 'HardwareBackPress' });
  return true;
});

class App extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation,
      })}/>
    );
  }
}

const mapStateToProps = (state) => ({
  navigation: state.navigation
});


const AppWithNavigationState = connect(mapStateToProps)(App);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
};
