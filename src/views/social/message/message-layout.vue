<style lang="less" scoped>
@import "./message-layout.less";
</style>
<template>
    <div class="message">
        <div class="message-sider">
            <div class="message-sider-header">
                <span class="message-search">
                    <nav-search></nav-search>
                </span>
                <span class="add-group" @click="showAddGroupModal">
                    <Icon type="md-add" />
                </span>
            </div>
            <div class="message-sider-list ">
                <navigation></navigation>
            </div>
        </div>
        <div class="message-content">
            <router-view></router-view>
        </div>
        <add-group-member 
            :groupTitle="groupTitle"
            ref="addGroupMember" 
            :confirmCallback="addGroup">
        </add-group-member>
    </div>
</template>
<script>
import { createGroup, getGroupByUserId } from "@/services/imService";
import Navigation from './navigation/navigation';
import Bus from "@/assets/eventBus.js";
import AddGroupMember from "./message-tpl/add-group-member";
import NavSearch from "./message-tpl/nav-search";
export default {
    name:'MessageLayout',
    components:{
        Navigation,
        AddGroupMember,
        NavSearch
    },
    data(){
        return {
            groupTitle: "发起群聊"
        }
    },
    watch:{
       
    },
    methods: {
        showAddGroupModal() {
            this.$refs["addGroupMember"].showModal = true;
            this.$refs["addGroupMember"].selectMembers = [];
        },
        addGroup(userList) {
            let userIds = [],
                userNames = [],
                params = {},
                requestUrl = createGroup;

            userList.forEach(user =>{
                userIds.push(user.id);
                userNames.push(user.name);
            })

            if(userList.length === 1){
                params = {
                    userId: userIds.join(',')
                };
                requestUrl = getGroupByUserId;
            }else{
                userNames.push(this.$currentUser.nickname);
                userIds.push(this.$currentUser.userId);
                params = {
                    groupId: null,
                    users: userIds.join(','),
                    name: userNames.join(',')
                };
            }
            
            requestUrl(params).then(res => {
                res.message && this.$Message.success(res.message);
                this.$refs["addGroupMember"].showModal = false;
                Bus.$emit('updateGroupName');
            }).catch(err => {
                this.$Message.error(err.data.message);
            })
        }
    },
    mounted(){
        let activeNavigatioIdOfNotice = localStorage.getItem('activeNavigatioIdOfNotice');

        if(activeNavigatioIdOfNotice){
            this.$router.push('/social/message/list/' + activeNavigatioIdOfNotice);
        }
    }
}
</script>

