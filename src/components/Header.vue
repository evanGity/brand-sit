<template>
    <div class="header">
        <header class="row" id="header">
        <div class="center-main">
            <div class="head-nav-list">
              <div class="block-right">
                <div class="login-register text-center">
                  <div class="unlogin" v-if="userList.accountId === undefined">
                    <router-link to="/login">
                        Log In
                    </router-link>
                    <span>/</span>
                    <router-link to="/register">
                        Sign Up
                    </router-link>
                  </div>
                  <div class="logined" v-if="userList.accountId !== undefined" >
                    <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link">
                       {{ userList.email }}
                       <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item command="myAccount">My Account</el-dropdown-item>
                        <el-dropdown-item command="logOut">Log Out</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>
                <div class="search-container" @click="searchProducthandler">
                  <i class="el-icon-search" ></i>
                </div>
              </div>
                
                <ul class="nav-list">
                    <!-- logo -->
                   <li class="logo-item">
                      <router-link to="/">
                         <img src="../assets/img/logo_new.png"  style="vertical-align: middle;width:100px;margin-right:65px;margin-top: -10px;">
                      </router-link>
                   </li>
                    <!--20180419-->
                    <li class="nav-list-li item-dropdown zyh-btn" 
                      :class="c.childrenCatalogs && c.childrenCatalogs.length > 0 ? 'hover-able' : ''" 
                      v-for="(c, index) in catalogList" :key="index">
                      <div class="link-wrapper">
                        <router-link :to="'/category/' + c.categoryName + '-c-' + c.categoryId + '.html'" target="self" class="zyh-btn-txt">
                          {{ c.categoryName }}
                         </router-link>
                      </div>

                      <span class="el-icon-arrow-down" v-if="c.childrenCatalogs && c.childrenCatalogs.length > 0"></span>
                      <span class="el-icon-arrow-up" v-if="c.childrenCatalogs && c.childrenCatalogs.length > 0"></span>

                        <div class="nav-list-item text-center" role="menu">
                            <!--20180118-->
                            <div class="center-main">
                                <div class="list-item">
                                  <ul>
                                      <li v-for="(v, key) in c.childrenCatalogs" :key="key">
                                          <router-link :to="'/category/' + v.categoryName + '-c-' + v.categoryId + '.html'" target="self">
                                            {{ v.categoryName }}
                                          </router-link>
                                      </li>
                                  </ul>
                                </div>
                            </div>
                            <!--20180118-->
                        </div>
                    </li>
                    <!--20180419-->


                    <li class="nav-list-li item-dropdown zyh-btn">
                        <router-link to='/support' class="zyh-btn-txt" href="javascript: void(0);">Support <span class="iconfont icon-jia"></span></router-link>
                    </li>

                    <li class="nav-list-li zyh-btn">
                        <router-link to="/about" target="self">About</router-link>
                    </li>

                </ul>
            </div>
        </div>
    </header>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  // // 初始化
  // const fetchInitData = store => {
  //   // store.dispatch('fetchIndex');
  //   console.log(111);
  //   return store.dispatch('fetchCatalogList', { parentId: 1});
  // }
