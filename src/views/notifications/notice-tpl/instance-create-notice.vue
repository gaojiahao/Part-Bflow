<style lang="less" scoped>
@import "./notice-common.less";
</style>
<template>
    <div class="message-container" 
        :class="{'noticefromme':JSON.parse(data.content).creator===$currentUser.nickname}">
        <div>{{JSON.parse(data.content).crtTime}}</div>
        
        <div>
            <span class="message-container-content">
                <span class="message-container-creator notice-creator">路塔</span>
                <span style="font-size: 12px;">:您有新的经办实例</span>
                <a @click="handleViewDetail">{{JSON.parse(data.content).transCode}}</a>实例
                <span>当前状态</span>
                <strong>{{ JSON.parse(data.content).status }}</strong>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'instanceCreateNotice',
    props:{
        data:'',
    },
    methods:{
        handleViewDetail:function () {
            let href = '/Form/index.html?data='+JSON.parse(this.data.content).transCode;
            window.open(href);
        }
    }
}
</script>

