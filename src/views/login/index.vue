<template>
  <div class="content">
    <!--登陆  -->
    <div class="content-login">
       <div class="register">
          <p class="title">Create an account</p>
         <div class="group">
           <div class="item">
             <label>Email</label>
             <el-input v-model="form.userMail" class="w-input" placeholder="Email address"></el-input>
           </div>
           <div class="item">
             <label>password</label>
             <el-input v-model="form.userPwd" type="password" class="w-input" placeholder="Enter a password. 6-15 characters in length"></el-input>
           </div>
           <div class="item">
             <label>Confirm password</label>
             <el-input v-model="pass" class="w-input" type="password" placeholder="Enter a password. 6-15 characters in length"></el-input>
           </div>
           <div class="item">
             <label>Country</label>
          <!--    <el-input v-model="form.countryCode"  class="w-input" placeholder="请输入内容"></el-input> -->
              <el-select v-model="form.countryCode"  class="w-input" placeholder="请选择">
                <el-option
                  v-for="item in countryList"
                  :key="item.dicValue"
                  :label="item.dicName"
                  :value="item.dicValue">
                </el-option>
              </el-select>
           </div>
           <div>
               <div style="width:300px;text-align: center;margin: 0 auto;padding-left: 76px;" v-if="sitekey !== ''">
                  <vue-recaptcha
                    @verify="onVerify"
                    :sitekey="sitekey" >
                  </vue-recaptcha>
                </div>
           </div>
           <div style="text-align: center;margin-top: 10px;margin-left: 20px;">
              <el-button type="primary"  style="width:240px;" @click="register" >Register</el-button>
           </div>
         </div>
         <div class="tips">
           <el-checkbox v-model="form.subscribe"></el-checkbox>
           <span>&nbsp;&nbsp;Yes, subscribe me to the Sunvalleytek Newsletter for special deals and offers on Sable, RAVPower, HooToo, and TaoTronics products.</span>
         </div>
       </div>

       <!-- 登陆 -->
       <div class="login">
          <p class="title">Login</p>
          <div class="group">
             <div class="item">
               <label>Email</label>
               <el-input v-model="sign.email" class="w-input" placeholder="Email address"></el-input>
             </div>

             <div class="item">
               <label>Password</label>
               <el-input v-model="sign.pwd" type="password" class="w-input" placeholder="Password"></el-input>
             </div>
             <div class="center remember" >
               <el-checkbox v-model="remember">Remember me</el-checkbox>
               <el-button class="float--right" type="text" >I have forgotten my password</el-button>
             </div>
             <div class="center" style="margin-left: 80px;">
                 <el-button type="primary" @click="signFn" style="width:240px;" >Sign in</el-button>
             </div>
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
        pass: '',
        radio: false,
        sitekey: '',
        form: {
          brand: "tt",
          // langId: 1,
          countryCode: 'CN',
          amzPrime: true,
          registerSource: '',
          subscribe: false // 是否订阅
        },
        countryList: [],
        remember: false, // 是否记住我
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
        this.countryList = await this.$store.dispatch('fetchAllList', obj);
        // console.log(json);
      },
      onVerify: function (response) {
        this.form.verifyCode = response;
        console.log('Verify: ' + response)
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
        let obj = {
          api: 'getRegister',
          data: this.form
        }
        this.$store.dispatch('fetchAllList', obj).then(json => {
          this.$message({
            message: '注册成功',
            type: 'success'
          });
        }).catch(error => {
          this.$message.error(error);
        });
      },
      /**
       * [sign 登陆]
       * @author luke 2018-05-23
       */
      signFn () {
        console.log(this.remember);
        if (this.$common.isNull(this.sign.email)){
          this.$message('Email address must be entered.');
          return;
        }
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
          this.$message({
            message: '登陆成功',
            type: 'success'
          });
          // 跳转首页
          this.$router.push({path: '/index'})
        }).catch(error => {
          this.$message.error(error);
        });
      }
    },
    components: {
      VueRecaptcha
    }
  }
</script>
<style lang="less" scoped >
  .content{
    width: 1196px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    .content-login {
      height: 694px;
      overflow: hidden;
      .register {
        width: 646px;
        height: 100%;
        font-size: 16px;
        padding-top: 60px;
        padding-bottom: 80px;
        position: relative;
        float: left;
        overflow: hidden;
        .title{
          color: #333333;
          font-size: 28px;
          font-weight: 500;
          line-height: 1;
          text-align: center;
          margin-bottom: 20px;
        }
        .group{
          .item{
            display: flex;
            label {
              width: 200px;
              margin-right: 10px;
              margin-bottom: 10px;
              display: inline-block;
              text-align: right;
              line-height: 40px;
            }
            .w-input{
              width: 400px;
            }
          }
        }
        .tips {
          color: #636363;
          line-height: 1.5;
          margin-left: 100px;
          padding-left: 36px;
          margin-top: 27px;
        }
      }
      .login {
        width: 550px;
        height: 100%;
        font-size: 16px;
        padding-top: 60px;
        padding-bottom: 80px;
        position: relative;
        float: left;
        .title{
          color: #333333;
          font-size: 28px;
          font-weight: 500;
          line-height: 1;
          text-align: center;
          margin-bottom: 20px;
        }
        .group{
          .item{
            display: flex;
            label {
              width: 200px;
              margin-right: 10px;
              margin-bottom: 10px;
              display: inline-block;
              text-align: right;
              line-height: 40px;
            }
            .w-input{
              width: 400px;
            }
          }
          .remember{
             margin: 10px 0px 20px 20px;
             line-height: 40px;
          }
        }
      }
    }
   }
</style>
