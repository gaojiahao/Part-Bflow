<style lang="less" scoped>
@import "./knowledge-comment.less";
</style>

<template>
  <div class="bg_ff ">
    <Row class="comment-knowledge">
        <div class="commnet-title">评论 
            <span class="fr subscribe-bar">
               <span > 
                    <span 
                        class="subcribeing" 
                        @mouseover="unsubcribeVisible=true;subcribeVisible=false;" 
                        @mouseout="unsubcribeVisible=false;subcribeVisible=true;"
                        v-if="subscribeInfo.isSubscribe==1 && subcribeVisible">
                        <Icon type="md-checkmark" class="success-color" />正在关注中
                    </span>

                    <span 
                        class="unsubcribe" v-if="subscribeInfo.isSubscribe==1 && unsubcribeVisible" 
                        @click="handleUnsubscribeApp"
                        @mouseout="unsubcribeVisible=false;subcribeVisible=true;">
                        <Icon type="md-close" class="warning-color" />取消关注
                    </span>

                    <span class="subcribe" @click="handleSubscribeApp" v-if="subscribeInfo.isSubscribe==0">关注</span>

                    <span> 
                        <Icon type="md-notifications" size=18 class="success-color"  />
                    </span>
                
                </span>

                <span>
                    <Dropdown class="user-dropdown" @on-click="addSubscribeUsers" trigger="click" >
                         <Icon type="md-person" size=18  /> <b>{{subscribeInfo.subscribeNum}}</b>
                         <Icon type="ios-arrow-down"></Icon>
                        <DropdownMenu slot="list">
                            <DropdownItem name="add">
                               添加关注者
                            </DropdownItem>
                            <DropdownItem  v-for="(user,index) in  subscribeInfo.subscribeUsers" :key="index">
                               {{user.nickname}}
                               <span @click.stop="deleteSubscribeUsers(user.userId,user.nickname)" class="delete-user"><Icon type="md-close"/></span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </span>
            </span>
        </div>
    </Row>

    <Row class="user-comment">
        <commentPublish :handlePublish="handlePublish" ></commentPublish>
    </Row>
    <!-- 用户modal -->
    <user-selector 
        :showUserSelector="showUserModal"
        :commentData="commentData" 
        @emitUserModal="emitUserModal" 
        @userModalData="getUserModalData">
    </user-selector>
  </div>
</template>

<script>

import { 
    saveComment,
    getComments 
} from "@/services/appService.js";

import { 
    subscribeApp,
    unsubscribeAppByRelationKey,
    getUserByRelationKey ,
    judgeIsSubscribeByRelationKey,
    addSubscribeUsers,
    deleteSubscribeUsers
} from "@/services/subscribeService";

import comments from "@/components/discussion/comments";
import commentPublish from "@/components/discussion/publish";
import UserSelector from '@/views/application/detail/permission/custom-datasource/user-selector';

export default {
  name: "userComments",
  components: {
    comments,
    commentPublish,
    UserSelector
  },
  props: {
      listId: {
          type: String,
          default: ''
      },
      type: {
          type: String,
          default: ''
      }
  },
  data() {
    return {
        comments:[],
        commentsCount:0,
        pageInfo:{
            limit:10, 
            page:1, 
            total:0
        },
        unsubcribeVisible:false,
        subcribeVisible:true,
        showUserModal: false,
        subscribeInfo:{
            isSubscribe:0,
            subscribeNum:0,
            subscribeUsers:[]
        },
        commentData: {
            relationkey: this.listId,
            type: this.type
        }
    };
  },
  methods: {
    emitUserModal() {
      this.showUserModal = false;
    },
    getUserModalData(value) {
        let userIds = [],
            data = {};
        value.forEach(val => {
            userIds.push(val.userId);
        });
        if(userIds.length > 0){
            data = {
                relationKey: this.listId,
                type: this.type,
                userIds: userIds.join(',')
            };
            addSubscribeUsers(data).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    this.refreshSubscribeInfo();
                    this.judgeIsSubscribeByRelationKey();
                }
            }).catch(error => {
                this.$Message.error(error.data.message);
            });
        }
    },
    addSubscribeUsers(name) {
        if(name === 'add'){
            this.showUserModal = true;
        }
    },
    deleteSubscribeUsers(userId,nickname) {
        let data = {
            relationKey: this.listId,
            userIds: userId,
            type: this.type
        };
        this.$Modal.confirm({
        title: "确认",
        content: "确认退订<b style=color:#e4393c;>"+nickname+"</b>么？",
        onOk: () => {
          deleteSubscribeUsers(data).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    this.refreshSubscribeInfo();
                    this.judgeIsSubscribeByRelationKey();
                }
            }).catch(error => {
                this.$Message.error(error.data.message);
            });
        }
      });
    },
    handlePublish:function (content,uploadList,userIds=[],superComment,commentAndReply,sendComponent) {
        let comment ={
            type:this.type,       
            content:content, 
            relationKey:this.listId,
            parentId: -1,
            commentAndReply:false,
            commentAttachments:uploadList
        };
        saveComment(comment).then(res=>{
            if(!res.success){
                this.$Notice.warning({
                    title: '系统提示',
                    desc: res.message
                });
                return;
            }

            if(sendComponent){
                sendComponent.innerText = '';
                sendComponent.discContent.txt = '';
                sendComponent.$refs.editor && (sendComponent.$refs.editor.innerHTML = "");
                sendComponent.atUsers = [];
                sendComponent.$refs.upload && (sendComponent.$refs.upload.clearFiles());
                sendComponent.$refs.uploadFile && (sendComponent.$refs.uploadFile.clearFiles());
                sendComponent.uploadList = sendComponent.$refs.upload && sendComponent.$refs.upload.fileList;
                sendComponent.uploadFileList = sendComponent.$refs.uploadFile && sendComponent.$refs.uploadFile.fileList;
            }
            
            this.$emit('updateComment');
        });
    },
    handleSubscribeApp:function () {
        subscribeApp({
            type: this.type,
            relationKey:this.listId
        }).then(res=>{
            this.subscribeInfo.isSubscribe = 1;
            this.refreshSubscribeInfo();
        });
    },
    handleUnsubscribeApp:function (params) {
        unsubscribeAppByRelationKey({
            relationKey:this.listId,
            type: this.type
        }).then(res=>{
            this.subscribeInfo.isSubscribe = 0;
            this.refreshSubscribeInfo();
        });
    },
    
    refreshSubscribeInfo(){
        this.$forceUpdate();
        getUserByRelationKey({
           relationKey:this.listId,
           type: this.type,
           limit:1000,
           page:1
        }).then(res=>{
            this.subscribeInfo.subscribeUsers = res.tableContent;
            this.subscribeInfo.subscribeNum = res.dataCount;
        });
    },
    judgeIsSubscribeByRelationKey:function (params) {
        judgeIsSubscribeByRelationKey({
           relationKey:this.listId,
           type: this.type
        }).then(res=>{
            this.subscribeInfo.isSubscribe = res;
        });
    }
  },
  mounted(){
        this.refreshSubscribeInfo();
        this.judgeIsSubscribeByRelationKey();
  }
};
</script>
