<template>
  <div class="quota_page">
    <div class="user_info_box">
      <UserInfo></UserInfo>
    </div>
    <md-tabs class="quota_table">
      <md-tab-pane class="content mt" name="p1" label="专业精神">
        <div class="quota_group">
          <div class="group_title pad-lg">
            <div class="group_title_left">集团理念践行类</div>
            <div class="group_title_right"><span>22</span> /150人</div>
          </div>
          <div class="group_content">
            <progress-quota title="发展理念的践行" bc="bc" :color="color"
                            :score="resources.practiceDc" :max="5"></progress-quota>
          </div>
        </div>
        <div class="quota_group">
          <div class="group_title pad-lg">个人职业精神类</div>
          <div class="group_content">
            <progress-quota title="客户导向" :bc="bc" :color="color"
                            :score="resources.cuscenter" :max="5"></progress-quota>
            <progress-quota title="学习进取" :bc="bc" :color="color"
                            :score="resources.study" :max="5"></progress-quota>
          </div>
        </div>
      </md-tab-pane>
      <md-tab-pane class="content" name="p2" label="专业价值">
        <div class="quota_group">
          <div class="group_title pad-lg">产品贡献类</div>
          <div class="group_content">
            <progress-quota title="产品经营收入完成率" :bc="bc" :color="color"
                            :score="resources.prdEv" :max="15"></progress-quota>
            <progress-quota title="产品经营规模完成率" :bc="bc" :color="color"
                            :score="resources.prdScope" :max="15"></progress-quota>
          </div>
        </div>
      </md-tab-pane>
      <md-tab-pane class="content" name="p3" label="专业技能">
        <div class="quota_group">
          <div class="group_title pad-lg">专业知识类</div>
          <div class="group_content">
            <progress-quota title="专业资质"
                            :score="resources.professionalqua" :max="6"></progress-quota>
            <progress-quota title="统一培训学习情况"
                            :score="resources.learningUn" :max="4"></progress-quota>
            <progress-quota title="自主学习情况"
                            :score="resources.learningSelf" :max="5"></progress-quota>
          </div>
        </div>
        <div class="quota_group">
          <div class="group_title pad-lg">产品设计类</div>
          <div class="group_content">
            <progress-quota title="市场敏锐"
                            :score="resources.marketing" :max="10"></progress-quota>
            <progress-quota title="专业设计"
                            :score="resources.professiondes" :max="10"></progress-quota>
            <progress-quota title="优化创新"
                            :score="resources.innovation" :max="10"></progress-quota>
          </div>
        </div>
        <div class="quota_group">
          <div class="group_title pad-lg">专业分享类</div>
          <div class="group_content">
            <progress-quota title="经验分享"
                            :score="resources.experience" :max="10"></progress-quota>
          </div>
        </div>
      </md-tab-pane>
    </md-tabs>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue';
import { Tabs, TabPane } from 'mand-mobile';
import ProgressQuota from '@/components/ProgressQuota.vue';

export default {
  components: {
    UserInfo,
    ProgressQuota,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane
  },
  data() {
    return {
      bcs: ['#E3F1F9', '#E3F1F9', '#E3F1F9'],
      colors: ['#45C9D8', '#45C9D8', '#45C9D8'],
      bc: '#E3F1F9',
      color: '#45C9D8',
      resources: {}
    };
  },
  methods: {
    // queryPerformance() {},
  },
  created() {
    // this.queryPerformance();
  }
};
</script>

<style>
.quota_page{
  background-color: transparent;
}
.user_info_box{
  padding: 0.3rem;
  color: white;
}

.quota_table{
  height: calc(100vh - 2.2rem);
  background-color: #FEFEFE;
}

.md-tabs-content{
  height: calc(100% - 1rem);
  background-color: #e3e3e3;
}

.quota_group{
  background-color: #FFF
}

.group_title{
  border-bottom: solid 1px #e3e3e3;
  display: flex;
}
.group_title_left{
  flex-grow: 2;
}
.group_title_right{
  color: #D9D9D9;
}
.group_title_right span {
  font-size: .33rem;
  color: #45C9D8;
}
.group_content{
  padding: 0.1rem 0.3rem;
}
.md-tab-pane{
  height: 100%;
  overflow: auto;
}
</style>
