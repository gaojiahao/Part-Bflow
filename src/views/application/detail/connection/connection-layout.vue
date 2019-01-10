<style lang="less" scoped>
.connection-layout{
    background-color: #f0f0f0;
    margin-top: 15px;
}
</style>
<template>
    <div class="connection-layout">
        <!-- 应用科目 -->
        <app-subject v-if="!isAddress" :isAdmin="isAdmin" :appTransType="appTransType"></app-subject>
        <!-- 相关应用 -->
        <related-app v-if="!isAddress" :isAdmin="isAdmin"></related-app>
        <!-- 流程状态管理-->
        <process v-if="appType !== 'obj' && appType !=='subject' && !isAddress" :isAdmin="isAdmin"></process>
        <!-- API -->
        <app-api></app-api>
    </div>
</template>
<script>
import Process from "./process";
import AppApi from "./api";
import AppSubject from "./subject";
import RelatedApp from "./related-app";
export default {
    name:'ConnectionLayout',
    components:{
        AppSubject,
        RelatedApp,
        AppApi,
        Process
    },
    props: {
        listId: String,
        appType: String,
        appTransType: String,
        enabledForbidden: Number,
        isCompanyAdmin:Boolean,
        isAdmin: Boolean,
        isAddress: Boolean
  }
}
</script>
