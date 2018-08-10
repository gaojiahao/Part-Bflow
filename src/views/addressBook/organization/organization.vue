<style lang="less">
@import "./organization.less";
</style>

<template>
  <div class="organization-wrap">
    <header class="organization-wrap-header">
      <h2 v-if="groupId">
        <span style="color:#4CAF50;cursor:pointer" @click="goBack">组织</span>
        <span style="color:#808080;margin-left:10px">/</span>
        <span style="color:#808080;margin-left:10px">{{name}}</span>
        <span style="color:#808080;margin-left:10px">/</span>
        <span style="color:#808080;margin-left:10px">{{groupId}}</span>
        <Tag class="radius10 marlr10 color_fff" v-instanceStateDirective="{status:formItem.status,color:'#eb2f96'}"></Tag>
      </h2>
      <h2 v-if="!groupId">
        <span style="color:#4CAF50">添加组织</span>
        <span style="color:#808080;margin-left:10px">/</span>
        <span style="color:#808080;margin-left:10px">创建</span>
      </h2>
    </header>

    <div class="organization-wrap-action">
      <ul>
        <li v-for="(item,index) in actionBtn" :key="index" v-if="!item.hidden" class="organization-wrap-action-li" v-bind:class="index===actionIndex?'organization-wrap-action-li-active':''" @click="handlerViewChange(index)">
          <div style="padding:5px 0">
            <img :src="item.imgPath" class="organization-wrap-action-li-img"><img>
            <div class="left-content">
              <span v-show="item.number!=='undefine'">{{item.number}}</span>
              <h3>{{item.label}}</h3>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="organization-wrap-tabs">
      <!-- 基本信息 -->
      <section class="baseinfo-container rfd-tab-container-common" v-if="actionIndex===5">
        <Form :model="formItem" :labelWidth="100" ref="formItem" :rules="ruleValidate">
          <FormItem label="组织名称:" style="font-size:16px" prop="groupName">
            <Input v-model="formItem.groupName" @on-blur="onGroupNameOutBlur" />
          </FormItem>
          <FormItem label="组织状态" :labelWidth="100">
            <Select v-model="formItem.status">
              <Option v-for="(item,index) in statusRadio" :key="index" :value="item.value">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="组织类型" :labelWidth="100">
            <RadioGroup v-model="formItem.groupType">
              <Radio label="M">管理层</Radio>
              <Radio label="A">事业部</Radio>
              <Radio label="O">部门</Radio>
              <Radio label="G">小组</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="部门职能类型" :labelWidth="100" v-if="formItem.groupType ==='O'">
            <RadioGroup v-model="formItem.depFunction">
              <Radio label="M">管理</Radio>
              <Radio label="S">销售</Radio>
              <Radio label="C">制造</Radio>
              <Radio label="R">研发</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="组织说明" :labelWidth="100">
            <Input v-model="formItem.comment" type="textarea" :autosize="{minRows: 3,maxRows: 5}" />
          </FormItem>
        </Form>
        <div class="baseinfo-container-action">
          <input type='submit' value="取消" class="baseinfo-container-action-submit" @click="cancle" />
          <input type='submit' value="保存" class="baseinfo-container-action-submit" @click="save" />
          <input type='submit' value="保存并添加" class="baseinfo-container-action-submit" v-if="!groupId" @click="saveAndAdd" />
        </div>
      </section>
      <!-- 上级组织 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===4">
        <high-organization :groupId="groupId" :groupType="formItem.groupType" @on-high-organization-change='handleChangeObjDetailsCount'></high-organization>
      </section>
      <!-- 下级组织 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===3">
        <lower-organization :groupId="groupId" :groupType="formItem.groupType" @on-lower-organization-change='handleChangeObjDetailsCount'></lower-organization>
      </section>
      <!-- 负责人 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===2">
        <principal :groupId="groupId"  @on-principal-change='handleChangeObjDetailsCount'></principal>
      </section>
      <!-- 成员信息 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===1">
        <member-info :groupId="groupId" @on-member-info-change='handleChangeObjDetailsCount'></member-info>
      </section>
      <!-- 权限 -->
      <section class="permission-container rfd-tab-container-common" v-if="actionIndex===0">
        <permission :groupId="groupId" @on-permission-change='handleChangeObjDetailsCount'></permission>
      </section>
    </div>

  </div>
</template>

