import {request} from './fetch'

/**
 * @author XiaoYing
 * @description 获取点检表数据
 */
export const listCheckKeyTable = (currentPage,limit,filter) =>  request('/H_roleplay-si/check/listCheckTable',{
    page: currentPage,
    limit: limit,
    filter: filter
});

/**
 * @author XiaoYing
 * @description 获取点检表项目数据
 */
export const listCheckContent = (checkKeyId,currentPage,limit,filter) =>  request('/H_roleplay-si/check/listCheckItem',{
    checkTableId: checkKeyId,
    page: currentPage,
    limit: limit,
    filter: filter
});

/**
 * @author XiaoYing
 * @description 保存新增点检表
 */
export const saveCheckContent = (data) =>  request('/H_roleplay-si/check/saveCheckTableAndCheckItem',{},'POST',data);

/**
 * @author XiaoYing
 * @description 修改点检表
 */
export const updateCheckContent = (data) =>  request('/H_roleplay-si/check/updateCheckTable',{},'POST',data);

/**
 * @author XiaoYing
 * @description 删除点检表某一项
 */
export const deleteCheckKeyTable = (checkKeyTableId) =>  request('/H_roleplay-si/check/deleteCheckTable',{
    checkTableId: checkKeyTableId
},'POST');

/**
 * @author XiaoYing
 * @description 保存新增点检表
 */
export const saveCheckItem = (data) =>  request('/H_roleplay-si/check/saveCheckItem',{},'POST',data);

/**
 * @author XiaoYing
 * @description 修改新增点检表
 */
export const updateCheckItem = (data) =>  request('/H_roleplay-si/check/updateCheckContent',{},'POST',data);

/**
 * @author XiaoYing
 * @description 删除新增点检表
 */
export const deleteCheckItem = (checkItemId) =>  request('/H_roleplay-si/check/deleteCheckItem',{
    checkItemId: checkItemId
},'POST');