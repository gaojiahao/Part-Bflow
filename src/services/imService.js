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


/**
 * @author snack.haugng
 * @description 通过群ID获取群成员
 */
export const getMembers = (groupId) => request('/H_roleplay-si/im/group/getMembers',{groupId:groupId})

/**
 * @author snack.haugng
 * @description 签收消息
 */
export const checkMessage = (groupId) => request('/H_roleplay-si/im/message/check?groupId='+groupId,{},'POST',{})


/**
 * @author XiaoYing
 * @description 查看消息的阅读情况
 */
export const getMsgCheckStatus = (msgId, checkType) => request('/H_roleplay-si/im/message/getMsgCheckStatus',{
  msgId: msgId,
  checkType: checkType
})

/**
 * @author XiaoYing
 * @description 设置群名称
 */
export const setGroupName = (groupId, name) => request('/H_roleplay-si/im/group/setName',{
  groupId: groupId,
  name: name
},'POST')

/**
 * @author XiaoYing
 * @description 添加成员
 */
export const addMember = (groupId, users) => request('/H_roleplay-si/im/group/addMember',{
  groupId: groupId,
  users: users
},'POST')




