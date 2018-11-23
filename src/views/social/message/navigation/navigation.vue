<style lang="less" scoped>
@import "./navigation.less";
</style>
<template>
    <ul class="navigation-list messagescrollbar">
        <router-link  :to="'/social/message/list/'+ nav.listId"   v-for="(nav,index) in  navs" :key="index" >
            <li  class="navigation-list-item"  v-bind:class="{ 'active':$route.params.listId==nav.listId }">
                <img width="40" :src="nav.icon" >
                <div class="navigation-list-item-appinfo">
                    <div class="font14"> {{nav.listName}}</div>
                    <div style="color: #5c7893;"><p v-html="nav.comment"></p></div>
                </div>

                 <div class="navigation-list-item-msgcount" v-if="nav.unreadNum>0">{{nav.unreadNum}}</div>
            </li>
        </router-link>
    </ul>
</template>
<script>

import {getNavListByMessage,readNotice} from "@/services/notificationsService";
export default {
    name:'Navigation',
     data(){
        return {
            params:{
                page:1,
                limit:1000,
                filter:''
            },
            navs:[]
        }
    },
    methods:{
        refreshNavListByMessage:function (params) {
              getNavListByMessage(this.params).then(res=>{
                this.navs = res.tableContent;
                
            });
        }
    },
    mounted(){
        this.refreshNavListByMessage();
    }

}
</script>

