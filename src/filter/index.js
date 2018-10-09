import Vue from 'vue'
import dateFormatFilter from '@/filter/dateFormatFilter'
import toFixedFilter from '@/filter/toFixedFilter'

Vue.filter('dateFormatFilter',dateFormatFilter)
Vue.filter('toFixedFilter', toFixedFilter)