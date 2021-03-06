import {request} from './fetch'

export const login = (user) => request('/H_roleplay-si/login', {}, 'POST', user)

export const getDsUrl = () => request('/H_roleplay-si/ds/getProp', {
  key: 'deepstream.uri2'
})
/**
 * @author snack.haugng
 * @description 获取当前用户信息
 */
export const getCurrentUserInfo = () => request('/H_roleplay-si/userInfo/currentUser')

export const activeUser = (m, t, e, userCode, nickname, password) => request('/H_roleplay-si/userInfo/register',{
  m: m,
  t: t,
  e: e,
  usercode: userCode,
  nickname: nickname,
  password: password
}, 'POST')

export const activationUser = (data) =>  request('/H_roleplay-si/sendVerification/activation',{},'POST',data);

/**
 * 发送手机验证码
 * @param {Object} data 手机号
 */
export const sendVerificationCode = (data) =>  request('/H_roleplay-si/sendVerification',{},'POST',data);
