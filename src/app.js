import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import VueCookie from 'vue-cookie'
import * as filters from './util/filters'
import ElementUI from 'element-ui';
import VueLazyComponent from '@xunlei/vue-lazy-component'
// import './assets/element-variables.scss'
// 公共方法
import common from './assets/public.js'

// import { 
//   Button,
//   Carousel,
//   Input,
//   Radio,
//   CarouselItem 
// } from 'element-ui';
// Vue-Awesome-Swiper
// if (process.browser) {
//   console.log(111)
//   const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
//   Vue.use(VueAwesomeSwiper)
// }

// 引用延迟加载
if (process.browser) {
  const VueLazyLoad = require('vue-lazyload');
  Vue.use(VueLazyLoad, {
      attempt: 1
  });
}

Vue.use(VueLazyComponent);
// Vue.component(Select.name, Select);
// mixin for handling title
// 设置title
Vue.mixin(titleMixin);
Vue.use(ElementUI);
Vue.use(VueCookie);
// 添加公共方法到$common中
Vue.prototype.$common = common

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp () {
  // create store and router instances
  const store = createStore()
  const router = createRouter()


  // 同步
  sync(store, router)
 
  // this registers `store.state.route`
  router.beforeEach((to, from, next) => {
    // 判断是否初始化
    if (common.isNull(from.name)) {
      // store.dispatch('fetchCatalogList', { parentId: 1});
      return next();
    } else {
      // 处理登录跳转
      let _storeApp = store.state.user;
      // 对路由进行验证
      if (common.isNull(_storeApp.accountId) && to.meta.auth) { // 已经登陆
        window.location.href = location.origin + '/login';
      }
      return next()
    }
  })

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
