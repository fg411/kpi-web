<template>
  <div class="mine_page">
    <div class="mine_userInfo">
      <user-info class="user_info_box" :dead-line="endTime"></user-info>
      <span v-if="!this.$store.state.isManager" class="qa" @click="qa"></span>
    </div>
    <div class="blank_box"></div>
    <div class="user_indicators_box">
      <div class="ability_assess_box card">
        <div class="ability_assess_title">
          <span class="icon ability"></span> <a>专业能力评价</a>
        </div>
        <div class="ability_assess_detail">
          <div id="canvas" class="ability_assess_chart">
            <md-result-page v-if="isNoData" text="暂无绩效数据"></md-result-page>
          </div>
          <div class="ability_assess_items">
            <div class="ability_assess_item" v-for="(item, index) in list" :key="index">
              <md-progress class="item_progress" :size="85"
                           :value="item.score/item.max || 0"
                           :width="10"
                           :rotate="-90"
                           :border-color="bgColors[index]"
                           :color="colors[index]"
                           linecap="butt">
                <span>
                    <md-amount transition
                    :value="item.score"
                    :precision="1"
                  ></md-amount>分
                </span>

              </md-progress>
              <div class="item_name">{{items[index]}}({{item.max}}%)</div>
            </div>
          </div>
        </div>
      </div>
      <div class="rank_box card mt">
        <div class="rank_title">
          <span class="icon rank"></span> <a>排名</a>
        </div>
        <div class="rank_info">
          <progress-rank title="总评分" text="排名" bold="bold" :max="count" :score="order"
                         bc="#E3F1F9" color="#459ED8"></progress-rank>
          <progress-rank v-for="(item, index) in rankList" :key="index"
                         :title="items[index]" :max="count" :score="item"
                         :bc="bgColors[index]"
                         :color="colors[index]"></progress-rank>
        </div>
      </div>

      <div class="quota_box">
        <md-field>
          <md-cell-item @click="goDetail" title="细项指标查询" arrow />
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ActivityIndicator,
  Amount,
  Field,
  CellItem,
  Progress,
  Icon,
  ResultPage
} from 'mand-mobile';
import { mapActions } from 'vuex';
import ProgressRank from '@/components/ProgressRank.vue';
import UserInfo from '@/components/UserInfo.vue';
import Echart from 'echarts';
import { apiRequest, queryIndex } from '@/libs/api';

export default {
  components: {
    ProgressRank,
    UserInfo,
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Progress.name]: Progress,
    [Amount.name]: Amount,
    [Icon.name]: Icon,
    [ActivityIndicator.name]: ActivityIndicator,
    [ResultPage.name]: ResultPage
  },
  data() {
    return {
      userInfo: this.$store.state.isManager
        ? this.$store.state.employeeInfo : this.$store.state.userInfo,
      value: 0,
      count: 1,
      order: '',
      list: [],
      items: ['专业精神', '专业价值', '专业技能'],
      bgColors: ['#FDEFE3', '#EEF6E4', '#E3F7F9'],
      colors: ['#F19546', '#8BC34A', '#00BCD4', '#F4F4F4'],
      canvasColor: [],
      rankList: ['', '', ''],
      endTime: '',
      isNoData: false
    };
  },
  methods: {
    ...mapActions(['saveDeadLine', 'saveEmpDeadLine']),
    goDetail() {
      if (!this.userInfo.positionId) {
        return false;
      }
      const urls = {
        P001: 'ComCm', // 企金客户经理分行
        P002: 'ComGlobPm', // 企金总行产品经理
        P003: 'ComPm', // 企金分行产品经理
        P004: 'ComDeSell', // 展业支持营销管理岗
        P005: 'ComWhSell', // 企金统筹支持营销管理岗
        P006: 'PerCm', // 个金客户经理
        P007: 'PerBrPm', // 个金产品经理
        P008: 'PerSell' // 个金营销管理类
      };
      const urlName = urls[this.userInfo.positionId];
      this.$router.push({ name: urlName });
      return false;
    },
    loadDebtAnalysis() {
      apiRequest(this, queryIndex({
        positionId: this.userInfo.positionId,
        empNo: this.userInfo.empNo
      }), (res) => {
        if (!res.obj) {
          this.isNoData = true;
        }
        const datas = res.obj;
        if (!this.$store.state.isManager) {
          this.endTime = datas.dataDt;
          this.saveDeadLine(datas.dataDt);
          console.log(this.$store.state.userInfo);
        } else {
          this.saveEmpDeadLine(datas.dataDt);
        }
        this.count = parseInt(datas.empNum, 10);
        this.value = parseFloat(datas.score);
        this.order = parseInt(datas.order || 0, 10);
        this.list = [
          {
            score: parseFloat(datas.score01),
            max: parseInt(datas.indicatorWgt.score1Wgt * 100, 10)
          }, {
            score: parseFloat(datas.score02),
            max: parseInt(datas.indicatorWgt.score2Wgt * 100, 10)
          }, {
            score: parseFloat(datas.score03),
            max: parseInt(datas.indicatorWgt.score3Wgt * 100, 10)
          }
        ];
        this.rankList = [parseFloat(datas.order01),
          parseFloat(datas.order02),
          parseFloat(datas.order03)];
        this.canvasColor = [
          [parseFloat(datas.score01) / 100, '#F19546'], [
            (parseFloat(datas.score01) + parseFloat(datas.score02)) / 100, '#8BC34A'
          ], [
            (parseFloat(datas.score01) + parseFloat(datas.score02) + parseFloat(datas.score03)) / 100, '#00BCD4'
          ], [
            1, '#F4F4F4'
          ]
        ];
        this.initCanvas();
      });
    },
    initCanvas() {
      if (this.order) {
        const canvas = Echart.init(document.getElementById('canvas'));
        const options = {
          series: [
            {
              name: '业务指标',
              type: 'gauge',
              tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
              },
              center: ['50%', '60%'],
              radius: '100%',
              detail: {
                formatter: ['{a|{value}}', '{b|分}'].join(''),
                offsetCenter: ['0%', '30%'],
                fontSize: 18,
                borderRadius: 40,
                rich: {
                  a: {
                    fontSize: 25,
                    lineHeight: 20,
                    color: '#459ED8',
                    verticalAlign: 'bottom'
                  },
                  b: { color: '#333', lineHeight: 20 }
                }
              },
              markPoint: {
                symbol: 'circle',
                symbolSize: 19,
                data: [
                  {
                    x: '50%',
                    y: '60%',
                    itemStyle: { color: '#459ED8' }
                  }
                ]
              },
              data: [{ value: this.value, name: '总评分' }],
              startAngle: 210,
              endAngle: -30,
              // axisTick: {
              //   show: false
              // },
              title: {
                show: true,
                offsetCenter: [0, '50%'],
                fontSize: 11
              },
              axisLabel: { show: true },
              pointer: {
                length: '65%',
                width: 5
              },
              itemStyle: {
                color: '#A2CEEB'
              },
              splitLine: {
                show: true,
                length: 20,
                lineStyle: { color: '#dedede' }
              },
              markLine: {
                show: true
              },
              axisLine: {
                show: true,
                lineStyle: { // 属性lineStyle控制线条样式
                  color: this.canvasColor,
                  width: 15
                }
              }
            }
          ]
        };
        canvas.setOption(options);
      }
    },
    qa() {
      this.$router.push({ path: '/qa' });
    }
  },
  mounted() {
    console.log(this.$store.state.isManager);
    this.loadDebtAnalysis();
  }
};
</script>

