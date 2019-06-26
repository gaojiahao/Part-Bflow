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
                            <Input prefix="ios-contact" v-model="form.userName" placeholder="请输入用户名"></Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input prefix="md-lock" type="password" v-model="form.password" placeholder="请输入密码"></Input>
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
import Cookies from 'js-cookie';
import {login} from  '../services/loginService';


export default {
    data () {
        return {
            form: {
                userName: 'admin',
                password: '123456'
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
                    Cookies.set('userCode', this.form.userName);
                    Cookies.set('password', this.form.password);

                    login({
                        userCode:this.form.userName,
                        password:this.form.password
                    }).then(res =>{
                        if(res.success){
                            localStorage.setItem('roleplay-token', res.token);
                            this.$router.push({
                                name: 'home_index'
                            });
                        }
                    }).catch(err => {
                        this.$Message.error(err.data.message);
                    });
                    // this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    // if (this.form.userName === 'iview_admin') {
                    //     Cookies.set('access', 0);
                    // } else {
                    //     Cookies.set('access', 1);
                    // }
                    
                }
            });
        }
    }
};
</script>

<style>

</style>
