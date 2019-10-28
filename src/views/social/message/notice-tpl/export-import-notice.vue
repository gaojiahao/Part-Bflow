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
    width: 65px;
    text-align: center;
    img{
        width: 35px;
        height: 35px;
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
            {{data.crtTime}}
        </div>
        
        <div>
            <div class="message-photo" :style="{float:isOwn?'right':'left'}">
                <img 
                    @error="imgError" 
                    :src="data.photo?data.photo:'resources/images/icon/defaultUserPhoto.png'">
                <p>
                    {{ data.creatorName || '未知' }}
                </p>
            </div>
            <span class="message-container-content message-pop" :style="{float:isOwn?'right':'left'}">
                <div :class="{'message-pop':true,'message-right':isOwn}"></div>
                <span class="message-container-creator notice-creator">路塔</span>
                <span>:您有新的消息</span>
                <b v-html="data.tempContent.result"></b>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'ExportImportNotice',
    props:{
        data:'',
    },
    computed: {
        isOwn() {
            return  this.data.creatorName === this.$currentUser.nickname;
        }
    },
    methods:{
        imgError() {
            this.data.photo = 'resources/images/icon/defaultUserPhoto.png';
        }
    }
}
</script>

