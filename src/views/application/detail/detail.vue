<style lang="less" scoped>
  @import './detail.less';
</style>

<template>
  <div class="app-details">

    

    <!-- 应用详情信息 -->
    <app-info :listId="this.$route.params.listId" @changeAppType="changeAppType"></app-info>
    <!-- 应用tabs -->
    <div class="rfd-tab">
      <Tabs value="name1"  type="card">
        <TabPane label="一般" name="name1">
          <log-instance></log-instance>
        </TabPane>
        <TabPane label="互动" name="name2">
          <!-- 管理员自评 -->
          <admintrstor-assessment :listId="this.$route.params.listId"></admintrstor-assessment>
        </TabPane>
        <TabPane label="资源" name="name3">
          <permission-source :appType="appType"></permission-source>
        </TabPane>
        <TabPane label="连接" name="name4">
          <!-- 应用科目 -->
          <div class="app-sub">
            <app-subject :listId="this.$route.params.listId"></app-subject>
          </div>
        </TabPane>
      </Tabs>
    </div>

  </div>
</template>

<script>
import LogInstance from "./tabs/base/log-instance";
import AppInfo from "./information/information";
import AppSubject from "./tabs/connection/subject";
import AdmintrstorAssessment from "./tabs/exchange/admintrstor-assessment";
import PermissionSource from "./tabs/permission/permission";
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
      appType: ''
    };
  },
  methods: {
    changeAppType(value) {
      this.appType = value;
    }
  }
};
</script>

