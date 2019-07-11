<template>
  <div class="regiter-page">
    <div class="regiter-page-header">
      <img src="../../assets/img/login-title.png" class="regiter-page-header-icon">
      <div class="regiter-page-header-text">Let's Sign Up!</div>
    </div>
    <div class="login-content">
      <div class="login-content-left">
        <p class="content-left-why">Why Miroco account?</p>
        <div class="left-why-an-item"><i></i>Get prodcut warranty coverage</div>
        <div class="left-why-an-item"><i></i>Qualify for promotions and special offers</div>
        <div class="left-why-an-item"><i></i>Get easy access to product support</div>
        <div class="content-sign--account">Already have an account? <span @click="signIn">Sign in ></span></div>
      </div>
      <div class="login-content-right">
        <p class="login-right-title">Sign Up To Your Miroco Account</p>
   <!--      <el-input class="login-input" placeholder="Your name" v-model="form.name"></el-input> -->
        <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item
            prop="userMail"
            :rules="[
              { required: true, message: 'Please enter the Email'},
              { type: 'email', message: 'Please enter a valid Email', trigger: ['blur', 'change'] }
            ]"
          >
            <el-input class="login-input" placeholder="Email address" v-model="form.userMail"></el-input>
          </el-form-item>

          <el-form-item
            prop="userPwd"
            :rules="[
              { required: true, message: 'Please enter the password'}
            ]"
          >
            <el-input type="password" class="login-input" placeholder="Enter password 6-15 characters in length" v-model="form.userPwd"></el-input>
          </el-form-item>


          <el-form-item>
            <!-- signFn -->
            <div class="login-input-item">
              <el-select v-model="form.countryCode"  class="w-input" placeholder="Select country">
                <el-option
                  v-for="item in countryList"
                  :key="item.dicValue"
                  :label="item.dicName"
                  :value="item.dicValue">
                </el-option>
              </el-select>
            </div>
            <!-- 验证码 -->
            <div class="regiter-verify" v-if="sitekey !== ''" >
              <vue-recaptcha
                @verify="onVerify"
                :sitekey="sitekey" >
              </vue-recaptcha>
            </div>
            <div class="regiter-page-login" @click="submitForm('form')">Submit</div>
          </el-form-item>
      </el-form>

        <div class="login-remeber">
          <el-checkbox v-model="radio" class="login-remeber-text"></el-checkbox>
          I agree to miroco
          <router-link to="/termsCondition">
           <span class="login-remeber-forgot">Terms & Conditions</span>
          </router-link>
          &nbsp;and&nbsp;
          <router-link to="/privacyPolicy">
             <span class="login-remeber-forgot">Privacy Policy</span>
          </router-link>
        </div>
        <div class="login-or-line" v-if="false"><em></em>or<em></em></div>
        <div class="regiter-page-gogo" v-if="false"><i class="iconfont icon-google"></i>Login with Google+</div>
        <div class="regiter-page-gogo" v-if="false" @click="fLogin">
            <i class="iconfont icon-facebook2"></i>Login with Facebook</div>
      </div>
    </div>
  </div>
</template>
<script>
  import VueRecaptcha from 'vue-recaptcha';
  export default {
    computed: {
    },
    // 定义变量
    data () {
      return {
        pass: '',
        radio: false,
        sitekey: '',
        form: {
          brand: "tt",
          userMail: '',
          userPwd: '',
          countryCode: 'US',
          amzPrime: true,
          registerSource: '',
          subscribe: false // 是否订阅
        },
        countryList: []
      }
    },
    mounted: function () {
      // 设置是否记住密码
      // 获取验证码
      let obj = {
        api: 'getRecaptcha',
        data: {}
      };
      this.$store.dispatch('fetchAllList', obj).then(json => {
        this.sitekey = json.siteKey;
      }).catch(error => {
        this.$message.error(error);
      });
      this.init();
    },
    // 方法
    methods: {
      /**
       * [init 初始化获取数据]
       * @author luke 2018-05-23
       */
      async init () {
        // 获取国家下拉列表
        let obj = {
          api: 'getCountry',
          data: {}
        }
        this.countryList = await this.$store.dispatch('fetchGetAll', obj);
        // 加载fb
        window.fbAsyncInit = function() {
          FB.init({
            appId      : '447148535727155',
            cookie     : true,
            xfbml      : true,
            version    : 'v3.0'
          });
          FB.AppEvents.logPageView();   
        };

        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "https://connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));

      },
      onVerify: function (response) {
        this.form.verifyCode = response;
        console.log('Verify: ' + response);
      },
      /**
       * [register 注册方法]
       * @author luke 2018-05-22
       */
      register () {
        // 判断是否输入
        if (this.$common.isNull(this.form.userMail)) {
          this.$message('Email address must be entered.');
          return;
        }
        if (this.$common.isNull(this.form.userPwd)) {
          this.$message('Password must be entered.');
          return;
        }
        // 判断是否同意
        if (!this.radio) {
          this.$message('Please agree to miroco Terms & Conditions and Privacy Policy.');
          return;
        }
        let obj = {
          api: 'getRegister',
          data: this.form
        }
        this.$store.dispatch('fetchAllList1', obj).then(json => {
          this.$message({
            message: 'Registered Success!',
            type: 'success'
          });
          this.$router.push({path: '/login'})
        }).catch(error => {
          if (error.resCode) {
            if (error.resCode === 403) {
              this.$message.error('This email has previously been used to register an account.Please try another email or login directly.');
            }
          } else {
            this.$message.error(error);
          }
        });
      },
      signIn () {
        this.$router.push({path: '/login'})
      },
      /**
       * [fLogin 第三方登陆 Facebook]
       * @author luke 2018-06-07
       * @return {[type]} [description]
       */
      fLogin () {
        FB.getLoginStatus(function(response) {
          console.log(response);
          // 判断是否登录
          if (response.status === 'connected'){
            console.log(2);
            FB.login(function(response){
              console.log(response);
              // 获取数据
              FB.api('/me?fields=name,email,first_name,last_name', function(res) {
                console.log(res);
              });
            }, {scope: 'public_profile, email'});
          }
        });
      },
      /**
       * [submitForm 提交注册效验]
       * @author luke 2018-07-05
       */
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.register();
          } else {
            return false;
          }
        });
      }
      
    },
    components: {
      VueRecaptcha
    }
  }
