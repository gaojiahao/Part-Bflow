import Vue from 'vue'
import dateFormatFilter from '@/filter/dateFormatFilter'
import toFixedFilter from '@/filter/toFixedFilter'
import toThousandFilter from '@/filter/toThousandFilter'

Vue.filter('dateFormatFilter',dateFormatFilter)
Vue.filter('toFixedFilter', toFixedFilter)
Vue.filter('toThousandFilter', toThousandFilter)