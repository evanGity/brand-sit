<template>
  <div class="product-detail">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/category/'+ item.categoryName + '-c-' + item.categoryId + '.html' }" v-for="(item, index) in breadList" :key="index">
         {{ item.categoryName }}
      </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="detail-baseinfo">
      <div class="baseinfo-content">
        <!-- 滚动条 -->
          <el-carousel class="content-item content-img" :autoplay="false" indicator-position="outside">
            <el-carousel-item v-for="(item, index) in imageData" :key="index">
              <vue-lazy-component>
                <img v-lazy="item.imgUrl" :src="item.imgUrl">
              </vue-lazy-component>
            </el-carousel-item>
          </el-carousel>
        <div class="content-item content-desc">
          <div class="content-desc-inner"> 
            <div class="desc-item desc-main" :title="productData.baseData.productName || ''">{{productData.baseData.productName || ''}}</div>
            <div class="desc-highlight">
              <!-- 没有内容隐藏 返回值是no data -->
              <ul class="desc-highlight-list" v-if="productHighlight && productHighlight !== 'no data'">
                <li class="desc-highlight-item" v-for="(item, index) in productHighlight" :key="index">{{item.detail}}</li>
              </ul>
            </div>
            <div class="desc-star-wrapper">
              <div class="desc-item desc-star">
                <!-- <product-star
                :star="productData.amzAvgStar"
                ></product-star> -->

                <el-rate
                  v-model="productData.baseData.amzAvgStar || 0"
                  disabled
                  :colors="['#00416f', '#00416f', '#00416f']">
                </el-rate>
              </div>
              <div class="desc-item desc-color" v-if="productData.colorData && productData.colorData.length">
                <p>{{productData.colorData[productColorActive].colorName}}</p>
                <span>
                  <product-color
                  :colorList="productData.colorData"
                  :productColorActive="productColorActive"
                  @showSelectedColor="updateSelectedColor"
                  ></product-color>
                </span>
              </div>
              <div class="desc-item desc-warranty">Free Shipping&nbsp;&nbsp;|&nbsp;&nbsp;18 Months Warranty&nbsp;&nbsp;|&nbsp;&nbsp;Free Return</div>
            </div>
          </div>
        </div>
      </div>
      <div class="baseinfo-price">
        <div class="baseinfo-price-inner">
          <div class="baseinfo-detail">
            <div class="tab-wrapper">
              <a class="overview" href="#overview" v-if="productData.baseData.description">Overview</a>
              <a class="specifications" href="#specifications" v-if="productSpecs.length > 0 || productDownload.length > 0">Specifications</a>
              <a class="faq" href="#faq" v-if="productFaq.length > 0">FAQ</a>
            </div>
          </div>
          <div class="price-detail">
            <span v-if="platFormData && platFormData.length > 0">
              <el-select v-model="defaultCountryName" >
                <el-option
                  v-for="(item, index) in platFormData"
                  :key="index"
                  :label="item.countryName"
                  :value="item.countryName"
                  @click.native="productCounActive = index ">
                </el-option>
              </el-select>
            </span>
            <span class="price-val" v-if="platFormData && platFormData.length > 0">
              {{(platFormData[productCounActive].unit || '') + (platFormData[productCounActive].price || '')}}</span>
            <el-button round @click="goToAmazon" v-if="platFormData && platFormData.length > 0">Buy at Amazon</el-button>
            <span style="font-size: 15px;" v-if="!isShowAmazon">Out of stock</span>
            <!-- 108 产品显示添加购物车按钮 -->
            <router-link to="/register" v-if="pid == 108" 
               style="margin-left: 10px;">
              <el-button round >&nbsp;&nbsp;&nbsp;Add to Cart&nbsp;&nbsp;&nbsp;</el-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-overview" id="overview" v-if="productData.baseData.description">
      <div class="detail-overview-inner">
        <h3>Overview</h3>
        <div v-html="productData.baseData.description || ''"></div>
      </div>
    </div>
    <div class="detail-specifications" id="specifications" v-if="(productSpecs && productSpecs.length > 0) || (productDownload1 && productDownload1.length > 0) || (productDownload2 && productDownload2.length > 0)">
      <div class="detail-specifications-inner">
        <div class="specifications-title">
          <h3>Specifications</h3>
        </div>
        <div class="specifications-content" v-if="productSpecs && productSpecs.length > 0">
          <div class="content-item" v-for="(item1, index) in productSpecs" :key="index">
            <h4>{{item1.specsName}}</h4>
            <p>{{item1.specsValue}}</p>
          </div>
        </div>
      </div>
      <div class="detail-download">
        <div class="detail-download-inner">
          <div class="download-item download-manual" v-if="productDownload1 && productDownload1.length > 0">
            <div class="manual-img">
              <img src="../../assets/img/manual.png">
            </div>
            <div class="manual-content">
              <h3>Product Manual</h3>
              <p class="product-model">{{productData.baseData.model}}</p>
              <div class="product-link">
                <a target="_blank" v-for="(item, index) in productDownload1" :title="item.title" :href="item.fileUrl" :key="index">{{(item.title + '.' + item.fileType) || item.fileName}} ></a>
              </div>
              <p class="send-email-title">Send to your email</p>
              <el-input :class="{'input-error': !isEmailValid1}" v-model="email1" placeholder="Enter your email address" @focus="focusHandler(1)"></el-input>
              <div class="email-validate-tips">{{emailValidateTip1}}</div>
              <el-button round @click="sendEmailHandler(1)" >Send</el-button>
            </div>
          </div>
          <div class="download-item download-firmware" v-if="productDownload2 && productDownload2.length">
            <div class="firmware-img">
              <img src="../../assets/img/download.png">
            </div>
            <div class="firmware-content">
              <h3>Firmware & Driver</h3>
              <p class="product-model">{{productData.baseData.model}}</p>
              <div class="product-link">
                <a v-for="(item, index) in productDownload2" :title="item.title" :href="item.fileUrl" :key="index">{{(item.title + '.' + item.fileType) || item.fileName}}</a>
              </div>
              <p class="send-email-title">Send to your email</p>
              <el-input :class="{'input-error': !isEmailValid2}" v-model="email2" placeholder="Enter your email address " @focus="focusHandler(2)"></el-input>
              <div class="email-validate-tips">{{emailValidateTip2}}</div>
              <el-button round @click="sendEmailHandler(2)">Send</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>  
    <div class="detail-FAQ" id="faq">
      <div class="FAQ-inner">
        <h3 class="FAQ-title">FAQ</h3>
        <div class="FAQ-tips">
          <h4>Customer Questions and Answers</h4>
          <p>The questions and answers below were created by Amazon customers, who are not affiliated or in any way officially connected with Taotronics. Please follow their advice at your own discretion.</p>
        </div>
        <div class="FAQ-content" v-if="productFaq && productFaq.length > 0">
          <div class="FAQ-content-item" v-for="(item, index) in productFaq2" :key="index">
            <p class="item-question">{{item.question}}</p>
            <p class="item-answer">{{item.answer}}</p>
          </div>
          <div class="FAQ-content-all">
            <span v-if="productFaq.length > 3 && !isViewMore" @click="viewMoreFaq">View more answered questions ({{productFaq.length}}) ></span>
          </div>
        </div>
        <div v-else>
          <p style="text-align: center;padding: 30px 0;color:#979797;">There is no data.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productColor from 'src/views/products/productColor.vue' // 
