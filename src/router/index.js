import Vue from 'vue'
import Router from 'vue-router'

import {routers} from '@/router/router'
import { deepstream } from '@/plugin/deepstream'

Vue.use(Router)

export const router = new Router({
  routes: routers,
  // mode: 'history' //去除根路由#
});


router.beforeEach((to, from, next) => {
  if (!Vue.prototype.$currentUser && to.name !== 'login' && to.name !== 'userActivate') {
    let userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      init(userInfo)
      next()
    } else {
      console.log('没有获取用户信息');
      next({
        name: 'login'
      })
    }
  }else{
    next()
  }
  
})

async function init (userInfo) {
  let dsUri = JSON.parse(window.localStorage.getItem('r2-cached-properties')).deepStreamUrl;
  let currentUser = userInfo ? JSON.parse(userInfo) : {};
  currentUser.isAdmin = false;
  currentUser.isBusinessAdmin = false;
  currentUser.isOperationAdmin = false;
  currentUser.isSysRoleList.map(role => {
    // 企业管理员
    if (role.id === 1) {
      currentUser.isBusinessAdmin = true;
    }
    // 运营管理员
    if (role.id === -1) currentUser.isOperationAdmin = true;
  })
  
  Vue.prototype.$currentUser = currentUser
  Vue.prototype.$deepstream = await deepstream(currentUser, dsUri)
}
