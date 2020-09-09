import { mapActions } from 'vuex';
// import { DecryptUrl } from './index';

export default {
  install(Vue) {
    Vue.mixin({
      created() {
        // if (this.$route && this.$route.query && this.$route.query.key) {
        //   this.saveRouteParams(DecryptUrl(this.$route.query.key));
        // }
      },
      mounted() {
        this.timeouts = this.timeouts || [];
        this.interval = this.interval || [];
      },
      destroyed() {
        this.timeouts.forEach((t) => clearTimeout(t));
        this.interval.forEach((t) => clearInterval(t));
      },
      methods: {
        ...mapActions(['saveRouteParams']),
        setTimeout(fn, timeout) {
          this.timeouts.push(setTimeout(fn, timeout));
        },
        setInterval(fn, delay) {
          this.interval.push(setInterval(fn, delay));
        },
      },
    });
  },
};
