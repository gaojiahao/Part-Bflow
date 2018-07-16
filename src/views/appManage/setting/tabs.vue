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
        <TabPane label="链接" name="name4">标签三的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
import {
  getAppviews,
  saveDefaultView,
  deleteAppViews
} from "@/services/appService.js";

export default {
  name: "settingTabs",
  components: {},
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

