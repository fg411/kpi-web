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
              <div class="group_title_right"><span>{{orderData.p0060101Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="发展理念的践行"
                :msg="principle.P006_PRACTICEDC"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.practiceDc" :max="5"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon professionalism"></span> 个人职业精神类
              </div>
              <div class="group_title_right"><span>{{orderData.p0060102Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="狼性精神"
                :msg="principle.P006_WOLFSPIRIT"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.wolfspirit" :max="5"></progress-quota>
              <progress-quota
                title="以客户为中心"
                :msg="principle.P006_CUSCENTER"
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
              <div class="group_title_right"><span>{{orderData.p0060201Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="经营增加值完成率"
                :msg="principle.P006_EVA"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.eva" :max="10"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon revenueQuality"></span> 创收质量类
              </div>
              <div class="group_title_right"><span>{{orderData.p0060202Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="产品交叉销售率"
                :msg="principle.P006_PRODUCTCOVERAGE"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.productcoverage" :max="8"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon customerManage"></span> 客户管理类
              </div>
              <div class="group_title_right"><span>{{orderData.p0060203Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="新增重点客户"
                :msg="principle.P006_ADCUSNM"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.adcusnm" :max="8"></progress-quota>
              <progress-quota
                title="达标基础客户覆盖率"
                :msg="principle.P006_COVERRATE"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.coverrate" :max="8"></progress-quota>
              <progress-quota
                title="中高端客户定期联络"
                :msg="principle.P006_COMMUNITIMES"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.communitimes" :max="8"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon businessProcessDrive"></span> 业务流程推动类
              </div>
              <div class="group_title_right">
                <span>{{orderData.p0060204Order}}</span>名
              </div>
            </div>
            <div class="group_content">
              <progress-quota
                title="内部流程一次通过率"
                :msg="principle.P006_PASSRATE"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.passrate" :max="3"></progress-quota>
            </div>
          </div>
        </md-swiper-item>
        <md-swiper-item>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon knowledge"></span> 专业知识
              </div>
              <div class="group_title_right"><span>{{orderData.p0060301Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="专业资质"
                :msg="principle.P006_PROFESSIONALQUA"
                :score="resources.professionalqua" :max="6"></progress-quota>
              <progress-quota
                title="统一培训学习情况"
                :msg="principle.P006_LEARNINGUN"
                :score="resources.learningUn" :max="4"></progress-quota>
              <progress-quota
                title="自主学习情况"
                :msg="principle.P006_LEARNINGSELF"
                :score="resources.learningSelf" :max="5"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon professionalApplication"></span> 专业应用
              </div>
              <div class="group_title_right"><span>{{orderData.p0060302Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="营销渗透"
                :msg="principle.P006_MARKETINGCYCLE"
                :score="resources.marketingcycle" :max="5"></progress-quota>
              <progress-quota
                title="沟通维护"
                :msg="principle.P006_COMMUNICATION"
                :score="resources.communication" :max="5"></progress-quota>
              <progress-quota
                title="结构优化"
                :msg="principle.P006_STRUCTURE"
                :score="resources.structure" :max="3"></progress-quota>
              <progress-quota
                title="风险合规管理"
                :msg="principle.P006_RISKMANAG"
                :score="resources.riskmanag" :max="2"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon sharing"></span> 专业分享
              </div>
              <div class="group_title_right"><span>{{orderData.p0060303Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="先进经验分享"
                :msg="principle.P006_EXPERIENCE"
                :score="resources.experience" :max="5"></progress-quota>
              <progress-quota
                title="导师带教"
                :msg="principle.P006_LEARNING_TEACH"
                :score="resources.learningTeach" :max="5"></progress-quota>
            </div>
          </div>
        </md-swiper-item>
      </md-swiper>
    </div>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue';
import {
  Tabs,
  TabPane,
  TabBar,
  Swiper,
  SwiperItem
} from 'mand-mobile';
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
  },
  methods: {
  }
};
</script>
