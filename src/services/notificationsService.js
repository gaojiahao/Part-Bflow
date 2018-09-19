import { request } from './fetch'

/**
 * @author snack.haugng
 * @description 获取用户所有评论消息
 */
export const getAllnotifications = (prarms) => request('/H_roleplay-si/comment/getCommentMessage', prarms)


/**
 * @author snack.haugng
 * @description 刷新用户阅读通知的时间
 */
export const refreshUserReadtime = () => request('/H_roleplay-si/comment/refreshUserReadtime', {},'POST')

