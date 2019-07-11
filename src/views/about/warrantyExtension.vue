<template>
  <div class="box-warranty-extension">
    <div class="warranty-extension-title-wrapper">
      <div class="warranty-extension-title">
        <div class="warranty-extension-title-inner">
          <h2>Warranty Extension</h2>
          <p>Warranty extension is not valid for used goods </p>
          <p>Warranty period for used goods is limited to 12 months</p>
        </div>
      </div>
    </div>
    <div class="warranty-extension-content">
      <div class="extension-content-inner">
        <div class="extension-content-title">Why Miroco Warranty?</div>
        <div class="extension-support">
          <div class="extension-support-item">
            <div class="img-wrapper">
              <img src="../../assets/img/free-warranty.png">
            </div>
            <h3>Free Lifetime Warranty</h3>
            <p class="warranty-support-content">We believe in our products and back them all with an industry-leading 18-month warranty.</p>
            <!-- <p class="warranty-support-sub-content">
              Additionally, register your product on the Miroco website to receive a free lifetime warranty for Miroco Body Fat Scale, Water flosser,
               or extend your warranty by an additional 12 months for all other Miroco products.  
            </p> -->
          </div>
          <div class="extension-support-item extension-support-item-two">
            <div class="img-wrapper">
              <img src="../../assets/img/customer-support.png">
            </div>
            <h3>Improved Customer Support</h3>
            <p class="warranty-support-content">With your product registered, our support team can provide faster and more personalized assistance. Register your product now and save time later.</p>
          </div>
        </div>
        <div class="btn-register">
          <el-button plain round @click="loadMoreHandler" >Register Now</el-button>
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
        
      }
    },
    computed: {
      ...mapGetters([
        'userList'
      ])
    },
    methods: {
      loadMoreHandler (){
        // myAccount
        // 调整个人中心界面
        if (this.$common.isNull(this.userList.accountId)){
          this.$router.push('/register');
        } else {
          this.$router.push('/myAccount');
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .box-warranty-extension {
    .warranty-extension-title {
      display: table;
      margin: 0 auto;
      .warranty-extension-title-inner {
        width: 880px;
        height: 400px;
        display: inline-block;
        vertical-align: middle;
        text-align: left;
        display: table-cell;
        h2 {
          font-size: 36px;
          color: #000000;
          line-height: 38px;
          margin-bottom: 15px;
          font-family: MuseoSans-700;
        }
        p {
          font-size: 18px;
          color: #000000;
          line-height: 27px;
        }
      }
    }
    .warranty-extension-content{
      background-color: #FAFAFA;
      .extension-content-inner {
        padding: 100px 0;
        text-align: center;
        .extension-content-title {
          font-size: 48px;
          color: #191919;
          line-height: 52px;
          text-align: center;
        }
        .extension-support {
          display: inline-block;
          overflow: hidden;
          padding-top: 100px;
          .extension-support-item {
            float: left;
            width: 340px;
            text-align: center;
            .img-wrapper {
              padding-bottom: 50px;
              img {
                width: 200px;
                height: 200px;
              }
            }
            h3 {
              font-size: 21px;
              text-align: center;
              margin-bottom: 10px;
              font-family: MuseoSans-700;
            }
            .warranty-support-content {
              font-size: 15px;
              line-height: 23px;
              margin: 10px 0 20px 0;
            }
            .warranty-support-sub-content {
              font-size: 12px;
              color: #9B9B9B;
              line-height: 15px;
            }
          }
          .extension-support-item-two {
            margin-left: 20px;
          }
        }
        .btn-register {
          margin-top: 50px;
          .el-button {
            background-color: #00416f;
            color: #fff;
            font-family: MuseoSans-700;
          }
        }
      }
    }
  }
</style>
