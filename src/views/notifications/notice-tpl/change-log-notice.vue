<style lang="less" scoped>
@import "./notice-common.less";
</style>
<template>
    <div class="message-container" 
        :class="{'noticefromme':data.tempContent.creator===$currentUser.nickname}">
        <div>{{data.tempContent.crtTime}}</div>
        
        <div>
            <span class="message-container-content">
                
                <span class="message-container-creator notice-creator">{{ data.tempContent.creator }}</span>
                <span>:应用有更新,点击</span>
                <a @click="handleViewDetail">了解</a>更多
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
            window.open('/Site/index.html#appSetting/' + this.data.listId);
        }
    }
}
</script>

