<template>
  <div class="box-sales-policy">
    <div class="sales-policy-title-wrapper">
      <div class="sales-policy-title">
        <div class="sales-policy-title-inner">
          <h2>After-Sales Policy</h2>
          <p>The policy below applies to products purchased directly from Miroco or Miroco’s authorized resellers. Please keep your original proof of purchase in order to exercise these policies.</p>
        </div>
      </div>
    </div>
    <div class="sales-policy-content">
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
          title: 'RMA instructions',
          content: "<strong>Authorized Returns:</strong><p class='instructions-p-one'>Most returns must be authorized by contacting the seller in order to obtain an official Return Merchandise Authorization (RMA). Authorization does not guarantee credit or exchange. We will issue an exchange or credit upon receipt of the return package.</p><p class='instructions-p-two'>All returned products must be in resalable condition, including, but not limited to; all components, manuals, registration cards, and original undamaged packaging. In addition, the following restrictions normally apply:</p><ul class='list-disc'><li>Credit cannot be issued for any AC Adapter or Battery that is missing any components or was modified by the user.</li><li>Some returned parts may incur a restocking fee.</li><li>Only ship back the Miroco parts that you purchased from our authorized resellers. We cannot guarantee that any other materials will be returned to you if/when we ship you an exchange.</li></ul><strong>Unauthorized Returns:</strong><p>An unauthorized return is defined as any package returned to Miroco without the proper return authorization code on the shipping label.<br> Unauthorized returns may include packages refused during a delivery attempt. Unauthorized returns received by Miroco may be refused at the warehouse and returned to the sender. In this case, you may be held responsible for the cost of shipping back the package. This cost will be deducted from the total credit due or a charge to the credit card or PayPal account, if a refund has already been issued.</p><strong>Process for Returning Merchandise</strong><ul><li><strong>1. Obtain a Return Merchandise Authorization (RMA) Number:</strong></li><li>All returns must have an RMA number for processing. Contact your reseller or email Miroco for assistance. RMA's are validfor thirty (30) days from the date of issue.</li><li><strong>2. Write the RMA number on the shipping label on the outside of the package.</strong></li><li>RMA numbers should be clearly displayed on the return shipping label of any package being returned to Miroco. Do not write the RMA number on the actual box. Packages without an RMA number on the return shipping label may not be accepted by our warehouse.</li><li><strong>3. Repack in original packaging</strong></li><li>All contents in the original package must be received, including, but not limited to; all components, manuals, and registration cards. Place the packaged product in a protective outer box. We must receive all original products in order to process your return or exchange. Miroco is not responsible for products that are damaged due to poor packaging, defaced packaging, or lost shipments.</li></ul>"
        },{
          title: 'Miroco Warranty Coverage',
          content: '<p>During the product’s warranty period, if the original manufacture of the material or workmanship of the product is deemed to be defective, Miroco will (at its sole option) replace the product at no charge with the same or comparable product. Products and parts replaced under this warranty become the property of Miroco and are not returned to you. If products and/or parts service are required after the warranty period expires, you must pay all labor and parts charges. Warranty coverage terminates if you sell or otherwise transfer the product. What does the Miroco Warranty not cover?</p><strong>This warranty does not cover:</strong><ul><li>Improper Use or Installation</li><li>Cosmetic damage</li><li>Damage due to acts of nature or God. For example; lightning strikes, tornadoes and the like</li><li>Accidents</li><li>Misuse</li><li>Abuse</li><li>Negligence</li><li>Commercial use</li> <li>Modifications to any part of the Product, including the antenna</li></ul> <strong>This warranty also does not cover:</strong><ul> <li>Connection to an incorrect voltage supply</li> <li>Attempted repair by anyone other than an authorized facility</li> </ul> <p>Miroco shall not be liable for any incidental or consequential damages for the breach of any express or implied warranty on this product, including, but not limited to; lost data, loss of use of your product, lost business or lost profits. Miroco makes no other express warranties with respect to the product, all express and implied warranties for the product, including, but not limited to; any implied warranties of and conditions of merchantability and fitness for a particular purpose, are limited in duration to the warranty period set forth above and no warranties, whether express or implied, will apply after the warranty period. Some states, provinces and jurisdictions do not allow limitations on how long an implied warranty lasts, so the above limitation may not apply to you. This warranty gives you specific legal rights, and you may also have other rights, which vary from state to state or province to province.</p> '
        },{
          title: 'Contact Miroco',
          content: ' <p>For customer service please contact: <a class="text-blue" href="mailto:support@mirocohome.com" style="    font-size: 15px;">support@mirocohome.com</a></p> <p>Miroco is a registered trademark in some countries. All other products and brand names are trademarks of their respective owners</p>'
        },{
          title: 'Support',
          content: '<p>At mirocohome.com, we strive to provide the best customer service and support for our customers! We make regular improvements to our site in hopes of providing you with the best and most efficient online shopping experience possible. If you have any inquiries, questions, or concerns about our products or services, please feel free to contact us. Moreover, we always appreciate suggestions for update and improvement from you as this is a gauge to measure our success.</p>'
        }]
      }
    },
    components: {
      'collapse': collapse
    }
  }
</script>

<style lang="less" scoped>
  .box-sales-policy {
    font-family: MuseoSans-300;
    .sales-policy-title {
      display: table;
      margin: 0 auto;
      .sales-policy-title-inner {
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
    .sales-policy-content{
      background-color: #FAFAFA;
      .policy-content-inner {
        width: 880px;
        margin: 0 auto;
        padding: 75px 0 175px 0;
        .instructions-p-one {
          margin-top: 15px;
        }
        .instructions-p-two{
          margin-top: 20px;
          margin-bottom: 15px;
        }
        .list-disc {
          -webkit-padding-start: 20px;
          padding-bottom: 30px;
          li {
            list-style-type: disc;
          }
        }
      }
    }
  }
</style>

<style lang="less">
  .el-collapse-item__content strong {
    font-family: MuseoSans-700;
  }
</style>