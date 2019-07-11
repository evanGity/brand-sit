<!-- 分类列表产品 -->
<template>
	<div class="product-list-item" v-if="item" @click="productDetail">
		 <dl class="text-center cursor-hover"> 
		 	   <dt>
		 	   	  <img :src="item.productImg" :title="item.shortName">
            <span class="product-fire" v-if="item.hotFlag">
               Hot
            </span>
            <span class="product-fire" v-if="item.newFlag">
               New
            </span>
         </dt>
			    <dd>
             <div :title="item.productName" class="name">
			          {{ item.shortName }}
			       </div>

             <!-- model -->
             <div class="model" v-if="item.model">
               <label>Model:</label>
               {{ item.model }}
             </div>
             <!-- price  -->
			       <p class="price-double" v-if="item.price">
			        	<span>${{ item.price }}</span>
               <!--  <i>${{ item.listingPrice}}</i> -->
			       </p>
             <!-- 颜色 -->
<!--         <p class="ps-color-box" v-if="item.colorList" >
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
              <!-- p class="product-star" v-if="item.amzAvgStar">
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
	</div>
</template>
<script>
  export default {
    name: 'product',

    components: {},

    data () {
      return {
        value5: 5
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

    watch: {
    },

    methods: {
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
    width: 33%;
    cursor: pointer;
    text-align: center;
    /*height: 550px;*/
    display: inline-block;
    transition: all .5s;
    dl {
        margin: 10px;
        padding-bottom: 10px;
        background-color: #fff;
    }
    dt {
        background-color: #fff;
        height: 320px;
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
            left: 0;
            top: 0;
            width: 76px;
            height: 32px;
            line-height: 32px;
            background: #00416f;
            font-family: MuseoSans-300;
						font-size: 16px;
						color: #FFFFFF;
						letter-spacing: 0;
						text-align: center;
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
        text-align: left;
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
    &:hover {
      dl {
        background: #FFFFFF;
        box-shadow: 0 3px 10px 5px rgba(0, 0, 0, 0.05);
        .price-double{
          display: block;
        }
      }
      
    }
  }
</style>