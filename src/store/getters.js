export default {
  // ids of the items that should be currently displayed based on
  // current list type and current pagination
  bannerList (state) {
    return state.bannerList
  },

  catalogList (state) {
    return state.catalogList;
  },

  productsList (state) {
    return state.productsList;
  },

  searchList (state) {
    return state.searchList;
  },

  userList (state) {
    return state.user;
  },
  productData (state) {   //产品信息
    return state.productData;
  }
}
