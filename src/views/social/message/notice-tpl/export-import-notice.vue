<style lang="less" scoped>
@import "./notice-common.less";
</style>
<template>
    <div class="message-container" 
        :class="{'noticefromme':data.creatorName===$currentUser.nickname}">
        <div>{{data.crtTime}}</div>
        
        <div>
            <span class="message-container-content">
                <span class="message-container-creator notice-creator">路塔</span>
                <span>:您有新的消息</span>
                <b v-html="data.tempContent.result"></b>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'ExportImportNotice',
    props:{
        data:'',
    },
    methods:{}
}
</script>

