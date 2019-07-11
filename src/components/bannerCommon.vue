<template>
  <div class="banner_common">
    <el-carousel :height='bannerHeight'>
      <el-carousel-item v-for="item in bannerList" :key="item" >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        border: "1px solid red"
      }
    },
    props: {
      bannerList: { //banner数据存储数组
        type: Array,
        default: []
      },
      bannerHeight: {
        type: String,
        default: "480px"
      }
    },
  }
</script>
<style lang="less" scoped>
  .banner_common {
    .el-carousel__container{
      height: auto;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
</style>