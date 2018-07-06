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
export const getNavData = (params) =>  request('/H_roleplay-si/ds/list/getMenuByParentId',  params);

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
export const getAllUserData = () =>  request('/H_roleplay-si/ds/getUserList2');
export const getAllOrgData = () =>  request('/H_roleplay-si/ds/getDepartment');
export const getAllDepartmentData = () =>  request('/H_roleplay-si/ds/getRoleList2');

/**
 * @author XiaoYing
 * @description 增加权限
 */
export const addPermission= (params) =>  request('/H_roleplay-si/ps/insertObjPermission', params, 'POST');

/**
 * @author XiaoYing
 * @description 获取对应应用用户、组织、职位所有权限数据
 */
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