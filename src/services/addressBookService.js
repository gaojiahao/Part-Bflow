import {
  request
} from './fetch';

/*************  公共  ****************/
/**
 * @author GuoZheng
 * @description 获取组织成员信息
 */
export const checkoutFieldIsOnly = (tn, filter) => request('/H_roleplay-si/trans/validate', {
  tableName: tn,
  filter: filter
});

/**
 * @author XiaoYing
 * @description 获取应用信息
 */
export const getListById = (listId) => request('/H_roleplay-si/ds/list/getListById', {
  uniqueId: listId
});

/************  用户  **************/

/**
 * @author XiaoYing
 * @description 获取user上级用户数据
 */
export const getHighUserData = (userId, pageSize, currentPage) => request('/H_roleplay-si/ds/getSuperior', {
  userId: userId,
  page: currentPage,
  limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user下级用户数据
 */
export const getLowUserData = (userId, pageSize, currentPage) => request('/H_roleplay-si/ds/getSubordinate', {
  userId: userId,
  page: currentPage,
  limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user部门数据
 */
export const getDepartmentData = (userId, pageSize, currentPage) => request('/H_roleplay-si/ds/getOrgByUserId', {
  userId: userId,
  page: currentPage,
  limit: pageSize
});

/**
 * @author XiaoYing
 * @description 设置user默认部门或默认职位
 */
export const setUserDefaultDepOrRole = (userId, type, colId) => request('/H_roleplay-si/app/setDefaultRelation', {
  userId: userId,
  type: type,
  colId: colId
},'POST');

/**
 * @author XiaoYing
 * @description 获取user职位数据
 */
export const getRoleData = (userId, pageSize, currentPage) => request('/H_roleplay-si/ds/getUserRoleByUserId', {
  userId: userId,
  page: currentPage,
  limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user直接权限数据
 */
export const getDirectPermissionData = (userId, pageSize, currentPage) => request('/H_roleplay-si/ds/getObjectPermission2Oneself', {
  objectName: 'user',
  objectId: userId,
  page: currentPage,
  limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取user间接权限数据
 */
export const getIndirectPermissionData = (userId, pageSize, currentPage) => request('/H_roleplay-si/ps/getUserOrGroupPermissionById', {
  userId: userId,
  page: currentPage,
  limit: pageSize
});

/**
 * @author XiaoYing
 * @description 获取所有用户数据
 */
export const getAllUsers = (pageSize, currentPage, filter) => request('/H_roleplay-si/ds/getAllUsers', {
  page: currentPage,
  limit: pageSize,
  filter: filter
});

/**
 * @author XiaoYing
 * @description 添加上下级用户
 */
export const updateHighUser = (userId, parentId) => request('/H_roleplay-si/userInfo/updateParentId', {
  userId: userId,
  parentId: parentId
}, 'POST');

/**
 * @author XiaoYing
 * @description 删除上下级用户
 */
export const deleteUser = (userId) => request('/H_roleplay-si/userInfo/updateParentId', {
  parentId: null,
  userId: userId
}, 'POST');

/**
 * @author XiaoYing
 * @description 获取组织部门数据
 */
export const getGroupData = (parentId) => request('/H_roleplay-si/ds/getUserGroupByParentId', {
  parentId: parentId
});

/**
 * @author XiaoYing
 * @description 添加组织或职位
 */
export const addMember = (list, groupId, userId) => request('/H_roleplay-si/ps/updateRelation', {
  list: list,
  single: groupId,
  multi: userId,
  status: 0
}, 'POST');

/**
 * @author XiaoYing
 * @description 删除组织或职位
 */
export const deleteMember = (list, groupId, userId) => request('/H_roleplay-si/ps/deleteRelation', {
  list: list,
  single: groupId,
  multi: userId
}, 'POST');

/**
 * @author XiaoYing
 * @description 获取所有职位数据
 */
export const getAllRoleData = (pageSize, currentPage, filter) => request('/H_roleplay-si/ds/getRoleList2', {
  page: currentPage,
  limit: pageSize,
  filter: filter
});

/**
 * @author XiaoYing
 * @description 获取所用权限数据
 */
export const getAllPermissionData = (parentId) => request('/H_roleplay-si/ds/getPermissionListByParentId', {
  parentId: parentId
});

/**
 * @author XiaoYing
 * @description 添加权限
 */
export const addIndirPermission = (single, multi) => request('/H_roleplay-si/ps/updatePermissionRelation', {
  list: 'sys_user_permission',
  multi: multi,
  single: single
}, 'POST');

/**
 * @author XiaoYing
 * @description 删除权限
 */
export const deleteIndirPermission = (single, multi) => request('/H_roleplay-si/ps/deletePermissionRelation', {
  list: 'sys_user_permission',
  multi: multi,
  single: single
});

/**
 * @author XiaoYing
 * @description 获取用户详情信息
 */
export const getUserInfoById = (userId) => request('/H_roleplay-si/ds/getUserInfoById', {
  userId: userId
});

/**
 * @author XiaoYing
 * @description 更新用户
 */
export const updateUser = (params) => request('/H_roleplay-si/userInfo/updateUser', {}, 'POST', params);

/**
 * @author XiaoYing
 * @description 新增用户
 */
export const addUser = (params) => request('/H_roleplay-si/userInfo/addUser', {}, 'POST', params);

/**
 * @author XiaoYing
 * @description 获取用户相关实例数量
 */
export const getInstanceCountByUserId = (userId) => request('/H_roleplay-si/app/getObjDetailsCountByUserId', {
  userId: userId
});

/**
 * @author XiaoYing
 * @description 获取用户工作流任务数据
 */
export const getWorkFlowTaskByUserId = (userId, currentPage, pageSize) => request('/H_roleplay-si/ds/getWorkFlowTaskByUserId', {
  userId: userId,
  page: currentPage,
  limit: pageSize
});


/************  组织  **************/

/**
 * @author GuoZheng
 * @description 获取职位相关实例
 */
export const getObjDetailsCountByGroupId = (groupId) => request('/H_roleplay-si/app/getObjDetailsCountByGroupId', {
  groupId: groupId,
});

/**
 * @author GuoZheng
 * @description 获取组织成员信息
 */
export const getUsersByGroupId = (groupId, currentPage, pageSize) => request('/H_roleplay-si/ds/getUsersByGroupId', {
  groupId: groupId,
  page: currentPage,
  limit: pageSize,
  start: 0,
});



/**
 * @author GuoZheng
 * @description 获取组织权限
 */
export const getObjectPermission2Oneself = (objectName, objectId, currentPage, pageSize) => request('/H_roleplay-si/ds/getObjectPermission2Oneself', {
  objectName: objectName,
  objectId: objectId,
  page: currentPage,
  limit: pageSize,
  start: 0,
});

/**
 * @author GuoZheng
 * @description 获取用户列表
 */
export const listUsers = (currentPage, pageSize) => request('/H_roleplay-si/ds/listUsers', {
  entityId: 20000,
  page: currentPage,
  limit: pageSize,
  start: 0,
});

/**
 * @author GuoZheng
 * @description 添加组织权限
 */
export const addOrgPermission = (single, multi) => request('/H_roleplay-si/ps/updatePermissionRelation', {
  list: 'sys_group_permission',
  multi: multi,
  single: single
}, 'POST');

/**
 * @author GuoZheng
 * @description 删除组织权限
 */
export const deleteOrgPermission = (single, multi) => request('/H_roleplay-si/ps/deletePermissionRelation', {
  list: 'sys_group_permission',
  multi: multi,
  single: single
});

/**
 * @author GuoZheng
 * @description 添加组织成员
 */
export const addOrgMember = (single, multi) => request('/H_roleplay-si/ps/updateRelation', {
  list: 'sys_group_user',
  multi: multi,
  single: single,
}, 'POST');

/**
 * @author GuoZheng
 * @description 删除组织成员
 */
export const deleteOrgMember = (single, multi) => request('/H_roleplay-si/ps/deleteRelation', {
  list: 'sys_group_user',
  multi: multi,
  single: single,
}, 'POST');

/**
 * @author GuoZheng
 * @description 获取上级组织列表
 */
export const getAllHigherGroupByGroupType = (currentPage, pageSize,groupType, filter) => request('/H_roleplay-si/ds/getAllHigherGroupByGroupType', {
  start:0,
  page: currentPage,
  limit: pageSize,
  groupType:groupType,
  filter: filter,
});

/**
 * @author GuoZheng
 * @description 获取下级组织列表
 */
export const getAllLowerGroupByGroupType = (currentPage, pageSize,groupType, filter) => request('/H_roleplay-si/ds/getAllLowerGroupByGroupType', {
  start:0,
  page: currentPage,
  limit: pageSize,
  groupType:groupType,
  filter: filter,
});

/**
 * @author GuoZheng
 * @description 添加下级组织
 */
export const saveBatchChildGroup = (parentId, childrenId) => request('/H_roleplay-si/sysGroup/saveBatchChildGroup', {
  parentId: parentId,
  childrenId: childrenId,
}, "POST");

/**
 * @author GuoZheng
 * @description 删除下级组织
 */
export const deleteBatchGroup = (data) => request('/H_roleplay-si/sysGroup/updateBatch', {}, "POST", data);

/**
 * @author GuoZheng
 * @description 添加负责人
 */
export const savePrincipal = (data) => request('/H_roleplay-si/sysGroup/update', {}, "POST", data);


/**
 * @author GuoZheng
 * @description 获取组织基本信息
 */
export const getOrgBaseInfo = (filter) => request('/H_roleplay-si/ds/getAllGroup', {
  filter: filter,
});

/**
 * @author GuoZheng
 * @description 保存组织基本信息,
 */
export const saveBaseinfo = (data) => request('/H_roleplay-si/sysGroup/save', {}, "POST", data);

/**
 * @author GuoZheng
 * @description 修改组织基本信息,
 */
export const updateBaseinfo = (data) => request('/H_roleplay-si/sysGroup/update', {}, "POST", data);


/**
 * @author GuoZheng
 * @description 获取用户列表
 */
export const getTableData = (url, params) => request('/H_roleplay-si' + url, params);

/*
 * @author snack.huang
 * @description 获取所有组织 [管理层、事业部、部门、小组]
 */
export const getOrganizations = (pageSize, currentPage, filter) => request('/H_roleplay-si/ds/getAllGroup', {
  page: currentPage,
  limit: pageSize,
  filter: filter
});




/************  职位  **************/

/**
 * @author GuoZheng
 * @description 获取职位相关实例
 */
export const getObjDetailsCountByRoleId = (roleId) => request('/H_roleplay-si/app/getObjDetailsCountByRoleId', {
  roleId: roleId,
});

/**
 * @author GuoZheng
 * @description 获取组织基本信息
 */
export const getAllRole = (filter) => request('/H_roleplay-si/ds/getAllRole', {
  filter: filter,
});

/**
 * @author GuoZheng
 * @description 保存职位基本信息
 */
export const saveRoleBaseInfo = (data) => request('/H_roleplay-si/sysRole/save', {}, "POST", data);

/**
 * @author GuoZheng
 * @description 更新职位基本信息
 */
export const updateRoleBaseInfo = (data) => request('/H_roleplay-si/sysRole/update', {}, "POST", data);

/**
 * @author GuoZheng
 * @description 添加职位成员
 */
export const saveBatchChildRole = (roleId, userId) => request('/H_roleplay-si/ps/updateRelation', {
  list: 'sys_user_role',
  multi: roleId,
  single: userId,
}, 'POST');

/**
 * @author GuoZheng
 * @description 添加职位成员
 */
export const deleteBatchRole = (roleId, userId) => request('/H_roleplay-si/ps/deleteRelation', {
  list: 'sys_user_role',
  multi: roleId,
  single: userId,
}, 'POST');


/**
 * @author GuoZheng
 * @description 添加职位权限
 */
export const addRolePermission = (single, multi) => request('/H_roleplay-si/ps/updatePermissionRelation', {
  list: 'sys_role_permission',
  single: single,
  multi: multi
}, 'POST');

/**
 * @author GuoZheng
 * @description 删除职位权限
 */
export const deleteRolePermission = (single, multi) => request('/H_roleplay-si/ps/deletePermissionRelation', {
  list: 'sys_role_permission',
  single: single,
  multi: multi
});

/************  职位  **************/



/************  公司  **************/

/**
 * @author zhaohuai
 * 根据公司Id获取所属成员信息
 */
export const getAllUser = (currentPage, pageSize) => request('/H_roleplay-si/ds/listUsers', {
  entityId: 20000,
  page: currentPage,
  limit: pageSize,
  start: 0,
});

/**
 * @author zhaohuai
 * 过滤成员信息
 */
export const filterUser = (searchValue) => {
  return request('/H_roleplay-si/userInfo/listUsers', {
    search: searchValue
  })
};
/**
 * @author zhaohuai
 * 根据公司id获取公司信息
 * 
 */
export const getCompanyInfoByGroupId = (groupId) => request('/H_roleplay-si/sysGroup/getCompanyList', {
  groupId: groupId
})
/**
 * @author zhaohuai
 * 保存公司基本信息
 */
export const saveCompanyInfo = (data) => {
  let {
    groupName,
    groupShortName,
    companyType,
    status,
    groupCode,
    groupPic
  } = data;
  return request('/H_roleplay-si/sysGroup/saveBatch', {}, 'POST', [{
    groupName: groupName,
    groupShortName: groupShortName,
    companyType: companyType,
    status: status,
    list: 'sys_group',
    groupType: 'C',
    parentId: '1',
    groupCode: groupCode,
    groupPic: groupPic
  }]);
};
/**
 * @author zhaohuai
 * 获取公司列表信息
 * 
 */
export const getCompanyList = (groupId, target, currentPage, pageSize) => request('/H_roleplay-si/sysGroup/getCompanyList', {
  groupId: groupId,
  target: target,
  currentPage: currentPage,
  pageSize: pageSize
});
/**
 * @author zhaohuai
 * 获取公司成员
 */
export const getGroupUser = (groupId, currentPage, pageSize,text) => request('/H_roleplay-si/sysGroup/getGroupUser', {
  groupId: groupId,
  currentPage: currentPage,
  pageSize: pageSize,
  search: text 
})
/**
 * @author zhaohuai
 * 获取公司相关实例数
 */
export const getInstanceCountByGroupId = (groupId) => request('/H_roleplay-si/sysGroup/getGroupExampleCount', {
  groupId: groupId,
})
/**
 * 
 * @author zhaohuai
 * 新增上级公司
 */
export const addHigherCompany = (groupId, parentId) => {
  let data = [{
    "groupId": groupId,
    "parentId": parentId
  }];
  return request('/H_roleplay-si/sysGroup/updateBatch', {}, 'POST', data);
}

/**
 * @author zhaohuai
 * 新增下级公司
 */
export const addLowerCompany = (groupIds, parentId) => {
  let data = [];
  groupIds.forEach(function (g) {
    data.push({
      groupId: g,
      parentId: parentId
    })
  });
  return request('/H_roleplay-si/sysGroup/updateBatch', {}, 'POST', data);
}
/**
 *@author zhaohuai 
 新增公司成员
 * 
 */
export const addCompanyMember = (userIds, groupId) => {
  let data = [];
  userIds.forEach(function (u) {
    data.push({
      "userId": u,
      "groupId": groupId
    });
  });
  return request('/H_roleplay-si/sysGroup/addGroupUser', {}, 'POST', data);
}
/**
 * @author zhaohuai
 * 删除公司成员
 */
export const removeCompanyMember = (userIds, groupId) => {
  let data = [];
  if (userIds.length > 0) {
    userIds.forEach(function (u) {
      data.push({
        "userId": Number(u),
        "groupId": Number(groupId)
      });
    });
  }
  return request('/H_roleplay-si/sysGroup/delGroupUser', {}, 'POST', data);
}
/**
 * 
 * @author zhaohuai
 * 删除公司
 */
export const removeCompany = (groupIds) => {
  let data = [];
  if (groupIds.length > 0) {
    groupIds.forEach(function (g) {
      data.push({
        "groupId": Number(g),
        "parentId": "1"
      })
    });
  }
  return request('/H_roleplay-si/sysGroup/updateBatch', {}, 'POST', data);
}

/**
 * @author XiaoYing
 * 获取所有公司数据
 * 
 */
export const getAllCompanys = (pageSize, currentPage, searchValue) => request('/H_roleplay-si/sysGroup/getCompanyList', {
  currentPage: currentPage,
  pageSize: pageSize,
  search: searchValue
});

/**
 * @author zhaohuai
 * 更新公司信息
 * 
 */
export const updateConpanyInfo = (data) => {
  let {
    groupName,
    groupShortName,
    companyType,
    status,
    groupId,
    groupPic
  } = data
  return request('/H_roleplay-si/sysGroup/updateBatch', {}, 'POST', [{
    groupName: groupName,
    groupShortName: groupShortName,
    companyType: companyType,
    status: status,
    groupId: groupId,
    groupPic: groupPic
  }])
}
/**
 * @author zhaohuai
 * 搜索公司
 */
export const searchCompany = (groupName) => request('/H_roleplay-si/sysGroup/getCompanyList', {
  search: groupName
});
/**
 * @author zhaohuai
 * 唯一校验
 */
export const checkValue = (test, id) => {
  let filter = [];
  if (id == "add") {
    filter = [{
      filedName: test.name,
      symbol: "=",
      value: test.value
    }]
  } else {
    filter = [{
      filedName: test.name,
      symbol: "=",
      value: test.value
    }, {
      filedName: "groupId",
      symbol: "<>",
      value: id
    }]
  }
  return request('/H_roleplay-si/trans/validate', {
    tableName: "sys_group",
    filter: JSON.stringify(filter)
  })
}

/************  公司  **************/
