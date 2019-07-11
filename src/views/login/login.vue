<template>
  <div class="login-page">
    <div class="login-page-header">
      <img src="../../assets/img/login-title.png" class="login-page-header-icon">
      <div class="login-page-header-text">Let’s Miroco!</div>
    </div>
    <div class="login-content" @keyup.enter="signFn">
      <div class="login-content-left">
        <p class="content-left-why">Why Miroco account?</p>
        <div class="left-why-an-item"><i></i>Get prodcut warranty coverage</div>
        <div class="left-why-an-item"><i></i>Qualify for promotions and special offers</div>
        <div class="left-why-an-item"><i></i>Get easy access to product support</div>
        <div class="content-sign--account">Don’t have a Miroco account? <span @click="SignUp">Sign up now ></span></div>
      </div>
      <div class="login-content-right">
        <p class="login-right-title">Login To Your Miroco Account</p>

        <el-form :model="sign" ref="sign" label-width="100px" class="demo-ruleForm">
          <el-form-item
            prop="email"
            :rules="[
              { required: true, message: 'Please enter the Email'},
              { type: 'email', message: 'Please enter a valid Email', trigger: ['blur', 'change'] }
            ]"
          >
            <el-input type="email" class="login-input" placeholder="Email address" v-model="sign.email"></el-input>
          </el-form-item>

          <el-form-item
            prop="pwd"
            :rules="[
              { required: true, message: 'Please enter the password'}
            ]"
          >
            <el-input type="password" class="login-input" placeholder="Password" v-model="sign.pwd"></el-input>
          </el-form-item>


          <el-form-item>
            <!-- signFn -->
            <div class="login-page-login" @click="submitForm('sign')" >Login</div>
          <!--   <el-button type="primary" >提交</el-button>
            <el-button @click="resetForm('sign')">重置</el-button> -->
          </el-form-item>
      </el-form>

        


        <div class="login-remeber">
          <el-checkbox v-model="remember" class="login-remeber-text">
          Remember me</el-checkbox>
          <router-link to="/forgot">
             <span class="login-remeber-forgot">Forgot your password ></span>
          </router-link>

        </div>
        <div style="width:300px;text-align: center;margin: 0 auto;padding-left: 76px;" v-if="sitekey !== ''">
          <vue-recaptcha
            @verify="onVerify"
            :sitekey="sitekey" >
          </vue-recaptcha>
        </div>
        <div class="login-or-line" v-if="false" ><em></em>or<em></em></div>
        <div class="login-page-gogo" v-if="false">
            <i class="iconfont icon-google"></i>Login with Google+</div>
        <div class="login-page-gogo" v-if="false">
            <i class="iconfont icon-facebook2"></i>Login with Facebook
        </div>
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
        remember: true, // 是否记住我
        sitekey: '',
        sign: {
          email: '',
          pwd: ''
        }
      }
    },
    mounted: function () {
      // 设置是否记住密码
      this.sign.email = this.$cookie.get('uname');
      // 获取验证码
      let obj = {
        api: 'getRecaptcha',
        data: {}
      };
      this.$store.dispatch('fetchAllList', obj).then(json => {
        // this.sitekey = json.siteKey;
      }).catch(error => {
        this.$message.error(error);
      });
    },
    // 方法
    methods: {
      onVerify: function (response) {
        this.form.verifyCode = response;
      },
      /**
       * [sign 登陆]
       * @author luke 2018-05-23
       */
      signFn () {
        // if (!this.remember){
        //   this.$message('Please agree to XXXX Terms & Conditions and Privacy Policy.');
        //   return;
        // }
        if (this.$common.isNull(this.sign.pwd)){
          this.$message('Password must be entered.');
          return;
        }
        let data = this.sign;
        this.$store.dispatch('fetchLogin', data).then(json => {
          // 是否记住密码
          if (this.remember) {
            this.$cookie.set('uname', this.sign.email)
          }
          // this.$message({
          //   message: '登陆成功',
          //   type: 'success'
          // });
          // 跳转首页
          this.$router.push({path: '/myAccount'})
        }).catch(error => {
          this.$message.error(error);
        });
      },
      SignUp () {
        // 跳转注册页
        this.$router.push({path: '/register'})
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.signFn();
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
  .login-page{
    width: 100%;
    margin-bottom: 10px;
    .login-page-header{
      width: 100%;
      height: 300px;
      background: @XXXXColor;
      /*border-radius:6px;*/
      padding-left: 27%;
      display: flex;
      align-items: center;
      .login-page-header-icon{
        width:150px;
        height:150px;
      }
      .login-page-header-text{
        font-family: MuseoSans-700;
        font-size: 36px;
        color: #ffffff;
        line-height: 38px;
        margin-left: 31px;
      }
    }
    .login-content{
      width: 100%;
      height: 600px;
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
        .login-input::-webkit-input-placeholder{
          font-family: MuseoSans-300;
          color:#e5e5e5;
        }
        .login-page-login, .login-page-gogo{
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
          margin-top: 0px;
          display: flex;
          justify-content: space-between;
          .login-remeber-forgot{
            font-family:MuseoSans-700;
            font-weight: bold;
            font-size:15px;
            color: @XXXXColor;
            cursor: pointer;
          }
          .login-remeber-text{
            font-size: 12px;
            font-family:MuseoSans-300;
            display: flex;
            align-items: center;
          }
        }
        .login-or-line{
          margin-top: 31px;
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
        .login-page-gogo{
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
        .el-form-item__content{
          margin: 0px!important;
        }
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
  .login-page .el-input__inner{
    border-radius: 100px;
  }
  .login-page .el-input__inner:focus{
    border-color: @XXXXColor;
  }
</style>
