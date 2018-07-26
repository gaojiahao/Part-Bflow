<style lang="less" scoped>
    @import './information.less';
</style>

<template>
  <div class="app-card">
    
    <header class="app-header">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/application/list">应用列表</BreadcrumbItem>
        <BreadcrumbItem>{{ appData.title }}</BreadcrumbItem>
      </Breadcrumb>
    </header>

    <Row class="font14">
        <Col span="2" class="pad15">
          <img :src="appData.icon" class="appIcon" />
        </Col>
        <Col span="21" class="pad15">
          <h3> {{ appData.title+" - 应用详情" }} </h3>
          <Row class="pad5">
            <Col span="6">应用名称: <span v-if="showEditAppInfo">{{ appData.title }}</span>
              <Input v-else v-model="appData.title" style="width: 200px"></Input>
              <b @click="editAppinfo">
                <Tooltip content="编辑" placement="top">
                  <Icon class="app-edit-icon" type="compose"></Icon>
                </Tooltip>
              </b>
            </Col>
            <Col span="6">应用类型: <span>{{ appData.appType }}</span></Col>
            <Col span="6">应用管理员: <span v-if="showEditAppInfo">
              <Icon type="person"></Icon>{{ appData.administrator }}</span>
              <Input v-else @on-click="selectAdminModal" v-model="appData.administrator" icon="arrow-down-b" style="width: 100px">
              </Input>
            </Col>
          </Row>
          <Row class="pad5">
            <Col span="6">创建者: <span>{{ appData.creator }}</span></Col>
            <Col span="6">创建时间: <span>{{ appData.crtTime }}</span></Col>
            <Col span="6">修改者:{{appData.modifer}}</Col>
            <Col span="6">修改时间: <span>{{ appData.crtTime }}</span></Col>
          </Row>
          <Row class="pad5">
            <Col span="24">说明:<span v-if="showEditAppInfo">{{ appData.comment }}</span>
            <Input v-else v-model="appData.comment" style="width: 432px"></Input></Col>
          </Row>
        </Col>
        <Col span="1">
          <Dropdown @on-click="changeAppStatus" class="app-dropdown">
                <a href="javascript:void(0)">
                    操作
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu v-if="isAdminTrue" slot="list">
                    <DropdownItem name="enabled">启用</DropdownItem>
                    <DropdownItem name="forbidden">停用</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Col>
    </Row>

   
    <Modal v-model="showAdminModal" title="请选择" @on-ok="confirmModal">
      <div class="app-search">
        <Icon class="app-search-icon" type="search"></Icon>
        <Input v-model="searchValue" placeholder="搜索" style="width: 300px"></Input>
      </div>
      <Table :highlight-row="true" @on-row-click="selectAdmin" height="400" stripe :columns="adminColumns" size="small" :data="adminData"></Table>
    </Modal>
  </div>
</template>

<script>
import {
  getAdminData,
  getListData,
  saveAppInformation,
  getAllPermissionData,
  enabledForbiddenApp
} from "@/services/appService.js";
export default {
  name: "appInfo",
  components: {},
  props: {
    listId: String,
    appData: Object,
    isAdmin: Boolean
  },
  data() {
    return {
      showEditAppInfo: true,
      isAdminTrue: false,
      selectModel: "",
      showAdminModal: false,
      selector: "",
      searchValue: "",
      hasPublishStatus: "已发布",
      notPublishStatus: "未发布",
      notAppStatusColor: "blue",
      hasAppStatusColor: "green",
      adminColumns: [
        {
          title: "工号",
          key: "userCode"
        },
        {
          title: "姓名",
          key: "nickname"
        }
      ],
      adminData: [],
      sameAdminData: [],
      selectAdminData: {}
    };
  },
  watch: {
    searchValue(text) {
      const result = [];
      if (text) {
        this.sameAdminData.forEach((val, index) => {
          if (
            val.nickname.indexOf(text) > -1 ||
            val.userCode.indexOf(text) > -1
          ) {
            result.push(val);
          }
        });
        this.adminData = result;
      } else {
        this.adminData = this.sameAdminData;
      }
    },
    isAdmin: function(value) {
      if(value){
        this.isAdminTrue = true;
      }else{
        this.isAdminTrue = false;
      }
    }
  },
  methods: {
    //修改应用状态
    childHasPublished(data) {
      this.appData.publish = 1;
    },
    //修改应用信息
    editAppinfo() {
      this.showEditAppInfo = !this.showEditAppInfo;
      if (this.showEditAppInfo) {
        let params = {
          uniqueId: this.appData.uniqueId,
          title: this.appData.title,
          administrator: this.appData.userId,
          comment: this.appData.comment
        };
        saveAppInformation(params).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.$emit('changeAdmin');
          }
        });
      }
    },
    //管理员选择modal展示
    selectAdminModal() {
      this.showAdminModal = true;
    },
    //管理员选择确认
    confirmModal() {
      this.appData.administrator = this.selectAdminData.nickname;
      this.appData.userId = this.selectAdminData.userId;
    },
    //存储选择的管理员
    selectAdmin(selection, row) {
      this.selectAdminData = selection;
    },
    //获取管理员数据
    getAdmintrstorData() {
      let groupId = 347;
      getAdminData(groupId).then(res => {
        this.adminData = res.tableContent;
        this.sameAdminData = res.tableContent;
      });
    },
    //启用禁用应用动作权限
    changeAppStatus(name) {
      let listId = this.listId,
          filter = JSON.stringify([
            {
              operator: "eq",
              value: "操作",
              property: "type"
            }
          ]),
          enabledPermissionIds = [],
          forbiddenPermissionIds = [];
      //获取应用权限数据
      getAllPermissionData(listId,filter).then(res => {
        res.tableContent.forEach(val => {
          enabledPermissionIds.push(val.id);
          if(val.name != '查看'){
            forbiddenPermissionIds.push(val.id);
          }
        })
        if(name === 'enabled'){
          enabledForbiddenApp(enabledPermissionIds.join(',')).then(res => {
            if(res.success){
              this.$Message.success(res.message);
              this.$emit('enabledForbiddenAppPermission');
            }
          });
        }else{
          enabledForbiddenApp(null,forbiddenPermissionIds.join(',')).then(res => {
            if(res.success){
              this.$Message.success(res.message);
              this.$emit('enabledForbiddenAppPermission');
            }
          });
        }
      });
    }
  },
  mounted() {
    let uniqueId = this.listId;
    this.getAdmintrstorData();
  }
};
</script>

