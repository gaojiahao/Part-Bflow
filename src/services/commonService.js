import {request} from './fetch';
  
/**
 * @author snack.huang
 * @description 获取数据字典
 */
export const getDictByValue = (value) => request('/H_roleplay-si/base/dict/getListByValue', {
    value: value
})
  