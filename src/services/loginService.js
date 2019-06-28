import {request} from './fetch'


export const login = (user) =>  request('/H_roleplay-si/login',{},'POST',user);

export const activeUser = (m,t,e,userCode,nickname,password) =>  request('/H_roleplay-si/userInfo/register',{
    m: m,
    t: t,
    e: e,
    usercode: userCode,
    nickname: nickname,
    password: password
},'POST');
