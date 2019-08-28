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
                <span>:您的项目任务已取消</span>
                <a @click="handleViewDetail">{{data.tempContent.transCode}}</a>
                <span>项目名称</span>
                【<strong>{{ data.tempContent.projectName }}</strong>】
                <span>项目经理</span>
                【<strong>{{ data.tempContent.projectManagerName }}</strong>】
                <span>任务名称</span>
                【<strong>{{ data.tempContent.taskName }}</strong>】
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'CancelProjectTaskNotice',
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

