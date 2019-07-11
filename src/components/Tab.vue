<template>
  <div class="tab">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabList" :label="item.label" 
        :name="item.name" :key="index">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: '1'
      }
    },
    props: {
      tabList: {
        type: Array,
        default: []
      }
    },
    methods: {
      handleClick (tab){
        this.$emit('showCurrentView', tab.index * 1 + 1);
      }
    }
  }
</script>
<style lang="less">
  .tab {

  }
  
</style>