<style lang="less">
@import "./job.less";
</style>

<template>
  <div class="job-wrap">
    <header class="job-wrap-header">
      <h2 v-if="jobId">
        <span style="color:#4CAF50;cursor:pointer">职位</span>
        <span style="color:#808080;margin-left:10px">/</span>
        <span style="color:#808080">{{name}}</span>
        <span style="color:#808080;margin-left:10px">/</span>
        <span style="color:#808080;margin-left:10px">{{jobId}}</span>
        <Tag class="radius10 marlr10 color_fff" v-instanceStateDirective="{status:formItem.status,color:'#eb2f96'}"></Tag>
      </h2>
      <h2 v-if="!jobId">
        <span style="color:#4CAF50">职位</span>
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
        <Form :model="formItem" :labelWidth="100" ref="formItem" :rules="ruleValidate">
          <FormItem label="职位名称:" style="font-size:16px" prop="name">
            <Input v-model="formItem.name" @on-blur="onGroupNameOutBlur" :readonly="isEdit" :class="isEdit?'input-status-isedit':''" />
          </FormItem>
          <FormItem label="职位类型" :labelWidth="100" prop="type">
            <Select v-model="formItem.type" placeholder="请选择职位类型" :disabled="isEdit" :class="isEdit?'input-status-isedit':''">
              <Option value="M">管理类</Option>
              <Option value="Y">营销类</Option>
              <Option value="J">技术类</Option>
              <Option value="Z">专业类</Option>
              <Option value="C">操作类</Option>
            </Select>
          </FormItem>
          <div class="baseinfo-container-divider"></div>
          <FormItem label="职位状态" :labelWidth="100" style="margin-top:20px">
            <Select v-model="formItem.status" :disabled="isEdit" :class="isEdit?'input-status-isedit':''">
              <Option v-for="(item,index) in statusRadio" :key="index" :value="item.value">{{item.name}}</Option>
            </Select>
          </FormItem>

        </Form>
        <div class="baseinfo-container-action">
          <input type='submit' value="关闭" class="baseinfo-container-action-submit" @click="cancle" />
          <input type='submit' :value="editBtnName" class="baseinfo-container-action-submit" @click="edit" v-if="jobId" />
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
  getObjDetailsCountByRoleId,
  checkoutFieldIsOnly
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
      name: "",
      isEdit: false,
      editBtnName: "编辑",
      statusRadio: [
        {
          name: "停用",
          value: -1
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
          label: "基本信息",
          imgPath: "resources/images/icon/essinformation.png",
          hidden: false,
          id: "baseinfo"
        }
      ],
      actionIndex: 2,

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入职位名称",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择职位类型",
            trigger: "blur"
          }
        ]
      },
      checkout: true,

      jobId: this.$route.params.jobId
    };
  },

  methods: {
    handlerViewChange(index) {
      this.actionIndex = index;
    },

    cancle() {
      let that = this;
      that.$Modal.confirm({
        title: "提示",
        content: "是否关闭当前页面",
        closable: true,
        onOk: function() {
          window.location.url = "/Site/index.html#page/jobs";
        }
      });
    },

    edit() {
      this.isEdit = !this.isEdit;
      this.editBtnName = this.isEdit ? "编辑" : "放弃编辑";
    },

    saveAndAdd() {
      if (!this.jobId && this.checkout) {
        delete this.formItem.id;
        saveRoleBaseInfo(this.formItem)
          .then(res => {
            if (res) {
              this.$Message.success("保存成功");
              this.$refs["formItem"].resetFields();
              this.formItem = {
                name: "",
                type: "",
                describe: "",
                status: 1
              };
            }
          })
          .catch(errer => {
            this.$Message.errer(error.data.message);
          });
      }
    },

    save() {
      //判断是编辑,还是新增保存
      if (this.jobId) {
        this.formItem.id = this.jobId;
        saveRoleBaseInfo(this.formItem)
          .then(res => {
            if (res) {
              this.$Message.success("保存成功");
            }
          })
          .catch(errer => {
            this.$Message.errer(error.data.message);
          });
      } else if (!this.jobId && this.checkout) {
        delete this.formItem.id;
        saveRoleBaseInfo(this.formItem)
          .then(res => {
            if (res) {
              this.$Message.success("保存成功");
              this.$router.push({ path: "/addressBook/job/detail/" + res.id });
              window.location.reload();
            }
          })
          .catch(errer => {
            this.$Message.errer(error.data.message);
          });
      }
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
    },

    //当职位名称失去焦点的是校验名称
    onGroupNameOutBlur() {
      //当groupId不存在时，校验名称是否唯一
      checkoutFieldIsOnly("sys_role", "name", this.formItem.name)
        .then(res => {
          if (res.result > 0) {
            this.checkout = false;
            this.$Message.error("名称已经存在!");
          } else {
            this.checkout = true;
          }
        })
        .catch(error => {
          this.$Message.error(error.data.message);
        });
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
          this.name = tableContent.name;
          that.formItem.type = tableContent.type;
          that.formItem.status = tableContent.status;
          that.formItem.describe = tableContent.describe;
        }
      });
      this.getObjDetailsCountByRoleId(this.jobId);
    } else if (!this.jobId && this.$route.name == "add") {
      this.isEdit = false;
      this.actionBtn.forEach(element => {
        if (element.id !== "baseinfo") {
          element.hidden = true;
        }
      });
    }
  }
};
</script>
