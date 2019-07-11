import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () =>
  import ('../views/CreateListView').then(m => m.default(id))

// const category = () =>
//   import ('../views/category/index.vue')

const category = () => import('../views/category/createrCategory.js').then(m => m.default());
const search = () => import('../views/search/createrSearch.js').then(m => m.default());

// const search = () => import ('../views/search/index.vue')
const CustomeService = () =>
  import ('../views/support/customeService.vue')
// const Warranty = () =>
//   import ('../views/support/warranty.vue')
const ourCompany = () =>
  import ('../views/about/ourCompany.vue')
const contactUs = () =>
  import ('../views/about/contactUs.vue')
const Downlist = () =>
  import ('../views/support/downlist.vue')
const login = () =>
  import ('../views/login/login.vue') // 登陆
const register = () =>
  import ('../views/login/register.vue') // 注册
// const iconTest = () => import('../views/login/iconTest.vue')
const Support = () =>
  import ('../views/support/support.vue')
const about = () =>
  import ('../views/about/index.vue')
const termsCondition = () =>
  import ('../views/about/termsCondition.vue')
const salesPolicy = () =>
  import ('../views/about/salesPolicy.vue')
const warrantyExtension = () =>
  import ('../views/about/warrantyExtension.vue')
const privacyPolicy = () =>
  import ('../views/about/privacyPolicy.vue')
const myAccount = () =>
  import ('../views/myAccount/index.vue')
const productsDetail = () => import('../views/products/productsDetails.js').then(m => m.default())
// influencer
const influencer = () =>
  import ('../views/influencer/index.vue')
const forgot = () =>
  import ('../views/login/forgot.vue')

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({
      y: 0
    }),
    routes: [{
        path: '/',
        name: 'index',
        component: createListView('index')
      }, {
        path: '/index',
        name: 'index',
        redirect: '/'
      }, {
        path: '/category/:id',
        name: 'category',
        component: category
      }, {
        path: '/product/:pid',
        name: 'productsDetail',
        component: productsDetail
      }, {
        path: '/login',
        name: 'login',
        component: login
      }, {
        path: '/forgot',
        name: 'forgot',
        component: forgot
      }, {
        path: '/register',
        name: 'register',
        component: register
      },
      // { path: '/iconTest', component: iconTest },
      {
        path: '/search',
        name: 'search',
        component: search
      },
      // { path: '/support', component: support },
      {
        path: '/custome-service',
        name: 'custome',
        component: CustomeService
      }, {
        path: '/ourCompany',
        name: 'ourCompany',
        component: ourCompany
      }, {
        path: '/contactUs',
        name: 'contactUs',
        component: contactUs
      }, {
        path: '/downlist',
        name: 'downlist',
        component: Downlist
      }, {
        path: '/support',
        name: 'support',
        component: Support
      }, {
        path: '/about',
        name: 'about',
        component: about
      }, {
        path: '/termsCondition',
        name: 'termsCondition',
        component: termsCondition
      }, {
        path: '/salesPolicy',
        name: 'salesPolicy',
        component: salesPolicy
      }, {
        path: '/warranty',
        name: 'warrantyExtension',
        component: warrantyExtension
      }, {
        path: '/warrantyExtension',
        name: 'warrantyExtension',
        component: warrantyExtension
      }, {
        path: '/privacyPolicy',
        name: 'privacyPolicy',
        component: privacyPolicy
      }, {
        path: '/myAccount',
        name: 'myAccount',
        component: myAccount,
        meta: {
          auth: true // 这里设置，当前路由需要校验
        }
      },
      // { path: '/productsDetails_new', component: productsDetails_new },
      {
        path: '/influencer',
        name: 'influencer',
        component: influencer
      },
      // { path: '/user/:id', component: UserView },
      {
        path: '*',
        name: 'index',
        redirect: '/'
      }
    ]
  })
}