import Vue from 'vue'
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import fontIcon from './assets/App.css';
import { deepstream } from './plugin/deepstream';

require('@/directive/index');
require('@/filter/index');
require('./assets/App.css');

import { getCurrentUserInfo } from "@/services/flowService";

Vue.config.productionTip = false;

Vue.use(iView);

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

