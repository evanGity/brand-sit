<template>
  <div class="box-about">
    <div class="box-image">
      <img src="../../assets/img/about/about-one.png">
    <!--   <div class="box-inner">
          <h2>Life Made Simple</h2>
          <p>Simple to use, thoughtfully designed, guaranteed quality</p>
      </div> -->
    </div>
    <div class="about-two-text">
      <div class="about-two-text-inner">
        <h2>Who We Are?</h2>
        <p>Miroco Intelligent Home Appliance, High-tech intelligent life experience! No matter when and where, you can control appliance and video surveillance through software, do wireless life, enjoy unlimited!</p>
      </div>
    </div>
    <div class="box-image" >
      <vue-lazy-component >
        <img src="../../assets/img/about/about-three.png">
      </vue-lazy-component>
      <!-- <div class="box-inner right-one">
         <h2>XXXX Was Born</h2>
         <p>In 2015, XXXX was established to become a pioneer in audio devices. Our flagship product, the Voom 21 Bluetooth speaker, met with great success and in 2016 the company received its first Red Dot Design Award. From there we continued to expand with more innovative speakers and headphones.</p>
      </div> -->
    </div>
    <div class="box-image">
      <vue-lazy-component >
        <img src="../../assets/img/about/about-four.png">
      </vue-lazy-component>
<!--       <div class="box-inner left-two">
        <h2>Here We Are</h2>
        <p>In 2017, XXXX has evolved in order to meet the needs of our customers. In addition to first-class audio devices, which will continue to be a hallmark of our brand, we're also establishing multiple new product lines, including ones for automobiles and home living. But whether it's a car dash camera for added convenience on the road, or a baby night light that adds a spark of joy to your home, XXXX only has one goal: to make life simple.</p>
      </div> -->
    </div>
    <div class="box-image">
      <vue-lazy-component >
        <img src="../../assets/img/about/about-five.png">
      </vue-lazy-component>
<!--       <div class="box-inner right-three">
        <h2>XXXX Future</h2>
        <p>As technology advances, so will XXXX. We're always on the lookout for ways to connect and make life easier for our customers, whether it's by improving the usability of advanced products or by embracing the latest innovations in technology. Where will XXXX go next? We can only wait and see, but join us on our journey and make life simple again.</p>
      </div> -->
    </div>
    <div class="box-service">
      <div class="box-service-inner">
        <ul class="box-service-list">
          <li class="box-service-item">
            <!-- <router-link to="/" target="self"> -->
              <div class="service-item-icon">
                <img src="../../assets/img/about/contact-us.png">
              </div>
              <div class="service-item-desc">
                <h3>Contact Us</h3>
                <p>support@mirocohome.com</p>
              </div>
            <!-- </router-link> -->
          </li>
          <li class="box-service-item box-service-item-middle">
            <!-- <router-link to="/" target="self"> -->
              <div class="service-item-icon">
                 <img src="../../assets/img/about/wholesale-inquiries.png">
              </div>
              <div class="service-item-desc">
                <h3>Wholesale Inquiries</h3>
                <p>support@mirocohome.com</p>
              </div>
            <!-- </router-link> -->
          </li>
          <li class="box-service-item">
            <!-- <router-link to="/" target="self"> -->
              <div class="service-item-icon">
                <img src="../../assets/img/about/media-inquires.png">
              </div>
              <div class="service-item-desc">
                <h3>Media Inquires</h3>
                <p>marketing@mirocohome.com </p>
              </div>
            <!-- </router-link> -->
          </li>
        </ul>
      </div>
    </div>
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
  .box-about {
    font-family: MuseoSans-300;
    .about-two-text {
      background-color: #00416f;
      display: table;
      text-align: center;
      width: 100%;
      color: #fff;
      .about-two-text-inner{
        display: table-cell;
        vertical: middle;
        vertical-align: middle;
        height: 300px;
        h2 {
          font-size: 36px;
          line-height: 38px;
          font-family: MuseoSans-700;
        }
        p {
          font-size: 18px;
          line-height: 28px;
          width: 680px;
          margin: 0 auto;
        }
      }
      
    }
    .box-image {
      font-size: 0px;
      position: relative;
      min-height: 200px;
      img{
        width: 100%;
      }
      .box-inner{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        font-family: MuseoSans-300;
        font-size: 28px;
        color: #FFFFFF;
        text-align: center;
        line-height: 22px;
        width: 900px;
        height: 90px;
        h2{
          font-size: 60px;
          color: #FFFFFF;
          text-align: center;
          line-height: 60px;
        }
      }
      .right-one{
        left: 30%;
        height: 260px;
        width: 350px;
        font-size: 18px;
        color: #000000;
        line-height: 27px;
        text-align: left;
        h2{
          font-size: 36px;
          color: #000000;
          line-height: 38px;
          text-align: left;
        }
      }
      .left-two{
        right: 40%;
        height: 330px;
        width: 350px;
        font-size: 18px;
        line-height: 27px;
        text-align: left;
        h2{
          font-size: 36px;
          line-height: 38px;
          text-align: left;
        }
      }
      .right-three{
        left: 30%;
        height: 280px;
        width: 350px;
        font-size: 18px;
        line-height: 27px;
        text-align: left;
        h2{
          font-size: 36px;
          line-height: 38px;
          text-align: left;
        }
      }
    }
    .box-service-inner {
      background-color: #FAFAFA;
      height: 440px;
      padding: 20px 0;
      margin: 0 auto;
      text-align: center;
      .box-service-list {
        overflow: hidden;
        display: inline-block;
        .box-service-item {
          float: left;
          width: 340px;
          height: 400px;
          .service-item-icon {
            background-color: #00B049;
            height: 220px;
            text-align: center;
            img {
              width: 100%;
              /*height: 150px;*/
              /*margin-top: 35px; */
            }
          }
          .service-item-desc {
            text-align: left;
            padding: 20px;
            background-color: #fff;
            height: 180px;    
            h3 {
              font-size: 28px;
              margin-bottom: 5px;
              font-family: MuseoSans-700;
            }
            p{
              font-size: 15px;
              line-height: 23px;
              font-family: MuseoSans-300;
            }
          }
        }
        .box-service-item-middle {
          margin: 0 20px;
        }
      }
    }
  }
  
</style>