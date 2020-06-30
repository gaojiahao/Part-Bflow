import Vue from 'vue'
import App from './App'
import {router} from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import VueLazyload from 'vue-lazyload'
// import Loading from './components/loading/index.js'

import './plugin/jquery-vender.js'
import './plugin/jqorg/js/jquery.min.js'
import './plugin/jqorg/js/jquery.orgchart.js'

import "./plugin/jqorg/css/font-awesome.min.css"
import "./plugin/jqorg/css/jquery.orgchart.css"
import "./plugin/jqorg/css/style.css"

require('@/directive/index')
require('@/filter/index')
require('./assets/App.css')

Vue.config.productionTip = false
// Vue.use(Loading)
Vue.use(VueLazyload)
Vue.use(ViewUI)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


