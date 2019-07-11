<template>
	<a class="product-list-item" v-if="item" :href="`/product/${item.shortName.replace(/\//ig, '')}-p-${item.productId}.html`">
		 <dl class="text-center cursor-hover"> 
		 	   <dt>
            <img :src="item.catalogProductImages[0].imgUrl" :title="item.shortName">
         <!--    <span class="product-fire" v-if="item.hotFlag">
               <i>HOT</i>
            </span> -->
         </dt>
			    <dd>
             <div :title="item.productName" class="name" v-html="getNewName(item.shortName)">
                {{ item.shortName }}
			       </div>

             <!-- model -->
             <div class="model" v-if="item.model">
               <label>Model:</label>
               <span v-html="getNewName(item.model)"></span>
             </div>
             <!-- price  -->
			       <p class="price-double" v-if="item.price">
			        	<span>${{ item.price }}</span>
               <!--  <i>${{ item.listingPrice}}</i> -->
			       </p>
             <!-- 颜色 -->
<!--              <p class="ps-color-box" v-if="item.colorList" >
                  <span v-for="(vitem, index) in item.colorList"  :key='index'
                    :class="1===index ?'active':''" 
                    @click="productColorChoise(vitem, index)" 
                    :style="{backgroundColor:vitem.colorValue}" 
                    :title="vitem.colorName"
                    v-show="item.colorList && item.colorList.length > 0"
                  >
                  </span>
              </p> -->
              <!-- 星级 -->
              <!-- <p class="product-star" v-if="item.amzAvgStar">
                 <el-rate
                  v-model="item.amzAvgStar"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </p> -->
			       <!--  <p class="purchase-num text-center" v-if="item.amzReviews">
                 {{ item.amzReviews }} Purchases
               </p> -->
			    </dd>
			</dl>
	</a>
</template>
<script>
  export default {
    name: 'item-list',

    components: {},

    data () {
      return {
        value5: 5,
        name: '',
        model: ''
      }
    },

    title () {
      return '';
    },

    computed: {
    },

    props: {
      item: {
        type: Object
      },
      searchName: {
        default: '',
        type: String
      }
    },

    beforeMount () {
      // console.log(this.$root._isMounted);
      if (this.$root._isMounted) {
        // this.loadItems(this.page)
      }
    },

    beforeDestroy () {
      // this.unwatchList() 
    },
    mounted () {

    },

    watch: {
    },

    methods: {
      getNewName (val) {
        let ths = this;

        if (ths.$common.isNull(ths.searchName) || val.toLowerCase().indexOf(ths.searchName.toLowerCase()) === -1) {
          return val;
        }

        let searchNameArray = []; 
        for(let i = 0; i < val.length; i++){
          let index = val.toLowerCase().indexOf(ths.searchName.toLowerCase(), searchNameArray[searchNameArray.length-1] + ths.searchName.length || 0);//从0开始搜索
          if(index === -1){
            break;
          }else{
            searchNameArray.push(index);
          }
        }

        let newVal = '';
        for (let j = 0; j < searchNameArray.length; j++) {
          newVal += '<span style="color: red">' + val.substring(searchNameArray[j], searchNameArray[j] + ths.searchName.length) + '</span>' + val.substring(searchNameArray[j] + ths.searchName.length, searchNameArray[j+1]);
        }

        return newVal;
      },
      productDetail () {
        let name = this.item.shortName.replace(/\//ig, '');
        let url = '/product/' + name + '-p-' + this.item.productId + '.html';
        this.$router.push({path: url });
      }
    }
  }
</script>
<style lang='less' scoped>
  .product-list-item {
    width: 24%;
    margin-bottom: 30px;
    cursor: pointer;
    text-align: center;
    display: inline-block;
    vertical-align: top;
    dl {
        margin: 0px;
        padding: 20px;
    }
    dt {
        height: 216px;
        position: relative;
        img {
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .product-fire {
            position: absolute;
            right: 0;
            top: 0;
            width: 45px;
            height: 50px;
            line-height: 60px;
            display: inline-block;
            background: url(../assets/img/product-fire.png) center center no-repeat;
            i {
                font-size: 20px;
                text-transform: uppercase;
                color: white;
                font-style: normal;
                font-weight: 700;
            }
        }
    }
    dd {
        margin: 10px;
        padding: 0px 6px;
        .ps-color-box {
            font-size: 18px;
            text-align: center;
            line-height: 30px;
            height: 30px;
            span {
                display: inline-block;
                width: 25px;
                height: 25px;
                border: 2px solid #FFF;
                margin-right: 5px;
                border-radius: 5px;
                cursor: pointer;
                border-radius: 50%;
                &:active {
                    border-color: #00b4a0;
                }
            }
        }
    }
    .name {
        overflow: hidden;
        display: inline-block;
        line-height: 20px;
        vertical-align: top;
        width: 100%;
        text-overflow: ellipsis;
        font-weight: bold;
        height: 40px;
        font-family: MuseoSans-700;
        font-size: 15px;
        color: #000000;
        text-align: center;
    }
    .model {
      font-size: 15px;
      color: #9B9B9B;
      text-align: center;
      line-height: 22px;
    }
    .price-double {
      font-size: 15px;
      color: #9B9B9B;
      margin: 0px 5px;
      text-align: center;
      line-height: 22px;
      display: none;
    }
    .purchase-num {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 36px 10px 0;
        color: #595959;
        font-size: 16px;
        text-align: center;
    }
    .product-star {
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    }
    .cursor-hover {
        transition: all .3s;
        &:hover {
           background: #FFFFFF;
           box-shadow: 0 3px 10px 5px rgba(0, 0, 0, 0.05);
           .price-double{
             display: block;
           }
        }
    }
  }
</style>