<script>
import {
  getOrgBaseInfo,
  getObjDetailsCountByGroupId,
  saveBaseinfo,
  updateBaseinfo,
  checkoutFieldIsOnly
} from "@/services/addressBookService.js";
import MemberModal from "@/components/modal/Modal";
import HighOrganization from "./instance/higher-organization";
import LowerOrganization from "./instance/lower-origanization";
import MemberInfo from "./instance/member-info";
import Principal from "./instance/principal";
import Permission from "./instance/permission";
export default {
  name: "organization",

  components: {
    MemberModal,
    HighOrganization,
    LowerOrganization,
    MemberInfo,
    Principal,
    Permission
  },

  data() {
    return {
      formItem: {
        groupName: "",
        groupType: "",
        depFunction: "",
        comment: "",
        status: 1
      },
      name: "",
      groupType: "",

      statusRadio: [
        {
          name: "停用",
          value: 0
        },
        {
          name: "使用中",
          value: 1
        },
        {
          name: "未使用",
          value: 2
        },
        {
          name: "草稿",
          value: 3
        }
      ],

      actionBtn: [
        {
          label: "权限",
          imgPath: "resources/images/icon/2_0.png",
          number: 0,
          hidden: false,
          id: "objectPermission"
        },
        {
          label: "成员信息",
          imgPath: "resources/images/icon/user.png",
          number: 0,
          hidden: false,
          id: "user"
        },
        {
          label: "负责人",
          imgPath: "resources/images/icon/user.png",
          number: 0,
          hidden: false,
          id: "groupPrincipal"
        },
        {
          label: "下级组织",
          imgPath: "resources/images/icon/organization.png",
          number: 0,
          hidden: false,
          id: "childGroup"
        },
        {
          label: "上级组织",
          imgPath: "resources/images/icon/organization.png",
          number: 0,
          hidden: false,
          id: "parentGroup"
        },
        {
          label: "基本信息",
          imgPath: "resources/images/icon/organization.png",
          hidden: false,
          id: "baseinfo"
        }
      ],
      actionIndex: 5,

      ruleValidate: {
        groupName: [
          {
            required: true,
            message: "请输入组织名称",
            trigger: "blur"
          }
        ]
      },

      checkout: true,

      groupId: this.$route.params.groupId
    };
  },

  methods: {
    handlerViewChange(index) {
      this.actionIndex = index;
    },

    cancle() {
      this.$router.push({
        path: "addressBook/organization/board"
      });
    },

    saveAndAdd() {
      this.$refs["formItem"].validate(valid => {
        if (valid && !this.groupId && this.checkout) {
          delete this.formItem.groupId;
          if (this.formItem.groupType === "O") {
            this.formItem.depFunction = "";
          }
          saveBaseinfo(this.formItem).then(res => {
            if (res) {
              this.$Message.success("保存成功");
              this.$refs["formItem"].resetFields();
              this.formItem = {
                groupName: "",
                groupType: "",
                depFunction: "",
                comment: "",
                status: 1
              };
            }
          });
        }
      });
    },

    save() {
      this.$refs["formItem"].validate(valid => {
        if (valid) {
          if (this.formItem.groupType !== "O") {
            this.formItem.depFunction = "";
          }
          if (!this.groupId && this.checkout) {
            delete this.formItem.groupId;
            saveBaseinfo(this.formItem).then(res => {
              if (res) {
                this.$Message.success("保存成功");
                this.$router.push({
                  path: "/addressBook/organization/detail/" + res.groupId
                });
                window.location.reload();
              }
            });
          } else if(this.groupId && this.checkout){
            this.formItem.groupId = this.groupId;
            updateBaseinfo(this.formItem).then(res => {
              if (res) {
                this.$Message.success("保存成功");
              }
            });
          }
        }
      });
    },

    getObjDetailsCountByGroupId(groupId) {
      getObjDetailsCountByGroupId(groupId).then(res => {
        this.actionBtn.forEach(element => {
          element.number = res[element.id];
        });
      });
    },

    handleChangeObjDetailsCount(val) {
      if (val) {
        this.getObjDetailsCountByGroupId(this.groupId);
      }
    },

    goBack() {
      this.$router.push({
        path: "/addressBook/organization/board"
      });
    },

    //当组织名称失去焦点的是校验名称
    onGroupNameOutBlur() {
      //当groupId不存在时，校验名称是否唯一
      if (!this.groupId) {
        checkoutFieldIsOnly('sys_group',"groupName", this.formItem.groupName)
          .then(res => {
            if (res.result > 0) {
              this.checkout = false;
              this.$Message.error("名称已经存在!");
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
      }
    }
  },

  mounted() {
    let tabsMaxHight = document.body.clientHeight - 95;

    window.document.getElementsByClassName(
      "organization-wrap-tabs"
    )[0].style.height =
      tabsMaxHight + "px";

    window.document.getElementsByClassName(
      "organization-wrap-tabs"
    )[0].style.maxHeight =
      tabsMaxHight + "px";

    let filter = JSON.stringify([
      { operator: "eq", value: this.groupId, property: "groupId" }
    ]);
    if (this.groupId) {
      getOrgBaseInfo(filter).then(res => {
        if (res.tableContent[0]) {
          let tableContent = res.tableContent[0];
          this.formItem.groupName = tableContent.groupName;
          this.name = tableContent.groupName;
          this.formItem.groupType = tableContent.groupType;
          this.formItem.depFunction = tableContent.depFunction;
          this.formItem.status = tableContent.status;
          this.formItem.comment = tableContent.comment;
          switch (tableContent.groupType) {
            case "M":
              this.groupType = "管理层";
              break;
            case "A":
              this.groupType = "事业部";
              break;
            case "O":
              this.groupType = "部门";
              break;
            case "G":
              this.groupType = "小组";
              break;
          }
        }
      });
      this.getObjDetailsCountByGroupId(this.groupId);
    } else if (!this.groupId && this.$route.name == "add") {
      this.actionBtn.forEach(element => {
        if (element.id !== "baseinfo") {
          element.hidden = true;
        }
      });
    }
  }
};
</script>
