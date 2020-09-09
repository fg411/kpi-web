<template>
  <div class="chart">
    <canvas ref="MyChart" id="canvas" :width="wh * 2" :height="wh * 2"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    wh: {
      type: Number,
      default: 200
    },
    total: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => [
        {
          score: 0,
          max: 15
        },
        {
          score: 0,
          max: 45
        },
        {
          score: 0,
          max: 40
        }]
    },
    lineWidth: {
      type: Number,
      default: 20
    },
    colors: {
      type: Array,
      default: () => ['#00BCD4', '#8BC34A', '#F19546']
    },
    bgColors: {
      type: Array,
      default: () => ['#E3F7F9', '#EEF6E4', '#FDEFE3']
    }
  },
  data() {
    return {};
  },
  computed: {
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.MyChart;
      if (canvas.getContext) {
        const wh = parseInt(this.wh, 10);
        // const wh = this.wh / 2;
        const radio = wh - 10;
        const space = 30;
        const ctx = canvas.getContext('2d');
        const length = this.list && this.list.length;
        for (let i = 0; i < length; i += 1) {
          const item = this.list[length - i - 1];
          ctx.beginPath();
          ctx.lineWidth = this.lineWidth;
          ctx.strokeStyle = this.bgColors[i];
          ctx.arc(wh, wh, radio - i * space - 10, 0, 2 * Math.PI);
          ctx.stroke();
          if (item.score === 0) { /* emity */
          } else if (item.score === item.max) {
            ctx.beginPath();
            ctx.lineCap = 'round';
            ctx.strokeStyle = this.colors[i];
            ctx.arc(wh, wh, radio - i * space - 10, 0, 2 * Math.PI);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.lineCap = 'round';
            ctx.strokeStyle = this.colors[i];
            const startAngle = (3 / 2) * Math.PI;
            let endAngle = 0;
            const progress = item.score / item.max;
            if (progress > 0.25) {
              endAngle = (progress - 0.25) * 2 * Math.PI;
              ctx.arc(wh, wh, radio - i * space - 10, startAngle, endAngle);
            } else {
              endAngle = progress * 2 * Math.PI + (3 / 2) * Math.PI;
              ctx.arc(wh, wh, radio - i * space - 10, startAngle, endAngle);
            }
            ctx.stroke();
          }
        }
        ctx.font = '45px Arial';
        ctx.lineWidth = 4;
        ctx.fillStyle = 'rgb(69,158,216)';
        ctx.textBaseline = 'hanging';
        const isInt = Math.floor(this.total) === this.total;
        const decimalLength = isInt ? 0 : this.total.toString().split('.')[1].length; // 小数点后位数
        if (isInt) { // 整数
          ctx.fillText(this.total, wh - 32, wh - 30);
        } else if (decimalLength === 1) {
          ctx.fillText(this.total, wh - 50, wh - 30);
        } else if (decimalLength === 2) {
          ctx.fillText(this.total, wh - 73, wh - 30);
        }
        ctx.font = 'bold 26px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';

        if (isInt) { // 整数
          ctx.fillText('分', wh + 20, wh - 20);
        } else if (decimalLength === 1) {
          ctx.fillText('分', wh + 35, wh - 20);
        } else if (decimalLength === 2) {
          ctx.fillText('分', wh + 42, wh - 20);
        }
        ctx.fillStyle = 'rgba(51, 51, 51)';
        ctx.font = '24px Arial';
        ctx.fillText('总评分', wh - 40, wh + 20);
      }
    }
  },
  mounted() {
    // this.initCanvas();
  }
};
</script>

<style scoped>
.chart {
}
#canvas {
  width: 3.6rem;
  height: 3.6rem;
}
.aa {}
</style>
