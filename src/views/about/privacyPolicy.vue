<template>
  <div class="box-privacy-policy">
    <div class="privacy-policy-title-wrapper">
      <div class="privacy-policy-title">
        <div class="privacy-policy-title-inner">
          <h2>Privacy Policy</h2>
          <p>Miroco Privacy Policy covers how we collect, use, disclose, transfer, and store your information. Please learn our privacy practices and let us know if you have any questions.</p>
        </div>
      </div>
    </div>
    <div class="privacy-policy-content">
      <div class="policy-content-inner">
        <div class="policy-content">
          <collapse
          :collapseData=collapseData
          ></collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import collapse from 'components/collapse.vue'
  export default {
    data() {
      return {
        collapseData: [{
          title: 'What Information Do We Collect',
          content: '<p>We collect information from you when you register on our site, place an order or subscribe to our newsletter. </p><p>When ordering or registering on our site, as appropriate, you may be asked to enter your: name, e-mail address, mailing address or phone number. You may, however, visit our site anonymously.</p>'
        },{
          title: 'What Do We Use Your Information For',
          content: "<p>Any of the information we collect from you may be used in one of the following ways:</p><p>To personalize your experience:</p><p>(your information helps us to better respond to your individual needs)</p><strong>To process transactions:</strong><p>Your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason whatsoever, without your consent, other than for the express purpose of delivering the purchased product or service requested.</p><strong>To send periodic emails:</strong><p>The email address you provide for order processing may be used to send you information and updates pertaining to your order. In addition to receiving occasional company news, updates, related product or service information, etc.</p><p><strong>Note:</strong> If at any time you would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email.</p>"
        },{
          title: 'How do we protect your information?',
          content: '<p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.</p><p>We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database only to be accessible by those authorized with special access rights to such systems, and are required to keep the information confidential.</p><p>After a transaction, your private information (credit cards, social security numbers, financials, etc.) will not be stored on our servers.</p>'
        },{
          title: 'Do we use cookies?',
          content: '<p>Cookies are small files that a site or its service provider transfers to your computer’s hard drive through your Web browser (if you allow) that enables the sites or service providers systems to recognize your browser and capture and remember certain information We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits, keep track of advertisements and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p>'
        },{
          title: 'Do we disclose any information to outside parties?',
          content: '<p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights, property, or safety. However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.</p>'
        },{
          title: 'California Online Privacy Protection Act Compliance',
          content: '<p>Because we value your privacy we have taken the necessary precautions to be in compliance with the California Online Privacy Protection Act. We therefore will not distribute your personal information to outside parties without your consent. As part of the California Online Privacy Protection Act, all users of our site may make any changes to their information at anytime by logging into their control panel and going to the "Edit Profile" page.</p>'
        },{
          title: 'Childrens Online Privacy Protection Act Compliance',
          content: '<p>We are in compliance with the requirements of COPPA (Children’s Online Privacy Protection Act). We do not collect any information from anyone under 13 years of age. Our website, products and services are all directed to people who are at least 13 years old or older.</p>'
        },{
          title: 'Online Privacy Policy Only',
          content: '<p>This online privacy policy applies only to information collected through our website and not to information collected offline.</p> '
        },{
          title: 'Terms and Conditions',
          content: '<p>Please also visit our Terms and Conditions section establishing the use, disclaimers, and limitations of liability governing the use of our website at <a href="https://www.mirocohome.com/">www.mirocohome.com</a></p>'
        },{
          title: 'Your Consent',
          content: '<p>By using our site, you consent to our web site privacy policy.</p>'
        },{
          title: 'Changes to our Privacy Policy',
          content: '<p>If we decide to change our privacy policy, we will update the Privacy Policy modification date below.</p>'
        },{
          title: 'Contacting Us',
          content: '<p>If there are any questions regarding this privacy policy you may contact us using the information below.</p><p><a class="text-blue" href="mailto:support@mirocohome.com">support@mirocohome.com</a></p><p><a class="text-blue" href="mailto:support@mirocohome.com" style="font-size: 15px;">support@mirocohome.com</a></p> '
        }]
      }
    },
    components: {
      'collapse': collapse
    }
  }
</script>

<style lang="less" scoped>
  .box-privacy-policy {
    font-family: MuseoSans-300;
    .privacy-policy-title {
      display: table;
      margin: 0 auto;
      .privacy-policy-title-inner {
        width: 880px;
        height: 400px;
        display: inline-block;
        vertical-align: middle;
        text-align: left;
        display: table-cell;
        h2 {
          font-size: 36px;
          color: #000000;
          line-height: 38px;
          margin-bottom: 15px;
          font-family: MuseoSans-700;
        }
        p {
          font-size: 18px;
          color: #000000;
          line-height: 27px;
        }
      }
    }
    .privacy-policy-content{
      background-color: #FAFAFA;
      .policy-content-inner {
        width: 880px;
        margin: 0 auto;
        padding: 75px 0 175px 0;
      }
    }
  }
</style>
<style lang="scss">
.privacy-policy-content{
  .policy-content{
    .el-collapse-item__content{
      a{
        font-size: 16px;
        color: #00416f;
      }
    }
  }
  }
</style>
