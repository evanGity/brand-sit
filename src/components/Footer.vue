<template>
 <!-- Footer -->
 <div class="footer">
  <div class="cont">
    <!-- Subscribe -->
    <div class="subscribe" v-if="!isSubscribe">
      <div class="subscribe-inner">
        <div class="subscribe-desc">
          <h3 class="subscribe-desc-title">Subscribe to Miroco Newsletter</h3>
          <p class="subscribe-desc-content">Sign up and get exclusive offers, news, giveaways, and more.</p>
        </div>
        <div class="subscribe-desc-form">
                  <el-input class="subscribe-desc-form-item" :class="{'input-error': !isEmailValid}" 
                  placeholder="please enter Your email address" 
                  v-model="email" @focus="focusHandler">
                </el-input>
                <div class="email-validate-tips">{{emailValidateTips}}</div>
                <el-button class="subscribe-desc-form-item" @click="subscribeHandler" type="info" round>Submit</el-button>
              </div>
            </div>
          </div>
          <!-- END Subscribe -->

          <!--footer  list start-->
          <div class="footer-list">
            <div class="footer-list-inner">
              <dl class="left dl-item" style="width: 210px;">
                <dt><h5>Product</h5></dt>
                <dd>
                  <ul>
                    <li >
                      <div v-for="(c, index) in catalogList" :key="index">
                       <router-link :to="'/category/' + c.categoryName + '-c-' + c.categoryId + '.html'" target="self">
                        {{ c.categoryName }}
                      </router-link>
                    </div>
                  </li>
                </ul>
              </dd>
            </dl>
            <dl class="left dl-item">
              <dt><h5>Support</h5></dt>
              <dd>
                <ul>
                  <li>
                    <router-link to="/support" target="self">Select Product</router-link>
                    <router-link to="/warranty" target="self">
                      Warranty Extension
                    </router-link>
                    <router-link to="/salesPolicy" target="self">
                      After-Sales Policy
                    </router-link>
                    <router-link to="/termsCondition" target="self">
                      Terms & Conditions
                    </router-link> 
                    <router-link to="/privacyPolicy" target="self">
                       Privacy Policy
                    </router-link>
                 </li>
               </ul>
             </dd>
           </dl>
           <dl class="left dl-item">
              <dt><h5>Others</h5></dt>
              <dd>
                <ul>
                  <li>
                    <router-link to="/about" target="self">
                    About Us</router-link>
                    <router-link to="/influencer" target="self">
                      Miroco Influencers
                    </router-link>
                  </li>
                </ul>
              </dd>
            </dl>
           <dl class="left footer-follow">
            <dt><h5>Follow Us</h5></dt>
            <dd>
                <a href="https://www.facebook.com/miroco.official/" target="_blank"><i class="iconfont icon-facebook" ></i></a>
            </dd>

            <dd><a href="https://twitter.com/Miroco_Official/" target="_blank"><i class="iconfont icon-twitter2" style=""></i></a></dd>

            
            <dd><a href="https://www.youtube.com/channel/UCLY1FBAf3GC1EgHasPfmbPQ" target="_blank"><i class="iconfont icon-youtubeyoutube7"  style=""></i></a></dd>
            <dd><a href="https://www.instagram.com/miroco_official/" target="_blank"><i class="iconfont icon-instagram"  style=""></i></a></dd>
          </dl>
          <dl class="bot"></dl>
          <dl class="m-footer-countryList">
            <dt><a class="flag-wrap"><span class="icon-country country-us"></span></a>&nbsp;&nbsp;United States</dt>
            <dd class="text-left m-footer-list">
              <div>
                <p><a class="flag-wrap" href="javascript: void(0);"><span class="icon-country country-de"></span>&nbsp;&nbsp;Deutschland</a></p>
                <p><a class="flag-wrap" href="javascript: void(0);"><span class="icon-country country-jp"></span>&nbsp;&nbsp;日本</a></p>
              </div>
              <span class="ar"></span>
            </dd>
          </dl>
        </div>
      </div>
      <!--footer  list start-->
    </div>
    <div class="footer-copyright">
      <div class="footer-copyright-inner">
        <ul>
          <li>© 2018 Miroco All rights reserved.</li>
          <!-- <li style="margin-left: 93px;">Terms of Use</li>
          <li style="margin: 0 30px;">Privacy Policy</li>
          <li>After-Sales Policy</li> -->
        </ul>
      </div>
    </div>
  </div>
  <!--20140824-->
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'catalogList'
      ])
  },
  data() {
    return {
      options: [],
      value: '',
      email: '',
      isSubscribe: false, // 是否订阅
      isEmailValid: true,
      emailValidateTips: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.hideSubscribe(to.name);
    }
  },
  methods: {
    /**
     * [clickSubscribe 订阅邮件]
     * @author luke 2018-06-13
     * @return {[type]} [description]
     */
    subscribeHandler () {
       this.isEmailValid = this.getEmailValid();

       if (!this.isEmailValid) {
         return;
       }
       let ths = this;
       this.$store.dispatch('fetchAllList', {
          api: 'setSubscribe',
          data: { email: this.email }
        }).then(function (res) {
          ths.$message({
            message: '订阅成功',
            type: 'success'
          });
          ths.email = '';
          ths.isSubscribe = true;
        }).catch(error => {
          // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
          console.log(error);
        });
    },
    getEmailValid () {
      let email = this.email;
      if (email === '') {
        this.emailValidateTips = 'Please enter the email address.';
        return false;
      } else if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email)) {
        this.emailValidateTips = 'Please enter a valid email address.';
        return false;
      } else {
        this.emailValidateTips = '';
        return true;
      }
    },
    focusHandler () {
      this.isEmailValid = true;
      this.emailValidateTips = '';
    },
    /**
     * [hideSubscribe 隐藏订阅]
     * @author luke 2018-06-30
     */
    hideSubscribe (name) {
      this.isSubscribe = false;
      switch(name){
        case 'myAccount':
        case 'login':
        case 'register':
        case 'forgot':
        case 'search':
          this.isSubscribe = true;
          break;
      }
    }
  },
  mounted: function () {
    this.hideSubscribe(this.$route.name);
  }
}
</script>
<style lang='less' scoped>
.footer {
  font-size: 16px;

  font-family: MuseoSans-300;
  .cont{
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin: 0px auto;
    padding-left: 0;
    padding-right: 0;
  }
  a {
    color: white;
    line-height: 15px;
    &:hover {
      color: #00416f;
    }
    font-size: 12px;
  }
  h5 {
    margin-bottom: 8px;
    font-size: 16px;
    color: #000;
    font-family: MuseoSans-700;
  }
  .subscribe {
    width: 1060px;
    margin: 0 auto;
    height: 250px;
    padding-left: 80px;
    display: flex;
    align-items: center;
    .subscribe-inner {
      overflow: hidden;
      .subscribe-desc {
        float: left;
        margin-right: 38px;
      }
      .subscribe-desc-title{
        width: 315px;
        font-size: 36px;
        line-height: 38px;
        font-family: MuseoSans-700;
      }
      .subscribe-desc-content {
        width: 321px;
        line-height: 27px;
      }
      .subscribe-desc-form {
        float: left;
        .el-button{
          background-color: #00416f;
          font-family: MuseoSans-700;
          font-size: 15px;  
        }
        .subscribe-desc-form-item {
          display: block;
          width: 340px;
          border: 0px;
        }
        
        .subscribe-desc-form-item + .subscribe-desc-form-item {
          margin-top: 10px;
        }
      }
      .email-validate-tips {
        margin-left: 15px;
        height: 25px;
        line-height: 25px;
        color: red; 
        font-size: 14px;
      }
    }
    .right, .form-control {
      float: right;
    }
    .left{
      float: left;
      width: 22.2%;
      margin-right: 10.5%;
    }
    .right {
      width: 450px;
      margin-top: 14px;
    }
    .form-control {
      width: 82%;
      font-size: 14px;
      float: left;
      border-radius: 0;
    }
    .btn {
      float: left;
      border-radius: 0;
      &:hover {
        background: #27b0b3;
        color: #fff;
      }
    }
  }
  .menu-box {
    width: 100%;
  }
  .subscribe .left {
    float: left;
    width: 22.2%;
    margin-right: 10.5%;
  }
}

