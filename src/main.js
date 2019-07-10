import Vue from 'vue'
import App from './App';
import  {router} from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import '../my-theme/index.less';
import fontIcon from './assets/App.css';
import { deepstream } from './plugin/deepstream';
import VueLazyload from 'vue-lazyload'

import './plugin/jquery-vender.js'
import './plugin/jqorg/js/jquery.min.js'
import './plugin/jqorg/js/jquery.orgchart.js'

import "./plugin/jqorg/css/font-awesome.min.css"
import "./plugin/jqorg/css/jquery.orgchart.css"
import "./plugin/jqorg/css/style.css"

require('@/directive/index');
require('@/filter/index');
require('./assets/App.css');

Vue.config.productionTip = false;
Vue.use(VueLazyload);
Vue.use(iView);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


