<template>
  <div class="box-change-password">
    <div class="box-change-password-inner" v-loading="isLoading">
      <el-steps :active="active" finish-status="success">
        <el-step v-for="(item, index) in stepList" :title="item.title" :key="index">
        </el-step>
      </el-steps>
      <div class="change-password-content">

        <div class="content-step content-step-1" v-if="active == 0">
          <img src="../../assets/img/unlock.png">
          <!-- 判断提示文字 -->
          <h3 v-if="urlName === 'forgot'">Forget Your Password?</h3>
          <h3 v-else >Change Your Password?</h3>

          <p>To reset your password, please enter the email address that you use for your miroco account below.</p>
          <el-input v-model="emailAddressVal" placeholder="Your email address" 
          @input="valdiateEmailHandler" :disabled="urlName !== 'forgot'" >
          </el-input>
          <div class="validateTips-wrapper">
            <p class="validateTips" v-if="!isEmailValid">
              {{ emailValidateTips }}</p>
          </div>
          <el-button round @click="step1Submit" >Next</el-button>
        </div>


        <div class="content-step content-step-2" v-else-if="active == 1">
          <img src="../../assets/img/email.png">
          <h3>Reset Code Confirmation</h3>
          <p>We have sent the validation code to your email.</p>
          <el-input v-model="ValidateCode" placeholder="Validation code">
            <span :class="{'pointer': isLeaveNoTime}" slot="append" @click="resendValidateCode">{{leaveTimeText}}</span>
          </el-input>
          <div class="code-validate-tips">{{codeValidateTip}}</div>
          <el-input v-model="newPassword" placeholder="new password" type="password"></el-input>
          <div class="pwd-validate-tips">{{pwdValidateTip}}</div>
          <el-button round @click="step2Submit" >Reset Password</el-button>
        </div>


        <div class="content-step content-step-3" v-else-if="active == 3">
          <img src="../../assets/img/completed.png">
          <h3>Completed!</h3>
          <p>You've changed your password.</p>
          <el-button round @click="step3Submit" >Done</el-button>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        active: 0,
        stepList: [{
          title: 'step1'
        },{
          title: 'step2'
        },{
          title: 'step3'
        }],
        emailAddressVal: '',
        ValidateCode: '',
        newPassword: '',
        isLoading: false,
        isEmailValid: true,
        emailValidateTips: '',
        urlName: '', // 路由
        leaveTime: 300,
        leaveTimeText: '',
        isLeaveNoTime: false,
        codeValidateTip: '',
        pwdValidateTip: ''
      }
    },
    computed: {
      ...mapGetters([
        'userList'
      ])
    },
    mounted () {
      // 解决初始化显示登陆用户邮箱
      this.urlName = this.$route.name;
      setTimeout(() => {
        this.emailAddressVal = this.userList.email;
      }, 500);
    },
    methods: {
      setLeaveTime () {
        if (this.leaveTime === 0) {
          clearInterval(this.leaveTimeId);
          this.leaveTimeText = 'Resend Code';
          this.isLeaveNoTime = true;
        } else {
          this.leaveTime--;
          this.leaveTimeText = this.leaveTime + 'S';
        }
      },
      leaveTimeHander () {
        this.leaveTime = 300;
        this.leaveTimeText = this.leaveTime + 'S';
        this.leaveTimeId = setInterval(this.setLeaveTime, 1000);
      },
      step1Submit (){
        if(!this.isEmailValid){
          return;
        }
        // 判断输入邮箱格式
        if (this.$common.isNull(this.emailAddressVal)) {
          this.emailValidateTips = 'Please enter email address';
          this.isEmailValid = false;
          return;
        }

        this.isLoading = true;
        
        let obj = { api: 'restPassword', data: { email: this.emailAddressVal, 
          existUser: true }};
        this.$store.dispatch('fetchAllList', obj).then(json => {
          this.isLoading = false;
          this.active = 1;

          this.leaveTimeHander();
          setTimeout( ()=> {
            this.ValidateCode = '';
            this.newPassword = '';
          }, 500);
        }).catch(error => {
          this.isEmailValid = false;
          this.emailValidateTips = error;
          this.isLoading = false;
        });
      },
      step2Submit (){
        if (this.$common.isNull(this.ValidateCode)){
          this.codeValidateTip = 'Validate code must be entered.';
        } else {
          this.codeValidateTip = '';
        }


        if (this.$common.isNull(this.newPassword)){
          this.pwdValidateTip = 'Password must be entered.';
        } else {
          this.pwdValidateTip = '';
        }

        if (this.codeValidateTip || this.pwdValidateTip) {
          return;
        }

        this.isLoading = true;

        let obj = { api: 'modifyPassword', data: {email: this.emailAddressVal, passWord: this.newPassword, code: this.ValidateCode}};
        this.$store.dispatch('fetchAllList', obj).then(json => {
          this.isLoading = false;
          this.active= 3;
        }).catch(error => {
          this.$message.error(error);
          this.isLoading = false;
        });
      },
      /**
       * [step3Submit 成功后跳转个人中心页面]
       * @author luke 2018-06-30
       */
      step3Submit (){
        if (this.urlName === 'forgot') {
          this.$router.push({path: '/login'});
        } else {
          this.$router.go(0);
        }
      },
      resendValidateCode () {
        if (this.isLeaveNoTime === false) {
          return;
        }

        this.leaveTimeHander();
        this.isLoading = true;

        let obj = { api: 'restPassword', data: {email: this.emailAddressVal}};
        this.$store.dispatch('fetchAllList', obj).then(json => {
          this.isLoading = false;
          this.$message({
            message: '发送成功',
            type: 'success'
          });
        }).catch(error => {
          this.$message.error(error);
          this.isLoading = false;
        });
      },
      valdiateEmailHandler (value) {
        if (value === '') {
          this.emailValidateTips = 'Please enter email address';
          this.isEmailValid = false;
        } else if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
          this.emailValidateTips = 'Please enter correct email address';
          this.isEmailValid = false;
        } else {
          this.emailValidateTips = '';
          this.isEmailValid = true;
        }
      }
    }, 
    components: {
    }

  }
