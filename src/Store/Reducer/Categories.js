import { List, Map } from 'immutable';

const addToMap = function (category, map) {
  map = map.set(category.id, {
    "id": category.id,
    "name": category.name,
    "subcategories": List(category.subcategories).flatten(true),
    "pos": category.pos,
    "products": category.products
  });

  for (var i = 0; i < category.subcategories.length; i++) {
      map = map.merge(
        addToMap(category.subcategories[i], map)
      );
  }

  return map;
}
export default (state = Map(), action) => {
  switch (action.type) {
      case 'ADD_CATEGORIES':
        return state.push(action.category);
      case 'REPLACE_CATEGORIES':
        let test = Map();

        test = test.set('root', {
          "id": 'root',
          "name": "Home",
          "subcategories": List(action.categories).flatten(true),
          "pos": 0,
          "products": 0
        });

        for (var i = 0; i < action.categories.length; i++) {
            test = test.merge(addToMap(action.categories[i], test));
        }

        return test;
      default:
        return state;
  }
}
