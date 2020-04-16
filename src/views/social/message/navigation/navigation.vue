<style lang="less" scoped>
@import "./navigation.less";
</style>
<template>
    <ul class="navigation-list messagescrollbar">
        <!-- :to="{name:'detail',params:{name:1}}" -->
        <!-- :to="'/social/message/group/'+ g.groupId" -->
         <router-link 
            :to="{name:'group',params:{groupId: g.groupId},query:{groupName:g.groupName,groupType:g.groupType}}" 
            v-for="(g,index) in  imGroups" 
            :key="index">
            <Poptip 
                disabled
                :ref="g.groupId"
                width="100%"
                placement="bottom">
                <li 
                    class="navigation-list-item" 
                    :class="{ 'active':$route.params.groupId==g.groupId }"
                    @contextmenu.prevent="onContextmenu(g)" >
                    <img 
                        width="45" 
                        :src="g.groupIcon || 'resources/images/icon/defaultUserPhoto.png'" 
                        onerror="src='resources/images/icon/defaultUserPhoto.png'" 
                        style="border: 1px solid #ddd;">
                    <div class="navigation-list-item-appinfo">
                        <div class="font14 font12 navigation-list-item-appinfo-groupName">
                            <p>{{g.groupName}}</p>
                        </div>
                        <div class="font12 navigation-list-item-appinfo-name" v-if="g.lastMsg">
                            <div class="navigation-list-item-appinfo-name-lastcontent">
                                <span>{{g.lastMsg.creatorName}}:</span>
                                <span v-html="g.lastMsg.content" v-if="g.lastMsg.imType==1"></span>
                                <span  v-if="g.lastMsg.imType==2">文件</span>
                            </div>
                            <div class="navigation-list-item-appinfo-name-lastTime">
                                <Time :time="g.lastMsg.crtTime" />
                            </div>
                        </div>
                    </div>

                    <Badge class="navigation-list-item-msgcount" :count="g.msgCount" overflow-count="99" >
                    </Badge>
                </li>
                <div slot="content" :style="{width:'100px'}" @click="hiddenPop(g)">
                    <p class="menu-list" @click="setTop(g)">{{g.focus?'取消置顶':'置顶'}}</p>
                </div>
            </Poptip>
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
import { getMyImGroups,setFocus,deleteFocus } from "@/services/imService";
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
        hiddenPop(g) {
          this.$refs[g.groupId][0].visible = false;
        },
        setTop(g) {
            let requestUrl = setFocus;
            if(g.groupId){
                g.focus && (requestUrl = deleteFocus);
                requestUrl(g.groupId).then(res => {
                    if(res.success){
                        this.$Message.success(res.message);
                        this.refreshNavListByMessage();
                    }
                })
            }
        },
        refreshNavListByMessage:function (params) {
            //   getNavListByMessage(this.params).then(res=>{
            //     this.navs = res.tableContent;
            // });

            getMyImGroups().then(res=>{
                this.imGroups = res;
            });
            
        },
        //订阅消息
        subscribeMessage: function() {
            debugger
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
        subscribeIm:function(){
            let deepstream = this.$deepstream;
            //消息订阅
            deepstream.event.subscribe("roletaskIm/" + JSON.parse(localStorage.getItem('roleplay-token')).token, res => {
                switch (res.imType) {
                    case '1':
                        this.imGroups.map(g=>{
                            if(g.groupId === res.groupId){

                                (!res.isMySelf)&& g.msgCount++;

                                g.lastMsg = res;
                                return false;
                            }
                        });
                        break;
                    case '103':
                        this.imGroups.map(g=>{
                            if(g.groupId === res.groupId){
                                g.msgCount=0;
                                return false;
                            }
                        });
                        break;
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
            // readNotice(nav.listId).then(res=>{
            //     nav.unreadNum = 0;
            // });
        },
        handlerGetIcon(icon){
            if(icon){
                if(icon.indexOf('resource')=== 0 ){
                    return icon = `https://lab.roletask.com/resource/app-icon/${icon.split('/').pop()}`
                }
            }
            return icon;
        },
        onContextmenu(g) {
            this.$refs[g.groupId][0].visible = true;
        }
    },
    mounted(){
        this.refreshNavListByMessage();
        // this.subscribeMessage();
        this.subscribeIm();
        Bus.$on('updateGroupName', () => {
            this.refreshNavListByMessage();
        })
    }

}
</script>

