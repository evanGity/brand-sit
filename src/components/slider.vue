<template>
  <div v-swiper:mySwiper="swiperOption" @someSwiperEvent="callback">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(banner, key) in banners" :key='key'>
        <img :src="banner">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<style lang="less">
  @import '../assets/swiper.less';
</style>
<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      banners: {
        type: Array,
        default: []
      },
      swiperOption: {  //配置项
        type: Object,
        default: {}
      }
    },
    mounted() {
      // this.mySwiper.slideTo(3, 1000, false);
    }
  }
</script>