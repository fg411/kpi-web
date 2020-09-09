<template>
  <div class="post_page">
    <div class="deadline">统计截止时间： {{ this.$store.state.deadLine | dayFormat }}</div>
    <div class="table_box pad">
      <div class="table_header">
        <div>分行</div>
        <div>专业精神</div>
        <div>专业价值</div>
        <div>专业技能</div>
        <div @click="changeSort">
          总分 <span class="sort" :class="sort === 'desc' ? 'desc' : 'asc'"></span>
        </div>
        <div>排名</div>
      </div>
      <div class="table_body">
        <div class="item_box" v-for="(item, index) in list" :key="index" @click="goUrl(item)">
          <div>{{item.orgNm.trim()}}</div>
          <div>{{item.avg1}}</div>
          <div>{{item.avg2}}</div>
          <div>{{item.avg3}}</div>
          <div>{{item.avgTotal}}</div>
          <div>{{item.avgTotalOrder}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'mand-mobile';
import { mapActions } from 'vuex';
import { apiRequest, qryOrgScoreByPos } from '@/libs/api';

export default {
  components: {
    [Icon.name]: Icon
  },
  data() {
    return {
      list: [],
      sort: 'desc'
    };
  },
  methods: {
    ...mapActions(['saveRouteParams']),
    queryData() {
      apiRequest(this, qryOrgScoreByPos({
        posId: this.$route.params.posId,
        sortType: this.sort
      }), (res) => {
        this.list = res.list;
      });
    },
    changeSort() {
      this.list = [];
      this.sort = this.sort === 'desc' ? 'asc' : 'desc';
      this.queryData();
    },
    goUrl(item) {
      this.saveRouteParams(item);
      this.$router.push({ name: 'BranchDetail', params: item });
    }
  },
  created() {
    this.queryData();
  }
};
</script>

<style lang="stylus" scoped>
.post_page{
  height: 100vh;
  background-color: #F3F6F9;
  font-size 0.24rem;
  .deadline {
    height 1rem;
    line-height 1rem;
    padding 0 0.4rem;
    font-size 0.22rem;
  }
}
.table_box{
  padding 0 0.16rem;
  height: calc(100vh - 1rem);
  text-align: center;
  font-size: 0.24rem;
  .table_header {
    display grid;
    grid-template-columns: 1.5rem repeat(4, 3fr) 2fr;
    height 0.8rem;
    line-height 0.8rem;
    background-color: #E1E3E6;
    border-radius: 0.08rem;
    color: #565657;
    div {
      font-size: 0.24rem;
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
    -webkit-overflow-scrolling: touch;
    border-radius: 0.08rem;
    .item_box {
      margin-top 0.1rem;
      display: grid;
      grid-template-columns: 1.5rem repeat(4, 3fr) 2fr;
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

  div {
    font-size 0.24rem;
    height: 0.8rem;
    line-height: 0.8rem;
    box-shadow inset 0px -2px 0px 0px #ccc ;
  }

  div.table_title {
    background: #E1E3E6;
    height: 0.8rem;
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
  div:nth-child(6n + 1) {
    border-top-left-radius 0.1rem;
    border-bottom-left-radius 0.1rem;
  }
  div:nth-child(6n) {
    border-top-right-radius 0.1rem;
    border-bottom-right-radius 0.1rem;
  }
  .table_title:nth-child(2) {
    background-color: #F99546
  }
  .table_title:nth-child(3) {
    background-color: #8BC34A
  }
  .table_title:nth-child(4) {
    background-color: #00BCD4
  }
  .item {
    background: #FFF;
  }
  .item:nth-child(6n + 1) {
    position relative
  }
  .item:nth-child(6n + 1):after {
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
.table_header{
  background-color: #D0E4F2;
  height: 1rem;
  line-height: 1rem;
  color: #71B4E0;
  border-radius: 0.1rem;
}
.post_page{}
.post_page{}
</style>
