<style lang="less" scoped>
    @import './information.less';
</style>

<template>
  <div class="app-card">
    
    <header class="app-header">
      <Breadcrumb>
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem>应用列表</BreadcrumbItem>
        <BreadcrumbItem>{{ appData.title }}</BreadcrumbItem>
      </Breadcrumb>
    </header>

    <Row class="font14">
        <Col span="2" class="pad15">
          <img :src="appData.icon" class="appIcon" />
        </Col>
        <Col span="21" class="pad15">
          <h3> <span @click="goList" class="app-detail-title">{{ appData.title?appData.title:'待加载' }}</span>  - 应用详情</h3>
          <Row class="pad5">
            <Col span="6">应用名称： 
              <span v-if="showEditAppInfo">{{ appData.title }}</span>
              <Input v-else v-model="appData.title" style="width: 120px"></Input>
              <b @click="editAppinfo" v-if="isAdminTrue || isCompanyAdmin">
                <Tooltip v-if="showEditBtn" content="编辑" placement="top">
                  <Icon class="app-edit-icon" type="ios-create-outline"></Icon>
                </Tooltip>
                <Tooltip v-else content="保存" placement="top">
                  <b class="app-save-icon">保存</b>
                </Tooltip>
              </b>
            </Col>
            <Col span="6">应用类型： <span>{{ appData.TRANS_NAME }}</span></Col>
            <Col span="6">应用管理员： 
              <span v-if="showAppEditAdmin">
                <Icon type="person"></Icon>{{ appData.administrator }}
              </span>
              <Input v-else @on-click="selectAdminModal" @on-change="clearAdmintrstor" v-model="appData.administrator" icon="md-arrow-dropdown" style="width: 100px">
              </Input>
            </Col>
          </Row>
          <Row class="pad5">
            <Col span="6">创建者： <span>{{ appData.creator }}</span></Col>
            <Col span="6">创建时间： <span>{{ appData.crtTime }}</span></Col>
            <Col span="6">修改者：{{appData.modifer}}</Col>
            <Col span="6">修改时间： <span>{{ appData.modTime }}</span></Col>
          </Row>
          <Row class="pad5">
            <Col span="24">说明：<span v-if="showEditAppInfo" v-html="appData.comment"></span>
              <vue-wangeditor
                v-else 
                ref="editorInfo" 
                id="editorInfo"
                :menus="menu"
                v-model="appData.comment"
                height="100" 
                width="100%">
              </vue-wangeditor>
            </Col>
          </Row>
        </Col>
        <Col span="1">
          <Dropdown @on-click="changeAppStatus" class="app-dropdown">
                <a href="javascript:void(0)">
                    操作
                    <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu v-if="isAdminTrue" slot="list">
                    <DropdownItem name="enabled">启用</DropdownItem>
                    <DropdownItem name="forbidden">停用</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Col>
    </Row>

   
    <Modal v-model="showAdminModal" title="请选择管理员" @on-ok="confirmModal" width="800">
      <div class="app-search">
        <Input @on-search="adminFilter" :search="true" v-model="searchValue" placeholder="搜索名称或工号" style="width: 300px"></Input>
        <p @click="adminFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
        </p>
      </div>
      <Table :highlight-row="true" @on-row-dblclick="dbclickConfirmModal" @on-row-click="selectAdmin" :loading="adminLoading" height="300" stripe :columns="adminColumns" size="small" :data="adminData"></Table>
      <div class="user-page">
          <div style="float: right;">
            <Page :total="total" :current="currentPage" :page-size="pageSize" @on-change="onPageChange" size="small" show-total></Page>
          </div>
      </div>
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
import vueWangeditor from 'vue-wangeditor';

