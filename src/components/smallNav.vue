<template>
  <div class="nav-wrap">
    <div class="nav-main center-main">
      <ul>
        <li v-for="(item, key) in navlist" :key="key" :style="{width: width}" :class='{"active": key === activeVal}'  :data-categoryId='item.categoryId'>
          {{ item.categoryName }}
        </li>
        <li class="bot"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeVal: 0
      }
    },
    props: {
      navlist: {    //导航列表数据
        type: Array,
        default: []
      },
    },
    computed: {
      width() {
        return parseInt((1/this.navlist.length *10000))/100 + '%';
      }
    },
    methods: {
    },
    mounted: function (){
      // this.$store.dispatch('FETCH_HEADERCATALOG').then((json) => {
      //   console.log(json);
      // })
    }
  }
</script>
<style lang="less" scoped>
@import '~assets/var.less';
  .nav-wrap {
    padding: 15px 0 15px;
    li{
      float:left;  
      text-align: center;
      font-size: @font22;
      font-weight: bold;
      color: @font-black-color;
      cursor: pointer;
    }
    li + li{
      border-left: 1px solid #dcdcdc;
    }
  }
</style>