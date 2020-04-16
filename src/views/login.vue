<style lang="less">
    @import './login.less';
</style>

<template>
<div class="login-body">
    <div class="login" @keydown.enter="handleSubmit">
        <section class="describe">
            <h1 class="describe-title">Roletask</h1>
            <div class="describe-content">基于<span class="extrude">精益流程，智能数据，</span>科学的计量你与团队创造的<span class="extrude">价值</span>。</div>
        </section>
        <div class="login-con">
            <Card :bordered="true">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input prefix="ios-contact" @keyup.enter="handleSubmit" v-model="form.userName" placeholder="请输入用户名"></Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input prefix="md-lock" type="password" @keyup.enter="handleSubmit" v-model="form.password" placeholder="请输入密码"></Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">请输入正确的用户名和密码</p>
                </div>
            </Card>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import {login,getDsUrl,getCurrentUserInfo} from  '../services/loginService';
import { deepstream } from '@/plugin/deepstream';
export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    login({
                        userCode:this.form.userName,
                        password:this.form.password
                    }).then(res =>{
                        if(res.success){
                            localStorage.setItem('roleplay-token', JSON.stringify(res));

                            getCurrentUserInfo().then( res=>{
                                if(res){
                                    let user = res;
                                        user.isBusinessAdmin  = false;
                                        user.isOperationAdmin = false;
                                
                                    user.isSysRoleList.map(role=>{
                                        //企业管理员
                                        if(role.id === 1) user.isBusinessAdmin = true;
                                        //运营管理员
                                        if(role.id === -1) user.isOperationAdmin = true;
                                    });
                                    Vue.prototype.$currentUser = user;

                                    sessionStorage.setItem('roletask.com.r2.cache',JSON.stringify({
                                        currentUser:user
                                    }));

                                    
                                    getDsUrl().then(async (r) =>{
                                        if(r.success){
                                            let dsUri = {
                                                'deepstream.uri2':r.message
                                            };
                                            
                                            sessionStorage.setItem('r2-cached-properties',JSON.stringify(dsUri));
                                            // Vue.prototype.$deepstream = await deepstream(user,JSON.stringify(dsUri));
                                             Vue.prototype.$deepstream = await deepstream(user,null);
                                            debugger
                                            console.log('asdasdsaasda',Vue.prototype.$deepstream);
                                            this.$router.push({
                                                name: 'home_index'
                                            });
                                        }
                                    });
                                }
                               
                            });
                            
                            
                        }
                    }).catch(err => {
                        this.$Message.error(err.data.message);
                    });
                }
            });
        }
    }
};
</script>
