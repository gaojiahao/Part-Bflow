<style lang="less">
@import "./report-modal.less";
</style>

<template>
  <Modal v-model="showPermissionModal" title="视图权限" width="600" :mask-closable="false" @on-ok="submitPermission" @on-visible-change="modalVisibleChange">
    <div>
      <Row :gutter="8" style="margin-bottom:10px;">
        <Col span="8">
        <Button @click="selectUserModal" type="info" shape="circle">选择用户</Button>
        </Col>
        <Col span="8">
        <Button @click="selectOrgModal" type="info" shape="circle">选择组织</Button>
        </Col>
        <Col span="8">
        <Button @click="selectPositionModal" type="info" shape="circle">选择职位</Button>
        </Col>
      </Row>
      <Row :gutter="8">
        <Col span="24" class="permission-tab">
        <Row style="margin-top:10px">
          <Col span="3">
          <b class="permission-title">用户</b>
          </Col>
          <Col span="21" class="member-body">
          <Tag @on-close="deleteUser" v-for="(userData, index) of userSelectData" :key="index" :userId="userData.userId" type="border" closable color="yellow">
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
          <Tag @on-close="deleteOrg" v-for="(orgData, index) of orgSelectData" :key="index" :orgId="orgData.id" type="border" closable color="green">
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
          <Tag @on-close="deleteDepartment" v-for="(departmentData, index) of departmentSelectData" :key="index" :depId="departmentData.id" type="border" closable color="blue">
            {{ departmentData.name }}
          </Tag>
          </Col>
        </Row>
        </Col>
      </Row>
      <!-- 用户modal -->
      <Modal v-model="showUserModal" title="用户选择" :mask-closable="false" @on-ok="confirmUser" :transfer="false">
        <div class="app-search">
          <Input v-model="searchUserValue" @on-search="userFilter" :search="true" placeholder="名称搜索" style="width: 300px"></Input>
          <p @click="userFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table @on-select-cancel="selectUserCancel" @on-select="selectUserClick" @on-select-all="selectUserClick" height="310" stripe size="small" :loading="userLoading" :columns="userColumns" :data="userData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page :total="userTotal" :current="userCurrentPage" :page-size="pageSize" @on-change="onUserPageChange" size="small" show-total></Page>
          </div>
        </div>
      </Modal>
      <!-- 组织modal -->
      <Modal v-model="showOrgModal" title="组织选择" :mask-closable="false" @on-ok="confirmOrg" :transfer="false">
        <div class="app-search">
          <Input v-model="searchOrgValue" @on-search="orgFilter" :search="true" placeholder="搜索" style="width: 300px"></Input>
          <p @click="orgFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table @on-select-cancel="selectOrgCancel" @on-select="selectOrgClick" @on-select-all="selectOrgClick" height="310" stripe size="small" :loading="orgLoading" :columns="orgColumns" :data="orgData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page :total="orgTotal" :current="orgCurrentPage" :page-size="pageSize" @on-change="onOrgPageChange" size="small" show-total></Page>
          </div>
        </div>
      </Modal>
      <!-- 职位modal -->
      <Modal v-model="showDepartmentModal" title="职位选择" :mask-closable="false" @on-ok="confirmDepartment" :transfer="false">
        <div class="app-search">
          <Input v-model="searchDepValue" @on-search="depFilter" :search="true" placeholder="搜索" style="width: 300px"></Input>
          <p @click="depFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table @on-select-cancel="selectDepCancel" @on-select="selectDepartmentClick" @on-select-all="selectDepartmentClick" height="310" stripe :size="tableSize" :loading="depLoading" :columns="departmentColumns" :data="departmentData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page :total="depTotal" :current="depCurrentPage" :page-size="pageSize" @on-change="onDepPageChange" size="small" show-total></Page>
          </div>
        </div>
      </Modal>
    </div>
  </Modal>
</template>

