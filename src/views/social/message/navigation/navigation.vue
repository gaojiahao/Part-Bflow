<style lang="less" scoped>
@import "./navigation.less";
</style>
<template>
    <ul class="navs compactscrollbar">
        <div  v-if="networkError" class="network-error">当前网络不可用</div>
         <router-link 
            :to="{
                name:'group',
                params:{groupId: g.groupId},
                query:{groupName:g.groupName,groupType:g.groupType,userId:g.userId?g.userId:null}
                }" 
            v-for="(g,index) in  sortedGroup" 
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
                                <span style="color: #b90c0c;" v-if="1 ===g.lastMsg.imType && g.lastMsg.content.includes(`@${$currentUser.nickname}`)">[有人@我]</span>
                                <span>{{g.lastMsg.creatorName}}:</span>
                                <span v-html="formatToEmotion(g.lastMsg.content.trim())" v-if="[1,101,102,104].includes(g.lastMsg.imType)" ></span>
                                <span  v-if="g.lastMsg.imType==2">【图片】</span>
                                <span  v-if="[3,4].includes(g.lastMsg.imType)">【文件】</span>
                            </div>
                            <div class="navs-item-appinfo-name-lastTime">
                                <span>{{g.modTime | timeChange}}</span>
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
            networkError:false,
            navs:[],
            imGroups:[],
            curContextGroup:{}
        }
    },
    computed:{
        sortedGroup:function(){
            var a =  this.sortKey(this.imGroups,'modTime');
            return a;
        }
    },
    filters:{
       timeChange:function(time){
           var formatDateTime = function (timeValue) {
                var date = new Date(timeValue);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return  m + '/' + d;
            };
           var diffTime = (new Date().getTime() - new Date(time))/1000,
               str = '';
           
           if(diffTime < 60){
               str = '刚刚'
           } else if(diffTime < 60*60){
               str = Math.floor(diffTime/60) + '分钟前';
           }else if (diffTime < 60 * 60 * 24)
            {
                str = Math.floor(diffTime/(60*60))+'小时前 ';
            }
            else if (diffTime < 60 * 60 * 24 * 2)
            {
                str = Math.floor(diffTime/(60*60*24)) == 1 ? '昨天 ' : '前天 ';
            }
            else
            {
                str = formatDateTime(time);
            }
            return str;
       }
    },
    methods:{
        sortKey(array,key){
            array =  array.sort(function(a,b){
                var x = a[key];
                var y = b[key];
                return ((x<y)?1:(x>y)?-1:0)
            });
            return array.sort(function(a,b){
                return (a.focus && !b.focus)?-1:0;
            })
        },
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
            ds.event.subscribe("roletaskIm/" + this.$md5(String(this.$currentUser.userId)), res => {
                res.imType = parseInt(res.imType);
                switch (res.imType) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        this.imGroups.map(g=>{
                            if(g.groupId === res.groupId){

                                (!res.isMySelf)&& g.msgCount++;
                                g.modTime = res.crtTime;//修改时间
                                
                                if(res.imType==2){
                                    res.content = JSON.parse(res.content);
                                }
                                g.lastMsg = res;
                                return false;
                            }
                        });
                        break;
                    case 100:
                        if(!res.isMySelf){
                            this.imGroups.push(res);
                        }else{
                            this.imGroups.map(g=>{
                                if(g.groupId === res.groupId){
                                    g.lastMsg = res.lastMsg;
                                }
                            });
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
                    case 104:
                        this.imGroups.map(g=>{
                            if(g.groupId === res.groupId){
                                g.groupName = res.content.split('【').pop().split('】')[0];
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
        },
    },
    mounted(){
        this.refreshNavs();
        // this.subscribeMessage();
        this.subscribeIm();
        Bus.$on('updateGroupName', () => {
            this.refreshNavs();
        });
        let that = this;
        let isExist = false;
        Bus.$on('addGroup', group => {
            this.imGroups.map(g=>{
                if(g.groupId === group.groupId) isExist =true;
            });

            if(!isExist){
                this.imGroups.push(group);
            }
             this.$router.push({ 
                name:'group',
                params:{
                    groupId:group.groupId
                },
                query: {
                    groupName:group.groupName,
                    groupType:group.groupType,
                    userId:group.userId
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

        Bus.$on('dsOpen',()=>{
            this.subscribeIm();
        });

        var EventUtil = {
            addHandler: function(element, type, handler) {
                if (element.addEventListener) {
                    element.addEventListener(type, handler, false);
                } else if (element.attachEvent) {
                    element.attachEvent("on" + type, handler);
                } else {
                    element["on" + type] = handler;
                }
            }
        };

        EventUtil.addHandler(window, "online", function() {
            console.log("Online");
            that.networkError = false;
        });
        EventUtil.addHandler(window, "offline", function() {
            console.log("Offline");
            that.networkError = true;
        })
    }

}
</script>