<style scoped>
.md-field {
  padding: 0 0.32rem;
}

.mine_page{
  background-color: transparent;
  /*background-color: rgba(69, 158, 216, 1);*/
  /*position: relative;*/
}

.mine_userInfo {
  width: 100%;
  height: 2.5rem;
  position: fixed;
  z-index: 50;
}
.qa {
  position: fixed;
  top: 2rem;
  right: 0.4rem;
  content: '';
  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;
  line-height: 1rem;
  text-align: center;
  background: url("../../assets/img/qa.png") no-repeat;
  background-size: 1rem 1rem;
  z-index: 100;
}
.user_info_box{
  padding: 0.3rem;
  color: white;
  /*position: absolute;*/
  /*position: fixed;*/
  width: 100%;
  height: 2.5rem;
  background-color: rgba(67, 120, 190, 1);
  z-index: 100;
}
.blank_box{
  width: 100vW;
  height: 2.5rem;
}
.user_indicators_box{
  height: calc(100vh - 2.5rem);
  /*position: relative;*/
  /*height: calc(100vh - 2.5rem);*/
  /*position: fixed;*/
  /*top: 2.5rem;*/
  background-color: #EEE;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 50;
}
span.icon{
  width: 0.36rem;
  height: 0.36rem;
  background-size: 0.36rem 0.36rem;
  display: inline-block;
}

.ability{
  background: url("../../assets/img/ability.png") no-repeat;
}
.rank{
  background: url("../../assets/img/rank_home.png") no-repeat;
}
.rank_box{
  border-radius: 0.07rem;
  color: #333333;
}
.rank_title{
  height: 0.88rem;
  /*line-height: 0.88rem;*/
  font-size: 0.26rem;
  color: #333333;
  border-bottom: solid 1px #E0E7EE;
  font-weight: bold;
  padding: 0.2rem .32rem;
}
.rank_title a {
  line-height: 0.44rem;
  vertical-align: bottom;
}
.rank_info{
  padding: .1rem .32rem;
}
.rank_info .rank_progress{
  border-bottom: solid 1px #E0E7EE;
}
.rank_info .rank_progress:last-child{
  border-bottom: none;
}
.ability_assess_box{
  padding: .1rem .32rem;
}
.ability_assess_title{
  font-weight: bold;
  height: 0.7rem;
  line-height: 0.45rem;
  padding: 0.1rem 0;
}
.ability_assess_title a {
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  vertical-align: bottom;
}
.ability_assess_detail{
  width: 6rem;
  margin-left: calc(50% - 3.15rem);
}
.ability_assess-load{
  padding-top: 150px;
}
.ability_assess_chart{
  height: 4.5rem;
  width: 6rem;
  padding-left: calc(50vw - 3.5rem);
}
.ability_assess_items{
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 2.2rem;
  padding-left: calc(50vw - 3.5rem);
}

.ability_assess_info{
  align-self: center;
  flex: 1;
}
.item_progress{
  width: 100%;
}
.item_progress .rolling-container{
  font-size: 0.2rem;
}
.item_name{
  width: 100%;
  display: inline-block;
  font-size: 0.2rem;
  text-align: center;
}
.ability_assess_item_left{
  width: .4rem;
  height: .4rem;
  line-height: 1.1rem;
}
.ability_assess_item_left span{
  width: .3rem;
  height: .3rem;
  display: inline-block;
  border-radius: .15rem;
}
.ability_assess_item_right{
  padding-left: 0.05rem;
}
.ability_assess_item_right p{
  font-size: .5rem;
}
.ability_assess_item_right span{
  color: #A4A4A4;
}
.quota_box{
  margin-top: 0.1rem;
  padding-bottom: 0.1rem;
}
</style>
