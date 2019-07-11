<template>
  <div class="contact-container">
    <h2>Contact Us</h2>

    <h3>Customer Service - We're here to help</h3>

    <p>We look forward to responding to your inquiry within 24 hours.</p>

    <p>0755-23908816</p>

    <p>Mon-Fri, 9am to 5pm CST</p>

    <p><a href="mailto:support@ravpower.com">support@ravpower.com</a></p>

    <p>Visit our <a href="http://www.ravpower.com/support.html">support</a> page for product and return information.</p>

    <ul>
      <li><b>Call us</b></li>
      <li><b>Email us</b></li>
      <li><b>Need to return a product?</b></li>
    </ul>

    <h3>Wholesale Inquiries</h3>

    <p>Please visit our wholesale page or email us at <a href="mailto:wholesale@ravpower.com">wholesale@ravpower.com</a> for more information.</p>

    <h3>Media Inquiries</h3>

    <p>Please contact&nbsp; <a href="mailto:marketing@ravpower.com">marketing@ravpower.com</a></p>

    <h3>Power User Program and Product Review Requests</h3>

    <p>Please contact <a href="mailto:sales@ravpower.com">sales@ravpower.com</a></p>
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

<style lang="less" scoped>
  @media screen and (min-width: 1200px) {
    .contact-container {
      width: 1190px;
    }
  } 
  .contact-container{
    padding-top: 20px;
    padding-bottom: 100px;
    width: 1190px;
    margin: 0 auto;
    margin-top: 60px;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    color: #666;
    line-height: 1.2;
    h2{
      font-size: 30px;
      text-align: center;
    }
    h3{
      font-size: 24px;
    }
    h2, h3{
      font-family: inherit;
      font-weight: 500;
      line-height: 1.1;
      color: inherit; 
    }
  }
</style>