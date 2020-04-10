<style lang="less" scoped>
.feature-layout{
    margin-top: 15px;
}
</style>
<template>
    <div class="feature-layout">
        <features-manage :isAdmin="isAdmin" :listId="listId"></features-manage>
        <relation-manage v-if="['f3e8aeac-0a34-4fec-94f3-c399e01f9e4e','c0375170-d537-4f23-8ed0-a79cf75f5b04'].indexOf(listId)>-1" :isAdmin="isAdmin" :listId="listId"></relation-manage>
        <message-manage v-if="!isAddress && appType !=='subject'" :isAdmin="isAdmin" :listId="listId" :appTitle="appTitle"></message-manage>
    </div>
</template>
<script>
import FeaturesManage from './features';
import MessageManage from './message-manage';
import RelationManage from './relation-manage';

export default {
    name:'FeaturesLayout',
    components:{
        FeaturesManage,
        MessageManage,
        RelationManage
    },
    props: {
        listId: String,
        appType: String,
        enabledForbidden: Number,
        isCompanyAdmin:Boolean,
        isAdmin: Boolean,
        isAddress: Boolean,
        appTitle: String
    }
}
</script>

