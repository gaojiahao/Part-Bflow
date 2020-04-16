<style lang="less" scoped>
  .message-list{
      height: 100%;
      overflow-y: auto;
  }
</style>
<template>
    <div class="message-list messagescrollbar" ref="messageList"  id='messageList'>
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
            detailMessage: {},
            pageParam:{
                start:1,
                limit:20
            },
            allLoad:false
        }
    },
    watch:{
        groupId:function (val, oldVal) {
            this.pageParam.start = 1;
            this.messages = [];
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
            let param = {
                ...this.pageParam,
                groupId:this.groupId
            };

            getMessagesByGroupId(param).then(res=>{
                if(res.length<this.pageParam.limit){
                    this.allLoad = true;
                }
                this.messages.unshift(...res);
            });
        },
        showDetailModal(message) {
            this.detailMessage = message;
            this.$refs["messageReadDetail"].showModal = true;
        },
        subscribeIm(){
            let deepstream = this.$deepstream;
            //消息订阅
            deepstream.event.subscribe("roletaskIm/" + JSON.parse(localStorage.getItem('roleplay-token')).token, res => {
                if(res.imType === '1' && this.groupId == res.groupId){
                    this.messages.push(res);
                }
            });
        },
        initEvents(){
            var that= this;
            this.$refs.messageList.addEventListener('scroll', function() {
                if(arguments[0].target.scrollTop===0 && !that.allLoad){
                    that.pageParam.start++;
                    that.getMessages();
                }
            });
        },
        scrollToBottom(){
             this.$nextTick(() => {
                 if(this.pageParam.start===1){
                    this.$refs.messageList.scrollTop  = this.$refs.messageList.scrollHeight;
                 }else{
                    this.$refs.messageList.scrollTop  = 200;
                 }
            });
        }
    },
    mounted(){
        this.subscribeIm();
        this.getMessages();
        this.initEvents();
        
       
    },
    updated(){
        this.scrollToBottom();
    }
}
</script>