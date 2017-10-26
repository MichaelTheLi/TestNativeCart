const categoriesUrl = 'https://mobile.x-cart.com/cart.php?target=catalog_json_api&lng=en&api_key=QWEQWEQWE&route=Customer/Categories/Catalog'
const productsUrl = 'https://mobile.x-cart.com/cart.php?target=catalog_json_api&lng=en&api_key=QWEQWEQWE&route=Customer/Products'

let fetchCategories = function() {
    let urlBuilt = categoriesUrl;

    return fetch(urlBuilt)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.data;
      });
};


let fetchProducts = function(categoryId, start, limit) {
  limit = limit || 6;
  start = start || 0;
  let urlBuilt = productsUrl
      + "&data[from]="+start+"&data[size]=" + limit + "&data[category_id]="
      + categoryId;


  return fetch(urlBuilt)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.data;
    });
};

export default {
  fetchCategories: fetchCategories,
  fetchProducts: fetchProducts
}
