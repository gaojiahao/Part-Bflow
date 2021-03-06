import {
  request
} from './fetch'

/**
 * @author snack.haugng
 * @description 通过业务单元获取业务单元信息
 * @param {String} caseId 业务单元ID 
 */
export const getPulseGraph = (caseId) => request('/H_roleplay-si/trans/getPulsationDiagramByCaseId', {
  caseId: caseId
})

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
export const getAppTaskCount = (params) => request('/H_roleplay-si/trans/getAppTaskInfo', params)

export const getMockData = () => request('../mock/flow/bpg.json');

/** 
 * 获取订单列表
 * 
 */
export const getOrders = (currentPage, filter) => request('/H_roleplay-si/ds/getProcessOrders', {
  page: currentPage,
  start: 0,
  limit: 6,
  filter: filter
});

/** 
 * 获取项目立项信息
 * 
 */
export const getProject = (currentPage, filter) => request('/H_roleplay-si/ds/getProject', {
  page: currentPage,
  start: 0,
  limit: 6,
  filter: filter
});

/**
 * @author TanGuoZheng
 * @description 获取当前用户所有待办消息
 */
export const getMyTaskCountAll = (type, projectName = "", orderCode = "") => request('/H_roleplay-si/trans/getAppTaskCount', {
  type: type,
  projectName: projectName,
  orderCode: orderCode
})




/** 
 * 获取工艺与工序的关系
 * 
 */
export const getProcedureAndProcess = (technicsCode) => request('/H_roleplay-si/objTechnicsProcessRel/getProcedureProcess', {
  technicsCode: technicsCode
})


/** 
 * 获取工艺与工序的关系
 * 
 */
export const getTaskCountFilter = (type,technicsCode,filter) => request('/H_roleplay-si/objTechnicsProcessRel/getTaskCountFilter',{
  type:type,
  technicsCode: technicsCode,
  filter: filter
});

/** 
* 获取工序任务数量
* 
*/
export const getProcedureInfoFilter = (procedureCode,processRouteCode,type,currentPage,pageSize=6,filter="") => request('/H_roleplay-si/objTechnicsProcessRel/getProcedureInfoFilter',{
  procedureCode: procedureCode,
  technicsCode: processRouteCode,
  type:type,
  page:currentPage,
  limit:pageSize,
  filter:filter
  });

/** 
 * 获取表单视图
 * 
 */
export const getFormViews = (listId) => request('/H_roleplay-si/ds/list/getFormViews', {
  listId: listId
});

export const getViewConfig = (viewId) => request(`/H_roleplay-si/form/${viewId}/view`)

export const getObjFeildChangeHistory = (transCode) => request('/H_roleplay-si/easy/transTypeHistoryApi/findData', {
  transCode: transCode,
})

export const getListFeildChangeHistory = (transCode) => request('/H_roleplay-si/easy/transTypeHistoryApi/findData', {
  transCode: transCode,
})

export const getProp = () => request('/H_roleplay-si/ds/getProp', {
  key: 'deepstream.uri2',
})
export const getListChangeHistory = (data) => request('/H_roleplay-si/easy/transTypeHistoryApi/findAllHistory', data)



/**
 * @author TanGuoZheng
 * @description 获取所有职位数据
 */
export const getAllRoleData = () => request('/H_roleplay-si/ds/getRoleList2');

/**
 * @author TanGuoZheng
 * @description 获取所有应用信息
 */
export const getAllAppList = (currentPage,pageSize=8,withoutListId="-1",search="") => request('/H_roleplay-si/ds/getAllList',{
  page:currentPage,
  limit:pageSize,
  withoutListId:withoutListId,
  search:search,
});

/**
 * @author TanGuoZheng
 * @description 获取应用模板脉动图数据
 */
export const getBusinessModuleById = (moduleId) => request('/H_roleplay-si/trans/getBusinessModuleById',{
  moduleId:moduleId
});


/**
 * @author TanGuoZheng
 * @description 保存应用模板脉动图数据
 */
export const saveBusinessModule = (data) => request('/H_roleplay-si/trans/saveBusinessModule', {}, 'POST',data);

 /**
 * @author guozheng
 * @description 批量审批待办任务
 */
export const commitBatchTask = (data) => request('/H_roleplay-si/flow/commitBatchTask', {},"POST",data)   
