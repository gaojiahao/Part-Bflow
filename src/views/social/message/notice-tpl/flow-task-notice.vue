<style lang="less" scoped>
@import "./notice-common.less";
.msg-comment{
    border:none;
    width:95%;
    margin: 8px;
}
</style>
<template>
    <div class="msg-comment" :style="{borderTop:isBorderTop}">
        <div class="msg-comment-title">
            <Icon type="ios-notifications-outline" :size=18 color="red"/>
            <span v-if="data.noticeSource=='taskCreate'"> 工作流-新任务通知</span>
            <span v-if="data.noticeSource=='taskTransfer'">工作流-转办任务通知</span>
            <span v-if="data.noticeSource.includes('taskComplete')">工作流-任务已办通知</span>
            <span v-if="data.noticeSource.includes('taskInformed')">知会通知</span>
            <span v-if="data.noticeSource=='taskRetract' || data.noticeSource=='taskStop'">工作流-任务取消通知</span>
            
        </div>
        <div class="msg-comment-content">
            <p>节点名称:{{data.tempContent.name}}</p>
            <p>任务编码:{{data.relationKey}}</p>



            <p v-if="data.noticeSource=='taskComplete' 
                || data.noticeSource=='taskRetract' 
                || data.noticeSource=='taskStop'">操作名称:{{data.tempContent.operation}}</p>
            
            <p v-if="data.noticeSource!='taskTransfer'">执行者:{{data.tempContent.executor}}</p>
            
            <p v-if="data.noticeSource=='taskTransfer'">转出者:{{data.tempContent.executor}}</p>
            <p v-if="data.noticeSource=='taskTransfer'">执行者:{{data.tempContent.transfer}}</p>

            <p>任务创建时间:{{data.tempContent.taskCrtTime}}</p>
            <p v-if="data.noticeSource.includes('taskComplete') || data.noticeSource.includes('taskRetract') || data.noticeSource.includes('taskStop')">
                任务截至时间:{{data.tempContent.cplTime}}
               
            </p>
            <p v-if="data.noticeSource.includes('taskComplete') || data.noticeSource.includes('taskRetract') || data.noticeSource.includes('taskStop')">
                任务历时: <span v-overTimeDirective="{startTime:data.tempContent.taskCrtTime, endTime:data.tempContent.cplTime}" /> 
            </p>

            <p>实例创建者:{{data.tempContent.starter}}</p>
            <p>实例创建时间:{{data.tempContent.startTime}}</p>
            
        </div>
    </div>
</template>

<script>
export default {
    name:'FlowTaskNotice',
    props:{
        data:{},
        isBorderTopProp: Boolean
    },
    computed: {
        isBorderTop: function() {
            return this.data.tempContent.primaryInfo && this.isBorderTopProp && this.data.tempContent.primaryInfo.length>0 ? '1px solid #ddd' : 'none';
        }
    },
    methods:{
    }
}
</script>
