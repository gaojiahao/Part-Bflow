<style lang="less" scoped>
@import './message-config.less';
</style>
<template>
    <div class="message-container" 
        :class="{'noticefromme':isOwn}"
        style="overflow:hidden">
        <div class="message-crtTime" >{{data.crtTime}}</div>
        <div class="message-photo" :style="{float:isOwn?'right':'left'}">
            <img 
                @error="imgError" 
                :src="data.photo?data.photo:'resources/images/icon/defaultUserPhoto.png'">
            <p 
                >
                {{ data.creatorName || '未知' }}
            </p>
        </div>
        <div class="message-template" :style="{float:isOwn?'right':'left'}">
            <div :class="{'message-pop':true,'message-right':isOwn}"></div>
            <div :class="{'message-pop-one':true,'message-right-one':isOwn}"></div>
            <div class="header" :style="{borderBottom:isBorderBottom?'1px solid #ddd':'none'}">
                <a 
                    class="header-code"
                    v-if="isTransCode" 
                    @click="handleViewDetail">
                    {{ displayTransCode }}
                </a>
                <span class="header-type">{{ instanceType }}</span>
                <span 
                    class="header-status" 
                    v-if="isStatus">
                    {{ data.primaryInfoContent.status || 
                    data.primaryInfoContent.newStatus || 
                    data.primaryInfoContent.processStatus }}
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
                        v-for="(item,index) of data.primaryInfoContent.primaryInfo" 
                        :key="index" 
                        :class="{'content-list':item.emphases,'content-gray':!item.emphases}">
                        {{ `${item.fieldName}：${item.value}` }}
                    </p>
                </div>
            </div>
            <div class="footer-content">
                <comment-notice 
                    :data="data" 
                    v-if="data.type=='comment'" 
                    v-bind:class="{'notice-unread':!data.isRead}">
                </comment-notice>
                <flow-task-notice 
                    :data="data" 
                    v-if="data.type=='flowTask'" 
                    :isBorderTopProp="isBorderTopProp"
                    v-bind:class="{'notice-unread':!data.isRead}">
                </flow-task-notice>
                <process-status-change-notice 
                    :data="data" 
                    v-if="data.type=='processStatus'" >
                </process-status-change-notice>
            </div>
        </div>
    </div>
</template>

<script>
import InstanceCreateNotice from "@/views/social/message/notice-tpl/instance-create-notice";
import CommentNotice from "@/views/social/message/notice-tpl/comment-notice";
import FlowTaskNotice from "@/views/social/message/notice-tpl/flow-task-notice";
import ProcessStatusChangeNotice from "@/views/social/message/notice-tpl/process-status-change-notice";

export default {
    name:'MessageConfig',
    components:{
        InstanceCreateNotice,
        CommentNotice,
        FlowTaskNotice,
        ProcessStatusChangeNotice
    },
    props:{
        data:{},
    },
    data() {
        return {
            isOpen: false,
            isBorderTopProp: false
        };
    },
    computed: {
        isOwn() {
            return  this.data.creatorName === this.$currentUser.nickname;
        },
        isShowOpen() {
            return this.data.primaryInfoContent.primaryInfo && this.data.primaryInfoContent.primaryInfo.length > 0;
        },
        isBorderBottom() {
            return (this.data.primaryInfoContent.primaryInfo && this.data.primaryInfoContent.primaryInfo.length>0) || (this.data.type==='comment' || this.data.type==='flowTask');
        },
        isTransCode() {
            return this.data.primaryInfoContent.type !== 'list' && (this.data.primaryInfoContent.transCode || this.data.primaryInfoContent.relationKey) ? true : false;
        },
        displayTransCode() {
            return this.data.primaryInfoContent.transCode || this.data.primaryInfoContent.relationKey;
        },
        isStatus() {
            return this.data.primaryInfoContent.status || this.data.primaryInfoContent.newStatus || this.data.primaryInfoContent.processStatus ? true : false;
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
            let href = `/Form/index.html?data=${this.displayTransCode}`;
            window.open(href);
        }
    },
    mounted() {
        
    }
}
</script>

