<style lang="less" scoped>
@import "./notice-common.less";
</style>
<template>
    <div class="message-container" 
        v-bind:class="{'noticefromme':data.creatorName===$currentUser.nickname}">
        <div>{{data.crtTime}}</div>
        
        <div>
            
            <span class="message-container-content">
                <span class="message-container-creator notice-creator" >{{data.creatorName}}:</span>
                <a @click="handleViewDetail">{{data.tempContent.transCode}}</a>实例
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

