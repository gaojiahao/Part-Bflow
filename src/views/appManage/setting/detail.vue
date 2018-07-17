<style lang="less" scoped>
.app-details {
  overflow: hidden;
  background-color: #fff;
  padding: 0 15px;
}
.app-card {
  position: relative;
  width: 100%;
}

.app-header {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  padding-left: 20px;
  color: #39f;
}

.app-main {
  height: 160px;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 15px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    height: 50%;
    width: 6%;
  }
  .app-main-content {
    width: 94%;
    position: absolute;
    top: 8%;
    left: 10%;
    // transform: translateY(-50%);
    .app-content-section {
      display: inline-block;
      width: 290px;
      label {
        display: inline-block;
        width: 60px;
      }
    }
    .app-function {
      float: right;
      padding-right: 100px;
    }
    .app-content-comment {
      display: inline-block;
      width: 500px;
      label {
        display: inline-block;
        width: 60px;
      }
    }
    .app-section {
      padding: 5px 0px;
    }
    .app-edit-icon {
      margin-left: 5px;
      cursor: pointer;
      font-size: 17px;
    }
    .app-edit-icon:hover {
      color: #39f;
    }
    b {
      font-size: 14px;
    }
  }
}
.ivu-select-single .ivu-select-selection {
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0px;
}
.app-search {
  margin-bottom: 5px;
  .app-search-icon {
    font-size: 1rem;
    color: #39f;
  }
}
.ivu-icon {
  padding-right: 3px;
}

.line-chart-header {
  position: absolute;
  top: 0px;
  right: 38px;
  z-index: 1;
}
.customs-tag {
  background-color: #d8d9db;
  padding: 2px 10px;
  color: #403b3b;
  font-size: 13px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  cursor: pointer;
}

.customs-tag-active {
  background-color: #19be6b;
  color: #fff;
}

.select-range {
  border: 1px solid #d8d9db;
  display: inline-block;
  background-color: #19be6b;
}
</style>

<template>
  <div class="app-details">
    <div>
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
    <!-- 应用设置信息 -->
    <setting-tabs :listId="this.$route.params.listId"></setting-tabs>
    <!-- <app-setting @showPermissionApp="showPermissionApp" :listId="this.$route.params.listId" @childHasPublished="childHasPublished" @getData="brotherGetData" @callTimeLineRefesh="callTimeLineRefesh"></app-setting> -->
    <!-- 应用权限v-if="showPermission" -->
    <!-- <app-permission :listId="this.$route.params.listId" :regetData="regetData"></app-permission> -->
    <!-- 应用视图信息 -->
    <!-- <app-view :listId="this.$route.params.listId" :appType="appData.type"></app-view> -->

    <!-- <time-line :data="timeLineData"></time-line> -->
    <!-- 用户选择器 -->

    <line-chart title="数据分析" legendName="新增实例数" :xAxisData="xAxisData" :seriesData="seriesData">
      <div slot="header" class="line-chart-header">
        查看范围:
        <DatePicker type="month" placeholder="选择月份" style="width: 150px;margin-left:10px;" v-model="month" format="yyyy-MM" :clearable="false"></DatePicker>
        <div class="select-range">
          <span v-bind:class="{'customs-tag-active':active}" class="customs-tag" @click="selectDataRange('week')">周</span>
          <span v-bind:class="{'customs-tag-active':!active}" class="customs-tag" @click="selectDataRange('day')">天</span>
        </div>
      </div>
    </line-chart>

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
import AppSetting from "./setting";
import AppView from "./view";
import AppPermission from "./permission/permission";
import TimeLine from "@/components/timeline/TimeLine";
import SettingTabs from "./tabs";
import LineChart from "@/components/Charts/LineChart";
import { getDateFormat } from "@/utils/utils";
import {
  getAdminData,
  getListData,
  saveAppInformation,
  getChangeLog,
  getInstanceData
} from "@/services/appService.js";
export default {
  name: "detail",
  components: {
    AppSetting,
    AppView,
    AppPermission,
    TimeLine,
    SettingTabs,
    LineChart
  },
  data() {
    return {
      appData: {},
      appBigType: "",
      regetData: 1000,
      showEditAppInfo: true,
      showPermission: false,
      showSubjectView: false,
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
      selectAdminData: {},
      timeLineData: [],

      month: new Date(),
      xAxisData: [],
      seriesData: [],
      active: true
    };
  },
  watch: {
    //监听实例数据日期变化
    month(val) {
      this.getInstanceData();
    },

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
    //获取去实例数据
    getInstanceData(t) {
      let that = this;
      let listId = that.$route.params.listId,
        date = that.month,
        type = t ? t : this.active ? "week" : "day";
      date = getDateFormat(date, "yyyy/MM/dd");
      getInstanceData("a4897429-f4f2-44a4-ade7-2fe8dc67c3cf", type, date).then(
        res => {
          if (res.list[0]) {
            let xAxis = [],
              series = [];
            res.list.map(function(item) {
              xAxis.push(item.xAxis);
              series.push(item.num);
            });
            that.seriesData = series;
            that.xAxisData = xAxis;
          }
        }
      );
    },

    selectDataRange(val) {
      if (val === "week") {
        this.active = true;
      } else {
        this.active = false;
      }
      this.getInstanceData(val);
    },

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
    //展示权限
    showPermissionApp() {
      this.showPermission = true;
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
    brotherGetData(data) {
      this.regetData = data;
    },
    //获取管理员数据
    getAdmintrstorData() {
      let groupId = 347;
      getAdminData(groupId).then(res => {
        this.adminData = res.tableContent;
        this.sameAdminData = res.tableContent;
      });
    },

    /**
     * 获取变更日志
     */
    getChangeLog() {
      let listId = this.$route.params.listId,
        params = {
          listId: listId
        };

      getChangeLog(params).then(res => {
        if (res.tableContent) {
          res.tableContent.map(item => {
            if (item["CHANGE_RANGE"]) {
              item["CHANGE_RANGE"] = item["CHANGE_RANGE"].split(",");
            }
          });
          this.timeLineData = res.tableContent;
        }
      });
    },

    callTimeLineRefesh() {
      this.getChangeLog();
    }
  },

  created() {
    this.getChangeLog();
    this.getInstanceData();
  },

  mounted() {
    let uniqueId = this.$route.params.listId;
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

