import {request} from './fetch'

//获取点检表数据
export const listCheckKeyTable = (currentPage,limit,filter) =>  request('/H_roleplay-si/check/listCheckTable',{
    page: currentPage,
    limit: limit,
    filter: filter
});

//获取点检表项目数据
export const listCheckContent = (checkKeyId,currentPage,limit,filter) =>  request('/H_roleplay-si/check/listCheckItem',{
    checkTableId: checkKeyId,
    page: currentPage,
    limit: limit,
    filter: filter
});

//保存新增点检表
export const saveCheckContent = (data) =>  request('/H_roleplay-si/check/saveCheckTableAndCheckItem',{},'POST',data);

//修改点检表
export const updateCheckContent = (data) =>  request('/H_roleplay-si/check/updateCheckTableAndCheckItem',{},'POST',data);

//删除点检表某一项
export const deleteCheckKeyTable = (checkKeyTableId) =>  request('/H_roleplay-si/check/deleteCheckTable',{
    checkTableId: checkKeyTableId
},'POST');