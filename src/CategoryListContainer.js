import CategoryList from './CategoryList';

import { connect } from 'react-redux'
import { List, Map } from 'immutable';

const mapStateToProps = (state, ownProps) => {
  const allCategoriesMap = state.categories;

  let categoriesToShow = Map();
  let found = allCategoriesMap.get(ownProps.rootId || 'root');

  // console.warn('Found' + JSON.stringify(found));
  if (found && found.subcategories && found.subcategories.size > 0) {
      categoriesToShow = found.subcategories;
  }

  return {
    categories: categoriesToShow
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCategoryClick: category => {
      ownProps.onCategoryClick(category);
    }
  }
}

const CategoryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList)

export default CategoryListContainer
