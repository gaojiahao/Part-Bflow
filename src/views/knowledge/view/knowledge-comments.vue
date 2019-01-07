<style lang="less" scoped>
@import "./knowledge-comments.less";
</style>

<template>
  <div class="bg_ff ">
    <Row class="app-resource-group-title">
        <h3>评论 
            <b class="fr subscribe-bar">
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
                    <Dropdown class="knowledge-dropdown" @on-click="addSubscribeUsers" trigger="click" >
                         <Icon type="md-person" size=18  /> {{subscribeInfo.subscribeNum}}
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
            </b>
        </h3>
    </Row>

    <Row class="user-comment">
        <commentPublish :handlePublish="handlePublish" ></commentPublish>

        <div class="user-comment-header" v-if="comments.length>0">
            <strong>最新评论({{pageInfo.total}})</strong>
        </div>

        <comments 
            :comments="comments" 
            :refreshRootComments="refreshComments"></comments>

        <Page 
            class="pad20"
            v-if="pageInfo.total>0"
            :total="pageInfo.total" 
            :page-size="pageInfo.limit"
            :current="pageInfo.page"
            prev-text="上一页" 
            next-text="下一页" 
            @on-change="handlePageChange"/>
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
import UserSelector from '@/views/application/detail/permission/custom-datasource/user-selector';

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

export default {
  name: "KnowledgeComments",
  components: {
    comments,
    commentPublish,
    UserSelector
  },
  props: {
     
  },
  data() {
    return {
        knowledgeId: this.$route.params.id,
        type:'knowledge',
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
            relationkey: this.knowledgeId,
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
                relationKey: this.knowledgeId,
                type: this.type,
                userIds: userIds.join(',')
            };
            addSubscribeUsers(data).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    this.refreshSubscribeInfo();
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
            relationKey: this.knowledgeId,
            userIds: userId,
            type: this.type,
        };
        this.$Modal.confirm({
        title: "确认",
        content: "确认退订<b style=color:#e4393c;>"+nickname+"</b>么？",
        onOk: () => {
          deleteSubscribeUsers(data).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    this.refreshSubscribeInfo();
                }
            }).catch(error => {
                this.$Message.error(error.data.message);
            });
        }
      });
    },
    handlePublish:function (content,uploadList) {
        let comment ={
            type:this.type,       
            content:content, 
            relationKey:this.knowledgeId,
            parentId: -1,
            commentAndReply:false,
            commentAttachments:uploadList
        };
        saveComment(comment).then(res=>{
            if(!res.success){
                this.$Notice.warning({
                    title: '系统提示',
                    desc: '添加评论失败,请联系企业管理员!'
                });
                return;
            }
            this.refreshComments();
        });
    },
    refreshComments:function () {
        var params = {
            relationKey:this.knowledgeId,
            sort:JSON.stringify([{property:"crtTime",direction:"DESC"}])
        };
        params = Object.assign(params,this.pageInfo);

        getComments(params).then(res=>{
            this.comments = res.tableContent;
          
            this.pageInfo.total = res.dataCount;
        });
    },
    handlePageChange:function (page) {
        this.pageInfo.page = page;
        this.refreshComments();
    },
    handleSubscribeApp:function () {
        subscribeApp({
            type:'knowledge',
            relationKey:this.knowledgeId
        }).then(res=>{
            this.subscribeInfo.isSubscribe = 1;
            this.refreshSubscribeInfo();
        });
    },
    handleUnsubscribeApp:function (params) {
        unsubscribeAppByRelationKey({
            relationKey:this.knowledgeId,
            type: this.type
        }).then(res=>{
            this.subscribeInfo.isSubscribe = 0;
            this.refreshSubscribeInfo();
        });
    },
    
    refreshSubscribeInfo(){
        this.$forceUpdate();
        getUserByRelationKey({
           relationKey:this.knowledgeId,
           type: this.type,
           limit:10,
           page:1
        }).then(res=>{
            this.subscribeInfo.subscribeUsers = res.tableContent;
            this.subscribeInfo.subscribeNum = res.dataCount;
        });
    },
    judgeIsSubscribeByRelationKey:function (params) {
        judgeIsSubscribeByRelationKey({
           relationKey:this.knowledgeId,
           type: this.type,
        }).then(res=>{
            this.subscribeInfo.isSubscribe = res;
        });
    }
  },
  mounted(){
        this.refreshComments();
        this.refreshSubscribeInfo();
        this.judgeIsSubscribeByRelationKey();
  }
};
</script>

