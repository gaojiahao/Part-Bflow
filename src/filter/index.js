import Vue from 'vue'
import dateFilter from '@/filter/dateFilter'
import numFixedFilter from '@/filter/numFixedFilter'

Vue.filter('dateFilter',dateFilter)
Vue.filter('numFixedFilter',numFixedFilter)