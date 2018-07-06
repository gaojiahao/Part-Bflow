<style lang="less" scoped>
    .permission-tab{
      border: 1px solid #ddd;
      height: 350px;
      .permission-title{
        line-height: 100px;
        font-size: 12px;
      }
    }
    .permission-line{
      border-bottom: 1px dashed #ddd;
      margin:10px 0px;
    }
    .permission-top-line{
      margin:10px 0px;
    }
</style>

<template>
  <Modal
    v-model="showPermissionModal"
    title="应用权限"
    width="1000"
    :mask-closable="false"
    @on-ok="submitPermission"
    @on-visible-change="modalVisibleChange">
    <div>
      <Row :gutter="8" style="margin-bottom:15px;">
        <Col span="8">
          <label>用户</label>
          <Input @on-click="selectUserModal" v-model="selectUser" icon="arrow-down-b" style="width: 200px"></Input>
        </Col>
        <Col span="8">
          <label>组织</label>
          <Input @on-click="selectOrgModal" v-model="selectOrg" icon="arrow-down-b" style="width: 200px"></Input>
        </Col>
        <Col span="8">
          <label>职位</label>
          <Input @on-click="selectPositionModal" v-model="selectPosition" icon="arrow-down-b" style="width: 200px"></Input>
        </Col>
      </Row>
      <Row :gutter="8">
        <Col span="12" class="permission-tab">
          <Row class="permission-top-line"></Row>
          <Row>
            <Col span="3"><b class="permission-title">用户</b></Col>
            <Col span="21" style="height:100px">
                <Tag @on-close="deleteUser(index)" v-for="(userData, index) of userSelectData" :key="index" type="border" closable color="yellow">{{ userData.nickname }}</Tag>
            </Col>
          </Row>
          <Row class="permission-line"></Row>
          <Row>
            <Col span="3"><b class="permission-title">组织</b></Col>
            <Col span="21" style="height:100px">
                <Tag @on-close="deleteOrg(index)" v-for="(orgData, index) of orgSelectData" :key="index" type="border" closable color="green">{{ orgData.name }}</Tag>
            </Col>
          </Row>
          <Row class="permission-line"></Row>
          <Row>
            <Col span="3"><b class="permission-title">职位</b></Col>
            <Col span="21" style="height:100px">
                <Tag @on-close="deleteDepartment(index)" v-for="(departmentData, index) of departmentSelectData" :key="index" type="border" closable color="blue">{{ departmentData.name }}</Tag>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Table @on-select="permissionSelectData" stripe height="350" :columns="allPermissionColumns" :data="allPermissionData"></Table>
        </Col>
      </Row>
      <!-- 用户modal -->
      <Modal
        v-model="showUserModal"
        title="用户选择"
        :mask-closable="false"
        @on-ok="confirmUser"
        :transfer="false">
        <Table @on-select="selectUserClick" height="400" stripe size="small" :columns="userColumns" :data="userData"></Table>
      </Modal>
      <!-- 组织modal -->
      <Modal
        v-model="showOrgModal"
        title="组织选择"
        :mask-closable="false"
        @on-ok="confirmOrg"
        :transfer="false">
        <Table @on-select="selectOrgClick" height="400" stripe size="small" :columns="orgColumns" :data="orgData"></Table>
      </Modal>
      <!-- 职位modal -->
      <Modal
        v-model="showDepartmentModal"
        title="职位选择"
        :mask-closable="false"
        @on-ok="confirmDepartment"
        :transfer="false">
        <Table @on-select="selectDepartmentClick" height="400" stripe size="small" :columns="departmentColumns" :data="departmentData"></Table>
      </Modal>
    </div>
  </Modal>
</template>

<script>
import { getAllUserData, addPermission, getAllOrgData, getAllDepartmentData, getAllPermissionData } from '@/services//appService.js'
export default {
  name: "permissionModal",
  components: {},
  props: {
    appListId: String,
    modalPermissionStatus: Boolean
  },
  data() {
    return {
      selectUser: '',
      selectOrg: '',
      selectPosition: '',
      showUserModal: false,
      showOrgModal: false,
      showDepartmentModal: false,
      showPermissionModal: false,
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
      allPermissionColumns: [{
          type: 'selection',
          width: 60,
          align: 'center'
          },{
          title: '类型',
          key: 'type'
        },{
          title: '资源',
          key: 'name'
        }],
      userSelection: [],
      orgSelection: [],
      departmentSelection: []
    };
  },
  watch: {
    modalPermissionStatus: function(value, oldValue){
      this.showPermissionModal = value;
    }
  },
  methods: {
    confirmMember() {},
    //用户数据加载
    selectUserModal() {
      let userColumn = [{type: 'selection',width: 60,align: 'center'},{title:'姓名',key:'nickname'},{title:'工号',key:'userCode'}];
      this.showUserModal = true;
      this.userColumns = userColumn;
      getAllUserData().then(res => {
        this.userData = res.tableContent;
      })
    },
    //组织数据加载
    selectOrgModal() {
      let orgColumn = [{type: 'selection',width: 60,align: 'center'},{title:'名称',key:'name'}];
      this.showOrgModal = true;
      this.orgColumns = orgColumn;
      getAllOrgData().then(res => {
        this.orgData = res.tableContent;
      })
    },
    //职位数据加载
    selectPositionModal() {
      let departmentColumn = [{type: 'selection',width: 60,align: 'center'},{title:'名称',key:'name'}];
      this.showDepartmentModal = true;
      this.departmentColumns = departmentColumn;
      getAllDepartmentData().then(res => {
        this.departmentData = res.tableContent;
      })
    },
    //选择用户
    selectUserClick(selection, row) {
      if(this.userSelection.length > 0){
        selection.forEach((val,index) => {
          this.userSelection.push(val)
        })
      }else{
        this.userSelection = selection;
      }
    },
    //选择组织
    selectOrgClick(selection, row) {
      if(this.orgSelection.length > 0){
        selection.forEach((val,index) => {
          this.orgSelection.push(val)
        })
      }else{
        this.orgSelection = selection;
      }
    },
    //选择职位
    selectDepartmentClick(selection, row) {
      if(this.departmentSelection.length > 0){
        selection.forEach((val,index) => {
          this.departmentSelection.push(val)
        })
      }else{
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
      this.userSelectData = this.userSelection.reduce((cur,next) => {
        obj[next.userId] ? '' : obj[next.userId] = true && cur.push(next);
        return cur;
      },[]);
    },
    //添加组织权限
    confirmOrg() {
      let obj = {};
      this.orgSelectData = this.orgSelection.reduce((cur,next) => {
        obj[next.id] ? '' : obj[next.id] = true && cur.push(next);
        return cur;
      },[]);
    },
    //添加职位权限
    confirmDepartment() {
      let obj = {};
      this.departmentSelectData = this.departmentSelection.reduce((cur,next) => {
        obj[next.id] ? '' : obj[next.id] = true && cur.push(next);
        return cur;
      },[]);
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
            userId: userId.join(','),
            roleId: roleId.join(','),
            groupId: groupId.join(','),
            permissionId: permissionId.join(',')
          };
      if(params){
        addPermission(params).then(res => {
          if(res.success) {
            this.$Message.success(res.message);
          }
        })
      }
    },
    modalVisibleChange(state) {
      if(!state){
        this.$emit("emitPermissionModal", { modal: false});
      }
    }
  },
  mounted() {
    let params = {listId: this.appListId};
    //获取应用权限数据
    getAllPermissionData(params).then(res => {
      this.allPermissionData = res.tableContent;
    })
  }
};
</script>

