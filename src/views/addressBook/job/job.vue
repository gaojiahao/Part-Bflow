<style lang="less">
@import "./job.less";
</style>

<template>
  <div class="job-wrap">
    <header class="job-wrap-header">
      <span class="job-wrap-header-job">职位</span>
      <span class="job-wrap-header-others">/</span>
      <span v-show="jobId" class="job-wrap-header-others">{{name}}</span>
      <span v-show="!jobId" class="job-wrap-header-others">创建</span>
      <Tag v-show="jobId" class="radius10 marlr10 color_fff" v-instanceStateDirective="{status:formItem.status}" style="margin-bottom: 7px;"></Tag>
    </header>

    <div class="job-wrap-action">
      <ul>
        <li v-for="(item,index) in actionBtn" :key="index" v-if="!item.hidden" class="job-wrap-action-li" v-bind:class="index===actionIndex?'job-wrap-action-li-active':''" @click="handlerViewChange(index)">
          <div>
            <img v-if="!item.type" :src="item.imgPath" class="job-wrap-action-li-img" />
            <Icon v-else :type="item.type" class="icon" />
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
        <Form :model="formItem" :labelWidth="120" ref="formItem" :rules="ruleValidate" :class="{'is-required':isEdit}">
          <FormItem label="职位名称:" style="font-size:16px" prop="name">
            <Input v-model="formItem.name" @on-blur="onGroupNameOutBlur" :readonly="isEdit" :class="isEdit?'input-status-isedit':''" />
          </FormItem>
          <FormItem label="职位类型" :labelWidth="120" prop="type">
            <Select v-model="formItem.type" placeholder="请选择职位类型" :disabled="isEdit" :class="isEdit?'input-status-isedit':''">
              <Option value="M">管理类</Option>
              <Option value="Y">营销类</Option>
              <Option value="J">技术类</Option>
              <Option value="Z">专业类</Option>
              <Option value="C">操作类</Option>
            </Select>
          </FormItem>
          <div class="baseinfo-container-divider" v-if="jobId && isEdit"></div>
          <FormItem label="创建者：" v-if="jobId && isEdit">
            <span>{{ tableContent.creatorName }}</span>
          </FormItem>
          <FormItem label="创建时间：" v-if="jobId && isEdit">
            <span>{{ tableContent.crtTime }}</span>
          </FormItem>
          <FormItem label="修改者：" v-if="jobId && isEdit">
            <span>{{ tableContent.modifier}}</span>
          </FormItem>
          <FormItem label="修改时间：" v-if="jobId && isEdit">
            <span>{{ tableContent.modTime }}</span>
          </FormItem>
          <div class="baseinfo-container-divider"></div>
          <FormItem label="职位状态" :labelWidth="120" style="margin-top:20px">
            <Select v-model="formItem.status" :disabled="isEdit" :class="isEdit?'input-status-isedit':''">
              <Option v-for="(item,index) in statusRadio" :key="index" :value="item.value">{{item.name}}</Option>
            </Select>
          </FormItem>

        </Form>
        <div class="baseinfo-container-action" @click="handleSubmitBoxs">
          <input type='submit' value="关闭" style="background-color:rgb(81, 90, 110)" class="baseinfo-container-action-submit" id="close" />
          <input type='submit' :value="editBtnName" class="baseinfo-container-action-submit" id="edit" v-if="jobId" />
          <input type='submit' value="保存" class="baseinfo-container-action-submit" id="save" v-show="!isEdit" />
          <input type='submit' value="保存并新建" class="baseinfo-container-action-submit" id="saveAndAdd" v-if="!jobId"/>
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
      tableContent:{},
      name: "",
      isEdit: true,
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
          type: "md-person",
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
          type: "ios-home",
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
            trigger: "change"
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

    //按钮事件委托给父元素处理
    handleSubmitBoxs(event) {
      let target = event.target || event.srcElement;
      if (target.nodeName.toLocaleLowerCase() === "input") {
        switch (target.id) {
          case "close":
            this.$Modal.confirm({
              title: "提示",
              content: "是否关闭当前页面",
              closable: true,
              onOk: function() {
                location.href = "/Site/index.html#page/jobs";
              }
            });
            break;
          case "edit":
            this.isEdit = !this.isEdit;
            this.editBtnName = this.isEdit ? "编辑" : "放弃编辑";
            break;
          case "save":
            this.save();
            break;
          case "saveAndAdd":
            this.saveAndAdd();
            break;
        }
      }
    },

    saveAndAdd() {
      this.$refs["formItem"].validate(valid => {
        if (valid) {
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
          if (!this.checkout) {
            this.$Message.error("名称已经存在!");
          }
        }
      });
    },

    save() {
      this.$refs["formItem"].validate(valid => {
        if (valid) {
          //判断是编辑,还是新增保存
          if (this.jobId) {
            this.formItem.id = this.jobId;
            saveRoleBaseInfo(this.formItem)
              .then(res => {
                if (res) {
                  this.$Message.success("更新成功");
                  window.location.reload();
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
                  this.$router.push({
                    path: "/addressBook/job/detail/" + res.id
                  });
                  window.location.reload();
                }
              })
              .catch(errer => {
                this.$Message.errer(error.data.message);
              });
          }
          if (!this.checkout) {
            this.$Message.error("名称已经存在!");
          }
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
    },

    //当职位名称失去焦点的是校验名称
    onGroupNameOutBlur() {
      let filter = {};
      if (!this.isEdit) {
        if (this.jobId) {
          filter = [
            {
              filedName: "name",
              value: this.formItem.name,
              symbol: "="
            },
            {
              filedName: "id",
              symbol: "<>",
              value: this.jobId
            }
          ];
        } else {
          filter = [
            {
              filedName: "name",
              value: this.formItem.name,
              symbol: "="
            }
          ];
        }
        filter = JSON.stringify(filter);
        //当groupId不存在时，校验名称是否唯一
        checkoutFieldIsOnly("sys_role", filter)
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
          this.name = tableContent.name;
           that.formItem.name = tableContent.name;
          that.formItem.type = tableContent.type;
          that.formItem.status = tableContent.status;
          that.formItem.describe = tableContent.describe;
          this.tableContent = tableContent;
        }
      });
      this.getObjDetailsCountByRoleId(this.jobId);
    } else if (!this.jobId && this.$route.name == "job-add") {
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
