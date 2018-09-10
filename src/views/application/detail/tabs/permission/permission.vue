<style lang="less" >
    @import './permission.less';
</style>

<template>
  <div class="app-permission">
    <!-- 操作管理 -->
    <operation-manage :enabledForbidden="enabledForbidden" :isAdmin="isAdmin"></operation-manage>
    <!-- 动作管理 -->
    <action-manage :isAdmin="isAdmin"></action-manage>
    <!-- 报表视图 -->
    <report-view :appType="appType" :isAdmin="isAdmin"></report-view>
    <!-- 表单 -->
    <app-form v-if="!isAddress" :isAdmin="isAdmin"></app-form>
    <!-- 工作流 -->
    <work-flow v-if="!isAddress" :isAdmin="isAdmin"></work-flow>
  </div>
</template>

<script>
import OperationManage from './operation/operation';
import ReportView from './report/report';
import AppForm from './form/form';
import WorkFlow from './workflow/workflow';
import ActionManage from './action/action';

export default {
  name: "permissionSource",
  components: {
    OperationManage,
    ReportView,
    AppForm,
    WorkFlow,
    ActionManage
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

