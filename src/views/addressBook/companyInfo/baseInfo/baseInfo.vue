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
              <img v-else :src="logo?logo:false">
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
          <FormItem label="公司类型:" prop="companyType">
            <Select v-model="baseInfoItem.companyType" v-if="!isEdit" :disabled="isEdit">
              <Option value='有限责任公司'>有限责任公司</Option>
              <Option value='股份有限公司'>股份有限公司</Option>
              <Option value='集团公司'>集团公司</Option>
              <Option value='有限合伙'>有限合伙</Option>
              <Option value='普通合伙'>普通合伙</Option>
              <Option value='个人独资'>个人独资</Option>
              <Option value='子公司'>子公司</Option>
              <Option value='其他'>其他</Option>
            </Select>
            <span v-else style="margin-left:5px;">{{baseInfoItem.companyType}}</span>
          </FormItem>
        </Form>
      </div>
      <div v-if="isAdd&&isEdit" style="margin-top:5px; background: #fff; padding: 50px 110px 10px 118px;">
        <Form :label-width="80">
          <FormItem label="创建者:" >
            <span style="margin-left:5px;">{{baseInfoItem.creator}}</span>
          </FormItem>
          <FormItem label="创建时间:">
            <span style="margin-left:5px;">{{baseInfoItem.crtTime}}</span>
          </FormItem>
          <FormItem label="修改者:">
            <span style="margin-left:5px;">{{baseInfoItem.modifier}}</span>
          </FormItem>
          <FormItem label="修改时间:">
            <span style="margin-left:5px;">{{baseInfoItem.modTime}}</span>
          </FormItem>
        </Form>
      </div>
    </div>
    <Row class="info-btn">
      <Button @click="toCompanyLst" class="radius0 close-company">关闭</Button>
      <Button v-if="isAdd && isPermission" @click="isEditCompanyInfo" class="radius0 add-btn">{{isEdit?'编辑':'放弃编辑'}}</Button>
      <Button v-if="!isEdit" @click="addCompanyData" class="radius0 add-btn">保存</Button>
      <Button v-if="!isEdit && baseInfoItem.status === 1" @click="addCompanyData('file')" class="radius0 add-btn">归档</Button>
      <Button v-if="!groupId" @click="saveAndAddCompany" class="radius0 add-btn">保存并新建</Button>
      <Button v-if="!isEdit || !groupId" @click="addCompanyData('draft')" class="radius0 add-btn">保存草稿</Button>
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
  props: {
    isPermission: {
      type: Boolean
    }
  },
  data() {
    return {
      groupId: this.$route.params.groupId,
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
        companyType: "",
        status: -3
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
        companyType: [
          {
            required: true,
            message: "请选择公司类型",
            trigger: "change"
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
    addCompanyData(saveType) {
      let baseInfo = this.baseInfoItem,
          groupId = this.$route.name == "company-add" ? "add" : this.$route.params.groupId,
          data = {
            groupName: baseInfo.groupName,
            groupShortName: baseInfo.groupShortName,
            companyType: baseInfo.companyType,
            status: baseInfo.status,
            groupPic: this.logo
        };
      
      if(saveType === 'draft'){
        data.status = 0;
      }else if(saveType === 'file'){
        data.status = -2;
      }else{
        data.status = 1;
      }

      if(this.groupId){
        data.groupId = groupId;
      }else{
        data.groupCode = this.guid();
      }

      this.$refs["baseInfoItem"].validate(valid => {
        if (valid) {
          if(this.groupId){
            updateConpanyInfo(data).then(res => {
              if (res.success) {
                this.$Message.success("更新成功");
                window.location.reload();
              } else {
                this.$Message.error(res.message);
              }
            }).catch(error => {
                this.$Message.error(error.data.message);
            });
          }else{
            saveCompanyInfo(data).then(res => {
              if (res[0].groupId) {
                this.$Message.success("保存成功");
                this.$router.push({
                  path: "/addressBook/companyInfo/baseInfo/" + res[0].groupId
                });
                window.location.reload();
              } else {
                this.$Message.error(res.message);
              }
            });
          }
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
          this.baseInfoItem.status = this.baseInfoItem.status;
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
        companyType: baseInfo.companyType,
        status: 1,
        groupCode: this.guid(),
        groupPic: this.logo
      };
      this.$refs["baseInfoItem"].validate(valid => {
        if (valid) {
          saveCompanyInfo(data).then(res => {
            let groupId =
              this.$route.name == "company-add"
                ? "add"
                : this.$route.params.groupId;
            if (res[0].groupId) {
              this.$Message.success("保存成功");
              this.$refs["baseInfoItem"].resetFields();
              this.logo = "";
              this.baseInfoItem.groupName = "";
              this.baseInfoItem.groupShortName = "";
              this.baseInfoItem.status = -3;
              this.baseInfoItem.companyType = "";
              this.$refs["upload"].fileList.splice(
                0,
                this.$refs["upload"].fileList.length
              );
            } else {
              this.$Message.error(res.message);
            }
          }).catch(error => {
              this.$Message.error(error.data.message);
          });
        }
      });
    },
    groupNameValidator: function(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入公司名称"));
      } else if (this.cacheGroupName != value) {
        let test = { name: "groupName", value: value };
        let id =
          this.$route.name == "company-add"
            ? "add"
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
          this.$route.name == "company-add"
            ? "add"
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
    if (!this.groupId) {
      this.isEdit = false;
      this.isAdd = false;
    }
    this.getCompanyInfo(this.groupId);
  }
};
</script>
