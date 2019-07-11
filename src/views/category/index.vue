<template>
  <div class="content-category">
    <div class="top-img">
       <!--  <div alt="Portable Chargers" class="cat-banner" >
        </div> -->
        <img src="../../assets/img/category.jpg" width="100%">
    </div>
    <!-- 导航设置 -->
    <div class="nav-level">
      <div class="list">
        <!-- active  mentId -->
        <div class="item " v-for="item in catalogList" 
          v-bind:class="{ active: mentId === item.categoryId }"  
          @click="clickMenu(item)">
          {{ item.categoryName }}
          <span class="el-icon-arrow-down" v-if="item.childrenCatalogs && item.childrenCatalogs.length > 0"></span>
          <span class="el-icon-arrow-up" v-if="item.childrenCatalogs && item.childrenCatalogs.length > 0"></span>
        </div>
      </div>
    </div>
    <!-- 二级导航 -->
    <div class="sub-level">
      <div  class="item"  
          @click="clickMenu(mentObj)">
         <el-tag
          class="bd-tag"
          v-bind:class="{ active: cid == mentId }"
          >
          All
         </el-tag>
      </div>

      <div  class="item" v-for="(tag,index) in catalogArray" 
          @click="clickSubMenu(tag)" 
          v-if="catalogArray && catalogArray.length > 0">
         <el-tag
          :key="index"
          class="bd-tag"
          v-bind:class="{ active: cid == tag.categoryId }"
          >
          {{ tag.categoryName }}
         </el-tag>
       </div>

    </div>
    <div class="product-part" v-loading="loading" >
          <!-- <h2 class="color2">{{ cat.categoryName }}</h2> -->
          <!-- <div class="product-list" > -->
          <productItem :item="item" v-for="(item, index) in productsList" 
           :key="index" v-if="!loading">
          </productItem>
          <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
  import productItem from './product.vue'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'catalogList',
        'productsList'
      ]),
    catalogArray () {
      // 格式化获取cid
      let cid = this.cid;

      // 获取对象
      if (this.catalogList.length > 0){
        for (let i = 0; i < this.catalogList.length; i++) {
            let ths = this.catalogList[i];

            if (ths.categoryId === cid) {
              this.mentId = ths.categoryId;
              this.mentObj = ths;
              return ths.childrenCatalogs;
            }

            // 3级菜单
            if (ths.childrenCatalogs && ths.childrenCatalogs.length > 0) {
              for (let j = 0; j < ths.childrenCatalogs.length; j++) {
                let _ths = ths.childrenCatalogs[j];
                if (_ths.categoryId === cid) {
                  // 设置主导航
                  this.mentId = ths.categoryId;
                  this.mentObj = ths;
                  return ths.childrenCatalogs;
                }
              }
            }
        }
      }
      return [];
      }
    },
    // 定义变量
    data () {
      return {
        cataList: [],
        loading: false,
        mentId: '', // 主Id
        mentObj: {}, // 主对象
        cid: '' // 子Id

      }
    },
    mounted () {
      this.init();
    },
    watch: {
      '$route' (to, from) {
        this.init();
      }
    },
    title () {
      let _cid = this.$route.params.id;
      // 格式化获取cid
      _cid = _cid.split('-c-')[0];
      return _cid + '-Miroco';
    },
    // 方法
    methods: {
      /**
       * [init 初始化项目]
       * @author luke 2018-06-25
       */
      init () {
        let _cid = this.$route.params.id;
        // 格式化获取cid
        _cid = _cid.split('-c-')[1];
        let cid = _cid.substring(0, _cid.length - 5);
        this.cid = Number(cid);
        let ths = this;
        //获取数据
        setTimeout(() => {
          if (this.$common.isNull(this.mentId)) {
            setTimeout(() =>{
              this.init();
            }, 1500)
          } else {
            if (this.mentId === this.cid) {
              // 主的
              this.getMenuData(this.mentObj);
            } else {
              this.getData(cid);
            }
          }
        }, 100);
      },
      /**
       * [getData 获取数据]
       * @author luke 2018-06-25
       */
      async getData (id) {
        // this.$store.commit('SET_PRODUCT_LIST', []);
        this.loading = true;
        let data = {
          categoryIds: id
        }
        await this.$store.dispatch('getProductsList', data);
        this.loading = false;
      },
      /**
       * [clickMenu 点击主菜单]
       * @author luke 2018-06-25
       */
      getMenuData (obj) {
        this.mentId = obj.categoryId;
        this.cid = obj.categoryId;

        if (this.$common.isNull(obj.childrenCatalogs) || obj.childrenCatalogs.length < 1) {
          return;
        }
        // let url = '/category/' + obj.categoryName + '-c-' + obj.categoryId + '.html';
        // window.location.href = url;
        let ids = '';
        for (let i = 0; i < obj.childrenCatalogs.length; i++) {
           let _ths = obj.childrenCatalogs[i];
           // 更新数据
           ids += _ths.categoryId + ',';
        }
        ids = ids.substring(0, ids.length -1);
        this.getData(ids);
      },
      /**
       * [clickMenu 跳转页面]
       * @author luke 2018-07-31
       */
      clickMenu (obj) {
        let url = '/category/' + obj.categoryName + '-c-' + obj.categoryId + '.html';
        window.location.href = url;
      },
      /**
       * [clickSubMenu 点击子菜单]
       * @author luke 2018-06-25
       */
      clickSubMenu (obj) {
        let url = '/category/' + obj.categoryName + '-c-' + obj.categoryId + '.html';
        window.location.href = url;
      }
    },
    components: {
      productItem
    }
  }
</script>
<style lang='less' >
  .content-category{
    background-color: #FAFAFA;
    .top-img{
      .cat-banner{
        background:url(../../assets/img/category.jpg) center center no-repeat;
        width: 100%;
        display: block;
        height: 100%;
        background-size: 100%;
      }
    }
    .nav-level{
      font-size: 18px;
      background: #fff;
      padding-top: 50px;
      border-bottom: 1px solid #EFEFEF;
      .list{
        width: 1060px;
        margin: 0 auto;
        display: flex;
        padding-left: 10px;
        .item{
          margin-right: 30px;
          padding-top: 10px;
          padding-bottom: 20px;
          color: #9F9F9F;
          line-height: 27px;
          font-weight: 300;
          border-top: 3px solid #FFF;
          cursor: pointer;
          .el-icon-arrow-down {
            display: inline-block;
          }
          .el-icon-arrow-up {
            display: none;
          }
          &:hover{
            color: #333;
          }
        }
        .active{
          color: #333;
          border-bottom: 2px solid #00416f;
        }
      }
    }
    .sub-level {
      width: 1060px;
      margin: 0 auto;
      padding-top: 32px;
      display: flex;
      .item{
        margin-right: 6px;
        padding-left: 6px;
        cursor: pointer;
        .bd-tag{
          color: #00416f;
          background: #FFF;
          border: 1px solid #00416f;
          font-family: MuseoSans-300;
          font-size: 15px;
        }
        .active{
          color: #FFF;
          background: #00416f;
        }
      }
    }
    .product-part{
      padding-top: 16px;
      padding-bottom: 40px;
      border-top: 1px solid #EFEFEF;
      width: 1060px;
      margin: 0 auto;
      min-height: 350px;
      margin-top: 30px;
      h2{
        font-size: 22px;
        margin: 0 0 70px;
        font-weight: bold;
        text-align: center;
      }
    }
  }
</style>
