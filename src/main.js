import Vue from '../node_modules/.2.5.16@vue';
import App from './App';
import router from './router';
import iView from '../node_modules/.3.0.0@iview';
import 'iview/dist/styles/iview.css';
import fontIcon from './assets/App.css';

require('@/directive/index');
require('@/filter/index');
require('./assets/App.css');

import { getCurrentUserInfo } from "@/services/flowService";
import VueWechatTitle from 'vue-wechat-title';

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(VueWechatTitle);

let Hub = new Vue();

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

