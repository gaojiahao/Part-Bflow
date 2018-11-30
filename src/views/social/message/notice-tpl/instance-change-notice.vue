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
                <span>:您有经办实例</span>
                <a @click="handleViewDetail">{{data.tempContent.transCode}}</a>
                <span>状态从</span>
                <strong>{{ data.tempContent.oldStatus }}</strong>
                <span>变为</span>
                <strong>{{ data.tempContent.newStatus }}</strong>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'InstanceChangeNotice',
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

