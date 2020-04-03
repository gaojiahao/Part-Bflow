import { request } from './fetch'

/**
 * @author snack.haugng
 * @description 获取当前用户关联群聊，单聊
 */
export const getMyImGroups = () => request('/H_roleplay-si/im/group/getMyGroups')


/**
 * @author snack.haugng
 * @description 获取当前用户关联群聊，单聊信息内容
 */
export const getMessagesByGroupId = (groupId) => request('/H_roleplay-si/im/message/getGroupMessage',{ groupId:groupId })


/**
 * @author snack.haugng
 * @description 保存消息
 */
export const sendMessage = (params) => request('/H_roleplay-si/im/message/save',{},'POST',params)



