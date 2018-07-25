/** 
 * @author GuoZheng
 * 设置头像
*/
export const downloadImage = (url) => request('/H_roleplay-si/ds/download', {
    url: url
  })
  
  /** 
   * @author GuoZheng
   * 获取企业信息
  */
  export const getEnterpriseById = (url) => request('/H_roleplay-si/app/getEnterpriseById')
  
  /** 
   * @author GuoZheng
   * 保存企业信息
  */
  export const addOrUpdateEnterprise = (id,logo,nickname,name,instruction,address,phone,admins) => request('/H_roleplay-si/app/addOrUpdateEnterprise',{})
  
  /** 
   * @author GuoZheng
   * 添加企业管理员
  */
  export const updateRelation = (url) => request('/H_roleplay-si/ps/updateRelation')
  
  /** 
   * @author GuoZheng
   * 删除企业管理员
  */
  export const deleteRelation = (url) => request('/H_roleplay-si/ps/deleteRelation')

  /**
 * @author XiaoYing
 * @description 获取管理员数据
 */
export const getAdminData = (groupId) => request('/H_roleplay-si/ds/getAllUsersByGroupId', {
    groupId: groupId
  });
  