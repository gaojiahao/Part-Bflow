<style lang="less" scoped>
  .app-tabs{
    border-top: 1px solid #ddd;
  }
</style>

<template>
  <div class="app-tabs">
    <Tabs value="name1">
        <TabPane label="一般" name="name1">标签一的内容</TabPane>
        <TabPane label="互动" name="name2">
          <!-- 管理员自评 -->
          <admintrstor-assessment :listId="listId"></admintrstor-assessment>
        </TabPane>
        <TabPane label="资源" name="name3">
          <permission-source></permission-source>
        </TabPane>
        <TabPane label="链接" name="name4">
          <!-- 应用科目 -->
          <div class="app-sub">
            <app-subject :listId="listId"></app-subject>
          </div>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { getAppviews } from "@/services/appService.js";
import AppSubject from './tabs/subject';
import AdmintrstorAssessment from './tabs/admintrstorAssessment';
import PermissionSource from './tabs/permissionSource';

export default {
  name: "settingTabs",
  components: {
    AppSubject,
    AdmintrstorAssessment,
    PermissionSource
  },
  props: {
    listId: String,
    appType: String
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  created() {
    
  },
  mounted() {}
};
</script>

