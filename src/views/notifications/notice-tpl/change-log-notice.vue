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
                <span style="font-size: 12px;">:您有新的变更日志</span>
                <span>创建人:</span>
                <strong>{{ JSON.parse(data.content).creator }}</strong>
                <a @click="handleViewDetail">去查看</a>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'changeLogNotice',
    props:{
        data:'',
    },
    methods:{
        handleViewDetail:function () {
            this.$router.push({
                path: `/application/detail/${this.data.listId}`,
                params: { listId: this.data.listId }
            });
        }
    }
}
</script>

