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
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
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
                password: '1'
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
                    Cookies.set('user', this.form.userName);
                    Cookies.set('password', this.form.password);

                    login({
                        userName:this.form.userName,
                        password:this.form.password
                    }).then(res =>{

                        if(res.userName !== 'admin'){
                            return;
                        }

                        if(res.password !== '123456'){
                            return;
                        }
                        
                        this.$router.push({
                            name: 'home_index'
                        });
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
