import Vue from 'vue'
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import fontIcon from './assets/App.css';

require('@/directive/index');
require('@/filter/index');
require('./assets/App.css');

import { getCurrentUserInfo } from "@/services/flowService";
import VueWechatTitle from 'vue-wechat-title';

Vue.config.productionTip = false;

Vue.use(iView,{
  size: 'small'
});
Vue.use(VueWechatTitle);


if(window.top.r2){
  Vue.prototype.$currentUser = window.top.r2.global.WebContext.currentUser;
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
}else{
  getCurrentUserInfo().then(res => {
    if (res) {
      Vue.prototype.$currentUser = res;
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

