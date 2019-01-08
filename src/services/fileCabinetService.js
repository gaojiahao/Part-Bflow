import {request} from './fetch'

/**
 * @author XiaoYing
 * @description 获取文件夹数据
 */
export const getFileData = (folderPath) =>  request('/H_roleplay-si/filing/query',{
    folderPath: folderPath
});

/**
 * @author XiaoYing
 * @description 重命名文件
 */
export const renameFile = (srcPath,newName) =>  request('/H_roleplay-si/filing/rename',{
    srcPath: srcPath,
    newName: newName
},'POST');