<style lang="less" scoped>
@import "./notice-common.less";
</style>
<template>
    <div class="message-container" 
        :class="{'noticefromme':data.tempContent.creator===$currentUser.nickname}">
        <div>{{data.tempContent.crtTime}}</div>
        
        <div>
            <span class="message-container-content">
                <span class="message-container-creator notice-creator">路塔</span>
                <span>:{{ data.tempContent.appName }}的流程状态</span>
                <strong>{{ data.tempContent.processStatus }}</strong>
                <span>已经有<b>{{ data.tempContent.delayHour }}</b>小时没有更新了，交易号</span>
                <a @click="handleViewDetail">{{ data.tempContent.transCode }}</a>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'ProjectTask',
    props:{
        data:'',
    },
    methods:{
        handleViewDetail:function () {
            let href = '/Form/index.html?data='+this.data.tempContent.transCode;
            window.open(href);
        }
    }
}
</script>

