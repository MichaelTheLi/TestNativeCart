import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Product from './Product';
import {
  ListView,
  RefreshControl
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

export default class ProductsList extends Component {

  constructor(props, context) {
    super(props, context);

    this.canLoadMore = true;
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: this._rowHasChanged.bind(this),
      }),
    };

    // Update the data store with initial data. 
    this.state.dataSource = this.getUpdatedDataSource(props.products.items);
  }

  async componentWillMount() {
    // Initial fetch for data, assuming that listData is not yet populated. 
    this._loadMoreContentAsync();
  }
 
  componentWillReceiveProps(nextProps) {
    // Trigger a re-render when receiving new props (when redux has more data). 
    this.setState({
      dataSource: this.getUpdatedDataSource(nextProps.products.items),
    });
  }
 
  getUpdatedDataSource(rows) {
    for (var i = 0; i < rows.length; i++) {
      let newRow = rows[i];
      let found = this.props.products.items.find(function(item) {
        return item.product_id === newRow.product_id;
      });

      if (!found) {
        this.props.products.items.push(newRow);
      }
    }
    rows = this.props.products.items;
    let ids = rows.map((obj, index) => index);

    return this.state.dataSource.cloneWithRows(rows, ids);
  }

  _rowHasChanged(r1, r2) {
    return r1.product_id !== r2.product_id;
  }

  _loadMoreContentAsync = async () => {
    this.props.fetchMore(this.props.products.items.length, function(newProducts) {
      if (!newProducts || newProducts.length < 6) {
        this.canLoadMore = false;
      }

      if (newProducts) {
        this.setState({
          dataSource: this.getUpdatedDataSource(newProducts),
        });
      }

    }.bind(this));
  }

  _renderRefreshControl() {
    // Reload all data 
    return (
      <RefreshControl
        refreshing={this.props.products.isFetching}
        onRefresh={this._loadMoreContentAsync.bind(this)}
      />
    );
  }
 
  render() {
    return (
      <ListView
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        dataSource={this.state.dataSource}
        renderRow={(item) => 
          <View style={styles.item}>
            <Product product={item} />
          </View>
        }
        refreshControl={this._renderRefreshControl()}
        canLoadMore={this.canLoadMore}
        onLoadMoreAsync={this._loadMoreContentAsync.bind(this)}
      />
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
