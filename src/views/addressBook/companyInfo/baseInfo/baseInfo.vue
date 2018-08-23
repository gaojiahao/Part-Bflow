<style lang="less">
@import "./baseInfo.less";
</style>
<template>
  <div class="baseInfo">
    <div class="baseInfo-warp">
      <div class="baseInfo-body">
        <Form :model="baseInfoItem" ref="baseInfoItem" :label-width="100" :rules="ruleValidate" :class="{'is-required':isEdit}">
          <FormItem label="公司照片:">
            <div class="uploadImg">
              <Upload v-if="!isEdit" ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" multiple type="drag" action="/H_roleplay-si/ds/upload" :headers="httpHeaders" style="display: inline-block;width:128px;vertical-align: middle;">
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
              <img v-else :src="logo?logo:false" style="width: 128px;height:128px;line-height: 128px;">
              <Modal title="查看头像" v-model="visible">
                <img :src="logo" v-if="visible" style="width: 100%">
              </Modal>
            </div>
          </FormItem>
          <FormItem label="公司名称:" prop="groupName">
            <Input v-model="baseInfoItem.groupName" :class="{'info-edit':isEdit}" :readonly="isEdit"></Input>
          </FormItem>
          <FormItem label="公司简称:" prop="groupShortName">
            <Input v-model="baseInfoItem.groupShortName" :class="{'info-edit':isEdit}" :readonly="isEdit"></Input>
          </FormItem>
          <FormItem label="公司类型:" prop="depFunction">
            <Select v-model="baseInfoItem.depFunction" v-if="!isEdit" :disabled="isEdit">
              <Option value='有限责任公司'>有限责任公司</Option>
              <Option value='股份有限公司'>股份有限公司</Option>
              <Option value='集团公司'>集团公司</Option>
              <Option value='有限合伙'>有限合伙</Option>
              <Option value='普通合伙'>普通合伙</Option>
              <Option value='个人独资'>个人独资</Option>
              <Option value='子公司'>子公司</Option>
            </Select>
            <span v-else style="margin-left:5px;">{{baseInfoItem.depFunction}}</span>
          </FormItem>
        </Form>
      </div>
      <div style="margin-top:5px; background: #fff; padding: 50px 110px 10px 118px;">
        <Form :label-width="80">
          <FormItem label="公司状态:">
            <Select v-model="baseInfoItem.status" v-if="!isEdit" :disabled="isEdit">
              <Option value="3">草稿</Option>
              <Option value="2">未使用</Option>
              <Option value="1">使用中</Option>
              <Option value="-1">停用</Option>
            </Select>
            <span v-else style="margin-left:5px;">{{baseInfoItem.statusText}}</span>
          </FormItem>
        </Form>
      </div>
    </div>
    <Row class="info-btn">
      <Button @click="toCompanyLst" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff;font-weight:bold;">关闭</Button>
      <Button v-if="isAdd" @click="isEditCompanyInfo" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff;font-weight:bold;">{{isEdit?'编辑':'放弃编辑'}}</Button>
      <Button v-if="baseInfoItem.groupId&&!isEdit" @click="updateCompanyData" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff;font-weight:bold;">保存</Button>
      <Button v-else-if="!isEdit&&!isAdd" @click="addCompanyData" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff;font-weight:bold;">保存</Button>
      <Button v-if="!baseInfoItem.groupId&&!isEdit&&!isAdd" @click="saveAndAddCompany" class="radius0" style="background-color: rgb(0, 150, 136) !important;color:#fff;font-weight:bold;">保存并新建</Button>
    </Row>
  </div>
</template>

<script>
import { getToken } from "@/utils/utils";
import {
  saveCompanyInfo,
  getCompanyInfoByGroupId,
  updateConpanyInfo,
  checkValue
} from "@/services/addressBookService.js";
export default {
  data() {
    return {
      httpHeaders: {
        Authorization: getToken()
      },
      logo: "",
      visible: false,
      isEdit: true,
      isAdd: true,
      cacheGroupName: "",
      cacheShortName: "",
      baseInfoItem: {
        groupName: "",
        groupShortName: "",
        depFunction: "",
        status: "1"
      },
      ruleValidate: {
        groupName: [
          {
            required: true,
            validator: this.groupNameValidator,
            trigger: "blur"
          }
        ],
        groupShortName: [
          {
            required: true,
            validator: this.groupShortNameValidator,
            trigger: "blur"
          }
        ],
        depFunction: [
          {
            required: true,
            message: "请选择公司类型",
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
        if (res.length > 0) {
          this.baseInfoItem = res[0];
          this.logo = res[0].groupPic;
          this.cacheShortName = res[0].groupShortName;
          this.cacheGroupName = res[0].groupName;
          this.baseInfoItem.status = String(this.baseInfoItem.status);
          switch (this.baseInfoItem.status) {
            case "1":
              this.baseInfoItem.statusText = "使用中";
              break;
            case "-1":
              this.baseInfoItem.statusText = "停用";
              break;
            case "2":
              this.baseInfoItem.statusText = "未使用";
              break;
            default:
              this.baseInfoItem.statusText = "草稿";
          }
        }
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
    isEditCompanyInfo() {
      this.isEdit = !this.isEdit;
    },
    //保存并新增
    saveAndAddCompany() {
      let baseInfo = this.baseInfoItem;
      let data = {
        groupName: baseInfo.groupName,
        groupShortName: baseInfo.groupShortName,
        depFunction: baseInfo.depFunction,
        status: baseInfo.status,
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
        groupId: groupId,
        groupPic: this.logo
      };
      this.$refs["baseInfoItem"].validate(valid => {
        if (valid) {
          updateConpanyInfo(data).then(res => {
            if (res.success) {
              this.$Message.success("保存成功");
              window.location.reload();
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      });
    },
    groupNameValidator: function(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入公司名称"));
      } else if (this.cacheGroupName != value) {
        debugger;
        let test = { name: "groupName", value: value };
        let id =
          this.$route.name == "add"
            ? this.$route.name
            : this.$route.params.groupId;
        checkValue(test, id).then(res => {
          if (!res.result == 0) {
            this.$Message.error("公司名称已存在！请重新输入");
            return callback(new Error(" "));
          } else {
            return callback();
          }
        });
      } else {
        callback();
      }
    },
    groupShortNameValidator: function(rule, value, callback) {
      if (!value) {
        this.$Message.error("请输入公司简称");
        return callback(new Error("请输入公司简称"));
      } else if (this.cacheShortName != value) {
        let test = { name: "groupShortName", value: value };
        let id =
          this.$route.name == "add"
            ? this.$route.name
            : this.$route.params.groupId;
        checkValue(test, id).then(res => {
          if (!res.result == 0) {
            this.$Message.error("公司简称已存在！请重新输入");
            return callback(new Error(" "));
          } else {
            return callback();
          }
        });
      } else {
        callback();
      }
    },
    toCompanyLst() {
      this.$Modal.confirm({
        title: "系统提示",
        content: "确认要关闭当前页面吗？",
        onOk: () => {
          location.href = "/Site/index.html#page/companys";
        }
      });
    }
  },
  mounted() {
    let groupId =
      this.$route.name == "add" ? this.$route.name : this.$route.params.groupId;
    if ("add" == groupId) {
      this.isEdit = false;
      this.isAdd = false;
      return;
    }
    this.getCompanyInfo(groupId);
  }
};
</script>
