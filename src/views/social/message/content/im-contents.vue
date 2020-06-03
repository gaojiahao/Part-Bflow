<style lang="less" scoped>
  .message-list{
      height: 100%;
      overflow-y: auto;
  }
  .otherMessage{
     text-align: center;
     padding: 10px 0px;
     span{
        background-color: #ddd;
        padding: 2px 10px;
        color: #515a6e;
     }
  }
</style>
<template>
    <div class="message-list compactscrollbar" ref="messageList"  id='messageList'>
        <div v-for="(m,index) in  messages" :key="index" >
            <!-- 消息组件 -->
            <content-message v-if="[1,2,3,4].includes(m.imType)" @showDetailModal="showDetailModal" :msg="m"></content-message>
            <div class="otherMessage" v-if="[101,102,104].includes(m.imType)">
                <div>{{m.crtTime}}</div>
                <div><span>{{m.content}}</span></div>
            </div>
            <!-- 文件消息组件 -->
            <!-- <file-message :fileMessage="m"></file-message> -->
        </div>
        
        <!-- 未读消息详情 -->
        <message-read-detail 
            ref="messageReadDetail" 
            :msg="detailMessage">
        </message-read-detail>

        <Dropdown 
            @on-click="onDropItemClick"
            ref="contextMenu"  
            trigger="click"
            placement="bottom-start">
            <DropdownMenu slot="list">
                <DropdownItem name="replay" >回复</DropdownItem>
                <!-- <DropdownItem name="codyMessage" >复制</DropdownItem> -->
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>

