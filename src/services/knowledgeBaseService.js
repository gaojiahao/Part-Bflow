import {request} from './fetch';

/**
 * @author XiaoYing
 * @description 获取知识库数据
 */
export const getKnowledgeData = (currentPage,limit,search) =>  request('/H_roleplay-si/kb/query',{
    page: currentPage,
    limit: limit,
    search: search
});

/**
 * @author XiaoYing
 * @description 获取知识库类型数据
 */
export const getKnowledgeTypeData = () =>  request('/H_roleplay-si/base/dict/getListByValue',{
    value: 'KnowledgeBaseType'
});

/**
 * @author XiaoYing
 * @description 根据id获取知识库数据
 */
export const getKnowledgeTypeDataById = (id) =>  request('/H_roleplay-si/kb/queryById',{
    id: id
});

/**
 * @author XiaoYing
 * @description 保存新增知识库
 */
export const saveKnowledgeData = (params) =>  request('/H_roleplay-si/kb/save',{},'POST',params);

/**
 * @author XiaoYing
 * @description 修改知识库
 */
export const updateKnowledgeData = (params) =>  request('/H_roleplay-si/kb/update',{},'POST',params);

/**
 * @author XiaoYing
 * @description 删除知识库
 */
export const deleteKnowledgeData = (knowledgeIds) =>  request('/H_roleplay-si/kb/delete',{},'POST',knowledgeIds);

/**
 * @author XiaoYing
 * @description 新增知识库分类
 */
export const saveKnowledgeDataType = (params) =>  request('/H_roleplay-si/base/dict/saveByValue',{},'POST',params);

/**
 * @author XiaoYing
 * @description 删除知识库分类
 */
export const deleteKnowledgeDataType = (typeIds) =>  request('/H_roleplay-si/base/dict/delete',{
    id: typeIds
},'POST');