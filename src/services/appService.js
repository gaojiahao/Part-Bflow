import {
  request
} from './fetch'
import {
  connect
} from 'net';

/**
 * @author XiaoYing
 * @description 获取应用模板数据
 */
export const getAppTemplateData = () => request('/H_roleplay-si/ds/getTplTempListInfo');

/**
 * @author XiaoYing
 * @description 获取应用列表数据
 */
export const getAppListData = (filterParams) => request('/H_roleplay-si/ds/getTplListInfo', {
  filter: filterParams
});

/**
 * @author XiaoYing
 * @description 获取应用导航数据
 */
export const getNavData = (params) => request('/H_roleplay-si/ds/list/getMenuByParentId', params);

/**
 * @author XiaoYing
 * @description 获取所有流程数据
 */
export const getAllProcessData = (page, limit,filter) => request('/H_roleplay-si/ds/getDeployedProcess', {
  page: page,
  limit: limit,
  filter: filter
});

/**
 * @author XiaoYing
 * @description 添加或删除应用工作流
 */
export const saveWorkFlowInfo = (params) => request('/H_roleplay-si/ds/saveData', params, 'POST');

/**
 * @author XiaoYing
 * @description 获取应用流程数据
 */
export const getProcessDataByListId = (listId, currentPage, pageSize) => request('/H_roleplay-si/ds/list/getProcessRelConfigByListId', {
  listId: listId,
  page: currentPage,
  limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取管理员数据
 */
export const getAdminData = (filter, page, limit) => request('/H_roleplay-si/ds/getAllUsers', {
  filter: filter,
  page: page,
  limit: limit
});

/**
 * @author XiaoYing
 * @description 获取所有动作权限数据
 */
export const getAllPermissionData = (listId) => request('/H_roleplay-si/ds/getActionPermissionByListId', {
  listId: listId
});

/**
 * @author XiaoYing
 * @description 获取所有数据源权限数据
 */
export const getAllResourcePermissionData = (listId) => request('/H_roleplay-si/ds/getResPermissionByListId', {
  listId: listId
});

/**
 * @author XiaoYing
 * @description 获取科目下子科目
 */
export const getSubAccountData = (accountCode) => request('/H_roleplay-si/account/getSubAccount', {
  account_code: accountCode
});

/**
 * @author XiaoYing
 * @description 获取科目下子科目授权数据
 */
export const getChildPermissionListByListId = (accountCode) => request('/H_roleplay-si/permission/getPermissionListByListId', {
  calcRelCode: accountCode
});

/**
 * @author XiaoYing
 * @description 启用科目下子科目
 */
export const startSubAccountData = (accountCode) => request('/H_roleplay-si/calc/calcRel/start', {
  calc_rel_code: accountCode
}, 'POST');

/**
 * @author XiaoYing
 * @description 禁用科目下子科目
 */
export const blockSubAccountData = (accountCode) => request('/H_roleplay-si/calc/calcRel/block', {
  calc_rel_code: accountCode
}, 'POST');

/**
 * @author XiaoYing
 * @description 获取用户数据
 */
export const getAllUserData = (currentPage, pageSize, filter) => request('/H_roleplay-si/ds/getUserList2', {
  page: currentPage,
  limit: pageSize,
  filter: filter
});

/**
 * @author XiaoYing
 * @description 获取评论关注用户数据
 */
export const getAllUserCommentData = (currentPage, pageSize, filter,relationkey,type) => request('/H_roleplay-si/ds/listUserWithoutSubcribeByRelationKey', {
  page: currentPage,
  limit: pageSize,
  search: filter,
  relationkey: relationkey,
  type: type
});

/**
 * @author XiaoYing
 * @description 获取用户数据
 */
export const getAllUsers = (currentPage, pageSize, filter) => request('/H_roleplay-si/ds/getAllUsers', {
  page: currentPage,
  limit: pageSize,
  filter: filter
});


/**
 * @author XiaoYing
 * @description 获取组织数据
 */
export const getAllOrgData = (currentPage, pageSize, filter) => request('/H_roleplay-si/ds/getDepartment', {
  page: currentPage,
  limit: pageSize,
  filter: filter
});

/**
 * @author XiaoYing
 * @description 获取职位数据
 */
export const getAllDepartmentData = (currentPage, pageSize, filter) => request('/H_roleplay-si/ds/getRoleList2', {
  page: currentPage,
  limit: pageSize,
  filter: filter
});

/**
 * @author XiaoYing
 * @description 增加权限
 */
export const addPermission = (params) => request('/H_roleplay-si/ps/insertObjPermission', {
  userId: params.userId,
  roleId: params.roleId,
  groupId: params.groupId,
  companyId: params.companyId,
  permissionId: params.permissionId
}, 'POST');

/**
 * @author GuoZheng
 * @description 添加视图权限
 */
export const saveViewPermission = (permissionId, userId, groupId, roleId) => request('/H_roleplay-si/app/updateAppPermission', {
  user: userId,
  group: groupId,
  role: roleId,
  multi: permissionId
}, 'POST');

/**
 * @author XiaoYing
 * @description 获取对应应用用户、组织、职位所有权限数据
 */
export const getAppResourcesAndAuthoritys = (type, listId) => request('/H_roleplay-si/ds/getAppResourcesAndAuthoritys', {
  listId: listId,
  type: type
})

/**
 * @author XiaoYing
 * @description 删除用户、组织、职位某一权限
 */
export const deleteRelationPermission = (params) => request('/H_roleplay-si/app/deleteAppPermission', params, 'POST');

/**
 * @author XiaoYing
 * @description 获取应用信息
 */
export const getListData = (uniqueId) => request('/H_roleplay-si/ds/list/getListById', {
  uniqueId: uniqueId
});

/**
 * @author XiaoYing
 * @description 发布应用
 */
export const publishApp = (params) => request('/H_roleplay-si/app/publish', params, 'POST');

/**
 * @author XiaoYing
 * @description 添加模板应用
 */
export const addTemplateApp = (params) => request('/H_roleplay-si/app/saveList', {}, 'POST', params);

/**
 * @author XiaoYing
 * @description 删除应用
 */
export const deleteApp = (params) => request('/H_roleplay-si/ds/procu/removeList', params);

/**
 * @author XiaoYing
 * @description 保存应用信息
 */
export const saveAppInformation = (params) => request('/H_roleplay-si/app/update', {
  uniqueId: params.uniqueId,
  title: params.title,
  administrator: params.administrator,
  comment: params.comment,
  customIcon: params.customIcon
}, 'POST');

/**
 * @author GuoZheng
 * 获取报表视图
 */
export const getListViewPermission = (viewId) => request('/H_roleplay-si/app/getListViewPermission', {
  viewId: viewId
})

/**
 * @author XiaoYing
 * @description 获取应用视图
 */
export const getAppviews = (params) => request('/H_roleplay-si/ds/getListViewOrTempViewByUniqueId', {
  filter: params.filter
});

/**
 * @author XiaoYing
 * @description 获取所有应用名称
 */
export const getProcessAppNames = (parentId) => request('/H_roleplay-si/ds/getTreeListByParentId',{
  parentId: parentId
});

/**
 * @author XiaoYing
 * @description 搜索应用名称
 */
export const searchProcessAppNames = (text) => request('/H_roleplay-si/ds/getMenuLeafByText',{
  text: text
});

/**
 * @author XiaoYing
 * @description 启用禁用工作流
 */
export const enabledForbiddenWorkFlow = (enabledIds, forbiddenIds, deleteId) => request('/H_roleplay-si/app/prohibitProc', {
  open: enabledIds,
  close: forbiddenIds,
  delete: deleteId
}, 'POST');

/**
 * @author XiaoYing
 * @description 添加相关应用
 */
export const addAppRelate = (param) => request('/H_roleplay-si/trans/addExampleDetails', {}, 'POST',param);

/**
 * @author XiaoYing
 * @description 删除相关应用
 */
export const deleteAppRelate = (param) => request('/H_roleplay-si/trans/deleteExampleDetails', {}, 'POST',param);

/**
 * @author XiaoYing
 * @description 设置默认视图
 */
export const saveDefaultView = (params) => request('/H_roleplay-si/app/setAppDefaultView', {
  viewId: params.viewId,
  listId: params.listId
}, 'POST');

/**
 * @author XiaoYing
 * @description 删除应用视图
 */
export const deleteAppViews = (params) => request('/H_roleplay-si/app/deleteView', {
  viewId: params.viewId,
  listId: params.listId
}, 'POST');

/** 
 * @author GUOZHENG
 * 更新日志
 */
export const saveAppLog = (listId, scope, spendTime, content) => request('/H_roleplay-si/app/saveLog', {
  listId: listId,
  scope: scope,
  spendTime: spendTime,
  content: content
}, "POST");

/** 
 * @author GUOZHENG
 * 更新日志
 */
export const getChangeLog = (listId, currentPage = 1) => request('/H_roleplay-si/ds/getChangeLog', {
  listId: listId,
  limit: 10,
  page: currentPage
});

/** 
 * @author XiaoYing
 * 获取应用科目
 */
export const getAppSubjectData = (listId,transType) => request('/H_roleplay-si/calc/app/getSubSubjectByTransTypeAndAppId', {
  app_id: listId,
  trans_type: transType
});

/** 
 * @author XiaoYing
 * 启用禁用应用科目
 */
export const updateAccountRel = (data) => request('/H_roleplay-si/calc/app/updateAccountRel', {}, 'POST', data);

/** 
 * @author XiaoYing
 * 管理员自评数据获取
 */
export const getAssessmentByListId = (listId, pageSize, currentPage) => request('/H_roleplay-si/ds/getAssessmentByListId', {
  listId: listId,
  limit: pageSize,
  page: currentPage
});

/** 
 * @author XiaoYing
 * 管理员自评数据新增
 */
export const saveAssessment = (params) => request('/H_roleplay-si/app/saveAssessment', {}, 'POST', params);

/** 
 * @author GuoZheng
 * 获取实例数据
 */
export const getInstanceStatistics = (listId, type, date) => request('/H_roleplay-si/trans/getInstanceStatistics', {
  listId: listId,
  type: type,
  date: date
});

/** 
 * @author GuoZheng
 * 获取工作流耗用时间
 */
export const getWorkFlowTime = (listId, type, date) => request('/H_roleplay-si/trans/getWorkFlowTime', {
  listId: listId,
  type: type,
  date: date
});

/** 
 * @author XiaoYing
 * 动作权限启用禁用
 */
export const ProhibitApp = (id, permType) => request('/H_roleplay-si/app/ProhibitApp', {
  id: id,
  permType: permType
}, 'POST');

/** 
 * @author XiaoYing
 * 修改权限确认
 */
export const updateMemberPermission = (userId, roleId, groupId, companyId, permissionId, listId, status) => request('/H_roleplay-si/app/updateAppActionPermission', {
  user: userId,
  role: roleId,
  group: groupId,
  company: companyId,
  multi: permissionId,
  listId: listId,
  status: status
}, 'POST');

/** 
 * @author XiaoYing
 * 删除某一用户或组织或职位公司全部权限
 */
export const clearAppPermission = (list, singleId, multiId) => request('/H_roleplay-si/ps/deleteRelation', {
  list: list,
  single: singleId,
  multi: multiId
}, 'POST');

export const downloadImage = (url) => request('/H_roleplay-si/ds/download', {
  url: url
})

/** 
 * @author XiaoYing
 * 启用禁用应用动作权限
 */
export const enabledForbiddenApp = (enabledIds, forbiddenIds) => request('/H_roleplay-si/app/prohibitList', {
  open: enabledIds,
  close: forbiddenIds
}, 'POST');

/** 
 * @author XiaoYing
 * 启用禁用相关应用
 */
export const prohibitExampleDetails = (exampleId) => request('/H_roleplay-si/trans/prohibitExampleDetails', {
  exampleId: exampleId
}, 'POST');

/** 
 * @author XiaoYing
 * 保存相关应用排序
 */
export const sortExampleDetails = (examples) => request('/H_roleplay-si/trans/sortExampleDetails', {
  examples: examples
}, 'POST');

/**
 * 
 * @param {String} listId  应用ID
 * @description 获取应用相关应用信息
 */
export const getRelatedApp = (listId) => request('/H_roleplay-si/trans/getAllExampleDetailsByAppId', {
  appId: listId
});

/**
 * @author zhaohuai
 * @description 获取用户相关信息
 */
export const getUserInfoByUserId = (userId) => request('/H_roleplay-si/ds/getUserInfoByUserId', {
  userId: userId
});


/**
 * @author GuoZheng
 * @description 获取查询应用json数据
 */
export const findList = (listId) => request('/H_roleplay-si/easy/list/findList', {
  listId: listId
});

/**
 * @author snack.huang
 * @description 获取订单大流程图信息
 * @param {String} treansCode 
 */
export const getBigProcessByOrderCode = (treansCode) => request('/corebiz-api/largeProcess', {
  order_code: treansCode
})


/**
 * @author snack.huang
 * @description 保存评论信息
 * @param {Object} comment 评论信息
 * {
 *   type:xx,           评论类型：应用评论：list,实例评论：instance
 *   content:xx,        评论内容
 *   relationKey:xx,    应用ID || 实例交易号
 *   parentId:xx        父级id  默认-1  对于某一条评论的回复
 *   commentAttachments:xx 附件 
 * }
 */
export const saveComment = (comment) => request('/H_roleplay-si/comment/saveComment', {}, 'POST', comment)

/**
 * @author snack.huang
 * @description 获取评论信息
 * @param {Object} param 评论信息
 * {
 *   relationKey=xx  关联ID: 应用ID || 实例交易号
 *   limit=xx 条数
 *   page=xx 页数
 *   sort=[{property:xx,direction:xx}]  排序规则
 * }
 */
export const getComments = (param) => request('/H_roleplay-si/comment/getCommentByRelationKey', param)


/**
 * @author snack.huang
 * @description 获取评论信息
 * @param {Object} param 评论信息
 * {
 *   parentId=xx  上级评论ID
 *   limit=xx 条数
 *   page=xx 页数
 *   sort=[{property:xx,direction:xx}]  排序规则
 * }
 */
export const getCommentsByParentId = (param) => request('/H_roleplay-si/comment/getCommentByParentId', param)


/**
 * @author snack.huang
 * @description 对评论点赞
 * @param {Object} data  
 * {
 *  commtenId:xxx 评论ID
 * }
 */
export const commentThumbsUp = (data) => request('/H_roleplay-si/comment/savePraise', {}, "POST", data)

/**
 * @author snack.huang
 * @description 取消点赞
 * @param {Object} data  
 * {
 *  commtenId:xxx 评论ID
 * }
 */
export const cancelCommentThumbsUp = (commentId) => request('/H_roleplay-si/comment/deletePraise?commentId=' + commentId, {}, "POST")




/**
 * @author snack.huang
 * @description 获取评论信息
 * @param {Object} param 评论信息
 * {
 *   commentId=xx  评论ID
 *   limit=xx 条数
 *   page=xx 页数
 * }
 */
export const getCommentThumbaUps = (param) => request('/H_roleplay-si/comment/getPraiseByCommentId', param)

/**
 * @author guozheng
 * @description 查询流程状态列表
 *   listId 应用Id
 *   limit 条数
 *   page 页数
 */
export const getProcessStatusByListId = (listId, currentPage, pageSize, filter = "") => request('/H_roleplay-si/ds/getProcessStatusByListId', {
  listId: listId,
  page: currentPage,
  limit: pageSize,
  filter: filter
})

/**
 * @author zhaohuai
 * @description 删除流程状态
 * @param {*} param 
 */
export const deleteProcessStatus = (param) => request('/H_roleplay-si/listProcessStatusRel/delete', {}, "POST", param)

/**
 * @author zhaohuai
 * @description 更新流程状态
 * @param {*} param 
 */
export const updateProcessStatus = (param) => request('/H_roleplay-si/listProcessStatusRel/update', {}, "POST", param)

/**
 * @author zhaohuai
 * @description 新增流程状态
 * @param {*} param 
 */
export const addProcessStatus = (param) => request('/H_roleplay-si/listProcessStatusRel/save', {}, "POST", param)

/**
 * @author XiaoYing
 * @description 保存自定义数据源
 * @param {*} param 
 */
export const saveCustomDatasource = (param) => request('/H_roleplay-si/resource/save', {
  data: param
}, "POST")

/**
 * @author XiaoYing
 * @description 保存字段权限
 * @param {*} param 
 */
export const saveFieldPermission = (param) => request('/H_roleplay-si/resource/f/save', {
  data: param
}, "POST")

/**
 * @author XiaoYing
 * @description 保存子科目权限
 * @param {*} param 
 */
export const saveChildSubjectPermission = (param) => request('/account-api/permission/saveFieldPermission', {
  data: param
}, "POST")

/**
 * @author XiaoYing
 * @description 修改自定义数据源
 * @param {*} param 
 */
export const updateCustomDatasource = (param) => request('/H_roleplay-si/resource/update', {
  data: param
}, "POST")

/**
 * @author XiaoYing
 * @description 修改字段权限
 * @param {*} param 
 */
export const updateFieldPermission = (param) => request('/H_roleplay-si/resource/f/update', {
  data: param
}, "POST")

/**
 * @author XiaoYing
 * @description 修改子科目权限
 * @param {*} param 
 */
export const updateChildSubjectPermission = (param) => request('/account-api/permission/updateFieldPermission', {
  data: param
}, "POST")

/**
 * @author XiaoYing
 * @description 获取字段权限字段数据源
 * @param {String} listId
 */
export const getFieldResorce = (listId) => request('/H_roleplay-si/resource/getFormField', {
  listId: listId
})

/**
 * @author XiaoYing
 * @description 获取子科目权限字段数据源
 * @param {String} calcRelCode
 */
export const getChildSubjectField = (calcRelCode) => request('/account-api/permission/getCalcRelFieldModels', {
  calcRelCode: calcRelCode
})

/**
 * @author XiaoYing
 * @description 获取自定义数据字段数据源
 * @param {String} listId
 */
export const getCustomFieldResorce = (listId) => request('/H_roleplay-si/resource/getAppField', {
  listId: listId
})

/**
 * @author XiaoYing
 * @description 获取自定义数据源列表
 * @param {String} listId
 */
export const getResorceList = (listId) => request('/H_roleplay-si/resource/getResourceList', {
  listId: listId
})

/**
 * @author XiaoYing
 * @description 获取字段权限列表
 * @param {String} listId
 */
export const getFieldList = (listId) => request('/H_roleplay-si/resource/getFieldList', {
  listId: listId
})

/**
 * @author XiaoYing
 * @description 获取子科目字段权限列表
 * @param {String} calcRelCode
 */
export const getFieldListByCalcRelCode = (calcRelCode) => request('/account-api/permission/getPermissionListByCalcRelCode', {
  calcRelCode: calcRelCode
})

/**
 * @author XiaoYing
 * @description 获取修改回显字段数据源
 * @param {String} listId
 * @param {String} resourceId
 */
export const getResourceDetailList = (listId, resourceId) => request('/H_roleplay-si/resource/getResourceDetailList', {
  listId: listId,
  resourceId: resourceId
})

/**
 * @author XiaoYing
 * @description 获取修改回显字段权限数据
 * @param {String} listId
 * @param {String} resourceId
 */
export const getFieldDetailList = (listId, resourceId) => request('/H_roleplay-si/resource/getFieldDetailList', {
  listId: listId,
  resourceId: resourceId
})

/**
 * @author XiaoYing
 * @description 获取修改回显子科目权限数据
 * @param {String} calcRelCode
 * @param {String} resourceId
 */
export const getChildSubjectDetailList = (calcRelCode, resourceId) => request('/account-api/permission/getFieldModelsByResourceIdAndCalcRelCode', {
  calcRelCode: calcRelCode,
  resourceId: resourceId
})

/**
 * @author XiaoYing
 * @description 删除已授权的自定义数据源
 * @param {String} resourceId
 */
export const deleteCustomDatasource = (resourceId) => request('/H_roleplay-si/resource/delete', {
  resourceId: resourceId
}, "POST")

/**
 * @author XiaoYing
 * @description 删除已授权的子科目字段权限
 * @param {String} resourceId
 */
export const deletePermissionByResourceId = (resourceId) => request('/account-api/permission/deletePermissionByResourceId', {
  resourceId: resourceId
})

/**
 * @author XiaoYing
 * @description 删除已授权的字段权限
 * @param {String} resourceId
 */
export const deleteFieldPermission = (resourceId) => request('/H_roleplay-si/resource/f/delete', {
  resourceId: resourceId
}, "POST")

/*
 * @author guozheng
 * @description 流程管理-取消关注
 * @param {*} param 
 */
export const subscribeApp = (relationKey) => request('/H_roleplay-si/comment/subscribeApp', {
  type: "processStatus",
  relationKey: relationKey
}, "POST")

/**
 * @author guozheng
 * @description 流程管理-关注
 */
export const unsubscribeAppByRelationKey = (processStatusId) => request('/H_roleplay-si/comment/unsubscribeAppByRelationKey', {
  relationKey: processStatusId,
  type: "processStatus"
}, "POST")

/**
 * 根据流程状态名称过滤数据
 * @param {*} listId 
 * @param {*} currentPage 
 * @param {*} pageSize 
 * @param {*} filter 
 */
export const serachProcess = (listId, currentPage, pageSize, filter) => request('/H_roleplay-si/ds/getProcessStatusByListId', {
  listId: listId,
  page: currentPage,
  limit: pageSize,
  filter: filter
})

/**
 * @author guozheng
 * @description 保存任务日志
 * @param {*} param 
 */
export const saveTaskLog = (data) => request('/H_roleplay-si/jobLog/save', {}, "POST",data)

/**
 * @author guozheng
 * @description 获取任务日志
 * @param {*} param 
 */
export const getTaskLog = (transCode,currentPage,pageSize) => request('/H_roleplay-si/jobLog/findAllJobLog', {
  transCode:transCode,
  pageIndex:currentPage,
  pageSize:pageSize
})

/**
 * @author snack.huang
 * @description 更新任务日志状态
 * @param {*} param 
 */
export const updateLogStatus = (jobLogId,logStatus) => request('/H_roleplay-si/jobLog/updateLogStatus',{},'POST',{
  jobLogId:jobLogId,
  logStatus:logStatus
})

