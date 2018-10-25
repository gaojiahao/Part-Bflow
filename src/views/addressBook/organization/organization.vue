<style lang="less">
@import "./organization.less";
</style>

<template>
  <div class="organization-wrap">
    <header class="organization-wrap-header">
      <span class="organization-wrap-header-org">组织</span>
      <span class="organization-wrap-header-others">/</span>
      <span v-show="groupId" class="organization-wrap-header-others">{{name}}</span>
      <span v-show="!groupId" class="organization-wrap-header-others">创建</span>
      <Tag v-show="groupId" class="radius10 marlr10 color_fff" v-instanceStateDirective="{status:formItem.status}" style="margin-bottom: 7px; padding-right: 20px;"></Tag>
    </header>

    <div class="organization-wrap-action">
      <ul>
        <li v-for="(item,index) in actionBtn" :key="index" v-if="!item.hidden" class="organization-wrap-action-li" v-bind:class="index===actionIndex?'organization-wrap-action-li-active':''" @click="handlerViewChange(index)">
          <div>
            <img v-if="!item.type" :src="item.imgPath" class="organization-wrap-action-li-img" />
            <Icon v-else :type="item.type" class="icon" />
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
        <Form :model="formItem" :labelWidth="120" ref="formItem" :rules="ruleValidate" :class="{'is-required':isEdit}" style="background-color: #fff">
          <FormItem label="组织名称:" style="font-size:16px" prop="groupName">
            <Input v-model="formItem.groupName" @on-blur="onGroupNameOutBlur" :readonly="isEdit" :class="isEdit?'input-status-isedit':''" />
          </FormItem>

          <FormItem label="组织类型" :labelWidth="120" prop="groupType">
            <Select  v-model="formItem.groupType" :disabled="isEdit" :class="isEdit?'input-status-isedit':''">
              <Option value="M">管理层</Option>
              <Option value="A">事业部</Option>
              <Option value="O">部门</Option>
              <Option value="D">直营店</Option>
              <Option value="J">加盟店</Option>
              <Option value="G">小组</Option>
            </Select>
          </FormItem>
          <FormItem label="组织职能" :labelWidth="120" prop="depFunction">
            <Select v-model="formItem.depFunction" :disabled="isEdit" :class="isEdit?'input-status-isedit':''">
              <Option value="M">管理</Option>
              <Option value="S">销售</Option>
              <Option value="C">制造</Option>
              <Option value="R">研发</Option>
              <Option value="O">运营</Option>
            </Select>
          </FormItem>
          <div class="baseinfo-container-divider"></div>
          <FormItem label="组织负责人" :labelWidth="120" prop="principalName" style="margin-top:20px">
            <Input @on-click="selectPrincipalModal" v-model="formItem.principalName" icon="md-arrow-dropdown" placeholder="选择用户" :readonly="isEdit" :class="isEdit?'input-status-isedit':''"></Input>
          </FormItem>
          <FormItem label="上级组织" :labelWidth="120" prop="highGroup" style="margin-top:20px">
            <Input @on-click="selectHighOrgModal" v-model="formItem.highGroup" icon="md-arrow-dropdown" placeholder="选择上级组织" :readonly="isEdit" :class="isEdit?'input-status-isedit':''"></Input>
          </FormItem>
          <FormItem v-if="hiddenInput" label="上级组织parentId" style="font-size:16px">
            <Input v-model="formItem.parentId" />
          </FormItem>
          <div class="baseinfo-container-divider" v-if="groupId && isEdit"></div>
          <FormItem label="创建者：" v-if="groupId && isEdit">
            <span>{{ tableContent.creator}}</span>
          </FormItem>
          <FormItem label="创建时间：" v-if="groupId && isEdit">
            <span>{{ tableContent.crtTime }}</span>
          </FormItem>
          <FormItem label="修改者：" v-if="groupId && isEdit">
            <span>{{ tableContent.modifier}}</span>
          </FormItem>
          <FormItem label="修改时间：" v-if="groupId && isEdit">
            <span>{{ tableContent.modTime }}</span>
          </FormItem>

          <div class="baseinfo-container-divider"></div>
          <FormItem label="组织状态" :labelWidth="120" style="margin-top:20px">
            <Select v-model="formItem.status" :disabled="isEdit" :class="isEdit?'input-status-isedit':''">
              <Option v-for="(item,index) in statusRadio" :key="index" :value="item.value">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Form>
        <div class="baseinfo-container-action" @click="handleSubmitBoxs">
          <input type='submit' value="关闭" style="background-color:rgb(81, 90, 110)" class="baseinfo-container-action-submit" id="close" />
          <input type='submit' :value="editBtnName" class="baseinfo-container-action-submit" id="edit" v-if="groupId && isPermission" />
          <input type='submit' value="保存" class="baseinfo-container-action-submit" id="save" v-show="!isEdit" />
          <input type='submit' value="保存并新建" class="baseinfo-container-action-submit" id="saveAndAdd" v-if="!groupId" />
        </div>
      </section>
      <!-- 上级组织 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===4">
        <high-organization :isPermission="isPermission" :groupId="groupId" :groupType="formItem.groupType" @on-high-organization-change='handleChangeObjDetailsCount'></high-organization>
      </section>
      <!-- 下级组织 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===3">
        <lower-organization :isPermission="isPermission" :groupId="groupId" :groupType="formItem.groupType" @on-lower-organization-change='handleChangeObjDetailsCount'></lower-organization>
      </section>
      <!-- 负责人 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===2">
        <principal :isPermission="isPermission" :groupId="groupId" @on-principal-change='handleChangeObjDetailsCount'></principal>
      </section>
      <!-- 成员信息 -->
      <section class="memberinfo-container rfd-tab-container-common" v-if="actionIndex===1">
        <member-info :isPermission="isPermission" :groupId="groupId" @on-member-info-change='handleChangeObjDetailsCount'></member-info>
      </section>
      <!-- 权限 -->
      <section class="permission-container rfd-tab-container-common" v-if="actionIndex===0">
        <permission :isPermission="isPermission" :groupId="groupId" @on-permission-change='handleChangeObjDetailsCount'></permission>
      </section>
    </div>

    <member-modal v-model="isShowMemberModal" width="700" footerBtnAlign="right" title="选择组织" @on-ok="saveSelectionHighOrg">
      <div style="margin-top:10px;">
        <div class="app-search">
          <Input @on-search="orgFilter" :search="true" v-model="searchHighOrgValue" placeholder="搜索组织名称" style="width: 300px"></Input>
          <a @click="orgFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </a>
        </div>
        <Table class="rfd-table" height="400" :loading="highOrgModalLoading" :columns="highOrgColumnsModal" :data="listUserData" size='small' highlight-row ref="currentRowTable" @on-row-dblclick="handleHighOrgDblclick" @on-current-change="onSelectUserList"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="listUserPageTotal" :current="listUserCurrentPage" :page-size="pageSize" size="small" @on-page-size-change="onHighOrgPageSizeChange" @on-change="listUserChangePage" show-total show-elevator show-sizer></Page>
          </div>
        </div>
      </div>
    </member-modal>
    <principal-modal v-model="isShowPrincipalModal" width="700" footerBtnAlign="right" title="选择负责人" @on-ok="savaSelectPrincipal">
      <div>
        <div class="app-search">
          <Input @on-search="userFilter" :search="true" v-model="searchPrincipalValue" placeholder="搜索工号或者名称" style="width: 300px"></Input>
          <a @click="userFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </a>
        </div>
        <Table class="rfd-table" height="400" :loading="PrincipalModaLoading" :columns="principalColumnsModel" :data="principalData" size='small' highlight-row ref="currentRowTable" @on-row-dblclick="handlePrinciplDblclick" @on-current-change="onSelectPrincipal"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="principalPageTotal" :current="principalCurrentPage" :page-size="principalPageSize" size="small" @on-page-size-change="onPrincipalPageSizeChange" @on-change="principalChangePage" show-total show-elevator show-sizer></Page>
          </div>
        </div>
      </div>
    </principal-modal>
  </div>
