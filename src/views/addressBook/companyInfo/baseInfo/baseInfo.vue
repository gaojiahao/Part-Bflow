<style lang="less" scoped>
@import "./baseInfo.less";
</style>
<template>
  <div class="baseInfo">
    <div class="baseInfo-warp">
      <div class="baseInfo-body">
        <div class="uploadImg">
          <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" multiple type="drag" action="/H_roleplay-si/ds/upload" :headers="httpHeaders" style="display: inline-block;width:128px;vertical-align: middle;">
            <div style="width: 128px;height:128px;line-height: 128px;" v-if="!logo">
              <img v-if="logo" :src="logo">
              <i v-if="!logo" class="iconfont">&#xe63b;</i>
            </div>
            <div style="width: 128px;height:128px;line-height: 128px;" class="demo-upload-list" v-if="logo">
              <img :src="logo">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" color="#fff" size="30" @click.stop="handleView"></Icon>
                <Icon type="ios-trash-outline" color="#fff" size="30" @click.stop="handleRemove"></Icon>
              </div>
            </div>
          </Upload>
          <Modal title="查看头像" v-model="visible">
            <img :src="logo" v-if="visible" style="width: 100%">
          </Modal>
        </div>
        <Form :model="baseInfoItem" ref="baseInfoItem" :label-width="80" :rules="ruleValidate">
          <FormItem label="公司名称" prop="groupName">
            <Input v-model="baseInfoItem.groupName"></Input>
          </FormItem>
          <FormItem label="公司简称" prop="groupShortName">
            <Input v-model="baseInfoItem.groupShortName"></Input>
          </FormItem>
          <FormItem label="公司类型">
            <RadioGroup v-model="baseInfoItem.depFunction">
              <Radio label='有限责任公司'></Radio>
              <Radio label='股份有限公司'></Radio>
              <Radio label='集团公司'></Radio>
              <Radio label='有限合伙'></Radio>
              <Radio label='普通合伙'></Radio>
              <Radio label='个人独资'></Radio>
              <Radio label='子公司'></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="公司状态">
            <Select v-model="baseInfoItem.status">
              <Option value="3">草稿</Option>
              <Option value="2">未使用</Option>
              <Option value="1">使用中</Option>
              <Option value="0">停用</Option>
            </Select>
          </FormItem>
          <FormItem label="公司说明">
            <Input v-model="baseInfoItem.comment" type="textarea" :rows="3"></Input>
          </FormItem>
        </Form>
      </div>
    </div>
    <Row class="info-btn">
      <Button v-if="baseInfoItem.groupId" @click="updateCompanyData" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff">更新</Button>
      <Button v-else @click="addCompanyData" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff">保存</Button>
      <Button @click="goCompanyList" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff">取消</Button>
      <Button v-if="!baseInfoItem.groupId" @click="saveAndAddCompany" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff">保存并继续添加</Button>
    </Row>
  </div>
</template>

<script>
import { getToken } from "@/utils/utils";
import {
  saveCompanyInfo,
  getCompanyInfoByGroupId,
  updateConpanyInfo
} from "@/services/addressBookService.js";
export default {
  data() {
    return {
      httpHeaders: {
        Authorization: getToken()
      },
      logo: "",
      visible: false,
      baseInfoItem: {
        groupName: "",
        groupShortName: "",
        depFunction: "",
        status: "",
        comment: ""
      },
      ruleValidate: {
        groupName: [
          {
            required: true,
            message: "请输入公司名称",
            trigger: "blur"
          }
        ],
        groupShortName: [
          {
            required: true,
            message: "请输入公司简称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSuccess(res, file) {
      this.logo =
        "/H_roleplay-si/ds/download?width=128&height=128&specify=true&url=" +
        res.data[0].attacthment;
    },

    //查看头像
    handleView() {
      this.visible = true;
    },
    //删除头像
    handleRemove() {
      this.logo = "";
      this.$refs["upload"].fileList.splice(
        0,
        this.$refs["upload"].fileList.length
      );
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
    //保存公司基本信息
    addCompanyData() {
      let baseInfo = this.baseInfoItem;
      let data = {
        groupName: baseInfo.groupName,
        groupShortName: baseInfo.groupShortName,
        depFunction: baseInfo.depFunction,
        status: baseInfo.status,
        comment: baseInfo.comment,
        groupCode: this.guid(),
        groupPic: this.logo
      };
      this.$refs["baseInfoItem"].validate(valid => {
        if (valid) {
          saveCompanyInfo(data).then(res => {
            let groupId =
              this.$route.name == "add"
                ? this.$route.name
                : this.$route.params.groupId;
            if (res[0].groupId) {
              this.$Message.info("保存成功");
              this.$router.push({
                path: "/addressBook/companyInfo/baseInfo/" + res[0].groupId
              });
              window.location.reload();
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      });
    },
    //获取公司基本信息
    getCompanyInfo(groupId) {
      getCompanyInfoByGroupId(groupId).then(res => {
        this.baseInfoItem = res[0];
        this.logo = res[0].groupPic;
        this.baseInfoItem.status = String(this.baseInfoItem.status);
      });
    },
    guid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    },
    goCompanyList() {
      this.$router.push({ path: "/addressBook/companyInfo/board" });
    },
    //保存并新增
    saveAndAddCompany() {
      let baseInfo = this.baseInfoItem;
      let data = {
        groupName: baseInfo.groupName,
        groupShortName: baseInfo.groupShortName,
        depFunction: baseInfo.depFunction,
        status: baseInfo.status,
        comment: baseInfo.comment,
        groupCode: this.guid(),
        groupPic: this.logo
      };
      this.$refs["baseInfoItem"].validate(valid => {
        if (valid) {
          saveCompanyInfo(data).then(res => {
            let groupId =
              this.$route.name == "add"
                ? this.$route.name
                : this.$route.params.groupId;
            if (res[0].groupId) {
              this.$Message.info("保存成功");
              this.$refs["baseInfoItem"].resetFields();
              this.logo = "";
              this.baseInfoItem.groupName = "";
              this.baseInfoItem.groupShortName = "";
              this.baseInfoItem.status = "1";
              this.baseInfoItem.depFunction = "";
              this.baseInfoItem.comment = "";
              this.$refs["upload"].fileList.splice(
                0,
                this.$refs["upload"].fileList.length
              );
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      });
    },
    updateCompanyData() {
      let baseInfo = this.baseInfoItem;
      let groupId =
        this.$route.name == "add"
          ? this.$route.name
          : this.$route.params.groupId;
      let data = {
        groupName: baseInfo.groupName,
        groupShortName: baseInfo.groupShortName,
        depFunction: baseInfo.depFunction,
        status: baseInfo.status,
        comment: baseInfo.comment,
        groupId: groupId,
        groupPic: this.logo
      };
      this.$refs["baseInfoItem"].validate(valid => {
        if (valid) {
          updateConpanyInfo(data).then(res => {
            if (res.success) {
              this.$Message.info("更新成功");
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      });
    }
  },
  mounted() {
    let groupId =
      this.$route.name == "add" ? this.$route.name : this.$route.params.groupId;
    if ("add" == groupId) {
      return;
    }
    this.getCompanyInfo(groupId);
  }
};
</script>
