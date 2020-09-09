<template>
  <div class="user_info_box">
    <div class="user_info_detail">
      <div v-if="!this.$store.state.isManager" class="user_avatar" :style="bgStyle"></div>
      <div class="user_info">
        <p>{{userInfo.empName || userInfo.empNm}}</p>
        <p>{{userInfo.empNo}}</p>
      </div>
      <div class="time mts-m">
        <span>{{ deadLine || userInfo.deadLine | dayFormat }}</span>
        <p>统计截止时间</p>
      </div>
    </div>
    <div class="user_info_post">
      <p class="posts">
        <span>{{userInfo.branchNm | postSimplify}}</span>
        <span>|</span>
        <span> {{userInfo.lineName}}</span>
        <span>|</span>
        <span> {{userInfo.positionName | positinReplace | postSimplify}}</span>
      </p>
    </div>
  </div>

</template>

<script>

export default {
  props: {
    deadLine: {
      type: [String, Number]
    }
  },
  data() {
    return {
      userInfo: this.$store.state.isManager
        ? this.$store.state.employeeInfo : this.$store.state.userInfo,
      now: '',
      bgStyle: ''
    };
  },
  filters: {
    positinReplace: (e) => {
      if (!e) {
        return '';
      }
      return e.replace(/(个金|企金)/, '');
    }
  },
  created() {
    if (!this.$store.state.isManager) {
      const info = this.$store.state.userInfo;
      this.bgStyle = {
        background: `url('${info.imgUrl}') no-repeat`,
        backgroundSize: '1rem 1rem'
      };
    }
  },
  mounted() {
    console.log(this.userInfo);
    console.log(this.$store.state.employeeInfo);
    console.log(this.$store.state.userInfo);
  }
};
</script>

<style scoped>
.user_info_detail{
  height: 1.3rem;
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
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
.user_info_post{
  height: 0.6rem;
  line-height: 0.6rem;
}
.posts {
  display: inline-block;
  border-radius: 6px;
  padding: 0 .1rem;
  background-color: rgba(0, 0, 0, 0.1);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
}
.posts span{
  padding: 0 0.05rem;
}
.aa {}
</style>
