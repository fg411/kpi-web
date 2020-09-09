<template>
  <div class="quota_page">
    <div class="quota_head">
      <UserInfo></UserInfo>
      <md-tab-bar class="tab" v-model="index" :items="items"
                  @change="onTabChange"></md-tab-bar>
    </div>
    <div class="blank_box"></div>
    <div class="quota_content">
      <md-swiper
        ref="swiper"
        :autoplay="0"
        :is-prevent="false"
        :is-loop="false"
        :has-dots="false"
        @before-change="onSwiperChange"
      >
        <md-swiper-item>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon idea_practice"></span> 集团理念践行类
              </div>
              <div class="group_title_right"><span>{{orderData.p0010101Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="发展理念的践行"
                :msg="principle.P001_PRACTICEDC"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.practiceDc" :max="5"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon professionalism"></span>个人职业精神类
              </div>
              <div class="group_title_right"><span>{{orderData.p0010102Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="狼性精神"
                :msg="principle.P001_WOLFSPIRIT"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.wolfspirit" :max="5"></progress-quota>
              <progress-quota
                title="以客户为中心"
                :msg="principle.P001_CUSCENTER"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.cuscenter" :max="5"></progress-quota>
            </div>
          </div>
        </md-swiper-item>
        <md-swiper-item>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon performanceAchieved"></span> 业绩实现类
              </div>
              <div class="group_title_right"><span>{{orderData.p0010201Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="经营业绩完成率"
                :msg="principle.P001_EVA"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.eva" :max="10"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon productPromotion"></span> 产品推动类
              </div>
              <div class="group_title_right"><span>{{orderData.p0010202Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="重点产品覆盖率、完成率"
                :msg="principle.P001_PRODUCTCOVERAGE"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.productcoverage" :max="12"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon customerManage"></span> 客户管理类
              </div>
              <div class="group_title_right"><span>{{orderData.p0010203Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="IPAD访客次数记录"
                :msg="principle.P001_VISINUM"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.visinum" :max="7"></progress-quota>
              <progress-quota
                title="管户数与来源结构"
                :msg="principle.P001_CUSNUM"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.cusnum" :max="13"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon businessProcessDrive"></span> 业务流程推动类
              </div>
              <div class="group_title_right"><span>{{orderData.p0010204Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="内部流程一次通过率"
                :msg="principle.P001_PASSOFONE"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.passofone" :max="3"></progress-quota>
            </div>
          </div>
        </md-swiper-item>
        <md-swiper-item>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon knowledge"></span> 专业知识类
              </div>
              <div class="group_title_right"><span>{{orderData.p0010301Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="专业资质"
                :msg="principle.P001_PROFESSIONALQUA"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.professionalqua" :max="6"></progress-quota>
              <progress-quota
                title="统一培训学习情况"
                :msg="principle.P001_LEARNING_UN"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.learningUn" :max="4"></progress-quota>
              <progress-quota
                title="自主学习情况"
                :msg="principle.P001_LEARNING_SELF"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.learningSelf" :max="5"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon professionalApplication"></span> 专业应用类
              </div>
              <div class="group_title_right"><span>{{orderData.p0010302Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="营销周期管理"
                :msg="principle.P001_MARKETINGCYCLE"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.marketingcycle" :max="5"></progress-quota>
              <progress-quota
                title="风险合规管理"
                :msg="principle.P001_RISKMANAG"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.riskmanag" :max="5"></progress-quota>
              <progress-quota
                title="沟通协调"
                :msg="principle.P001_COMMUNICATION"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.communication" :max="5"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon sharing"></span> 专业分享类
              </div>
              <div class="group_title_right"><span>{{orderData.p0010303Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="经验分享"
                :msg="principle.P001_EXPERIENCE"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.experience" :max="5"></progress-quota>
              <progress-quota
                title="导师带教"
                :msg="principle.P001_LEARNING_TEACH"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.learningTeach" :max="5"></progress-quota>
            </div>
          </div>
        </md-swiper-item>
      </md-swiper>
    </div>
  </div>
</template>

<script>
import {
  Tabs,
  TabPane,
  TabBar,
  Swiper,
  SwiperItem
} from 'mand-mobile';
import UserInfo from '@/components/UserInfo.vue';
import ProgressQuota from '@/components/ProgressQuota.vue';
import Mymixin from './mixin';
import '@/assets/css/quota.styl';

export default {
  mixins: [Mymixin],
  components: {
    UserInfo,
    ProgressQuota,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [TabBar.name]: TabBar,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem
  },
  data() {
    return {};
  }
};
</script>
