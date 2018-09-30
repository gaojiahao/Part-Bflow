<style lang="less" scoped>
@import "./notificationsHeader.less";
</style>

<template>
    <div class="notificas-layout-content-header">
        <div v-if="nav.listName">
            <a title="查看应用详情" @click="handleViewDetail"><b>{{nav.listName}}</b> </a>
            【{{nav.transName}}】管理员:{{nav.administratorName}}
                
            <!-- <Icon class="fr" @click="handleExpend" type="ios-more" size="40" style="font-size: 40px;cursor: pointer;"/> -->
        </div>
        <div v-if="!nav.listName" style="text-align: center;">
            暂无通知
        </div>
        <p class="nav-comment" v-html="nav.comment"></p>
    </div>
</template>

<script>
export default {
    name:'notificationsHeader',
    props:{
        nav:{
            type:Object,
            default:function() {
                return {};
            }
        },
        handleExpendHistory:{
            type:Function
        }
    },
    methods:{
        handleExpend:function () {
            this.expend = !this.expend;
            this.handleExpendHistory(this.expend);
        },
        handleViewDetail:function () {
            window.open('/Site/index.html#appSetting/' + this.nav.listId);
        }
    },
    data(){
        return {
            expend:false
        }
    },
}
</script>

