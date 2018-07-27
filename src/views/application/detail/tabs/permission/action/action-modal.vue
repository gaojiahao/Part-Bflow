<style lang="less">
  @import './action-modal.less';
</style>

<template>
  <Modal v-model="showPermissionModal" title="应用权限" width="1000" :mask-closable="false" @on-ok="submitPermission" @on-visible-change="modalVisibleChange">
    <div>
      <Row :gutter="8" style="margin-bottom:10px;">
        <Col span="4">
        <Button @click="selectUserModal" type="info" shape="circle">选择用户</Button>
        </Col>
        <Col span="4">
        <Button @click="selectOrgModal" type="info" shape="circle">选择组织</Button>
        </Col>
        <Col span="4">
        <Button @click="selectPositionModal" type="info" shape="circle">选择职位</Button>
        </Col>
      </Row>
      <Row :gutter="8">
        <Col span="12" class="permission-tab">
        <Row style="margin-top:10px">
          <Col span="3">
          <b class="permission-title">用户</b>
          </Col>
          <Col span="21" class="member-body">
          <Tag @on-close="deleteUser(userData,index)" v-for="(userData, index) of userSelectData" :key="index" type="border" closable color="yellow">
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
          <Tag @on-close="deleteOrg(orgData,index)" v-for="(orgData, index) of orgSelectData" :key="index" type="border" closable color="green">
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
          <Tag @on-close="deleteDepartment(departmentData,index)" v-for="(departmentData, index) of departmentSelectData" :key="index" type="border" closable color="blue">
            {{ departmentData.name }}
          </Tag>
          </Col>
        </Row>
        </Col>
        <Col span="12">
        <Table @on-selection-change="permissionSelectChange" ref="actionRef" stripe height="350" :columns="allPermissionColumns" :data="allPermissionData">
        </Table>
        </Col>
      </Row>
      <!-- 用户modal -->
      <Modal v-model="showUserModal" title="用户选择" :mask-closable="false" @on-ok="confirmUser" @on-cancel="cancelSelectUser" :transfer="false">
        <div class="app-search">
          <Input v-model="searchUserValue" placeholder="名称搜索" style="width: 300px"></Input>
          <p @click="userFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table @on-selection-change="selectUserClick" height="400" stripe size="small" :loading="userLoading" :columns="userColumns" :data="userData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page :total="userTotal" :current="userCurrentPage" :page-size="pageSize" @on-change="onUserPageChange" size="small" show-total></Page>
          </div>
        </div>
      </Modal>
      <!-- 组织modal -->
      <Modal v-model="showOrgModal" title="组织选择" :mask-closable="false" @on-ok="confirmOrg" @on-cancel="cancelSelectOrg" :transfer="false">
        <div class="app-search">
          <Input v-model="searchOrgValue" placeholder="搜索" style="width: 300px"></Input>
          <p @click="orgFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table @on-selection-change="selectOrgClick" height="400" stripe size="small" :loading="orgLoading" :columns="orgColumns" :data="orgData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page :total="orgTotal" :current="orgCurrentPage" :page-size="pageSize" @on-change="onOrgPageChange" size="small" show-total></Page>
          </div>
        </div>
      </Modal>
      <!-- 职位modal -->
      <Modal v-model="showDepartmentModal" title="职位选择" :mask-closable="false" @on-ok="confirmDepartment" @on-cancel="cancelSelectDep" :transfer="false">
        <div class="app-search">
          <Input v-model="searchDepValue" placeholder="搜索" style="width: 300px"></Input>
          <p @click="depFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table @on-selection-change="selectDepartmentClick" height="400" stripe :size="tableSize" :loading="depLoading" :columns="departmentColumns" :data="departmentData">
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
  getAllPermissionData,
  updateMemberPermission,
  clearAppPermission
} from "@/services//appService.js";
import {APP_ACTION} from "@/assets/const";

