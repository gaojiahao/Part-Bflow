<style lang="less" scoped>
.noticefromme{
    text-align: right;
}
.message-template{
    border: 1px solid #ddd;
    max-width: 40%;
    min-width: 28%;
    border-radius: 5px;
    display: inline-block;
    text-align: left;
    position: relative;
    .header{
        padding: 8px;
        overflow: hidden;
        &-code{
            font-size: 16px;
            font-weight: bold;
        }
        &-status{
            float: right;
            padding: 3px 5px 2px 5px;
            background-color: #ea971c; 
            border-radius: 20px;
            color: #fff;
            font-size: 12px;
            margin-left: 10px;
        }
        &-type{
            float: right;
            padding: 3px 5px 2px 5px;
            background-color: #39f; 
            border-radius: 20px;
            font-size: 12px;
            color: #fff;
            margin-left: 3px;
        }
        .header-code:hover{
            color: #39f;
            cursor: pointer;
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
        // padding: 8px;
        // margin: 10px;
        // border-top: 1px solid #ddd;
        // border-radius: 3px;
        // background-color:#ddd;
        // display: inline-block;
        // word-break: break-all;
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
        <div class="message-photo" :style="{float:isOwn?'right':'left'}">
            <img 
                @error="imgError" 
                :src="data.photo?data.photo:'resources/images/icon/defaultUserPhoto.png'">
            <p 
                :style="{margin:isOwn?'0px 0px 0px 10px':'0px 10px 0px 0px'}">
                {{ data.creatorName || '未知' }}
            </p>
        </div>
        <div class="message-template" :style="{float:isOwn?'right':'left'}">
            <div :class="{'message-pop':true,'message-right':isOwn}"></div>
            <div :class="{'message-pop-one':true,'message-right-one':isOwn}"></div>
            <div class="header" :style="{borderBottom:isBorderBottom?'1px solid #ddd':'none'}">
                <span 
                    class="header-code"
                    v-if="isTransCode" 
                    @click="handleViewDetail">
                    {{ displayTransCode }}
                </span>
                <span class="header-type">{{ instanceType }}</span>
                <span 
                    class="header-status" 
                    v-if="isStatus">
                    {{ data.tempContent.status || 
                    data.tempContent.newStatus || 
                    data.tempContent.processStatus }}
                </span>
            </div>
            <div class="content">
                <div v-if="isShowOpen">
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
                        {{ `${item.fieldName}：${item.value || '未知'}` }}
                    </p>
                </div>
            </div>
            <div class="footer-content">
                <comment-notice-tpl 
                    :data="data" 
                    v-if="data.type=='comment'" 
                    v-bind:class="{'notice-unread':!data.isRead}">
                </comment-notice-tpl>
                <flow-task-tpl 
                    :data="data" 
                    v-if="data.type=='flowTask'" 
                    :isBorderTopProp="isBorderTopProp"
                    v-bind:class="{'notice-unread':!data.isRead}">
                </flow-task-tpl>
                <pro-status-tpl 
                    :data="data" 
                    v-if="data.type=='processStatus'" >
                </pro-status-tpl>
            </div>
        </div>
    </div>
</template>

<script>
import InstanceCreateNotice from "@/views/social/message/notice-tpl/instance-create-notice";
import commentNoticeTpl from "@/views/social/message/notice-tpl/commentNoticeTpl";
import flowTaskTpl from "@/views/social/message/notice-tpl/flowTaskTpl";
import ProStatusTpl from "@/views/social/message/notice-tpl/pro-status-tpl";

export default {
    name:'MessageConfig',
    components:{
        InstanceCreateNotice,
        commentNoticeTpl,
        flowTaskTpl,
        ProStatusTpl
    },
    props:{
        data:{},
    },
    data() {
        return {
            isOpen: true,
            isBorderTopProp: true
        };
    },
    computed: {
        isOwn() {
            return this.data.tempContent.creator || this.data.creatorName === this.$currentUser.nickname;
        },
        isShowOpen() {
            return this.data.tempContent.primaryInfo && this.data.tempContent.primaryInfo.length > 0;
        },
        isBorderBottom() {
            return (this.data.tempContent.primaryInfo && this.data.tempContent.primaryInfo.length>0) || (this.data.type==='comment' || this.data.type==='flowTask');
        },
        isTransCode() {
            let content = 'tempContent';
            if(this.data.type === 'comment') content = 'sourceContent';
            return this.data[content].transCode || this.data[content].relationKey ? true : false;
        },
        displayTransCode() {
            let content = 'tempContent';
            if(this.data.type === 'comment') content = 'sourceContent';
            return this.data[content].transCode || this.data[content].relationKey;
        },
        isStatus() {
            return this.data.tempContent.status || this.data.tempContent.newStatus || this.data.tempContent.processStatus ? true : false;
        },
        instanceType() {
            let type = "";
            switch(this.data.type){
                case 'instanceCreate':
                    type = '新实例';
                    break;
                case 'instanceStatusChange':
                    type = '实例变更';
                    break;
                case 'comment':
                    type = '新评论';
                    break;
                case 'flowTask':
                    type = '工作流';
                    break;
                case 'processStatus':
                    type = '流程状态';
                    break;
            }

            return type;
        }
    },
    methods:{
        imgError() {
            this.data.photo = 'resources/images/icon/defaultUserPhoto.png';
        },
        openMessageConfig() {
            this.isOpen = !this.isOpen;
            !this.isOpen ? this.isBorderTopProp = false : this.isBorderTopProp = true;
        },
        handleViewDetail() {
            let href = `/Form/index.html?data=${this.data.tempContent.transCode}`;
            window.open(href);
        }
    },
    mounted() {
        
    }
}
</script>

