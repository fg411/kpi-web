<template>
  <div class="manager_page">
    <div class="userInfo_box">
      <div class="user_info_box">
        <div class="user_info_detail">
          <div class="user_avatar" :style="bgStyle"></div>
          <div class="user_info">
            <p>{{userInfo.empName}} <span class="org_name">{{userInfo.branchNm}}</span></p>
            <p>{{userInfo.empNo}}</p>
          </div>
          <div class="time mts-m">
            <span>{{ userInfo.deadLine | dayFormat }}</span>
            <p>统计截止时间</p>
          </div>
        </div>
      </div>
    </div>
    <div class="blank_box"></div>
    <div class="statistics_box">
      <div class="assess_title"><span>整体情况</span></div>
      <div class="statistics_content">
        <div class="model_box">
          <span>{{this.count}}</span>个
          <p>专业能力评估模型</p>
        </div>
        <div class="employee_box">
          <span>{{this.total}}</span>人
          <p>覆盖员工</p>
        </div>
      </div>
    </div>
    <div class="assess_box">
      <div class="assess_title"><span>评估结果</span></div>
      <div class="assess_content">
        <div class="tabs_box">
          <div v-for="(item, index) in types" :key="index"
               @click="tabChange(item.name)"
               :class="{'active': lineName === item.name}">{{item.label}}</div>
        </div>
        <div class="hint">
          <div>
            <md-icon name="warn" color="#BBB" size="xs"></md-icon> 点击岗位名称查看详情
          </div>
          <div>分值均以平均分计算</div>
        </div>
        <div class="content">
          <div :style="{ display: lineName === 'com' ? 'block' : 'none' }">
            <div id="company_canvas" class="company_canvas"
                 :style="{'height': `${comCanvasHeight}rem`}"></div>
          </div>
          <div :style="{ display: lineName === 'per'  ? 'block' : 'none' }">
            <div id="person_canvas" class="person_canvas"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  TabBar, Tabs, TabPane, Icon
} from 'mand-mobile';
import Echart from 'echarts';
import { apiRequest, qryPosScoreByEmp } from '@/libs/api';

