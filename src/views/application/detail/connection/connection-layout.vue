<style lang="less" scoped>
    .connection-layout{
        background-color: #f0f0f0;
        margin-top: 15px;
    }
    .show-empty{
        width: 100%;
        height: 40px;
        background-color: #fff;
        padding: 10px 20px;
        text-align: center;
    }
</style>
<template>
    <div class="connection-layout">
        <!-- 应用科目 -->
        <app-subject v-if="!isAddress && appType === 'business' && isOperator" :appTransType="appTransType"></app-subject>
        <!-- 相关应用 -->
        <related-app v-if="!isAddress && appType !=='subject'" :isAdmin="isAdmin"></related-app>
        <!-- 流程状态管理-->
        <process v-if="appType !== 'obj' && appType !=='subject' && !isAddress" :isAdmin="isAdmin"></process>
        <!-- API -->
        <app-api v-if="appType !=='subject' && !isAddress"></app-api>
        <!-- 业务关系 -->
        <business-related v-if="appType ==='subject'"></business-related>
        <!-- 无权限显示 -->
        <div v-if="isAddress" class="show-empty">暂无数据</div>
    </div>
</template>
<script>
import Process from "./process";
import AppApi from "./api";
import AppSubject from "./subject";
import RelatedApp from "./related-app";
import BusinessRelated from './business-related';
export default {
    name:'ConnectionLayout',
    components:{
        AppSubject,
        RelatedApp,
        AppApi,
        Process,
        BusinessRelated
    },
    props: {
        listId: String,
        appType: String,
        appTransType: String,
        enabledForbidden: Number,
        isCompanyAdmin:Boolean,
        isAdmin: Boolean,
        isAddress: Boolean,
        isOperator: Boolean
  }
}
</script>
