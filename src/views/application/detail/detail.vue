<style lang="less" scoped>
<<<<<<< HEAD
  @import './detail.less';
=======
.app-details {
  overflow: hidden;
  background-color: #fff;
  padding: 0 15px;
}

.app-tabs{
    border-top: 1px solid #ddd;

    .ivu-tabs-bar{
      margin-bottom: 0px !important;
    }
  }
>>>>>>> d40e586646bcf948a600375b6144cdaa363a2136
</style>

<template>
  <div class="app-details">
    <!-- 应用详情信息 -->
    <app-info :listId="this.$route.params.listId"></app-info>
    <!-- 应用tabs -->
    <div class="app-tabs">
      <Tabs value="name1">
          <TabPane label="一般" name="name1">
            <log-instance></log-instance>
          </TabPane>
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
  </div>
</template>

<script>
import LogInstance from './tabs/base/log-instance'
import AppInfo from './information/information';
import AppSubject from './tabs/connection/subject';
import AdmintrstorAssessment from './tabs/exchange/admintrstor-assessment';
import PermissionSource from './tabs/permission/permission';
export default {
  name: "detail",
  components: {
    AppSubject,
    AdmintrstorAssessment,
    PermissionSource,
    AppInfo,
    LogInstance
  },
  data() {
    return {
    };
  },
};
</script>

