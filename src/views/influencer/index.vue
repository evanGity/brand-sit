<template>
  <div class="content">
   <div class="rel">
      <img src="../../assets/img/influencer/home.png" width="100%">
      <!-- 文本上面文字 -->
      <div class="abs top">
          <p class="title">Become a Miroco Influencer</p>
          <a href="#sign">
            <el-button type="primary" round style="background-color: #fc8720;border-color: #fc8720;">&nbsp;&nbsp;Learn More&nbsp;&nbsp;
            </el-button>
          </a>
      </div>
      
      <div class="abs warp" id="sign"  v-if="!isSuccess" style="padding-top: 60px;">
        <div class="left-box">
          <div class="title">Miroco Influencer</div>
          <p class="sub-title">Become an Influencer, and Connect with Miroco.</p>
          <p class="desc">
            We understand how much influencers mean to us in elevating our brand and engaging customers. That’s why we’d like to work with you to build a better future for every one of us together.
          </p>
        </div>
        <div class="right-box">
          <div class="bg-box">
          </div>
          <div class="main" >
              <div class="title">Sign Up/Application</div>
              <p class="sub-title">Apply to become a Miroco social media influencer</p>

              <div class="box-interest">
                <p class="sub-title">Interest</p>
                <div class="item">
                  <p class="name">Pick Your Topics</p>
                  <!-- tag -->
                  <div class="box-tag"  v-for="(tag, key) in tags" :key="key" 
                       @click="clickInterest(tag.parameterValue)">
                    <el-tag
                      :key="tag.parameterValue"
                      v-bind:class="{ active: form.interestId.indexOf(tag.parameterValue) > -1  }"
                    >
                      {{ tag.parameterValueDesc }}
                    </el-tag>
                  </div>
                </div>

                <div class="item">
                  <p class="name">Your Channels</p>
                  <!-- tag -->
                  <div class="box-tag"  v-for="(tag, index) in channerlsTags" :key="index"
                       @click="clickChannel(tag.parameterValue)">
                    <el-tag
                      :key="tag.parameterValue"
                      v-bind:class="{ active: form.channelId.indexOf(tag.parameterValue) > -1  }"
                    >
                      {{ tag.parameterValueDesc }}
                    </el-tag>
                  </div>
                </div>

                <el-input v-model="form.channelLink"  size="medium" style="border-radius: 100px;" placeholder="Your social media channel link"></el-input>
                <!-- Sports & Outdoor -->
              </div>

              <div class="box-personal">
                <p class="sub-title">Personal Information</p>
                <div class="item">
                  <el-input size="medium" v-model="form.firstName" class="box" style="border-radius: 100px;" placeholder="First name"></el-input>

                  <el-input size="medium" v-model="form.lastName" class="box" placeholder="Last name"></el-input>

                  <el-input size="medium" v-model="form.userMail" class="box" placeholder="Email address"></el-input>

                  <el-select size="medium" class="box" v-model="form.countryCode" placeholder="Country">
                    <el-option
                      v-for="item in countryList"
                      :key="item.dicValue"
                      :label="item.dicName"
                      :value="item.dicValue">
                    </el-option>
                  </el-select>
                  <el-button type="primary" class="box" @click="submit" style="background-color: #00416f;border-color: #00416f;">Submit</el-button>
                  <div class="box-privacy">
                    <el-checkbox v-model="checked"></el-checkbox>
                    <div class="tips" >
                       I agree to Miroco
                        <router-link to="/termsCondition">
                         <span class="login-remeber-forgot">Terms & Conditions</span>
                        </router-link>
                         and
                        <router-link to="/privacyPolicy">
                           <span class="login-remeber-forgot">Privacy Policy</span>
                        </router-link>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      <!-- 成功之后展示页面 -->
      <div class="abs warp" style="width:700px;" v-if="isSuccess" >
        <div class="tip-success" >
           <div>
             <img src="../../assets/img/completed.png" height="153" width="153" /> 
           </div>
           <p class="title">Thank You!</p>
           <p class="sub-title">You Are Valuable to Us</p>
           <div>
             We understand how much influencers mean to us in elevating our brand and engaging customers. That’s why we’d like to work with you to build a better future for every one of us together. We will check and evaluate all of your social media platform. And will keep you update for our upcoming campaigns. Hope we both can achieve a win-win situation.
           </div>
           <div class="btn">
             <router-link :to="{ path: '/index' }">
               <el-button type="primary" round style="background-color:#fc8720;border-color:#fc8720;">
                  &nbsp;&nbsp;Done&nbsp;&nbsp;
               </el-button>
             </router-link>
           </div>
         </div>
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
        tags: [],
        countryList: [], // 国家
        form:{
          countryCode: 'US',
          firstName: '',
          lastName: '',
          channelId: [],
          channelLink: '',
          interestId: [],
          userMail: ''
        },
        checked: false,
        isSuccess: false, // 是否成功
        channerlsTags: ['Youtube', 'Facebook', 'Twitter', 'Blog']
      }
    },
    // 引入组件
    props: {},
    mounted: function () {
      // 获取下拉列表
      
      this.init();
    },
    // 方法
    methods: {
      /**
       * [init 初始化项目]
       * @author luke 2018-06-29
       */
      async init () {
        // interest  /  channel
        let obj = {
          api: 'getSysParameter',
          data: {
            parameterName: 'interest',
            brand: 'aj'
          }
        }
        this.tags = await this.$store.dispatch('fetchGetAll', obj);
        // channel
        let cObj = {
          api: 'getSysParameter',
          data: {
            parameterName: 'channel',
            brand: 'aj'
          }
        }
        this.channerlsTags = await this.$store.dispatch('fetchGetAll', cObj);

        let counObj = {
          api: 'getCountry',
          data: {}
        }
        this.countryList = await this.$store.dispatch('fetchGetAll', counObj);
      },
      // 选择interest
      clickInterest (id) {
        if (this.form.interestId.indexOf(id) < 0){
          this.form.interestId.push(id);
        } else {
          this.$common.delArray(this.form.interestId, id);
        }
      },
      /**
       * [clickChannel 多选按钮]
       * @author luke 2018-06-29
       */
      clickChannel (id) {
        if (this.form.channelId.indexOf(id) < 0){
          this.form.channelId.push(id);
        } else {
          this.$common.delArray(this.form.channelId, id);
        }
      },
      /**
       * [submit 提交注册]
       * @author luke 2018-06-29
       */
      submit () {
        if (!this.checked){
         this.$message('Please agree to Miroco Terms & Conditions and Privacy Policy.');
         return;
        }
        if (this.$common.isNull(this.form.userMail)){
          this.$message('Email must be entered.');
          return;
        }
        // 格式判断
        if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.form.userMail)) {
          this.$message('Please enter correct email address');
          return;
        }

        if (this.$common.isNull(this.form.firstName)){
          this.$message('FirstName must be entered.');
          return;
        }
        if (this.$common.isNull(this.form.lastName)){
          this.$message('LastName must be entered.');
          return;
        }
        if (this.form.interestId.length < 1){
          this.$message('Interest must be entered.');
          return;
        }
        if (this.form.channelId.length < 1){
          this.$message('Channels must be entered.');
          return;
        }
        if (this.$common.isNull(this.form.channelLink)){
          this.$message('ChannelLink must be entered.');
          return;
        }

        let obj = {
          api: 'savaInfluencer',
          data: {
            'userFirstName': this.form.firstName,
            'userLastName': this.form.lastName,
            'channelId': this.form.channelId.join(','),
            'channelLink': this.form.channelLink,
            'interestId': this.form.interestId.join(','),
            'userMail': this.form.userMail,
            'countryCode': this.form.countryCode
          }
        }
        this.$store.dispatch('fetchAllList', obj).then(json => {
          this.isSuccess = true;
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error
          });
        });
      }
    },
    components: {
    }
  }
