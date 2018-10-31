<style lang="less">
@import "./report-modal.less";
</style>

<template>
  <Modal 
    v-model="showPermissionModal" 
    title="视图权限" 
    width="600" 
    :mask-closable="false" 
    @on-visible-change="modalVisibleChange">
    <div>
      <Row :gutter="8" style="margin-bottom:10px;">
        <Col span="8">
        <Button @click="selectUserModal" type="info" shape="circle">选择用户</Button>
        </Col>
        <Col span="8">
        <Button @click="selectGroupModal" type="info" shape="circle">选择组织</Button>
        </Col>
        <Col span="8">
        <Button @click="selectRoleModal" type="info" shape="circle">选择职位</Button>
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
  saveViewPermission,
  getAllPermissionData
} from "@/services//appService.js";
import UserSelector from '../custom-datasource/user-selector';
import GroupSelector from '../custom-datasource/group-selector';
import RoleSelector from '../custom-datasource/role-selector';

export default {
  name: "ReportModal",
  components: {
    UserSelector,
    GroupSelector,
    RoleSelector
  },
  props: {
    modalStatis: {
      type: Boolean
    },
    permissionId: {
      type: [String, Number]
    },

    permissionData: {
      type: Array
    }
  },
  data() {
    return {
      appListId: this.$route.params.listId,
      //监听数据变化刷新权限table
      emitChange: 0,
      showPermissionModal: false,
      isModalDisabled: true,
      userSelectData: [],
      orgSelectData: [],
      departmentSelectData: [],
      showSelector: {
          showUserSelector: false,
          showGroupSelector: false,
          showRoleSelector: false
      }
    };
  },
  watch: {
    modalStatis: function(value, oldValue) {
      this.showPermissionModal = value;
      this.userSelectData = [];
      this.orgSelectData = [];
      this.departmentSelectData = [];

      if (value) {
        this.orgSelectData = this.permissionData.filter(item => {
          return item.type === "group";
        });
        this.departmentSelectData = this.permissionData.filter(item => {
          return item.type === "role";
        });
        this.permissionData.forEach(item => {
          if (item.type === "user") {
            this.userSelectData.push({
              nickname: item.name,
              userId: item.id,
              type: item.type
            });
          }
        });
      }
    },
    userSelectData: function(value) {
      if(value.length > 0){
          this.isModalDisabled = false;
      }else{
        if(this.orgSelectData.length > 0 || this.departmentSelectData.length > 0){
            this.isModalDisabled = false;
        }else{
            this.isModalDisabled = true;
        }
      }
    },
    orgSelectData: function(value) {
      if(value.length > 0){
          this.isModalDisabled = false;
      }else{
        if(this.departmentSelectData.length > 0 || this.userSelectData.length > 0){
            this.isModalDisabled = false;
        }else{
            this.isModalDisabled = true;
        }
      }
    },
    departmentSelectData: function(value) {
      if(value.length > 0){
          this.isModalDisabled = false;
      }else{
        if(this.orgSelectData.length > 0 || this.userSelectData.length > 0){
            this.isModalDisabled = false;
        }else{
            this.isModalDisabled = true;
        }
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
      let userId = event.target.parentElement.getAttribute('userid');
      this.userSelectData = this.userSelectData.filter(f =>{
            return f.userId != userId;
          })
      this.userSelection = this.userSelection.filter(f =>{
        return f.userId != userId;
      })
    },
    //删除组织
    deleteOrg(event) {
      let orgId = event.target.parentElement.getAttribute('orgid');
      this.orgSelectData = this.orgSelectData.filter(f =>{
            return f.id != orgId;
          });
      this.orgSelection = this.orgSelection.filter(f =>{
        return f.id != orgId;
      });
    },
    //删除职位
    deleteDepartment(event) {
      let depId = event.target.parentElement.getAttribute('depid');
      this.departmentSelectData = this.departmentSelectData.filter(f =>{
            return f.id != depId;
          });
      this.departmentSelection = this.departmentSelection.filter(f =>{
        return f.id != depId;
      });
    },
    //提交权限
    submitPermission() {
      let userId = this.userSelectData
          .map(item => {
            return item.userId;
          })
          .join(","),
        groupId = this.orgSelectData
          .map(item => {
            return item.id;
          })
          .join(","),
        roleId = this.departmentSelectData
          .map(item => {
            return item.id;
          })
          .join(",");
      saveViewPermission(this.permissionId, userId, groupId, roleId).then(
        res => {
          if (res.success) {
            this.showPermissionModal = false;
            this.$Message.success(res.message);
            let Num = this.emitChange++;
            this.$emit("reGetData", Num);
          } else {
            this.$Message.error(res.message);
          }
        }
      );
    },
    //通知父组件modal的状态
    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitPermissionModal", { modal: false });
      }
    }
  }
};
</script>

