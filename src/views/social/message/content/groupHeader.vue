<style lang="less" scoped>
  .group-header{
       .group-add{
           float: right;
           font-size: 19px;
           color: #6d6a6a;
           cursor: pointer;
       } 
       .group-title{
           display: inline-block;
       }
  }
  .group-title /deep/ .ivu-input{
      border: 1px solid #dcdee2;
  }
  .group-title > b{
      font-size: 18px;
      padding: 5px;
  }
  .group-title > b:hover{
      background-color: #ddd;
  }
</style>
<template>
    <div class="group-header">
        <div class="group-title">
            <Input 
                v-if="isEdit"
                ref="inputGroup" 
                v-model="group.groupName" 
                placeholder="未知"
                @on-blur="onBlur"
                @keyup.native="onKeyUp"
                :style="{maxWidth:inputWidth}" />
                <b
                    v-else 
                    @click="editGroupName">
                    {{group.groupName}}
                </b>
        </div>
        <div v-if="group.groupType !== 'N'" class="group-add" @click="showAddGroupMemberModal">
            <Icon type="md-person-add" />
        </div>
        <add-group-member ref="addGroupMember" :confirmCallback="addMember"></add-group-member>
    </div>
</template>
<script>
import { setGroupName ,addMember,createGroup } from "@/services/imService";
import Bus from "@/assets/eventBus.js";
import AddGroupMember from "../message-tpl/add-group-member";
export default {
    name:'groupHeader',
    components:{
        AddGroupMember
    },
    data(){
        return {
            isEdit: false,
            inputWidth: '',
            initGroupName:'',
            group:{
                groupName:'',
                groupId:'',
                groupType:''
            }
        }
    },
    watch: {
        $route(to, from) {
            this.initGroupInfo();
        },
    },
    methods:{
        initGroupInfo(){
             this.group = {
                groupId:this.$route.params.groupId,
                ...this.$route.query
             }
             this.initGroupName = this.$route.query.groupName;
        },
        editGroupName() {
            if(this.group.groupType !== 'G') return;

            this.isEdit = true;
            this.$nextTick(() => {
                this.$refs["inputGroup"].focus();
                this.inputWidth = this.group.groupName.length * 15 + "px";
            })
        },
        onBlur() {
            this.isEdit = false;
            if(this.initGroupName === this.group.groupName) return;
            if(!this.group.groupName) {
                this.$Message.error('群名称不可以为空！');
                this.group.groupName = this.initGroupName;
                return;
            }

            setGroupName(this.group.groupId,this.group.groupName).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    Bus.$emit('updateGroupName');
                    this.initGroupName = this.group.groupName;
                }
            }).catch(err => {
                this.$Message.error(err.data.message);
            })
        },
        onKeyUp() {
          const patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'。、]/ig; 
          if (patrn.test(this.group.groupName)) {
            this.$Message.error('不可输入特殊字符！');
            this.group.groupName = this.group.groupName.replace(patrn,'');
          }
        },
        showAddGroupMemberModal() {
            this.$refs["addGroupMember"].displayAll = false;
            this.$refs["addGroupMember"].showModal = true;
        },
        addMember(userList){
            let userIds = [],
                userNames = [],
                params = {},
                requestUrl = addMember;

            userList.forEach(user =>{
                userIds.push(user.id);
                userNames.push(user.name);
            })

            params = {
                groupId: this.group.groupId || null,
                users: userIds.join(','),
                name: userNames.join(',')
            };

            if(this.group.groupType === 'G'){
                delete params.name;
            }else{
                requestUrl = createGroup;
                userIds.push(this.$route.query.userId);
                userNames.push(this.$route.query.groupName);
                userNames.push(this.$currentUser.nickname);
                params.name = userNames.join(',');
                params.users = userIds.join(',');
            }

            requestUrl(params).then(res => {
                res.message && this.$Message.success(res.message);
                this.$refs["addGroupMember"].showModal = false;
                this.group.groupType === 'G' ? Bus.$emit('addMembers') : Bus.$emit('addGroup',res);
            }).catch(err => {
                this.$Message.error(err.data.message);
            })
        }
    },
    mounted(){
        this.initGroupInfo();
    }
}
</script>