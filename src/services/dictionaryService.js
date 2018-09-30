import {
  request
} from './fetch'

/**
 * @author zhaohuao
 * @description 获取字典列
 */
export const getMenuByParentId = (parentId) => request('/H_roleplay-si/base/dict/getChildren', {
  parentId: parentId
})
/**
 * @author zhaohuai
 * @description 删除字典列明细
 */
export const disableMenuItem = (id) => request('/H_roleplay-si/base/dict/delete', {
  list: 'sys_dict',
  id: id
}, 'POST', {})
/**
 * @author zhaohuai
 * @description 更新字典明细
 */
export const updateMenuItem = (data) => request('/H_roleplay-si/base/dict/save', data, 'POST', {})
