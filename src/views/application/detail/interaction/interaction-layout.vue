<style lang="less" scoped>
.interaction-layout{
    margin-top: 15px;
    margin-bottom: 20px;
}
</style>

<template>
    <div class="interaction-layout">
        <!-- 管理员自评 -->
        <admintrstor-assessment :isAdmin="isAdmin"></admintrstor-assessment>
        <!-- 用户评论 -->
        <user-comments :listId="this.$route.params.listId" :type="'list'"></user-comments>
    </div>
</template>

<script>
import AdmintrstorAssessment from "./admintrstor-assessment";
import UserComments from "./user-comments";
export default {
    name:"InteractionLayout",
    components:{
        AdmintrstorAssessment,
        UserComments
    },
    props:{
        isAdmin:{
            type:Boolean,
            default:false
        }
    }
}
</script>

