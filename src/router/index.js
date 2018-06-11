import Vue from 'vue'
import Router from 'vue-router'

import {routers} from '@/router/router'

Vue.use(Router)

export default new Router({
  routes:routers,
  // mode: 'history', //去除根路由#
})
