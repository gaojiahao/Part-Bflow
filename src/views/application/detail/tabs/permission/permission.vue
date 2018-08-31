<style lang="less" >
    @import './permission.less';
</style>

<template>
  <div class="app-permission">
    <!-- 动作管理 -->
    <action-manage :enabledForbidden="enabledForbidden" :isAdmin="isAdmin"></action-manage>
    <!-- 报表视图 -->
    <report-view :appType="appType" :isAdmin="isAdmin"></report-view>
    <!-- 表单 -->
    <app-form v-if="!isAddress" :isAdmin="isAdmin"></app-form>
    <!-- 工作流 -->
    <work-flow v-if="!isAddress" :isAdmin="isAdmin"></work-flow>
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
    appType: String,
    enabledForbidden: Number,
    isAdmin: Boolean,
    isAddress: Boolean
  },
  data() {
    return {
    };
  }
};
</script>