import { mapGetters } from 'vuex'
export default {
  name: 'products-detail',
  components: {
    'product-color': productColor,
  },
  computed: {
      ...mapGetters([
          'productData'
      ])
  },
  data () {
    return {
      email1: '',
      email2: '',
      isEmailValid1: true,
      isEmailValid2: true,
      emailValidateTip1: '',
      emailValidateTip2: '',
      productCounActive: 0, // 默认显示国家列表的第一个 也是价格列表的第一个
      productColorActive: 0, // 默认颜色列表的第一个 默认值需根据产品ID来选择
      productParam: {brand: '', productId: ''}, // 请求产品详情参数
      productSpecs: [], // 产品规格
      productDownload: [], // 下载
      productDownload1: [], // 下载
      productDownload2: [], // 下载
      productFaq: [], // 产品fqa
      productFaq2: [],
      productHighlight: [], // 产品highlight
      defaultCountryName:  '',
      isViewMore: false,
      isShowAmazon: true,
      pid: '', //产品id
      breadList: [], // 面包屑
      seoItem: {}, // seo 对象
      imageData: [], //image
      platFormData: []
    }
  },
  title () {
    let _pid = this.$route.params.pid;
    _pid = _pid.split('-p-')[0];
    return _pid + '-miroco';
  },
  created () {
    let _pid = this.$route.params.pid;
    _pid = _pid.split('-p-')[1];
    this.pid = _pid.substring(0, _pid.length - 5);
    // -p-
    this.productParam.productId = this.pid;
    this.queryData();
    // 添加广告代码
    // 新接口 sku和model会从paltform中去拿，去掉注释注意与新接口同步
    // this.$nextTick( () => {
    //   let item = {
    //     imgUrls: this.productBaseInfo.imgUrls,
    //     productName: this.productBaseInfo.productName,
    //     productId: this.productBaseInfo.productId,
    //     sku: this.productBaseInfo.sku,
    //     // urlKey: this.productBaseInfo.urlKey,
    //     unit: this.productBaseInfo.unit[0],
    //     model: this.productBaseInfo.model,
    //     amzAvgStar: this.productBaseInfo.amzAvgStar,
    //     countryCode: this.productBaseInfo.countryCode,
    //     price: this.productBaseInfo.price[0]
    //   }
    //   this.seoItem = item;
    //   window.criteo_q.push(
    //     { event: "setAccount", account: 45469 },
    //     { event: "setSiteType", type: "d" },
    //     { event: "viewList", item: item }
    //   );
    //   window.criteo_q.push(
    //     { event: "setHashedEmail", email: this.$cookie.get('uname')}
    //   );
    // });
  },
  mounted () {
    // 获取面包屑
    let obj = {
      api: 'getBreadcrumb',
      data: {
        productId: this.pid
      }
    }
    this.$store.dispatch('fetchGetAll', obj).then(json => {
      this.breadList = json.reverse();
    }).catch(error => {
      this.$message.error(error);
    });
  },
  methods: {
    queryData (item) {
      if (item) this.productParam.productId = item.slaveProductId // 颜色切换即切换产品
      // this.init()
      // this.queryBreadcrumb()
      // this.queryAmazonStatus();
      this.setImageData();
      this.setPlatFormData();
      this.queryProductHighlight()
      this.queryProductSpecs()
      this.queryProductDownload()
      this.queryProductFaq()
    },
    // async init () { // 获取产品基本数据
    //     await this.$store.dispatch('productBaseInfo', { productId: this.productParam.productId });
    //     this.productData = this.productBaseInfo;
    //     this.defaultCountryName = this.productBaseInfo.countryName[0];
    // },
    // async queryBreadcrumb () { // 获取产品介绍
    //   let ths = this;

    //   let obj = { api: 'breadcrumb', data: {productId: ths.productData.baseData.productId} }
    //   let json = await this.$store.dispatch('fetchGetAll', obj);
    //   this.breadcrumb = json
    // },


    /**
     * 根据colorId获取iamgeData
     * frave 
     * 2018-09-20
     */
    setImageData (colorId) {
      let defaultColorId = '';
      this.imageData = [];
      if (this.productData.colorData && this.productData.colorData.length > 0) {
        defaultColorId = this.productData.colorData[0].colorId;
      }
      let selectorId = colorId || defaultColorId;

      if (this.$common.isNull(selectorId) && this.$common.isNull(colorId)) {
        return;
      }

      for (let i = 0; i < this.productData.imageData.length; i++) {
        if (selectorId == this.productData.imageData[i].colorId) {
          this.imageData.push(this.productData.imageData[i]);
        }
      }
    },
    /**
     * 根据colorId获取platFormData
     * frave 
     * 2018-09-20
     */
    setPlatFormData (colorId) {
      let defaultColorId = '';
      this.platFormData = [];
      if (this.productData.platFormData && this.productData.platFormData.length > 0) {
        defaultColorId = this.productData.platFormData[0].colorId;
      }
      let selectorId = colorId || defaultColorId;

      if (this.$common.isNull(selectorId) && this.$common.isNull(colorId)) {
        return;
      }

      for (let i = 0; i < this.productData.platFormData.length; i++) {
        if (selectorId == this.productData.platFormData[i].colorId) {
          this.platFormData.push(this.productData.platFormData[i]);
        }
      }

      this.defaultCountryName = this.platFormData && this.platFormData.length > 0 ? this.platFormData[0].countryName : '';
    },
    async queryAmazonStatus () {
      if (!(this.platFormData && this.platFormData.length > 0)) {
          return;
        }

      let obj = { api: 'getAmzProductStatus', data: {asin: this.platFormData[0].asin, countryCode: this.platFormData[0].countryCode}}
      let json = await this.$store.dispatch('fetchGetAll', obj);

      if (json && json.length > 0 && json[0].status === 'Active') {
        this.isShowAmazon = true;
      }
    },
    async queryProductHighlight () { // 获取产品介绍
      let obj = { api: 'getProductHighlight', data: this.productParam }
      let json = await this.$store.dispatch('fetchGetAll', obj);
      this.productHighlight = json
    },
    async queryProductSpecs () { // 请求产品规格数据
      let obj = { api: 'getProductSpecs', data: this.productParam }
      let json = await this.$store.dispatch('fetchGetAll', obj);
      if (json instanceof Array) this.productSpecs = json;
    },
    async queryProductReview () { // 请求产品评论数据
      let obj = { api: 'getProductReview', data: this.productParam }
      let json = await this.$store.dispatch('fetchGetAll', obj);
      this.productReview = json
    },
    async queryProductDownload () { // 请求产品下载数据
      let obj = { api: 'getProductDownload', data: this.productParam }
      let json = await this.$store.dispatch('fetchGetAll', obj);
      json.forEach(item => { // 补充控制参数 email 输入的邮箱地址  inputError是否显示输入错误提示
        item.email = ''
        item.inputError = false
      })
      this.productDownload = json;
      for (var i = 0; i < this.productDownload.length; i++) {
        let fileType = this.productDownload[i].fileType.toLowerCase();
        if (fileType === 'pdf' || fileType === 'doc' ) {
          this.productDownload1.push(this.productDownload[i]);
        } else {
          this.productDownload2.push(this.productDownload[i]);
        }
      }
    },
    async queryProductFaq () { // 请求产品fqa数据
      let obj = { api: 'getProductFaq', data: this.productParam }
      let json = await this.$store.dispatch('fetchGetAll', obj);
      this.productFaq = json;
      this.productFaq2 = this.productFaq.slice(0, 3);
    },
    updateSelectedColor (item) {
      // 回显颜色选择
      let ths = this;
      if (this.productData.colorData && this.productData.colorData.length > 0) {
        this.productData.colorData.forEach((item2, index) => {
          if (item.colorId == item2.colorId) ths.productColorActive = index;
        })
      }
      
      this.setImageData(item.colorId);
      this.setPlatFormData(item.colorId);
      // let name = this.productData.baseData.shortName.replace(/\//ig, '');
      // let url = '/product/' + name + '-p-' + item.slaveProductId + '.html';
     //  window.location.href = url;
    },
    viewMoreFaq () {
      this.productFaq2 = this.productFaq;
      this.isViewMore = true;
    },
    sendEmailHandler (type){
      this['isEmailValid' + type] = this.getEmailValid(type);

       if (!this['isEmailValid' + type]) {
         return;
       }

       let downloadId = [];
       for (var i = 0; i < this.productDownload1.length; i++) {
         downloadId.push(this.productDownload1[i].id);
       }

       let ths = this;
       this.$store.dispatch('fetchAllList', {
          api: 'sendProductDownloads',
          data: { email: this['email' + type], originalSource: 2, downloadId: downloadId.join(',')}
        }).then(function (res) {
          ths.$message({
            message: 'success',
            type: 'success'
          });
        }).catch(error => {
          console.log(error);
        });
    },
    getEmailValid (type) {
      let email = this['email' + type];
      if (email === '') {
        this['emailValidateTip' + type] = 'Please enter the email address.';
        return false;
      } else if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email)) {
        this['emailValidateTip' + type] = 'Please enter a valid email address.';
        return false;
      } else {
        this['emailValidateTip' + type] = '';
        return true;
      }
    },
    goToAmazon (){
      let ths = this;
      // window.criteo_q.push( 
      //   { 'event': 'trackTransaction', 
      //     'id': this.uuid(), 
      //     'item' : [{ 'id' : this.seoItem.sku,
      //        'price' : this.seoItem.price, 'quantity' : 1 }]
      //   }
      // );
      window.open('https://www.amazon.com/gp/product/' + (ths.platFormData[ths.productCounActive].asin || '') + '?keywords=' + ths.productData.baseData.amzKeywords);
    },
    /**
     * [uuid 生成uuid]
     * @author luke 2017-11-30
     */
    uuid () {
      var s = [];
      var hexDigits = '0123456789abcdef';
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-';
      var uuid = s.join('');
      return uuid;
    },
    focusHandler (type) {
      this['isEmailValid' + type] = true;
      this['emailValidateTip' + type] = '';
    }
  }
}
</script>

