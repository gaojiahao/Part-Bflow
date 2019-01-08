import {request} from './fetch'

/**
 * @author XiaoYing
 * @description 获取文件夹数据
 */
export const getFileData = (folderPath) =>  request('/H_roleplay-si/filing/query',{
    folderPath: folderPath
});