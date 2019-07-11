<template>
  <div id="app">
    <!-- 头部 -->
    <Header></Header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <footer-item></footer-item>
  </div>
</template>
<script>
  import Header from 'components/Header.vue'
  import footerItem from 'components/Footer.vue'
  export default {
    computed: {
    },
    // 定义变量
    data () {
      return {
      }
    },

    title () {
      return 'miroco';
    },

    // 引入组件
    props: {},
    mounted: function () {
    },
    // 方法
    methods: {
    },
    components: {
      'footer-item': footerItem,
      Header
    }
  }
</script>
<style lang="stylus">
@import 'assets/fonts/iconfont.less';
@import 'assets/public.less';
a
  color: inherit;
  text-decoration: none;
  cursor: pointer;
</style>