</script>
<style lang='less' >
   .content{
     font-size: 0px;
     width: 100%;
     .top{
       color: #FFFFFF;
       left: 0;
       right: 0;
       top: 20%;
       bottom: 0;
       margin: auto; 
       width: 1060px;
       text-align: center;
       .title{
         font-family: MuseoSans-700;
         font-size: 36px;
         color: #FFFFFF;
         text-align: center;
         margin-bottom: 20px;
       }
     }
     .warp{
       color: #FFFFFF;
       display: flex;
       left: 0;
       right: 0;
       top: 48%;
       bottom: 0;
       margin: auto;
       width: 930px;
       .left-box{
         width: 430px;
         padding: 20px;
         .title{
           font-size: 60px;
           color: #FFFFFF;
           line-height: 60px;
         }
         .sub-title{
           font-size: 28px;
           color: #FFFFFF;
           line-height: 36px;
         }
         .desc{
           margin-top: 20px;
           font-size: 15px;
           color: #FFFFFF;
           line-height: 22px;
         }
       }
       .right-box{
         position: relative;
         .bg-box{
          opacity: 0.1;
          background: #FAFAFA;
          height: 690px;
          position: absolute;
          top: 0px;
          width: 500px;
         }
         .main {
           position: absolute;
           top: 0px;
           width: 500px;
           padding: 20px;
           .title{
             font-size: 28px;
             color: #FFFFFF;
             line-height: 37px;
           }
           .sub-title{
             font-size: 15px;
             color: #FFFFFF;
             line-height: 22px;
           }
           .box-interest{
             margin-top: 10px;
             .name{
               font-size: 15px;
               color: #9B9B9B;
               margin-top: 10px;
               margin-bottom: 8px;
             }
             .box-tag{
               display: inline-block;
               .el-tag{
                 margin-right: 10px;
                 margin-bottom: 10px;
                 cursor: pointer;
                 background-color: none;
                 border-color: white;
                 color: white;
               }
               .active{
                 background: #00416f;
                 border-radius: 3px;
                 color: #E5E5E5;
                 text-align: center;
               }
             }
             
           }
           .box-personal{
             margin-top: 10px;
             .sub-title{
              font-size: 15px;
              color: #FFFFFF;
             }
             .item{
                margin-top: 10px;
                .el-input{
                   margin-bottom: 10px;
                }
                .box{
                  width: 100%;
                  border-radius: 100px;
                }
             }
           }
           .box-privacy{
             margin-top: 10px;
             .tips {
              font-size: 12px;
              color: #F6F6F6;
              display: inline-block;
              margin-left: 4px;
             }
             a {
               font-size: 12px;
               color: #fca;
             }
           }
           .el-input__inner{
             border-radius: 100px;
             border: 1px solid white;
             background-color: rgba(255, 0, 0, 0.0);
             color: white;;
           }
         }
       }

       .tip-success{
         font-size: 18px;
         color: #FFFFFF;
         text-align: center;
         font-family: MuseoSans-300;
         line-height: 27px;
         .title{
            font-family: MuseoSans-700;
            font-size: 60px;
            color: #FFFFFF;
            text-align: center;
            line-height: 60px;
            margin-top: 50px;
         }
         .sub-title{
           font-family: MuseoSans-300;
           font-size: 28px;
           color: #FFFFFF;
           text-align: center;
           line-height: 22px;
           margin-top: 10px;
           margin-bottom: 20px;
         }
         .btn{
           margin-top: 30px;
         }
       }
     }
   }
</style>
