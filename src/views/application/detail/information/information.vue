<style lang="less" scoped>
    @import './information.less';
</style>

<template>
    <div>
        <header class="app-header">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/applition/list">应用列表</BreadcrumbItem>
                <BreadcrumbItem>{{ appData.title }}</BreadcrumbItem>
            </Breadcrumb>
        </header>
        <div class="app-main">
            <div class="app-img">
                <img :src="appData.icon" />
            </div>
            <div class="app-main-content">
                <b>{{ appBigType }} ></b>
                <b>{{ appData.transType }} ></b>
                <b v-if="showEditAppInfo">{{ appData.title }}</b>
                <Input v-else v-model="appData.title" style="width: 200px"></Input>
                <!-- 编辑应用信息 -->
                <b @click="editAppinfo">
                    <Tooltip content="编辑" placement="top">
                        <Icon class="app-edit-icon" type="compose"></Icon>
                    </Tooltip>
                </b>
                <div class="app-function">
                    <Dropdown>
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
                        <label>管理员：</label>
                        <span v-if="showEditAppInfo">
                            <Icon type="person"></Icon>{{ appData.administrator }}</span>
                        <Input v-else @on-click="selectAdminModal" v-model="appData.administrator" icon="arrow-down-b" style="width: 100px"></Input>
                    </div>
                    <div class="app-content-section">
                        <!-- <label>状态：</label> -->
                        <Tag :color="appData.publish === 0?notAppStatusColor:hasAppStatusColor">{{ appData.publish === 0?notPublishStatus:hasPublishStatus }}</Tag>
                    </div>
                </section>
                <section class="app-section">
                    <div class="app-content-section">
                        <label>创建者：</label>
                        <span>{{ appData.modifer }}</span>
                    </div>
                    <div class="app-content-section">
                        <label>创建时间：</label>
                        <span>{{ appData.crtTime }}</span>
                    </div>
                    <div class="app-content-section">
                        <label>修改时间：</label>
                        <span>{{ appData.crtTime }}</span>
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
      appBigType: "",
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
          list: "list",
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
      if (this.appData.type === "business") {
        this.showSubjectView = true;
        this.appBigType = "业务应用";
      } else if (this.appData.type === "obj") {
        this.appBigType = "基础对象";
      } else {
        this.appBigType = "科目应用";
      }
    });
  }
};
</script>

