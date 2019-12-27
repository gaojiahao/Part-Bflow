
<style lang="less" scoped>
@import "./../organization.less";
.formsection {
  padding: 20px 50px 20px 10px;
  margin-bottom: 10px;
  background-color: rgb(255, 255, 255);
}

.tax-rate{
  position: absolute;
  top: -2px;
  left: -8px;
  color: #e4393c
}
.tax-date{
  position: absolute;
  top: -2px;
  left: -7px;
  color: #e4393c
}
.org-form{
  width:50%;
  margin:auto;
  padding-bottom: 50px;
    /deep/ .ivu-form-item-label{
        font-size: 14px;
        font-weight: bold;
    }
    .viewing{
        /deep/ .input-status-isedit input {
            border-bottom: none!important;
        }
        
        /deep/ .ivu-icon{
            display: none !important;
        }
        /deep/ .ivu-select-selection{
            border-bottom: none !important;
            background-color: #fff;
            color: #515a6e;
        }
        /deep/ .ivu-form-item-required .ivu-form-item-label:before{
            display: none;
        }
    }
   
}



</style>

<template>
  <div  class="org-form">
    <Form
      :model="formItem"
      :labelWidth="100"
      ref="formItem"
      :rules="ruleValidate"
      :class="{'viewing':model=='view'}"
    >
      <div class="shadow formsection">
        <FormItem label="组织名称:" prop="groupName">
          <Input
            v-model="formItem.groupName"
            @on-blur="onGroupNameOutBlur"
            :readonly="model=='view'"
            :class="model=='view'?'input-status-isedit':''"
          />
        </FormItem>

        <FormItem label="组织类型:" prop="groupType">
          <Select
            v-model="formItem.groupType"
            :disabled="model=='view'"
            :class="isEdit?'input-status-isedit':''"
          >
            <Option value="M">管理层</Option>
            <Option value="A">事业部</Option>
            <Option value="O">部门</Option>
            <Option value="D">直营店</Option>
            <Option value="J">加盟店</Option>
            <Option value="G">小组</Option>
          </Select>
        </FormItem>

        <FormItem label="组织职能:" prop="depFunction">
          <Select
            v-model="formItem.depFunction"
            :disabled="model=='view'"
            :class="isEdit?'input-status-isedit':''"
          >
            <Option value="M">管理</Option>
            <Option value="S">销售</Option>
            <Option value="C">制造</Option>
            <Option value="R">研发</Option>
            <Option value="O">运营</Option>
            <Option value="E">工程</Option>
            <Option value="D">开发</Option>
          </Select>
        </FormItem>
      </div>

      <div class="shadow formsection">
        <FormItem label="组织负责人:" prop="principalName" style="margin-top:20px">
          <Input
            @on-click="selectPrincipalModal"
            v-model="formItem.principalName"
            icon="md-arrow-dropdown"
            placeholder="选择负责人"
            :readonly="model=='view'"
            :class="isEdit?'input-status-isedit':''"
          ></Input>
        </FormItem>
        <FormItem label="上级组织:" prop="highGroup" style="margin-top:20px">
          <Input
            @on-click="selectHighOrgModal"
            v-model="formItem.highGroup"
            icon="md-arrow-dropdown"
            placeholder="选择上级组织"
            :readonly="model=='view'"
            :class="isEdit?'input-status-isedit':''"
          ></Input>
        </FormItem>
        <FormItem v-if="hiddenInput" label="上级组织parentId" style="font-size:16px">
          <Input v-model="formItem.parentId"/>
        </FormItem>
        <FormItem label="税率关系:">
            <div v-if="model!=='view'">
              <Button type="info" size="small" @click="addTaxCompany">新增</Button>
              <Table border size="small" :columns="taxColumns" :data="formItem.taxCompanyRelList">
                <template slot-scope="{ row,index }" slot="trTaxRate">
                  <div :style="{position:'relative'}">
                    <b class="tax-rate">*</b>
                    <Input @on-blur="onTaxBlur(row,index)" v-model="row.trTaxRate" style="width:60px"></Input>%
                  </div>
                </template>
                <template slot-scope="{ row,index }" slot="trStartEffectiveTime">
                  <div :style="{position:'relative'}">
                    <b class="tax-date">*</b>
                    <DatePicker format="yyyy-MM-dd" @on-change="onDateChange(row,index)" transfer type="date" v-model="row.trStartEffectiveTime"></DatePicker>
                  </div>
                </template>
                <template slot-scope="{ row,index }" slot="trComment">
                    <Input @on-blur="onTaxCommentBlur(row,index)" :autosize="true" type="textarea" v-model="row.trComment"></Input>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Icon @click="deleteTaxCompany(index)" type="md-close" :style="{color:'#39f',fontSize:'18px'}" />
                </template>
              </Table>
            </div>
            <Table v-else border size="small" :columns="taxViewColumns" :data="formItem.taxCompanyRelList">
              <template slot-scope="{ row }" slot="trTaxRate">
                <div>{{ row.trTaxRate }}%</div>
              </template>
            </Table>
          </FormItem>
      </div>

      <div class="shadow formsection" v-if="groupId">
        <FormItem label="创建者:">
          <span>{{ formItem.creator}}</span>
        </FormItem>
        <FormItem label="创建时间:">
          <span>{{ formItem.crtTime }}</span>
        </FormItem>
        <FormItem label="修改者:">
          <span>{{ formItem.modifier}}</span>
        </FormItem>
        <FormItem label="修改时间:">
          <span>{{ formItem.modTime }}</span>
        </FormItem>
      </div>
    </Form>
    <div class="baseinfo-container-action">
      <input
        type="submit"
        value="关闭"
        @click="handlerCloseWin"
        style="background-color:rgb(81, 90, 110)"
        class="baseinfo-container-action-submit"
        id="close"
      >
       <input
        type="submit"
        value="保存"
        @click="handlerSave"
        class="baseinfo-container-action-submit"
        id="save"
        v-show="model!='view' && formItem.status !== -2"
      >
      <input
        type="submit"
        value="编辑"
        @click="model='edit'"
        class="baseinfo-container-action-submit"
        id="edit"
        v-if="groupId && isPermission && model=='view'  && (formItem.status == 1 || formItem.status == 0)"
      >
      <input
        type="submit"
        value="放弃编辑"
        @click="model='view'"
        class="baseinfo-container-action-submit"
        id="edit"
        v-if="model=='edit'"
      >
     
      <input
        type="submit"
        value="归档"
        @click="handlerFile"
        style="background-color:rgb(31, 94, 197)"
        class="baseinfo-container-action-submit"
        id="file"
        v-show="formItem.status === 1 && (groupId)"
      >
      <input
        type="submit"
        value="还原"
        style="background-color:rgb(31, 94, 197)"
        class="baseinfo-container-action-submit"
        id="restore"
        @click="handlerRestore"
        v-show="formItem.status === -2"
      >
      <input
        type="submit"
        value="保存并新建"
        @click="newAfterSave=true;save();"
        class="baseinfo-container-action-submit"
        id="saveAndAdd"
        v-if="!groupId"
      >
      <input
        type="submit"
        value="保存草稿"
        @click="handlerDraft"
        class="baseinfo-container-action-submit"
        id="draft"
        v-show="(!isEdit && formItem.status === 0) || !groupId"
      >
    </div>

    <member-modal
      v-model="isShowMemberModal"
      width="700"
      footerBtnAlign="right"
      title="选择组织"
      @on-ok="saveSelectionHighOrg"
    >
      <div style="margin-top:10px;">
        <div class="app-search">
          <Input
            @on-search="orgFilter"
            :search="true"
            v-model="searchHighOrgValue"
            placeholder="搜索组织名称"
            style="width: 300px"
          ></Input>
          <a @click="orgFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </a>
        </div>
        <Table
          class="rfd-table"
          height="400"
          :loading="highOrgModalLoading"
          :columns="highOrgColumnsModal"
          :data="listUserData"
          size="small"
          highlight-row
          ref="currentRowTable"
          @on-row-dblclick="handleHighOrgDblclick"
          @on-current-change="onSelectUserList"
        ></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page
              :total="listUserPageTotal"
              :current="listUserCurrentPage"
              :page-size="pageSize"
              size="small"
              @on-page-size-change="onHighOrgPageSizeChange"
              @on-change="listUserChangePage"
              show-total
              show-elevator
              show-sizer
            ></Page>
          </div>
        </div>
      </div>
    </member-modal>
    <principal-modal
      v-model="isShowPrincipalModal"
      width="700"
      footerBtnAlign="right"
      title="选择负责人"
      @on-ok="savaSelectPrincipal"
    >
      <div>
        <div class="app-search">
          <Input
            @on-search="userFilter"
            :search="true"
            v-model="searchPrincipalValue"
            placeholder="搜索工号或者名称"
            style="width: 300px"
          ></Input>
          <a @click="userFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </a>
        </div>
        <Table
          class="rfd-table"
          height="400"
          :loading="PrincipalModaLoading"
          :columns="principalColumnsModel"
          :data="principalData"
          size="small"
          highlight-row
          ref="currentRowTable"
          @on-row-dblclick="handlePrinciplDblclick"
          @on-current-change="onSelectPrincipal"
        ></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page
              :total="principalPageTotal"
              :current="principalCurrentPage"
              :page-size="principalPageSize"
              size="small"
              @on-page-size-change="onPrincipalPageSizeChange"
              @on-change="principalChangePage"
              show-total
              show-elevator
              show-sizer
            ></Page>
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
  getListById,
  getOrgById
} from "@/services/addressBookService.js";

