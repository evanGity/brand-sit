<template>
  <div class="box-search">
    <div class="search-input">
      <div class="search-input-inner">
        <p>Looking for something？</p>
        <div class="search-input-prepare" @keyup.enter=searchProductHandler>
          <i class="el-icon-search" @click="searchProductHandler"></i>
          <el-input placeholder="Search Miroco Here"
           v-model="searchName">
          </el-input>
        </div>
      </div>
    </div>
    <div class="search-result-wrapper" v-loading="isLoading">
      <div class="search-result" v-if="searchList.total">
        <div class="search-result-count">
          <div class="search-result-count-inner">
            <p v-if="searchList.total">Search Result (<span>{{searchList.total}}</span>)</p>
            <p v-else>No Result</p>
          </div>
        </div>
        <div class="search-result-list">
          <product-item 
            v-for="(item, index) in searchList.list" 
            :item="item" 
            :key="index"
            :searchName="$route.query.keywords">
          </product-item>
          <div class="btn-load-more-wrapper">
            <el-button plain round @click="loadMoreHandler" v-show="searchList.list && searchList.list.length < searchList.total">Load More</el-button>
            <p v-show="isNoMoreData">No More</p>
          </div>
        </div>
      </div>

      <div class="search-result" v-if="searchList.isSearched && !searchList.total">
        <div class="search-result-count">
          <div class="search-result-count-inner">
            <p>No Result</p>
          </div>
        </div>
        <div class="search-result-none">
          <ul class="search-result-none-list">
            <li>1. Make sure all words are spelled correctly.</li>
            <li>2. Try different keywords.</li>
            <li>3. Try more gerneral keywords.</li>
            <li>4. Try fewer keywords.</li>
          </ul>
        </div>
      </div>
    </div>
    <back-top></back-top>
  </div>
</template>
<script>
  import productItem from 'components/productItem.vue'
  import backTop from 'components/backTop.vue'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'searchList'
      ]),
    },
    // 定义变量
    data () {
      return {
        searchName: '',
        pageNum: 1,
        isNoMoreData: false,
        isLoading: false
      }
    },
    // 引入组件
    props: {},
    mounted: function () {
    },
    // 方法
    methods: {
      searchProductHandler () {
        this.isNoMoreData = false;
        this.pageNum = 1;
        this.$router.replace({
          path: 'search',
          // name: 'search',
          query: {keywords: this.searchName}
        });
      },
      loadMoreHandler (){
        this.pageNum++;
        this.searchHandler();
      },
      async searchHandler (){
        this.isLoading = true;
        let data = {
          keywords: this.$route.query.keywords || this.searchName,
          pageSize: 12,
          pageNum: this.pageNum
        }

        await this.$store.dispatch('getSearchList', data);
        this.isLoading = false;
      }
    },
    components: {
      'product-item': productItem,
      'back-top': backTop
    }
  }
</script>
<style lang="less">
  .box-search {
    font-family: MuseoSans-300;
    .search-input {
      height: 400px;
      width: 1060px;
      margin: 0 auto;
      display: flex;
      align-items: center
    }
    .search-input-inner {
      .search-input-text {
        font-size: 36px;
        line-height: 38px;
      }
      p {
        font-size: 18px;
        line-height: 27px;
        margin-bottom: 15px;
      }
      .el-input {
        display: inline-block;
        margin-right: 25px;
        width: 350px;
        input {
          width: 600px;
          height: 50px;
          line-height: 50px;
          border-radius: 25px;
          border: none;
          font-size: 36px;
          font-family: MuseoSans-700;
          color: #000;
        }
      }
      i {
        cursor: pointer;
        font-size: 25px;
        height: 50px;
        color: #9B9B9B; 
      }
    }
    .search-result-wrapper {
      min-height: 300px;
    }
    .search-result {
      width: 1060px;
      margin: 0 auto;
      .search-result-count {
        font-size: 28px;
        padding: 23px 0 13px 0;
        border-bottom: 2px solid #979797;
        font-family: MuseoSans-700;
      }
      .search-result-list {
        margin-top: 57px;
        .btn-load-more-wrapper {
          margin-bottom: 183px;
          text-align: center;
          .el-button {
            width: 160px;
            font-family: MuseoSans-700;
            font-size: 15px;
            color: #00416f;
          }
          p {
            height: 40px;
            line-height: 40px;
            font-size: 15px;
            color: #808080a3;
          }
        }
      }
      .search-result-none-list{
        margin: 40px 0 170px 0;
        font-size: 15px;
        color: #9B9B9B;
        line-height: 22px;
      }
    }
  }
</style>
