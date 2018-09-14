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
      <Modal v-model="showUserModal" width="800" title="用户选择" :mask-closable="false" @on-ok="confirmUser" :transfer="false">
        <div class="app-search">
          <Input v-model="searchUserValue" @on-search="userFilter" :search="true" placeholder="名称或工号搜索" style="width: 300px"></Input>
          <p @click="userFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table ref="userTable" @on-select-cancel="selectUserCancel" @on-selection-change="selectUserClick" @on-select-all="onUserSelectAll" height="310" stripe size="small" :loading="userLoading" :columns="userColumns" :data="userData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page :total="userTotal" :current="userCurrentPage" :page-size="pageSize" @on-change="onUserPageChange" size="small" show-total></Page>
          </div>
        </div>
        <div class="page-selection-warp" v-show="userSelection[0] ">
          <Tag v-for="(item,index) in userSelection" :key="item.userId" @on-close="deleteSelectUser(item,index)" :userId="item.userId" closable type="border" color="primary" size="small">
            {{item.nickname}}
          </Tag>
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
        <Table ref="orgTable" @on-select-cancel="selectOrgCancel" @on-selection-change="selectOrgClick" @on-select-all="onOrgSelectAll" height="310" stripe size="small" :loading="orgLoading" :columns="orgColumns" :data="orgData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page :total="orgTotal" :current="orgCurrentPage" :page-size="pageSize" @on-change="onOrgPageChange" size="small" show-total></Page>
          </div>
        </div>
        <div class="page-selection-warp" v-show="orgSelection[0] ">
          <Tag v-for="(item,index) in orgSelection" :key="item.id" @on-close="deleteSelectOrg(item,index)" closable type="border" color="primary" size="small">
            {{item.name}}
          </Tag>
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
        <Table ref="roleTable" @on-select-cancel="selectDepCancel" @on-selection-change="selectDepartmentClick" @on-select-all="onRoleSelectAll" height="310" stripe size="small" :loading="depLoading" :columns="departmentColumns" :data="departmentData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page :total="depTotal" :current="depCurrentPage" :page-size="pageSize" @on-change="onDepPageChange" size="small" show-total></Page>
          </div>
        </div>
        <div class="page-selection-warp" v-show="departmentSelection[0] ">
          <Tag v-for="(item,index) in departmentSelection" :key="item.id" @on-close="deleteSelectRole(item,index)" closable type="border" color="primary" size="small">
            {{item.name}}
          </Tag>
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

      userColumns: [],
      userData: [],
      orgColumns: [],
      orgData: [],
      departmentColumns: [],
      departmentData: [],

      userSelectData: [],
      orgSelectData: [],
      departmentSelectData: [],
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
        {operator_1:"like",value_1:this.searchUserValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchUserValue,property_2:"userCode"}
      ]),
      currentPageFilter = 1;
      this.selectUserModal(filter,currentPageFilter);
    },
    //组织过滤
    orgFilter() {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchOrgValue, property: "name" }
      ]),
      currentPageFilter = 1;
      this.selectOrgModal(filter,currentPageFilter);
    },
    //职位过滤
    depFilter() {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchDepValue, property: "name" }
      ]),
      currentPageFilter = 1;
      this.selectPositionModal(filter,currentPageFilter);
    },
    confirmMember() {},
    //用户数据加载
    selectUserModal(filter,currentPageFilter) {
      let userColumn = [
        { type: "selection", width: 60, align: "center" },
        {
          title: "头像",
          key: "photo",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h("Avatar", {
                props: {
                  src: params.row.photo
                }
              })
            ]);
          }
        },
        { title: "姓名", key: "nickname" },
        { title: "工号", key: "userCode" },
        { title: "手机",key: "mobile" },
        { title: "邮箱",key: "email" }
      ];
      this.showUserModal = true;
      this.userColumns = userColumn;
      this.userLoading = true;
      getAllUserData(currentPageFilter?currentPageFilter:this.userCurrentPage, this.pageSize, filter).then(res => {
        this.userData = res.tableContent;
        this.userTotal = res.dataCount;
        this.userLoading = false;

        if (this.userSelection.length > 0) {
            this.userData.map(item => {
              this.userSelection.map(sel => {
                if (item.userId == sel.userId) {
                  item._checked = true;
                }
              });
            });
          }
      });
    },
    //组织数据加载
    selectOrgModal(filter,currentPageFilter) {
      let orgColumn = [
        { type: "selection", width: 60, align: "center" },
        { title: "名称", key: "name" }
      ];
      this.showOrgModal = true;
      this.orgColumns = orgColumn;
      this.orgLoading = true;
      getAllOrgData(currentPageFilter?currentPageFilter:this.orgCurrentPage, this.pageSize, filter).then(res => {
        this.orgData = res.tableContent;
        this.orgTotal = res.dataCount;
        this.orgLoading = false;

        if (this.orgSelection.length > 0) {
            this.orgData.map(item => {
              this.orgSelection.map(sel => {
                if (item.id == sel.id) {
                  item._checked = true;
                }
              });
            });
          }
      });
    },
    //职位数据加载
    selectPositionModal(filter,currentPageFilter) {
      let departmentColumn = [
          { type: "selection", width: 60, align: "center" },
          { title: "名称", key: "name" }
        ];
      this.showDepartmentModal = true;
      this.departmentColumns = departmentColumn;
      this.depLoading = true;
      getAllDepartmentData(currentPageFilter?currentPageFilter:this.depCurrentPage, this.pageSize, filter).then(
        res => {
          this.departmentData = res.tableContent;
          this.depTotal = res.dataCount;
          this.depLoading = false;

          if (this.departmentSelection.length > 0) {
            this.departmentData.map(item => {
              this.departmentSelection.map(sel => {
                if (item.id == sel.id) {
                  item._checked = true;
                }
              });
            });
          }
        }
      );
    },
    //选择用户
    selectUserClick(selection, row) {
      if (selection.length === 0) {
        let s = this.$refs.userTable.data;
        let p = this.userSelection;
        s.map(item => {
          p = p.filter(f => {
            return f.userId !== item.userId;
          });
        });
        this.userSelection = p;
      } else {
        let obj = {};
        this.userSelection.push(...selection);
        //数组去重
        this.userSelection = this.userSelection.reduce((cur, next) => {
          obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
          return cur;
        }, []);
      }
    },
    //删除选择的用户
    deleteSelectUser(item,index) {
      this.userSelection.splice(index,1);
      this.$refs.userTable.data.forEach((data,i) => {
        if(item.userId === data.userId){
          this.$refs.userTable.toggleSelect(i);
        }
      })
    },
    //用户全选
    onUserSelectAll(selection) {
      let obj = {};
      //触发全选事件
      //全选
      this.userSelection.push(...selection);
      //数组去重
      this.userSelection = this.userSelection.reduce((cur, next) => {
        obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
        return cur;
      }, []);
    },
     //取消选择的用户
    selectUserCancel(selection,row){
      this.userSelection.forEach((val,index) => {
        if(val.userId === row.userId){
          this.userSelection.splice(index,1);
        }
      })
    },
    //删除选择的组织
    deleteSelectOrg(item,index) {
      this.orgSelection.splice(index,1);
      this.$refs.orgTable.data.forEach((data,i) => {
        if(item.id === data.id){
          this.$refs.orgTable.toggleSelect(i);
        }
      })
    },
    //选择组织
    selectOrgClick(selection, row) {
      if (selection.length === 0) {
        let s = this.$refs.orgTable.data;
        let p = this.orgSelection;
        s.map(item => {
          p = p.filter(f => {
            return f.id !== item.id;
          });
        });
        this.orgSelection = p;
      } else {
        let obj = {};
        this.orgSelection.push(...selection);
        //数组去重
        this.orgSelection = this.orgSelection.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []);
      }
    },
    //组织全选
    onOrgSelectAll(selection) {
      let obj = {};
      //触发全选事件
      //全选
      this.orgSelection.push(...selection);
      //数组去重
      this.orgSelection = this.orgSelection.reduce((cur, next) => {
        obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
        return cur;
      }, []);
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
      if (selection.length === 0) {
        let s = this.$refs.roleTable.data;
        let p = this.departmentSelection;
        s.map(item => {
          p = p.filter(f => {
            return f.id !== item.id;
          });
        });
        this.departmentSelection = p;
      } else {
        let obj = {};
        this.departmentSelection.push(...selection);
        //数组去重
        this.departmentSelection = this.departmentSelection.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []);
      }
    },
    //职位全选
    onRoleSelectAll(selection) {
      let obj = {};
      //触发全选事件
      //全选
      this.departmentSelection.push(...selection);
      //数组去重
      this.departmentSelection = this.departmentSelection.reduce((cur, next) => {
        obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
        return cur;
      }, []);
    },
    //删除选择的职位
    deleteSelectRole(item,index) {
      this.departmentSelection.splice(index,1);
      this.$refs.roleTable.data.forEach((data,i) => {
        if(item.id === data.id){
          this.$refs.roleTable.toggleSelect(i);
        }
      })
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
      
      if(userId || groupId || roleId){
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
      }
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
        {operator_1:"like",value_1:this.searchUserValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchUserValue,property_2:"userCode"}
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

