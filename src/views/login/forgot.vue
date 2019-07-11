<template>
	<!-- 忘记密码 -->
  <div class="box-account">
  	<changePassword></changePassword>
  </div>
</template>

<script>
import tab from 'components/Tab.vue'
import changePassword from '../myAccount/changePassword.vue'
  export default {
    data() {
      return {
      }
    },
    methods: {
      updateTabContent (index){
        // console.log('index: ' + index)
        this.currentView = 'components' + index;
      }
    }, 
    components: {
      'changePassword': changePassword,
    }
  }
</script>

<style lang='less' scoped>
  .box-account {
    font-family: MuseoSans-300;
    h3 {
      font-size: 36px;
      line-height: 38px;
      margin-bottom: 10px;
      font-family: MuseoSans-700;
    }
    p {
      font-size: 18px;
      line-height: 27px;
    }
    .account-baseinfo {
      background-color: #00416f;
      position: relative;
      .account-baseinfo-inner {
        color: #fff;
        padding-left: 520px;
        height: 300px;
        display: flex;
        align-items: center;
        .baseinfo-text {
          margin-left: 30px;
          
        }
      }
      .logout {
        a {
          font-size: 16px;
          color: #fff;
        }
        position: absolute;
        top: 80px;
        right: 12%;
      }
    }
    .account-tab {
      padding-top: 40px;
      h3 {
        font-size: 36px;
        color: #191919;
        margin-left: 520px;
        font-family: MarkPro-Bold;
      }
      .tab {
        margin-top: 15px;
      }
    }
    .account-content{
      background: #FAFAFA;
    }
  }
</style>

<style lang="less">
  .box-account {
  }
</style>