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
              <div class="group_title_right"><span>{{orderData.p0070101Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="发展理念的践行"
                :msg="principle.P007_PRACTICEDC"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.practiceDc" :max="5"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon professionalism"></span>个人职业精神类
              </div>
              <div class="group_title_right"><span>{{orderData.p0070102Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="客户导向"
                :msg="principle.P007_CUSCENTER"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.cuscenter" :max="5"></progress-quota>
              <progress-quota
                title="学习进取"
                :msg="principle.P007_STUDY"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.study" :max="5"></progress-quota>
            </div>
          </div>
        </md-swiper-item>
        <md-swiper-item>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon productContribution"></span> 产品贡献类
              </div>
              <div class="group_title_right"><span>{{orderData.p0070201Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="产品经营收入完成率"
                :msg="principle.P007_PRDEV"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.prdEv" :max="15"></progress-quota>
              <progress-quota
                title="产品经营规模完成率"
                :msg="principle.P007_PRDSCOPE"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.prdScope" :max="15"></progress-quota>
            </div>
          </div>
        </md-swiper-item>
        <md-swiper-item>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon knowledge"></span> 专业知识类
              </div>
              <div class="group_title_right"><span>{{orderData.p0070301Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="专业资质"
                :msg="principle.P007_PROFESSIONALQUA"
                :score="resources.professionalqua" :max="6"></progress-quota>
              <progress-quota
                title="统一培训学习情况"
                :msg="principle.P007_LEARNINGUN"
                :score="resources.learningUn" :max="4"></progress-quota>
              <progress-quota
                title="自主学习情况"
                :msg="principle.P007_LEARNINGSELF"
                :score="resources.learningSelf" :max="5"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon productDesign"></span> 产品设计类
              </div>
              <div class="group_title_right"><span>{{orderData.p0070302Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="市场敏锐"
                :msg="principle.P007_MARKETING"
                :score="resources.marketing" :max="10"></progress-quota>
              <progress-quota
                title="专业设计"
                :msg="principle.P007_PROFESSIONDES"
                :score="resources.professiondes" :max="10"></progress-quota>
              <progress-quota
                title="优化创新"
                :msg="principle.P007_INNOVATION"
                :score="resources.innovation" :max="10"></progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon sharing"></span> 专业分享类
              </div>
              <div class="group_title_right"><span>{{orderData.p0070303Order}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="经验分享"
                :msg="principle.P007_EXPERIENCE"
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
  components: {
    UserInfo,
    ProgressQuota,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [TabBar.name]: TabBar,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem
  },
  mixins: [Mymixin],
  data() {
    return {
    };
  },
  methods: {}
};
</script>
