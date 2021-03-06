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
export const getMessagesByGroupId = (params) => request('/H_roleplay-si/im/message/getGroupMessage',params)


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
export const checkMessage = (groupId) => request('/H_roleplay-si/im/message/check?groupId='+groupId,{},'POST')


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
export const addMember = (params) => request('/H_roleplay-si/im/group/addMember',params,'POST')

/**
 * @author XiaoYing
 * @description 移除成员
 */
export const removeMember = (params) => request('/H_roleplay-si/im/group/removeMember',params,'POST')

/**
 * @author XiaoYing
 * @description 新增群组
 */
export const createGroup = (params) => request('/H_roleplay-si/im/group/create',params,'POST')

/**
 * @author XiaoYing
 * @description 新增单聊
 */
export const getGroupByUserId = (params) => request('/H_roleplay-si/im/group/getGroupByUserId',params)

/**
 * @author XiaoYing
 * @description 获取通讯录信息
 */
export const getAddressBook = () => request('/H_roleplay-si/im/group/getAllAddressBook?refresh=true')

/**
 * @author XiaoYing
 * @description 搜索通讯录信息
 */
export const getAddressBookName = (name) => request('/H_roleplay-si/im/group/getAddressBookByName',{
  name: name
})

/**
 * @author snack.huang 
 * @description 通过类型获取消息
 */
export const getMessagesByImType = (params) => request('/H_roleplay-si/im/message/getMessageByImType',params);

/**
 * @author XiaoYing
 * @description 用群关键字查询通讯录及我所在的群
 */
export const getGroupsByName = (name) => request('/H_roleplay-si/im/group/getGroupsByName',{
  name: name
})

/**
 * @author XiaoYing
 * @description 消息置顶
 */
export const setFocus = (groupId) => request('/H_roleplay-si/im/group/setFocus',{
  groupId: groupId
},'POST')

/**
 * @author XiaoYing
 * @description 取消消息置顶
 */
export const deleteFocus = (groupId) => request('/H_roleplay-si/im/group/delFocus',{
  groupId: groupId
},'POST')


/**
 * @author snack.huang
 * @description 通过消息ID获取消息所在分页信息
 */
export const getGroupMsgById = (groupId,msgId,limit)=>request('/H_roleplay-si/im/message/getGroupMsgById',{
  groupId:groupId,
  msgId:msgId,
  limit:limit
});



