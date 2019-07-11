<template>
  <div class="box-terms-condition">
    <div class="terms-condition-title-wrapper">
      <div class="terms-condition-title">
        <div class="terms-condition-title-inner">
          <h2>Term Condition-Sales Policy</h2>
          <p>Miroco legal information and notices</p>
        </div>
      </div>
    </div>
    <div class="terms-condition-content">
      <div class="condition-content-inner">
        <div class="condition-content">
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
          title: 'Introduction',
          content: "<p>These terms and conditions govern your use of this website. By using this website, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use this website.</p><p>This website uses cookies. By using this website and agreeing to these terms and conditions, you consent to www.mirocohome.com's use of cookies in accordance with the terms of www.mirocohome.com's privacy policy / cookies policy.</p><p>Unless otherwise stated, www.mirocohome.com and/or its licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved.</p><p>You may view, download for caching purposes only, print pages, user manuals, or other product information from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.</p>"
        },{
          title: 'Acceptable use',
          content: "<p>You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website, or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.</p><p>You must not use this website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software.</p><p>You must not conduct any systematic or automated data collection activities (including without limitation scraping, data mining, data extraction and data harvesting) on or in relation to this website without www.mirocohome.com's express written consent.</p><p>You must not use this website to transmit or send unsolicited commercial communications.</p><p>You must not use this website for any purposes related to marketing without www.mirocohome.com's express written consent.</p>"
        },{
          title: 'No warranties',
          content: '<p>This website is provided "as is" without any representations or warranties, express or implied. www.mirocohome.com makes no representations or warranties in relation to this website or the information and materials provided on this website.</p><p>Without prejudice to the generality of the foregoing paragraph, www.mirocohome.com does not warrant that:</p><ul><li>This website will be constantly available, or available at all, or</li><li>The information on this website is complete, true, accurate or non-misleading.</li><li>Nothing on this website constitutes, or is meant to constitute, advice of any kind. If you require advice in relation to any legal, financial or medical matter you should consult an appropriate professional.</li></ul>'
        },{
          title: 'Limitations of liability',
          content: '<p>www.mirocohome.com will not be liable to you (whether under the law of contact, the law of torts or otherwise) in relation to the contents of, or use of, or otherwise in connection with, this website:</p><strong>To the extent that the website is provided free-of-charge, for any direct loss:</strong><ul><li>For any indirect, special or consequential loss, or</li><li>For any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data. These limitations of liability apply even if www.mirocohome.com has been expressly advised of the potential loss.</li></ul>'
        },{
          title: 'Exceptions',
          content: "<p>Nothing in this website disclaimer will exclude or limit any warranty implied by law that it would be unlawful to exclude or limit; and nothing in this website disclaimer will exclude or limit www.mirocohome.com's liability in respect of any:</p><strong>Death or personal injury caused by www.mirocohome.com's negligence:</strong><ul><li>Fraud or fraudulent misrepresentation on the part of www.mirocohome.com, or</li><li>Matter which it would be illegal or unlawful for www.mirocohome.com to exclude or limit, or to attempt or purport to exclude or limit its liability.</li></ul>"
        },{
          title: 'Reasonableness',
          content: '<p>By using this website, you agree that the exclusions and limitations of liability set out in this website disclaimer are reasonable.</p><p>If you do not think they are reasonable, you must not use this website.</p>'
        },{
          title: 'Other parties',
          content: "<p>You accept that, as a limited liability entity, www.mirocohome.com has an interest in limiting the personal liability of its officers and employees. You agree that you will not bring any claim personally against www.mirocohome.com's officers or employees in respect of any losses you suffer in connection with the website.</p><p>Without prejudice to the foregoing paragraph, you agree that the limitations of warranties and liability set out in this website disclaimer will protect www.mirocohome.com's officers, employees, agents, subsidiaries, successors, assigns and sub-contractors as well as www.mirocohome.com.</p>"
        },{
          title: 'Unenforceable provisions',
          content: '<p>If any provision of this website disclaimer is, or is found to be, unenforceable under applicable law, that will not affect the enforceability of the other provisions of this website disclaimer.</p>'
        },{
          title: 'Indemnity',
          content: "<p>You hereby indemnify www.mirocohome.com and undertake to keep www.mirocohome.com indemnified against any losses, damages, costs, liabilities and expenses (including without limitation; legal expenses and any amounts paid by www.mirocohome.com to a third party in settlement of a claim or dispute on the advice of www.mirocohome.com's legal advisers) incurred or suffered by www.mirocohome.com arising out of any breach by you of any provision of these terms and conditions, or arising out of any claim that you have breached any provision of these terms and conditions.</p>"
        },{
          title: 'Breaches of these terms and conditions',
          content: "<p>Without prejudice to www.mirocohome.com's other rights under these terms and conditions, if you breach these terms and conditions in any way, www.mirocohome.com may take such action as www.mirocohome.com deems appropriate to deal with the breach, including suspending your access to the website, prohibiting you from accessing the website, blocking computers using your IP address from accessing the website, contacting your internet service provider to request that they block your access to the website and/or bringing court proceedings against you</p>"
        },{
          title: 'Variation',
          content: '<p>www.mirocohome.com may revise these terms and conditions from time-to-time. Revised terms and conditions will apply to the use of this website from the date of the publication of the revised terms and conditions on this website. Please check this page regularly to ensure you are familiar with the current version.</p>'
        },{
          title: 'Assignment',
          content: "<p>www.mirocohome.com may transfer, sub-contract or otherwise deal with www.mirocohome.com's rights and/or obligations under these terms and conditions without notifying you or obtaining your consent. You may not transfer, sub-contract or otherwise deal with your rights and/or obligations under these terms and conditions.</p>"
        },{
          title: 'Severability',
          content: '<p>If a provision of these terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable, the other provisions will continue in effect. If any unlawful and/or unenforceable provision would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect.</p>'
        },{
          title: 'Entire agreement',
          content: "<p>These terms and conditions, together with www.mirocohome.com's Privacy Policy, constitute the entire agreement between you and www.mirocohome.com in relation to your use of this website, and supersede all previous agreements in respect of your use of this website.</p>"
        },{
          title: 'Law and jurisdiction',
          content: '<p>These terms and conditions will be governed by and construed in accordance with US law, and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of California.</p>'
        }]
      }
    },
    components: {
      'collapse': collapse
    }
  }
</script>

<style lang="less" scoped>
  .box-terms-condition {
    font-family: MuseoSans-300;
    .terms-condition-title {
      display: table;
      margin: 0 auto;
      .terms-condition-title-inner {
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
    .terms-condition-content{
      background-color: #FAFAFA;
      .condition-content-inner {
        width: 880px;
        margin: 0 auto;
        padding: 75px 0 175px 0;
      }
    }
  }
</style>

<style lang="less">
  .collapse .el-collapse-item__header {
      font-family: MuseoSans-700;
    }
</style>

