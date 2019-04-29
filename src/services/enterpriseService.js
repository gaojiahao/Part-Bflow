import { request } from './fetch'

/** 
 * @author GuoZheng
 * 设置头像
*/
export const downloadImage = (url) => request('/H_roleplay-si/ds/download', {
    url: url
})

/** 
 * @author GuoZheng
 * 获取企业信息
*/
export const getEnterpriseById = (url) => request('/H_roleplay-si/app/getEnterpriseById')

/** 
 * @author GuoZheng
 * 保存企业信息
*/
export const addOrUpdateEnterprise = (data) => {
    return request('/H_roleplay-si/app/updateEnterpriseProperty', {}, "POST",data);
}

/** 
 * @author GuoZheng
 * 添加企业管理员
*/
export const updateRelation = (single) => request('/H_roleplay-si/ps/updateRelation', { list: 'sys_user_role', single: single, multi: 1 }, "POST")

/** 
 * @author GuoZheng
 * 删除企业管理员
*/
export const deleteRelation = (single) => request('/H_roleplay-si/ps/deleteRelation', { list: 'sys_user_role', single: single, multi: 1 }, "POST")

/**
 * @author GuoZheng
 * @description 获取管理员数据
 */
export const getAllUsers = (pageSize, currentPage, filter) => request('/H_roleplay-si/ds/getAllUsers', {
    page: currentPage,
    limit: pageSize,
    filter: filter
  });
