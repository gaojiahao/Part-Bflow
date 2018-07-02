import {request} from './fetch'


export const getAppData = () =>  request('../mock/appList/appData.json');

export const getAppListData = () =>  request('../mock/appList/appList.json');