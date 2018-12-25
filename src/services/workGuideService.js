import {request} from './fetch';

/**
 * @author XiaoYing
 * @description 获取知识库数据
 */
export const getWorkGuideData = (currentPage,limit,search) =>  request('/H_roleplay-si/work/listWorkGuideAndStep',{
    page: currentPage,
    limit: limit,
    search: search
});

/**
 * @author XiaoYing
 * @description 根据id获取作业指导数据
 */
export const getworkDataById = (id) =>  request('/H_roleplay-si/work/getWorkGuideById',{
    guideId: id
},'POST');

/**
 * @author XiaoYing
 * @description 根据id获取作业指导步骤
 */
export const getworkGuideStepsById = (id) =>  request('/H_roleplay-si/work/listWorkStep',{
    limit: 10,
    page: 1,
    guideId: id,
    search: ''
});

/**
 * @author XiaoYing
 * @description 保存新增作业指导
 */
export const saveWorkGuideData = (params) =>  request('/H_roleplay-si/work/saveWorkGuide',{},'POST',params);

/**
 * @author XiaoYing
 * @description 修改作业指导
 */
export const updateWorkGuideData = (params) =>  request('/H_roleplay-si/work/updateWorkGuide',{},'POST',params);

/**
 * @author XiaoYing
 * @description 删除作业指导
 */
export const deleteWorkGuideData = (workGuideIds) =>  request('/H_roleplay-si/work/deleteWorkGuide',{
    workGuideIds: workGuideIds
},'POST');