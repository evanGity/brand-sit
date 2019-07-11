<template>
   <section class="banner" id="banner" >
      <el-carousel height="520px">
          <el-carousel-item v-for="(item,index) in bannerList" :key="index" >
            <div style="width:100%;">
                <a :href="item.bannerLink" target="_blank" class="banner-block"> 
                  <img :src="item.pcImg" style="
                   border-image-repeat: stretch;" />
                </a>
              </div>
          </el-carousel-item>
      </el-carousel>
   </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'banner-list',

  components: {
  },

  data () {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.$route.params.page) || 1,
      banners: ''
    }
  },

  computed: {
    page () {
      return Number(this.$route.params.page) || 1
    },
    ...mapGetters([
      'bannerList'
    ])
  },

  beforeMount () {
    // console.log(this.$root._isMounted);
    if (this.$root._isMounted) {
    }
  },

  beforeDestroy () {
  },

  mounted () {
    // FETCH_BANNER
    this.$store.dispatch('FETCH_BANNER');
  },

  watch: {
  },

  methods: {
    // loadItems (to = this.page, from = -1) {
    // }
  }
}
</script>

<style lang="less">
  .banner{
     .banner-block{
        cursor:pointer;
     }
  }
</style>
