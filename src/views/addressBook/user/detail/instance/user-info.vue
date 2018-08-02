<style lang="less">
@import './user-info.less';
</style>

<template>
    <div class="info">
        <Row class="info-detail">
            <Col span="4" class="info-logo">
            <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" type="drag" action="/H_roleplay-si/ds/upload" style="display: inline-block;width:128px;vertical-align: middle;" :headers="httpHeaders">
                <div style="width: 128px;height:128px;line-height: 128px;" v-if="!logo">
                    <img v-if="logo" :src="logo">
                    <i v-if="!logo" class="iconfont">&#xe63b;</i>
                </div>
                <div style="width: 128px;height:128px;line-height: 128px;" class="demo-upload-list" v-if="logo">
                    <img :src="logo">
                    <div class="demo-upload-list-cover">
                        <Icon type="camera" color="#fff" size="30"></Icon>
                    </div>
                </div>
            </Upload>
            </Col>
            <Col span="12" class="info-form">
            <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="85">
                <FormItem label="工号：" prop="userCode">
                    <Input v-model="formItem.userCode" placeholder=""></Input>
                </FormItem>
                <FormItem label="姓名：" prop="nickname">
                    <Input v-model="formItem.nickname" placeholder=""></Input>
                </FormItem>
                <FormItem label="性别：">
                    <RadioGroup v-model="formItem.gender">
                        <Radio label="1">男</Radio>
                        <Radio label="0">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="手机：" prop="mobile">
                    <Input v-model="formItem.mobile" placeholder=""></Input>
                </FormItem>
                <FormItem label="座机：">
                    <Input v-model="formItem.officePhone" placeholder=""></Input>
                </FormItem>
                <FormItem label="邮箱：" prop="email">
                    <Input v-model="formItem.email" placeholder=""></Input>
                </FormItem>
                <FormItem label="账户有效期：">
                    <DatePicker type="date" placeholder="" v-model="formItem.termOfValidity"></DatePicker>
                </FormItem>
                <FormItem label="状态：">
                    <Select v-model="formItem.status">
                        <Option value="1">使用中</Option>
                        <Option value="3">草稿</Option>
                        <Option value="0">停用</Option>
                        <Option value="2">未使用</Option>
                    </Select>
                </FormItem>
                <FormItem label="说明：">
                    <Input v-model="formItem.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
                </FormItem>
            </Form>
            </Col>
        </Row>
        <Row class="info-btn">
            <Button type="info">取消</Button>
            <Button @click="updateUserData" type="info">保存</Button>
            <Button type="info">保存并继续添加</Button>
        </Row>
    </div>
</template>

<script>
import { getToken } from "@/utils/utils";
import { updateUser,addUser } from "@/services/addressBookService.js";

export default {
  name: "userInfo",
  components: {},
  props: {
      userInfo: {
          type: Object
      }
  },
  data() {
    return {
      httpHeaders: {
        Authorization: getToken()
      },
      logo: "",
      formItem: {
        userCode: "",
        nickname: "",
        mobile: "",
        officePhone: "",
        email: "",
        status: "1",
        gender: "1",
        termOfValidity: "",
        comment: ""
      },
      ruleValidate: {
          userCode: [
          {
            required: true,
            message: "请输入用户工号",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            message: "手机号输入不合法",
            trigger: "blur",
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/
          }
        ],
        email: [
          { type: "email", message: "邮箱输入不合法", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
      userInfo: function(){
          this.formItem.userCode = this.userInfo.userCode;
          this.formItem.nickname = this.userInfo.nickname;
          this.formItem.mobile = this.userInfo.mobile;
          this.formItem.officePhone = this.userInfo.officePhone;
          this.formItem.email = this.userInfo.email;
          this.formItem.termOfValidity = this.userInfo.termOfValidity;
          this.formItem.comment = this.userInfo.comment;
          this.formItem.gender = String(this.userInfo.gender);
          this.formItem.status = String(this.userInfo.status);
          this.logo = this.userInfo.photo;
      }
  },
  methods: {
    handleSuccess(res, file) {
      this.logo =
        "/H_roleplay-si/ds/download?width=128&height=128&specify=true&url=" +
        res.data[0].attacthment;
    },

    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小超出范围",
        desc: "文件大小最大为2M"
      });
    },

    //判断上传图片格式是否有误
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不对",
        desc: "请上传格式为png 或者 jpg 的图片"
      });
    },
    //更新用户详情信息
    updateUserData() {
        this.$refs["formItem"].validate(valid => {
            if(valid){
                this.formItem.photo = this.logo;
                this.formItem.userId = this.userInfo.userId;
                this.formItem.termOfValidity = this.formatDate(this.formItem.termOfValidity);
                updateUser(this.formItem).then(res => {
                    if(res.success){
                        this.$Message.success(res.message);
                    }
                }).catch(error => {
                    this.$Message.error(error.data.message);
                })
            }
        })
    },
    //格式化日期方法
    formatDate(currentDate) {
      let date = new Date(currentDate),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        relDate;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      relDate = year + "-" + month + "-" + day;

      return relDate;
    }
  },
  mounted() {
     
  }
};
</script>
