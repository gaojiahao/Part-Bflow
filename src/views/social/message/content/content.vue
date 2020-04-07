<style lang="less" scoped>
@import "./content.less";
</style>
<template>
    <div class="content">
        <div class="content-header">
            <groupHeader></groupHeader>
        </div>
        <Row class="content-container" >
            <Col :span="$route.name !='list'?'16':'24'" 
                style="height:100%"
                >
                <div class="content-container-msglist messagescrollbar" id='msgList'>
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
                <div class="content-message-input">
                    <commentPublish :handlePublish="handlePublish" ></commentPublish>
                </div>
            </Col>
            <Col span="8"
                class="content-container-history" v-if="$route.name =='member'" >
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
import {sendMessage} from "@/services/imService";


import {getListData} from "@/services/appService";

import Bus from "@/assets/eventBus.js";

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
            displayArr: ['appChangeLog','projectType','jobLog','fileOut','projectTaskRecall','praise']
        }
    },
    computed: {
        
    },
    methods:{
        handlePublish(content,uploadList,userIds,superComment,commentAndReply,sendComponent){
            function uuid() {
                    function S4() {
                        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                    }
                    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
                }

            var message = {
                groupId:this.groupId,
                content:content,
                imType:1,
                id:uuid()
            }
            sendMessage(message).then(res=>{
                 if(res.success && sendComponent){
                    sendComponent.innerText = '';
                    sendComponent.discContent.txt = '';
                    sendComponent.$refs.editor && (sendComponent.$refs.editor.innerHTML = "");
                    sendComponent.atUsers = [];
                    sendComponent.$refs.upload && (sendComponent.$refs.upload.clearFiles());
                    sendComponent.$refs.uploadFile && (sendComponent.$refs.uploadFile.clearFiles());
                    sendComponent.uploadList = sendComponent.$refs.upload && sendComponent.$refs.upload.fileList;
                    sendComponent.uploadFileList = sendComponent.$refs.uploadFile && sendComponent.$refs.uploadFile.fileList;
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
        }
    },
    watch: {
        $route(to, from) {
            this.params.page=1;
            this.isRolling = false;
            // this.listId = this.$route.params.listId;
            this.handleScroll();
            // this.refreshAppInfo();
            // this.refreshNotifics();
            // localStorage.setItem('activeNavigatioIdOfNotice',this.listId);
            this.groupId = this.$route.params.groupId;
            if(this.$route.query.groupType == 'G'){
                this.$router.push({ name: 'member',query: to.query});
            }
        }
    },
    mounted(){
        this.listId = this.$route.params.listId;
        this.groupId = this.$route.params.groupId;

        if(this.listId){
            this.refreshAppInfo();
            this.refreshNotifics();
            Bus.$on('refreshNotice',()=>{
                this.refreshNotifics();
            })
        }

        this.handleScroll();
       
    }

}
</script>

