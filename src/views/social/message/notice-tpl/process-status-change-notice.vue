<style lang="less" scoped>
@import "./notice-common.less";
</style>
<template>
    <div class="message-container">
        <div>{{data.crtTime}}</div>
        
        <div>
            <span class="message-container-content">
                该实例<span v-if="data.noticeSource == 'processStatusOvertime'">有{{data.tempContent.delayHour}}小时未更新状态！</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'ProcessStatusChangeNotice',
    props:{
        data:'',
    },
    methods:{}
}
</script>

