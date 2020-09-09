import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Utils from './libs/_util/index';
import 'mand-mobile/components/_style/global.styl';
import './libs/_util/inobounce';
import 'normalize.css';
import './libs/filters';
import Mixin from './libs/_util/mixin';

Vue.config.productionTip = false;

Vue.prototype.$utils = Utils;

Vue.use(Mixin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