<script>
import {
  getAllUserData,
  saveViewPermission,
  getAllOrgData,
  getAllDepartmentData,
  getAllPermissionData
} from "@/services//appService.js";
export default {
  name: "permissionModal",
  components: {},
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
      selectUser: "",
      selectOrg: "",
      selectPosition: "",
      searchUserValue: "",
      searchOrgValue: "",
      searchDepValue: "",
      tableSize: "small",
      userTotal: 0,
      orgTotal: 0,
      depTotal: 0,
      userCurrentPage: 1,
      orgCurrentPage: 1,
      depCurrentPage: 1,
      pageSize: 10,
      //监听数据变化刷新权限table
      emitChange: 0,
      userLoading: true,
      orgLoading: true,
      depLoading: true,
      showUserModal: false,
      showOrgModal: false,
      showDepartmentModal: false,
      showPermissionModal: false,
      sameUserData: [],

      userSelectData: [],
      orgSelectData: [],
      departmentSelectData: [],

      userColumns: [],
      userData: [],
      orgColumns: [],
      orgData: [],
      departmentColumns: [],
      departmentData: [],
      userSelection: [],
      orgSelection: [],
      departmentSelection: []
    };
  },
  watch: {
    modalStatis: function(value, oldValue) {
      this.showPermissionModal = value;
      this.userSelectData = [];
      this.orgSelectData = [];
      this.departmentSelectData = [];
      this.userSelection = [];
      this.orgSelection = [];
      this.departmentSelection = [];

      if (value) {
        this.orgSelectData = this.permissionData.filter(item => {
          return item.type === "group";
        });
        this.orgSelection = this.orgSelectData;
        this.departmentSelectData = this.permissionData.filter(item => {
          return item.type === "role";
        });
        this.departmentSelection = this.departmentSelectData;
        this.permissionData.forEach(item => {
          if (item.type === "user") {
            this.userSelectData.push({
              nickname: item.name,
              userId: item.id,
              type: item.type
            });
          }
        });
        this.userSelection = this.userSelectData;
      }
    }
  },

  //回显数据
  permissionData: function(value, oldValue) {},
  methods: {
    //用户过滤
    userFilter() {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchUserValue, property: "nickname" }
      ]);
      this.selectUserModal(filter);
    },
    //组织过滤
    orgFilter() {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchOrgValue, property: "name" }
      ]);
      this.selectOrgModal(filter);
    },
    //职位过滤
    depFilter() {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchDepValue, property: "name" }
      ]);
      this.selectPositionModal(filter);
    },
    confirmMember() {},
    //用户数据加载
    selectUserModal(filter) {
      let userColumn = [
        { type: "selection", width: 60, align: "center" },
        { title: "姓名", key: "nickname" },
        { title: "工号", key: "userCode" }
      ];
      this.showUserModal = true;
      this.userColumns = userColumn;
      this.userLoading = true;
      getAllUserData(this.userCurrentPage, this.pageSize, filter).then(res => {
        this.userData = res.tableContent;
        this.sameUserData = res.tableContent;
        this.userTotal = res.dataCount;
        this.userLoading = false;
      });
    },
    //组织数据加载
    selectOrgModal(filter) {
      let orgColumn = [
        { type: "selection", width: 60, align: "center" },
        { title: "名称", key: "name" }
      ];
      this.showOrgModal = true;
      this.orgColumns = orgColumn;
      this.orgLoading = true;
      getAllOrgData(this.orgCurrentPage, this.pageSize, filter).then(res => {
        this.orgData = res.tableContent;
        this.orgTotal = res.dataCount;
        this.orgLoading = false;
      });
    },
    //职位数据加载
    selectPositionModal(filter) {
      let departmentColumn = [
          { type: "selection", width: 60, align: "center" },
          { title: "名称", key: "name" }
        ];
      this.showDepartmentModal = true;
      this.departmentColumns = departmentColumn;
      this.depLoading = true;
      getAllDepartmentData(this.depCurrentPage, this.pageSize, filter).then(
        res => {
          this.departmentData = res.tableContent;
          this.depTotal = res.dataCount;
          this.depLoading = false;
        }
      );
    },
    //选择用户
    selectUserClick(selection, row) {
      if (this.userSelection.length > 0) {
        selection.forEach((val, index) => {
          this.userSelection.push(val);
        });
      } else {
        this.userSelection = selection;
      }
    },
     //取消选择的用户
    selectUserCancel(selection,row){
      this.userSelection.forEach((val,index) => {
        if(val.userId === row.userId){
          this.userSelection.splice(index,1);
        }
      })
    },
    //选择组织
    selectOrgClick(selection, row) {
      if (this.orgSelection.length > 0) {
        selection.forEach((val, index) => {
          this.orgSelection.push(val);
        });
      } else {
        this.orgSelection = selection;
      }
    },
    //取消选择的组织
    selectOrgCancel(selection,row) {
      this.orgSelection.forEach((val,index) => {
        if(val.id === row.id){
          this.orgSelection.splice(index,1);
        }
      })
    },
    //选择职位
    selectDepartmentClick(selection, row) {
      if (this.departmentSelection.length > 0) {
        selection.forEach((val, index) => {
          this.departmentSelection.push(val);
        });
      } else {
        this.departmentSelection = selection;
      }
    },
     //取消选择的职位
    selectDepCancel(selection,row) {
      this.departmentSelection.forEach((val,index) => {
        if(val.id === row.id){
          this.departmentSelection.splice(index,1);
        }
      })
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

    //添加用户权限
    confirmUser() {
      let obj = {};
      //去掉重复数据
      this.userSelectData = this.userSelection.reduce((cur, next) => {
        obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
        return cur;
      }, []);
    },
    //添加组织权限
    confirmOrg() {
      let obj = {};
      this.orgSelectData = this.orgSelection.reduce((cur, next) => {
        obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
        return cur;
      }, []);
    },
    //添加职位权限
    confirmDepartment() {
      let obj = {};
      this.departmentSelectData = this.departmentSelection.reduce(
        (cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        },
        []
      );
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
    },
    //用户page点击
    onUserPageChange(currentPage) {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchUserValue, property: "nickname" }
      ]);
      this.userCurrentPage = currentPage;
      this.selectUserModal(filter);
    },
    //组织page点击
    onOrgPageChange(currentPage) {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchOrgValue, property: "name" }
      ]);
      this.orgCurrentPage = currentPage;
      this.selectOrgModal(filter);
    },
    //职位page点击
    onDepPageChange(currentPage) {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchDepValue, property: "name" }
      ]);
      this.depCurrentPage = currentPage;
      this.selectPositionModal(filter);
    }
  }
};
</script>

