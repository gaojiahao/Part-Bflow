<style lang="less">
  @import './action-modal.less';
</style>

<template>
  <Modal v-model="showPermissionModal" title="应用权限" width="1000" :mask-closable="false" @on-ok="submitPermission" @on-visible-change="modalVisibleChange">
    <div>
      <Row :gutter="8" style="margin-bottom:10px;">
        <Col span="4">
        <Button @click="selectUserModal" type="info">用户权限选择</Button>
        </Col>
        <Col span="4">
        <Button @click="selectOrgModal" type="info">组织权限选择</Button>
        </Col>
        <Col span="4">
        <Button @click="selectPositionModal" type="info">职位权限选择</Button>
        </Col>
      </Row>
      <Row :gutter="8">
        <Col span="12" class="permission-tab">
        <Row style="margin-top:10px">
          <Col span="3">
          <b class="permission-title">用户</b>
          </Col>
          <Col span="21" class="member-body">
          <Tag @on-close="deleteUser(index)" v-for="(userData, index) of userSelectData" :key="index" type="border" closable color="yellow">
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
          <Tag @on-close="deleteOrg(index)" v-for="(orgData, index) of orgSelectData" :key="index" type="border" closable color="green">
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
          <Tag @on-close="deleteDepartment(index)" v-for="(departmentData, index) of departmentSelectData" :key="index" type="border" closable color="blue">
            {{ departmentData.name }}
          </Tag>
          </Col>
        </Row>
        </Col>
        <Col span="12">
        <Table @on-select="permissionSelectData" stripe height="350" :columns="allPermissionColumns" :data="allPermissionData">
        </Table>
        </Col>
      </Row>
      <!-- 用户modal -->
      <Modal v-model="showUserModal" title="用户选择" :mask-closable="false" @on-ok="confirmUser" :transfer="false">
        <div class="app-search">
          <Input v-model="searchUserValue" placeholder="名称搜索" style="width: 300px"></Input>
          <p @click="userFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table @on-select="selectUserClick" @on-select-all="selectUserClick" height="400" stripe size="small" :loading="userLoading" :columns="userColumns" :data="userData">
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
          <Input v-model="searchOrgValue" placeholder="搜索" style="width: 300px"></Input>
          <p @click="orgFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table @on-select="selectOrgClick" @on-select-all="selectOrgClick" height="400" stripe size="small" :loading="orgLoading" :columns="orgColumns" :data="orgData">
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
          <Input v-model="searchDepValue" placeholder="搜索" style="width: 300px"></Input>
          <p @click="depFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table @on-select="selectDepartmentClick" @on-select-all="selectDepartmentClick" height="400" stripe :size="tableSize" :loading="depLoading" :columns="departmentColumns" :data="departmentData">
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
  addPermission,
  getAllOrgData,
  getAllDepartmentData,
  getAllPermissionData
} from "@/services//appService.js";
export default {
  name: "permissionModal",
  components: {},
  props: {
    modalStatis: Boolean
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
      allPermissionData: [],
      permissionSelectDatas: [],
      allPermissionColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "资源",
          key: "name"
        }
      ],
      userSelection: [],
      orgSelection: [],
      departmentSelection: []
    };
  },
  watch: {
    modalStatis: function(value, oldValue) {
      this.showPermissionModal = value;
      this.getData();
      this.userSelectData = [];
      this.orgSelectData = [];
      this.departmentSelectData = [];
      this.userSelection = [];
      this.orgSelection = [];
      this.departmentSelection = [];
    }
  },
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
        ],
        userParams = {
          page: this.userCurrentPage,
          limit: this.pageSize,
          filter: filter
        };
      this.showUserModal = true;
      this.userColumns = userColumn;
      this.userLoading = true;
      getAllUserData(userParams).then(res => {
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
        ],
        orgParams = {
          page: this.orgCurrentPage,
          limit: this.pageSize,
          filter: filter
        };
      this.showOrgModal = true;
      this.orgColumns = orgColumn;
      this.orgLoading = true;
      getAllOrgData(orgParams).then(res => {
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
        ],
        depParams = {
          page: this.depCurrentPage,
          limit: this.pageSize,
          filter: filter
        };
      this.showDepartmentModal = true;
      this.departmentColumns = departmentColumn;
      this.depLoading = true;
      getAllDepartmentData(depParams).then(res => {
        this.departmentData = res.tableContent;
        this.depTotal = res.dataCount;
        this.depLoading = false;
      });
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
    //删除用户
    deleteUser(index) {
      this.userSelectData.splice(index, 1);
    },
    //删除组织
    deleteOrg(index) {
      this.orgSelectData.splice(index, 1);
    },
    //删除职位
    deleteDepartment(index) {
      this.departmentSelectData.splice(index, 1);
    },
    //权限选择
    permissionSelectData(selection, row) {
      this.permissionSelectDatas = selection;
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
      let userId = this.userSelectData.map(item => {
          return item.userId;
        }),
        groupId = this.orgSelectData.map(item => {
          return item.id;
        }),
        roleId = this.departmentSelectData.map(item => {
          return item.id;
        }),
        permissionId = this.permissionSelectDatas.map(item => {
          return item.id;
        }),
        params = {
          userId: userId.join(","),
          roleId: roleId.join(","),
          groupId: groupId.join(","),
          permissionId: permissionId.join(",")
        };
      if (params) {
        addPermission(params).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            let Num = this.emitChange++;
            this.$emit("reGetData", Num);
          }
        });
      }
    },
    getData() {
      let params = { listId: this.appListId };
      //获取应用权限数据
      getAllPermissionData(params).then(res => {
        this.allPermissionData = res.tableContent;
      });
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
  },
  mounted() {
    this.getData();
  }
};
</script>

