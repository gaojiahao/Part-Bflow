
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

