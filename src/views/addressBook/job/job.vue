<style lang="less">
@import "./job.less";
</style>

<template>
  <div class="job-wrap">
    <header class="job-wrap-header">
      <h2 v-if="jobId">
         <span style="color:#4CAF50;cursor:pointer">职位</span>
           <span style="color:#808080;margin-left:10px">/</span>
        <span style="color:#808080">{{formItem.name}}</span>
        <span style="color:#808080;margin-left:10px">/</span>
        <span style="color:#808080;margin-left:10px">{{jobId}}</span>
        <Tag class="radius10 marlr10 color_fff" v-instanceStateDirective="{status:formItem.status,color:'#eb2f96'}"></Tag>
      </h2>
      <h2 v-if="!jobId">
        <span style="color:#4CAF50">添加职位</span>
         <span style="color:#808080;margin-left:10px">/</span>
        <span style="color:#808080;margin-left:10px">创建</span>
      </h2>
    </header>

    <div class="job-wrap-action">
      <ul>
        <li v-for="(item,index) in actionBtn" :key="index" v-if="!item.hidden" class="job-wrap-action-li" v-bind:class="index===actionIndex?'job-wrap-action-li-active':''" @click="handlerViewChange(index)">
          <div style="padding:5px 0">
            <img :src="item.imgPath" class="job-wrap-action-li-img"><img>
            <div class="left-content">
              <span v-show="item.number!=='undefine'">{{item.number}}</span>
              <h3>{{item.label}}</h3>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="job-wrap-tabs">
      <!-- 基本信息 -->
      <section class="baseinfo-container rfd-tab-container-common" v-if="actionIndex===2">
        <Form :model="formItem" :labelWidth="100" ref="formItem">
          <FormItem label="职位名称:" style="font-size:16px">
            <Input v-model="formItem.name" />
          </FormItem>
          <FormItem label="职位状态" :labelWidth="100">
            <Select v-model="formItem.status">
              <Option v-for="(item,index) in statusRadio" :key="index" :value="item.value">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="职位类型" :labelWidth="100">
            <RadioGroup v-model="formItem.type">
              <Radio label="M">管理类</Radio>
              <Radio label="Y">营销类</Radio>
              <Radio label="J">技术类</Radio>
              <Radio label="Z">专业类</Radio>
              <Radio label="C">操作类</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="职位说明" :labelWidth="100">
            <Input v-model="formItem.describe" type="textarea" :autosize="{minRows: 3,maxRows: 5}" />
          </FormItem>
        </Form>
        <div class="baseinfo-container-action">
          <input type='submit' value="取消" class="baseinfo-container-action-submit" @click="cancle" />
          <input type='submit' value="保存" class="baseinfo-container-action-submit" @click="save" />
          <input type='submit' value="保存并添加" class="baseinfo-container-action-submit" v-if="!jobId" @click="saveAndAdd" />
        </div>
      </section>
      <!-- 成员信息 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===1">
        <member-info :jobId="jobId" @on-member-info-change='handleChangeObjDetailsCount'></member-info>
      </section>
      <!-- 权限 -->
      <section class="permission-container rfd-tab-container-common" v-if="actionIndex===0">
        <permission :jobId="jobId" @on-permission-change='handleChangeObjDetailsCount'></permission>
      </section>
    </div>

  </div>
</template>

<script>
import {
  getAllRole,
  saveRoleBaseInfo,
  getObjDetailsCountByRoleId
} from "@/services/addressBookService.js";
import MemberModal from "@/components/modal/Modal";
import MemberInfo from "./instance/job-member-info";
import Permission from "./instance/job-permission";
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
        name: "",
        type: "",
        describe: "",
        status: 1
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
          imgPath: "resources/images/icon/0_0.png",
          number: 0,
          hidden: false,
          id: "objectPermission"
        },
        {
          label: "成员信息",
          imgPath: "resources/images/icon/0_1.png",
          number: 0,
          hidden: false,
          id: "user"
        },
        {
          label: "基本信息",
          imgPath: "resources/images/icon/0_5.png",
          hidden: false,
          id: "baseinfo"
        }
      ],
      actionIndex: 2,

      jobId: this.$route.params.jobId
    };
  },

  methods: {
    handlerViewChange(index) {
      this.actionIndex = index;
    },

    cancle() {
      this.$router.push({ path: "/addressBook/job/board" });
    },

    saveAndAdd() {
      if (!this.jobId) {
        this.formItem.id = this.jobId;
        saveRoleBaseInfo(this.formItem).then(res => {
          if (res.success) {
            this.$Message.success("保存成功");
            this.$refs["formItem"].resetFields();
            this.formItem = {
              name: "",
              type: "",
              describe: "",
              status: 1
            };
          }
        });
      }
    },

    save() {
      this.formItem.id = this.jobId;
      saveRoleBaseInfo(this.formItem).then(res => {
        if (res.success) {
          this.$Message.success("保存成功");
        }
      });
    },

    getObjDetailsCountByRoleId(jobId) {
      getObjDetailsCountByRoleId(jobId).then(res => {
        this.actionBtn.forEach(element => {
          element.number = res[element.id];
        });
      });
    },

    handleChangeObjDetailsCount(val) {
      if (val) {
        this.getObjDetailsCountByRoleId(this.jobId);
      }
    }
  },

  mounted() {
    let tabsMaxHight = document.body.clientHeight - 95;
    window.document.getElementsByClassName("job-wrap-tabs")[0].style.height =
      tabsMaxHight + "px";

    let filter = JSON.stringify([
      { operator: "eq", value: this.jobId, property: "id" }
    ]);
    let that = this;
    if (this.jobId) {
      getAllRole(filter).then(res => {
        if (res.tableContent[0]) {
          let tableContent = res.tableContent[0];
          that.formItem.name = tableContent.name;
          that.formItem.type = tableContent.type;
          that.formItem.status = tableContent.status;
          that.formItem.describe = tableContent.describe;
        }
      });
      this.getObjDetailsCountByRoleId(this.jobId);
    } else if (!this.jobId && this.$route.name == "add") {
      this.actionBtn.forEach(element => {
        if (element.id !== "baseinfo") {
          element.hidden = true;
        }
      });
    }
  }
};
</script>
