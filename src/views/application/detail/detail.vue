<style lang="less" scoped>
.app-details {
  overflow: hidden;
  background-color: #fff;
  padding: 0 15px;
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
.app-tabs{
    border-top: 1px solid #ddd;
  }
</style>

<template>
  <div class="app-details">
    <!-- 应用详情信息 -->
    <app-info :listId="this.$route.params.listId"></app-info>
    <!-- 应用tabs -->
    <div class="app-tabs">
      <Tabs value="name1">
          <TabPane label="一般" name="name1">标签一的内容</TabPane>
          <TabPane label="互动" name="name2">
            <!-- 管理员自评 -->
            <admintrstor-assessment :listId="this.$route.params.listId"></admintrstor-assessment>
          </TabPane>
          <TabPane label="资源" name="name3">
            <permission-source></permission-source>
          </TabPane>
          <TabPane label="连接" name="name4">
            <!-- 应用科目 -->
            <div class="app-sub">
              <app-subject :listId="this.$route.params.listId"></app-subject>
            </div>
          </TabPane>
      </Tabs>
    </div>
    <!-- <line-chart title="数据分析" legendName="新增实例数" :xAxisData="xAxisData" :seriesData="seriesData">
      <div slot="header" class="line-chart-header">
        查看范围:
        <DatePicker type="month" placeholder="选择月份" style="width: 150px;margin-left:10px;" v-model="month" format="yyyy-MM" :clearable="false"></DatePicker>
        <div class="select-range">
          <span v-bind:class="{'customs-tag-active':active}" class="customs-tag" @click="selectDataRange('week')">周</span>
          <span v-bind:class="{'customs-tag-active':!active}" class="customs-tag" @click="selectDataRange('day')">天</span>
        </div>
      </div>
    </line-chart> -->

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
import { getDateFormat } from "@/utils/utils";
import AppInfo from './information/information';
import AppSubject from './tabs/connection/subject';
import AdmintrstorAssessment from './tabs/exchange/admintrstor-assessment';
import PermissionSource from './tabs/permission/permission';
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
    AppSubject,
    AdmintrstorAssessment,
    PermissionSource,
    AppInfo
  },
  data() {
    return {
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
    
  }
};
</script>

