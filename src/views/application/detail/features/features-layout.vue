<style lang="less" scoped>
.feature-layout{
    margin-top: 15px;
}
</style>
<template>
    <div class="feature-layout">
        <features-manage :isAdmin="isAdmin" :listId="listId"></features-manage>
        <message-manage :isAdmin="isAdmin" :listId="listId"></message-manage>
    </div>
</template>
<script>
import FeaturesManage from './features';
import MessageManage from './message-manage';

export default {
    name:'FeaturesLayout',
    components:{
        FeaturesManage,
        MessageManage
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

