<template>
  <div class="downlist">
    <Banner :bannerList="bannerList" :bannerStyle='bannerStyle'></Banner>
    <div class="nav-wrap">
      <div class="nav-main center-main">
        <ul>
          <li v-for="(item, key) in catalogList" :key="key" :style="{width: width}" @click='getDownloadProducts(item.categoryId, key)' 
          :class='{"active": key === activeVal}'  :data-categoryId='item.categoryId'>
            {{ item.categoryName }}
          </li>
          <li class="bot"></li>
        </ul>
        <div>
          <productItem v-for="(item, index) in productList" :item="item" 
          :key="index">
          </productItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Banner from 'components/bannerCommon.vue'
  import productItem from 'components/productItem.vue'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        bannerList: [1],
        bannerStyle:{},
        activeVal: 0,
        productList: []
      }
    },
    components:{
      Banner, productItem
    },
    computed: {
      ...mapGetters([
        'catalogList'
      ]),
      width() {
        return parseInt((1/this.catalogList.length *10000))/100 + '%';
      }
    },
    watch: {
      catalogList: function (){
        this.getDownloadProducts(this.catalogList[0].categoryId, 0);
      }
    },
    methods: {
      getDownloadProducts(cId, key) {
        var _this = this;
        var obj = {
          api: "getDownloadProducts",
          data: {
            'categoryId': cId
          }
        };
        this.$store.dispatch("fetchGetAll", obj).then((res) => {
          _this.activeVal = key;
          if((typeof res).toUpperCase() === 'object'){
            _this.productList = res;
          }
        }, (res) => {
          console.log(res)
        });
      }
    },
    mounted: function (){
    }
  }
</script>
<style lang="less" scoped>
@import '~assets/var.less';
 .nav-wrap {
    padding: 15px 0 15px;
    li{
      float:left;  
      text-align: center;
      font-size: @font22;
      font-weight: bold;
      color: @font-black-color;
      cursor: pointer;
      &.active{
        color: @black;
      }
    }
    li + li{
      border-left: 1px solid #dcdcdc;
    }
  }
</style>