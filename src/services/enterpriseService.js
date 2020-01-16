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
export const updateRelation = (single,type) => request('/H_roleplay-si/ps/updateRelation', { list: 'sys_user_role', single: single, multi: type }, "POST")

/** 
 * @author GuoZheng
 * 删除企业管理员
*/
export const deleteRelation = (single,type) => request('/H_roleplay-si/ps/deleteRelation', { list: 'sys_user_role', single: single, multi: type }, "POST")

/**
 * @author GuoZheng
 * @description 获取管理员数据
 */
export const getAllUsers = (pageSize, currentPage, filter) => request('/H_roleplay-si/ds/getAllUsers', {
    page: currentPage,
    limit: pageSize,
    filter: filter
  });

/**
 * @author WangXiaoYing
 * @description 同步第三方平台用户
 */
export const importThirdPlat= () => request('/H_roleplay-si/importThirdPlatId');

/**
 * @author WangXiaoYing
 * @description 获取汇率数据
 */
export const getExchangeRateData= () => request('/H_roleplay-si/foreignExchange/get',{
    filter: []
});

/** 
 * @author WangXiaoYing
 * 添加汇率
*/
export const addExchangeRateData = (data) => {
    return request('/H_roleplay-si/foreignExchange/add', {}, "POST",data);
}

/** 
 * @author WangXiaoYing
 * 删除汇率
*/
export const deleteExchangeRateData = (data) => {
    return request('/H_roleplay-si/foreignExchange/deleteByIds', {}, "POST",data);
}

/** 
 * @author WangXiaoYing
 * 修改汇率
*/
export const updateExchangeRateData = (data) => {
    return request('/H_roleplay-si/foreignExchange/updateById', {}, "POST",data);
}