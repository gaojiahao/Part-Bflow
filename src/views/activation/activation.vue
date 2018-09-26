<style lang="less">
    @import './activation.less';
</style>

<template>
    <div class="active-body">
        <div class="active-con">
            <div style="text-align:center;">
                <img src="static/favicon.ico" style="width: 40px;"></img>
                <b>Roletask</b>
            </div>
            <p class="active-welcome">欢迎激活账号</p>
            <div class="form-con">
                <Form ref="activeForm" :model="form" :rules="rules">
                    <FormItem prop="userCode" label="账号：">
                        <Input v-model="form.userCode" placeholder="请输入账号"></Input>
                    </FormItem>
                    <FormItem prop="userName" label="昵称：">
                        <Input v-model="form.userName" placeholder="请输入昵称"></Input>
                    </FormItem>
                    <FormItem prop="password" label="密码：">
                        <Input type="password" v-model="form.password" placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem prop="confirmPassword" label="确认密码：">
                        <Input type="password" v-model="form.confirmPassword" placeholder="请确认密码"></Input>
                    </FormItem>
                    <FormItem>
                        <Button @click="handleSubmit" type="primary" long>激活</Button>
                    </FormItem>
                </Form>
                <p class="active-tip">请输入账号和密码</p>
            </div>
        </div>
    </div>
</template>

<script>
import { activeUser } from "@/services/loginService.js";

export default {
  data() {
    return {
      email: this.$route.query,
      form: {
        userCode: "",
        userName: "",
        password: "",
        confirmPassword: ""
      },
      rules: {
        userCode: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.activeForm.validate(valid => {
        if (valid) {
          if (this.form.password === this.form.confirmPassword) {
            activeUser(
              this.email.m,
              this.email.t,
              this.email.e,
              this.form.userCode,
              this.form.userName,
              this.form.password
            )
              .then(res => {
                if (res.success) {
                  this.$Message.success(res.message);
                }
              })
              .catch(err => {
                this.$Message.error(err.data.message);
              });
          } else {
            this.$Message.error("两次输入的密码不一致！");
          }
        }
      });
    }
  },
  mounted() {}
};
</script>

<style>
</style>