import {getMessagesByGroupId,getGroupMsgById,checkMessage} from "@/services/imService";
import ContentMessage from "../message-tpl/message-tpl-layout";
import FileMessage from "../message-tpl/file-message";
import MessageReadDetail from "../message-tpl/message-read-detail";
import Bus from "@/assets/eventBus.js";
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
                page:1,
                limit:20
            },
            allLoad:false,
            curContextMessage:{}
        }
    },
    watch:{
        $route(to, from) {
            if(to.params.groupId != from.params.groupId){
                this.pageParam.page = 1;
                this.allLoad = false;
                this.messages = [];
                this.getMessages();
            }
        }
    },
    props:{
    },
    methods:{
        showContextmenu(m,e){
            this.curContextMessage = m;
            this.$refs.contextMenu.$refs.reference = e.target;
            this.$refs.contextMenu.currentVisible = !this.$refs.contextMenu.currentVisible;
        },
        onDropItemClick(k){
            switch (k) {
                case 'replay':
                    this.replyMessage();
                    break;
            
                case 'codyMessage':
                    this.copyMessage();
                    break;
            }
        },
         copyMessage(text,e) {
          this.$refs[text.id].visible = false;
          let input = document.createElement('input');
            input.value = this.$refs[`content${text.id}`].innerText;
            document.body.appendChild(input);
            input.select();
            if(document.execCommand("Copy")){
                document.execCommand("Copy"); // 执行浏览器复制命令
            }else{
                this.$Message.error('无法复制！');
            }
            
            input.remove()
        },
        replyMessage() {
            console.log(this.curContextMessage);
            Bus.$emit('replyMsg',{
                msg:this.curContextMessage,
                group:{
                    ...this.$route.query
                }
            });
            Bus.$emit('atUser',{
                userId:this.curContextMessage.creator,
                nickName:this.curContextMessage.creatorName
            });
        },
        getMessages(){
            let param = {
                ...this.pageParam,
                groupId:this.$route.params.groupId
            };
            this.$Loading.start();
            getMessagesByGroupId(param).then(res=>{
                this.$Loading.finish();
                if(res.msgs.length<this.pageParam.limit){
                    this.allLoad = true;
                    console.log('全部加载完成');
                }
                res.msgs.map(m=>{

                    if([2,3,4].includes(m.imType)){
                        m.content = JSON.parse(m.content);
                    }

                    if(m.replayMsg){
                        if([2,3,4].includes(m.replayMsg.imType)){
                            m.replayMsg.content = JSON.parse(m.replayMsg.content);
                        }
                        
                    }
                });
                
                this.messages.unshift(...res.msgs);
            });
        },
        showDetailModal(message) {
            this.detailMessage = message;
            this.$refs["messageReadDetail"].showModal = true;
        },
        subscribeIm(){
            let deepstream = this.$deepstream;
            //消息订阅
            var that =this;
            deepstream.event.subscribe("roletaskIm/" + JSON.parse(localStorage.getItem('roleplay-token')).token, res => {
                res.imType = parseInt(res.imType);
                
                switch (res.imType) {
                    case 1:
                        if (this.$route.params.groupId == res.groupId)
                        {
                            this.messages.push(res);
                             checkMessage(res.groupId).then(res=>{
                                Bus.$emit("checkMessage",res.groupId);
                            });
                        }
                        break;
                    case 2:
                    case 3:
                    case 4:
                       if(typeof(res.content) === 'string'){
                            res.content = JSON.parse(res.content);
                        }
                        if (this.$route.params.groupId == res.groupId){
                             this.messages.push(res);
                             checkMessage(res.groupId).then(res=>{
                                Bus.$emit("checkMessage",res.groupId);
                            });
                        }
                        break;
                    case 100:
                        if(res.isMySelf && that.$route.params.groupId == res.groupId){
                           that.messages.push({
                               ...res.lastMsg,
                               isMySelf:res.isMySelf
                           });
                        }
                        break;
                    case 101:
                    case 102:
                         if (that.$route.params.groupId == res.groupId){
                            that.messages.push(res);
                            Bus.$emit('addMembers');
                         }
                        break;
                    case 103:
                        if(that.$route.params.groupId == res.groupId){
                            this.messages.map(m=>{
                                if(res.messages.includes(m.id)){
                                    if(this.$route.query.groupType==='G'){
                                        m.checked++;
                                    }else{
                                        m.allLoad = true;
                                    }
                                        
                                }
                            });
                        }
                        break;
                    case 104:
                        if(that.$route.params.groupId == res.groupId){
                            that.messages.push(res);
                            this.$route.query.groupName = res.content.split('【').pop().split('】')[0];
                        }
                        break;
                }
            });
        },
        initEvents(){
            var that= this;
            this.$refs.messageList.addEventListener('scroll', function() {

                if(arguments[0].target.scrollTop==0 && !that.allLoad){
                    that.pageParam.page++;
                    that.getMessages();
                }
            });


            Bus.$on('toMessage',msgId => {

                var msgDiv = document.getElementById(msgId)

                if(msgDiv){
                    msgDiv.style.backgroundColor = '#f9b24757';
                    setTimeout(() => {
                        msgDiv.style.backgroundColor = '';
                    }, 2000);
                    msgDiv.scrollIntoView(true);
                }else{
                    getGroupMsgById(that.$route.params.groupId,msgId,that.pageParam.limit).then(res=>{
                        res.msgs.map(m=>{

                            if([2,3,4].includes(m.imType)){
                                m.content = JSON.parse(m.content);
                            }

                            if(m.replayMsg){
                                if([2,3,4].includes(m.replayMsg.imType)){
                                    m.replayMsg.content = JSON.parse(m.replayMsg.content);
                                }
                                
                            }
                        });
                        that.messages.unshift(...res.msgs);

                        setTimeout(() => {
                            var msgDiv = document.getElementById(msgId);
                            msgDiv.scrollIntoView(true);
                        }, 10000);
                    });
                }
                            


            });

             Bus.$on('showContextmenu',(param)=>{
                this.showContextmenu(param.msg,param.e);
             });

            
        },
        scrollToBottom(){
             this.$nextTick(() => {
                 if(this.pageParam.page<=2){
                    this.$refs.messageList.scrollTop  = this.$refs.messageList.scrollHeight;
                   
                 }else{
                    this.$refs.messageList.scrollTop  =  (this.$refs.messageList.scrollHeight/this.pageParam.page)+1;
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