export default {
  name: "permissionModal",
  components: {},
  props: {
    modalStatis: Boolean,
    editActionData: Object,
    memberType: String,
    isEdit: String
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
          title: "动作名称",
          key: "name",
          width: 100,
        },
        {
          title: "说明",
          key: "desc"
        }
      ],
      userSelection: [],
      orgSelection: [],
      departmentSelection: []
    };
  },
  watch: {
    //监听modal状态变化
    modalStatis: function(value, oldValue) {
      this.showPermissionModal = value;
      //动作权限每次清空
      this.permissionSelectDatas = [];
      let memberShowData = [],
          relPermissionData = [];
      //获取回显动作权限数据
      if(this.editActionData.action){
        relPermissionData = JSON.parse(this.editActionData.action);
      }
      relPermissionData.forEach(val => {
        for(let k in val){
          this.permissionSelectDatas.push({
            name: val[k],
            id: Number(k)
          });
        }
      })
      
      //编辑状态回显用户、组织、职位
      if(this.isEdit === 'edit'){
        //编辑状态回显动作权限
          let listId = this.appListId, 
              filter = JSON.stringify([
              {
                operator: "eq",
                value: '操作',
                property: "type"
              }
            ]);
        getAllPermissionData(listId,filter).then(res => {
          this.allPermissionData = res.tableContent;
          this.allPermissionData.map(ac=>{
            ac.desc = APP_ACTION[ac.resourceName];
          });
          this.allPermissionData.map(aItem=>{
            this.permissionSelectDatas.map(item=>{
              if(item.id === aItem.id){
                aItem._checked = true;
              }
            });
          });
        });
        //编辑状态回显用户、组织、职位
          this.userSelectData = [];
          this.orgSelectData = [];
          this.departmentSelectData = [];
          this.userSelection = [];
          this.orgSelection = [];
          this.departmentSelection = [];

          if(Object.keys(this.editActionData).length > 0){
            let dispalyUserData = [],
                dispalyOrgData = [],
                dispalyDepData = [];
            if(this.editActionData.objNames){
              JSON.parse(this.editActionData.objNames).forEach(val => {
                if(val.type === 'user'){
                  dispalyUserData.push({
                    nickname: val.name,
                    userId: val.id
                  });
                }else if(val.type === 'group'){
                  dispalyOrgData.push({
                    name: val.name,
                    id: val.id
                  })
                }else{
                  dispalyDepData.push({
                    name: val.name,
                    id: val.id
                  })
                }
              })
            }
            this.userData = dispalyUserData;
            this.userSelectData = dispalyUserData;
            this.userSelection = dispalyUserData;
            this.orgData = dispalyOrgData;
            this.orgSelectData = dispalyOrgData;
            this.orgSelection = dispalyOrgData;
            this.departmentData = dispalyDepData;
            this.departmentSelectData = dispalyDepData;
            this.departmentSelection = dispalyDepData;
          }
      }else{
        //新增状态清空缓存数据
        this.getData();
        this.userSelectData = [];
        this.orgSelectData = [];
        this.departmentSelectData = [];
        this.userSelection = [];
        this.orgSelection = [];
        this.departmentSelection = [];
      }
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
      getAllUserData(this.userCurrentPage,this.pageSize,filter).then(res => {
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
      getAllOrgData(this.orgCurrentPage,this.pageSize,filter).then(res => {
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
      getAllDepartmentData(this.depCurrentPage,this.pageSize,filter).then(res => {
        this.departmentData = res.tableContent;
        this.depTotal = res.dataCount;
        this.depLoading = false;
      });
    },
    //选择用户
    selectUserClick(selection, row) {
      if (this.userSelection.length > 0) {
        let relSelect = [];
        relSelect = this.userSelection.concat(selection);
        let obj = {};
        this.userSelection = relSelect.reduce((cur, next) => {
          obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
          return cur;
        }, []);
      } else {
        this.userSelection = selection;
      }
    },
    //取消选择用户
    cancelSelectUser() {
      this.userSelection = this.userSelectData;
    },
    //选择组织
    selectOrgClick(selection, row) {
      if (this.orgSelection.length > 0) {
        let relSelect = [];
        relSelect = this.orgSelection.concat(selection);
        let obj = {};
        this.orgSelection = relSelect.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []);
      } else {
        this.orgSelection = selection;
      }
    },
    //取消选择组织
    cancelSelectOrg() {
      this.orgSelection = this.orgSelectData;
    },
    //选择职位
    selectDepartmentClick(selection, row) {
      if (this.departmentSelection.length > 0) {
        let relSelect = [];
        relSelect = this.departmentSelection.concat(selection);
        let obj = {};
        this.departmentSelection = relSelect.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []);
      } else {
        this.departmentSelection = selection;
      }
    },
    //取消选择职位
    cancelSelectDep() {
      this.departmentSelection = this.departmentSelectData;
    },
    //删除用户
    deleteUser(data,index) {
      clearAppPermission(this.appListId,data.userId).then(res => {
        if(res.success){
          this.userSelectData.splice(index, 1);
          this.userSelection.splice(index,1);
        }
        
      });
    },
    //删除组织
    deleteOrg(data,index) {
      clearAppPermission(this.appListId,null,null,data.id).then(res => {
        if(res.success){
          this.orgSelectData.splice(index, 1);
          this.orgSelection.splice(index,1);
        }
      });
    },
    //删除职位
    deleteDepartment(data,index) {
      clearAppPermission(this.appListId,null,data.id).then(res => {
        if(res.success){
          this.departmentSelectData.splice(index, 1);
          this.departmentSelection.splice(index,1);
        }
      });
    },
    //权限选择
    permissionSelectChange(selection,row) {
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
      if(this.isEdit === 'edit'){
          updateMemberPermission(userId.join(","),roleId.join(","),groupId.join(","),permissionId.join(","),this.appListId).then(res => {
            if(res.success){
              this.$Message.success(res.message);
              let Num = this.emitChange++;
              this.$emit("reGetData", Num);
            }
          })
      }else{
        if (params) {
          addPermission(params).then(res => {
            if (res.success) {
              this.$Message.success(res.message);
              let Num = this.emitChange++;
              this.$emit("reGetData", Num);
            }
          });
        }
      }
    },
    getData() {
      let listId = this.appListId, 
          filter = JSON.stringify([
          {
            operator: "eq",
            value: '操作',
            property: "type"
          }
        ]);
      //获取应用权限数据
      getAllPermissionData(listId,filter).then(res => {
        this.allPermissionData = res.tableContent;
        this.allPermissionData.map(ac=>{
          ac.desc = APP_ACTION[ac.resourceName];
        });
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

