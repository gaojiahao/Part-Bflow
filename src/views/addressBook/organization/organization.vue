<style lang="less">
@import "./organization.less";
</style>

<template>
  <div class="organization-wrap">
    <header class="organization-wrap-header">
      <h2 v-if="groupId">
        <span style="color:#4CAF50">{{formItem.groupName}}</span>
        <span style="color:#808080;margin-left:10px">/</span>
        <span style="color:#808080;margin-left:10px">{{formItem.groupType}}</span>
        <span style="color:#808080;margin-left:10px">/</span>
        <span style="color:#808080;margin-left:10px">{{groupId}}</span>
        <Tag class="radius10 marlr10 color_fff" v-instanceStateDirective="{status:formItem.status,color:'#eb2f96'}"></Tag>
      </h2>
      <h2 else>
        <span style="color:#4CAF50">添加组织</span>
      </h2>
    </header>

    <div class="organization-wrap-action">
      <ul>
        <li v-for="(item,index) in actionBtn" :key="index" v-if="!item.hidden" class="organization-wrap-action-li" v-bind:class="index===actionIndex?'organization-wrap-action-li-active':''" @click="handlerViewChange(index)">
          <img :src="item.imgPath" height="30px" width="30px"><img>
          <div>
            <span>{{item.number}}</span>
            <h3>{{item.label}}</h3>
          </div>
        </li>
      </ul>
    </div>

    <div class="organization-wrap-tabs">
      <!-- 基本信息 -->
      <section class="baseinfo-container rfd-tab-container-common" v-if="actionIndex===5">
        <Form :model="formItem" :labelWidth="100">
          <FormItem label="组织名称:" style="font-size:16px">
            <Input v-model="formItem.groupName" />
          </FormItem>
          <FormItem label="组织状态" :labelWidth="100">
            <Select v-model="formItem.status">
              <Option v-for="(item,index) in statusRadio" :key="index" :value="item.value">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="组织类型" :labelWidth="100">
            <RadioGroup v-model="formItem.groupType">
              <Radio label="管理层">管理层</Radio>
              <Radio label="事业部">事业部</Radio>
              <Radio label="部门">部门</Radio>
              <Radio label="小组">小组</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="部门职能类型" :labelWidth="100" v-if="formItem.groupType ==='部门'">
            <RadioGroup v-model="formItem.depFunction">
              <Radio label="管理">管理</Radio>
              <Radio label="销售">销售</Radio>
              <Radio label="制造">制造</Radio>
              <Radio label="研发">研发</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="组织说明" :labelWidth="100">
            <Input v-model="formItem.comment" type="textarea" :autosize="{minRows: 3,maxRows: 5}" />
          </FormItem>
        </Form>
        <div class="baseinfo-container-action">
          <input type='submit' value="编辑" class="baseinfo-container-action-submit" v-if="groupId" />
          <input type='submit' value="保存" class="baseinfo-container-action-submit" v-if="!groupId" @click="saveBaseinfo" />
        </div>
      </section>
      <!-- 上级组织 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===4">
        <high-organization :groupId="groupId" :groupType="formItem.groupType"></high-organization>
      </section>
      <!-- 下级组织 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===3">
        <lower-organization :groupId="groupId" :groupType="formItem.groupType"></lower-organization>
      </section>
      <!-- 负责人 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===2">
        <principal :groupId="groupId"></principal>
      </section>
      <!-- 成员信息 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===1">
        <member-info :groupId="groupId"></member-info>
      </section>
      <!-- 权限 -->
      <section class="permission-container rfd-tab-container-common" v-if="actionIndex===0">
        <permission :groupId="groupId"></permission>
      </section>
    </div>

  </div>
</template>

<script>
import { getOrgBaseInfo, saveBaseinfo } from "@/services/addressBookService.js";
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
        status: ""
      },

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
          id: 6,
          hidden: false
        },
        {
          label: "成员信息",
          imgPath: "resources/images/icon/user.png",
          number: 0,
          id: 5,
          hidden: false
        },
        {
          label: "负责人",
          imgPath: "resources/images/icon/user.png",
          number: 0,
          id: 4,
          hidden: false
        },
        {
          label: "下级组织",
          imgPath: "resources/images/icon/organization.png",
          number: 0,
          id: 3,
          hidden: false
        },
        {
          label: "上级组织",
          imgPath: "resources/images/icon/organization.png",
          number: 0,
          hidden: false,
          id: 2
        },
        {
          label: "基本信息",
          imgPath: "resources/images/icon/organization.png",
          number: 0,
          hidden: false,
          id: 1
        }
      ],
      actionIndex: 5,

      groupId: this.$route.params.groupId
    };
  },

  methods: {
    handlerViewChange(index) {
      this.actionIndex = index;
    },

    saveBaseinfo() {
      if (!this.groupId) {
        saveBaseinfo(this.formItem).then(res => {
          if (res.success) {
            this.$Message.success("保存成功");
          }
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

    //当组织id不存在时，为添加界面
    if (this.groupId) {
      let filter = JSON.stringify([
        { operator: "eq", value: this.groupId, property: "groupId" }
      ]);
      getOrgBaseInfo(filter).then(res => {
        if (res.tableContent[0]) {
          this.formItem = res.tableContent[0];
          this.formItem.groupName = tableContent.groupName;
          this.formItem.groupType = tableContent.groupType;
          this.formItem.depFunction = tableContent.depFunction;
          this.formItem.status = tableContent.status;
          this.formItem.comment = tableContent.comment;
        }
      });
    } else if (this.$route.name === "add" && !this.groupId) {
      this.actionBtn.forEach(item => {
        if (item.id !== 1) {
          item.hidden = true;
        }
      });
    }
  }
};
</script>
