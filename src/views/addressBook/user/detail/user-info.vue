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
            <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="80">
                <FormItem label="工号" prop="userId">
                    <Input v-model="formItem.userId" placeholder=""></Input>
                </FormItem>
                <FormItem label="姓名" prop="userName">
                    <Input v-model="formItem.userName" placeholder=""></Input>
                </FormItem>
                <FormItem label="性别">
                    <RadioGroup v-model="formItem.gender">
                        <Radio label="male">男</Radio>
                        <Radio label="female">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="手机" prop="handphone">
                    <Input v-model="formItem.handphone" placeholder=""></Input>
                </FormItem>
                <FormItem label="座机">
                    <Input v-model="formItem.telphone" placeholder=""></Input>
                </FormItem>
                <FormItem label="邮箱" prop="mail">
                    <Input v-model="formItem.mail" placeholder=""></Input>
                </FormItem>
                <FormItem label="账户有效期">
                    <DatePicker type="date" placeholder="" v-model="formItem.date"></DatePicker>
                </FormItem>
                <FormItem label="状态">
                    <Select v-model="formItem.status">
                        <Option value="inUse">使用中</Option>
                        <Option value="stopUse">停用</Option>
                        <Option value="noUse">未使用</Option>
                    </Select>
                </FormItem>
                <FormItem label="说明">
                    <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
                </FormItem>
            </Form>
            </Col>
        </Row>
    </div>
</template>

<script>
import { getToken } from "@/utils/utils";

export default {
  name: "userInfo",
  components: {},
  props: {},
  data() {
    return {
      httpHeaders: {
        Authorization: getToken()
      },
      logo: "",
      formItem: {
        userId: "",
        userName: "",
        handphone: "",
        telphone: "",
        mail: "",
        status: "",
        gender: "male",
        date: "",
        textarea: ""
      },
      ruleValidate: {
          userId: [
          {
            required: true,
            message: "请输入用户工号",
            trigger: "blur"
          }
        ],
        userName: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: "blur"
          }
        ],
        handphone: [
          {
            required: true,
            message: "手机号不允许为空",
            trigger: "blur"
          }
        ],
        mail: [
          { type: "email", message: "邮箱输入不合法", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
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
    }
  },
  mounted() {}
};
</script>
