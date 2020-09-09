import Vue from 'vue';
import VueRouter from 'vue-router';
import { Toast } from 'mand-mobile';
import Utils, { isWxBrowser } from '@/libs/_util/index';
import Home from '../views/Home.vue';
import store from '../store/index';
import login from '../libs/login';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/index',
    name: 'Index',
    component: () => Home,
    children: []
  },
  {
    path: '/unusual/:msg',
    name: 'Unusual',
    meta: { auth: false },
    component: () => import('../components/Unusual.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Home,
    meta: { auth: true },
    children: [
      {
        path: '/mine',
        name: 'Mine',
        meta: { title: '南商（中国）员工专业能力评价' },
        component: () => import('../views/pages/Mine.vue')
      },
      {
        path: '/manager',
        name: 'Manager',
        meta: { title: '南中专业能力评价' },
        component: () => import('../views/pages/Manager.vue')
      },
      {
        path: '/comcm', // P001-企金客户经理分行
        name: 'ComCm',
        meta: { title: '细项指标' },
        component: () => import(/* webpackChunkName: "quotaDetail" */ '../views/pages/Quota/ComCM.vue')
      },
      {
        path: '/comglobpm', // P002-企金总行产品经理
        name: 'ComGlobPm',
        meta: { title: '细项指标' },
        component: () => import(/* webpackChunkName: "quotaDetail" */ '../views/pages/Quota/ComGlobPM.vue')
      },
      {
        path: '/compm', // P003-企金分行产品经理
        name: 'ComPm',
        meta: { title: '细项指标' },
        component: () => import(/* webpackChunkName: "quotaDetail" */ '../views/pages/Quota/ComPM.vue')
      },
      {
        path: '/comdesell', // P004-展业支持营销管理岗
        name: 'ComDeSell',
        meta: { title: '细项指标' },
        component: () => import(/* webpackChunkName: "quotaDetail" */ '../views/pages/Quota/ComDESell.vue')
      },
      {
        path: '/comwhsell', // P005-企金统筹支持营销管理岗
        name: 'ComWhSell',
        meta: { title: '细项指标' },
        component: () => import(/* webpackChunkName: "quotaDetail" */ '../views/pages/Quota/ComWHSell.vue')
      },
      {
        path: '/percm', // P006-个金客户经理
        name: 'PerCm',
        meta: { title: '细项指标' },
        component: () => import(/* webpackChunkName: "quotaDetail" */ '../views/pages/Quota/PerCM.vue')
      },
      {
        path: '/perpm', // P007-个金分行产品经理
        name: 'PerBrPm',
        meta: { title: '细项指标' },
        // route level code-splitting
        // this generates a separate chunk (quotaDetail.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "quotaDetail" */ '../views/pages/Quota/PerBrPM.vue')
      },
      {
        path: '/perSell', // P008-个金营销管理类
        name: 'PerSell',
        meta: { title: '细项指标' },
        component: () => import(/* webpackChunkName: "quotaDetail" */ '../views/pages/Quota/PerSell.vue')
      },
      {
        path: '/quota',
        name: 'Quota',
        meta: { title: '细项指标' },
        component: () => import('../views/pages/QuotaDetail.vue')
      },
      {
        path: '/post/:posId',
        name: 'PostDetail',
        meta: { title: '岗位数据' },
        component: () => import('../views/pages/PostDetail.vue')
      },
      {
        path: '/branch',
        name: 'BranchDetail',
        meta: { title: '分行数据' },
        component: () => import('../views/pages/BranchDetail.vue')
      },
      {
        path: '/qa',
        name: 'QA',
        meta: { title: '问答助手' },
        component: () => import('../views/pages/QA.vue')
      }
    ]
  }
];

const getQueryString = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = process.env.NODE_ENV === 'production'
    ? window.location.search.substr(1).match(reg)
    : window.location.hash.substr(8).match(reg);
  // const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return r[2];
  }
  return null;
};

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // console.log(window.location.search);
  // console.log(window.location.hash);
  // console.log(to);
  if (process.env.NODE_ENV === 'production' && !isWxBrowser()) {
    next({ path: '/unusual/请在企业微信中打开' });
    return;
  }
  store.commit('setToRoute', from.path);
  const urlCode = getQueryString('code');
  const code = Utils.storage_get('code');
  document.title = to.meta.title || '南中专业能力评价';

  if (to.meta.auth === false) {
    next();
  } else if (to.path === '/index' && urlCode) {
    Utils.storage_set('code', urlCode, 10 * 60);
    login((res) => {
      const { state, msg } = res;
      if (state) {
        // next({ path: '/mine', replace: true });
        const url = store.state.isManager ? '/manager' : '/mine';
        next({ path: url, replace: true });
        return;
      }
      Toast.failed(msg);
      next({ path: `/unusual/${msg}`, replace: true });
    });
    // next({ name: 'Index' });
  } else if (!code) {
    next({ path: '/unusual/用户未认证' });
    // next();
  } else {
    Utils.storage_set('code', code, 30 * 60);
    next();
  }
});

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
  // if (isChunkLoadFailed) {
  // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，
  // 而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，
  // 从而曲线救国解决该问题
  // location.reload();
  // const targetPath = router.history.pending.fullPath;
  // router.replace(targetPath);
  // }
});

export default router;
