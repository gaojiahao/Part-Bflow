
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
 * @description 取消订阅 通过关系ID取消订阅
 */
export const unsubscribeAppByRelationKey = (data) => request('/H_roleplay-si/comment/unsubscribeAppByRelationKey', data, 'POST')



/**
 * @author snack.haugng
 * @description 获取某订阅内容的所有订阅用户
 */
export const getUserByRelationKey = (params) => request('/H_roleplay-si/comment/getUserByRelationKey', params)

/**
 * @author snack.haugng
 * @description 判断是否已经订阅
 */
export const judgeIsSubscribeByRelationKey = (prarms) => request('/H_roleplay-si/comment/isSubscribeByRelationKey', prarms)

/**
 * @author XiaoYing
 * @description 订阅用户
 */
export const addSubscribeUsers = (data) => request('/H_roleplay-si/comment/subscribeBatchByRelationKey', data, 'POST')

/**
 * @author XiaoYing
 * @description 退订用户
 */
export const deleteSubscribeUsers = (data) => request('/H_roleplay-si/comment/unsubscribeBatchByRelationKey', data, 'POST')


/**
 * @author guozheng
 * @description 上传图片
 */
export const uploadImage = (data) => request('/H_roleplay-si/ds/upload_image', {}, 'POST',data)

/**
 * @author guozheng
 * @description 获取所有用户数据
 */
export const getAllUsers = (pageSize, currentPage, filter) => request('/H_roleplay-si/ds/getAllUsers', {
    page: currentPage,
    limit: pageSize,
    filter: filter
  });