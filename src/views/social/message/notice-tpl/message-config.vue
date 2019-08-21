<style lang="less" scoped>
.noticefromme{
    text-align: right;
}
.message-template{
    border: 1px solid #ddd;
    max-width: 40%;
    border-radius: 5px;
    display: inline-block;
    text-align: left;
    position: relative;
    .header{
        padding: 10px 10px;
        border-bottom: 1px solid #ddd;
        &-code{
            font-size: 16px;
            font-weight: bold;
        }
        &-status{
            float: right;
            padding: 2px 5px;
            background-color: #ea971c; 
            border-radius: 20px;
            color: #fff;
        }
    }
    .content{
        &-list{
            padding: 2px 10px;
            color: #ea971c;
            font-weight: bold;
        }
        &-gray{
            padding: 2px 10px;
            color: #999;
        }
        &-open{
            float: right;
            margin-right: 5px;
            font-size: 16px;
            cursor: pointer;
        }
    }
    .footer-content{
        padding: 8px;
        margin: 10px;
        border-top: 1px solid #ddd;
        border-radius: 3px;
        background-color:#ddd;
        display: inline-block;
        word-break: break-all;
    }
    .message-pop{
        width: 0; 
        height: 0; 
        border-width: 12px; 
        border-style: solid; 
        border-color: transparent #ddd  transparent transparent; 
        font-size: 0; 
        line-height: 0;
        position: absolute;
        left: -24px;
        top: 10px;
    }
    .message-pop-one{
        width: 0; 
        height: 0; 
        border-width: 12px; 
        border-style: solid; 
        border-color: transparent #fff  transparent transparent; 
        font-size: 0; 
        line-height: 0;
        position: absolute;
        left: -22px;
        top: 10px;
    }
    .message-right{
        border-color: transparent  transparent transparent #ddd;
        left: 100%;
    }
    .message-right-one{
        border-color: transparent  transparent transparent #fff;
        left: 99.5%;
    }
}
</style>
<template>
    <div class="message-container" 
        :class="{'noticefromme':isOwn}">
        <div class="message-template">
            <div :class="{'message-pop':true,'message-right':isOwn}"></div>
            <div :class="{'message-pop-one':true,'message-right-one':isOwn}"></div>
            <div class="header">
                <span class="header-code">{{ data.tempContent.transCode }}</span>
                <span class="header-status">{{ data.tempContent.status }}</span>
            </div>
            <div class="content">
                <div v-if="data.tempContent.primaryInfo && data.tempContent.primaryInfo.length>0">
                    <div v-if="isOpen" @click="openMessageConfig" class="content-open">
                        <Icon type="ios-arrow-down" />
                    </div>
                    <div v-if="!isOpen" @click="openMessageConfig" class="content-open">
                        <Icon type="ios-arrow-up" />
                    </div>
                </div>
                <div v-if="isOpen">
                    <p 
                        v-for="(item,index) of data.tempContent.primaryInfo" 
                        :key="index" 
                        :class="{'content-list':item.emphases,'content-gray':!item.emphases}">
                        {{ `${item.fieldName}：${item.value}` }}
                    </p>
                </div>
            </div>
            <div class="footer-content">
                <instance-create-notice :data="data"></instance-create-notice>
            </div>
        </div>
    </div>
</template>

<script>
import InstanceCreateNotice from "@/views/social/message/notice-tpl/instance-create-notice";

export default {
    name:'MessageConfig',
    components:{
        InstanceCreateNotice
    },
    props:{
        data:'',
    },
    data() {
        return {
            isOpen: true
        };
    },
    computed: {
        isOwn() {
            return this.data.tempContent.creator === this.$currentUser.nickname;
        }
    },
    methods:{
        openMessageConfig() {
            this.isOpen = !this.isOpen;
        }
    }
}
</script>

