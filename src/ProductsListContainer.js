import ProductsList from './ProductsList';

import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    products: {
        items: ownProps.products,
        isFetching: false,
    },
    fetchMore: ownProps.fetchMore,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const ProductsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList)

export default ProductsListContainer
