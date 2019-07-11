<template>
  <transition name="backtop">
    <div class="back-top" v-if="isShow" @click="scrollToTop">
        <i class="el-icon-arrow-up"></i>
    </div>
  </transition>
</template>
<script>
  export default {
    data () {
      return {
        isShow: false
      }
    },
    mounted () {
      this.$nextTick(() => {
        document.addEventListener('scroll', this.addEventScroll) // 绑定document 如果子页面有另外scroll监听需求 添加阻止冒泡
      })
    },
    methods: {
      addEventScroll (ele) {
        try {
          this.isShow = ele.target.documentElement.scrollTop > 700
        } catch (e) {
          console.error(e)
          this.isShow = false
        }
      },
      scrollToTop () { // 点击返回top  小动画
        let thatTop = document.documentElement.scrollTop
        let i = 0.9
        let tran = setInterval(() => {
          document.documentElement.scrollTop = thatTop * i
          i = i - 0.1
          if (i <= 0) clearInterval(tran)
        }, 20)
        setTimeout(() => {
          this.isShow = false
        }, 500)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/var.less';
  .back-top{
    right: auto;
    left: 1630px;
    display: block;
    position: fixed;
    top: 50%;
    width: 44px;
    height: 44px;
    cursor: pointer;
    z-index: 50;
    background-color: #999999;
    line-height: 44px;
    text-align: center;
    .el-icon-arrow-up  {
      color: white;
    }
  }
  .back-top:hover{
    background-color: #01c8a9;;
  }
</style>
