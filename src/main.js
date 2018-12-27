import Vue from 'vue'
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import fontIcon from './assets/App.css';
import { deepstream } from './plugin/deepstream';

import './plugin/jquery-vender.js'
import './plugin/jqorg/js/jquery.min.js'
import './plugin/jqorg/js/jquery.orgchart.js'

import "./plugin/jqorg/css/font-awesome.min.css"
import "./plugin/jqorg/css/jquery.orgchart.css"
import "./plugin/jqorg/css/style.css"

require('@/directive/index');
require('@/filter/index');
require('./assets/App.css');

import { getCurrentUserInfo } from "@/services/flowService";

Vue.config.productionTip = false;

Vue.use(iView);
let cache = window.sessionStorage.getItem('roletask.com.r2.cache');
 if(cache){
    init(cache);
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }else{
  getCurrentUserInfo().then(async (res) => {
    if (res) {
  
      let user = res;
          user.isAdmin =false;
  
      user.isSysRoleList.map(role=>{
        if(role.id === 1){
          user.isAdmin = true;
        }
      });
      Vue.prototype.$currentUser = res;
      
      Vue.prototype.$deepstream = await deepstream(res);
      /* eslint-disable no-new */
      new Vue({
        el: '#app',
        router,
        components: { App },
        template: '<App/>'
      })
    }
  })
}
 function init(cache){
      let  data = cache?JSON.parse(cache):{};
      Vue.prototype.$currentUser = data['currentUser'];
      Vue.prototype.$deepstream =  deepstream(data['currentUser']);
}


