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
              <div class="group_title_right"><span>{{orderData.p0040101Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="发展理念的践行"
                :msg="principle.PRACTICE_DC"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.practiceDc" :max="5"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon professionalism"></span> 个人职业精神类
              </div>
              <div class="group_title_right"><span>{{orderData.p0040102Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="责任心"
                :msg="principle.P004_DUTY"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.duty" :max="5"></progress-quota>
              <progress-quota
                title="服务意识"
                :msg="principle.P004_SERVICE"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.service" :max="5"></progress-quota>
            </div>
          </div>
        </md-swiper-item>

        <md-swiper-item>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon zhanyeSupport"></span> 适用于展业支持类营销管理类人员
              </div>
              <div class="group_title_right"><span>{{orderData.p0040201Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="营销活动数量"
                :msg="principle.P004_ACT_NM"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.actNm" :max="10"></progress-quota>
              <progress-quota
                title="营销互动参与客户数"
                :msg="principle.P004_ACT_CUS_NM"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.actCusnm" :max="10"></progress-quota>
              <progress-quota
                title="支持分行业绩指标"
                :msg="principle.P004_SUPPORT"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.support" :max="10"></progress-quota>
            </div>
          </div>
        </md-swiper-item>

        <md-swiper-item>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon knowledge"></span> 专业知识类
              </div>
              <div class="group_title_right"><span>{{orderData.p0040301Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="专业资质"
                :msg="principle.P004_PROFESSIONALQUA"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.professionalqua" :max="6"></progress-quota>
              <progress-quota
                title="统一培训学习情况"
                :msg="principle.P004_LEARNING_UN"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.learningUn" :max="4"></progress-quota>
              <progress-quota
                title="自主学习情况"
                :msg="principle.P004_LEARNING_SELF"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.learningSelf" :max="5"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon professionalApplication"></span> 专业应用类
              </div>
              <div class="group_title_right"><span>{{orderData.p0040302Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="营销宣传"
                :msg="principle.P004_MARKETING"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.marketing" :max="7.5"></progress-quota>
              <progress-quota
                title="沟通传达"
                :msg="principle.P004_COMMUNICATION"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.communication" :max="7.5"></progress-quota>
              <progress-quota
                title="团队协作"
                :msg="principle.P004_TEAMWORK"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.teamwork" :max="7.5"></progress-quota>
              <progress-quota
                title="分析能力"
                :msg="principle.P004_ANALYSE"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.analyse" :max="7.5"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon sharing"></span> 专业分享类
              </div>
              <div class="group_title_right"><span>{{orderData.p0040303Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="经验分享"
                :msg="principle.P004_EXPERIENCE"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.experience" :max="10"></progress-quota>
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
