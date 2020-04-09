<style lang="less" scoped>
@import "./message-layout.less";
</style>
<template>
    <div class="message">
        <div class="message-sider">
            <div class="message-sider-header">
                <span class="message-search">
                    <Input
                        v-model="searchValue"
                        autofocus 
                        placeholder="搜索"
                        :style="{width:'205px'}" />
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
import { createGroup } from "@/services/imService";
import Navigation from './navigation/navigation';
import Bus from "@/assets/eventBus.js";
import AddGroupMember from "./message-tpl/add-group-member";
export default {
    name:'MessageLayout',
    components:{
        Navigation,
        AddGroupMember
    },
    data(){
        return {
            searchValue: "",
            groupTitle: "发起群聊"
        }
    },
    watch:{
       
    },
    methods: {
        showAddGroupModal() {
            this.$refs["addGroupMember"].showModal = true;
        },
        addGroup(userList) {
            let userIds = [],
                userNames = [],
                params = {};

            userList.forEach(user =>{
                userIds.push(user.userId);
                userNames.push(user.nickname);
            })

            params = {
                groupId: null,
                users: userIds.join(','),
                name: userNames.join(',')
            };
            createGroup(params).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    this.$refs["addGroupMember"].showModal = false;
                    Bus.$emit('updateGroupName');
                }
            }).catch(err => {
                this.$Message.error(res.data.message);
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

