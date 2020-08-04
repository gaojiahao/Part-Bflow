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
            <template v-if="m.groupId===$route.params.groupId">
                <!-- 消息组件 -->
                <content-message v-if="[1,2,3,4].includes(m.imType)" @showDetailModal="showDetailModal" :msg="m">
                </content-message>
                <div class="otherMessage" v-if="[101,102,104].includes(m.imType)">
                    <div>{{m.crtTime}}</div>
                    <div><span>{{m.content}}</span></div>
                </div>
                <div class="otherMessage" v-if="[202,203,204].includes(m.imType)">
                    <div>{{m.crtTime}}</div>
                    <message-tpl-taskoverdue :msg="m"></message-tpl-taskoverdue>
                </div>
                <div class="otherMessage" v-if="[201].includes(m.imType)">
                    <div>{{m.crtTime}}</div>
                    <message-tpl-tasklog :msg="m"></message-tpl-tasklog>
                </div>
                <div class="otherMessage" v-if="[205].includes(m.imType)">
                    <div>{{m.crtTime}}</div>
                    <message-tpl-weeksummary :msg="m"></message-tpl-weeksummary>
                </div>
            </template>
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
import MessageTplTaskoverdue from "../message-tpl/message-tpl-taskoverdue";
import MessageTplTasklog from "../message-tpl/message-tpl-tasklog";
import MessageTplWeeksummary from "../message-tpl/message-tpl-weeksummary";
import Bus from "@/assets/eventBus.js";
export default {
    name:'imContents',
    components:{
        ContentMessage,
        FileMessage,
        MessageReadDetail,
        MessageTplTaskoverdue,
        MessageTplTasklog,
        MessageTplWeeksummary
    },
    data(){
        return {
            messages:[],
            detailMessage: {},
            pageParam:{
                page:1,//默认是第一页，滚动时加载第二页面。
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
                //this.$set(this.pageParam,'page',0)
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
        getMessages(page){
            let param = {
                page: page == null ? 1 : page,
                limit:20,
                groupId:this.$route.params.groupId
            },me = this,
            length;

            this.$Loading.start();
            if(this.loading == true) return false;
            this.loading = true;
            // this.getApp().spinShow = true;
            getMessagesByGroupId(param).then(res=>{
                this.$Loading.finish();
                this.loading = false;
                // this.getApp().spinShow = false;
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
                me.messages.unshift(...res.msgs);
                if (res.page != 1){
                    this.isMsgAppend = true;
                    length = res.msgs.length;
                     if(length)me.lastMsgId = res.msgs[length-1].id;//方便定位到最新的第一条，默认会定在最后一条。
                }
            }).finally(()=>{
                this.loading = false;
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
            deepstream.event.subscribe("roletaskIm/" + this.$md5(String(this.$currentUser.userId)), res => {
                res.imType = parseInt(res.imType);
                switch (res.imType) {
                    case 1:
                        if (this.$route.params.groupId == res.groupId)
                        {
                            this.messages.push(res);
                             checkMessage(res.groupId).then(r=>{
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
                             checkMessage(res.groupId).then(r=>{
                                Bus.$emit("checkMessage",res.groupId);
                            });
                        }
                        break;
                    case 100:
                        if(res.isMySelf && that.$route.params.groupId == res.groupId){
                           that.messages.push({
                               ...res.lastMsg,
                               isMySelf:res.isMySelf,
                               checked:0
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
                            let query = this.$route.query;
                            query.groupName = res.content.split('【').pop().split('】')[0];
                            this.$router.push({
                                name:'group',
                                params:{
                                    groupId:res.groupId
                                },
                                query:query
                            });
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
                    that.getMessages(that.pageParam.page);
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

        Bus.$on('dsOpen',()=>{
            this.subscribeIm();
        });

    },
    updated(){
        var msgDiv;
        if (this.isMsgAppend == true){
            this.isMsgAppend = false;
            msgDiv = document.getElementById(this.lastMsgId);
            msgDiv.scrollIntoView(true);
        } else {
            this.scrollToBottom();
        }
       
    }
}
</script>