<style lang="less" scoped>
.all-message{
    height: 100%;
    overflow-y: auto;
    border-top: 1px solid #ddd;
    &-item{
        margin: 18px 15px;
        word-wrap: break-word;

        /deep/ .paste-img{
            width: 100px;
        }

         /deep/ .file-content{
                display: inline-block;
                cursor: pointer;
                width: 200px;
                border: 1px solid #ddd;
                border-radius: 3px;
                padding: 5px;
                margin: 3px;
                background-color: white;

                &-info{
                    display: inline-table;
                    vertical-align: top;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    p{
                    width: 145px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    }
                }
            }   
    }
}
.isMySelf{
    color: #2d8cf0;
}

.replayMsg{
  border-left: 3px solid #999;
  padding:0 8px;
  cursor: pointer;
}
</style>
<template>
    <div class="all-message compactscrollbar font12 " ref="allMessage">
        <div class="all-message-item" v-for="(msg,index) in msgs" :key="index">
            <div class="font12" v-if="[1,2,3,4].includes(msg.imType)" v-bind:class="{isMySelf:msg.isMySelf}">{{msg.creatorName}} {{msg.crtTime}}</div>
            <div class="all-mess-item-content" v-if="[1,2,3,4].includes(msg.imType)">
                <div @click="goTop(msg.replayMsg.id)" v-if="msg.replayMsg" class="replayMsg">
                    <div>{{msg.replayMsg.creatorName}}:</div>

                    <Text-Message v-if="msg.replayMsg.imType===1" :msg="msg.replayMsg"></Text-Message>
                    <Img-Message  v-if="msg.replayMsg.imType===2" :resourceId="msg.replayMsg.content.id"></Img-Message>
                    <File-Message  v-if="msg.replayMsg.imType===4" :file="JSON.parse(msg.replayMsg.content)"></File-Message>
                    <span v-if="msg.replayMsg.imType===3">
                    <span v-for="(r,index) in msg.replayMsg.content" :key="index">
                        <Text-Message v-if="r.imType===1" :msg="r"></Text-Message>
                        <Img-Message  v-if="r.imType===2" :resourceId="r.content.id"></Img-Message>
                        <File-Message  v-if="r.imType===4" :file="r"></File-Message>
                    </span>
                </span>
                </div>

                <Text-Message v-if="msg.imType===1" :msg="msg"></Text-Message>
                <Img-Message  v-if="msg.imType===2" :resourceId="msg.content.id"></Img-Message>
                <File-Message  v-if="msg.imType===4" :file="msg.content"></File-Message>
                <span v-if="msg.imType===3">
                    <span v-for="(r,index) in msg.content" :key="index">
                    <Text-Message v-if="r.imType===1" :msg="r"></Text-Message>
                    <Img-Message  v-if="r.imType===2" :resourceId="r.content.id"></Img-Message>
                    <File-Message  v-if="r.imType===4" :file="r"></File-Message>
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import TextMessage from "../../message-tpl/text-message";
import ImgMessage from "../../message-tpl/img-message";
import FileMessage from "../../message-tpl/file-message";
import {
  getMessagesByGroupId
} from "@/services/imService";
import Bus from "@/assets/eventBus.js";
export default {
    name:'allMessage',
    data(){
        return {
            msgs:[],
            pageParam:{
                page:1,
                limit:30
            },
            allLoad:false,
            serchContent:''
        }
    },
     components:{
      TextMessage,
      ImgMessage,
      FileMessage
    },
     watch: {
        $route(to, from) {
            this.getMessages();
        }
    },
    methods:{
         goTop(id){
            Bus.$emit('toMessage',id);

        },
         getMessages(){
            getMessagesByGroupId({
                ...this.pageParam,
                content:this.serchContent,
                groupId:this.$route.params.groupId
            }).then(res=>{
                if(res.length<this.pageParam.limit){
                    this.allLoad = true;
                }

                 res.msgs.map(m=>{
                    if([2,3,4].includes(m.imType)){
                        m.content = JSON.parse(m.content);
                    }
                });
                if(this.serchContent){
                    this.msgs= res.msgs;
                }else{
                    this.msgs.unshift(...res.msgs);
                }
            });
        },
        initEvents(){
            var that= this;
            this.$refs.allMessage.addEventListener('scroll', function() {
                if(arguments[0].target.scrollTop===0 && !that.allLoad && !that.serchContent){
                    that.pageParam.page++;
                    that.getMessages();
                }
            });

            Bus.$on('serchMessage',value=>{
                if(this.$route.name === 'all'){
                    this.pageParam.page=1;
                    this.serchContent = value;
                    this.getMessages();
                }
            })


        },
        scrollToBottom(){
            this.$nextTick(() => {
                if(this.pageParam.start===1){
                this.$refs.allMessage.scrollTop  = this.$refs.allMessage.scrollHeight;
                }else{
                this.$refs.allMessage.scrollTop  = 200;
                }
            });
        }
    },
    mounted(){
        this.getMessages();
        this.initEvents();
    },
     updated(){
        this.scrollToBottom();
    }
}
</script>