export default {
  components: {
    [TabBar.name]: TabBar,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Icon.name]: Icon
  },
  data() {
    return {
      lineName: 'com',
      types: [
        { name: 'com', label: '企金条线' },
        { name: 'per', label: '个金条线' }],
      userInfo: this.$store.state.userInfo,
      bgStyle: '',
      dataDt: '',
      items: ['专业精神', '专业价值', '专业技能'],
      comRoles: [],
      comRoleList: [],
      comSpirit: [],
      comValue: [],
      comSkill: [],
      comZeroList: [],
      perRoles: [],
      perRoleList: [],
      perSpirit: [],
      perValue: [],
      perSkill: [],
      perZeroList: [],
      count: 0, // 模型数量
      total: 0, // 覆盖员工数量
      comCanvasHeight: 5.5,
      perCanvasHeight: 5.5
    };
  },
  created() {
    this.bgStyle = {
      background: `url('${this.$store.state.userInfo.imgUrl}') no-repeat`,
      backgroundSize: '1rem 1rem'
    };
  },
  methods: {
    tabChange(tabName) {
      this.lineName = tabName;
    },
    queryAnalysis() {
      apiRequest(this, qryPosScoreByEmp({
        empNo: this.userInfo.empNo
      }), (res) => {
        if (res.list && res.list.length) {
          this.count = res.list.length;
          for (let i = res.list.length - 1; i >= 0; i -= 1) {
            const item = res.list[i];
            this.total += parseInt(item.empNum, 10);
            // console.log(item);
            if (item.ownLine && item.ownLine === 'D0102') {
              this.comRoles.push(item);
              const label = `${this.formatOrgName(item.positionName)}\n（${item.empNum} 人）`;
              this.comRoleList.push(label);
              this.comSpirit.push(Math.ceil(item.score1));
              this.comValue.push(Math.ceil(item.score2));
              this.comSkill.push(Math.ceil(item.score3));
              this.comZeroList.push(0);
            } else {
              this.perRoles.push(item);
              const label = `${this.formatOrgName(item.positionName)}\n（${item.empNum} 人）`;
              this.perRoleList.push(label);
              this.perSpirit.push(Math.ceil(item.score1));
              this.perValue.push(Math.ceil(item.score2));
              this.perSkill.push(Math.ceil(item.score3));
              this.perZeroList.push(0);
            }
          }
          this.comCanvasHeight += this.comRoleList.length > 3
            ? 1.1 * (this.comRoleList.length - 3) : 0;
          if (!this.comRoleList.length) {
            this.lineName = 'per';
            this.types.shift();
          }
          if (!this.perRoleList.length) {
            this.types.pop();
          }
        }
        // this.comOrgList = res.list.map((item) => item.orgNm);
        this.initCanvas();
      });
    },
    formatOrgName: (val) => {
      const name = val.replace(/(个金|企金)/, '');
      if (name.length <= 8) {
        return name;
      }
      const str = name.replace('  ', ' ');
      const arr = [];
      for (let i = 0; i < str.length; i += 8) {
        if (i + 8 < str.length) {
          arr.push(str.substr(i, 8));
        } else {
          arr.push(str.substr(i));
        }
      }
      return arr.join('\n');
    },
    initCanvas() {
      if (this.comRoles.length) {
        const companyCanvas = Echart.init(document.getElementById('company_canvas'));
        const option = {
          tooltip: {
            trigger: 'none',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          backgroundColor: '#FFF',
          legend: {
            data: this.items,
            selectedMode: false,
            itemHeight: 14,
            itemWidth: 14,
            icon: 'rect',
            bottom: '2%',
            itemGap: 25
          },
          grid: {
            top: '2%',
            left: '2%',
            right: '10%',
            bottom: '45',
            containLabel: true
          },
          xAxis: {
            position: 'top',
            type: 'value',
            minInterval: 25,
            max: 100,
            name: '（分）',
            nameTextStyle: {
              padding: [-25, 10, 2, -10],
              fontSize: 11
            },
            axisLine: {
              lineStyle: {
                width: 0,
                color: '#D8D8D8'
              }
            }
          },
          yAxis: {
            type: 'category',
            data: this.comRoleList,
            triggerEvent: true,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#D8D8D8'
              }
            },
            axisLabel: {
              show: true,
              color: '#333',
              fontSize: 10,
              lineHeight: 20,
              margin: 5
            }
          },
          series: [
            {
              barWidth: 25,
              name: '专业精神',
              type: 'bar',
              stack: '总量',
              itemStyle: {
                color: '#F19546'
              },
              label: {
                show: true
                // position: 'insideLeft'
              },
              data: this.comSpirit
            },
            {
              barWidth: 25,
              name: '专业价值',
              type: 'bar',
              stack: '总量',
              itemStyle: { color: '#8BC34A' },
              label: { show: true },
              data: this.comValue
            },
            {
              barWidth: 25,
              name: '专业技能',
              type: 'bar',
              stack: '总量',
              itemStyle: { color: '#00BCD4' },
              label: {
                show: true,
                position: 'insideRight'
              },
              data: this.comSkill
            },
            {
              name: '合计',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: '#459ED8'
                  },
                  formatter: (params) => {
                    const index = params.dataIndex;
                    return this.comSpirit[index] + this.comValue[index] + this.comSkill[index];
                  }
                }
              },
              data: this.comZeroList
            }
          ]
        };
        companyCanvas.setOption(option);
        companyCanvas.resize({ height: `${this.comCanvasHeight * 50}px` });
        companyCanvas.on('click', (params) => {
          if (params.componentType === 'yAxis') {
            const index = this.comRoleList.findIndex((item) => item === params.value);
            const item = this.comRoles[index];
            this.$router.push(`/post/${item.positionId}`);
          }
        });
      }
      if (this.perRoles.length) {
        const personCanvas = Echart.init(document.getElementById('person_canvas'));
        const options = {
          tooltip: {
            trigger: 'none',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          backgroundColor: '#FFF',
          legend: {
            data: this.items,
            selectedMode: false,
            itemHeight: 14,
            itemWidth: 14,
            icon: 'rect',
            bottom: '2%',
            itemGap: 25
          },
          grid: {
            top: '2%',
            left: '2%',
            right: '10%',
            bottom: '45',
            containLabel: true
          },
          xAxis: {
            position: 'top',
            type: 'value',
            minInterval: 25,
            max: '100',
            name: '（分）',
            nameTextStyle: {
              padding: [-25, 10, 2, -10],
              fontSize: 11
            },
            axisLine: {
              lineStyle: {
                width: 0,
                color: '#D8D8D8'
              }
            }
          },
          yAxis: {
            type: 'category',
            data: this.perRoleList,
            axisTick: {
              show: false
            },
            triggerEvent: true,
            axisLine: {
              lineStyle: {
                color: '#D8D8D8'
              }
            },
            axisLabel: {
              show: true,
              color: '#333',
              clickable: true,
              fontSize: 10,
              lineHeight: 20,
              margin: 5
            }
          },
          color: ['#F19546', '#8BC34A', '#00BCD4'],
          series: [
            {
              barWidth: 25,
              name: '专业精神',
              type: 'bar',
              stack: '总量',
              itemStyle: {
                color: '#F19546'
              },
              label: {
                show: true,
                position: 'insideRight'
              },
              data: this.perSpirit
            },
            {
              barWidth: 25,
              name: '专业价值',
              type: 'bar',
              stack: '总量',
              itemStyle: {
                color: '#8BC34A'
              },
              label: {
                show: true,
                position: 'insideRight'
              },
              data: this.perValue
            },
            {
              barWidth: 25,
              name: '专业技能',
              type: 'bar',
              stack: '总量',
              itemStyle: {
                color: '#00BCD4'
              },
              label: {
                show: true,
                position: 'insideRight'
              },
              data: this.perSkill
            },
            {
              name: '合计',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: '#459ED8'
                  },
                  formatter: (params) => {
                    const index = params.dataIndex;
                    return this.perSpirit[index] + this.perValue[index] + this.perSkill[index];
                  }
                }
              },
              data: this.perZeroList
            }
          ]
        };
        personCanvas.setOption(options);
        personCanvas.resize({ height: `${this.perCanvasHeight * 50}px` });
        personCanvas.on('click', (params) => {
          if (params.componentType === 'yAxis') {
            const index = this.perRoleList.findIndex((item) => item === params.value);
            const item = this.perRoles[index];
            this.$router.push(`/post/${item.positionId}`);
          }
        });
      }
    }
  },
  mounted() {
    this.queryAnalysis();
  }
};
</script>

