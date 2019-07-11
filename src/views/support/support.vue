<template>
  <div class="support-content">
    <div class="product-sort">
      <h3>How Can We Help You? </h3>
      <h4>Find Your Miroco Product</h4>

      <div class="product-sort-list">
          <dl class="product-sort-item" v-for="(cat,i) in catalogList" :key="i">
            <dt>
               <img src="~assets/img/support/top1.png" :alt="cat.categoryName"  v-if="i === 0"/>
               <img src="~assets/img/support/top2.png" :alt="cat.categoryName" v-if="i === 1" />
              <!--  <img src="~assets/img/other.png" :alt="cat.categoryName"  v-if="i === 3"/> -->
               <!-- imgList: ['audio.png', 'appliances.png', 'other.png', ''] -->
            </dt>
            <dd>
              <div class="dd-inner" :class="cat.childrenCatalogs && cat.childrenCatalogs.length > 0 ? 'hover-able': ''">
                <p class="title">
                  <router-link :to="'/category/' + cat.categoryName + '-c-' + cat.categoryId + '.html'" target="self" class="zyh-btn-txt">
                    <span>{{ cat.categoryName }}</span>
                  </router-link>
                  <span class="el-icon-arrow-down" v-if="cat.childrenCatalogs && cat.childrenCatalogs.length > 0"></span>
                  <span class="el-icon-arrow-up" v-if="cat.childrenCatalogs && cat.childrenCatalogs.length > 0"></span>
                </p>
                <!-- categoryId -->
                <ul class="list">
                  <li v-for="(item, index) in cat.childrenCatalogs" class="subTitle" v-bind:class="{ active: cid === item.categoryId }" :key="index">
                    <a :title="item.categoryName" :href="'/category/' + item.categoryName + '-c-' + item.categoryId + '.html'">{{ getCategoryName(item.categoryName) }}</a>
                  </li>
                </ul>
              </div>
            </dd>
          </dl>
          <dl class="bot"></dl>
        </router-link>
      </div>
    </div>

    <!-- Dash Cam -->
    <div class="box-dash" id="dash" v-show="cataList.length > 0" 
       v-loading="loading">
      <p class="title">{{ cName }}</p>
      <div class="list"  >
         <productItem :item="item" v-for="(item, index) in cataList" 
           :key="index">
          </productItem>
      </div>
    </div>
    <div class="more-supports">
      <h3>More Supports</h3>
        <div class='more-supports-list'>
           <div class="more-supports-item rel">
              <a href="/warranty" target="_blank">
                <p class='supports-item-icon'>
                  <img src="../../assets/img/support/s1.jpg" width="100%">
                </p>
                <p class='supports-item-name'><strong>Warranty Extension</strong></p>
                <div class="abs arrow">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </a>
          </div>

          <a class='more-supports-item rel' href="/influencer" target="_blank">
            <p class='supports-item-icon'>
              <img src="../../assets/img/support/s2.jpg" width="100%">
            </p>
            <p class='supports-item-name'>
            <strong>Influencer</strong></p>
            <div class="abs arrow">
              <i class="el-icon-arrow-right"></i>
            </div>
          </a>

          <a class='more-supports-item rel' href="/salesPolicy" target="_blank" >
            <p class='supports-item-icon'>
              <img src="../../assets/img/support/s3.jpg" width="100%">
            </p>
            <p class='supports-item-name'>
              <strong>After-Sales Policy</strong></p>

            <div class="abs arrow">
              <i class="el-icon-arrow-right"></i>
            </div>
          </a>

          <a class='more-supports-item rel' href="mailto:support@mirocohome.com">
            <p class='supports-item-icon'>
              <img src="../../assets/img/support/s4.jpg" width="100%">
            </p>
            <p class='supports-item-name'><strong>Email Us</strong></p>
            <div class="abs arrow">
              <i class="el-icon-arrow-right"></i>
            </div>
          </a>
          <div class="bot"></div>
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import productItem from '../../components/productItem.vue'
export default {
  components: {
    productItem
  },
  computed: {
    ...mapGetters([
      'catalogList'
      // 'userList'
    ])
  },
  data () {
      return {
        cid: '',
        mentId: '',
        cName: '',
        loading: false,
        cataList: [],
        isSubTitleShow: false
      }
  },
  mounted () {
    setTimeout(() => {
      // this.$nextTick(function () {
        let  sortItems = this.$el.querySelectorAll('.product-sort-item');
        for (let i = 0; i < sortItems.length; i++) {
          let subTitleWidth = 0;

          if (sortItems[i].querySelectorAll('.subTitle') && sortItems[i].querySelectorAll('.subTitle').length > 0) {
            for (let j = 0; j < sortItems[i].querySelectorAll('.subTitle').length; j++) {
              if (subTitleWidth < sortItems[i].querySelectorAll('.subTitle')[j].offsetWidth) {
                subTitleWidth = sortItems[i].querySelectorAll('.subTitle')[j].offsetWidth;
              }
            }

            for (let m = 0; m < sortItems[i].querySelectorAll('.subTitle').length; m++) {
              sortItems[i].querySelectorAll('.subTitle')[m].style.width = subTitleWidth + 1 + 'px';

              sortItems[i].querySelectorAll('.subTitle')[m].style.marginRight = '16px';
            }

            if (sortItems[i].querySelectorAll('.subTitle').length > 2) {
              sortItems[i].querySelector('.list').style.width = sortItems[i].querySelectorAll('.subTitle')[0].offsetWidth + sortItems[i].querySelectorAll('.subTitle')[0].style.marginRight.substring(0, sortItems[i].querySelectorAll('.subTitle')[0].style.marginRight.length-2)*1 + sortItems[i].querySelectorAll('.subTitle')[1].offsetWidth + sortItems[i].querySelectorAll('.subTitle')[1].style.marginRight.substring(0, sortItems[i].querySelectorAll('.subTitle')[1].style.marginRight.length-2)*1 + sortItems[i].querySelectorAll('.subTitle')[2].offsetWidth + sortItems[i].querySelectorAll('.subTitle')[2].style.marginRight.substring(0, sortItems[i].querySelectorAll('.subTitle')[2].style.marginRight.length-2)*1 + 'px';
            }

            sortItems[i].querySelector('.list').style.left = "50%";
            sortItems[i].querySelector('.list').style.marginLeft = '-' + (sortItems[i].querySelector('.list').offsetWidth/2-8) + 'px';
            

            if (sortItems[i].offsetWidth < sortItems[i].querySelector('ul').style.width.substring(0, sortItems[i].querySelector('ul').style.width.length - 2) * 1) {
              sortItems[i].style.width = sortItems[i].querySelector('ul').style.width;
              sortItems[i].style['z-index'] = 1;
            }

          }
          
        }
      // }
      
    }, 1000)
  },
  methods: {
    /**
     * [clickMenu 点击主菜单]
     * @author luke 2018-06-25
     */
    clickMenu (obj) {
      this.mentId = obj.categoryId;
      this.cid = obj.categoryId;
      let ids = '';
      for (let i = 0; i < obj.item.length; i++) {
         let _ths = obj.item[i];
         // 更新数据
         ids += _ths.categoryId + ',';
      }
      ids = ids.substring(0, ids.length -1);
      this.getData(ids);
    },
    /**
     * [clickSubMenu 点击子菜单]
     * @author luke 2018-06-25
     */
    clickSubMenu (obj) {
      this.cid = obj.categoryId;
      this.cName = obj.categoryName;
      this.getData(obj.categoryId);
    },
    /**
     * [getData 获取数据]
     * @author luke 2018-06-25
     */
    async getData (id) {
      // 先清空数据
      this.loading = true;
      let pObj = {
        api: 'getProductsByCategory',
        data: {
          categoryIds: id
        }
      }
      let pData = await this.$store.dispatch('fetchGetAll', pObj);
      this.loading = false;
      if (typeof pData === 'object' && pData.length > 0) {
        this.cataList = pData;
      } else {
        this.cataList = [];
      }
    },
    getCategoryName (categoryName) {
      if (categoryName.length > 13) {
        return categoryName.substring(0, 13) + '...';
      }

      return categoryName;
    }
  }
};
</script>
<style lang='less' scoped>
@import "~assets/var.less";
.support-content {
  .support-banner {
    background-color: @gray;
    height: 400px;
    text-align: left;
    .bg-cover{
      /*background-image: url(../../assets/img/support/top.png);*/
      height: 400px;
      background-size: cover;
      background-position: 50%;
    }
    .abs-top{
      top:120px;
      left: 22%;
      width: 480px;
      .title{
        font-family: MuseoSans-700;
        font-size: 60px;
        color: #000000;
        line-height: 60px;
        margin-bottom: 15px;
      }
      .desc{
        font-family: MuseoSans-300;
        font-size: 28px;
        color: #000000;
        text-align: left;
        line-height: 24px;
      }
    }
  }
  .product-sort {
    padding-top: 100px;
    padding-bottom: 220px;
    color: @dark;
    width: 1060px;
    margin-left: auto;
    margin-right: auto;
    h3 {
      text-align: center;
      font-size: 36px;
      line-height: 38px;
    }
    h4 {
      margin-top: 15px;
      font-size: 15px;
      text-align: center;
      line-height: 22px;
      font-weight: normal;
    }
    .product-sort-list {
      text-align: center;
      padding-top: 95px;
      display: flex;
      .product-sort-item {
        flex: 1;
        font-size: 15px;
        padding: 20px;
        & + .product-sort-item{
          margin-left: 20px;
        }
        
        img {
          width: 160px;
        }
        dd {
          position: relative;
          .dd-inner {
            height: 20px;
            margin-top: 20px;
            display: inline-block;
            padding-bottom: 4px;
          }
          a {
            color: #9B9B9B;
          }
          a:hover {
            color: #333;
          }
          .hover-able:hover{
            a span{
              display: inline-block;
              border-bottom: 2px solid #00416f;
            }
            p{
              color: #333;
            }
            span:hover {
              color: #333;
            }
            .el-icon-arrow-up {
              display: inline-block;
            }
            .el-icon-arrow-down {
              display: none;
            }
            ul {
              visibility: visible;
            }
          }
          p {
            font-family: MuseoSans-500;
            font-size: 15px;
            color: #9B9B9B;
            cursor: pointer;
            .el-icon-arrow-up, .el-icon-arrow-down {
              padding-left: 3px;
            }
            .el-icon-arrow-up {
              display: none;
            }
            a {
              font-size: inherit;
            }
          }
          ul {
            visibility: hidden;
            width: max-content;
            text-align: center;
            line-height: 22px;
            position: absolute;
            padding-top: 20px;
            
            .subTitle{
              font-size: 15px;
              color: #9B9B9B;
              line-height: 32px;
              font-family: MuseoSans-300;
              cursor: pointer;
              float: left;
              height: 32px;
              text-align: left;
              &:hover{
                color: #00416f;
              }
              a {
                font-size: 15px;
              }
            }
            .active{
              color: #00416f;
            }
          }
          .active{
            color: #00416f;
          }
        }
      }
    }
  }

  .box-dash{
    width: 1060px;
    margin: 0 auto;
    .title{
      font-family: MuseoSans-700;
      font-size: 28px;
      color: #000000;
      margin-bottom: 10px;
    }
    .list {
      border-top: 1px solid #979797;
      padding-top: 40px;
    }
  }


  .more-supports{
    padding: 60px 0 54px;
    background-color: #fafafa;
    h3{
      font-size: 36px;
      color: @dark;
      text-align: center;
    }
    .more-supports-list{
      width: 1066px;
      margin-top: 60px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      .more-supports-item {
        flex: 1;
        margin-left: 20px;
        transition: all .5s;
        .arrow{
          font-size: 25px;
          right: 10px;
          bottom: 10px;
          top: inherit;
          left: inherit;
          display: none;
        }
        &:hover{
          .arrow{
            display: block;
          }
        }
        &:first-child{
          margin-left: 0px;
        };
      }
      .supports-item-icon{
        height:250px;
        background-color: @purple;
        position: relative;
        span{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .supports-item-name{
        background-color: @white;
        height: 180px;
        padding: 20px;
        font-size: 28px;
        color: @dark;
        line-height: 37px;
        
      }
    }
  }


  .support_icon {
    /*background-image: url("~assets/img/support_icon.png");*/
    background-repeat: no-repeat;
    background-size: 100%;
    width: 120px;
    height: 120px;
    display: inline-block;
  }
  .support_icon_email{
    background-position: center 0;
  }
  .support_icon_sales{
    background-position: center -127px;
  }
   .support_icon_warranty{
    background-position: center -254px;
  }
   .support_icon_influencer{
    background-position: center -381px;
  }
}
</style>