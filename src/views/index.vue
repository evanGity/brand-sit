<template>
  <div class="news-view">
     <!--banner 位-->
     <!-- <banner></banner> -->

     <!-- 新首页图片 -->
    <div class="top-home">
      
         <div class="item" style="margin-bottom: 16px;">
            <a href="" target="_blank"  >
              <img src="../assets/img/home/homeCam.jpg" alt="Miroco" width="100%">
            </a>
         </div>
         <div class="item" style="margin-bottom: 16px;">
           <a href="" target="_blank"  >
             <img src="../assets/img/home/home-top1.png" alt="Miroco" width="100%" >
           </a>
         </div>
         <div class="item">
            <a href="">
              <img src="../assets/img/home/home-top3.png" alt="XXXX MOOV 28 Wireless Headphones Sports Earphones in Ear Earbuds with 9 Hours Playtime" width="100%">
            </a>
         </div>
      <vue-lazy-component >
         <div class="list">
            <div class="v-item rel">
               <a href="http://www.mirocohome.com/" target="_blank">
                 <img src="../assets/img/home/home1.png" data-src="../assets/img/home/home1.png" width="100%;" alt="Press Release">
                 <!-- <div class="txt-center">Press Release</div> -->
               </a>
            </div>
            <div class="v-item">
              
                <a href="" >
                  <img src="../assets/img/home/home2.png" data-src="../assets/img/home/home2.png" width="100%;">
                </a>
            
            </div>

            <div class="v-item">
              <router-link to="/influencer">
                <div class="bg-img">
                  <!-- <div class="txt-center">Miroco Influencers</div> -->
                </div>
              </router-link>
               <!-- <img src="../assets/img/home/2.png" width="100%;"> -->
            </div>
            <div class="v-item">
              <router-link to="/warranty">
                <div class="bg-img bg-img2">
                  <!-- <div class="txt-center">Register & Warranty</div> -->
                </div>
              </router-link>
            </div>
         </div>
      </vue-lazy-component>
    </div>
  </div>
</template>

<script>
// import { watchList } from '../api'
import Banner from '../components/banner.vue'
import productItem from '../components/productItem.vue'

export default {
  name: 'item-list',

  components: {
    Banner,
    productItem
  },

  data () {
    return {
      transition: 'slide-right',
      bestSellersList: []
    }
  },

  title () {
    return 'Miroco Official Website';
  },

  computed: {
    page () {
      return Number(this.$route.params.page) || 1
    }
  },

  beforeMount () {
    // console.log(this.$root._isMounted);
    if (this.$root._isMounted) {
      // this.loadItems(this.page);
    }
    // 获取首页新品发布数据
    // let obj = {
    //   api: 'getBestSellers',
    //   data: {}
    // }
    // this.$store.dispatch('fetchGetAll', obj).then((json) => {
    //   console.log(json);
    //   this.bestSellersList = json;
    // })
  },
  mounted () {
    // 获取首页新品发布数据
    this.init();
  },

  beforeDestroy () {
    // this.unwatchList()
  },

  watch: {
    page (to, from) {
      // this.loadItems(to, from)
    }
  },

  methods: {
    /**
     * [init 获取新品数据]
     * @author luke 2018-06-04
     * @return {[type]} [description]
     */
    init () {
      let obj = {
        api: 'getBestSellers',
        data: {}
      }
      this.$store.dispatch('fetchGetAll', obj).then((json) => {
        console.log(json);
      })
    },
    productDetail (item) {
      this.$router.push({path: '/productsDetail'})
    }
  }
}
</script>

<style lang='less' >
@black: #333333;
@gray: #666666;
@blue: #61BDC2;
@active: #3b9fa4;
.news-view {
  .banner{
     .banner-block{
        cursor:pointer;
     }
  }
  .top-home {
    width: 100%;
    .item{
      cursor: pointer;
      border: 0px;
      font-size: 0px;
    }
    .list{
      padding: 20px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .v-item{
        width: 49%;
        /*justify-content: space-around;*/
        /*flex: 1;*/
        padding-bottom: 20px;
        margin-right: 20px;
        &:nth-child(2n){
          margin-right: 0px;
        }
        .bg-img{
          background-image: url(../assets/img/home/b2.png);
          background-repeat: no-repeat;
          background-size: 100%;
          height: 100%;
          position: relative;
          cursor: pointer;
          padding-bottom: 77%;
        }
        .bg-img2{
          background-image: url(../assets/img/home/b3.png);
        }
        .txt-center{
          text-align: center;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          line-height: 33px;
          height: 33px;
          font-size: 28px;
          color: #FFFFFF;
        }
      }
    }
  }
  .owl-wrapper-outer{
    width: 1200px;
    margin: 0 auto;
    color: #000000;
    height: 300px;
    h3{
      text-align: center;
      font-size: 40px;
      line-height: 40px;
      width: 600px;
      margin: 0 auto;
      margin-top: 50px;
    }
  }

  .content--index{
    padding-top: 40px;
    padding-bottom: 20px;
    .text--title{
      font-size: 22px;
      margin: 0 0 40px;
      font-weight: bold;
    }
    .list--cmdy {
      display: flex;
      flex-wrap: wrap;
      width: 1200px;
      padding-left: 22px;
      list-style: none;
      padding: 0;
      margin: 0;
      overflow: hidden;
      margin-left: auto;
      margin-right: auto;
      padding: 5px;
    }

  }
}
</style>
