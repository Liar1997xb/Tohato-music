import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Message
} from 'element-ui'

const discovery = () => import('../views/Discovery/Discovery.vue')
const video = () => import('../views/Video.vue')
const friends = () => import('../views/Friends.vue')
const stream = () => import('../views/Stream.vue')
const fm = () => import('../views/Fm.vue')
const search = () => import('../components/common/Search.vue')
const account = () => import('../components/common/Account/Account.vue')
const songListDetail = () => import('../components/common/SongListDetail.vue')
const mvDetail = () => import('../components/common/MvDetail.vue')
const singerDetail = () => import('../components/common/SingerDetail.vue')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/discovery'
  },
  {
    path: '/discovery',
    name: 'discovery',
    component: discovery
  },
  {
    path: '/video',
    name: 'video',
    component: video
  },
  {
    path: '/friends',
    name: 'friends',
    component: friends,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stream',
    name: 'stream',
    component: stream
  },
  {
    path: '/fm',
    name: 'fm',
    component: fm,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/account',
    name: 'account',
    component: account,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/songListDetail',
    name: 'songListDetail',
    component: songListDetail
  },
  {
    path: '/mvDetail',
    name: 'mvDetail',
    component: mvDetail
  },
  {
    path: '/singerDetail',
    name: 'singerDetail',
    component: singerDetail
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行   next('./xxx') 强制跳转
  if (to.meta.requiresAuth) {
    const loginToken = (JSON.parse(window.sessionStorage.getItem('vuex'))).token
    if (loginToken) {
      next();
    } else {
      Message({
        message: '该页面需要登录才能访问',
        type: 'warning'
      })
      return next(from)
    }
  }
  next()
})

// 屏蔽重复点击搜索路由的报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
