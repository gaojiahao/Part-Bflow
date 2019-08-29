<style lang="less" scoped>
@import "./notice-common.less";
.message-container-content{
    width: auto;
    max-width: 100%;
}
.message-container-content{
    margin: 5px;
}
</style>
<template>
    <div 
        class="message-container" 
        :style="{borderTop:processStatusOvertime?'1px solid #ddd':'none'}">
        <div>
            <span v-if="processStatusOvertime" class="message-container-content">
                <span>该实例有{{data.tempContent.delayHour}}小时未更新状态！</span>
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
    computed: {
        processStatusOvertime() {
            return  this.data.noticeSource === 'processStatusOvertime';
        }
    },
    methods:{}
}
</script>