export default {
  name: 'header-list',

  // prefetch: fetchInitData,

  components: {
  },

  data () {
    return {
      searchVal: '',
      banners: ''
      // cataloglist: []
    }
  },

  computed: {
    ...mapGetters([
      'catalogList',
      'userList'
    ])
  },

  beforeMount () {
    // console.log(this.$root._isMounted);
    if (this.$root._isMounted) {
      // this.loadItems(this.page)
    }
    this.init();
  },

  beforeDestroy () {
    // this.unwatchList()
  },

  mounted () {
    // getHeaderCatalog
    // 初始化加载产品列表
    // 第一次进来 from.name 等于 null
    this.$store.dispatch('fetchIsLogin');
    this.$nextTick(function () {
      // let listItems = this.$el.querySelectorAll('.header .list-item');
      // let navListItems = this.$el.querySelectorAll('.header .nav-list-li');
      // let itemsWidth;

      // for (let i = 0; i < listItems.length; i++) {
      //   itemsWidth = 0;
      //   for (let j = 0; j < i; j++) {
      //     itemsWidth += navListItems[j].offsetWidth;
      //   }
      //   listItems[i].style.marginLeft = this.$el.querySelector('.header .nav-list .logo-item').offsetWidth + itemsWidth + 15 + 'px';
      // }
    })
    setTimeout(() => {
      let listItems = this.$el.querySelectorAll('.header .list-item');
      let navListItems = this.$el.querySelectorAll('.header .nav-list-li');
      let itemsWidth;

      for (let i = 0; i < listItems.length; i++) {
        itemsWidth = 0;
        for (let j = 0; j < i; j++) {
          itemsWidth += navListItems[j].offsetWidth;
        }
        listItems[i].style.marginLeft = this.$el.querySelector('.header .nav-list .logo-item').offsetWidth + itemsWidth + 15 + 'px';
      }
    }, 1000);
    
  },
  watch: {
  },
  methods: {
    /**
     * [init 初始化加载导航]
     * @author luke 2018-06-20
     */
    init () {
      // 初始化加载产品列表
      this.$store.dispatch('fetchCatalogList', { parentId: 1});
    },
    /**
     * [setCatalog 设置顶部样式]
     * @author luke 2018-06-20
     */
    async setCatalogItem (cid) {
      let obj = {
        api: 'getMoreCatalog',
        data: {
          parentId: cid,
          num: 1
        }
      }
      let json = await this.$store.dispatch('fetchGetAll', obj)
      return json[cid];
    },
    /**
     * [searchProducthandler 跳转搜索]
     * @author luke 2018-06-19
     */
    searchProducthandler () {
      this.$router.push({path: '/search'});
    },
    /**
     * [handleCommand 个人中心]
     * @author luke 2018-06-19
     */
    handleCommand (val) {
      if (val === 'myAccount') {
        this.$router.push({path: '/myAccount'})
      } else {
        // 退出登录
        this.$cookie.delete('userAuthToken');
        this.$store.commit('FETCH_USER_SUCCESS', '');
        // 退出登陆跳转首页
        this.$router.push({path: '/index'});
      }
    }
  }
}
</script>
<!-- 样式 -->
<style lang='less' scoped>
 @import '../assets/var.less';
  #header {
    background-color: #FAFAFA;
    /*opacity: 0.9;*/
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 900;
    font-smooth: antialiased;
    font-family: MuseoSans-300;
    font-size: @font22;
    /*box-shadow: 0 2px 6px 0 rgba(0,0,0,.17);*/
    color: #666;
    &.shadow {
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    }
  }

  .headerTop {
    background-color: #3c3c3c;
    height: 40px;
    border-top: 1px solid transparent;
  }

  .head-nav-top {
    text-align: center;
    position: relative;
    h1, a {
      display: inline-block;
    }
  }

  .center-main {
    width: 1060px;
  }

  /*nav*/

  .head-nav-list {
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    a {
      font-size: 15px;
      color: #9B9B9B;
      line-height: 22px;
      font-family: MuseoSans-300;
    }
    .logo{
      position: absolute;
      line-height: 60px;
      padding-left: 10%;
    }
    .nav-list {
      float: left;
      li {
        display: inline-block;
      }
      .nav-list-li {
        padding-left: 15px;
        padding-right: 15px;
      }
      .m-nav-list-li {
        .el-input{
          width: 250px;
          margin-right: 15px;
        }
        .el-icon-search{
          cursor: pointer;
        }
      }
    }
    .block-right {
      float: right;
      text-align: center;
      line-height: 40px;
      height: 40px;
      margin: 10px 0px;
      .login-register{
        float: left;
        margin-right: 30px;
        .logined {
          font-size: 15px;
          .el-dropdown{
            font-size: 15px;
          }
          p {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .unlogin {
          span{
            display: inline-block;
            height: 23px;
            line-height: 23px;
            font-size: 15px;
          }
        }
      }
      .search-container {
        float: left;
        padding: 0px 20px;
        cursor: pointer;
        margin-top: 2px;
        i {
          font-size: 16px;
        }
        &:hover{
          color: #00416f;
        }
      }
      
    }
    a:hover{
      color: #00416f;;
    }
  }

  /*nav*/

  /*Product menu list*/
  .item-dropdown {
    .nav-list-item {
      /*opacity: 0;*/
      display: none;
      width: 100%;
      padding: 16px 0px;
      position: absolute;
      top: 100%;
      left: 0;
      height: auto;
      background-color: #fff;
      border: 1px solid #eee;
      border-top: 0;
      box-shadow: 0 5px 5px rgba(104, 104, 104, 0.3);
      font-size: 0;
      transition: all 0.3s;
      .center-main {
        width: 1060px;
        .list-item {
          li {
            height: 32px;
            line-height: 32px;
            display: block;
          }
        }
      }
      
    }
    .link-wrapper {
      display: inline-block;
      a:hover {
        color: #333;
      }
    }
    .el-icon-arrow-down, .el-icon-arrow-up{
      font-size: 15px;
      color: #9B9B9B;
      padding-left: 3px;
    }
    .el-icon-arrow-down {
      display: inline-block;
    }
    .el-icon-arrow-up {
      display: none;
    }
    
    > a .iconfont {
      display: none;
    }
    .list-item {
      line-height: 1;
      font-size: 15px;
      font-family: MuseoSans-300;
      .dl-item {
        width: 180px;
        margin-right: 19px;
        float: left;
        li {
          font-size: 12px;
          display: block;
        }
      }
      h5 {
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 18px;
        font-family: MuseoSans-700, Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
        color: #000;
      }
      a {
        display: block;
      }
      .list-item-first {
        min-height: 120px;
        position: relative;
        img, i {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .nav-list-item-about .list-item{
      margin-left: 35%;
    }
    .center-main {
      width: auto;
    }
  }

  .hover-able{
    cursor: pointer;
    &:hover .nav-list-item {
      /*opacity: 1;*/
      display: block;
      /*border-top: 1px solid #6446BE;*/
      transform: translate3d(0,0,0)
    }
    &:hover {
      .link-wrapper {
        border-bottom: 2px solid #00416f;
        a {
          color: #333;
        }
      }
      .nav-list-item a:hover {
        color: #333;
      }
      .el-icon-arrow-down {
        display: none;
      }
      .el-icon-arrow-up {
        display: inline-block;
      }
    }
  }
</style>

<style lang="less">
  .banner {
    margin-top: 0px !important;
  }
</style>
