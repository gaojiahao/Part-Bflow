<style lang="less" scoped>
  .message-list{
      height: 100%;
      overflow-y: auto;
  }
</style>
<template>
    <div class="message-list compactscrollbar" ref="messageList"  id='messageList'>
        <div v-for="(m,index) in  messages" :key="index" @contextmenu.prevent="showContextmenu(m)">
            <!-- 消息组件 -->
            <content-message @showDetailModal="showDetailModal" :msg="m"></content-message>
            <!-- 文件消息组件 -->
            <!-- <file-message :fileMessage="m"></file-message> -->
        </div>
        
        <!-- 未读消息详情 -->
        <message-read-detail 
            ref="messageReadDetail" 
            :detailMessage="detailMessage">
        </message-read-detail>

        <Dropdown 
            @on-click="onDropItemClick"
            ref="contextMenu"  
            trigger="click"
            placement="bottom-start">
            <DropdownMenu slot="list">
                <DropdownItem name="replay" >回复</DropdownItem>
                <DropdownItem name="codyMessage" >复制</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>

import {getMessagesByGroupId,getGroupMsgById} from "@/services/imService";
import ContentMessage from "../message-tpl/content-message";
import FileMessage from "../message-tpl/file-message";
import MessageReadDetail from "../message-tpl/message-read-detail";
import { EMOTION } from "@/assets/const";
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
            this.pageParam.page = 1;
            this.allLoad = false;
            this.messages = [];
            this.getMessages();
        }
    },
    props:{
    },
    methods:{
        showContextmenu(m){
            this.curContextMessage = m;
            this.$refs.contextMenu.$refs.reference = event.target;
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
            Bus.$emit('replyMsg',{
                msg:this.curContextMessage,
                group:{
                    ...this.$route.query
                }
            })
        //   Bus.$emit('setLinkMember',{
        //     name:`@${text.creatorName}&nbsp;`,
        //     value:`<div style="
        //             color:#999;
        //             font-size:12px;
        //             border-left:3px solid #ddd;
        //             padding:3px">
        //             <span>${text.creatorName}：</span>
        //             <p>${text.content}</p>
        //           </div>`
        //   });
        },
        getMessages(){
            let param = {
                ...this.pageParam,
                groupId:this.$route.params.groupId
            };
            this.$Loading.start();
            getMessagesByGroupId(param).then(res=>{
                this.$Loading.finish();
                if(res.length<this.pageParam.limit){
                    this.allLoad = true;
                }
                res.msgs.map(m=>{

                    if([2,3,4].includes(m.imType)){
                        m.content = JSON.parse(m.content);
                    }
                    if(1===m.imType){
                        let reg = /\[(.+?)\]/g;
                        let emotion = [...EMOTION];
                        m.content = m.content.replace(reg, (word) => {
                            // 寻找表情索引
                            let idx = emotion.findIndex(item => item === word.replace(/(\[|\])/g, ''));
                            // 没有匹配项则返回原文字
                            if (idx === -1) {
                            return word
                            }
                             let path = idx>104 ? '/img' : 'https://res.wx.qq.com/mpres/htmledition/images/icon';
                            return `<img class="static-emotion-gif" style="vertical-align: middle" src="${path}/emotion/${idx}.gif">`;
                        });
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
            deepstream.event.subscribe("roletaskIm/" + JSON.parse(localStorage.getItem('roleplay-token')).token, res => {
                res.imType = parseInt(res.imType);
                switch (res.imType) {
                    case 1:
                        this.$route.params.groupId == res.groupId;
                        this.messages.push(res);
                        break;
                    case 2:
                    case 3:
                    case 4:
                        this.$route.params.groupId == res.groupId;
                        res.content = JSON.parse(res.content);
                        this.messages.push(res);
                        break;
                    case 103:
                        this.messages.map(m=>{
                           if(res.messages.includes(m.id)){
                                m.checked++;
                           }
                        });
                        break;
                }
            });
        },
        initEvents(){
            var that= this;
            this.$refs.messageList.addEventListener('scroll', function() {
                console.log('是否全部加载',that.allLoad);
                if(arguments[0].target.scrollTop===0 && !that.allLoad){
                    that.pageParam.page++;
                    that.getMessages();
                }
            });
        },
        scrollToBottom(){
             this.$nextTick(() => {
                 if(this.pageParam.page===1){
                    this.$refs.messageList.scrollTop  = this.$refs.messageList.scrollHeight;
                 }else{
                    this.$refs.messageList.scrollTop  =  this.$refs.messageList.scrollHeight/3;
                 }
            });
        }
    },
    mounted(){
        this.subscribeIm();
        this.getMessages();
        this.initEvents();

        let that = this;

        Bus.$on('toMessage',msgId => {
            //groupId,msgId,limit
            getGroupMsgById(that.$route.params.groupId,msgId,that.pageParam.limit).then(res=>{
                 res.msgs.map(m=>{

                    if([2,3,4].includes(m.imType)){
                        m.content = JSON.parse(m.content);
                    }
                    if(1===m.imType){
                        let reg = /\[(.+?)\]/g;
                        let emotion = [...EMOTION];
                        m.content = m.content.replace(reg, (word) => {
                            // 寻找表情索引
                            let idx = emotion.findIndex(item => item === word.replace(/(\[|\])/g, ''));
                            // 没有匹配项则返回原文字
                            if (idx === -1) {
                            return word
                            }
                             let path = idx>104 ? '/img' : 'https://res.wx.qq.com/mpres/htmledition/images/icon';
                            return `<img class="static-emotion-gif" style="vertical-align: middle" src="${path}/emotion/${idx}.gif">`;
                        });
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
        })
        
       
    },
    updated(){
        // this.scrollToBottom();
    }
}
</script>