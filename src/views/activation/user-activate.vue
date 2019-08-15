<style lang="less" scoped>
    @import './activation.less';
    .form-con{
        .verification-code /deep/ .ivu-input-group-append{
            border-left: 1px solid #dcdee2;
            border-bottom-left-radius: 4px !important;
            border-top-left-radius: 4px !important;
        }
        .formItem-label{
            font-size: 14px;
        }
    }
</style>

<template>
    <div class="active-body">
      <Row justify="center" type="flex" :style="{height:'100%',alignItems:isMobile?'':'center'}">
        <Col :xs="24" :sm="12" :md="8" :lg="7" style="z-index: 10000;">
          <div class="active-con" :style="{height:isMobile?'100%':''}">
              <div style="text-align:center;">
                  <img src="static/favicon.ico" style="width: 40px;"></img>
                  <b>Roletask</b>
              </div>
              <p class="active-welcome">欢迎激活账号！</p>
              <div class="form-con">
                  <Form ref="activeForm" :model="form" :rules="rules" label-position="top">
                     <Row>
                        <Col span="24">
                          <FormItem prop="userCode">
                            <span slot="label" class="formItem-label">手机号：</span>
                            <Input v-model="form.userCode" placeholder="请输入手机号"></Input>
                          </FormItem>
                        </Col>
                     </Row>
                     <Row>
                        <Col span="20">
                          <FormItem prop="verificationCode" class="verification-code">
                              <span slot="label" class="formItem-label">短信验证码：</span>
                              <Input v-model="form.verificationCode" placeholder="请输入短信验证码">
                              </Input>
                          </FormItem>
                        </Col>
                        <Col span="4">
                            <Button 
                              @click="getVerificationCode" 
                              style="position: absolute;top: 27px;right: -8px;" 
                              :disabled="isVerification">
                              {{ isVerification ? `${codeSeconds}秒` : '获取验证码' }}
                            </Button>
                        </Col>
                     </Row>
                      <FormItem prop="password">
                          <span slot="label" class="formItem-label">密码：</span>
                          <Input type="password" v-model="form.password" placeholder="请输入密码"></Input>
                      </FormItem>
                      <FormItem prop="confirmPassword">
                          <span slot="label" class="formItem-label">确认密码：</span>
                          <Input 
                            type="password" 
                            @on-blur="blurConfirmPwd" 
                            v-model="form.confirmPassword" 
                            placeholder="请确认密码">
                          </Input>
                      </FormItem>
                      <FormItem>
                          <Button @click="handleSubmit" type="primary" long>激活</Button>
                      </FormItem>
                  </Form>
                  <p class="active-tip">请输入正确的手机号和密码</p>
              </div>
          </div>
        </Col>
      </Row>
        
    </div>
</template>

<script>
import { activationUser, sendVerificationCode } from "@/services/loginService.js";
import { platformDevice } from '@/utils/platform-device-utils';

export default {
  data() {
    return {
      codeSeconds: 60,
      isMobile: false,
      isVerification: false,
      form: {
        userCode: "",
        verificationCode: "",
        password: "",
        confirmPassword: ""
      },
      rules: {
        userCode: [
          { required: true, message: "手机号不能为空", trigger: "blur", pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/ }
        ],
        verificationCode: [
          { required: true, message: "短信验证码不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码必须同时包含字母和数字，且在8-20位之间！",pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/, trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { message: "密码必须同时包含字母和数字，且在8-20位之间！",pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      let data = {};
      this.$refs.activeForm.validate(valid => {
        if (!valid) {
            return;
        }

        if (this.form.password !== this.form.confirmPassword) {
            this.$Message.error("两次输入的密码不一致！请重新输入");
            return;
        }

        data = {
            userCode: this.form.userCode,
            verifiCode: this.form.verificationCode,
            password: this.form.password
        }
        activationUser(data).then(res => {
            if (res.success) {
              this.$Message.success(res.message);
              location.href = location.origin + '/Login/index.html';
            }else{
              this.$Message.error(res.message);
            }
          })
      });
    },
    //失去焦点再次确定密码一致性
    blurConfirmPwd() {
      if (this.form.password !== this.form.confirmPassword) this.$Message.error("两次输入的密码不一致！请重新输入");
    },
    //获取验证码
    getVerificationCode() {
      let data = {};

      if(!this.form.userCode){
        this.$Message.error('请先输入手机号！');
        return;
      }

      data.userCode = this.form.userCode;
      sendVerificationCode(data).then(res => {
        if(res.success){
          this.$Message.success(res.message);
          this.isVerification = true;
          let interval = setInterval(() => {
            if(this.codeSeconds === 0){
              clearInterval(interval);
              this.isVerification = false;
              this.codeSeconds = 60;
            }else{
              this.codeSeconds --;
            }
          },1000)
        }
      }).catch(err => {
          this.$Message.error(err.data.message);
      })
    }
  },
  mounted() {
    let versions = platformDevice();
    if (versions.versions.mobile) this.isMobile = true;
  }
};
</script>

<style>
</style>
