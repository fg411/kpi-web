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
              <div class="group_title_right"><span>{{orderData.p0050101Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="发展理念的践行"
                :msg="principle.PRACTICE_DC"
                :bc="bcs[index]"
                :color="colors[index]"
                :score="resources.practiceDc"
                :max="5">
              </progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon professionalism"></span> 个人职业精神类
              </div>
              <div class="group_title_right"><span>{{orderData.p0050102Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="责任心"
                :msg="principle.P005_DUTY"
                :bc="bcs[index]"
                :color="colors[index]"
                :score="resources.duty"
                :max="5">
              </progress-quota>
              <progress-quota
                title="服务意识"
                :msg="principle.P005_SERVICE"
                :bc="bcs[index]"
                :color="colors[index]"
                :score="resources.service"
                :max="5">
              </progress-quota>
            </div>
          </div>
        </md-swiper-item>

        <md-swiper-item>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon overallSupport"></span> 适用于统筹支持类营销管理类人员
              </div>
              <div class="group_title_right"><span>{{orderData.p0050201Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="支持分行业绩指标"
                :msg="principle.P005_ACT_NM"
                :bc="bcs[index]"
                :color="colors[index]"
                :score="resources.actNm"
                :max="10">
              </progress-quota>
              <progress-quota
                title="服务评价"
                :msg="principle.P005_APPRAISE"
                :bc="bcs[index]"
                :color="colors[index]"
                :score="resources.appraise"
                :max="10">
              </progress-quota>
            </div>
          </div>
        </md-swiper-item>

        <md-swiper-item>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon knowledge"></span> 专业知识类
              </div>
              <div class="group_title_right"><span>{{orderData.p0050301Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="专业资质"
                :msg="principle.P005_PROFESSIONALQUA"
                :bc="bcs[index]"
                :color="colors[index]"
                :score="resources.professionalqua"
                :max="6">
              </progress-quota>
              <progress-quota
                title="统一培训学习情况"
                :msg="principle.P005_LEARNING_UN"
                :bc="bcs[index]"
                :color="colors[index]"
                :score="resources.learningUn"
                :max="4">
              </progress-quota>
              <progress-quota
                title="自主学习情况"
                :msg="principle.P005_LEARNING_SELF"
                :bc="bcs[index]"
                :color="colors[index]"
                :score="resources.learningSelf"
                :max="5">
              </progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon professionalApplication"></span> 专业应用类
              </div>
              <div class="group_title_right"><span>{{orderData.p0050302Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="前台支持"
                :msg="principle.P005_FRONTLINE"
                :bc="bcs[index]"
                :color="colors[index]"
                :score="resources.frontline"
                :max="10">
              </progress-quota>
              <progress-quota
                title="沟通传达"
                :msg="principle.P005_COMMUNICATION"
                :bc="bcs[index]"
                :color="colors[index]"
                :score="resources.communication"
                :max="10">
              </progress-quota>
              <progress-quota
                title="细致认真"
                :msg="principle.P005_CAREFUL"
                :bc="bcs[index]"
                :color="colors[index]"
                :score="resources.careful"
                :max="10">
              </progress-quota>
              <progress-quota
                title="抗压能力"
                :msg="principle.P005_RESIST"
                :bc="bcs[index]"
                :color="colors[index]"
                :score="resources.resist"
                :max="10">
              </progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon sharing"></span> 专业分享类
              </div>
              <div class="group_title_right"><span>{{orderData.p0050303Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="经验分享"
                :msg="principle.P005_EXPERIENCE"
                :bc="bcs[index]"
                :color="colors[index]"
                :score="resources.experience"
                :max="10">
              </progress-quota>
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
