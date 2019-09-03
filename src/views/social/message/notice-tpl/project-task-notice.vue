<style lang="less" scoped>
@import "./notice-common.less";
.message-container-content{
    width: auto;
}
.message-pop{
    position: relative;
    .message-pop{
        width: 0; 
        height: 0; 
        border-width: 12px; 
        border-style: solid; 
        border-color: transparent #f0f0f0  transparent transparent; 
        font-size: 0; 
        line-height: 0;
        position: absolute;
        left: -24px;
        top: 10px;
    }
    .message-right{
        border-color: transparent  transparent transparent #B3E5FC;
        left: 100%;
    }
}
.message-photo{
    width: 5%;
    img{
        width: 70%;
        border-radius: 50%;
        border: 1px solid #ddd;
    }
    p{
        text-align: center;
    }
}
</style>
<template>
    <div class="message-container" 
        :class="{'noticefromme':isOwn}" 
        style="overflow:hidden">
        <div 
            :style="{'margin-left':!isOwn?'5%':'none','margin-right':isOwn?'5%':'none'}">
            {{data.tempContent.crtTime}}
        </div>
        
        <div>
            <div class="message-photo" :style="{float:isOwn?'right':'left'}">
                <img 
                    @error="imgError" 
                    :src="data.photo?data.photo:'resources/images/icon/defaultUserPhoto.png'">
                <p 
                    :style="{margin:isOwn?'0px 0px 0px 15px':'0px 11px 0px 0px'}">
                    {{ data.creatorName || '未知' }}
                </p>
            </div>
            <span class="message-container-content message-pop" :style="{float:isOwn?'right':'left'}">
                <div :class="{'message-pop':true,'message-right':isOwn}"></div>
                <span>您有新的项目任务</span>
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
    name:'ProjectTaskNotice',
    props:{
        data:'',
    },
    computed: {
        isOwn() {
            return  this.data.creatorName || this.data.tempContent.creator === this.$currentUser.nickname;
        }
    },
    methods:{
        imgError() {
            this.data.photo = 'resources/images/icon/defaultUserPhoto.png';
        },
        handleViewDetail:function () {
            let href = '/Form/index.html?data='+this.data.tempContent.transCode;
            window.open(href);
        }
    }
}
</script>

