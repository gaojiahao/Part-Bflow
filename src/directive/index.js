import Vue from 'vue'
import instanceStateDirective from '@/directive/instanceStateDirective'
import overTimeDirective from '@/directive/overTimeDirective'
import scrollDirective from '@/directive/scrollDirective'

Vue.directive('instanceStateDirective', instanceStateDirective)
Vue.directive('overTimeDirective', overTimeDirective)
Vue.directive('scrollDirective', scrollDirective)