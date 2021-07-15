import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// import axios from 'axios'
import '../public/global.css'
import '../src/assets/iconfont/iconfont.css'

Vue.config.productionTip = false

// 格式化播放量
Vue.filter('dataFormat', function (val) {
  val = Number(val) || 0
  return val > 10000 ? Math.round(val / 10000) + '万' : val
})

// 格式化歌曲时长(毫秒)
Vue.filter('timeFormat', function (val) {
  var total = val / 1000
  var m = Math.floor(total / 60)
  m = m < 10 ? '0' + m : m
  var s = Math.floor(total % 60)
  s = s < 10 ? '0' + s : s
  return m + ':' + s
})

// 格式化歌曲时长(秒数)
Vue.filter('timeFormat1', function(val) {
  var m = Math.floor(val / 60)
  m = m < 10 ? '0' + m : m
  var s = Math.floor(val % 60)
  s = s < 10 ? '0' + s : s
  return m + ':' + s
})

// 格式化时间
Vue.filter('dateFormat', function(date) {
  var d = new Date(date)
  var year = d.getFullYear() + '年'
  var month = '' + (d.getMonth() + 1) + '月'
  var day = '' + d.getDate() + '日'
  var hour = '' + d.getHours()
  var minute = '' + d.getMinutes()

  if (month.length < 2) {
    month = '0' + month
  }
  if (day.length < 2) {
    day = '0' + day
  }
  if (hour.length < 2) {
    hour = '0' + hour
  }
  if (minute.length < 2) {
    minute = '0' + minute
  }

  return year + month + day + ' ' + hour + ':' + minute
})

Vue.filter('dateFormat1', function(date) {
  var d = new Date(date)
  var year = d.getFullYear()
  var month = '' + (d.getMonth() + 1)
  var day = '' + d.getDate()

  if (month.length < 2) {
    month = '0' + month
  }
  if (day.length < 2) {
    day = '0' + day
  }

  return year + '-' + month + '-' + day
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
