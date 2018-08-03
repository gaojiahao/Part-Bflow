import { request } from './fetch';

/************  用户  **************/

/**
 * @author XiaoYing
 * @description 获取user上级用户数据
 */
export const getHighUserData = (userId, pageSize, currentPage) => request('/H_roleplay-si/ds/getSuperior', {
    userId: userId,
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user下级用户数据
 */
export const getLowUserData = (userId, pageSize, currentPage) => request('/H_roleplay-si/ds/getSubordinate', {
    userId: userId,
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user部门数据
 */
export const getDepartmentData = (userId, pageSize, currentPage) => request('/H_roleplay-si/ds/getUserGroupByUserId', {
    userId: userId,
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user职位数据
 */
export const getRoleData = (userId, pageSize, currentPage) => request('/H_roleplay-si/ds/getUserRoleByUserId', {
    userId: userId,
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user直接权限数据
 */
export const getDirectPermissionData = (userId, pageSize, currentPage) => request('/H_roleplay-si/ds/getObjectPermission2Oneself', {
    objectName: 'user',
    objectId: userId,
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user间接权限数据
 */
export const getIndirectPermissionData = (userId, pageSize, currentPage) => request('/H_roleplay-si/ps/getUserOrGroupPermissionById', {
    userId: userId,
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取所有用户数据
 */
export const getAllUsers = (pageSize, currentPage) => request('/H_roleplay-si/ds/getAllUsers', {
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 添加上级用户
 */
export const updateHighUser = (userId, parentId) => request('/H_roleplay-si/userInfo/updateParentId', {
    list: 'sys_userinfo',
    userId: userId,
    parentId: parentId
});

/**
 * @author XiaoYing
 * @description 获取组织部门数据
 */
export const getGroupData = (parentId) => request('/H_roleplay-si/ds/getUserGroupByParentId', {
    parentId: parentId
});

/**
 * @author XiaoYing
 * @description 添加组织部门
 */
export const addGroupMember = (groupId, userId) => request('/H_roleplay-si/ds/saveData', {
    list: 'sys_group_user',
    groupId: groupId,
    userId: userId
}, 'POST');

/**
 * @author XiaoYing
 * @description 获取所有职位数据
 */
export const getAllRoleData = (pageSize, currentPage) => request('/H_roleplay-si/ds/getRoleList2', {
    page: currentPage,
    limit: pageSize
});

/**
 * @author XiaoYing
 * @description 添加职位
 */
export const addRoleMember = (single, multi) => request('/H_roleplay-si/ps/updateRelation', {
    list: 'sys_user_role',
    multi: multi,
    single: single
}, 'POST');

/**
 * @author XiaoYing
 * @description 获取所用权限数据
 */
export const getAllPermissionData = (parentId) => request('/H_roleplay-si/ds/getPermissionListByParentId', {
    parentId: parentId
});

/**
 * @author XiaoYing
 * @description 添加权限
 */
export const addIndirPermission = (single, multi) => request('/H_roleplay-si/ps/updatePermissionRelation', {
    list: 'sys_user_permission',
    multi: multi,
    single: single
}, 'POST');

/**
 * @author XiaoYing
 * @description 删除权限
 */
export const deleteIndirPermission = (single, multi) => request('/H_roleplay-si/ps/deletePermissionRelation', {
    list: 'sys_user_permission',
    multi: multi,
    single: single
});

/**
 * @author XiaoYing
 * @description 获取用户详情信息
 */
export const getUserInfoById = (userId) => request('/H_roleplay-si/ds/getUserInfoById', {
    userId: userId
});

/**
 * @author XiaoYing
 * @description 更新用户
 */
export const updateUser = (params) => request('/H_roleplay-si/userInfo/updateUser', {}, 'POST', params);

/**
 * @author XiaoYing
 * @description 新增用户
 */
export const addUser = (params) => request('/H_roleplay-si/userInfo/addUser', {}, 'POST', params);

/**
 * @author XiaoYing
 * @description 获取用户相关实例数量
 */
export const getInstanceCountByUserId = (userId) => request('/H_roleplay-si/app/getObjDetailsCountByUserId', {
    userId: userId
});


/************  组织  **************/

/**
 * @author GuoZheng
 * @description 获取组织成员信息
 */
export const getUsersByGroupId = (groupId, currentPage, pageSize) => request('/H_roleplay-si/ds/getUsersByGroupId', {
    groupId: groupId,
    page: currentPage,
    limit: pageSize,
    start: 0,
});

/**
 * @author GuoZheng
 * @description 获取组织权限
 */
export const getObjectPermission2Oneself = (objectName, objectId, currentPage, pageSize) => request('/H_roleplay-si/ds/getObjectPermission2Oneself', {
    objectName: objectName,
    objectId: objectId,
    page: currentPage,
    limit: pageSize,
    start: 0,
});

/**
 * @author GuoZheng
 * @description 获取用户列表
 */
export const listUsers = (currentPage, pageSize) => request('/H_roleplay-si/ds/listUsers', {
    entityId: 20000,
    page: currentPage,
    limit: pageSize,
    start: 0,
});

/**
 * @author GuoZheng
 * @description 添加组织权限
 */
export const addOrgPermission = (single, multi) => request('/H_roleplay-si/ps/updatePermissionRelation', {
    list: 'sys_group_permission',
    multi: multi,
    single: single
}, 'POST');

/**
 * @author GuoZheng
 * @description 删除组织权限
 */
export const deleteOrgPermission = (single, multi) => request('/H_roleplay-si/ps/deletePermissionRelation', {
    list: 'sys_group_permission',
    multi: multi,
    single: single
});

/**
 * @author GuoZheng
 * @description 添加组织成员
 */
export const addOrgMember = (single, multi) => request('/H_roleplay-si/ps/updateRelation', {
    list: 'sys_group_user',
    multi: multi,
    single: single,
}, 'POST');

/**
 * @author GuoZheng
 * @description 删除组织成员
 */
export const deleteOrgMember = (single, multi) => request('/H_roleplay-si/ps/deleteRelation', {
    list: 'sys_group_user',
    multi: multi,
    single: single,
}, 'POST');

/**
 * @author GuoZheng
 * @description 删除组织成员
 */
export const getAllGroup = (currentPage, pageSize, filter) => request('/H_roleplay-si/ds/getAllGroup', {
    page: currentPage,
    limit: pageSize,
    filter: filter,
    start: 0,
});

/**
 * @author GuoZheng
 * @description 添加上级组织
 */
export const saveHighOrg = (parentId, groupId) => request('/H_roleplay-si/userInfo/saveGroup', {
    parentId: parentId,
    groupId: groupId,
}, "POST");

/**
 * @author GuoZheng
 * @description 添加下级组织
 */
export const saveBatchChildGroup = (parentId, childrenId) => request('/H_roleplay-si/userInfo/saveBatchChildGroup', {
    parentId: parentId,
    childrenId: childrenId,
}, "POST");

/**
 * @author GuoZheng
 * @description 删除下级组织
 */
export const deleteBatchGroup = (groupId) => request('/H_roleplay-si/userInfo/deleteBatchGroup', {
    groupId: groupId,
}, "POST");

/**
 * @author GuoZheng
 * @description 获取组织基本信息
 */
export const getOrgBaseInfo = (filter) => request('/H_roleplay-si/ds/getAllGroup', {
    filter: filter,
});

/**
 * @author GuoZheng
 * @description 保存组织基本信息
 */
export const saveBaseinfo = (data) => request('/H_roleplay-si/sysGroup/save', {},"POST",data);


/**
 * @author GuoZheng
 * @description 获取用户列表
 */
export const getTableData = (url, params) => request('/H_roleplay-si' + url, params);

/*
 * @author snack.huang
 * @description 获取所有组织 [管理层、事业部、部门、小组]
 */
export const getOrganizations = (pageInfo) => request('/H_roleplay-si/ds/getAllGroup', pageInfo);




/************  职位  **************/
/**
 * @author GuoZheng
 * @description 获取组织基本信息
 */
export const getAllRole = (filter) => request('/H_roleplay-si/ds/getAllRole', {
    filter: filter,
});




/************  职位  **************/



/************  公司  **************/

/**
 * @author zhaohuai
 * 根据公司Id获取所属成员信息
 */
export const getCompanyMemberByCompanyId = (currentPage, pageSize) => request('/H_roleplay-si/ds/listUsers', {
    entityId: 20000,
    page: currentPage,
    limit: pageSize,
    start: 0,
});

/**
 * @author zhaohuai
 * 根据公司id获取公司信息
 * 
 */
export const getCompanyInfoByGroupId = (groupId) => request('/H_roleplay-si/ds/getGroupById', {
    groupId: groupId
})
/**
 * @author zhaohuai
 * 保存公司基本信息
 */
export const saveCompanyInfo = (data) => {
    let {
        groupName,
        groupShortName,
        depFunction,
        status,
        comment,
        groupCode
    } = data
    return request('/H_roleplay-si/userInfo/saveGroup', {
        groupName: groupName,
        groupShortName: groupShortName,
        depFunction: depFunction,
        status: status,
        comment: comment,
        list: 'sys_group',
        groupType: 'C',
        parentId: '1',
        groupCode: groupCode
    }, "POST");
};
/************  公司  **************/