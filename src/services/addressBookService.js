import {request} from './fetch';

/************  用户  **************/

/**
 * @author XiaoYing
 * @description 获取user上级用户数据
 */
export const getHighUserData = (userId,pageSize,currentPage) => request('/H_roleplay-si/ds/getSuperior',{
    userId: userId,
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user下级用户数据
 */
export const getLowUserData = (userId,pageSize,currentPage) => request('/H_roleplay-si/ds/getSubordinate',{
    userId: userId,
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user部门数据
 */
export const getDepartmentData = (userId,pageSize,currentPage) => request('/H_roleplay-si/ds/getUserGroupByUserId',{
    userId: userId,
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user职位数据
 */
export const getRoleData = (userId,pageSize,currentPage) => request('/H_roleplay-si/ds/getUserRoleByUserId',{
    userId: userId,
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user直接权限数据
 */
export const getDirectPermissionData = (userId,pageSize,currentPage) => request('/H_roleplay-si/ds/getObjectPermission2Oneself',{
    objectName: 'user',
    objectId: userId,
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user间接权限数据
 */
export const getIndirectPermissionData = (userId,pageSize,currentPage) => request('/H_roleplay-si/ps/getUserOrGroupPermissionById',{
    userId: userId,
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取所有用户数据
 */
export const getAllUsers = (pageSize,currentPage) => request('/H_roleplay-si/ds/getAllUsers',{
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 添加上级用户
 */
export const updateHighUser = (userId,parentId) => request('/H_roleplay-si/userInfo/updateParentId',{
    list: 'sys_userinfo',
    userId: userId,
    parentId: parentId
});

/**
 * @author XiaoYing
 * @description 获取组织部门数据
 */
export const getGroupData = (parentId) => request('/H_roleplay-si/ds/getUserGroupByParentId',{
    parentId: parentId
});

/**
 * @author XiaoYing
 * @description 添加组织部门
 */
export const addGroupMember = (groupId,userId) => request('/H_roleplay-si/ds/saveData',{
    list: 'sys_group_user',
    groupId: groupId,
    userId: userId
},'POST');

/**
 * @author XiaoYing
 * @description 获取所有职位数据
 */
export const getAllRoleData = (pageSize,currentPage) => request('/H_roleplay-si/ds/getRoleList2',{
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 添加职位
 */
export const addRoleMember = (single,multi) => request('/H_roleplay-si/ps/updateRelation',{
    list: 'sys_user_role',
    multi: multi,
    single: single
},'POST');

/**
 * @author XiaoYing
 * @description 获取所用权限数据
 */
export const getAllPermissionData = (parentId) => request('/H_roleplay-si/ds/getPermissionListByParentId',{
    parentId: parentId
});

/**
 * @author XiaoYing
 * @description 添加权限
 */
export const addIndirPermission = (single,multi) => request('/H_roleplay-si/ps/updatePermissionRelation',{
    list: 'sys_user_permission',
    multi: multi,
    single: single
},'POST');

/**
 * @author XiaoYing
 * @description 删除权限
 */
export const deleteIndirPermission = (single,multi) => request('/H_roleplay-si/ps/deletePermissionRelation',{
    list: 'sys_user_permission',
    multi: multi,
    single: single
});


/************  组织  **************/

/**
 * @author GuoZheng
 * @description 获取组织成员信息
 */
export const getUsersByGroupId = (groupId,currentPage,pageSize) => request('/H_roleplay-si/ds/getUsersByGroupId',{
    groupId: groupId,
    page: currentPage,
    limit: pageSize,
    start:0,
});

/**
 * @author GuoZheng
 * @description 获取组织权限
 */
export const getObjectPermission2Oneself = (objectName,objectId,currentPage,pageSize) => request('/H_roleplay-si/ds/getObjectPermission2Oneself',{
    objectName:objectName,
    objectId: objectId,
    page: currentPage,
    limit: pageSize,
    start:0,
});

/**
 * @author GuoZheng
 * @description 获取用户列表
 */
export const listUsers = (currentPage,pageSize) => request('/H_roleplay-si/ds/listUsers',{
    entityId:20000,
    page: currentPage,
    limit: pageSize,
    start:0,
});

/**
 * @author snack.huang
 * @description 获取所有组织 [管理层、事业部、部门、小组]
 */
export const getOrganizations = (pageInfo) => request('/H_roleplay-si/ds/getAllGroup', pageInfo);




/************  职位  **************/


/************  职位  **************/