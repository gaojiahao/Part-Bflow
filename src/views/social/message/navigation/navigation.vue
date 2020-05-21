<style lang="less" scoped>
@import "./navigation.less";
</style>
<template>
    <ul class="navs compactscrollbar">
         <router-link 
            :to="{
                name:'group',
                params:{groupId: g.groupId},
                query:{groupName:g.groupName,groupType:g.groupType}
                }" 
            v-for="(g,index) in  imGroups" 
            :key="index">
                <li 
                    class="navs-item" 
                    :class="{ 'active':$route.params.groupId==g.groupId,'istop':g.focus }"
                    @contextmenu.prevent="onContextmenu(g)" >
                    <img 
                        width="45" 
                        :src="g.groupIcon" 
                        onerror="src='https://lab.roletask.com/resource/common-icon/male.png'" 
                        style="border: 1px solid #ddd;">
                    <div class="navs-item-appinfo">
                        <div class="font14 font12 navs-item-appinfo-groupName">
                            <p>{{g.groupName}}</p>
                        </div>
                        <div class="font12 navs-item-appinfo-name" v-if="g.lastMsg">
                            <div class="navs-item-appinfo-name-lastcontent">
                                <span style="color: #b90c0c;" v-if="g.lastMsg.content.includes(`@${$currentUser.nickname}`)">[有人@我]</span>
                                <span>{{g.lastMsg.creatorName}}:</span>
                                <span v-html="formatToEmotion(g.lastMsg.content.trim())" v-if="g.lastMsg.imType==1"></span>
                                <span  v-if="g.lastMsg.imType=='2'">【图片】</span>
                                <span  v-if="g.lastMsg.imType=='4'">【文件】</span>
                            </div>
                            <div class="navs-item-appinfo-name-lastTime">
                                <Time :time="g.lastMsg.crtTime" />
                            </div>
                        </div>
                    </div>
                    <Badge class="navs-item-msgcount" :count="g.msgCount" overflow-count="99" >
                    </Badge>
                </li>
        </router-link>
           
        <Dropdown 
            @on-click="onDropItemClick"
            ref="contextMenu"  
            trigger="click"
            placement="bottom-end">
            <DropdownMenu slot="list">
                <DropdownItem name="tp" v-if="!curContextGroup.focus">置顶</DropdownItem>
                <DropdownItem name="unTp"  v-if="curContextGroup.focus">取消置顶</DropdownItem>
            </DropdownMenu>
        </Dropdown>
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
            imGroups:[],
            curContextGroup:{}
        }
    },
    methods:{
        hiddenPop(g) {
          this.$refs[g.groupId][0].visible = false;
        },
        onDropItemClick(itemName){
             let requestUrl;
            switch (itemName) {
                case 'tp':
                    requestUrl = setFocus;
                    break;
                case 'unTp':
                    requestUrl = deleteFocus;
                    break;
            }

            requestUrl(this.curContextGroup.groupId).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    this.refreshNavs();
                }
            })
            
        },
        refreshNavs:function (params) {
            //   getNavListByMessage(this.params).then(res=>{
            //     this.navs = res.tableContent;
            // });

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
                this.refreshNavs();
                Bus.$emit("refreshNotice");
                if(res.dataCount>0){
                    this.hanleWindowNotification('您有'+ res.dataCount + '未读消息');
                }
            });
        },
        subscribeIm:function(){
            let ds = this.$deepstream;
            if( ds == null){
                console.log('ds is null');
                return;
            }
            //消息订阅
            ds.event.subscribe("roletaskIm/" + JSON.parse(localStorage.getItem('roleplay-token')).token, res => {
                res.imType = parseInt(res.imType);
                switch (res.imType) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        this.imGroups.map(g=>{
                            if(g.groupId === res.groupId){

                                (!res.isMySelf)&& g.msgCount++;

                                g.lastMsg = res;
                                return false;
                            }
                        });
                        break;
                    case 100:
                        if(!res.isMySelf){
                            for(var i=0;i<this.imGroups.length;i++){
                                if(!this.imGroups[i].focus){
                                    this.imGroups.splice(i,0,res);
                                    break;
                                }
                            }
                        }
                        break;
                    case 103:
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
            this.curContextGroup = g;
            this.$refs.contextMenu.$refs.reference = event.target;
            this.$refs.contextMenu.currentVisible = !this.$refs.contextMenu.currentVisible;
        }
    },
    mounted(){
        this.refreshNavs();
        // this.subscribeMessage();
        this.subscribeIm();
        Bus.$on('updateGroupName', () => {
            this.refreshNavs();
        });
        let that = this;
        Bus.$on('addGroup', group => {
            for(var i=0;i<this.imGroups.length;i++){
                if(!this.imGroups[i].focus){
                    this.imGroups.splice(i,0,group);
                    break;
                }
            }
             this.$router.push({ 
                name:'group',
                params:{
                    groupId:group.groupId
                },
                query: {
                    groupName:group.groupName,
                    groupType:group.groupType
                }
            });
        });

        Bus.$on("checkMessage",groupId=>{
            this.imGroups.map(g=>{
                if(g.groupId === groupId){
                    g.msgCount = 0;
                }
            });
        })
    }

}
</script>

