<style lang="less">
  .field-toolbar{
      overflow: hidden;
      .black-white{
          float: right;
      }
      .ivu-switch-large{
          width: 70px;
      }
      .ivu-switch-checked:after{
            left: 50px !important;
        }
  }
  .hidden-field{
    list-style: none;
    background-color: #fff;
    padding: 5px;
    margin-top: 8px;
    li{
      padding: 5px 0px;
    }
  }
</style>

<template>
  <div>
    <Modal v-model="showPermissionModal" :title="modalTitle" width="1000" :transfer="false" :styles="{top: '15px'}" :mask-closable="false" @on-visible-change="modalVisibleChange">
      <div>
        <Row :gutter="8" style="margin-bottom:10px;">
          <div class="field-toolbar">
              <Button @click="addNewField" type="info" shape="circle" style="margin-bottom:5px;">新增</Button>
              <i-switch v-model="isBlack" @on-change="changeBlackWhiteList" size="large" class="black-white">
                  <span slot="close">白名单</span>
                  <span slot="open">黑名单</span>
              </i-switch>
          </div>
          <Table ref="actionRef" stripe height="200" :columns="fieldColumns" size="small" no-data-text="请点击新增添加" :data="fieldData">
            <template slot-scope="{ row,index }" slot="fieldName">
              <Select ref="selectMenu" :value="row.fieldCode" filterable @on-change="fieldSelectChange($event,index)" style="width:300px">
                  <Option v-for="(item,idx) of allFieldData" :label="item.fieldName" :value="item.fieldCode" :key="idx">
                      <span class="select-field">{{ item.fieldName }}</span>
                      <Poptip v-if="item.fieldAlias" trigger="hover" style="float:right;" transfer title="对应视图字段名称" placement="right">
                        <span style="color: #39f;"><Icon type="md-help" /></span>
                        <div slot="content">
                          <ul class="hidden-field">
                            <li v-for="(alia,k) of item.fieldAlias" :key="k">{{ `${alia.view}—${alia.alias}` }}</li>
                          </ul>
                        </div>
                      </Poptip>
                  </Option>
              </Select>
            </template>
          </Table>
        </Row>
        <Row :gutter="8" style="margin-bottom:10px;">
          <Col span="4">
          <Button @click="selectUserModal" type="info" shape="circle">选择用户</Button>
          </Col>
          <Col span="4">
          <Button @click="selectGroupModal" type="info" shape="circle">选择组织</Button>
          </Col>
          <Col span="4">
          <Button @click="selectRoleModal" type="info" shape="circle">选择职位</Button>
          </Col>
          <Col v-if="false" span="3">
          <Button type="info" shape="circle">选择公司</Button>
          </Col>
        </Row>
        <Row :gutter="8">
          <Col span="24" class="permission-tab">
            <Row style="margin-top:10px">
              <Col span="3">
                <b class="permission-title">用户</b>
              </Col>
              <Col span="21" class="member-body">
                <Tag @on-close="deleteUser" v-for="(userData, index) of userSelectData" :key="index" :userId="userData.userId" closable color="warning">
                  {{ userData.nickname }}
                </Tag>
              </Col>
            </Row>
            <Row class="permission-line"></Row>
            <Row>
              <Col span="3">
              <b class="permission-title">组织</b>
              </Col>
              <Col span="21" class="member-body">
              <Tag @on-close="deleteOrg" v-for="(orgData, index) of orgSelectData" :key="index" :orgId="orgData.id" closable color="success">
                {{ orgData.name }}
              </Tag>
              </Col>
            </Row>
            <Row class="permission-line"></Row>
            <Row>
              <Col span="3">
              <b class="permission-title">职位</b>
              </Col>
              <Col span="21" class="member-body">
              <Tag @on-close="deleteDepartment" v-for="(departmentData, index) of departmentSelectData" :key="index" :depId="departmentData.id" closable color="primary">
                {{ departmentData.name }}
              </Tag>
              </Col>
            </Row>
            <!-- <Row class="permission-line"></Row> -->
            <Row v-if="false">
              <Col span="3">
              <b class="permission-title">公司</b>
              </Col>
              <Col span="21" class="member-body">
              <Tag @on-close="deleteCompany" v-for="(companyData, index) of companySelectData" :key="index" :comId="companyData.groupId" closable color="primary">
                {{ companyData.groupName }}
              </Tag>
              </Col>
            </Row>
          </Col>
        </Row>
        <!-- 用户modal -->
        <user-selector 
          :showUserSelector="showSelector.showUserSelector" 
          @emitUserModal="emitUserModal" 
          @userModalData="getUserModalData">
        </user-selector>
        <!-- 组织modal -->
        <group-selector 
          :showGroupSelector="showSelector.showGroupSelector" 
          @emitGroupModal="emitGroupModal"
          @groupModalData="getGroupModalData">
        </group-selector>
        <!-- 职位modal -->
        <role-selector 
          :showRoleSelector="showSelector.showRoleSelector" 
          @emitRoleModal="emitRoleModal"
          @roleModalData="getRoleModalData">
        </role-selector>
      </div>
      <div slot="footer">
          <Button type="default" @click="cancelAddPermission">取消</Button>
          <Button type="primary" :disabled="isModalDisabled" @click="submitPermission">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  saveFieldPermission,
  getFieldResorce,
  getFieldDetailList,
  updateFieldPermission,
  saveChildSubjectPermission,
  updateChildSubjectPermission,
  getChildSubjectField,
  getChildSubjectDetailList
} from "@/services/appService.js";
import UserSelector from '../custom-datasource/user-selector';
import GroupSelector from '../custom-datasource/group-selector';
import RoleSelector from '../custom-datasource/role-selector';

