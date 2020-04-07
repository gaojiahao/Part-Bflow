<style lang="less" scoped>
  .message-list{
      
  }
</style>
<template>
    <div class="message-list">
        <div v-for="(m,index) in  messages" :key="index">
            <!-- 消息组件 -->
            <content-message @showDetailModal="showDetailModal" :textMessage="m"></content-message>
            <!-- 文件消息组件 -->
            <!-- <file-message :fileMessage="m"></file-message> -->
        </div>
        
        <!-- 未读消息详情 -->
        <message-read-detail 
            ref="messageReadDetail" 
            :detailMessage="detailMessage">
        </message-read-detail>
    </div>
</template>

<script>

import {getMessagesByGroupId} from "@/services/imService";
import ContentMessage from "../message-tpl/content-message";
import FileMessage from "../message-tpl/file-message";
import MessageReadDetail from "../message-tpl/message-read-detail";
export default {
    name:'imContents',
    components:{
        ContentMessage,
        FileMessage,
        MessageReadDetail
    },
    data(){
        return {
            messages:[],
            detailMessage: {}
        }
    },
    watch:{
        groupId:function (val, oldVal) {
            this.getMessages();
        }
    },
    props:{
        groupId:{
            type:String,
            default:function(){
                return '';
            }
        }
    },
    methods:{
        getMessages(){
            getMessagesByGroupId(this.groupId).then(res=>{
                this.messages = res;
            });
        },
        showDetailModal(message) {
            this.detailMessage = message;
            this.$refs["messageReadDetail"].showModal = true;
        }
    },
    mounted(){
        this.getMessages();
    }
}
</script>