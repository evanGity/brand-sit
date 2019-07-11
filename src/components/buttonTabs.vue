<template>
  <div class="tabs-content">
    <div v-for="(tab, index) in dataTabs" :key="tab.dicName" @click.stop="onTabClick(tab, index)" :class="currentIndex === index ?'active':''" class="content-tab">{{tab.dicName}}</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        currentIndex: 0 // 默认高亮第一个
      }
    },
    props: {
      dataTabs: { // tabs list数据
        type: Array,
        default: function () {
          return []
        }
      },
      clkAction: Function, // 点击回调函数 返回选中数据
      defaultSelected: Number // 初始化默认选择项 0开始
    },
    created () {
      this.currentIndex = this.defaultSelected || 0 // 设置默认选中值
    },
    methods: {
      onTabClick (tab, index) { // 点击botton时回调 回传选中item值和index值
        this.currentIndex = index
        if (typeof this.clkAction === 'function') this.clkAction(tab)
      }
    }
  }
</script>

<style lang="less">
  @import '~assets/var.less';
  .tabs-content {
    width: 1196px;
    display: block;
    display: flex;
    .content-tab{
      padding: 0 40px;
      line-height: 40px;
      text-align: center;
      color: @white;
      background-color: @font-black-color;
      border-radius: 6px 6px 0 0;
      background-clip: padding-box;
      cursor: pointer;
      margin-right: 30px;
    }
    div.active{
      background-color: @blue;
    }
  }
</style>