<style lang="less" scoped>
  .product-detail {
    font-family: MuseoSans-300;
    .breadcrumb {
      width: 1060px;
      margin: 0 auto;
      padding: 20px 0px;
    }
    .detail-baseinfo {
      width: 1060px;
      margin: 0 auto;
      .baseinfo-content {
        overflow: hidden;
        border-bottom: 1px solid #E5E5E5; 
        position: relative;
        .content-item {
          float: left;
        }
        .content-img {
          margin-bottom: 40px;
        }
        .content-desc {
          width: 50%;
          padding-left: 50px;
          float: left;
          .content-desc-inner {
            display: inline-block;
            text-align: left;
            .desc-highlight {
              padding-left: 20px;
              height: 250px;
              overflow-y: auto;
            }
            .desc-highlight-list, .desc-highlight-item {
              list-style: disc;
              margin-bottom: 10px;
              font-size: 15px;
            }
            .desc-main {
              margin-bottom: 15px;
              font-family: MuseoSans-700;
              max-height: 72px;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
              font-size: 36px;
            }
            .desc-star-wrapper {
              position: absolute;
              bottom: 45px;
            }
            .desc-star {
              margin-bottom: 20px;
            }
            .desc-color {
              margin-bottom: 20px;
              p {
                margin-bottom: 10px;
                width: 200px;
                font-size: 12px;
                color: #9B9B9B;
                line-height: 15px;
              }
            }
            .desc-warranty {
              font-size: 14px;
              color: #9B9B9B;
              line-height: 30px;
            }
          }
        }
      }
      .baseinfo-price-inner {
        padding: 25px 0;
        overflow: hidden;
        .baseinfo-detail {
          width: 50%;
          float: left;
          line-height: 40px;
          strong {
            font-size: 15px;
            float: left;
            margin-right: 65px;
            font-family: MuseoSans-700;
          }
          .tab-wrapper {
            float: left;
            height: 40px;
            line-height: 40px;
            a {
              font-size: 15px;
            }
            .overview, .specifications{
              padding-right: 30px;
              border-right: 1px solid #E5E5E5;
              margin-right: 30px;
            }
          }
        }
        .price-detail {
          float: right;
          .el-button {
            background-color: #00416f;
            color: #fff;
          }
          .price-country {
            font-size: 12px;
            color: #9B9B9B;
            line-height: 15px;
           }
          .price-val {
            margin: 0 30px 0 50px;
            font-size: 15px;
            line-height: 23px;
            width: 80px;
            display: inline-block;
          }
        }
      }                          
    }
    .detail-overview {
      background-color: #fafafa;
      .detail-overview-inner {
        width: 1060px;
        margin: 0 auto;
        padding-bottom: 40px;
      }
      h3 {
        text-align: left;
        font-size: 36px;
        line-height: 38px;
        font-family: MuseoSans-700;
        padding: 80px 0;
      }
    }
    .detail-specifications {
      background-color: #FAFAFA;
      .detail-specifications-inner {
        width: 1060px;
        margin: 0 auto;
        overflow: hidden;
        .specifications-title {
          padding: 80px 0;
          h3 {
            font-size: 36px;
            margin-right: 86px;
            font-family: MuseoSans-700;
          }
          h4 {
            font-family: MuseoSans-700;
          }
        }
        .specifications-content {
          max-height: 500px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin-bottom: 50px;
          .content-item {
            margin-bottom: 30px;
            width: 33.3%;
            word-wrap: break-word;
            padding-right: 50px;
            h4 {
              font-size: 15px;
              margin-bottom: 5px;
            }
            p {
              font-size: 15px;
            color: #7F7F7F;
            line-height: 22px;
            }
          }
        }
      }
    }
    

    .detail-FAQ {
      background: #FAFAFA;
      .FAQ-inner {
        width: 1060px;
        margin: 0 auto;
        padding: 100px 0 120px 0;
        .FAQ-title{
          font-size: 36px;
          line-height: 38px;
          font-family: MuseoSans-700;
        }
        .FAQ-tips {
          padding: 44px 0 60px 0;
          border-bottom: 1px solid #979797;
          h4 {
            font-size: 28px;
            font-family: MuseoSans-700;
          }
          p {
            font-size: 15px;
            line-height: 23px;
            margin-top: 5px;
          }
        }
        .FAQ-content {
          .FAQ-content-item {
            padding: 30px 0;
            border-bottom: 1px solid #979797;
            .item-authorDate, .item-answer{
              font-size: 15px;
              color: #9B9B9B;
              line-height: 22px;
            }
            .item-question {
              margin-bottom: 15px;
              font-size: 15px;
              line-height: 22px;
              font-family: MuseoSans-700;
            }
          }
          .FAQ-content-all {
            font-size: 15px;
            color: #00416f;
            line-height: 22px;
            margin-top: 30px;
            span {
              cursor: pointer;
             }
          }
        }
      }
    }
    .detail-download {
      background: #fafafa;
    }
    .detail-download-inner {
      width: 1060px;
      marign: 0 auto;
      margin: 0 auto;
      overflow: hidden;
      .download-item {
        overflow: hidden;
        background: #FAFAFA;  
        .manual-img, .manual-content, .firmware-img, .firmware-content {
          float: left;
        }
        .manual-content, .firmware-content {
          margin: 35px 0 0 110px;
          h3 {
            font-size: 21px;
            font-family: MuseoSans-700;
          }
          .product-model {
            font-size: 15px;
            color: #9B9B9B;
            line-height: 22px;
            margin-top: 5px;
          }
          .product-link {
            margin: 30px 0;
            a {
              display: block;
              font-size: 15px;
              line-height: 23px;
            }
            a:hover {
              color: #27b0b3;
            }
          }
          .send-email-title {
            font-size: 15px;
            color: #9B9B9B;
            line-height: 22px;
          }
          .email-validate-tips {
            margin-left: 15px;
            height: 40px;
            line-height: 30px;
            color: red;
          }
        }
        .manual-img, .firmware-img {
          background: #00416f;
          width: 340px;
          height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 160px;
            height: 160px;
          }
        }
      }
      .download-firmware {
        margin-top: 20px;
      }
    }
  }
</style>

<style lang="less">
  .el-carousel {
    width: 50%;
    .el-carousel__container {
      height: 500px;
      width: 500px;
      margin: 0 auto;
      img {
        max-width: 420px;
        max-height: 420px;
      }
      .el-carousel__item {
        text-align: center;
      }
      .el-carousel__arrow--left {
        left: -15px;
        top: 45%;
      }
      .el-carousel__arrow--right {
        right: -15px;
        top: 45%;
      }
    }
    .el-carousel__indicators--outside {
      bottom: 0;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .el-carousel__indicator.is-active button {
      background-color: #00416f;
    }
    .el-carousel__button {
      height: 10px;
      width: 10px;
      border-radius: 5px;
      opacity: 1;
      border: 1px solid #00416f;
      background-color: #fff;
    }
  }
  .el-input__inner {
    border-radius: 20px;
  }
  .download-item {
    .el-input {
      width: 340px;
      display: block;
      margin: 5px 0;
    }
    .el-button {
      width: 340px;
      background: #00416f;
      color: #fff;
    }
  }
  .input-error {
    border-color: red;
  }
</style>

