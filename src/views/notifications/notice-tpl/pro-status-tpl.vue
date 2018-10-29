<style lang="less" scoped>
@import "./notice-common.less";
</style>
<template>
    <div class="message-container" 
        v-bind:class="{'noticefromme':data.creatorName===$currentUser.nickname}">
        <div>{{data.crtTime}}</div>
        
        <div>
            <span class="message-container-content">
                <span class="message-container-creator notice-creator" >{{data.creatorName}}</span>
                <span class="message-container-creator notice-creator"  v-if="data.noticeSource == 'processStatusOvertime'">路塔</span>
                :
                <a @click="handleViewDetail">{{data.tempContent.transCode}}</a>实例
                <span v-if="data.noticeSource == 'processStatusOvertime'">有{{data.tempContent.delayHour}}小时未更新状态,当前状态</span>
                <strong>{{data.tempContent.processStatus}}</strong>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'ProStatusTpl',
    props:{
        data:'',
    },
    methods:{
        handleViewDetail:function () {
            let href = '/Form/index.html?data='+this.data.tempContent.transCode;
            window.open(href);
        },
    }
}
</script>

