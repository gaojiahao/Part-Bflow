<style lang="less" scoped>
@import "./content.less";
</style>
<template>
    <div class="content">
        <div class="content-header">
            <groupHeader v-if="!!groupId"></groupHeader>
        </div>
        <Row class="content-container" >
            <Col class="content-container-messages" :span="['member','all','files','images'].includes(this.$route.name)?'16':'24'" 
                >
                <div 
                class="content-container-msglist compactscrollbar" 
                :class="{'notice-msg':$route.query.groupType === 'N'}">
                    <!-- <div 
                        class="content-container-msglist-item"
                        v-bind:class="{'createbyme':n.creatorName===$currentUser.nickname}"
                        v-for="(n,index) in  notifications" 
                        :key="index">

                        <praise-notice 
                            :data="n" 
                            v-if="n.type=='praise'" 
                            v-bind:class="{'notice-unread':!n.isRead}">
                        </praise-notice>

                        <message-config :data="n" v-if="displayArr.indexOf(n.type) < 0"></message-config>

                        <change-log-notice :data="n" v-if="n.type=='appChangeLog'"></change-log-notice>

                        <export-import-notice :data="n" v-if="n.type=='fileOut'"></export-import-notice>

                        <project-task-notice :data="n" v-if="n.type=='projectType'"></project-task-notice>

                        <cancel-project-task-notice :data="n" v-if="n.type=='projectTaskRecall'"></cancel-project-task-notice>

                        <task-log-notice :data="n" v-if="n.type=='jobLog'" v-bind:class="{'notice-unread':!n.isRead}"></task-log-notice>
                    </div> -->
                    <imContents :groupId="groupId"></imContents>
                </div>
                <div v-if="$route.query.groupType !== 'N'" class="content-message-input" v-on:click="msgInputClick()">
                    <commentPublish  ref='msgInput' :handlePublish="handlePublish" :setAtUsers="setAtUsers" :groupId="groupId" :sessionHandlePublish="sessionHandlePublish">
                        <div  slot="rightBars">
                            <Icon type="ios-list-box-outline" size=24 title="消息记录" style=" cursor: pointer;" v-on:click="onViewHistory" />
                        </div>
                    </commentPublish>
                </div>
            </Col>
            <Col span="8"
                class="content-container-history" 
                v-if="['member','all','files','images'].includes(this.$route.name)">
                <router-view></router-view>
            </Col>
        </Row>
    </div>
</template>

<script>
import PraiseNotice from "@/views/social/message/notice-tpl/praise-notice";
import InstanceCreateNotice from "@/views/social/message/notice-tpl/instance-create-notice";
import ChangeLogNotice from "@/views/social/message/notice-tpl/change-log-notice";
import ExportImportNotice from "@/views/social/message/notice-tpl/export-import-notice";
import ProjectTaskNotice from "@/views/social/message/notice-tpl/project-task-notice";
import CancelProjectTaskNotice from "@/views/social/message/notice-tpl/cancel-project-task-notice";
import TaskLogNotice from "@/views/social/message/notice-tpl/task-log-notice";
import MessageConfig from '@/views/social/message/notice-tpl/message-config'
import Messageistory from "@/views/social/message/content/messageistory";
import commentPublish from "@/components/discussion/publish";
import groupHeader from "@/views/social/message/content/groupHeader";
import imContents from "@/views/social/message/content/im-contents";

import {getAllnotifications} from "@/services/notificationsService";
import {sendMessage,checkMessage,getMembers} from "@/services/imService";
import {getListData} from "@/services/appService";
import { deepstream } from '@/plugin/deepstream'
import Bus from "@/assets/eventBus.js";
import {EMOTION}  from "@/utils/emotion";
import Vue from 'vue'

const storage = window['sessionStorage'];
const MessionStore = 'MessionStore';