.footer-list, .footer-copyright{
  background-color: #FAFAFA;
}

.footer-list {
  position: relative;
  .footer-list-inner {
    height: 210px;
    padding-top: 48px;
    margin-left: 15%;
    width: 1060px;
    margin: 0 auto;
  }
}

.footer {
  a {
    color: #9B9B9B;
  }
  dd ul {
    width: 420px;
  }
  li {
    float: left;
    font-size: 12px;
    a {
      display: block;
      margin-bottom: 5px;
    }
  }
}

.footer-list {
  dl {
    float: left;
  }
  .m-footer-countryList {
    display: none;
  }
  .dl-item {
    width: 150px;
    margin-right: 15px;
  }
  dd + dd {
    margin-top: 6px;
  }
}

.footer-follow {
  margin-left: 250px;
  a {
    font-size: 0;
    color: #000;
  }
  i {
    display: block;
    font-size: 30px;
  }
  dt {
    margin-bottom: 20px;
  }
  dd {
    display: inline-block;
    float: left;
    + dd {
      margin-left: 15px;
      margin-top: 0;
    }
  }
}

.footer-copyright {
  text-align: center;
  font-size: 16px;
  color: #999;
}
.footer-copyright-inner {
  height: 72px;
  border-top: 2px solid #ccc;
  padding-top: 12px;
  width: 1060px;
  margin: 0 auto;
}

/* $footer $footer $footer $footer $footer $footer $footer*/
</style>

<style lang='less'>
.subscribe-desc-form-item {
  .el-input__inner {
    border-radius: 20px;
    height: 37px !important;
  }
}
.input-error .el-input__inner{
  border-color: red;
}
</style>