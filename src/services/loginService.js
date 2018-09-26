import {request} from './fetch'


export const login = (user) =>  request('../mock/login/user.json',user);

export const activeUser = (m,t,userCode,password) =>  request('/H_roleplay-si/userInfo/register',{
    m: m,
    t: t,
    userCode: userCode,
    password: password
},'POST');
