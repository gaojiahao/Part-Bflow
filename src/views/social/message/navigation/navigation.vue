<style lang="less" scoped>
@import "./navigation.less";
</style>
<template>
    <ul class="navigation-list messagescrollbar">
         <router-link :to="'/social/message/group/'+ g.groupId" v-for="(g,index) in  imGroups" :key="index">
            <li>
                <div>{{g.groupName}}</div>
            </li>
        </router-link>
        <!-- <router-link  :to="'/social/message/list/'+ nav.listId" v-for="(nav,index) in  navs" :key="index" >
            <li  class="navigation-list-item" @click="handleActiveNavigation(nav)"  v-bind:class="{ 'active':$route.params.listId==nav.listId }">
                <img width="40" :src="handlerGetIcon(nav.icon)" >
                <div class="navigation-list-item-appinfo">
                    <div class="font14"> {{nav.listName}}</div>
                </div>

                <Badge class="navigation-list-item-msgcount" :count="nav.unreadNum" overflow-count="99" >
                </Badge>
            </li>
            
        </router-link> -->
       
    </ul>
</template>
<script>

import {getNavListByMessage,readNotice} from "@/services/notificationsService";
import {getMyImGroups} from "@/services/imService";
import Bus from "@/assets/eventBus.js";
export default {
    name:'Navigation',
     data(){
        return {
            params:{
                page:1,
                limit:1000,
                filter:''
            },
            navs:[],
            imGroups:[]
        }
    },
    methods:{
        refreshNavListByMessage:function (params) {
              getNavListByMessage(this.params).then(res=>{
                this.navs = res.tableContent;
            });

            getMyImGroups().then(res=>{
                this.imGroups = res;
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
                Bus.$emit("refreshNotice");
                if(res.dataCount>0){
                    this.hanleWindowNotification('您有'+ res.dataCount + '未读消息');
                }
            });
        },
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
        //点击某个菜单
        handleActiveNavigation(nav){
            readNotice(nav.listId).then(res=>{
                nav.unreadNum = 0;
            });
        },
        handlerGetIcon(icon){
            if(icon){
                if(icon.indexOf('resource')=== 0 ){
                    return icon = `https://lab.roletask.com/resource/app-icon/${icon.split('/').pop()}`
                }
            }
            return icon;
        }
    },
    mounted(){
        this.refreshNavListByMessage();
        this.subscribeMessage();
    }

}
</script>

