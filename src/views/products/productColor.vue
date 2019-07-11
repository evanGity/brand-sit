<template>
  <div class="product-color">
    <span class="color-list">
      <span class="color-item" v-for="(item, index) in colorList" :class="{'color-selected': selectedIndex === index}" :title="item.colorName" :style="{'background-color': item.colorValue}" @click="selectColorHandler(item, index)">
      </span>
    </span>
  </div>
</template>
<script>
  export default {
    data (){
      return {
        selectedIndex: this.productColorActive
      }
    },
    watch: {
      productColorActive: function (val) {
        this.selectedIndex = val;
      }
    },
    props: {
      colorList: {
        type: Array,
        default: []
      },
      productColorActive: {
        type: Number,
        default: 0
      },
    },
    methods: {
      selectColorHandler (item, index){
        this.selectedIndex = index;

        this.$emit('showSelectedColor', item);
      }
    }
  }
</script>

<style lang='less' scoped>
  .product-color{
    span {
      display: inline-block;
      cursor: pointer;
    }
    .color-selected, .color-item{
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }
    .color-item {
      border: 4px solid #E5E5E5;
      margin: 0 5px;
    }
    .color-selected {
      border: 2px solid #E5E5E5;
    }
  }
</style>
