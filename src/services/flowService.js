import {request} from './fetch'

/**
 * @author snack.haugng
 * @description 通过业务单元获取业务单元信息
 * @param {String} caseId 业务单元ID 
 */
export const getPulseGraph = (caseId) => request('/H_roleplay-si/trans/getPulsationDiagramByCaseId', {caseId: caseId})

/**
 * @author snack.haugng
 * @description 获取当前用户信息
 */
export const getCurrentUserInfo = () => request('/H_roleplay-si/userInfo/currentUser')

/**
 * @author snack.haugng
 * @description 获取当前用户首页菜单
 */
export const getMenu = () => request('/H_roleplay-si/ds/getMenu')

/**
 * @author snack.huang
 * @description 获取所有业务单元
 */
export const getPulsationDiagramCase = () => request('/H_roleplay-si/ds/getPulsationDiagramCase')


/**
 * @author snack.huang
 * @description 获取当前用户所有待办消息
 */
export const getCurrentUserAllTasks = () => request('/H_roleplay-si/ds/getMyTaskCountAll')


/**
 * @description 获取常用应用
 */
export const getMyFavorite = () => request('/H_roleplay-si/ds/getMyFavorite')

/**
 * 查询待办数量明细
 * @param {Object} 参数
 */
export const getAppTaskCount = (params) => request('/H_roleplay-si/trans/getAppTaskCount',params)

export const getMockData = () =>  request('../mock/flow/technologyGraph.json');


/** 
 * 获取工艺与工序的关系
 * 
*/
export const getProcedureAndProcess = (processRouteCode) => request('/H_roleplay-si/ds/getProcedureAndProcess',{
    processRouteCode:processRouteCode
})


/** 
 * 获取工艺与工序的关系
 * 
*/
export const getProcessRouteProcedureRel = () => request('/H_roleplay-si/ds/getProcessRouteProcedureRel');