export default {
  name: "appInfo",
  components: {
    vueWangeditor
  },
  props: {
    listId: String,
    appData: Object,
    isAdmin: Boolean,
    isCompanyAdmin: Boolean
  },
  data() {
    return {
      showEditAppInfo: true,
      showAppEditAdmin: true,
      isAdminTrue: false,
      showEditBtn: true,
      adminLoading: true,
      selectModel: "",
      showAdminModal: false,
      selector: "",
      searchValue: "",
      hasPublishStatus: "已发布",
      notPublishStatus: "未发布",
      notAppStatusColor: "blue",
      hasAppStatusColor: "green",
      total: 0,
      currentPage: 1,
      pageSize: 10,
      menu: [
        '|',
      ],
      adminColumns: [
        {
          title: "头像",
          key: "photo",
          width: 80,
          render: (h,params) => {
            return h('div',[
              h('Avatar',{
                props: {
                  src: params.row.photo
                }
              })
            ])
          }
        },
        {
          title: "工号",
          key: "userCode"
        },
        {
          title: "姓名",
          key: "nickname"
        },
        {
          title: "手机",
          key: "mobile"
        },
        {
          title: "邮箱",
          key: "email"
        }
      ],
      adminData: [],
      selectAdminData: {}
    };
  },
  watch: {
    isAdmin: function(value) {
      if(value){
        this.isAdminTrue = true;
      }else{
        this.isAdminTrue = false;
      }
    }
  },
  methods: {
    goList() {
      if(this.appData.uniqueId === '000001'){
        window.top.location.href = '/Site/index.html#page/users';
      }else if(this.appData.uniqueId === '000002'){
        window.top.location.href = '/Site/index.html#page/origanizations';
      }else if(this.appData.uniqueId === '000003'){
        window.top.location.href = '/Site/index.html#page/jobs';
      }else if(this.appData.uniqueId === '000004'){
        window.top.location.href = '/Site/index.html#page/companys';
      }else{
        window.top.location.href = '/Site/index.html#list/'+this.appData.uniqueId;
      }
    },
    //清除应用管理员
    clearAdmintrstor() {
      if(this.appData.administrator === ''){
        this.appData.userId = '';
      }
    },
    //修改应用状态
    childHasPublished(data) {
      this.appData.publish = 1;
    },
    //修改应用信息
    editAppinfo() {
      if(this.isAdmin){
        this.showEditAppInfo = !this.showEditAppInfo;
      }
      //只有企业管理员可编辑应用管理员
      if(this.isCompanyAdmin){
        this.showAppEditAdmin = false;
      }
      if (!this.showEditBtn) {
        let params = {
          uniqueId: this.appData.uniqueId,
          title: this.appData.title,
          administrator: this.appData.userId,
          comment: this.$refs.editorInfo?this.$refs.editorInfo.getHtml():''
        };
        saveAppInformation(params).then(res => {
          if (res.success) {
            this.$Message.success('更新成功!');
            this.showAppEditAdmin = true;
            this.$emit('reloadData');
            this.$emit('changeAdmin');
          }
        });
      }
      this.showEditBtn = !this.showEditBtn;
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
    //双击选择
    dbclickConfirmModal(selection) {
      this.appData.administrator = selection.nickname;
      this.appData.userId = selection.userId;
      this.showAdminModal = false;
    },
    //存储选择的管理员
    selectAdmin(selection, row) {
      this.selectAdminData = selection;
    },
    //获取管理员数据
    getAdmintrstorData(filter) {
      this.adminLoading = true;
      getAdminData(filter,this.currentPage,this.pageSize).then(res => {
        this.adminData = res.tableContent; 
        this.total = res.dataCount;
        this.adminLoading = false;
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
    },
    //点击页码触发
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      let filter = JSON.stringify([
        {operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}
      ]);
      this.getAdmintrstorData(filter);
    },
    //查询管理员
    adminFilter() {
      let filter = JSON.stringify([
        {operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}
      ]);
      this.getAdmintrstorData(filter);
    }
  },
  mounted() {
    let uniqueId = this.listId;
    this.getAdmintrstorData();
  }
};
</script>

