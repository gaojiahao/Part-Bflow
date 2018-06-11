import {request} from './fetch'


export const login = (user) =>  request('../mock/login/user.json',user);
