<template>
  <div class="branch_detail_page">
    <div class="branch_info">
      <div class="branch_name">{{branchInfo.orgNm}}</div>
      <div class="deadline">统计截止时间：{{ this.$store.state.deadLine | dayFormat }}</div>
    </div>
    <div class="chart_box">
      <chart class="chat_content" ref="MyChart"
             :list="chartData" :wh="180" :total="totalScore"></chart>
      <div class="chart_info">
        <div class="item_box" v-for="(item, index) in normList" :key="index">
          <span class="item_icon" :style='{ "background-color": item.color }'></span>
          <p><span :style='{ "color": item.color }'>{{chartData[index]['score']}}</span> 分</p>
          <p>{{item.text}}（{{chartData[index]['max']}}%）</p>
        </div>
      </div>
    </div>
    <div class="table_box">
      <div class="table_header">
        <div>姓名</div>
        <div>专业精神</div>
        <div>专业价值</div>
        <div>专业技能</div>
        <div @click="changeSort">
          总分 <span class="sort" :class="sort === 'desc' ? 'desc' : 'asc'"></span>
        </div>
        <div>排名</div>
      </div>
      <div class="table_body">
        <md-scroll-view
          ref="scrollView"
          :scrolling-x="false"
          @end-reached="onEndReached"
        >
          <div v-for="(item, index) in list" :key="index" class="item_box"
               @click="onItemClick(item)">
            <div>{{item.empName}}</div>
            <div>{{item.score1}}</div>
            <div>{{item.score2}}</div>
            <div>{{item.score3}}</div>
            <div>{{item.score}}</div>
            <div>{{item.order}}</div>
          </div>
          <md-scroll-view-more
            slot="more"
            finished-text="没有更多了"
            :is-finished="isLast" >
          </md-scroll-view-more>
        </md-scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ScrollView,
  ScrollViewRefresh,
  ScrollViewMore,
  Toast
} from 'mand-mobile';
import { mapActions } from 'vuex';
import { apiRequest, qryEmpScoreByOrg } from '@/libs/api';
import Chart from '@/components/Chart.vue';

export default {
  components: {
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
    [ScrollViewMore.name]: ScrollViewMore,
    Chart
  },
  data() {
    return {
      branchInfo: {},
      sort: 'desc',
      normList: [
        { text: '专业精神', color: '#F19546' },
        { text: '专业价值', color: '#8BC34A' },
        { text: '专业技能', color: '#00BCD4' }
      ],
      totalScore: 0,
      chartData: [
        {
          score: parseFloat(this.$store.state.routeParams.avg1),
          max: parseFloat(this.$store.state.routeParams.avg1)
        },
        {
          score: parseFloat(this.$store.state.routeParams.avg2),
          max: parseFloat(this.$store.state.routeParams.avg2)
        },
        {
          score: parseFloat(this.$store.state.routeParams.avg3),
          max: parseFloat(this.$store.state.routeParams.avg3)
        }
      ],
      list: [],
      pageNum: 1,
      pageSize: 10,
      isLoad: false,
      isLast: false
    };
  },
  methods: {
    ...mapActions(['saveEmployee']),
    changeSort() {
      this.$refs.scrollView.finishRefresh();
      this.$refs.scrollView.scrollTo(0, 0, false);
      this.pageNum = 0;
      this.isLast = false;
      this.list = [];
      this.sort = this.sort === 'desc' ? 'asc' : 'desc';
      this.isLoad = true;
      this.queryData();
    },
    deadline(str) {
      if (str.length === 8) {
        const year = str.substr(0, 4);
        const month = str.substr(4, 2);
        const day = str.substr(6, 2);
        return new Date(`${year}/${month}/${day}`);
      }
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return date;
    },
    onItemClick(item) {
      this.$router.push('/mine');
      this.saveEmployee({
        ...item,
        deadLine: this.deadline(item.dataDt)
      });
    },
    onEndReached() {
      if (this.isLast || this.isLoad) {
        return;
      }
      this.isLoad = true;
      this.queryData();
    },
    initChart() {
      this.isLoad = true;
      apiRequest(this, qryEmpScoreByOrg({
        posId: this.branchInfo.positionId,
        orgId: this.branchInfo.orgBr,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sortType: this.sort
      }), (res) => {
        this.isLoad = false;
        const { obj, pager } = res;
        this.chartData[0].max = parseFloat(obj.score1Wgt) * 10 * 10;
        this.chartData[1].max = parseFloat(obj.score2Wgt) * 10 * 10;
        this.chartData[2].max = parseFloat(obj.score3Wgt) * 10 * 10;
        this.$refs.MyChart.initCanvas();
        this.list = pager.list;
        this.isLast = pager.isLastPage;
        this.$refs.scrollView.reflowScroller();
        // this.$refs.scrollView.init();
      }).catch((e) => {
        console.error(e);
        this.isLoad = false;
      });
    },
    queryData() {
      this.pageNum += 1;
      apiRequest(this, qryEmpScoreByOrg({
        posId: this.branchInfo.positionId,
        orgId: this.branchInfo.orgBr,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sortType: this.sort
      }), (res) => {
        this.isLoad = false;
        const { pager } = res;
        this.list = this.list.concat(pager.list);
        this.isLast = pager.isLastPage;
        this.$refs.scrollView.reflowScroller();
        Toast.hide();
        // if (this.isLast) {}
        this.$refs.scrollView.finishLoadMore();
      }).catch((e) => {
        Toast.hide();
        console.error(e);
        this.isLoad = false;
      });
    }
  },
  created() {
    console.log(this.$store.state.routeParams);
    // this.branchInfo = this.$route.params;
    this.branchInfo = this.$store.state.routeParams;
    this.totalScore = parseFloat(this.branchInfo.avgTotal);
    this.initChart();
  }
};
</script>

