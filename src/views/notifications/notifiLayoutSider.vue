<style lang="less" scoped>
@import "./notifications.less";
</style>
<template>
    <div style="height: 100%;">
        <div class="notificas-layout-sider-search">
            <AutoComplete
                v-model="searchkeywords"
                :data="searchResult"
                @on-search="handleSearch"
                placeholder="搜索">
                <div 
                    class="notificas-layout-sider-item" 
                    v-bind:class="{ 'activeNav': nav.isActive }"
                    @click="handleActiveNavigation(nav)"
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
            </AutoComplete>
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
                v-bind:class="{ 'activeNav': nav.isActive }"
                @click="handleActiveNavigation(nav)"
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
            },
            searchkeywords:'',
            searchResult:[]
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
            let activeNavigatioIdOfNotice = localStorage.getItem('activeNavigatioIdOfNotice'),
                activeNav;

            getNavListByMessage(this.params).then(res=>{
                this.navs = res.tableContent;

                if(res.dataCount===0) return;

                if(activeNavigatioIdOfNotice){
                    this.navs.map(nav=>{
                        if(nav.listId === activeNavigatioIdOfNotice){
                            nav.isActive = true;
                            activeNav = nav;
                        }
                    });
                }else{
                    this.navs[0].isActive = true;
                    activeNav = this.navs[0];
                }

                if(!activeNav){
                    this.navs[0].isActive = true;
                    activeNav = this.navs[0];
                }

                this.handleAvtiveNav(activeNav);
                
            });
        },
        handleActiveNavigation(nav){

            this.$forceUpdate();
            this.handleAvtiveNav(nav);

            localStorage.setItem('activeNavigatioIdOfNotice',nav.listId);

            this.navs.map(nav=>{
                nav.isActive = false;
            });
            nav.isActive = true;

            readNotice(nav.listId).then(res=>{
                nav.unreadNum = 0;
            });
        },
        //订阅消息
        subscribeMessage: function() {
            let deepstream = this.$deepstream,
                userId = this.$currentUser.userId;
                console.log('订阅');
            //消息订阅
            deepstream.event.subscribe("commentMessage/" + userId, res => {
                this.refreshNavListByMessage();
                if(res.dataCount>0){
                    this.hanleWindowNotification('您有'+ res.dataCount + '未读消息');
                }
            });
        },
        handleSearch:function (value) {
            // var searchparams = {
            //     page:1,
            //     limit:10,
            //     filter:this.searchkeywords
            // };
            // getNavListByMessage(this.params).then(res=>{
                
            // });
        }
    },
    mounted(){

        this.refreshNavListByMessage();
        this.subscribeMessage();
    }
}
</script>

