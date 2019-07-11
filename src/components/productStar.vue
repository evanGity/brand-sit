<template>
  <div class="product-star">
    <!-- 星级描述使用百分比来显示多少 5分为满分 -->
    <div class="product-star-all"><span class="product-star-stars"><i class="product-star-stars-img" :style="{width:star/5*100+'%'}"></i></span></div>
  </div>
</template>
<script>
  export default {
    props: {
      star: { // 星级 满分5
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang='less' scoped>
  .product-star{
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    align-items: center;
    .product-star-all{
      display: inline-block;
      width: 101px;
      height: 17px;
      .product-star-stars{
        display: inline-block;
        width: 100%;
        height: 100%;
        background: url(../assets/img/amazon-star.png);
        background-position: -102px -52px;
        .product-star-stars-img{
          display: inline-block;
          height: 100%;
          background: url(../assets/img/amazon-star.png);
          background-position: left -52px;
          width: 0%;
        }
      }
    }
  }
</style>
