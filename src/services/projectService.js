
import { request } from './fetch'

/**
 * @author XiaoYing
 * @description 获取项目资产负债表数据
 */
export const getProjectDistributiveProfit = (transCode) => request('/H_roleplay-si/ds/getProjectDistributiveProfit', {
  transCode: transCode
})

/**
 * @author XiaoYing
 * @description 获取内部项目利润表数据
 */
export const getInsideProjectProfitStatement = (transCode) => request('/H_roleplay-si/account/getInsideProjectProfitStatement', {
  transCode: transCode
})

/**
 * @author XiaoYing
 * @description 获取外部项目利润表数据
 */
export const getOutsideProjectProfitStatement = (transCode) => request('/H_roleplay-si/account/projectProfitStatement', {
  transCode: transCode
})

/**
 * @author XiaoYing
 * @description 新增项目任务
 */
export const addProjectTask = (data) => request('/H_roleplay-si/projectTask/warRoom/save', {}, "POST", data)

/**
 * @author XiaoYing
 * @description 更新项目任务
 */
export const updateProjectTask = (data) => request('/H_roleplay-si/projectTask/warRoom/update', {}, "POST", data)

/**
 * @author XiaoYing
 * @description 删除项目任务
 */
export const deleteProjectTask = (projectPlanTaskId) => request('/H_roleplay-si/projectTask/warRoom/delete', {
  projectPlanTaskId: projectPlanTaskId
}, "POST")

/**
 * @author XiaoYing
 * @description 保存项目任务连线
 */
export const addProjectTaskLink = (data) => request('/H_roleplay-si/projectTask/link/save', {}, "POST", data)

/**
 * @author XiaoYing
 * @description 删除项目任务连线
 */
export const deleteProjectTaskLink = (projectTaskLinkId) => request('/H_roleplay-si/projectTask/link/delete', {
  projectTaskLinkId: projectTaskLinkId
}, "POST")

/**
 * @author XiaoYing
 * @description 删除项目任务附件
 */
export const deleteProjectTaskFile = (id) => request('/H_roleplay-si/ds/delete', {
  id: id,
  list: 'attachments'
})

/**
 * @author snack.huang
 * @description 创建项目计划 
 */
export const saveProjectPlan = (data) => request('/H_roleplay-si/projectPlan/save', {}, "POST", data)

/**
 * @author snack.huang
 * @description 获取项目计划信息 
 */
export const getProjectPlan = (transCode) => request('/H_roleplay-si/projectPlan/findData', {
  transCode:transCode
})

/**
 * @author snack.huang
 * @description 获取项目信息 
 */
export const getProject = (transCode) => request('/H_roleplay-si/projectApproval/findData', {
  transCode:transCode
})

/**
 * @author XiaoYing
 * @description 获取项目任务信息
 */
export const getProjectTask = (transCode) => request('/H_roleplay-si/projectTask/findData', {
  transCode:transCode
})

/**
 * @author XiaoYing
 * @description 获取项目附件信息
 */
export const getProjectFiles = (param) => request('/H_roleplay-si/projectTask/info/attachment', param)

/**
 * @author XiaoYing
 * @description 获取项目评论信息
 */
export const getProjectComments = (transCode) => request('/H_roleplay-si/projectTask/info/comment', {
  transCode:transCode
})

/**
 * @author XiaoYing
 * @description 获取项目日志信息
 */
export const getProjectLogs = (transCode) => request('/H_roleplay-si/projectTask/info/jobLog', {
  transCode:transCode
})

/**
 * @author snack.huang
 * @description 新增项目任务 
 */
export const saveProjectTask = (data) => request('/H_roleplay-si/projectPlan/saveProjectTask/save',  {}, "POST", data)

/**
 * @author snack.huang
 * @description 通过项目交易号获取项目计化号
 */
export const getProjectPlanTransCode = (transCode) => request('/H_roleplay-si/ds/list/getProjectPlanTransCode',  {
  projectTransCode:transCode
})

/**
 * @author XiaoYing
 * @description 获取项目利润表流水数据
 */
export const getProjectProfitWater = (data) => request('/H_roleplay-si/account/getProjectProfitWater', data)

/**
 * @author XiaoYing
 * @description 获取项目资产负债表流水数据
 */
export const getProjectDistributiveProfitWater = (data) => request('/H_roleplay-si/ds/getProjectDistributiveProfitWater', data)

/**
 * @author XiaoYing
 * @description 获取项目资产负债表对象流水数据
 */
export const getProjectDistributiveProfitObjBalance = (data) => request('/H_roleplay-si/ds/getProjectDistributiveProfitObjBalance', data)

