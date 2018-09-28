<template>
    <div  class="notificas-layout-content-notificwin-msg-list notificasscrollbar" id="msgList">
        <div 
            class="notificas-layout-content-notificwin-msg-list-item"
            v-for="(n,index) in  notifications" 
            :key="index">

            <comment-notice-tpl :data="n" v-if="n.type=='praise' ||n.type=='comment' "></comment-notice-tpl>

            <flow-task-tpl :data="n" v-if="n.type=='flowTask' "></flow-task-tpl>
        </div>
    </div>
</template>

<script>
import flowTaskTpl from "@/views/notifications/flowTaskTpl";
import commentNoticeTpl from "@/views/notifications/commentNoticeTpl";
import {getAllnotifications} from "@/services/notificationsService";
export default {
    name:'notifilist',
    components:{
        flowTaskTpl,
        commentNoticeTpl
    },
    props:{
        list:'',
        listId:{
            type:String,
            default:''
        }
    },
    watch:{
        listId:{
            handler(newValue, oldValue) {
               this.refreshNotifics();
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
        }
    },
    methods:{
         //桌面消息通知
        hanleWindowNotification(content){

            let showNotification = function () {
                var notification = new Notification('Roletask【路塔】', {
                    body: content,
                    icon: 'static/favicon.ico'
                });
                notification.onclick = function () {
                    console.log('点击');
                    window.self.focus();
                    notification.close();
                };
            }
            // 先检查浏览器是否支持
            if (window.Notification) {
 
            var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf('safari') != -1) {
                    if (ua.indexOf('chrome') > -1) {
                        // Chrome
                        Notification.requestPermission().then(function (permission) {
                            if (permission == "granted") {
                               showNotification();
                            } else {
                                Notification.requestPermission();
                                console.log('没有权限,用户拒绝:Notification');
                            }
                        });
                    } else {
                        // Safari
                        Notification.requestPermission(function (permission) {
                            if (permission == "granted") {
                                showNotification
                            } else {
                                Notification.requestPermission();
                                console.log('没有权限,用户拒绝:Notification');
                            }
                        })
                    }
                }
            } else {
                console.log('不支持Notification');
            }

        },
         //订阅消息
        subscribeMessage: function() {
            let deepstream = this.$deepstream,
                userId = this.$currentUser.userId;
            //消息订阅
            deepstream.event.subscribe("commentMessage/" + userId, res => {
                // this.notifications.unshift(...res.tableContent);
                // this.notifications = res.tableContent;
                this.refreshNotifics();
                this.hanleWindowNotification('您有'+ res.dataCount + '未读消息');
                this.formatNotifications();
            });
        },
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
                    this.notifications.unshift(...res.tableContent);
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
                }else{
                   item.tempContent = JSON.parse(item.content); 
                }
                
            });
        }
    },
    mounted(){
        this.handleScroll();
        this.refreshNotifics();
        // this.subscribeMessage();
    }
}
</script>
