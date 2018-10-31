<template>
    <div>
        <!-- 数据增量分析 -->
        <log-instance :isAdmin="isAdmin" :isAddress="isAddress" :appType="appType">
        </log-instance>
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

