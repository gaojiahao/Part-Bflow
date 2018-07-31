import {request} from './fetch';

/************  用户  **************/

/**
 * @author XiaoYing
 * @description 获取上级用户数据
 */
export const getHighUserData = (userId,pageSize,currentPage) => request('/H_roleplay-si/ds/getSubordinate',{
    userId: userId,
    page: currentPage,
    limit: pageSize
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


/************  职位  **************/


/************  职位  **************/