<template>
  <div class="box-account">
    <div class="account-baseinfo">
      <div class="account-baseinfo-inner">
        <div><img src="../../assets/img/account-head.png"></div>
        <div class="baseinfo-text" v-if="userList">
          <h3>{{ uName }}</h3>
          <p>{{ lastName }}</p>
        </div>
      </div>
      <div class="logout" @click="logout">Logout></div>
    </div>
    <div class="account-tab">
      <h3>My Account</h3>
      <tab
      :tabList="tabList"
      @showCurrentView="updateTabContent"
      ></tab>
    </div>
    <div class="account-content" v-if="flag">
      <keep-alive>
        <components :is="currentView" :key="currentView" ></components>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import tab from 'components/Tab.vue'
import changePassword from '../myAccount/changePassword.vue'
import myProduct from '../myAccount/myProduct.vue'
import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        // 'catalogList',
        'userList'
      ]),
      uName () {
        if (this.userList.email){
          let index = this.userList.email.indexOf('@');
          return this.userList.email.substr(0, index);
        }
        return '';
      },
      lastName () {
        if (this.userList.email){
          let index = this.userList.email.indexOf('@');
          return this.userList.email.substr(index);
        }
        return '';
      }
    },
    data() {
      return {
        tabList: [{
          label: 'My Product',
          name: '1',
        }, {
          label: 'Change Password',
          name: '2',
        }],
        index: -1, //选择的索引
        flag: true, // 是否显示
        currentView: 'components1'
      }
    },
    methods: {
      updateTabContent (index) {
        if (index === this.index){
          this.flag = false;
          setTimeout(() => {
            this.flag = true;
          }, 100);
        }
        this.index = index;
        this.currentView = 'components' + index;
      },
      logout () {
        // 退出登录
        this.$cookie.delete('userAuthToken');
        this.$store.commit('FETCH_USER_SUCCESS', '');
        // 退出登陆跳转首页
        this.$router.push({path: '/index'});
      }
    }, 
    components: {
      'tab': tab,
      'components1': myProduct,
      'components2': changePassword,
    }
  }
</script>

<style lang='less' scoped>
  .box-account {
    font-family: MuseoSans-300;
    height: 100%;
    background-color: #FAFAFA;
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
        width: 1060px;
        margin: 0 auto;
        height: 300px;
        display: flex;
        align-items: center;
        .baseinfo-text {
          margin-left: 30px;
          
        }
      }
      .logout {
        font-family: MuseoSans-300;
        font-size: 15px;
        color: #FFFFFF;
        line-height: 22px;
        position: absolute;
        top: 80px;
        right: 20%;
        cursor: pointer;
      }
    }
    .account-tab {
      padding-top: 40px;
      width: 1060px;
      margin: 0 auto;
      h3 {
        font-size: 36px;
        color: #191919;
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
    .el-tabs__header {
      margin: 0;
    }
    .el-input__inner {
      border-radius: 20px;
    }
    .el-input {
      display: block;
      margin: 0 auto;
    }
  }
</style>