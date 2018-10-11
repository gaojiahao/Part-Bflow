<style lang="less" scoped>
@import "./notifilist.less";

</style>
<template>
    <div  class="message-list notificasscrollbar" id="msgList">
        <div 
            class="message-list-item"
            v-for="(n,index) in  notifications" 
            :key="index">
            <div class="notice-time">{{n.crtTime}}</div>
            <comment-notice-tpl 
                :data="n" 
                v-if="n.type=='comment'" 
                v-bind:class="{'notice-unread':!n.isRead}">
            </comment-notice-tpl>

            <praise-notice-tpl  
                :data="n" 
                v-if="n.type=='praise'" 
                v-bind:class="{'notice-unread':!n.isRead}">
            </praise-notice-tpl>

            <flow-task-tpl 
                :data="n" 
                v-if="n.type=='flowTask'" 
                v-bind:class="{'notice-unread':!n.isRead}">
            </flow-task-tpl>
        </div>
    </div>
</template>

<script>
import flowTaskTpl from "@/views/notifications/notice-tpl/flowTaskTpl";
import commentNoticeTpl from "@/views/notifications/notice-tpl/commentNoticeTpl";
import praiseNoticeTpl from "@/views/notifications/notice-tpl/praiseNoticeTpl";
import {getAllnotifications} from "@/services/notificationsService";
export default {
    name:'notifilist',
    components:{
        flowTaskTpl,
        commentNoticeTpl,
        praiseNoticeTpl
    },
    props:{
        list:'',
        listId:{
            type:String,
            default:''
        }
    },
     watch:{
        navId:{
            handler(newValue, oldValue) {
                if(newValue){
                    this.listId = newValue;
                }
        　　　},
        　　　deep:true
        },
    },
    data(){
        return {
            params:{
                page:1,
                limit:10,
                filter:[]
            },
            notifications:[],
            isRolling:false,
            navId:''
        }
    },
    methods:{
        //滚动加载
        handleScroll () {
            let scrollDiv = document.getElementById('msgList'),
                that= this,
                scrollTop;
            scrollDiv.addEventListener('scroll', function() {
                scrollTop = scrollDiv.scrollTop;

                if(scrollDiv.scrollHeight  === (scrollDiv.clientHeight+scrollTop)){
                    that.params.page++;
                    that.isRolling = true;
                    that.refreshNotifics();
                }
            });
        },
         //请求所有消息
        refreshNotifics(){
            let filter=[{property:"listid",value:this.listId,operator:"eq"}];
            this.params.filter = JSON.stringify(filter);
            
            getAllnotifications(this.params).then(res =>{
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
        }
    },
    mounted(){
        this.handleScroll();
        this.refreshNotifics();
    }
}
</script>
