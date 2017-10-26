export default (state = null, action) => {
  switch (action.type) {
      case 'CHANGE_ROOT':
        return action.categoryId;
      default:
        return state;
  }
}
