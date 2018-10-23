<style lang="less">
  @import './action-modal.less';
</style>

<template>
  <Modal v-model="showPermissionModal" title="应用权限" width="1000" :styles="{top: '15px'}" :mask-closable="false" @on-visible-change="modalVisibleChange">
    <div>
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
        <Button @click="selectCompanyModal" type="info" shape="circle">选择公司</Button>
        </Col>
      </Row>
      <Row :gutter="8">
        <Col span="12" class="permission-tab">
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
        <Col span="12">
          <Table @on-selection-change="permissionSelectChange" ref="actionRef" stripe height="350" :columns="allPermissionColumns" size="small" :data="allPermissionData">
          </Table>
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
</template>

<script>
import {
  addPermission,
  getAllPermissionData,
  clearAppPermission,
  getAllResourcePermissionData
} from "@/services//appService.js";
import UserSelector from '../custom-datasource/user-selector';
import GroupSelector from '../custom-datasource/group-selector';
import RoleSelector from '../custom-datasource/role-selector';
import { APP_ACTION } from "@/assets/const";

export default {
  name: "permissionModal",
  components: {
    UserSelector,
    GroupSelector,
    RoleSelector
  },
  props: {
    modalStatis: Boolean,
    modalName: String
  },
  data() {
    return {
      appListId: this.$route.params.listId,
      //监听数据变化刷新权限table
      emitChange: 0,
      showPermissionModal: false,
      isModalDisabled: true,
      allPermissionData: [],
      permissionSelectDatas: [],
      allPermissionColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "动作名称",
          key: "name",
          width: 100
        },
        {
          title: "说明",
          key: "desc"
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
      this.showPermissionModal = value;
      //动作权限每次清空
      this.permissionSelectDatas = [];
      //新增状态清空缓存数据
      if(this.showPermissionModal){
        this.getData();
      }
      this.userSelectData = [];
      this.orgSelectData = [];
      this.departmentSelectData = [];
    },
    //监听权限modal确定按钮的禁用启用状态
    permissionSelectDatas: function(value){
      if(value.length > 0){
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
        this.isModalDisabled = true;
      }
    }
  },
  methods: {
    emitUserModal() {
        this.showSelector.showUserSelector = false;
    },
    emitGroupModal() {
      this.showSelector.showGroupSelector = false;
    },
    emitRoleModal() {
      this.showSelector.showRoleSelector = false;
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
    //取消添加权限
    cancelAddPermission() {
      this.showPermissionModal = false;
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
    //删除用户
    deleteUser(event) {
      let userId = event.target.parentElement.getAttribute("userid"),
          permissionIds = [];
      this.permissionSelectDatas.forEach(val => {
        permissionIds.push(val.id);
      });

      clearAppPermission('sys_user_permission',userId,permissionIds.join(',')).then(res => {
        if (res.success) {
          this.userSelectData = this.userSelectData.filter(f => {
            return f.userId != userId;
          });
          this.userSelection = this.userSelection.filter(f => {
            return f.userId != userId;
          });
        }
      });
    },
    //删除组织
    deleteOrg(event) {
      let orgId = event.target.parentElement.getAttribute("orgid"),
          permissionIds = [];
      this.permissionSelectDatas.forEach(val => {
        permissionIds.push(val.id);
      });
      clearAppPermission('sys_group_permission',orgId,permissionIds.join(',')).then(res => {
        if (res.success) {
          this.orgSelectData = this.orgSelectData.filter(f => {
            return f.id != orgId;
          });
          this.orgSelection = this.orgSelection.filter(f => {
            return f.id != orgId;
          });
        }
      });
    },
    //删除职位
    deleteDepartment(data, index) {
      let depId = event.target.parentElement.getAttribute("depid"),
          permissionIds = [];
      this.permissionSelectDatas.forEach(val => {
        permissionIds.push(val.id);
      });
      clearAppPermission('sys_role_permission',depId,permissionIds.join(',')).then(res => {
        if (res.success) {
          this.departmentSelectData = this.departmentSelectData.filter(f => {
            return f.id != depId;
          });
          this.departmentSelection = this.departmentSelection.filter(f => {
            return f.id != depId;
          });
        }
      });
    },
    //删除公司
    deleteCompany(data, index) {
      let comId = event.target.parentElement.getAttribute("comid"),
          permissionIds = [];
      this.permissionSelectDatas.forEach(val => {
        permissionIds.push(val.id);
      });
      clearAppPermission('sys_group_permission',comId,permissionIds.join(',')).then(res => {
        if (res.success) {
          this.companySelectData = this.companySelectData.filter(f => {
            return f.groupId != comId;
          });
          this.companySelectData = this.companySelectData.filter(f => {
            return f.groupId != comId;
          });
        }
      });
    },
    //权限选择
    permissionSelectChange(selection, row) {
      this.permissionSelectDatas = selection;
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
        permissionId = this.permissionSelectDatas.map(item => {
          return item.id;
        }),
        params = {
          userId: userId.join(","),
          roleId: roleId.join(","),
          groupId: groupId.join(","),
          companyId: companyId.join(","),
          permissionId: permissionId.join(",")
        };
        if (params) {
          addPermission(params).then(res => {
            if (res.success) {
              this.$Message.success(res.message);
              this.showPermissionModal = false;
              let Num = this.emitChange++;
              this.$emit("reGetData", Num);
            }
          });
        }
    },
    //通知父组件modal的状态
    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitPermissionModal", { modal: false });
      }
    },
    //获取权限数据
    getData() {
      let listId = this.appListId;
      //获取应用权限数据
      if(this.modalName === 'action'){
        this.getActionPerData(listId);
      }else{
        this.getResPerData(listId);
      }
    },
    //获取动作权限数据
    getActionPerData(listId) {
      getAllPermissionData(listId).then(res => {
        this.allPermissionData = res.tableContent;
        this.allPermissionData.map(ac => {
          ac.desc = APP_ACTION[ac.resourceName];
        });
      });
    },
    //获取数据源权限数据
    getResPerData(listId) {
      getAllResourcePermissionData(listId).then(res => {
        this.allPermissionData = res.tableContent;
        this.allPermissionData.map(ac => {
          ac.desc = APP_ACTION[ac.resourceName];
        });
    })
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

