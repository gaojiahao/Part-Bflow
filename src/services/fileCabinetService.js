import {request} from './fetch'

/**
 * @author XiaoYing
 * @description 获取文件夹数据
 */
export const getFileData = (folderPath,isFile,search) =>  request('/H_roleplay-si/filing/query',{
    folderPath: folderPath,
    dir: isFile,
    search: search
});


/**
 * @author XiaoYing
 * @description 获取所有成员数据
 */
export const getAllMemberData = (limit,page,search) =>  request('/H_roleplay-si/filing/getUserList',{
    limit: limit,
    page: page,
    search: search
});

/**
 * @author XiaoYing
 * @description 获取分区成员数据
 */
export const getSubareaAuthority = (subareaId) =>  request('/H_roleplay-si/filing/getSubareaAuthority',{
    subareaId: subareaId
});

/**
 * @author XiaoYing
 * @description 获取文件详情
 */
export const getFileDataByPath = (id) =>  request('/H_roleplay-si/filing/info',{
    id: id
});

/**
 * @author XiaoYing
 * @description 重命名文件
 */
export const renameFile = (srcPath,newName) =>  request('/H_roleplay-si/filing/rename',{
    srcPath: srcPath,
    newName: newName
},'POST');

/**
 * @author XiaoYing
 * @description 创建文件夹、分区
 */
export const createFileSubarea = (folderPath) =>  request('/H_roleplay-si/filing/mkdir',{
    folderPath: folderPath
},'POST');

/**
 * @author XiaoYing
 * @description 删除文件、文件夹、分区
 */
export const deleteFile = (path) =>  request('/H_roleplay-si/filing/delete',{
    path: path
},'POST');

/**
 * @author XiaoYing
 * @description 复制（只能文件复制到文件，文件复制到文件夹，文件夹复制到文件夹，不能文件夹复制到文件）
 */
export const copyFile = (path, toPath) =>  request('/H_roleplay-si/filing/copy',{
    path: path,
    toPath: toPath
},'POST');

/**
 * @author XiaoYing
 * @description 移动（只能文件移动到文件，文件移动到文件夹，文件夹移动到文件夹，不能文件夹移动到文件）
 */
export const moveFile = (path, toPath) =>  request('/H_roleplay-si/filing/move',{
    path: path,
    toPath: toPath
},'POST');

/**
 * @author XiaoYing
 * @description 分区权限保存
 */
export const saveSubareaPermission = (data) =>  request('/H_roleplay-si/filing/au/save',{},'POST',data);

