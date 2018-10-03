
import { request } from './fetch'

/**
 * @author snack.haugng
 * @description 用户订阅应用或者实例
 */
export const subscribeApp = (data) => request('/H_roleplay-si/comment/subscribeApp', data,'POST')

/**
 * @author snack.haugng
 * @description 获取订阅信息
 */
export const getMySubscribe = (params) => request('/H_roleplay-si/comment/getMySubscribe', params, 'POST')

/**
 * @author snack.haugng
 * @description 取消订阅
 */
export const unsubscribeApp = (data) => request('/H_roleplay-si/comment/unsubscribeApp', data, 'POST')

/**
 * @author snack.haugng
 * @description 取消订阅
 */
export const unsubscribeAppByRelationKey = (data) => request('/H_roleplay-si/comment/unsubscribeAppByRelationKey', data, 'POST')



/**
 * @author snack.haugng
 * @description 获取某订阅内容的所有订阅用户
 */
export const getUserByRelationKey = (params) => request('/H_roleplay-si/comment/getUserByRelationKey', params)

/**
 * @author snack.haugng
 * @description 判断是否已经定于某内容
 */
export const judgeIsSubscribeByRelationKey = (prarms) => request('/H_roleplay-si/comment/isSubscribeByRelationKey', prarms)


