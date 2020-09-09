<template>
  <div class="rank_progress">
    <div class="progress_box">
      <div class="progress_left">
        <p class="title" :style="{color: this.color}">{{this.title}}</p>
        <p class="text">{{this.text}}</p>
      </div>
      <div class="progress_center">
        <div class="rank_num">
          <span>1</span>
          <span>{{max}}人</span>
        </div>
        <Progress :bold="bold" :max="max" :score="score" :bc="bc" :color="color"></Progress>
      </div>
      <div class="progress_right">
        <span :style="{color: this.color}">{{this.score}}</span>名
      </div>
    </div>
  </div>
</template>

<script>
import Progress from './Progress.vue';

export default {
  components: {
    Progress,
  },
  props: {
    bold: {
      type: Boolean,
      default: false,
    },
    title: {
      type: [String, Number],
      required: true,
    },
    text: {
      type: [String, Number],
      default: '评分排名',
    },
    max: {
      type: [Number, String],
      default: 5,
      required: true,
    },
    score: {
      type: [Number, String],
      default: 0,
      required: true,
    },
    bc: {
      type: String,
      default: '#E3F1F9',
    },
    color: {
      type: String,
      default: '#459ED8',
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.rank_progress {
  padding: 0.1rem 0;
}
.progress_box{
  display: flex;
  align-items: center;
  /*padding: 0.1rem 0 0;*/
  justify-content: space-between;
  height: 1rem;
}
.progress_left{
  flex-grow: 1;
  width: 1rem;
  margin: .2rem 0;
}
.progress_left p{
  height: 0.36rem;
  font-size: 0.24rem;
}
p.title{
  font-size: 0.26rem;
}
p.text{
  padding-top: 0.1rem;
}
.progress_center{
  flex-grow: 10;
  color: #838383;
}
.rank_num{
  justify-content: space-between;
  display: flex;
}
.rank_num span{
  font-size: 0.15rem;
}
.progress_right{
  flex-grow: 1;
  /*line-height: 0.3rem;*/
  height: 0.3rem;
  font-size: .15rem;
  width: .35rem;
  color: #838383;
  text-align: right;
}
.progress_right span{
  font-size: .3rem;
  padding-right: 0.02rem;
}
.aa {}
</style>
