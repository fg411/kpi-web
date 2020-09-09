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
              <div class="group_title_right"><span>{{orderData.p0080101Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="发展理念的践行"
                :msg="principle.P008_PRACTICEDC"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.practiceDc" :max="5"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon professionalism"></span> 个人职业精神类
              </div>
              <div class="group_title_right"><span>{{orderData.p0080102Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="责任心"
                :msg="principle.P008_DUTY"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.duty" :max="5"></progress-quota>
              <progress-quota
                title="服务意识"
                :msg="principle.P008_SERVICE"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.service" :max="5"></progress-quota>
            </div>
          </div>
        </md-swiper-item>
        <md-swiper-item>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon marketingManage"></span> 支持类营销管理
              </div>
              <div class="group_title_right"><span>{{orderData.p0080201Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="支持客户经理业绩指标"
                :msg="principle.P008_SUPPORT"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.support" :max="10"></progress-quota>
              <progress-quota
                title="营销拓客策划服务评价"
                :msg="principle.P008_APPRAISE"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.appraise" :max="10"></progress-quota>
            </div>
          </div>
        </md-swiper-item>
        <md-swiper-item>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon knowledge"></span> 专业知识类
              </div>
              <div class="group_title_right"><span>{{orderData.p0080301Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="专业资质"
                :msg="principle.P008_PROFESSIONALQUA"
                :score="resources.professionalqua" :max="6"></progress-quota>
              <progress-quota
                title="统一培训学习情况"
                :msg="principle.P008_LEARNING_UN"
                :score="resources.learningUn" :max="4"></progress-quota>
              <progress-quota
                title="自主学习情况"
                :msg="principle.P008_LEARNING_SELF"
                :score="resources.learningSelf" :max="5"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon zhanyeSupport"></span> 适用于展业支持类营销管理类人员
              </div>
              <div class="group_title_right"><span>{{orderData.p0080302Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="营销宣传"
                :msg="principle.P008_MARKETING"
                :score="resources.marketing" :max="10"></progress-quota>
              <progress-quota
                title="沟通传达"
                :msg="principle.P008_COMMUNICATION"
                :score="resources.communication" :max="10"></progress-quota>
              <progress-quota
                title="团队协作"
                :msg="principle.P008_TEAMWORK"
                :score="resources.teamwork" :max="10"></progress-quota>
              <progress-quota
                title="抗压能力"
                :msg="principle.P008_ANALYSE"
                :score="resources.analyse" :max="10"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon sharing"></span> 专业分享类
              </div>
              <div class="group_title_right"><span>{{orderData.p0080303Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="经验分享"
                :msg="principle.P008_EXPERIENCE"
                :score="resources.experience" :max="10"></progress-quota>
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
  methods: {}
};
</script>
