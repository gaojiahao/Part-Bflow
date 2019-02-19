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
          <h3> 
            <span 
              @click="goList" 
              class="app-detail-title">{{ appData.title?appData.title:'待加载' }}
            </span>  - 应用详情
          </h3>
          <Row class="pad5">
            <Col span="6">应用名称： 
              <span v-if="showAppEditAdmin">{{ appData.title }}</span>
              <Input v-else v-model="appData.title" style="width: 120px"></Input>
              <b @click="editAppinfo" v-if="isCompanyAdmin">
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
              <Input 
                v-else 
                @on-click="selectAdminModal" 
                @on-change="clearAdmintrstor" 
                v-model="appData.administrator" 
                icon="md-arrow-dropdown" 
                style="width: 100px">
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
            <Col span="24">说明：
              <pre v-if="showAppEditAdmin">{{appData.comment}}</pre>
              <Input v-show="!showAppEditAdmin" v-model="appData.comment" type="textarea" />
            </Col>
          </Row>
        </Col>
        <Col span="1">
          <Dropdown @on-click="changeAppStatus" class="app-dropdown">
                <a href="javascript:void(0)">
                    操作
                    <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu v-if="isAdmin" slot="list">
                    <DropdownItem name="enabled">启用</DropdownItem>
                    <DropdownItem name="forbidden">停用</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Col>
    </Row>
    <!-- 应用管理员modal -->
    <Modal v-model="showAdminModal" title="请选择管理员" @on-ok="confirmModal" width="800">
      <div class="app-search">
        <Input 
          @on-search="adminFilter" 
          :search="true" 
          v-model="searchValue" 
          placeholder="搜索名称或工号" 
          style="width: 300px">
        </Input>
        <p @click="adminFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
        </p>
      </div>
      <Table 
        :highlight-row="true" 
        @on-row-dblclick="dbclickConfirmModal" 
        @on-row-click="selectAdmin" 
        :loading="adminLoading" 
        height="300" 
        stripe 
        :columns="adminColumns" 
        size="small" 
        :data="adminData">
      </Table>
      <div class="user-page">
          <div style="float: right;">
            <Page 
              :total="total" 
              :current="currentPage" 
              :page-size="pageSize" 
              @on-change="onPageChange" 
              size="small" 
              show-total>
            </Page>
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
import E from 'wangeditor';

export default {
  name: "appInfo",
  components: {},
  props: {
    listId: String,
    appData: Object,
    isAdmin: Boolean,//应用管理员
    isCompanyAdmin: Boolean//企业管理员
  },
  data() {
    return {
      showEditAppInfo: true,
      showAppEditAdmin: true,
      showEditBtn: true,
      adminLoading: true,
      showAdminModal: false,
      searchValue: "",
      total: 0,
      currentPage: 1,
      pageSize: 10,
      adminColumns: [
        {
          title: "头像",
          key: "photo",
          width: 80,
          render: (h,params) => {
            return h('div',[
              h('img',{
                 attrs: {
                  src: params.row.photo?params.row.photo:'/resources/images/icon/defaultUserPhoto.jpg'
                },
                style: {
                  borderRadius:'50%',
                  height:'32px',
                  width:'32px'
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
          comment: this.appData.comment.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\s/g, ' ')
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
      this.searchValue = '';
      this.getAdmintrstorData();
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
        if(!this.infoeditor){
          // this.createEditor();
        }
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
    },
    //create富文本编辑器
    createEditor() {
      this.infoeditor = new E(this.$refs.infoeditor)
      this.infoeditor.customConfig.onchange = (html) => {
        this.appData.comment = html;
      }
      this.infoeditor.customConfig.zIndex = 100;
      this.infoeditor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]
      this.infoeditor.create();
      this.infoeditor.txt.html(`<div></div>`);
    }
  },
  mounted() {
    let uniqueId = this.listId;
    this.getAdmintrstorData();
  }
};
</script>