<style lang="stylus" scoped>
.manager_page
  height 100%
  /*background-color: transparent;*/
  background-color: #efefef;

  .userInfo_box {
    width: 100%;
    height: 1.7rem;
    position: fixed;
    z-index: 50;
    .user_info_box{
      padding: 0.3rem;
      color: white;
      width: 100%;
      height: 1.7rem;
      background-color: rgba(67, 120, 190, 1);
      z-index: 100;
      .org_name {
        background-color: #22ACD5;
        margin-left: 0.15rem;
        padding: 0.08rem;
        border-radius: 0.05rem;
      }
      .user_info_detail{
        height: 1.3rem;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        .user_avatar{
          width: 1rem;
          height: 1rem;
          border-radius: 0.5rem;
          background-color: #999;
          border: solid 0.03rem #FFF;
          background-size: 1rem 1rem;
        }
        .user_info{
          flex-grow: 3;
          line-height: 0.4rem;
          padding-left: 0.15rem;
          margin-top: 0.1rem;
        }
        .user_info p{
          font-size: 0.24rem;
        }

        .user_info p:first-child{
          font-size: 0.3rem;
        }
        .time{
          flex-grow: 0;
          margin-top: 0.15rem;
          /*margin: 0.2rem 0.1rem 0 0;*/
        }
        .time span {
          border-radius: 0.1rem;
          border: solid 1px #EEE;
          padding: 0.1rem;
          display: block;
          height: 0.5rem;
          font-size: 0.24rem;
        }
        .time p {
          text-align: right;
          padding-top: 0.1rem;
          font-size: 0.2rem;
        }
      }
    }
  }

  .blank_box{
    width: 100vW;
    height: 1.7rem;
  }
  .assess_title {
    position relative;
    background-color: #FFF;
    height: 0.88rem;
    padding: 0 0.32rem;
    line-height: 0.88rem;
    border-bottom solid 1px #efefef;
    box-shadow: inset 0 0 0 0 #E0E7EE;
    span {
      padding-left 0.2rem;
      color: #333;
      font-family: PingFangSC-Medium;
    }
  }
  .assess_title:before {
    content: ' ';
    position absolute;
    width 0.06rem;
    height : 0.28rem;
    background-color: #459ED8;
    display block;
    top: 0.3rem;
  }
  .statistics_box {
    height: 2.9rem;
    background-color: #FFF;
    .statistics_content {
      display: grid;
      grid-template-columns repeat(2, 50%);
      text-align center;
      height 2rem;
      div {
        padding-top: 0.5rem;
        height 2rem;
        font-size 0.2rem;
        span {
          font-size: 0.6rem;
        }
        p {
          padding-top: 0.12rem;
          font-size: 0.26rem;
        }
      }
      .model_box span {
        color: #F19546;
      }
      .employee_box span {
        color: #8BC34A;
      }
    }
  }
  .assess_box {
    height: calc(100vh - 4.81rem);
    background-color: #FFF;
    width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    z-index: 50;
    margin-top: 0.2rem;

    .assess_content{
      background-color: #FFF;
      padding: 0.02rem;
      margin: 0.3rem 0.32rem 0.12rem 0.32rem;
      border-radius: 0.16rem;
      box-shadow 2px 5px 10px #ccc;
      .tabs_box {
        display: flex;
        justify-content space-between;
        height: 0.8rem;
        line-height: 0.8rem;
        background-color: #F3F6F9;
        border-top-left-radius: 0.16rem;
        border-top-right-radius: 0.16rem;
        text-align center;
        color: #333;
        div {
          flex-grow: 1;
        }
        div.active {
          background-color: #fff;
          color : #459ED8;
        }
      }
      .hint {
        background-color: #fff;
        height 0.9rem;
        line-height 0.9rem;
        padding 0 0.4rem;
        display flex;
        justify-content: space-between;
        color: #999;
        .md-icon.icon-font.xs {
          font-size: 0.2rem;
        }
        div {
          font-size: 0.2rem;
        }
      }
      .content {
        min-height: calc(100vh - 7.85rem);
        .company_canvas {
          /*height: 7.8rem;*/
          width: 6.81rem;
          background-color: #FEFEFE;
        }
        .person_canvas {
          /*height: 5.5rem;*/
          width: 6.81rem;
          background-color: #FEFEFE;
        }
      }
      .md-tab-bar-ink {
        background-color: none;
      }
    }
  }
</style>