</template>

<script>
import {
  getOrgBaseInfo,
  getObjDetailsCountByGroupId,
  saveBaseinfo,
  updateBaseinfo,
  checkoutFieldIsOnly,
  getAllHigherGroupByGroupType,
  getAllUsers,
  getListById
} from "@/services/addressBookService.js";
import MemberModal from "@/components/modal/Modal";
import PrincipalModal from "@/components/modal/Modal";
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
    Permission,
    PrincipalModal
  },

  data() {
    return {
      formItem: {
        groupName: "",
        groupType: "",
        depFunction: "",
        status: 1,
        principal: "",
        principalName: "",
        highGroup: "",
        parentId: ""
      },
      tableContent: {},

      isEdit: true,
      editBtnName: "编辑",

      hiddenInput: false,

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
          type: "ios-home",
          hidden: false,
          id: "baseinfo"
        }
      ],

      actionIndex: 5,

      //上级组织模态框属性
      isShowMemberModal: false,
      highOrgModalLoading: true,
      //存放编辑时的上级组织
      editHighOrg: "",
      editHighOrgParentId: "",
      name: "",
      groupType: "",
      parentType: "",
      listUserData: [],
      highOrgColumnsModal: [
        {
          title: "组织名称",
          key: "groupName"
        },
        {
          title: "组织类型",
          key: "groupType",
          render: (h, params) => {
            let groupType = params.row.groupType;
            switch (groupType) {
              case "M":
                groupType = "管理层";
                break;
              case "A":
                groupType = "事业部";
                break;
              case "O":
                groupType = "部门";
                break;
              case "D":
                groupType = "直营店";
                break;
              case "J":
                groupType = "加盟店";
                break;
              case "G":
                groupType = "小组";
                break;
            }
            return h("span", groupType);
          }
        },
        {
          title: "组织职能",
          key: "depFunction",
          render: (h, params) => {
            let depFunction = params.row.depFunction;
            switch (depFunction) {
              case "M":
                depFunction = "管理";
                break;
              case "S":
                depFunction = "销售";
                break;
              case "C":
                depFunction = "制造";
                break;
              case "R":
                depFunction = "研发";
                break;
              case "O":
                depFunction = "运营";
                break;
            }
            return h("span", depFunction);
          }
        },
        {
          title: "组织状态",
          key: "status",
          render: (h, params) => {
            let status = params.row.status,
              value = "";
            switch (status) {
              case -1:
                value = "停用";
                break;
              case 1:
                value = "使用中";
                break;
              case 2:
                value = "未使用";
                break;
              case 3:
                value = "草稿";
                break;
            }
            return h(
              "span",
              {
                style: {
                  color: status ? "#0279f6" : "#f03707",
                  cursor: "default"
                }
              },
              value
            );
          }
        }
      ],
      listUserPageTotal: 0,
      listUserCurrentPage: 1,
      pageSize: 10,
      searchHighOrgValue: "",
      onSelectionModal: [],

      //负责人模态框参数
      isShowPrincipalModal: false,
      PrincipalModaLoading: false,
      principalData: [],
      principalPageTotal: 0,
      principalCurrentPage: 1,
      principalPageSize: 10,
      searchPrincipalValue: "",
      onSelectionPrincipal: [],
      principalColumnsModel: [
        {
          title: "工号",
          key: "userCode"
        },
        {
          title: "姓名",
          key: "nickname"
        },
        {
          title: "性别",
          key: "gender",
          render: (h, params) => {
            let gender = params.row.gender;
            return h(
              "span",
              gender === 1 ? "男" : gender === 0 ? "女" : "未知"
            );
          }
        },
        {
          title: "手机号",
          key: "mobile"
        }
      ],

      ruleValidate: {
        groupName: [
          {
            required: true,
            message: "请输入组织名称",
            trigger: "blur"
          }
        ],
        highGroup: [
          {
            required: true,
            message: "请选择上级组织",
            trigger: "change"
          }
        ],
        groupType: [
          {
            required: true,
            message: "请选择组织类型",
            trigger: "change"
          }
        ],
        depFunction: [
          {
            required: true,
            message: "请选择组织职能",
            trigger: "change"
          }
        ],
        principal: [
          {
            required: true,
            message: "请选择负责人",
            trigger: "change"
          }
        ]
      },

      checkout: true,

      groupId: this.$route.params.groupId,
      isPermission: true
    };
  },

  methods: {
    /** 
     * 切换相关实例
    */
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
                location.href = "/Site/index.html#page/origanizations";
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

    /** 
     * 保存基本信息,并新建
    */
    saveAndAdd() {
      this.$refs["formItem"].validate(valid => {
        if (valid && !this.groupId && this.checkout) {
          delete this.formItem.groupId;

          saveBaseinfo(this.formItem).then(res => {
            if (res) {
              this.$Message.success(res.message);
              this.$refs["formItem"].resetFields();
              this.formItem = {
                groupName: "",
                groupType: "",
                depFunction: "",
                status: 1
              };
            }
          }).catch(error=>{
              this.$Message.error(error.data.message)
            });;
        }
        if (!this.checkout) {
          this.$Message.error("名称已经存在!");
        }
      });
    },

    /** 
     * 保存基本信息
    */
    save() {
      this.$refs["formItem"].validate(valid => {
        if (valid) {
          if (!this.groupId && this.checkout) {
            delete this.formItem.groupId;
            saveBaseinfo(this.formItem).then(res => {
              if (res) {
                this.$router.push({
                  path: "/addressBook/organization/detail/" + res.groupId
                });
                window.location.reload();
              }
            }).catch(error=>{
              this.$Message.error(error.data.message)
            });;
          } else if (this.groupId && this.checkout) {
            this.formItem.groupId = this.groupId;
            updateBaseinfo(this.formItem).then(res => {
              if (res) {
                this.$Message.success(res.message);
                window.location.reload();
              }
            }).catch(error=>{
              this.$Message.error(error.data.message)
            });
          }
          if (!this.checkout) {
            this.$Message.error("名称已经存在!");
          }
        }
      });
    },

    /** 
     * 获取相关实例数量
     * @param groupId 组织id
    */
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

    listUserChangePage(currentPage) {
      let filter = [
        {
          operator: "like",
          value: this.searchHighOrgValue,
          property: "groupName"
        }
      ];
      this.getAllHigherGroupByGroupType(currentPage, this.pageSize, filter);
    },
    //过滤
    orgFilter() {
      let filter = [
        {
          operator: "like",
          value: this.searchHighOrgValue,
          property: "groupName"
        }
      ];
      this.getAllHigherGroupByGroupType(this.listUserCurrentPage, this.pageSize, filter);
    },

    //监听模态框选中的用户
    onSelectUserList(currentRow, oldCurrentRow) {
      this.onSelectionModal = currentRow;
    },

    //当组织名称失去焦点的是校验名称
    onGroupNameOutBlur() {
      let filter = {};
      if (!this.isEdit) {
        if (this.groupId) {
          filter = [
            {
              filedName: "groupName",
              value: this.formItem.groupName,
              symbol: "="
            },
            {
              filedName: "groupId",
              symbol: "<>",
              value: this.groupId
            }
          ];
        } else {
          filter = [
            {
              filedName: "groupName",
              value: this.formItem.groupName,
              symbol: "="
            }
          ];
        }
        filter = JSON.stringify(filter);
        //当groupId不存在时，校验名称是否唯一
        checkoutFieldIsOnly("sys_group", filter)
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

    //获取所有组织
    getAllHigherGroupByGroupType(currentPage, pageSize, relfilter) {
      this.highOrgModalLoading = true;
      let filter = relfilter ? relfilter : [];
     
      filter = JSON.stringify(filter);
      getAllHigherGroupByGroupType(currentPage, pageSize,this.formItem.groupType, filter).then(res => {
          this.listUserPageTotal = res.summary.total;
          this.listUserData = res.tableContent;
          this.highOrgModalLoading = false;
      });
    },

    //展示上级组织选择器
    selectHighOrgModal() {
      this.isShowMemberModal = true;
      this.searchHighOrgValue = "";
      this.getAllHigherGroupByGroupType(this.listUserCurrentPage, this.pageSize);
    },
    //确认选择的上级组织
    saveSelectionHighOrg() {
      this.formItem.highGroup = this.onSelectionModal.groupName;
      this.formItem.parentId = this.onSelectionModal.groupId;
      this.isShowMemberModal = false;
    },

    //展示负责人选择器
    selectPrincipalModal() {
      this.isShowPrincipalModal = true;
      this.searchPrincipalValue = "";
      this.getListUsers(this.principalCurrentPage, this.principalPageSize);
    },

    //获取用户列表
    getListUsers(currentPage, pageSize, filter) {
      this.PrincipalModaLoading = true;
      getAllUsers(pageSize, currentPage, filter).then(res => {
          this.principalPageTotal = res.summary.total;
          this.principalData = res.tableContent;
          this.PrincipalModaLoading = false;
      });
    },

    principalChangePage(currentPage) {
      let filter = JSON.stringify([
        {
          operator_1: "like",
          value_1: this.searchPrincipalValue,
          property_1: "nickname",
          link: "or",
          operator_2: "like",
          value_2: this.searchPrincipalValue,
          property_2: "userCode"
        }
      ]);
      this.getListUsers(currentPage, this.principalPageSize, filter);
    },

    //监听模态框选中的用户
    onSelectPrincipal(currentRow, oldCurrentRow) {
      this.onSelectionPrincipal = currentRow;
    },

    //双击负责人选中
    handlePrinciplDblclick(row, index) {
      this.formItem.principalName = row.nickname;
      this.formItem.principal = row.userId;
      this.isShowPrincipalModal = false;
    },

    //负责人点击切换每页显示条数
    onPrincipalPageSizeChange(size) {
      let filter = JSON.stringify([
        {
          operator_1: "like",
          value_1: this.searchPrincipalValue,
          property_1: "nickname",
          link: "or",
          operator_2: "like",
          value_2: this.searchPrincipalValue,
          property_2: "userCode"
        }
      ]);
      this.principalPageSize = size;
      this.getListUsers(1, size, filter);
    },

    //双击上级组织选中
    handleHighOrgDblclick(row, index) {
      this.formItem.highGroup = row.groupName;
      this.formItem.parentId = row.groupId;
      this.isShowMemberModal = false;
    },

    //上级组织点击切换每页显示条数
    onHighOrgPageSizeChange(size) {
      this.pageSize = size;
      let filter = [
        {
          operator: "like",
          value: this.searchHighOrgValue,
          property: "groupName"
        }
      ];
      this.getAllHigherGroupByGroupType(1, size, filter);
    },

    //点击确定保存
    savaSelectPrincipal() {
      this.formItem.principalName = this.onSelectionPrincipal.nickname;
      this.formItem.principal = this.onSelectionPrincipal.userId;
      this.isShowPrincipalModal = false;
    },

    //过滤
    userFilter() {
      let filter = JSON.stringify([
        {
          operator_1: "like",
          value_1: this.searchPrincipalValue,
          property_1: "nickname",
          link: "or",
          operator_2: "like",
          value_2: this.searchPrincipalValue,
          property_2: "userCode"
        }
      ]);
      this.getListUsers(this.listUserCurrentPage, this.pageSize, filter);
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
          this.formItem.principal = tableContent.principal; //负责人id
          this.formItem.principalName = tableContent.principalName; //负责人名称
          this.formItem.highGroup = tableContent.parentName;
          this.formItem.parentId = tableContent.parentId;
          this.tableContent = tableContent;
          this.parentType = tableContent.parentType;
          this.editHighOrg = this.formItem.highGroup;
          this.editHighOrgParentId = this.formItem.parentId;
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
    } else if (!this.groupId && this.$route.name == "org-add") {
      this.isEdit = false;
      this.actionBtn.forEach(element => {
        if (element.id !== "baseinfo") {
          element.hidden = true;
        }
      });
    }

    getListById('000002').then(res => {
        if(!res[0].action.update){
          this.isPermission = false;
        }
      });
  }
};
</script>
