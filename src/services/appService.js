import {
  request
} from './fetch'
import {
  connect
} from 'net';

/**
 * @author XiaoYing
 * @description 获取应用模板数据
 */
export const getAppTemplateData = () => request('/H_roleplay-si/ds/getTplTempListInfo');

/**
 * @author XiaoYing
 * @description 获取应用列表数据
 */
export const getAppListData = (filterParams) => request('/H_roleplay-si/ds/getTplListInfo', {
  filter: filterParams
});

/**
 * @author XiaoYing
 * @description 获取应用导航数据
 */
export const getNavData = (params) => request('/H_roleplay-si/ds/list/getMenuByParentId', params);

/**
 * @author XiaoYing
 * @description 获取所有流程数据
 */
export const getAllProcessData = (params) => request('/H_roleplay-si/ds/getDeployedProcess', params);

/**
 * @author XiaoYing
 * @description 获取应用流程数据
 */
export const getProcessDataByListId = (params) => request('/H_roleplay-si/ds/list/getProcessByListId', params);

/**
 * @author XiaoYing
 * @description 获取管理员数据
 */
export const getAdminData = (groupId) => request('/H_roleplay-si/ds/getAllUsersByGroupId', {
  groupId: groupId
});

/**
 * @author XiaoYing
 * @description 获取所有权限数据
 */
export const getAllPermissionData = (listId, filter) => request('/H_roleplay-si/ds/getPermissionByListId', {
  listId: listId,
  filter: filter
});

/**
 * @author XiaoYing
 * @description 获取用户数据
 */
export const getAllUserData = (currentPage, pageSize, filter) => request('/H_roleplay-si/ds/getUserList2', {
  page: currentPage,
  limit: pageSize,
  filter: filter
});

/**
 * @author XiaoYing
 * @description 获取组织数据
 */
export const getAllOrgData = (currentPage, pageSize, filter) => request('/H_roleplay-si/ds/getDepartment', {
  page: currentPage,
  limit: pageSize,
  filter: filter
});

/**
 * @author XiaoYing
 * @description 获取职位数据
 */
export const getAllDepartmentData = (currentPage, pageSize, filter) => request('/H_roleplay-si/ds/getRoleList2', {
  page: currentPage,
  limit: pageSize,
  filter: filter
});

/**
 * @author XiaoYing
 * @description 增加权限
 */
export const addPermission = (params) => request('/H_roleplay-si/ps/insertObjPermission', {
  userId: params.userId,
  roleId: params.roleId,
  groupId: params.groupId,
  permissionId: params.permissionId
}, 'POST');

/**
 * @author GuoZheng
 * @description 添加视图权限
 */
export const saveViewPermission = (permissionId, userId, groupId, roleId) => request('/H_roleplay-si/ps/updateAppPermission', {
  user: userId,
  group: groupId,
  role: roleId,
  multi: permissionId
}, 'POST');

/**
 * @author XiaoYing
 * @description 获取对应应用用户、组织、职位所有权限数据
 */
export const getAppResourcesAndAuthoritys = (listId, filter) => request('/H_roleplay-si/ds/getAppResourcesAndAuthoritys', {
  listId: listId,
  filter: filter
})

/**
 * @author XiaoYing
 * @description 删除用户、组织、职位某一权限
 */
export const deleteRelationPermission = (params) => request('/H_roleplay-si/ps/deleteRelation', params, 'POST');

/**
 * @author XiaoYing
 * @description 获取应用信息
 */
export const getListData = (uniqueId) => request('/H_roleplay-si/ds/list/getListById', {
  uniqueId: uniqueId
});

/**
 * @author XiaoYing
 * @description 发布应用
 */
export const publishApp = (params) => request('/H_roleplay-si/app/publish', params, 'POST');

/**
 * @author XiaoYing
 * @description 添加模板应用
 */
export const addTemplateApp = (params) => request('/H_roleplay-si/app/saveList', {}, 'POST', params);

