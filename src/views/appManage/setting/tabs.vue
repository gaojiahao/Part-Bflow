<style lang="less" scoped>
  .app-tabs{
    border-top: 1px solid #ddd;
  }
</style>

<template>
  <div class="app-tabs">
    <Tabs value="name1">
        <TabPane label="一般" name="name1">标签一的内容</TabPane>
        <TabPane label="互动" name="name2">标签二的内容</TabPane>
        <TabPane label="资源" name="name3">标签三的内容</TabPane>
        <TabPane label="链接" name="name4">
          <!-- 应用科目 -->
          <app-subject></app-subject>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { getAppviews } from "@/services/appService.js";
import AppSubject from './subject';

export default {
  name: "settingTabs",
  components: {
    AppSubject
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

