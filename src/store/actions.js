import axios from "axios"; // 请求插件
import vueCookie from 'vue-cookie';

// VueCookie.set('authToken', '6e29cf8b-a255-476b-91b0-4730a67c4085');
const authToken  = '';
// if (typeof window !== 'undefined') {
//    const authToken = vueCookie.get('userAuthToken');
// }

const brand = 'mrc'; // 品牌
let lang = 'en'; // 语言
let api = process.env.API_ROOT === undefined ? 'https://demo-api.XXXX.com' : API_ROOT;
// let api = process.env.API_ROOT === undefined ? 'https://api.XXXX.com' : API_ROOT;
// let api = API_ROOT;

// 环境链接
axios.defaults.baseURL = api;
axios.defaults.method = "POST";
let headers = {
  // 'Content-Type': 'application/x-www-form-urlencoded',
  "Content-Type": "application/json;charset=UTF-8",
  "Auth-Token": 'sunvalley2017',
  "X-LANG": lang
  // "Request-Timestamp": new Date().getTime()
};

axios.defaults.headers = headers;

/**
 * [公共post 方法]
 * @author luke 2018-05-28
 * @param  {[type]} options.url   [请求url]
 * @param  {[type]} options.query [参数]
 * @param  {[type]} commit        [description]
 */
const _post = ({ url, query }, commit) => {
  // brandId 公用的默认
  url = api + url;
  query.brand = brand;
  return axios
    .post(url, JSON.stringify(query))
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      return Promise.reject(new Error(response.data.resDes));
    })
    .catch(function(error) {
      console.log(error);
      return Promise.reject(error.response.data.resDes);
    });
};

/**
 * [公共post -- 方法 返回完整的接口数据信息]
 * @author napier 2018-10-09
 * @param  {[type]} options.url   [请求url]
 * @param  {[type]} options.query [参数]
 * @param  {[type]} commit        [description]
 */
const _post1 = ({ url, query }, commit) => {
  // brandId 公用的默认
  url = api + url;
  query.brand = brand;
  return axios
    .post(url, JSON.stringify(query))
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      return Promise.reject(new Error(response.data));
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
};


/**
 * [公共请求Get]
 * @author luke 2018-05-28
 * @param  {[type]} options.url   [请求url]
 * @param  {[type]} options.query [参数url]
 */
const _get = ({ url, query }, commit) => {
  if (!query.brand) {
    query.brand = brand;
  }
  return axios
    .get(url, { params: query })
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      return Promise.reject(new Error(response.data.resDes));
    })
    .catch(function(error) {
      console.log(error);
      return Promise.reject(error.response.data.resDes);
    });
};


/**
 * page 1
 * api 总接口
 */
const oApi = {
  getRecaptcha: '*****************/config/recaptcha',
  getRegister: '*****************/register', // 注册
  signIn: '*****************/signin', // 登陆
  isLogin: '*****************/getUserInfo/', // 判断是否登录
  getCountry: '*****************/dic/************', // 获取国家
  getBanner: '*****************/product/getBanner/' + brand + '/index_top',
  // 获取Header分类
  getHeaderCata: '*****************/catalog/***************',
  // 子菜单列表
  getCatalogCategory: '*****************/catalog/****************',
  // 菜单产品列表
  getProductsByCategory: '*****************/product/**************',
  // 产品基本信息
  getProductBaseInfo: '*****************/product/*************Product',
  // 产品image
  getProductImages: '*****************/product/*************',
  // 产品price
  getProductPlatform: '*****************/product/***************',
  // 产品color
  getProductColor: '*****************/product/**************',
  // 产品Highlight
  getProductHighlight: '*****************/product/**************',
  // 产品specs
  getProductSpecs: '*****************/product/g****************ctSpecs',
  // 产品Review
  getProductReview: '*****************/product/***g*****************ctReview',
  // 产品FAQ
  getProductFaq: '*****************/product/**********************',
  // 首页获取新品
  getBestSellers: '*****************/product/*******************Sellers',
  //确认延保订单
  confirmWarranty: '*****************/user/**************' + '?brand=' + brand,
  //查询延保产品列表
  getWarrantyList: '*****************/user/****************',
  //通过邮箱找回密码
  restPassword: '*****************/user/email/***********' + '?brand=' + brand,
  //修改密码
  modifyPassword: '*****************/user/*****************' + '?brand=' + brand,
  // 获取系统下拉列表
  getSysParameter: '*****************/***************',
  // 保存Influencer
  savaInfluencer: '*****************/user/**************' + '?brand=' + brand,
  // 面包屑
  getBreadcrumb: '*****************/product/**************',
  // 产品Amazon状态
  getAmzProductStatus: '*****************/product/********************************'
}


