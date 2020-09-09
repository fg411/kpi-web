import Vue from 'vue';
import utils from './_util';

// 例如 18012344321 显示为180****4321
Vue.filter('formatMobile', (value) => {
  const reg = /(\d{3})\d{4}(\d{4})/;
  return value.replace(reg, '$1****$2');
});

// 例如 18012344321 显示为 180 1234 4321
Vue.filter('mobileSpace', (value) => value.replace(/(\d{3})(\d{4})/, '$1 $2 '));

// 例如 2019-12-11 10:11:00 显示为2019-12-11
Vue.filter('date', (value) => value.split(' ')[0]);

// 例如 2019-12-11 10:11:00 显示为10:11:00
Vue.filter('time', (value) => value.split(' ')[1]);

// 例: 20200720 => 2020年7月20日
Vue.filter('dayFormat', (value, local = 'zh') => {
  const date = value || new Date();
  const time = utils.DateStrFormat(date);
  // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', };
  const options = { year: 'numeric', month: 'long' };
  return time.toLocaleDateString(local, options);
});

Vue.filter('postSimplify', (value) => {
  if (!value) {
    return '';
  }
  const prefix = value.indexOf('（');
  const suffix = value.indexOf('）');
  const target = value.substring(prefix, suffix + 1);
  let str = value;
  if (prefix !== -1 && suffix !== -1) {
    str = value.replace(target, '');
  }
  return str.trim();
});