/**
 * @author XiaoYing
 * @description 删除应用
 */
export const deleteApp = (params) => request('/H_roleplay-si/ds/procu/removeList', params);

/**
 * @author XiaoYing
 * @description 保存应用信息
 */
export const saveAppInformation = (params) => request('/H_roleplay-si/app/update', {
  uniqueId: params.uniqueId,
  title: params.title,
  administrator: params.administrator,
  comment: params.comment
}, 'POST');

/**
 * @author GuoZheng
 * 获取报表视图
 */
export const getListViewPermission = (viewId) => request('/H_roleplay-si/app/getListViewPermission', {
  viewId: viewId
})

/**
 * @author XiaoYing
 * @description 获取应用视图
 */
export const getAppviews = (params) => request('/H_roleplay-si/ds/getListViewOrTempViewByUniqueId', {
  filter: params.filter
});

/**
 * @author XiaoYing
 * @description 保存工作流信息
 */
export const saveWorkFlowInfo = (params) => request('/H_roleplay-si/ds/saveData', params, 'POST');

/**
 * @author XiaoYing
 * @description 设置默认视图
 */
export const saveDefaultView = (params) => request('/H_roleplay-si/app/setAppDefaultView', {
  viewId: params.viewId,
  listId: params.listId
}, 'POST');

/**
 * @author XiaoYing
 * @description 删除应用视图
 */
export const deleteAppViews = (params) => request('/H_roleplay-si/app/deleteView', {
  viewId: params.viewId,
  listId: params.listId
}, 'POST');

/** 
 * @author GUOZHENG
 * 更新日志
 */
export const saveAppLog = (listId, scope, spendTime, content) => request('/H_roleplay-si/app/saveLog', {
  listId: listId,
  scope: scope,
  spendTime: spendTime,
  content: content
}, "POST");

/** 
 * @author GUOZHENG
 * 更新日志
 */
export const getChangeLog = (listId) => request('/H_roleplay-si/ds/getChangeLog', {
  listId: listId
});

/** 
 * @author XiaoYing
 * 获取应用科目
 */
export const getAppSubjectData = (listId) => request('/corebiz-api/calc/calcRel/findAccountByAppId', {
  app_id: listId
});

/** 
 * @author XiaoYing
 * 管理员自评数据获取
 */
export const getAssessmentByListId = (listId) => request('/H_roleplay-si/ds/getAssessmentByListId', {
  listId: listId
});

/** 
 * @author XiaoYing
 * 管理员自评数据新增
 */
export const saveAssessment = (params) => request('/H_roleplay-si/app/saveAssessment', {
  listId: params.listId,
  chance: params.opportunity,
  achievement: params.result,
  date: params.date,
  id: params.id
}, 'POST');

/** 
 * @author GuoZheng
 * 获取实例数据
 */
export const getInstanceData = (listId, type, date) => request('/H_roleplay-si/trans/getDetails', {
  listId: listId,
  type: type,
  date: date
});

/** 
 * @author XiaoYing
 * 动作权限启用禁用
 */
export const ProhibitApp = (id, permType) => request('/H_roleplay-si/app/ProhibitApp', {
  id: id,
  permType: permType
}, 'POST');

/** 
 * @author XiaoYing
 * 修改权限确认
 */
export const updateMemberPermission = (singleId, multiId, list) => request('/H_roleplay-si/app/updateAppPermission', {
  list: list,
  single: singleId,
  multi: multiId
}, 'POST');

export const downloadImage = (url) => request('/H_roleplay-si/ds/download', {
  url: url
})


/**
 * 
 * @param {String} listId  应用ID
 * @description 获取应用相关应用信息
 */
// export const getRelatedApp = (listId) => request('./mock/appList/related-app.json', {listId: listId});
export const getRelatedApp = (listId) => request('/H_roleplay-si/ds/getAppRelevantExamples', { listId: listId });


