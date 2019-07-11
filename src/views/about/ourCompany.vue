
<template>
  <div class="our-company-container">
    <h2>About XXXX</h2>
    <p>At XXXX, we bring meaningful innovation to modern lifestyles. From award-winning speakers to one-stop car camera solutions, our products improve lives with ideas that can be shared and enjoyed by the whole family.</p>


    <h2>When We Began...</h2>

    <p>In 2015, XXXX was established to become a pioneer in audio devices. Our flagship product, the Voom 21 Bluetooth speaker, met with great success and in 2016 the company received its first Red Dot Design Award. From there we continued to expand with more innovative speakers and headphones.</p>


    <h2>Here We Are...</h2>

    <p>In 2017, XXXX has evolved in order to meet the needs of our customers. In addition to first-class audio devices, which will continue to be a hallmark of our brand, we're also establishing multiple new product lines, including ones for automobiles and home living. But whether it's a car dash camera for added convenience on the road, or a baby night light that adds a spark of joy to your home, XXXX only has one goal: to make life simple.</p>



    <h2>Looking Forward...</h2>

    <p>As technology advances, so will XXXX. We're always on the lookout for ways to connect and make life easier for our customers, whether it's by improving the usability of advanced products or by embracing the latest innovations in technology. Where will XXXX go next? We can only wait and see, but join us on our journey and make life simple again.</p>

  </div>

</template>

<script>
// import Banner from 'components/bannerCommon.vue'
  export default {
    data() {
      return {
        // bannerList: [1],
        // bannerStyle:{}
      }
    },
    components: {    
      // Banner
    }
  }
</script>

<style lang='less' scoped>
  .our-company-container{
    margin-top: 60px;
    width: 1024px;
    margin: 0px auto;
    font-family: MuseoSans-300;
    padding: 60px 0px;
    h2{
      font-size: 24;
      font-family: MuseoSans-700;
      margin: 20px 0px;
    }
    p {
      font-size: 16px;
      color: #595959;
      line-height: 20px;
    }
  }
</style>