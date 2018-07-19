<style lang="less" scoped>
    @import './permission.less';
</style>

<template>
  <div class="app-permission">
    <!-- 动作管理 -->
    <action-manage></action-manage>
    <!-- 报表视图 -->
    <report-view :appType="appType"></report-view>
    <!-- 表单 -->
    <app-form></app-form>
    <!-- 工作流 -->
    <work-flow></work-flow>
  </div>
</template>

<script>
import ActionManage from './action/action';
import ReportView from './report/report';
import AppForm from './form/form';
import WorkFlow from './workflow/workflow';

export default {
  name: "permissionSource",
  components: {
    ActionManage,
    ReportView,
    AppForm,
    WorkFlow
  },
  props: {
    listId: String,
    appType: String
  },
  data() {
    return {
    };
  }
};
</script>

