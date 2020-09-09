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
              <div class="group_title_right"><span>{{orderData.p0020101Order || 0}}</span>名</div>
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
              <div class="group_title_right"><span>{{orderData.p0020102Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="客户导向"
                :msg="principle.P002_CUSCENTER"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.cuscenter" :max="5"></progress-quota>
              <progress-quota
                title="学习进取"
                :msg="principle.P002_STUDY"
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
              <div class="group_title_right"><span>{{orderData.p0020201Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="重点产品覆盖率、完成率"
                :msg="principle.P002_PRDSUCCESS"
                :bc="bcs[index]" :color="colors[index]"
                :score="parseFloat(resources.prdSuccess)
                + parseFloat(resources.prdScope)
                + parseFloat(resources.prdCusnum)
                + parseFloat(resources.prdEvMj)"
                :max="30"></progress-quota>
              <!--<progress-quota-->
                <!--title="产品成功上报项目数（针对企金产品经理）"-->
                <!--:msg="principle.P002_PRDSUCCESS"-->
                <!--:bc="bcs[index]" :color="colors[index]"-->
                <!--:score="resources.prdSuccess" :max="10"></progress-quota>-->
              <!--<progress-quota-->
                <!--title="产品业务规模完成率（针对企金产品经理）"-->
                <!--:msg="principle.P002_PRDSCOPE"-->
                <!--:bc="bcs[index]" :color="colors[index]"-->
                <!--:score="resources.prdScope" :max="10"></progress-quota>-->
              <!--<progress-quota-->
                <!--title="产品客户数净增（针对企金产品经理）"-->
                <!--:msg="principle.P002_PRDCUSNUM"-->
                <!--:bc="bcs[index]" :color="colors[index]"-->
                <!--:score="resources.prdCusnum" :max="10"></progress-quota>-->
              <!--<progress-quota-->
                <!--title="贸易金融业务完成率（针对贸金产品经理）"-->
                <!--:msg="principle.P002_PRDEVMJ"-->
                <!--:bc="bcs[index]" :color="colors[index]"-->
                <!--:score="resources.prdEvMj" :max="30"></progress-quota>-->
            </div>
          </div>
        </md-swiper-item>

        <md-swiper-item>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon knowledge"></span> 专业知识类
              </div>
              <div class="group_title_right"><span>{{orderData.p0020301Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="专业资质"
                :msg="principle.P002_PROFESSIONALQUA"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.professionalqua"
                :max="6">
              </progress-quota>
              <progress-quota
                title="统一培训学习情况"
                :msg="principle.P002_LEARNING_UN"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.learningUn"
                :max="4">
              </progress-quota>
              <progress-quota
                title="自主学习情况"
                :msg="principle.P002_LEARNING_SELF"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.learningSelf"
                :max="5">
              </progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon professionalApplication"></span> 专业应用类（产品设计类）
              </div>
              <div class="group_title_right"><span>{{orderData.p0020302Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="市场敏锐"
                :msg="principle.P002_MARKETING"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.market"
                :max="10">
              </progress-quota>
              <progress-quota
                title="专业设计"
                :msg="principle.P002_PROFESSIONDES"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.professiodes"
                :max="10">
              </progress-quota>
              <progress-quota
                title="优化创新"
                :msg="principle.P002_INNOVATION"
                :bc="bcs[index]" :color="colors[index]"
                :score="resources.innovation"
                :max="10">
              </progress-quota>
            </div>
          </div>
          <div class="quota_group">
            <div class="group_title">
              <div class="group_title_left">
                <span class="icon sharing"></span> 专业分享类
              </div>
              <div class="group_title_right"><span>{{orderData.p0020303Order || 0}}</span>名</div>
            </div>
            <div class="group_content">
              <progress-quota
                title="经验分享"
                :msg="principle.P002_EXPERIENCE"
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
