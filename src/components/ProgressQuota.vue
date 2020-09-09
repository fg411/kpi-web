<template>
  <div class="rank_progress">
    <div class="progress_box">
      <div class="progress_left">
        <p>{{this.title}} <md-icon size="xs" color="#999" name="question"
                                  @click="this.openModal"></md-icon>
        </p>
      </div>
      <div class="progress_right">
        <span :style="{color: this.color}">{{this.score}}</span>
        <span class="max">/{{this.max}} 分</span>
      </div>
    </div>
    <Progress :max="max" :score="score" :bc="this.bc" :color="color"></Progress>
  </div>
</template>

<script>
import { Dialog, Icon } from 'mand-mobile';
import { mapState, mapActions } from 'vuex';
import Progress from './Progress.vue';

export default {
  components: {
    [Dialog.name]: Dialog,
    [Icon.name]: Icon,
    Progress
  },
  computed: {
    ...mapState(['isShowModal', 'modalOption'])
  },
  props: {
    max: {
      type: Number,
      default: 5,
      required: true
    },
    score: {
      type: [Number, String],
      default: 0,
      required: true
    },
    bc: {
      type: String,
      default: '#E3F1F9'
    },
    color: {
      type: String,
      default: '#45C9D8'
    },
    title: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      basicDialog: {
        open: false,
        btns: []
      }
    };
  },
  methods: {
    ...mapActions(['showModal', 'hideModal']),
    openModal() {
      this.showModal({
        title: this.title,
        content: this.msg
      });
    },
    onIconConfirm() {
      this.basicDialog.open = false;
    }
  }
};
</script>

<style scoped>
  .rank_progress {
    margin: 0.05rem 0;
  }
  .progress_box{
    display: flex;
    align-items: flex-end;
    padding: 0.1rem 0 0;
    justify-content: space-between;
  }
  .progress_left{
    flex-grow: 8;
  }
  .progress_left .md-icon.icon-font.xs {
    vertical-align: middle;
  }
  .progress_left p{
    height: 0.7rem;
    line-height: 0.75rem;
    color: #333333;
    font-size: 0.24rem;
  }
  .progress_right{
    flex-grow: 20;
    line-height: 0.55rem;
    width: .3rem;
    text-align: right;
  }
  .progress_right span{
    font-size: .35rem;
  }
  span.max{
    color: rgb(175, 175, 175);
    font-size: .2rem;
  }
  .dialog-message{
    line-height: 0.4rem;
  }
  .aa {}
</style>
