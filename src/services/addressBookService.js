import {request} from './fetch';

/**
 * @author XiaoYing
 * @description 获取上级用户数据
 */
export const getHighUserData = (userId,pageSize,currentPage) => request('/H_roleplay-si/ds/getSubordinate',{
    userId: userId,
    page: currentPage,
    limit: pageSize
});