export default {
    name:'Content',
    components:{
        PraiseNotice,
        InstanceCreateNotice,
        ChangeLogNotice,
        Messageistory,
        ExportImportNotice,
        ProjectTaskNotice,
        CancelProjectTaskNotice,
        TaskLogNotice,
        MessageConfig,
        commentPublish,
        imContents,
        groupHeader
    },
    props:{
       group: {
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            emotionList: [...EMOTION],
            groupId:'',
            params:{
                page:1,
                limit:10,
                filter:[],
                total:0
            },
            notifications:[],
            isRolling:false,
            listId:'',
            appInfo:{},
            expendHistoryVisible:false,
            displayArr: ['appChangeLog','projectType','jobLog','fileOut','projectTaskRecall','praise'],
            messionArr:{}
        }
    },
    computed: {
        
    },
    methods:{
        setAtUsers(){
            let that = this;
            if(this.$route.query.groupType==='G'){
                return getMembers(this.$route.params.groupId).then(res=>{
                    
                    let tempUsers =  res.filter(r=>{
                        return parseInt(r.userId)!=that.$currentUser.userId;
                    });
                    tempUsers.unshift({
                        nickname:'所有人',
                        userId:'All'
                    });
                    return tempUsers;
                });
            }else{
                return  new Promise.resolve((resolve, reject) => {
                    return resolve([]);
                })
            }
           
        },
        handlePublish(content,uploadList,userIds,superComment,commentAndReply,sendComponent){
            /**
             * imType 
             * 1、文本
             * 2、图片
             * 3、图文
             * 4、文件
             */

            let contentHtmls = sendComponent.contentWrap.childNodes;
            let msgTpl = {
                groupId:this.groupId,
                content:[],
                imType:1
            };
            let hasTaxt = false,
                hasImg = false,
                hasFile = false,
                that = this;
            Array.from(contentHtmls).forEach((d)=>{
                if(d.tagName){
                    if(d.tagName === 'IMG' && d.className.includes('paste-img')){
                        hasImg = true;
                        msgTpl.content.push({
                            id:d.getAttribute('attid'),
                            content:d.getAttribute('name'),
                            size:d.getAttribute('size'),
                            imType:2
                        });
                    }
                    else if
                    (d.tagName === 'SPAN' && d.className.includes('file-content')){
                        hasFile = true;
                        msgTpl.content.push({
                            id:d.getAttribute('attid'),
                            content:d.getAttribute('name'),
                            size:d.getAttribute('size'),
                            imType:4
                        });
                    }else if
                    (d.tagName === 'IMG' && d.className.includes('static-emotion-gif')){
                        let index = d.getAttribute('index');
                        
                         msgTpl.content.push({
                            content:`[${this.emotionList[index]}]`,
                            imType:1
                        });
                        hasTaxt =true;
                    }
                    else if
                    (d.tagName === 'SPAN' && d.className.includes('atUser')){
                         msgTpl.content.push({
                            content:d.textContent,
                            imType:1
                        });
                        hasTaxt =true;
                    }else
                    {
                         msgTpl.content.push({
                            content:d.outerHTML,
                            imType:1
                        });
                        hasTaxt =true;
                    }
                    
                }
                else{
                    if(d.textContent.trim()){
                        hasTaxt=true;
                        msgTpl.content.push({
                            content:d.textContent,
                            imType:1
                        });
                    }
                }
            });

            //文本消息
            if(hasTaxt && !hasImg && !hasFile){
                let t = '';
                msgTpl.content.map(s=>{
                    t =t+ s.content;
                });
                msgTpl.content = t;
            }
            //图片消息
            if(!hasTaxt && hasImg && msgTpl.content.length === 1){
                msgTpl.content = msgTpl.content[0];
                msgTpl.imType = 2;
            }

             //文件消息
            if(!hasTaxt && hasFile && msgTpl.content.length === 1){
                msgTpl.content = msgTpl.content[0];
                msgTpl.imType = 4;
            }

            //复合消息
            if(Array.isArray(msgTpl.content)){
                msgTpl.imType = 5;
                let tempContent =[]
                tempContent = msgTpl.content.map(m=>{
                    if(m.imType==2 || m.imType==4){
                        m = {
                            content:{
                                ...m
                            },
                            imType:m.imType
                        };
                    }
                    return m;
                });
                msgTpl.content = tempContent;
            }
                
            if(msgTpl.imType !=1){
                if(msgTpl.content.length ===0) return;
                msgTpl.content = JSON.stringify(msgTpl.content);
            }
           
            if(sendComponent.replayMsg){
                msgTpl.replayId=sendComponent.replayMsg.id;
                msgTpl.replayMsg = sendComponent.replayMsg;
            }

            if(msgTpl.content.length>4000){
                this.$Message.error('发送消息内容超长，请分条发送!');
                return;
            }
            
            sendMessage(msgTpl).then(res=>{
                if(res.success && sendComponent){
                    sendComponent.innerText = '';
                    sendComponent.discContent.txt = '';
                    sendComponent.$refs.editor && (sendComponent.$refs.editor.innerHTML = "");
                    sendComponent.atUsers = [];
                    if(msgTpl.replayId){
                        sendComponent.$refs.replycontainer.innerHTML = '';
                        sendComponent.$refs.editor.style.height='220px';
                        delete sendComponent.replayMsg;
                    }
                }
            }).catch(error=>{
                if([3,4].includes(msgTpl.imType) && msgTpl.content.length>5){
                    this.$Message.error('一次最多发送5份文件哦，请修改消息内容！');
                }else{
                    this.$Message.error(error.data.message);
                }
            });

        },
        //滚动加载
        handleScroll () {
            // let scrollDiv = document.getElementById('msgList'),
            //     that= this,
            //     scrollTop;
            // scrollDiv.addEventListener('scroll', function() {
            //     scrollTop = scrollDiv.scrollTop;

            //     if(Math.ceil(scrollDiv.clientHeight+scrollTop) +2 >= scrollDiv.scrollHeight){
            //         if(that.params.total > that.notifications.length){
            //             that.params.page++;
            //             that.isRolling = true;
            //             that.refreshNotifics();
            //         }
            //     }
            // });
        },
         //请求所有消息
        refreshNotifics(){
            let filter=[{property:"listid",value:this.listId,operator:"eq"}];
            this.params.filter = JSON.stringify(filter);
            getAllnotifications(this.params).then(res =>{
                this.params.total = res.dataCount;
                if(this.isRolling){
                    this.notifications = this.notifications.concat(...res.tableContent);
                }else{
                    this.notifications = res.tableContent;
                }
                this.formatNotifications();
            });
        },
        formatNotifications(){
            this.notifications.map(item=>{
                if(item.type === 'comment' || item.type === 'praise'){
                    item.tempContent = JSON.parse(item.content).content;
                    item.sourceContent = JSON.parse(item.content);
                }else{
                   item.tempContent = JSON.parse(item.content); 
                }

                item.primaryInfoContent = JSON.parse(item.content); 
                
            });
        },
        refreshAppInfo(){
            getListData(this.listId).then(res =>{
                this.appInfo = res[0];
                this.appInfo.comment = this.appInfo.comment.replace(/<br>/g,'\r\n');
            });
        },
        handleViewDetail:function () {
            window.open('/Site/index.html#list/' + this.listId);
        },
        handleExpend:function () {

            if(this.$route.name === 'list'){
                this.$router.push({name:'history'});
            }else{
                this.$router.push({name:'list'});
            }
            // this.expendHistoryVisible = !this.expendHistoryVisible;

            // if(this.expendHistoryVisible){
            //     this.$router.push({name:'history'});
            // }else{
            //     this.$router.push({name:'list'});
            // }
        },
        msgInputClick:function(){

             var dsClient = this.$deepstream,
                currentUser = this.$currentUser,
                status = dsClient && dsClient.getConnectionState(),
                dsUri = JSON.parse(window.localStorage.getItem('r2-cached-properties')).deepStreamUrl;

            if(status == 'CLOSED' || dsClient == null){
                async function init (){
                    Vue.prototype.$deepstream  = await deepstream(currentUser, dsUri)
                }
                init();
                Bus.$emit("dsOpen");
            }
                
            // to:签收消息
            checkMessage(this.groupId).then(res=>{
                Bus.$emit("checkMessage",this.groupId)
            });
        },
        onViewHistory(){
            if(['all','files'].includes(this.$route.name)){
                this.$router.push({ 
                    name: this.$route.query.type==="G"?'member':'group',
                    query: this.$route.query
                });
            }else{
                this.$router.push({
                    name:`history`,
                    query:this.$route.query
                });
            }
        },
        sessionHandlePublish(content,groupId){
            let contentHtmls = content;
            let strArr = {};
            this.messionArr = storage.getItem(MessionStore) ? JSON.parse(storage.getItem(MessionStore)):{};
            this.$set(this.messionArr,groupId,JSON.stringify({
                groupId:groupId,
                contentHtmls: contentHtmls
            }));

            storage.setItem(MessionStore, JSON.stringify(this.messionArr));
        },
    },
    watch: {
        $route(to, from) {
            this.params.page=1;
            this.isRolling = false;
            this.handleScroll();
            this.groupId = this.$route.params.groupId;
            
            if(this.$route.query.groupType == 'G' && to.name === 'group'){
                this.$router.push({ name: 'member',query: to.query});
            }
            this.$refs.msgInput && this.$refs.msgInput.contentWrap.focus();
        }
    },
    mounted(){
        this.groupId = this.$route.params.groupId;

        
        if(this.$route.query.groupType == 'G' && this.$route.name == 'group'){
            this.$router.push({ name: 'member',query: this.$route.query});
        }else{
            
        }
        this.handleScroll();
    }

}
</script>

