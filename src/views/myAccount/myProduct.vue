<template>
  <div class="box-product">
    <div class="box-my-product" v-if="!isNeedAddMore">
      <div class="product-title">
          <h3>My Warranty Product</h3>
          <el-button round @click="addMoreHandler">Add More +</el-button>
      </div>
      <div class="product-content" v-loading="isProductListLoading">
        <div class="content-class" v-if="myProductsData.length > 0" v-for="(item, index) in myProductsData">
          <div class="class-content-wrapper">
            <div class="class-title">
              <h4>Warranty Extended</h4>
              <p v-if="item.expireTime"> {{item.expireTime}} </p>  
            </div>
            <div class="class-content" v-for="(subItem, subIndex) in item">
              <img :src="subItem.img">
              <div class="content-info">
                <div class="content-info-base">
                  <h4>{{ subItem.productName }}</h4>
                  <p>Quantity: {{subItem.quantity}}</p>
                  <p>Price: {{subItem.price}}</p>
                </div>
                <div class="content-info-sub-class">
                  <h4>Warranty Ends</h4>
                  <p>{{ subItem.expireDate }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 提示信息 -->
        <div v-if="myProductsData.length < 1" style="text-align: center;
         border-top: 1px solid #979797;padding-top: 20px;">
          You have not registered any products yet.
        </div>
      </div>
      <!-- <div class="product-footer">
        <el-button round @click="loadMoreHandler" >Load More +</el-button>
      </div> -->
    </div>
    <div class="box-add-product" v-else v-loading="isLoading">
      <div class="add-product-title">
        <h3>Register Product</h3>
      </div>
      <el-steps :active="active" finish-status="success">
        <el-step v-for="(item, index) in stepList" :title="item.title" :key="index"></el-step>
      </el-steps>
      <div class="add-product-content">
        <div class="content-step content-step-1" v-if="active == 0">
          <img src="../../assets/img/trackNum.png">
          <h3>Enter Your Order/Tracking Numbers</h3>
          <p>Please enter your Amazon order number or tracking number</p>
          <p class="tip-txt">Warranty extension is not valid for used goods </p>
          <p class="tip-txt">Warranty period for used goods is limited to 12 months</p>
          <el-input v-model="orderNoVal" placeholder="Enter your number"></el-input>
          <div class="validateTips-wrapper">
            <p class="validateTips" v-if="inputError">Please enter correct orderNo</p>
          </div>
          <el-button class="el-button-submit" round @click="step1Submit" >next</el-button>
        </div>
        <div class="content-step content-step-2" v-else-if="active == 1 && isOrderNoValid">
          <img src="../../assets/img/productConfirm.png">
          <h3>Product Confirmation</h3>
          <p style="margin-bottom: 15px;">Please make sure the product informarion below is correct</p>
          <div class="class-content-wrapper" v-if="orderWarrantyData && orderWarrantyData.orderProductList">
            <div class="class-content" v-for="(item, index) in orderWarrantyData.orderProductList" :key="index">
              <img :src="item.img">
              <div class="content-info">
                <div class="content-info-base">
                  <h4>{{item.productTitle}}</h4>
                  <p>Quantity: {{item.productQuantity}}</p>
                  <p>Price: {{item.productPrice}}</p>
                </div>
                <div class="content-info-purchase">
                  <h4>Purchase Date</h4>
                  <p>{{orderWarrantyData.purchasedDate}}</p>
                </div>
                <div class="content-info-sub-class">
                  <h4>Warranty Ends</h4>
                  <p>{{item.expireDate}}</p>
                </div>
              </div>
            </div>
          </div>
          <el-button round @click="step2SuccessCancel">Cancel</el-button>
          <el-button class="el-button-submit" round @click="step2SuccessSubmit" >Confirm</el-button>
        </div>
        <div class="content-step content-step-2 content-step-2-fail" v-else-if="active == 1 && !isOrderNoValid">
          <img src="../../assets/img/productConfirm.png">
          <h3>Numbers Not Available</h3>
          <p>The tracking number may be incorrect or it is not yet available. Please verify your order/tracking number and try again later.</p>
          <el-button round @click="step2FailCancel">Cancel</el-button>
          <el-button class="el-button-submit" round @click="step2FailSubmit" >Re-Enter</el-button>
        </div>
        <div class="content-step content-step-3" v-else-if="active == 3">
          <img src="../../assets/img/completed.png">
          <h3>Completed!</h3>
          <p>Your product is registered and its warranty is extended</p>
          <el-button class="el-button-submit" round @click="step3Submit" >Done</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        isNeedAddMore: false,
        orderNoVal: '',
        isOrderNoValid: true,

        orderWarrantyData: {},
        inputError : false,
        isLoading: false,
        isAddLoading: false,
        isProductListLoading: false,
        myProductsData : []
      }
    },
    created () {
      this.queryData();
    },
    methods: {
      async queryData () {
        this.isProductListLoading = true;
        let obj = { api: 'getWarrantyList', data: {token: this.$cookie.get('userAuthToken')}};
        let json = await this.$store.dispatch('fetchGetAll', obj);

        this.isProductListLoading = false;
        this.myProductsData = this.getMyProductData(json);
      },
      getMyProductData (data) {
        let newArray = [];
        for (var i = 0; i < data.length; i++) {
          if(data[i] instanceof Array){
            newArray.push(data[i]);
          } else {
            newArray.push([data[i]]);
          }
        }

        return newArray;
      },
      addMoreHandler (){
        this.active = 0;
        this.isNeedAddMore = true;
        this.orderNoVal = '';
      },
      step1Submit (){
        if(this.orderNoVal === ''){
          this.inputError = true;
          return;
        }

        this.inputError = false;

        let obj = { api: 'getOrderForWarranty', data: {token: this.$cookie.get('userAuthToken'), orderNo: this.orderNoVal}};
        this.isLoading = true;
        this.$store.dispatch('fetchGetAll', obj).then(json => {
          this.isLoading = false;
          this.orderWarrantyData = json;
          this.isOrderNoValid = true;
          this.active = 1;
        }).catch(error => {
          this.isLoading = false;
          this.isOrderNoValid = false;
          this.active = 1;
        });
      },
      step2SuccessCancel (){
        this.active = 0;
        this.orderNoVal = '';
      },
      step2FailCancel (){
        this.isNeedAddMore = false;
      },
      step2SuccessSubmit (){
        let obj = { api: 'confirmWarranty', data: {token: this.$cookie.get('userAuthToken'), orderNo: this.orderNoVal}};
        this.isLoading = true;
        this.$store.dispatch('fetchAllList', obj).then(json => {
          this.isLoading = false;
          this.active = 3;
        }).catch(error => {
          this.isLoading = false;
          this.active = 1;
          this.$message.error(error);
        });
      },
      step2FailSubmit (){
        this.active = 0;
        this.orderNoVal = '';
      },
      step3Submit (){
        this.isNeedAddMore = false;
      },
      loadMoreHandler (){

      }

    }, 

  }
