
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

