export default (state = [], action) => {
  switch (action.type) {
      case 'ADD_PRODUCTS':
        state.concat(action.products)
        return state;
      case 'REPLACE_PRODUCTS':
        return action.products;
      default:
        return state;
  }
}
