<style lang="less">
  @import './action-modal.less';
</style>

<template>
  <Modal v-model="showPermissionModal" title="应用权限" width="1000" :styles="{top: '15px'}" :mask-closable="false" @on-ok="submitPermission" @on-visible-change="modalVisibleChange">
    <div>
      <Row :gutter="8" style="margin-bottom:10px;">
        <Col span="3">
        <Button @click="selectUserModal" type="info" shape="circle">选择用户</Button>
        </Col>
        <Col span="3">
        <Button @click="selectOrgModal" type="info" shape="circle">选择组织</Button>
        </Col>
        <Col span="3">
        <Button @click="selectPositionModal" type="info" shape="circle">选择职位</Button>
        </Col>
        <Col span="3">
        <Button @click="selectCompanyModal" type="info" shape="circle">选择公司</Button>
        </Col>
      </Row>
      <Row :gutter="8">
        <Col span="12" class="permission-tab" style="height:480px">
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
          <Row class="permission-line"></Row>
          <Row>
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
          <Table @on-selection-change="permissionSelectChange" ref="actionRef" stripe height="480" :columns="allPermissionColumns" size="small" :data="allPermissionData">
          </Table>
        </Col>
      </Row>
      <!-- 用户modal -->
      <Modal v-model="showUserModal" title="用户选择" :mask-closable="false" width="800" @on-ok="confirmUser" @on-cancel="cancelSelectUser" :transfer="false">
        <div class="app-search">
          <Input v-model="searchUserValue" @on-search="userFilter" :search="true" placeholder="名称或工号搜索" style="width: 300px"></Input>
          <p @click="userFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table ref="userTable" @on-select-cancel="selectUserCancel" @on-select-all="onUserSelectAll" @on-selection-change="selectUserClick" height="400" stripe size="small" :loading="userLoading" :columns="userColumns" :data="userData">
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
      <Modal v-model="showOrgModal" title="组织选择" :mask-closable="false" @on-ok="confirmOrg" @on-cancel="cancelSelectOrg" :transfer="false">
        <div class="app-search">
          <Input v-model="searchOrgValue" @on-search="orgFilter" :search="true" placeholder="搜索" style="width: 300px"></Input>
          <p @click="orgFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table ref="orgTable" @on-select-cancel="selectOrgCancel" @on-select-all="onOrgSelectAll" @on-selection-change="selectOrgClick" height="400" stripe size="small" :loading="orgLoading" :columns="orgColumns" :data="orgData">
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
      <Modal v-model="showDepartmentModal" title="职位选择" :mask-closable="false" @on-ok="confirmDepartment" @on-cancel="cancelSelectDep" :transfer="false">
        <div class="app-search">
          <Input v-model="searchDepValue" @on-search="depFilter" :search="true" placeholder="搜索" style="width: 300px"></Input>
          <p @click="depFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table ref="roleTable" @on-select-cancel="selectDepCancel" @on-select-all="onRoleSelectAll" @on-selection-change="selectDepartmentClick" height="400" stripe size="small" :loading="depLoading" :columns="departmentColumns" :data="departmentData">
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
      <!-- 公司modal -->
      <Modal v-model="showCompanyModal" title="公司选择" :mask-closable="false" @on-ok="confirmCompany" @on-cancel="cancelSelectCom" :transfer="false">
        <div class="app-search">
          <Input v-model="searchComValue" @on-search="comFilter" :search="true" placeholder="搜索" style="width: 300px"></Input>
          <p @click="comFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table ref="companyTable" @on-select-cancel="selectComCancel" @on-select-all="onCompanySelectAll" @on-selection-change="selectCompanyClick" height="400" stripe size="small" :loading="comLoading" :columns="companyColumns" :data="companyData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page :total="comTotal" :current="comCurrentPage" :page-size="pageSize" @on-change="onComPageChange" size="small" show-total></Page>
          </div>
        </div>
        <div class="page-selection-warp" v-show="companySelection[0] ">
          <Tag v-for="(item,index) in companySelection" :key="item.id" @on-close="deleteSelectCompany(item,index)" closable type="border" color="primary" size="small">
            {{item.groupName}}
          </Tag>
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
  clearAppPermission
} from "@/services//appService.js";
import { getAllCompanys } from "@/services/addressBookService.js";
import { APP_ACTION } from "@/assets/const";

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
      selectCompany: "",
      searchUserValue: "",
      searchOrgValue: "",
      searchDepValue: "",
      searchComValue: "",
      userTotal: 0,
      orgTotal: 0,
      depTotal: 0,
      comTotal: 0,
      userCurrentPage: 1,
      orgCurrentPage: 1,
      depCurrentPage: 1,
      comCurrentPage: 1,
      pageSize: 10,
      //监听数据变化刷新权限table
      emitChange: 0,

      userLoading: true,
      orgLoading: true,
      depLoading: true,
      comLoading: true,
      showUserModal: false,
      showOrgModal: false,
      showDepartmentModal: false,
      showCompanyModal: false,
      showPermissionModal: false,
      visibleLoading: true,

      userColumns: [],
      userData: [],
      orgColumns: [],
      orgData: [],
      departmentColumns: [],
      departmentData: [],
      companyColumns: [],
      companyData: [],
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
      userSelection: [],
      orgSelection: [],
      departmentSelection: [],
      companySelection: []
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
      this.userSelection = [];
      this.orgSelection = [];
      this.departmentSelection = [];
    }
  },
  methods: {
    //用户过滤
    userFilter() {
      let filter = JSON.stringify([
        {
          operator_1: "like",
          value_1: this.searchUserValue,
          property_1: "nickname",
          link: "or",
          operator_2: "like",
          value_2: this.searchUserValue,
          property_2: "userCode"
        }
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
    //公司过滤
    comFilter() {
      let currentPageFilter = 1;
      this.selectCompanyModal(this.searchComValue,currentPageFilter);
    },
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
    //公司数据加载
    selectCompanyModal(filter,currentPageFilter) {
      let companyColumn = [
        { type: "selection", width: 60, align: "center" },
        { title: "名称", key: "groupName" }
      ];
      this.showCompanyModal = true;
      this.companyColumns = companyColumn;
      this.comLoading = true;
      getAllCompanys(this.pageSize, currentPageFilter?currentPageFilter:this.depCurrentPage, filter).then(
        res => {
          this.companyData = res.tableContent;
          this.comTotal = res.dataCount;
          this.comLoading = false;

          if (this.companySelection.length > 0) {
            this.companyData.map(item => {
              this.companySelection.map(sel => {
                if (item.groupId == sel.groupId) {
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
    selectUserCancel(selection, row) {
      this.userSelection.forEach((val, index) => {
        if (val.userId === row.userId) {
          this.userSelection.splice(index, 1);
        }
      });
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
    //取消modal选择用户
    cancelSelectUser() {
      this.userSelection = this.userSelectData;
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
    selectOrgCancel(selection, row) {
      this.orgSelection.forEach((val, index) => {
        if (val.id === row.id) {
          this.orgSelection.splice(index, 1);
        }
      });
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
    //取消modal选择组织
    cancelSelectOrg() {
      this.orgSelection = this.orgSelectData;
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
    //选择公司
    selectCompanyClick(selection, row) {
      if (selection.length === 0) {
        let s = this.$refs.companyTable.data;
        let p = this.companySelection;
        s.map(item => {
          p = p.filter(f => {
            return f.groupId !== item.groupId;
          });
        });
        this.companySelection = p;
      } else {
        let obj = {};
        this.companySelection.push(...selection);
        //数组去重
        this.companySelection = this.companySelection.reduce((cur, next) => {
          obj[next.groupId] ? "" : (obj[next.groupId] = true && cur.push(next));
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
    //公司全选
    onCompanySelectAll(selection) {
      let obj = {};
      //触发全选事件
      //全选
      this.companySelection.push(...selection);
      //数组去重
      this.companySelection = this.companySelection.reduce((cur, next) => {
        obj[next.groupId] ? "" : (obj[next.groupId] = true && cur.push(next));
        return cur;
      }, []);
    },
    //取消选择的职位
    selectDepCancel(selection, row) {
      this.departmentSelection.forEach((val, index) => {
        if (val.id === row.id) {
          this.departmentSelection.splice(index, 1);
        }
      });
    },
    //取消选择的公司
    selectComCancel(selection, row) {
      this.companySelection.forEach((val, index) => {
        if (val.groupId === row.groupId) {
          this.companySelection.splice(index, 1);
        }
      });
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
    //删除选择的公司
    deleteSelectCompany(item,index) {
      this.companySelection.splice(index,1);
      this.$refs.companyTable.data.forEach((data,i) => {
        if(item.groupId === data.groupId){
          this.$refs.companyTable.toggleSelect(i);
        }
      })
    },
    //取消modal选择职位
    cancelSelectDep() {
      this.departmentSelection = this.departmentSelectData;
    },
    //取消modal选择公司
    cancelSelectCom() {
      this.companySelection = this.companySelectData;
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
    //添加公司权限
    confirmCompany() {
      let obj = {};
      this.companySelectData = this.companySelection.reduce(
        (cur, next) => {
          obj[next.groupId] ? "" : (obj[next.groupId] = true && cur.push(next));
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
              let Num = this.emitChange++;
              this.$emit("reGetData", Num);
            }
          });
        }
    },
    getData() {
      let listId = this.appListId;
      //获取应用权限数据
      getAllPermissionData(listId).then(res => {
        this.allPermissionData = res.tableContent;
        this.allPermissionData.map(ac => {
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
        {
          operator_1: "like",
          value_1: this.searchUserValue,
          property_1: "nickname",
          link: "or",
          operator_2: "like",
          value_2: this.searchUserValue,
          property_2: "userCode"
        }
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
    },
    //公司page点击
    onComPageChange(currentPage) {
      this.comCurrentPage = currentPage;
      this.selectPositionModal(this.searchComValue);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

