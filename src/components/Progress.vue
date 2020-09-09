<template>
  <div class="kpi_progress">
    <div class="progress_box" :class="bold ? 'bold': ''">
      <div class="progress_bc" :style="{'background-color': this.bc}"></div>
      <div class="progress" :style="styleObject"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    title: {
      type: String,
      default: '平分原则',
    },
    max: {
      type: Number,
      default: 5,
      required: true,
    },
    score: {
      type: [Number, String],
      default: 0,
      required: true,
    },
    color: {
      type: String,
      default: '#45C9D8',
    },
    bc: {
      type: String,
      default: '#E3F1F9',
    },
    bold: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    styleObject() {
      let progress = 0;
      if (this.score && this.max) {
        progress = (this.score * 100) / this.max;
      }
      const width = this.bold ? '0.26rem' : '0.18rem';
      return {
        width: `${progress}%`,
        'background-color': this.color,
        'min-width': progress ? width : 0,
      };
    },
  },
  methods: {},
};
</script>

<style scoped>
.kpi_progress{
  /*background-color: #EFEFEF;*/
}
.progress_box{
  position: relative;
  width: 100%;
  height: 0.2rem;
}
.progress_box.bold{
  height: 0.3rem;
}
.progress_bc{
  position: absolute;
  width: 100%;
  height: .18rem;
  border-radius: .09rem;
}
.bold .progress_bc{
  height: .26rem;
  border-radius: 0.13rem;
}
.progress{
  position: absolute;
  height: .18rem;
  border-radius: .09rem;
  max-width: 100%;
}
.bold .progress{
  height: 0.26rem;
  border-radius: 0.13rem;
}
.aa {}
</style>
