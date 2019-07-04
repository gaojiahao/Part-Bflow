<style lang="less" scoped>
    .analysis-layout{
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
    <div class="analysis-layout">
        <!-- 数据增量分析 -->
        <log-instance :isAdmin="isAdmin" :isAddress="isAddress" :appType="appType"></log-instance>
        <!-- 无权限显示 -->
        <div v-if="!isAdmin && appType === 'subject'" class="show-empty">暂无权限</div>
         <!--数据变更分析-->
        <list-change-history v-if="appType !== 'subject'"></list-change-history>
    </div>
</template>
<script>
import LogInstance from "@/views/application/detail/analysis/log-instance.vue";
import listChangeHistory from "@/views/application/detail/analysis/list-change-history.vue";
export default {
    name:'AnalysisLayout',
    components:{
        LogInstance,
        listChangeHistory
    },
    props: {
        listId: String,
        appType: String,
        enabledForbidden: Number,
        isCompanyAdmin:Boolean,
        isAdmin: Boolean,
        isAddress: Boolean
    }
}
</script>