</script>

<style lang='less' scoped>
  .box-product {
    background-color: #FAFAFA;
    .box-my-product {
      font-family: MuseoSans-300;
      width: 880px;
      margin: 0 auto; 
      padding-top: 60px;
      .product-title {
        overflow: hidden;
        margin-bottom: 20px;
        padding-bottom: 10px;
        h3 {
          font-size: 28px;
          float: left;
          font-family: MuseoSans-700;
        }
        .el-button {
          width: 160px;
          color: #00416f;
          float: right;
          font-family: MuseoSans-700;
          font-size: 15px;
        }
      }
      .product-content {
        /*border-bottom: 1px solid #979797;*/
        margin-bottom: 100px;
         .content-class{
          margin-bottom: 80px;
         }
      }

      .product-content .content-class:last-child {
        margin-bottom: 0;
      }

      .product-footer {
        padding: 70px 0 80px 0;
        text-align: center;
        .el-button {
          color: #00416f;
        }
      }

      .class-content-wrapper {
        .class-title {
          border-bottom: 1px solid #979797;
          line-height: 22px;
        }
        .class-content + .class-content {
          border-top: 1px solid #979797;
        }
        .class-content {
          img {
            margin: 20px;
          }
          .content-info {
            display: flex;
            text-align: left;
            width: 600px;
            .content-info-base {
              margin: 0 65px 0 20px;
              flex: 2;
            }
          }
        }
      }
    }

    .box-add-product {
      width: 880px;
      margin: 0 auto;
      padding: 80px 0;
      .add-product-title {
        font-size: 28px;
        padding-bottom: 50px;
        text-align: center;
        font-family: MuseoSans-700;
      }
      .el-steps {
        width: 650px;
        margin: 0 auto;
      }
      .add-product-content {
        text-align: center;
        padding-top: 90px;
        margin: 0 auto;
        .content-step {
          img {

          }
          h3 {
            margin-top: 53px;
            margin-bottom: 15px;
            font-family: MuseoSans-700;
          }
          .class-content-wrapper {
            margin: 60px 0;
            border-bottom: 1px solid #979797;
            .class-content {
              border-top: 1px solid #979797;
              img {
                margin: 30px;
              }
            }
          }
        }
        .el-button-submit {
          background-color: #00416f;
          color: #fff;
        }

        .content-step-1{
          .el-input, .el-button{
            width: 340px;
          }
        }
        .content-step-1 {
          .el-input + .el-button{
            margin: 30px 0 15px 0;
          }
          .el-input {
            padding-top: 45px;
            margin: 0 auto;
          }
          .validateTips-wrapper {
            height: 45px;
            width: 340px;
            margin: 0 auto;
            padding-top: 5px;
            .validateTips {
              text-align: left;
              font-size: 14px;
              color: red;
            }
          }
        }
        .content-step-2 .el-input + .el-input {
          margin: 10px 0 30px 0;
        }
        .content-step-2-fail {
          p {
            margin-bottom: 50px;
          }
        }
        .content-step-3 .el-button {
          width: 160px;
        }
        .content-info {
          display: flex;
          text-align: left;
          width: 600px;
          .content-info-base {
            margin-left: 30px;
            flex: 2;
          }
          .content-info-purchase {
            margin: 0 50px 0 50px;
          }
        }
        .content-step-3 {
          .el-button {
            margin-top: 45px;
          }
        }
        .class-content-wrapper {
          border-bottom: 1px solid #979797;
          margin-bottom: 60px;
          .class-content {
            overflow: hidden;
            display: flex;
            align-items: center;
            img {
              width: 250px;
              height: 250px;
              float: left;
              margin: 30px;
            }
          }
        }
      }
    }

    .class-title, .class-content {
      h4 {
        font-size: 15px;
        margin-bottom: 3px;
        font-family: MuseoSans-700;
      }
      p {
        font-size: 12px;
        color: #9B9B9B;
        line-height: 15px;
        text-align: left;
        margin: 0px;
      }
    }
    .class-title p {
      margin-bottom: 10px;
    }
    .class-content-wrapper {
      .class-content {
        overflow: hidden;
        display: flex;
        align-items: center;
        .content-info-purchase, .content-info-sub-class {
          flex: 1;
        }
        img {
          width: 250px;
          height: 250px;
          float: left;
        }
      }
    }
    
    h3 {
      font-size: 36px;
      line-height: 38px;
      margin-bottom: 10px;
    }
    p {
      font-size: 18px;
      line-height: 22px;
      text-align: left;
      margin-left: 137px;
    }
    .tip-txt{
      font-size: 12px;
      line-height: 20px;
      color: #999;
    }
  }
  

</style>

<style lang="less">
  .box-product {
    .el-tabs__header {
      margin: 0;
    }
    .el-input__inner {
      border-radius: 20px;
    }
    .el-button {
      width: 160px;
      font-family: MuseoSans-700;
      font-size: 15px;
    }
  }
  
</style>