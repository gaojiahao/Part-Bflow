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
export const getAllProcessData = (page, limit) => request('/H_roleplay-si/ds/getDeployedProcess', {
  page: page,
  limit: limit
});

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
 * @description 获取用户数据
 */
export const getAllUserData = (currentPage, pageSize, filter) => request('/H_roleplay-si/ds/getUserList2', {
  page: currentPage,
  limit: pageSize,
  filter: filter
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
  comment: params.comment
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
 * @description 启用禁用工作流
 */
export const enabledForbiddenWorkFlow = (enabledIds, forbiddenIds, deleteId) => request('/H_roleplay-si/app/prohibitProc', {
  open: enabledIds,
  close: forbiddenIds,
  delete: deleteId
}, 'POST');

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
export const getAppSubjectData = (listId) => request('/corebiz-api/calc/calcRel/findAccountByAppId', {
  app_id: listId
});

/** 
 * @author XiaoYing
 * 启用禁用应用科目
 */
export const openOrForbiddenSubject = (componentId) => request('/corebiz-api/calc/calcConfig/editStatus', {
  componentId: componentId
}, 'POST');

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
 * @author zhaohuai
 * @description 过去流程状态信息
 * @param {*} param 
 * {
 *   listId 应用Id
 *   limit 条数
 *   page 页数
 * }
 */
export const getProcessStatus = (param) => request('/H_roleplay-si/listProcessStatusRel/findData', param)

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
 * @description 修改自定义数据源
 * @param {*} param 
 */
export const updateCustomDatasource = (param) => request('/H_roleplay-si/resource/update', {
  data: param
}, "POST")

/**
 * @author XiaoYing
 * @description 获取字段数据源
 * @param {String} listId
 */
export const getFieldResorce = (listId) => request('/H_roleplay-si/resource/getAppField', {
  listId: listId
})

/**
 * @author XiaoYing
 * @description 获取字段数据源列表
 * @param {String} listId
 */
export const getResorceList = (listId) => request('/H_roleplay-si/resource/getResourceList', {
  listId: listId
})

/**
 * @author XiaoYing
 * @description 获取修改回显字段数据源
 * @param {String} listId
 * @param {String} resourceId
 */
export const getResourceDetailList = (listId,resourceId) => request('/H_roleplay-si/resource/getResourceDetailList', {
  listId: listId,
  resourceId: resourceId
})

/**
 * @author XiaoYing
 * @description 删除已授权的自定义数据源
 * @param {String} listId
 * @param {String} resourceId
 */
export const deleteCustomDatasource = (resourceId) => request('/H_roleplay-si/resource/delete', {
  resourceId: resourceId
}, "POST")
