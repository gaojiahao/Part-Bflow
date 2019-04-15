import { request } from './fetch'

/**
 * @author snack.haugng
 * @description 获取用户所有工作流任务
 */
export const getFlowAllTasks = (params) => request('/H_roleplay-si/ds/getMyTasks', params)

/**
 * @author XiaoYing
 * @description 获取所有工作流任务
 */
export const getAllFlowTasks = (params) => request('/H_roleplay-si/ds/getTODOTaskAll', params)

/**
 * @author snack.haugng
 * @description 获取用户工作流待办任务
 */
export const getFlowTodoTasks = (params) => request('/H_roleplay-si/ds/getTasksListData', params)

/**
 * @author snack.haugng
 * @description 获取用户工作流已办任务
 */
export const getFlowDoneTasks = (params) => request('/H_roleplay-si/ds/getCompletedListData', params)

/**
 * @author snack.haugng
 * @description 获取用户所有草稿
 */
export const getDraftData = (params) => request('/H_roleplay-si/ds/getRoughDraftListData', params)

/**
 * @author snack.haugng
 * @description 获取用户工作流任务增量分析数据
 */
export const getFlowTaskStatistics = (params) => request('/H_roleplay-si/trans/getMyTaskStatistics', params)

 /**
 * @author guozheng
 * @description 批量审批待办任务
 */
export const commitBatchTask = (data) => request('/H_roleplay-si/flow/commitBatchTask', {},"POST",data)   


