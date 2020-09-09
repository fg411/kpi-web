const path = require('path');
const poststylus = require('poststylus');
const pxtorem = require('postcss-pxtorem');

const resolve = (file) => path.resolve(__dirname, file);

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';
// 本地环境是否需要使用cdn
const devNeedCdn = false;
// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex'
  },
  css: [],
  // cdn的js链接
  js: [
    'https://unpkg.com/vue@2.6.11/dist/vue.min.js',
    'https://unpkg.com/vue-router@3.2.0/dist/vue-router.min.js',
    'https://unpkg.com/vuex@3.4.0/dist/vuex.min.js',
  ]
};

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'kpiweb',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      stylus: {
        use: [
          poststylus([
            pxtorem({
              rootValue: 72,
              propWhiteList: [],
              minPixelValue: 2,
            }),
            'autoprefixer',
          ]),
        ],
        import: [
          resolve('./src/assets/theme.custom'),
        ],
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 72,
            propWhiteList: [],
            minPixelValue: 2,
          }),
          require('autoprefixer')(),
        ],
      },
    },
  },
  transpileDependencies: [
    'mand-mobile',
  ],
  devServer: {
    open: true,
    port: 8881,
    proxy: {
      '/api': {
        target: 'http://kpicc.ncbmip.com:8080/kpi',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  chainWebpack: config => {
    // ============注入cdn start============
    config.plugin('html').tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn
      return args
    })
    // ============注入cdn start============
  },
  configureWebpack: config => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || devNeedCdn) config.externals = cdn.externals
  }
};
