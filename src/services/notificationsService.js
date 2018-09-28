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
export const readNotice = (listId) => request('/H_roleplay-si/comment/readNotice', { listId: listId},'POST')


/**
 * @author snack.haugng
 * @description 获取应用菜单
 */
export const getNavListByMessage = (prarms) => request('/H_roleplay-si/comment/getNavListByMessage',  prarms)

/**
 * @author snack.haugng
 * @description 获取应用的所有附件或者图片
 */
export const getAttachmentByListId = (prarms) => request('/H_roleplay-si/comment/getAttachmentByListId', prarms)

/**
 * @author snack.haugng
 * @description 获取所有工作流任务
 */
export const getAllWorkFlowTasks = (prarms) => request('/H_roleplay-si/ds/getMyTasks', prarms)







