<style lang="less">
@import "./organization.less";
</style>

<template>
    <div class="organization-wrap">
        <header class="organization-wrap-header">
            <h2>
                <span>管理员</span>
                <span>/岗位/</span>
                <span>001</span>
            </h2>
        </header>

        <div class="organization-wrap-action">
            <ul>
                <li v-for="(item,index) in actionBtn" :key="index" class="organization-wrap-action-li" v-bind:class="index===actionIndex?'organization-wrap-action-li-active':''" @click="handlerViewChange(index)">
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
                        <Input v-model="formItem.OrgUnitName" />
                    </FormItem>
                    <FormItem label="组织状态" :labelWidth="100">
                        <Select v-model="formItem.OrgUnitStatus">
                            <Option value="inUse">使用中</Option>
                            <Option value="noUse">未使用</Option>
                            <Option value="draft">草稿</Option>
                            <Option value="stop">停用</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="组织类型" :labelWidth="100">
                        <RadioGroup v-model="formItem.OrgUnitType">
                            <Radio label="manage">管理层</Radio>
                            <Radio label="business">事业部</Radio>
                            <Radio label="department">部门</Radio>
                            <Radio label="group">小组</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="部门职能类型" :labelWidth="100">
                        <RadioGroup v-model="formItem.DepFunction">
                            <Radio label="manage">管理</Radio>
                            <Radio label="sale">销售</Radio>
                            <Radio label="make">制造</Radio>
                            <Radio label="develop">研发</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="组织说明" :labelWidth="100">
                        <Input v-model="formItem.OrgUnitMemo" type="textarea" :autosize="{minRows: 3,maxRows: 5}" />
                    </FormItem>
                </Form>
                <div class="baseinfo-container-action">
                    <Button type="success">编辑</Button>
                    <Button type="success">删除</Button>
                    <Button type="success">保存</Button>
                </div>
            </section>
            <!-- 上级组织 -->
            <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===4">
                <high-organization></high-organization>
            </section>
            <!-- 下级组织 -->
            <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===3">
                <lower-organization></lower-organization>
            </section>
            <!-- 负责人 -->
            <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===2">
                <principal></principal>
            </section>
            <!-- 成员信息 -->
            <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===1">
                <member-info></member-info>
            </section>
            <!-- 权限 -->
            <section class="permission-container rfd-tab-container-common" v-if="actionIndex===0">
              <permission></permission>
            </section>
        </div>

    </div>
</template>

<script>
import { getUsersByGroupId, listUsers } from "@/services/addressBookService.js";
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
        OrgUnitName: "",
        OrgUnitType: "",
        DepFunction: "",
        OrgUnitMemo: "",
        OrgUnitStatus: "inUse"
      },

      actionBtn: [
        {
          label: "权限",
          imgPath: "../../../resources/images/icon/0_0.png",
          number: 0
        },
        {
          label: "成员信息",
          imgPath: "../../../resources/images/icon/0_0.png",
          number: 0
        },
        {
          label: "负责人",
          imgPath: "../../../resources/images/icon/0_0.png",
          number: 0
        },
        {
          label: "下级组织",
          imgPath: "../../../resources/images/icon/0_0.png",
          number: 0
        },
        {
          label: "上级组织",
          imgPath: "../../../resources/images/icon/0_0.png",
          number: 0
        },
        {
          label: "基本信息",
          imgPath: "../../../resources/images/icon/0_0.png",
          number: 0
        }
      ],
      actionIndex: 5,

    };
  },

  methods: {
    handlerViewChange(index) {
      this.actionIndex = index;
    },
    
  },

  mounted() {
    let tabsMaxHight = document.body.clientHeight - 95;
    window.document.getElementsByClassName(
      "organization-wrap-tabs"
    )[0].style.height =
      tabsMaxHight + "px";
  }
};
</script>
