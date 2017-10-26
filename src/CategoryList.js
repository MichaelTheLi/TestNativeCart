import React, { Component } from 'react';
import { AppRegistry, ListView, StyleSheet, Text, View } from 'react-native';

import Category from './Category';
import immutable from 'immutable';


export default class CategoryList extends Component {
  constructor(props) {
      super(props);

      const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => !immutable.is(r1, r2),
      });

      let categories = props.categories ? props.categories.toArray() : [];

      this.state = {
          dataSource: ds.cloneWithRows(props.categories.toArray())
      }
  }

  componentWillReceiveProps(nextProps) {
      const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => !immutable.is(r1, r2),
      })

      let categories = nextProps.categories ? nextProps.categories.toArray() : [];
      this.setState({
          dataSource: ds.cloneWithRows(nextProps.categories.toArray())
      });
  }

  renderCategoryItem(item) {
    return <View style={styles.item}>
      <Category onPress={() => this.props.onCategoryClick(item)} category={item} />
    </View>
  }

  render() {
    return (
        <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderCategoryItem.bind(this)}
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 20,
    height: 80,
  },
})