<style lang="stylus" scoped>
.branch_detail_page {
  background-color: #F3F6F9;
  height: 100vh;
  .branch_info {
    width 100%;
    display: inline-flex;
    height 0.9rem;
    line-height: 0.9rem;
    padding 0 0.3rem;
    background-color: #fff
    color: #333333;
    .branch_name {
      font-weight: bold;
    }
    .deadline {
      font-size: 0.24rem;
      opacity: 0.8;
      flex: 1;
      text-align: right;
    }
  }
  .chart_box {
    padding: 0.3rem;
    height: 4.2rem;
    width: 100%;
    display inline-flex;
    background-color: #fff
    .chat_content {
      width: 3.6rem;
      height: 3.6rem;
    }
    .chart_info {
      padding-left 0.6rem;
      flex: 1;
      align-self: center;
      .item_box {
        position relative;
        height 1.2rem;
        line-height 0.4rem;
        .item_icon {
          width 0.25rem;
          height 0.25rem;
          position absolute;
          top 0.27rem;
          left -0.35rem;
        }
        p {
          font-size: 0.24rem;
          span {
            font-size: 0.4rem;
          }
        }
      }
    }
  }
  .table_box {
    padding 0.32rem 0.16rem 0 0.16rem;
    height: calc(100vh - 5.4rem);
    text-align: center;
    font-size: 0.24rem;
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      height 0.8rem;
      line-height 0.8rem;

      font-weight: normal;
    }
    .table_header {
      display grid;
      grid-template-columns: 1.25rem repeat(4, 3fr) 2fr;
      height 0.8rem;
      line-height 0.8rem;
      background-color: #E1E3E6;
      border-radius: 0.08rem;
      color: #565657;
      div {
        font-size: 0.24rem;
        color: #565657;
        .sort {
          margin-left: 0.05rem;
          display: inline-block;
          vertical-align: middle;
          width 0.1rem;
          height 0.25rem;
          background-repeat: no-wrap;
          background-size: 0.1rem 0.25rem;
        }
        .asc {
          background-image: url('../../assets/img/asc.png');
        }
        .desc {
          background-image: url('../../assets/img/desc.png');
        }
      }
      div:nth-child(2) {
        background-color: #F19546
      }
      div:nth-child(3) {
        background-color: #8BC34A
      }
      div:nth-child(4) {
        background-color: #00BCD4
      }
      div:nth-child(5) {
        border-right: solid 0.01rem #fefefe;
      }
    }
    .table_body{
      height: calc(100% - 0.8rem);
      /*height: 6.5rem;*/
      width: 100%;
      overflow-y:scroll;
      border-radius: 0.08rem;
      .item_box {
        margin-top 0.1rem;
        display: grid;
        grid-template-columns: 1.25rem repeat(4, 3fr) 2fr;
        height 0.8rem;
        line-height 0.8rem;
        background-color: #FFF;
        border-radius: 0.08rem;
        div {
          position relative
        }
        div:first-child:after {
          content: ' ';
          display: inline-block;
          position: absolute;
          top: 25px;
          right: 4px;
          width: 6px;
          height: 6px;
          border-top: 1px solid #999;
          border-right: 1px solid #999;
          transform: rotate(45deg);
        }
      }
      .item_boxss {
        width 300px !important;
        background-color: #FF0;
      }
      table {
        height: 3rem;
        .md-example-child-scroll-view-3 {
          height: 3rem;
        }
        tbody {
          height: 3rem;
        }
      }
    }
  }
}
</style>
