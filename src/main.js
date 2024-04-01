import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import AFTableColumn from 'af-table-column'
Vue.use(AFTableColumn)

import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import viewFullScreen from "view-full-screen"
Vue.use(viewFullScreen)

// export const eventBus = new Vue();

/*
import { detectZoom } from '@/utils/detectZoom.js';
const m = detectZoom();
document.body.style.zoom = 100 / Number(m);
*/





/*import BaiduMap from 'vue-baidu-map'
Vue.prototype.$echarts = echarts
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key *!/
  ak: 'ZlgTYsyV08aajZSuH7uEAFbvsWgLKfA4'
})*/

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明


import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