</script>
<style lang='less'>
  @import '~assets/var.less';
  .regiter-page{
    width: 100%;
    margin-bottom: 10px;
    .regiter-page-header{
      width: 100%;
      height: 300px;
      background: @XXXXColor;
      /*border-radius:6px;*/
      padding-left: 27%;
      display: flex;
      align-items: center;
      .regiter-page-header-icon{
        width:150px;
        height:150px;
      }
      .regiter-page-header-text{
        font-family: MuseoSans-700;
        font-size: 36px;
        color: #ffffff;
        line-height: 38px;
        margin-left: 31px;
      }
    }
    .login-content{
      width: 100%;
      height: 700px;
      display: flex;
      padding-left: 25.6%;
      font-size: @XXXXFontSize;
      padding-top: 40px;
      color: @XXXXFontColor;
      .login-content-left{
        padding-left: 15px;
        .content-left-why{
          font-family:MuseoSans-700;
          font-weight: bold;
          font-size:28px;
          height: 33px;
          line-height: 33px;
          margin-bottom: 10px;
        }
        .left-why-an-item{
          font-family:MuseoSans-300;
          height: 30px;
          display: flex;
          align-items: center;
          i{
            display: inline-block;
            height: 5px;
            width: 5px;
            border-radius: 50%;
            background: @XXXXFontColor;
            margin-right: 20px;
            margin-left: 8px;
          }
        }
        .content-sign--account{
          font-family:MuseoSans-300;
          font-size: 15px;
          margin-top: 20px;
          span{
            color: @XXXXColor;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
      .login-content-right{
        padding-left: 137px;
        display: flex;
        flex-direction: column;
        .login-right-title{
          font-family:MuseoSans-700;
          font-weight: bold;
          line-height: 18px;
          margin-bottom: 20px;
        }
        .login-input{
          /*margin-top: 11px;*/
          width: 340px;
        }
        .login-input::-webkit-input-placeholder{
          font-family: MuseoSans-300;
          color:#e5e5e5;
        }
        .login-input-item{
          width: 100%;
          .w-input{
            width: 340px;
          }
        }
        .regiter-page-login, .regiter-page-gogo{
          margin-top: 10px;
          background: @XXXXColor;
          border-radius: 100px;
          width: 340px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          color: #FFF;
          font-weight: bold;
          font-family:MuseoSans-700;
          cursor: pointer;
        }
        .login-remeber{
          margin-top: 25px;
          display: flex;
          justify-content: space-between;
          font-size: 15px;
          height: 30px;
          align-items: center;
          .login-remeber-forgot{
            font-weight: bold;
            color: @XXXXColor;
            cursor: pointer;
          }
          .login-remeber-text{
            margin-right: 10px;
            margin-top: 2px;
            display: flex;
            align-items: center;
          }
          a {
            font-size: 15px;
          }
        }
        .login-or-line{
          margin-top: 25px;
          font-family:MuseoSans-300;
          color: #7f7f7f;
          text-align:center;
          line-height:22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 21px;
          em{
            display: inline-block;
            background: #f7f7f7;
            height: 2px;
            width: 145px;
            border-radius: 1px;
            margin-top: 3px;
          }
        }
        .regiter-verify{
          margin-top: 10px;
          margin-left: 20px;
        }
        .regiter-page-gogo{
          margin-top: 10px;
          background-color: #FFF;
          border: 2px solid @XXXXColor;
          color: @XXXXColor;
          display: flex;
          align-items: center;
          .iconfont{
            font-size: 21px;
            margin-right: 32px;
            margin-left: 38px;
          }
        }
      }
      .el-form-item__content{
        margin: 0px!important;
      }
    }
  }
</style>
<style lang="less">
  @import '~assets/var.less';
  .login-remeber-text .is-checked .el-checkbox__inner{
    background-color: @XXXXColor!important;
    border-color: @XXXXColor!important;
  }
  .login-remeber-text .el-checkbox__input.is-focus .el-checkbox__inner, .login-remeber-text .el-checkbox__inner:hover{
    border-color: @XXXXColor!important;
  }
  .login-remeber .is-checked .el-checkbox__label{
    color: @XXXXColor!important;
  }
  .regiter-page .el-input__inner{
    border-radius: 100px;
  }
  .login-input-item .el-select .el-input.is-focus .el-input__inner{
    border-color: @XXXXColor!important;
  }
  .el-select-dropdown__item.selected{
    color: @XXXXColor;
  }
  .regiter-page .el-input__inner:focus{
    border-color: @XXXXColor;
  }
</style>
