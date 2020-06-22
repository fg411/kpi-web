import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import 'mand-mobile/components/_style/global';
import 'mand-mobile/lib/mand-mobile.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
