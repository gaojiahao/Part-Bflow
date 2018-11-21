import {request} from './fetch'

//获取点检表数据
export const listCheckKeyTable = (currentPage,limit) =>  request('/H_roleplay-si/check/listCheckKeyTable',{
    page: currentPage,
    limit: limit
});

//获取点检表项目数据
export const listCheckContent = (checkKeyId,currentPage,limit) =>  request('/H_roleplay-si/check/listCheckContent',{
    checkKeyId: checkKeyId,
    page: currentPage,
    limit: limit
});

//保存新增点检表
export const saveCheckContent = (data) =>  request('/H_roleplay-si/check/saveCheckKeyTableAndCheckContent',{},'POST',data);

//修改点检表
export const updateCheckContent = (data) =>  request('/H_roleplay-si/check/updateCheckKeyTableAndCheckContent',{},'POST',data);

//删除点检表某一项
export const deleteCheckKeyTable = (checkKeyTableId) =>  request('/H_roleplay-si/check/deleteCheckKeyTable',{
    checkKeyTableId: checkKeyTableId
},'POST');