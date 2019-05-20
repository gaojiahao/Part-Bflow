<style lang="less" scoped>
.feature-layout{
    margin-top: 15px;
}
</style>
<template>
    <div class="feature-layout">
        <features-manage :isAdmin="isAdmin" :listId="listId"></features-manage>
    </div>
</template>
<script>
import FeaturesManage from './features';
export default {
    name:'FeaturesLayout',
    components:{
        FeaturesManage
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

