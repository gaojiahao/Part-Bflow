<style lang="less" scoped>
@import "./notice-common.less";
</style>
<template>
    <div class="msg-comment">
        <div class="msg-comment-title">
            <Icon type="ios-notifications-outline" :size=18 color="red"/>
            <span>项目任务-工作日志</span>
        </div>
        <div class="msg-comment-content">
            <p>实例编码：<a @click="handleViewDetail">{{data.tempContent.transCode}}</a></p>
            <p>项目名称：{{data.tempContent.projectName}}</p>
            <p>项目经理：{{data.tempContent.projectManager}}</p>
            <p>任务名称：{{data.tempContent.taskName}}</p>
            <p>任务负责人：{{data.tempContent.taskExecutor}}</p>
            <p>日志标题：{{data.tempContent.jobLogTitle}}</p>
            <p>日志执行者：{{data.tempContent.logExecutor}}</p>
            <p>申报工时：{{data.tempContent.logDeclarationHours}}</p>
            <p>日志描述：{{data.tempContent.logComments}}</p>
            <p>创建时间:{{data.tempContent.crtTime}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'TaskLogNotice',
    props:{
        data:{},
    },
    methods:{
        handleViewDetail:function () {
            if(this.data.tempContent.transCode){
                window.open('/Form/index.html?data=' + this.data.tempContent.transCode);
            }
        }
    }
}
</script>