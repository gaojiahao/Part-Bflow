import {request} from './fetch'

/**
 * @author XiaoYing
 * @description 获取应用模板数据
 */
// export const getAppTemplateData = () =>  request('../mock/appList/appData.json');//mock
export const getAppTemplateData = () =>  request('/H_roleplay-si/ds/getTplTempListInfo');

/**
 * @author XiaoYing
 * @description 获取应用列表数据
 */
// export const getAppListData = () =>  request('../mock/appList/appList.json');//mock
export const getAppListData = (params) =>  request('/H_roleplay-si/ds/getTplListInfo', {filter: params});

/**
 * @author XiaoYing
 * @description 获取应用导航数据
 */
export const getNavData = (params) =>  request('/H_roleplay-si/ds/list/getMenuByParentId', params);

/**
 * @author XiaoYing
 * @description 获取所有流程数据
 */
export const getAllProcessData = (params) =>  request('/H_roleplay-si/ds/getDeployedProcess',params);

/**
 * @author XiaoYing
 * @description 获取应用流程数据
 */
export const getProcessDataByListId = (params) =>  request('/H_roleplay-si/ds/list/getProcessByListId',params);

/**
 * @author XiaoYing
 * @description 获取管理员数据
 */
export const getAdminData = (params) =>  request('/H_roleplay-si/ds/getAllUsersByGroupId',params);

/**
 * @author XiaoYing
 * @description 获取所有权限数据
 */
export const getAllPermissionData = (params) =>  request('/H_roleplay-si/ds/getPermissionByListId',params);

/**
 * @author XiaoYing
 * @description 获取用户、组织、职位所有数据
 */
export const getAllUserData = (params) =>  request('/H_roleplay-si/ds/getUserList2', params);
export const getAllOrgData = (params) =>  request('/H_roleplay-si/ds/getDepartment', params);
export const getAllDepartmentData = (params) =>  request('/H_roleplay-si/ds/getRoleList2', params);

/**
 * @author XiaoYing
 * @description 增加权限
 */
export const addPermission= (params) =>  request('/H_roleplay-si/ps/insertObjPermission', params, 'POST');

/**
 * @author XiaoYing
 * @description 获取对应应用用户、组织、职位所有权限数据
 */
export const getAppResourcesAndAuthoritys = (listId) => request('/H_roleplay-si/ds/getAppResourcesAndAuthoritys',{'listId':listId})

export const getAppUserPermissionData = (params) =>  request('/H_roleplay-si/ds/getAppResourcesAndAuthority', params);
export const getAppOrgPermissionData = (params) =>  request('/H_roleplay-si/ds/getAppResourcesAndAuthority', params);
export const getAppDepartmentPermissionData = (params) =>  request('/H_roleplay-si/ds/getAppResourcesAndAuthority', params);

/**
 * @author XiaoYing
 * @description 删除用户、组织、职位某一权限
 */
export const deleteRelationPermission= (params) =>  request('/H_roleplay-si/ps/deleteRelation', params, 'POST');

/**
 * @author XiaoYing
 * @description 获取应用信息
 */
export const getListData= (params) =>  request('/H_roleplay-si/ds/list/getListById', params);

/**
 * @author XiaoYing
 * @description 发布应用
 */
export const publishApp= (params) =>  request('/H_roleplay-si/app/publish', params, 'POST');

/**
 * @author XiaoYing
 * @description 添加模板应用
 */
export const addTemplateApp= (params) =>  request('/H_roleplay-si/app/saveList', {}, 'POST', params);

/**
 * @author XiaoYing
 * @description 删除应用
 */
export const deleteApp= (params) =>  request('/H_roleplay-si/ds/procu/removeList', params);

/**
 * @author XiaoYing
 * @description 保存应用信息
 */
export const saveAppInformation = (params) => request('/H_roleplay-si/ds/saveData', params, 'POST');

/**
 * @author XiaoYing
 * @description 获取应用视图
 */
export const getAppviews = (params) => request('/H_roleplay-si/ds/getListViewOrTempViewByUniqueId', params);

/**
 * @author XiaoYing
 * @description 保存工作流信息
 */
export const saveWorkFlowInfo = (params) => request('/H_roleplay-si/ds/saveData', params, 'POST');

/**
 * @author XiaoYing
 * @description 设置默认视图
 */
export const saveDefaultView = (params) => request('/H_roleplay-si/app/setAppDefaultView', params, 'POST');

/**
 * @author XiaoYing
 * @description 删除应用视图
 */
export const deleteAppViews = (params) => request('/H_roleplay-si/app/deleteView', params, 'POST');

/** 
 * @author GUOZHENG
 * 更新日志
*/
export const saveAppLog = (params) => request('/H_roleplay-si/app/saveLog', params,"POST");

/** 
 * @author GUOZHENG
 * 更新日志
*/
export const getChangeLog = (params) => request('/H_roleplay-si/ds/getChangeLog',params);

/** 
 * @author XiaoYing
 * 获取应用科目
*/
export const getAppSubjectData = () =>  request('../mock/appList/appSubject.json');//mock

/** 
 * @author XiaoYing
 * 管理员自评数据获取
*/
export const getAdmintrstorAssessmentData = () =>  request('../mock/appList/adminAssessment.json');//mock