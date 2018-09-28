<template>
    <div style="height: 100%;">
        <div class="notificas-layout-sider-search">
            <Input search placeholder="搜索" />
        </div>
        <div class="notificas-layout-sider-navs notificasscrollbar">
            <div class="notificas-layout-sider-item" v-if="navs.length==0">
                <img width="50" src="static/favicon.ico">
                <div class="notificas-layout-sider-item-describe" >
                    <div class="notificas-layout-sider-item-describe-title">
                        Roletask团队
                    </div>
                    <div class="notificas-layout-sider-item-describe-txt" >
                        <p >暂无通知...</p>
                    </div>
                </div>
            </div>
            <div 
                class="notificas-layout-sider-item" 
                v-bind:class="{ 'active': nav.isActive }"
                @click="handleReadNotice(nav)"
                v-for="(nav,index) in  navs" 
                :key="index">
                <img width="50" :src="nav.icon">
                <div class="notificas-layout-sider-item-describe" >
                    <div class="notificas-layout-sider-item-describe-title">{{nav.listName}}</div>
                    <div class="notificas-layout-sider-item-describe-txt" >
                        <p v-html="nav.comment"></p>
                    </div>
                </div>
                <div class="notificas-layout-sider-item-msgcount" v-if="nav.unreadNum>0">{{nav.unreadNum}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {getNavListByMessage,readNotice} from "@/services/notificationsService";
export default {
    name:'notifiLayoutSider',
    props:{
        handleAvtiveNav:Function
    },
    data(){
        return {
            navs:{},
            params:{
                page:1,
                limit:10,
                filter:''
            }
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
        //请求所有菜单菜单
        refreshNavListByMessage(){
            getNavListByMessage(this.params).then(res=>{
                this.navs = res.tableContent;
                if(res.dataCount>0){
                    this.avtiveNav = this.navs[0];
                    this.navs[0].isActive = true;
                    this.handleAvtiveNav(this.navs[0]);
                }
            });
        },
        handleReadNotice(nav){
            this.$forceUpdate();
            this.avtiveNav = nav;
            this.navs.map(nav=>{
                nav.isActive = false;
            });
            readNotice(nav.listId).then(res=>{
                // nav.isActive = true;
                nav.unreadNum = 0;
            });
            nav.isActive = true;
            this.handleAvtiveNav(nav);
        },
          //订阅消息
        subscribeMessage: function() {
            let deepstream = this.$deepstream,
                userId = this.$currentUser.userId;
            //消息订阅
            deepstream.event.subscribe("commentMessage/" + userId, res => {
                this.refreshNavListByMessage();
                this.hanleWindowNotification('您有'+ res.dataCount + '未读消息');
            });
        },
    },
    mounted(){
        this.refreshNavListByMessage();
        this.subscribeMessage();
    }
}
</script>

