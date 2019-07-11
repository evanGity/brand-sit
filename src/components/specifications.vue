<template>
  <div class="tab-content-specific">
    <div class="text text-label">Specifications</div>
    <table class="table">
      <tr v-for="item in specificationData">
        <td class="key">{{item.specsName}}</td>
        <td class="value">{{item.specsValue}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    props: {
      specificationData: {
        type: Array,
        default: function () {
          return []
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~assets/var.less';
  .tab-content-specific{
    position: relative;
    width: 100%;
    .text-label{
      display: block;
      height: 42px;
      line-height: 42px;
      padding-left: 50px;
      font-size: 22px;
      font-weight: 600;
      color: @white;
      background-color: #484848;
    }
    .table {
      margin: 20px 0;
      width: 100%;
      font-size: 18px;
      line-height: 1.25;
      border-collapse: collapse;
      td{
        border: solid 1px #c9c9c9;
        padding: 11px 53px;
        margin: 0;
      }
      td.key{
        width: 380px;
        background-color: #e6e6e6;
      }
    }
  }
</style>
