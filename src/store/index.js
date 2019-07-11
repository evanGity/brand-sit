import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      // 定义值
      bannerList: [], // banner 滚动
      catalogList: [], // 分类列表
      productsList: [], // 产品列表
      user: {}, // 用户信息
      productData: {
        baseData: {},
        platFormData: [],
        imageData: [],
        colorData: []
      },
      searchList: {
        total: 0,
        list: [],
        isSearched: false
      } // 搜索列表
    },
    actions,
    mutations,
    getters
  })
}