import MemberModal from "@/components/modal/Modal";
import PrincipalModal from "@/components/modal/Modal";
import { toPercent } from "@/utils/utils";

export default {
  name: "OrgBasic",
  components: {
    MemberModal,
    PrincipalModal
  },
  props:{
     formItem: {
       type:Object,
       default:()=>{
         return {}
       }
     }
  },
  data() {
    return {
      isEdit: true,
      editBtnName: "编辑",

      hiddenInput: false,
     
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
      taxColumns: [{
          title: "税率",
          slot: "trTaxRate"
        },
        {
          title: "开始生效时间",
          slot: "trStartEffectiveTime"
        },
        {
          title: "说明",
          slot: "trComment"
        },
        {
          title: "动作",
          slot: "action",
          align: 'center',
          width: 70
      }],
      taxViewColumns: [{
          title: "税率",
          slot: "trTaxRate"
        },
        {
          title: "开始生效时间",
          key: "trStartEffectiveTime"
        },
        {
          title: "说明",
          key: "trComment"
      }],
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
              case "E":
                depFunction = "工程";
                break;
              case "D":
                depFunction = "开发";
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
                value = "已失效";
                break;
              case 1:
                value = "已生效";
                break;
              case 2:
                value = "进行中";
                break;
              case 0:
                value = "草稿";
                break;
              case -2:
                value = "已归档";
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
      isPermission: true,

      model: "create"
    };
  },
   watch: {
    
    $route(to, from) {
      if(to.name === 'create'){
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    }
  },

  methods: {
    deepClone(cloneObject) {
      if (cloneObject === null || typeof cloneObject !== 'object') return cloneObject;

      let result = cloneObject.constructor();

      for(let key in cloneObject){
          if (cloneObject.hasOwnProperty(key)) {
              if(cloneObject[key] && typeof cloneObject[key] === 'object'){
                  result[key] = this.deepClone(cloneObject[key]);
              }else{
                  result[key] = cloneObject[key];
              }
          }
      }

      return result;
  },
    //格式化日期方法
    formatDate(currentDate) {
      let date = new Date(currentDate),
          year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate(),
          relDate;
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      relDate = `${year}-${month}-${day}`;

      return relDate;
    },
    addTaxCompany () {
      this.formItem.taxCompanyRelList.push({trTaxRate:null,trStartEffectiveTime:"",trComment:"",action:""});
    },
    deleteTaxCompany (index) {
      this.formItem.taxCompanyRelList.splice(index,1);
    },
    onTaxBlur(row,index){
      if(!isNaN(row.trTaxRate) && row.trTaxRate > 0){
        row.trStartEffectiveTime && (row.trStartEffectiveTime = this.formatDate(row.trStartEffectiveTime));
        this.formItem.taxCompanyRelList[index] = row;
      }else{
        this.$Message.error('请输入数字且大于0！');
        this.$set(row,'trTaxRate',null);
      }
    },
    onDateChange(row,index){
      row.trStartEffectiveTime && (row.trStartEffectiveTime = this.formatDate(row.trStartEffectiveTime));
      this.formItem.taxCompanyRelList[index] = row;
    },
    onTaxCommentBlur(row,index){
      row.trStartEffectiveTime && (row.trStartEffectiveTime = this.formatDate(row.trStartEffectiveTime));
      this.formItem.taxCompanyRelList[index] = row;
    },
    //点击关闭按钮
    handlerCloseWin(){
        this.$Modal.confirm({
            title: "提示",
            content: "是否关闭当前页面",
            closable: true,
            onOk: function() {
                window.close();
            }
        });
    },
    //点击保存
    handlerSave(){
        this.formItem.status = 1;
        this.save();
    },
    handlerSaveAndNew(){
        this.saveAndAdd();
    },
    handlerFile(){
        //设置状态为归档
        this.formItem.status = -2;
        this.save();
    },
    handlerDraft(){
        //设置状态为草稿
        this.formItem.status = 0;
        this.save();
    },
    handlerRestore(){
        //设置状态为 已生效
        this.formItem.status = 1;
        this.save();
    },
    /**
     * 保存基本信息
     */
    save() {
        delete this.formItem.creator;
        delete this.formItem.crtTime;
        delete this.formItem.modifier;
        delete this.formItem.modTime;

        let saveOption = saveBaseinfo;


      this.$refs["formItem"].validate(valid => {
        if (valid) {

          if(this.model !='create'){
            saveOption = updateBaseinfo;
            this.formItem.groupId = this.groupId;
          }
          let data = this.deepClone(this.formItem);
          data.taxCompanyRelList.forEach(it => {
            it.trTaxRate = it.trTaxRate/100;
          })
          saveOption(data).then(res =>{
            if (res) {
              this.$Message.success('保存成功!');

              if(!this.newAfterSave && this.model === 'create'){
                  this.$router.push({
                      path: `/addressBook/organization/detail/${res.groupId}`
                  });
              }
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }
          }).catch(error =>{
            this.$Message.error(error.data.message);
          });
        }
      });
    },

    /**
     * 获取相关实例数量
     * @param groupId 组织id
     */
    getObjDetailsCountByGroupId(groupId) {
      getObjDetailsCountByGroupId(groupId).then(res => {
        this.actionBtn.forEach((element, index) => {
          if (element.id !== "baseinfo" && element.id !== "teamProfit") {
            element.number = res[element.id] ? res[element.id] : 0;
          }
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
      this.getAllHigherGroupByGroupType(
        this.listUserCurrentPage,
        this.pageSize,
        filter
      );
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
      getAllHigherGroupByGroupType(
        currentPage,
        pageSize,
        this.formItem.groupType,
        filter
      ).then(res => {
        this.listUserPageTotal = res.summary.total;
        this.listUserData = res.tableContent;
        this.highOrgModalLoading = false;
      });
    },

    //展示上级组织选择器
    selectHighOrgModal() {
      if (this.formItem.groupType) {
        this.isShowMemberModal = true;
        this.searchHighOrgValue = "";
        this.getAllHigherGroupByGroupType(
          this.listUserCurrentPage,
          this.pageSize
        );
      } else {
        this.$Message.info("组织类型不能为空！");
      }
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
      let filter = JSON.stringify([{"operator":"in","value":"1","property":"status"}]); 

      this.getListUsers(this.principalCurrentPage, this.principalPageSize,filter);
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
        },{operator:"in",value:"1",property:"status"}
      ]);
      this.getListUsers(this.listUserCurrentPage, this.pageSize, filter);
    }
  },

  mounted() {
    this.groupId = this.$route.params.groupId;
    this.newAfterSave = false;
    
    if (this.groupId) {
      this.model = "view";
    }
  }
};
</script>

