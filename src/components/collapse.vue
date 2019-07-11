<template>
  <div class="collapse">
    <el-collapse v-model="activeName" >
      <el-collapse-item v-for="(item, index) in collapseData" :name=index :key="index">
        <template slot="title">
          {{ item.title }}
        </template>
        <div v-html="item.content"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 0
      }
    },
    props: {
      collapseData: {
        type: Array,
        default: []
      }
    }
  }
</script>
<style lang="less">
  .collapse {
    .el-collapse-item__header{
      font-size: 21px;
      background-color: #FAFAFA;
      height: 95px;
      line-height: 95px;
      .el-collapse-item__arrow {
        line-height: 95px;
      }
    }
    .el-collapse-item__wrap {
      background-color: #FAFAFA;
      .el-collapse-item__content {
        font-size: 15px;
        line-height: 23px;
        strong {
          font-size: 16px;
        }
      }
    }
  }
  
</style>