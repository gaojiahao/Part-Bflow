<style lang="less">
@import "./job.less";
</style>

<template>
    <div class="job-wrap">
        <header class="job-wrap-header">
            <h2>
                <span>管理员</span>
                <span>/岗位/</span>
                <span>001</span>
            </h2>
        </header>

        <div class="job-wrap-action">
            <ul>
                <li v-for="(item,index) in actionBtn" :key="index" class="job-wrap-action-li" v-bind:class="index===actionIndex?'job-wrap-action-li-active':''" @click="handlerViewChange(index)">
                    <img :src="item.imgPath" height="30px" width="30px"><img>
                    <div>
                        <span>{{item.number}}</span>
                        <h3>{{item.label}}</h3>
                    </div>
                </li>
            </ul>
        </div>

        <div class="job-wrap-tabs">
            <!-- 基本信息 -->
            <section class="baseinfo-container rfd-tab-container-common" v-if="actionIndex===2">
                <Form :model="formItem" :labelWidth="100">
                    <FormItem label="职位名称:" style="font-size:16px">
                        <Input v-model="formItem.groupName" />
                    </FormItem>
                    <FormItem label="职位状态" :labelWidth="100">
                        <Select v-model="formItem.status">
                            <Option v-for="(item,index) in statusRadio" :key="index" :value="item.value">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="职位类型" :labelWidth="100">
                        <RadioGroup v-model="formItem.groupType">
                            <Radio label="管理类">管理类</Radio>
                            <Radio label="营销类">营销类</Radio>
                            <Radio label="技术类">技术类</Radio>
                            <Radio label="专业类">专业类</Radio>
                             <Radio label="操作类">操作类</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="职位说明" :labelWidth="100">
                        <Input v-model="formItem.comment" type="textarea" :autosize="{minRows: 3,maxRows: 5}" />
                    </FormItem>
                </Form>
                <div class="baseinfo-container-action">
                    <Button type="success">编辑</Button>
                    <Button type="success">删除</Button>
                    <Button type="success">保存</Button>
                </div>
            </section>
            <!-- 成员信息 -->
            <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===1">
                <member-info :jobId="jobId"></member-info>
            </section>
            <!-- 权限 -->
            <section class="permission-container rfd-tab-container-common" v-if="actionIndex===0">
                <permission :jobId="jobId"></permission>
            </section>
        </div>

    </div>
</template>

<script>
import { getOrgBaseInfo } from "@/services/addressBookService.js";
import MemberModal from "@/components/modal/Modal";
import MemberInfo from "./instance/member-info";
import Permission from "./instance/permission";
export default {
  name: "job",

  components: {
    MemberModal,
    MemberInfo,
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

      statusRadio:[{
          name:'停用',
          value:0
      },{
          name:'使用中',
          value:1
      },{
          name:'未使用',
          value:2
      },{
          name:'草稿',
          value:3
      }],

      actionBtn: [
        {
          label: "权限",
          imgPath: "../../../resources/images/icon/0_0.png",
          number: 0
        },
        {
          label: "成员信息",
          imgPath: "../../../resources/images/icon/0_1.png",
          number: 0
        },
        {
          label: "基本信息",
          imgPath: "../../../resources/images/icon/0_5.png",
          number: 0
        }
      ],
      actionIndex: 2,

      jobId: this.$route.params.jobId
    };
  },

  methods: {
    handlerViewChange(index) {
      this.actionIndex = index;
    }
  },

  mounted() {
    let tabsMaxHight = document.body.clientHeight - 95;
    window.document.getElementsByClassName(
      "job-wrap-tabs"
    )[0].style.height =
      tabsMaxHight + "px";

    let filter = JSON.stringify([
      { operator: "eq", value: this.jobId, property: "jobId" }
    ]);
    getOrgBaseInfo(filter).then(res => {
      if (res.tableContent[0]) {
        let tableContent = res.tableContent[0];
        this.formItem.groupName = tableContent.groupName;
        this.formItem.groupType = tableContent.groupType;
        this.formItem.depFunction = tableContent.depFunction;
        this.formItem.status = tableContent.status;
        this.formItem.comment = tableContent.comment;
    
      }
    });
  }
};
</script>
