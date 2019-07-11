<template>
  <div class="support-conn">
    <div>
      <img src="https://www.sable.co/img/support.png" >
    </div>
    <div class="support">
      <p class="title">Select a product</p>
      <!-- 显示产品说明书 -->
      <div class="list">
        
      </div>
      <div class="desc">
        <a href="mailto:support@sable.co">
            <!-- <div class="button button--mail float--right">Email Us</div> -->
            <el-button type="primary" class="float--right" style="width:300px;ling-height:50px;font-size: 32px;" >Email Us</el-button>
         </a>
         <div class="title">Online support</div>
         <div class="text">Please email us if you need any support, we will get back to you soon</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
    },
    // 定义变量
    data () {
      return {
        searchName: ''
      }
    },
    // 引入组件
    props: {},
    mounted: function () {
    },
    // 方法
    methods: {
    },
    components: {
    }
  }
</script>
<style lang="less" >
  .support-conn{
    padding-bottom: 100px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    .support{
      width: 1196px;
      display: block;
      margin-left: auto;
      margin-right: auto;
      padding-top: 30px;
      .title{
        font-size: 28px;
        font-weight: 500;
        line-height: 1;
        text-align: center;
      }
      .desc{
        padding-top: 58px;
        padding-bottom: 158px;
        margin-top: 50px;
        border-top: solid 1px #61BDC2;
        position: relative;
        .title{
          font-size: 32px;
          color: #333333;
          margin-bottom: 10px;
          text-align: left;
        }
      }
    }
  }
</style>
