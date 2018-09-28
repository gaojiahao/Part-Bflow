<template>
    <div class="msg-comment">
        <div class="msg-comment-title">
            <Icon type="ios-notifications-outline" :size=18 color="red"/>
            <span v-if="data.noticeSource=='taskCreate'"> 工作流-新任务通知</span>
            <span v-if="data.noticeSource=='taskTransfer'">工作流-转办任务通知</span>
            <span v-if="data.noticeSource=='taskComplete'">工作流-任务已办通知</span>
            <span v-if="data.noticeSource=='taskRetract' || data.noticeSource=='taskStop'">工作流-任务取消通知</span>
            
        </div>
        <div class="msg-comment-content">
            <p>实例编码:{{data.tempContent.transCode}}</p>
            <p>任务名称:{{data.tempContent.name}}</p>
            <p>任务状态:{{data.tempContent.status}}</p>
            <p>操作名称:{{data.tempContent.operation}}</p>
            <p>任务编码:{{data.relationKey}}</p>
            <p>执行者:{{data.tempContent.executor}}</p>
            <p>实例创建者:{{data.tempContent.starter}}</p>
            <p>任务创建时间:{{data.tempContent.crtTime}}</p>
            <p>实例创建时间:{{data.tempContent.startTime}}</p>
            
        </div>
        <div class="msg-comment-href">
            <a>详情 <Icon class="fr" type="ios-arrow-forward" /></a>
        </div>
    </div>
</template>

<script>
export default {
    name:'flowTaskNotice',
    props:{
        data:{},
    },
    mounted(){
        // this.data.content = JSON.parse(this.data.content);
    },
}
</script>
