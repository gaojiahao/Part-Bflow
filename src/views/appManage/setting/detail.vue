<style lang="less" scoped>
    .app-details{
      overflow-x: hidden;
      padding: 0 10%;
    }
    .app-card{
      position: relative;
      height: 220px;
      padding: 10px 0px;
      width: 100%;
    }

    .app-header{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
      padding-left: 20px;
      color: #39f;
     
    }

    .app-main{
      height: 160px;
      position: relative;
     img{
       position: absolute;
        top: 50%;
        left: 15px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
       height: 75px;
       width: 75px;
     }
     .app-main-content{
       position: absolute;
       top: 50%;
       left: 10%;
       transform: translateY(-50%);
       .app-content-section{
         display: inline-block;
         width: 240px;
         label{
           display: inline-block;
           width: 60px;
         }
       }
       .app-content-comment{
         display: inline-block;
         width: 500px;
         label{
           display: inline-block;
           width: 60px;
         }
       }
       .app-section{
         padding: 5px 0px;
       }
       .app-edit-icon{
         margin-left:5px;
         cursor: pointer;
         font-size: 17px;
       }
       .app-edit-icon:hover{
         color: #39f;
       }
       h3{
        display: inline-block;
       }
     }
    }
    .ivu-select-single .ivu-select-selection{
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 0px;
    }
    .app-search{
      margin-bottom: 5px;
      .app-search-icon{
        font-size: 1rem;
        color: #39f;
      }
    }
    </style>

<template>
  <div class="app-details">
    <div class="shadow">
      <div style="width:100%; background-color: #fff;">
        <header class="app-header">
          <Breadcrumb>
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem to="/app/list">应用列表</BreadcrumbItem>
            <BreadcrumbItem>{{ appData.title }}</BreadcrumbItem>
          </Breadcrumb>
        </header>
        <div class="app-main">
          <img :src="appData.icon" />
          <div class="app-main-content">
               <h3 v-if="showEditAppInfo">{{ appData.title }}</h3>
               <Input v-else v-model="appData.title" style="width: 200px"></Input>
               <!-- 编辑应用信息 -->
               <b v-if="showEditClick" @click="editAppinfo">
                 <Tooltip content="编辑" placement="top">
                  <Icon class="app-edit-icon" type="compose"></Icon>
                 </Tooltip>
               </b>
               <!-- 保存应用信息 -->
               <b v-else @click="saveAppinfo">
                 <Tooltip content="退出编辑并保存" placement="top">
                  <Icon class="app-edit-icon" type="edit"></Icon>
                 </Tooltip>
               </b>
            <section class="app-section">
              <div class="app-content-section">
                <label>管理员：</label>
                <span v-if="showEditAppInfo">{{ appData.modifer }}</span>
                <Input v-else @on-click="selectAdminModal" v-model="appData.modifer" icon="arrow-down-b" style="width: 100px"></Input>
              </div>
              <div class="app-content-section">
                <label>状态：</label>
                <Tag :color="appStatusColor">{{ publishStatus }}</Tag>
              </div>
              <div class="app-content-section">
                <label>创建时间：</label>
                <span>{{ appData.modTime }}</span>
              </div>
            </section>
            <section class="app-section">
              <div class="app-content-section">
                <label>实例数：</label>
                <span>2000</span>
              </div>
              <div class="app-content-section">
                <label>类型：</label>
                <span>{{ appData.transType }}</span>
              </div>
              <div class="app-content-section">
                <label>创建者：</label>
                <span>{{ appData.modifer }}</span>
              </div>
            </section>
            <section class="app-section">
              <div class="app-content-comment">
                <label>说明：</label>
                <span v-if="showEditAppInfo">{{ appData.comment }}</span>
                <Input v-else v-model="appData.comment" style="width: 350px"></Input>
              </div>
            </section>
          </div>
        </div>
      </div>
    <!-- 应用设置信息 -->
    <app-setting @showPermissionApp="showPermissionApp" :listId="this.$route.params.listId" @childHasPublished="childHasPublished"></app-setting>
    <!-- 应用权限v-if="showPermission" -->
    <app-permission :listId="this.$route.params.listId"></app-permission>
    <!-- 应用视图信息 -->
    <app-view></app-view>
    <!-- 应用科目信息 -->
    <app-subject></app-subject>
    <!-- 用户选择器 -->
    <Modal
        v-model="showAdminModal"
        title="请选择"
        @on-ok="confirmModal">
        <div class="app-search">
          <Icon class="app-search-icon" type="search"></Icon>
          <Input v-model="searchValue" placeholder="搜索" style="width: 300px"></Input>
        </div>
        <Table @on-select="selectAdmin" height="400" stripe :columns="adminColumns" size="small" :data="adminData"></Table>
    </Modal>
    </div>
  </div>
</template>

<script>
import AppSetting from "./setting";
import AppView from "./view";
import AppSubject from "./subject";
import AppPermission from './permission/permission';
import { getAdminData, getListData } from '@/services/appService.js';
export default {
  name: "detail",
  components: {
    AppSetting,
    AppView,
    AppSubject,
    AppPermission
  },
  data() {
    return {
      appData: {},
      showEditAppInfo: true,
      showPermission: false,
      showEditClick: true,
      selectModel: '',
      showAdminModal: false,
      selector: '',
      searchValue: '',
      publishStatus: '未发布',
      appStatusColor: 'blue',
      adminColumns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      },{
        title: '工号',
        key: 'userCode'
      },{
        title: '姓名',
        key: 'nickname'
      }],
      adminData: [],
      sameAdminData: [],
      selectAdminData: []
    };
  },
  watch: {
    searchValue(text) {
      const result = [];
      if(text){
        this.sameAdminData.forEach((val, index) => {
          if(val.nickname.indexOf(text) > -1 || val.userCode.indexOf(text) > -1){
            result.push(val);
          }
        })
        this.adminData = result;
      }else{
        this.adminData = this.sameAdminData;
      }
    }
  },
  methods: {
    //修改应用状态
    childHasPublished(data) {
      this.publishStatus = data;
      this.appStatusColor = 'success';
    },
    //修改应用信息
    editAppinfo() {
      this.showEditAppInfo = !this.showEditAppInfo;
    },
    //保存应用信息
    saveAppinfo() {
      
    },
    //展示权限
    showPermissionApp() {
      this.showPermission = true;
    },
    //管理员选择modal展示
    selectAdminModal() {
      this.showAdminModal = true;
    },
    //管理员选择确认
    confirmModal() {
      this.appData.modifer = this.selectAdminData[0].nickname;
    },
    //存储选择的管理员
    selectAdmin(selection, row) {
      this.selectAdminData = selection;
    }
  },
  
  mounted() {
    let adminParams = {
        groupId: 347
      },
        listParams = {
          uniqueId: this.$route.params.listId
        };
    getAdminData(adminParams).then(res => {
      this.adminData = res.tableContent;
      this.sameAdminData = res.tableContent;
    })
    //请求应用详情信息
    getListData(listParams).then(res => {
      this.appData = res[0];
    })
  }
};
</script>

