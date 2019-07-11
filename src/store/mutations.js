import Vue from 'vue'

export default {
  SET_BANNER_LIST: (state, data) => {
    state.bannerList = data;
  },

  /**
   * [分组列表显示]
   * @author luke 2018-07-13
   */
  SET_CATALOG_LIST: (state, data) => {
    state.catalogList = data;
  },

  SET_ITEMS: (state, { items }) => {
    items.forEach(item => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    })
  },

  FETCH_USER_SUCCESS: (state, data) => {
    state.user = data;
  },

  /**
   * [产品列表]
   * @author luke 2018-07-13
   */
  SET_PRODUCT_LIST: (state, data) => {
    if (typeof data === 'object' && data.length > 0) {
      state.productsList = data;
    } else {
      state.productsList = [];
    }
  },

  /**
   * [产品列表]
   * @author frave 2018-08-07
   */
  SET_SEARCH_LIST: (state, data) => {
    if (typeof data === 'object') {
      if (data.pageNum === 1) {
        state.searchList.total = data.total || 0;
        state.searchList.list = data.list || [];
      } else {
        state.searchList.total = data.total;
        for (let i = 0; i < data.list.length; i++) {
          state.searchList.list.push(data.list[i]);
        }
      }

      state.searchList.isSearched = true;
    } 
  },

  SET_USER: (state, { id, user }) => {
    Vue.set(state.users, id, user || false) /* false means user not found */
  },
  /*
    * getProductBaseInfo
  */
  PRODUCT_BASE_DATA: (state, json) => {
    state.productData.baseData = json || {};
  },

  PRODUCT_PLAT_FORM_DATA: (state, json) => {
    if (typeof json === 'object' && json.length > 0) {
      state.productData.platFormData = json;
    } else {
      state.productData.platFormData = [];
    }
  },

  PRODUCT_IMG_DATA: (state, json) => {
    if (typeof json === 'object' && json.length > 0) {
      state.productData.imageData = json;
    } else {
      state.productData.imageData = [];
    }
  },

  PRODUCT_COLOR_DATA: (state, json) => {
    if (typeof json === 'object' && json.length > 0) {
      state.productData.colorData = json;
    } else {
      state.productData.colorData = [];
    }
  }
}
