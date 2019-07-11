<template>
  <div class="search-list">
    <div class="search-item" v-for="item in list">
      <div class="img-container">
        <a :href=item.detailLink target="_blank">
          <img class="lazy" :src=item.imgUrl>
        </a>
      </div>
      <div class="content-container">
        <h4><a :href=item.detailLink target="_blank" v-html=item.productTitle></a></h4>
        <p class="product-desc-detail" :title=item.productSimpleInfo>
          {{item.productDetailInfo}} 
        </p>
        <p class="learn-support">
          <a :href=item.detailLink>Learn more &gt;</a>
        </p>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    mounted () {
      
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/var.less';
  .search-list{
    color: #666;
    .search-item:before, .search-item:after{
      display: table;
      content: " ";
    }
    .search-item:after{
      clear: both;
    }
    .search-item{
      margin-bottom: 40px;
      a:hover {
        color: #27b0b3;
        text-decoration: none;
      }
      a{
        color: #666;
      }
      .img-container{
        text-align: center;
        width: 33.3%;
        a{
          display: inline-block;
          width: 200px;
          height: 200px;
          max-width: 100%;
          position: relative;
          text-align: center;
        }
        img{
          max-width: 130px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .img-container, .content-container{
        float: left;
        position: relative;
        min-height: 1px;
        padding-right: 15px;
        padding-left: 15px;
        // text-align: center;
      }
      .content-container{
        width: 66.7%;
        h4{
          font-weight: bold;
          font-size: 18px;
          line-height: 1.1;
          color: #666;
        }
        p{
          height: 84px;
          overflow: hidden;
          line-height: 28px;
          margin: 20px 0 32px;
        }
        .learn-support a{
          color: #00c8a8;
        }
      }
    }
  }
</style>
