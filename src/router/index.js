import Vue from 'vue'
import Router from 'vue-router'

import {routers} from '@/router/router'

Vue.use(Router)

const router = new Router({
  routes:routers,
  // mode: 'history', //去除根路由#
});

router.beforeEach((to, from, next) => {
  if (localStorage['roleplay-token']) {// 判断是否登录
    next()
  } else {// 没登录则跳转到登录界面
    next({
      path: '/login'
    })
  }
})

export default router;
