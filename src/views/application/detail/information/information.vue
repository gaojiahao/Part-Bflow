<style lang="less" scoped>
    @import './information.less';
</style>

<template>
  <div>
    <header class="app-header">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/application/list">应用列表</BreadcrumbItem>
        <BreadcrumbItem>{{ appData.title }}</BreadcrumbItem>
      </Breadcrumb>
    </header>
    <div class="app-main">
      <div class="app-img">
        <img :src="appData.icon" />
      </div>
      <div class="app-main-content">
        <h2>{{ appData.title+" - 应用详情" }}</h2>
        <div class="app-function">
          <Dropdown placement="bottom-start">
            <a href="javascript:void(0)">
              操作
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>启用</DropdownItem>
              <DropdownItem>停用</DropdownItem>
              <DropdownItem>归档</DropdownItem>
              <DropdownItem>删除</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <section class="app-section">
          <div class="app-content-section">
            <label>应用名称：</label>
            <span v-if="showEditAppInfo">{{ appData.title }}</span>
            <Input v-else v-model="appData.title" style="width: 200px"></Input>
            <!-- 编辑应用信息 -->
            <b @click="editAppinfo">
              <Tooltip content="编辑" placement="top">
                <Icon class="app-edit-icon" type="compose"></Icon>
              </Tooltip>
            </b>
          </div>
          <div class="app-content-section">
            <label>应用类型：</label>
            <span>{{ appData.type }}</span>
          </div>
          <div class="app-content-section">
            <label>应用管理员：</label>
            <span v-if="showEditAppInfo">
              <Icon type="person"></Icon>{{ appData.administrator }}</span>
            <Input v-else @on-click="selectAdminModal" v-model="appData.administrator" icon="arrow-down-b" style="width: 100px"></Input>
          </div>
        </section>
        <section class="app-section">
          <div class="app-content-section-create">
            <label>创建者：</label>
            <span>{{ appData.modifer }}</span>
          </div>
          <div class="app-content-section-create">
            <label>创建时间：</label>
            <span>{{ appData.crtTime }}</span>
          </div>
          <div class="app-content-section-create">
            <label>修改者：</label>
            <span>{{ appData.modifer }}</span>
          </div>
          <div class="app-content-section-create">
            <label>修改时间：</label>
            <span>{{ appData.crtTime }}</span>
          </div>
        </section>
        <section class="app-section">
          <div class="app-content-comment">
            <label>说明：</label>
            <span v-if="showEditAppInfo">{{ appData.comment }}</span>
            <Input v-else v-model="appData.comment" style="width: 432px"></Input>
          </div>
        </section>
      </div>
    </div>
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
  saveAppInformation
} from "@/services/appService.js";
export default {
  name: "appInfo",
  components: {},
  props: {
    listId: String
  },
  data() {
    return {
      appData: {},
      showEditAppInfo: true,
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
          }
        });
      }
    },
    //管理员选择modal展示
    selectAdminModal() {
      console.log(this.showAdminModal);
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
    }
  },

  created() {},

  mounted() {
    let uniqueId = this.listId;
    this.getAdmintrstorData();
    //请求应用详情信息
    getListData(uniqueId).then(res => {
      this.appData = res[0];
      this.$emit('changeAppType', this.appData.type);
    });
  }
};
</script>