/**
 * vuex 方法
 */
export default {
  // ensure data for rendering given list type
  FETCH_COUNTRY_LIST: ({ commit, dispatch, state }) => {
    const url = '/api/erp-sys/dic/getCountryList';
    let query = {};
    return _post({ url, query }, commit)
      .then(json => {
        if (json.resCode === 200) {
          return Promise.resolve(json.data);
        }
        return Promise.reject(json.resDes);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },

  /**
   * [登录方法]
   * @author luke 2018-06-04
   * @param  {[type]} options.commit [description]
   */
  fetchLogin: ({commit, state}, query) => {
    const url = oApi.signIn;
    return _post({ url, query }, commit)
      .then((json) => {
        if (json.resCode === 200) {
          commit('FETCH_USER_SUCCESS', json.data.userInfo);
          let storage = window.localStorage;
          storage.setItem('user_id', json.data.userInfo.accountId);
          // storage.setItem('userAuthToken', json.data.access_token);
          vueCookie.set('userAuthToken', json.data.authToken);
          return Promise.resolve(json.data)
        }
        return Promise.reject(json.msgs);
      })
      .catch((error) => {
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error)
      })
  },
  /**
   * [是否登录]
   * @author luke 2018-06-25
   */
  fetchIsLogin: ({commit, state}) => {
    // isLogin
    const url = oApi.isLogin + vueCookie.get('userAuthToken');
    let query = {}
    return _post({ url, query }, commit)
      .then((json) => {
        if (json.resCode === 200) {
          commit('FETCH_USER_SUCCESS', json.data);
          let storage = window.localStorage;
          storage.setItem('user_id', json.data.accountId);
          // storage.setItem('userAuthToken', json.data.access_token);
          // vueCookie.set('userAuthToken', json.data.authToken);
          return Promise.resolve(json.data)
        }
        return Promise.reject(json.msgs);
      })
      .catch((error) => {
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error)
      })
  },
  // ensure all active items are fetched
  fetchAllList: ({ commit, state }, obj) => {
    const url = oApi[obj.api];
    // 加密参数
    // let query = objKeySort(obj.data);
    let query = obj.data;
    return _post({ url, query }, commit)
      .then(json => {
        if (json.resCode === 200) {
          console.log(json);
          return Promise.resolve(json.data);
        }
        return Promise.reject(json.resDes);
      })
      .catch(error => {
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error);
      });
  },
  /**
   * 获取接口数据完整信息
   */
  fetchAllList1: ({ commit, state }, obj) => {
    const url = oApi[obj.api];
    // 加密参数
    // let query = objKeySort(obj.data);
    let query = obj.data;
    return _post1({ url, query }, commit)
      .then(json => {
        if (json.resCode === 200) {
          console.log(json);
          return Promise.resolve(json.data);
        }
        return Promise.reject(json);
      })
      .catch(error => {
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error);
      });
  },
  /**
   *  公共 GET api 接口
   *  fetchGetAll  obj
   *   @author luke 2017-11-10
   */
  fetchGetAll: ({ commit }, obj) => {
    const url = oApi[obj.api];
    // 加密参数
    // let query = objKeySort(obj.data);
    let query = obj.data;
    return _get({ url, query }, commit)
      .then(json => {
        if (json.resCode === 200) {
          return Promise.resolve(json.data);
        }
        return Promise.reject(json.resDes);
      })
      .catch(error => {
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error);
      });
  },

  FETCH_ITEMS: ({ commit, state }, { ids }) => {
    // on the client, the store itself serves as a cache.
    // only fetch items that we do not already have, or has expired (3 minutes)
    const now = Date.now();
    ids = ids.filter(id => {
      const item = state.items[id];
      if (!item) {
        return true;
      }
      if (now - item.__lastUpdated > 1000 * 60 * 3) {
        return true;
      }
      return false;
    });
    if (ids.length) {
      return fetchItems(ids).then(items => commit("SET_ITEMS", { items }));
    } else {
      return Promise.resolve();
    }
  },
  /**
   * [获取banner列表]
   * @author luke 2018-05-30
   */
  FETCH_BANNER: ({ commit, state }) => {
    const url = oApi.getBanner;
    let query = {}
    return _get({ url, query }, commit)
      .then(json => {
        if (json.resCode === 200) {
          commit('SET_BANNER_LIST', json.data);
          return Promise.resolve(json.data);
        }
        return Promise.reject(json.resDes);
      })
      .catch(error => {
        // commit('SET_BANNER_LIST',[])
        return Promise.reject(error);
      });
  },
  /**
   * [获取产品Header分类]
   * @author luke 2018-05-30
   * @param  {[type]} options.commit [description]
   * @param  {[type]} options.state  [description]
   */
  fetchCatalogList: ({ commit, state }, data) => {
    const url = oApi.getMoreCatalog;
    let query = data;
    // 如果有值直接返回
    // if (state.catalogList && state.catalogList.length > 0){
    //   return Promise.resolve(state.catalogList);
    // }
    return _get({ url, query }, commit)
      .then(json => {
        if (json.resCode === 200) {
          commit('SET_CATALOG_LIST', json.data);
          return Promise.resolve(json.data);
        }
        return Promise.reject(json.resDes);
      })
      .catch(error => {
        console.log(error);
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error);
      });
    

  },

  /**
   * [获取产品列表]
   * @author luke 2018-05-30
   */
  getProductsList: ({ commit, state }, data) => {
    const url = oApi.getProductsByCategory;
    let query = data;
    // 根据产品id进行缓存
    return _get({ url, query }, commit)
      .then(json => {
        if (json.resCode === 200) {
          // key value 方便做前端缓存
          commit('SET_PRODUCT_LIST', json.data);
          return Promise.resolve(json.data);
        }
        return Promise.reject(json.resDes);
      })
      .catch(error => {
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error);
      });
    

  },


  /**
   * [获取搜索列表]
   * @author frave 2018-08-07
   */
  getSearchList: ({ commit, state }, data) => {
    const url = oApi.productSearch;
    let query = data;

    // 根据产品id进行缓存
    return _get({ url, query }, commit)
      .then(json => {
        if (json.resCode === 200) {
          // key value 方便做前端缓存
          commit('SET_SEARCH_LIST', json.data);
          return Promise.resolve(json.data);
        }
        return Promise.reject(json.resDes);
      })
      .catch(error => {
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error);
      });
    

  },

  FETCH_USER: ({ commit, state }, { id }) => {
    return state.users[id]
      ? Promise.resolve(state.users[id])
      : fetchUser(id).then(user => commit("SET_USER", { id, user }));
  },
  /**
   * 产品基本数据获取
   * @author frave 2018-09-13
   * @param  {[type]}
   * @param  {[type]}
   */
  getProductBaseData: ({commit, state}, query) => {
    let url = oApi.getProductBaseInfo;
    return _get({ url, query }, commit).then(json => {
        if (json.resCode === 200) {
            commit('PRODUCT_BASE_DATA', json.data);
            return Promise.resolve(json.data);
        }
        return Promise.reject(json.resDes);
    }).catch(error => {
        console.log(error);
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error);
    });
  },

  getProductPlatFormData: ({commit, state}, query) => {
    let url = oApi.getProductPlatform;
    return _get({ url, query }, commit).then(json => {
        if (json.resCode === 200) {
            commit('PRODUCT_PLAT_FORM_DATA', json.data);
            return Promise.resolve(json.data);
        }
        return Promise.reject(json.resDes);
    }).catch(error => {
        console.log(error);
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error);
    });
  },

  getProductImgData: ({commit, state}, query) => {
    let url = oApi.getProductImages;
    return _get({ url, query }, commit).then(json => {
        if (json.resCode === 200) {
            commit('PRODUCT_IMG_DATA', json.data);
            return Promise.resolve(json.data);
        }
        return Promise.reject(json.resDes);
    }).catch(error => {
        console.log(error);
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error);
    });
  },

  getProductColorData: ({commit, state}, query) => {
    let url = oApi.getProductColor;
    return _get({ url, query }, commit).then(json => {
        if (json.resCode === 200) {
            commit('PRODUCT_COLOR_DATA', json.data);
            return Promise.resolve(json.data);
        }
        return Promise.reject(json.resDes);
    }).catch(error => {
        console.log(error);
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error);
    });
  }
};