</script>

<style lang="less" scoped>
  .box-change-password {
    .box-change-password-inner {
      width: 650px;
      margin: 0 auto;
      padding: 80px 0;
      .change-password-content {
        width: 520px;
        text-align: center;
        padding-top: 120px;
        margin: 0 auto;
        .content-step {
          display: flex;
          align-items: center;
          flex-direction: column;
          img {
            width: 160px;
            height: 160px;
          }
          h3 {
            margin-top: 53px;
            margin-bottom: 15px;
            font-family: MuseoSans-700;
          }
          p {
            margin-bottom: 45px;
          }
          .el-button {
            background-color: #00416f;
            color: #fff;
          }
        }

        .content-step-1, .content-step-2{
          .el-input, .el-button{
            width: 340px;
          }
          .code-validate-tips, .pwd-validate-tips {
            width: 340px;
            padding-left: 15px;
            height: 40px;
            line-height: 30px;
            color: red;
            text-align: left;
          }
        }
        .content-step-1 {
          .el-input + .el-button{
            margin: 30px 0 15px 0;
          }
          .validateTips-wrapper {
            height: 55px;
            width: 340px;
            margin: 0 auto;
            .validateTips {
              text-align: left;
              font-size: 14px;
              color: red;
              margin-bottom: 0;
            }
          }
        }
        .content-step-2 .el-input + .el-input {
          margin-top: 10px;
        }
        .content-step-3 .el-button {
          width: 160px;
        }
      }

      h3 {
        font-size: 36px;
        line-height: 38px;
        margin-bottom: 10px;
      }
      p {
        font-size: 18px;
        line-height: 27px;
      }
    }
  }
</style>

<style lang="less">
 .box-change-password {
  .el-input-group__append {
    position: absolute;
    top: 10px; 
    right: 20px;
    width: auto;
    border: none;
    padding: 0;
    font-size: 10px;
    color: #00416f;
    background-color: #fff;
  }
  .el-input-group__append .pointer{
    cursor: pointer; 
  }
  .el-button + .el-button {
    margin-left: 0;
  }
  .el-button {
    font-family: MuseoSans-700;
    font-size: 15px;
  }
 }

</style>
