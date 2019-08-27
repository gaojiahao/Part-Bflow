<style lang="less" scoped>
@import "./content.less";
</style>
<template>
    <div class="content">
        <div class="content-header">
            <div class="content-header-title" v-if="appInfo.title">
                <a  @click="handleViewDetail">{{appInfo.title}}</a>
                【{{appInfo.TRANS_NAME}}】
                <span v-if="appInfo.administrator">管理员:{{appInfo.administrator}}</span>
                 <Icon class="fr" @click="handleExpend" type="ios-more" size="40" style="font-size: 40px;cursor: pointer;"/>
            </div>
           <pre class="content-header-comment">{{appInfo.comment}}</pre>
        </div>
        <Row class="content-container" >
            <Col :span="$route.name !='list'?'16':'24'" class="content-container-msglist messagescrollbar" id='msgList'>
                <div 
                    class="content-container-msglist-item"
                    v-bind:class="{'createbyme':n.creatorName===$currentUser.nickname}"
                    v-for="(n,index) in  notifications" 
                    :key="index">

                    <praise-notice-tpl  
                        :data="n" 
                        v-if="n.type=='praise'" 
                        v-bind:class="{'notice-unread':!n.isRead}">
                    </praise-notice-tpl>

                    <message-config :data="n" v-if="displayArr.indexOf(n.type) < 0"></message-config>

                    <change-log-notice :data="n" v-if="n.type=='appChangeLog'"></change-log-notice>

                    <export-import-notice :data="n" v-if="n.type=='fileOut'"></export-import-notice>

                    <project-task :data="n" v-if="n.type=='projectType'"></project-task>

                    <cancel-project-task :data="n" v-if="n.type=='projectTaskRecall'"></cancel-project-task>

                    <task-log-notice :data="n" v-if="n.type=='jobLog'" v-bind:class="{'notice-unread':!n.isRead}"></task-log-notice>
                </div>
            </Col>
            <Col span="8" v-if="$route.name !='list'" class="content-container-history" >
            
                <router-view></router-view>
            </Col>
        </Row>
    </div>
</template>

<script>
import praiseNoticeTpl from "@/views/social/message/notice-tpl/praiseNoticeTpl";
import InstanceCreateNotice from "@/views/social/message/notice-tpl/instance-create-notice";
import ChangeLogNotice from "@/views/social/message/notice-tpl/change-log-notice";
import ExportImportNotice from "@/views/social/message/notice-tpl/export-import-notice";
import ProjectTask from "@/views/social/message/notice-tpl/project-task";
import CancelProjectTask from "@/views/social/message/notice-tpl/cancel-project-task";
import TaskLogNotice from "@/views/social/message/notice-tpl/task-log-notice";
import MessageConfig from '@/views/social/message/notice-tpl/message-config'

import Messageistory from "@/views/social/message/content/messageistory";

import {getAllnotifications} from "@/services/notificationsService";
import {getListData} from "@/services/appService";

export default {
    name:'Content',
    components:{
        praiseNoticeTpl,
        InstanceCreateNotice,
        ChangeLogNotice,
        Messageistory,
        ExportImportNotice,
        ProjectTask,
        CancelProjectTask,
        TaskLogNotice,
        MessageConfig
    },
    data(){
        return {
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
            displayArr: ['appChangeLog','projectType','jobLog','fileOut','processStatus']
        }
    },
    computed: {
        
    },
    methods:{
        //滚动加载
        handleScroll () {
            let scrollDiv = document.getElementById('msgList'),
                that= this,
                scrollTop;
            scrollDiv.addEventListener('scroll', function() {
                scrollTop = scrollDiv.scrollTop;

                if(Math.ceil(scrollDiv.clientHeight+scrollTop) +2 >= scrollDiv.scrollHeight){
                    if(that.params.total > that.notifications.length){
                        that.params.page++;
                        that.isRolling = true;
                        that.refreshNotifics();
                    }
                }
            });
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
            this.listId = this.$route.params.listId;
            this.handleScroll();
            this.refreshAppInfo();
            this.refreshNotifics();
            localStorage.setItem('activeNavigatioIdOfNotice',this.listId);
        }
    },
    mounted(){
        this.listId = this.$route.params.listId;
        this.handleScroll();
        this.refreshAppInfo();
        this.refreshNotifics();
    }

}
</script>