export default {
  name: "FieldModal",
  components: {
      UserSelector,
      GroupSelector,
      RoleSelector
  },
  props: {
    modalStatis: Boolean,
    resourceId: String,
    isEdit: Boolean,
    row: Object
  },
  data() {
    return {
      appListId: this.$route.params.listId,
      modalTitle: '字段或字段组权限',
      //监听数据变化刷新权限table
      emitChange: 0,

      showPermissionModal: false,
      isModalDisabled: true,
      isBlack: true,
      //已经配置的应用字段数据
      fieldData: [],
      //所有字段数据=>用于选择字段
      allFieldData: [],
      fieldColumns: [
        {
          title: "字段",
          slot: "fieldName"
        },
        {
          title: "操作",
          key: "list",
          align: "center",
          render: (h, params) => {
              return h("Button",
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.fieldData.splice(params.index,1);
                    }
                  }
                },
                "删除"
              );
          }
        }
      ],

      userSelectData: [],
      orgSelectData: [],
      departmentSelectData: [],
      companySelectData: [],
      showSelector: {
          showUserSelector: false,
          showGroupSelector: false,
          showRoleSelector: false
      }
    };
  },
  watch: {
    //监听modal状态变化
    modalStatis: function(value, oldValue) {
      if(this.isEdit){
        this.userSelectData = [];
        this.orgSelectData = [];
        this.departmentSelectData = [];
        if(this.row){
          getChildSubjectDetailList(this.row.calcRelCode,this.resourceId).then(res => {
            this.fieldData = res.data.resource;
            res.data.instance.forEach(val => {
              let pushData = {};
              if(val.objectType === 'U'){
                pushData.nickname = val.objectName;
                pushData.userId = val.objectId;
                this.userSelectData.push(pushData);
              }else if(val.objectType === 'G'){
                pushData.name = val.objectName;
                pushData.id = val.objectId;
                this.orgSelectData.push(pushData);
              }else if(val.objectType === 'R'){
                pushData.name = val.objectName;
                pushData.id = val.objectId;
                this.departmentSelectData.push(pushData);
              }
            })
          })
        }else{
          getFieldDetailList(this.appListId,this.resourceId).then(res => {
            this.fieldData = res.resource;
            res.instance.forEach(val => {
              let pushData = {};
              if(val.substanceType === 'U'){
                pushData.nickname = val.substanceName;
                pushData.userId = val.substanceId;
                this.userSelectData.push(pushData);
              }else if(val.substanceType === 'G'){
                pushData.name = val.substanceName;
                pushData.id = val.substanceId;
                this.orgSelectData.push(pushData);
              }else if(val.substanceType === 'R'){
                pushData.name = val.substanceName;
                pushData.id = val.substanceId;
                this.departmentSelectData.push(pushData);
              }
            })
          })
        }
      }else{
        this.fieldData = [];
        this.userSelectData = [];
        this.orgSelectData = [];
        this.departmentSelectData = [];
      }
      this.showPermissionModal = value;
      
    },
    //监听权限modal确定按钮的禁用启用状态
    fieldData: function(value){
      if(value.length > 0){
          this.isBlack = value[0].isBlacklist;
        if(this.userSelectData.length>0 || 
          this.orgSelectData.length>0 || 
          this.departmentSelectData.length>0 ||
          this.companySelectData.length>0
        ){
          this.isModalDisabled = false;
        }else{
          this.isModalDisabled = true;
        }
      }else{
        this.isBlack = true;
        this.isModalDisabled = true;
      }
    },
    userSelectData: function(value) {
      if(value.length > 0){
        if(this.fieldData.length > 0){
          this.isModalDisabled = false;
        }else{
          this.isModalDisabled = true;
        }
      }else{
        if(this.orgSelectData.length > 0 || this.departmentSelectData.length > 0){
          if(this.fieldData.length > 0){
            this.isModalDisabled = false;
          }else{
            this.isModalDisabled = true;
          }
        }else{
          this.isModalDisabled = true;
        }
      }
    },
    orgSelectData: function(value) {
      if(value.length > 0){
        if(this.fieldData.length > 0){
          this.isModalDisabled = false;
        }else{
          this.isModalDisabled = true;
        }
      }else{
        if(this.userSelectData.length > 0 || this.departmentSelectData.length > 0){
          if(this.fieldData.length > 0){
            this.isModalDisabled = false;
          }else{
            this.isModalDisabled = true;
          }
        }else{
          this.isModalDisabled = true;
        }
      }
    },
    departmentSelectData: function(value) {
      if(value.length > 0){
        if(this.fieldData.length > 0){
          this.isModalDisabled = false;
        }else{
          this.isModalDisabled = true;
        }
      }else{
        if(this.orgSelectData.length > 0 || this.userSelectData.length > 0){
          if(this.fieldData.length > 0){
            this.isModalDisabled = false;
          }else{
            this.isModalDisabled = true;
          }
        }else{
          this.isModalDisabled = true;
        }
      }
    },
    isChildSubject: function(value) {
      if(value){
        this.modalTitle = '子科目权限';
      }else{
        this.modalTitle = '字段或字段组权限';
      }
    }
  },
  methods: {
    fieldSelectChange(value,index) {
      this.fieldData[index].fieldCode = value;
    },
    emitUserModal() {
        this.showSelector.showUserSelector = false;
    },
    emitGroupModal() {
      this.showSelector.showGroupSelector = false;
    },
    emitRoleModal() {
      this.showSelector.showRoleSelector = false;
    },
    //新增字段
    addNewField() {
      this.fieldData.push({fieldName: '',isBlacklist: this.isBlack,fieldCode: ''});
    },
    //取消添加权限
    cancelAddPermission() {
      this.showPermissionModal = false;
    },
    //黑白名单状态切换事件
    changeBlackWhiteList(status) {
        if(status){
            this.fieldData.forEach(val => {
                val.isBlacklist = true;
            })
        }else{
            this.fieldData.forEach(val => {
                val.isBlacklist = false;
            })
        }
    },
    //提交权限
    submitPermission() {
      let userId = this.userSelectData.map(item => {
          return item.userId;
        }),
        groupId = this.orgSelectData.map(item => {
          return item.id;
        }),
        roleId = this.departmentSelectData.map(item => {
          return item.id;
        }),
        companyId = this.companySelectData.map(item => {
          return item.groupId;
        }),
        params = {
          user: userId,
          role: roleId,
          group: groupId,
          listId: this.appListId,
          resourceId: this.resourceId,
          resource: this.fieldData
        };
        if(this.row){
          for(let k in params){
            delete params['listId'];
          }
          params.calcRelCode = this.row.calcRelCode;
        }
        if (params) {
          if(this.isEdit){
            if(this.row){
              updateChildSubjectPermission(JSON.stringify(params)).then(res => {
                if (res.success) {
                  this.$Message.success(res.message);
                  this.showPermissionModal = false;
                  let Num = this.emitChange++;
                  this.$emit("reGetData", Num);
                }
              }).catch(err => {
                this.$Message.error(err.data.message);
              });
            }else{
              updateFieldPermission(JSON.stringify(params)).then(res => {
                if (res.success) {
                  this.$Message.success(res.message);
                  this.showPermissionModal = false;
                  let Num = this.emitChange++;
                  this.$emit("reGetData", Num);
                }
              }).catch(err => {
                this.$Message.error(err.data.message);
              });
            }
          }else{
            if(this.row){
              saveChildSubjectPermission(JSON.stringify(params)).then(res => {
                if (res.success) {
                  this.$Message.success(res.message);
                  this.showPermissionModal = false;
                  let Num = this.emitChange++;
                  this.$emit("reGetData", Num);
                }
              }).catch(err => {
                this.$Message.error(err.data.message);
              });
            }else{
              saveFieldPermission(JSON.stringify(params)).then(res => {
                if (res.success) {
                  this.$Message.success(res.message);
                  this.showPermissionModal = false;
                  let Num = this.emitChange++;
                  this.$emit("reGetData", Num);
                }
              }).catch(err => {
                this.$Message.error(err.data.message);
              });
            }
          }
        }
    },
    //通知父组件modal的状态
    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitPermissionModal", { modal: false });
      }
    },
    //展开userModal
    selectUserModal() {
        this.showSelector.showUserSelector = true;
    },
    //展开groupModal
    selectGroupModal() {
      this.showSelector.showGroupSelector = true;
    },
    //展开roleModal
    selectRoleModal() {
      this.showSelector.showRoleSelector = true;
    },
    //获取选择的用户数据
    getUserModalData(value) {
      if(this.userSelectData.length > 0){
        let obj = {};
        this.userSelectData.push(...value);
        this.userSelectData = this.userSelectData.reduce((cur, next) => {
          obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
          return cur;
        }, []);
      }else{
        this.userSelectData = value;
      }
    },
    //获取选择的组织数据
    getGroupModalData(value) {
      if(this.orgSelectData.length > 0){
        let obj = {};
        this.orgSelectData.push(...value);
        this.orgSelectData = this.orgSelectData.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []);
      }else{
        this.orgSelectData = value;
      }
    },
    //获取选择的职位数据
    getRoleModalData(value) {
      if(this.departmentSelectData.length > 0){
        let obj = {};
        this.departmentSelectData.push(...value);
        this.departmentSelectData = this.departmentSelectData.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []);
      }else{
        this.departmentSelectData = value;
      }
    },
    //删除用户
    deleteUser(event) {
        let userId = event.target.parentElement.getAttribute("userid");
        this.userSelectData = this.userSelectData.filter(f => {
            return f.userId != userId;
        });
    },
    //删除组织
    deleteOrg(event) {
        let orgId = event.target.parentElement.getAttribute("orgid");
        this.orgSelectData = this.orgSelectData.filter(f => {
            return f.id != orgId;
          });
    },
    //删除职位
    deleteDepartment(data, index) {
        let depId = event.target.parentElement.getAttribute("depid");
        this.departmentSelectData = this.departmentSelectData.filter(f => {
            return f.id != depId;
          });
    }
  },
  created() {
    if(this.row){
      getChildSubjectField(this.row.calcRelCode).then(res => {
        if(res.success){
          this.allFieldData = res.data;
        }
      })
    }else{
      getFieldResorce(this.appListId).then(res => {
        this.allFieldData = res;
      })
    }
  },
  mounted() {
  }
};
</script>

