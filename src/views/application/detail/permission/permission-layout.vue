<style lang="less" scoped>
    @import './permission-layout.less';
</style>

<template>
  <div class="app-permission">
    <!-- 表单 -->
    <app-form v-if="!isAddress && appType !== 'subject'" :isAdmin="isAdmin"></app-form>
    <!-- 操作管理 -->
    <operation-manage :enabledForbidden="enabledForbidden" :isAdmin="isAdmin"></operation-manage>
    <!-- 动作管理 -->
    <action-manage :isAdmin="isAdmin"></action-manage>
    <!-- 数据源管理 -->
    <permission-data-source v-if="appType !== 'subject'" :isAdmin="isAdmin"></permission-data-source>
    <!-- 自定义数据源管理 -->
    <custom-datasource v-if="appType !== 'subject'" :isAdmin="isAdmin"></custom-datasource>
    <!-- 字段权限管理 -->
    <field-permission v-if="appType !== 'subject'" :isAdmin="isAdmin"></field-permission>
    <!-- （非会计类）子科目管理 -->
    <child-subject v-if="appType === 'subject'" :isAdmin="isAdmin"></child-subject>
    <!-- 报表视图 -->
    <report-view :appType="appType" :isAdmin="isAdmin"></report-view>
    <!-- 工作流 -->
    <work-flow v-if="!isAddress && appType !== 'subject'" :isAdmin="isAdmin"></work-flow>
  </div>
</template>

<script>
import OperationManage from './operation/operation';
import ReportView from './report/report';
import AppForm from './form/form';
import WorkFlow from './workflow/workflow';
import ActionManage from './action/action';
import PermissionDataSource from './datasource/data-source';
import CustomDatasource from './custom-datasource/custom-datasource';
import FieldPermission from './field/field';
import ChildSubject from './child-subject/child-subject';

export default {
  name: "permissionSource",
  components: {
    OperationManage,
    ReportView,
    AppForm,
    WorkFlow,
    ActionManage,
    PermissionDataSource,
    CustomDatasource,
    FieldPermission,
    ChildSubject
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
  },
  mounted(){
  }
};
</script>

