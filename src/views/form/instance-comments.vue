<style lang="less" scoped>
@import "./instance-comments.less";
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
                        <Dropdown style="margin-left: 20px" @on-click="addSubscribeUsers" trigger="click" >
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
        <Row class="comments">
            <commentPublish :handlePublish="handlePublish" ></commentPublish>

            <div class="comments-header martop10" v-if="comments.length>0">
                <strong>最新评论({{pageInfo.total}})</strong>
            </div>

            <comments 
                :isInIframe="true" 
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
  </div>
</template>

<script>
import { saveComment,getComments } from "@/services/appService.js";

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
  name: "userComments",
  components: {
    comments,
    commentPublish
  },
  props: {

  },
  data() {
    return {
        transCode:this.$route.params.transCode,
        selectusers: '', 
        type:'instance',
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
        isInstance: false,
        subscribeInfo:{
            isSubscribe:0,
            subscribeNum:0,
            subscribeUsers:[]
        }
    };
  },
  watch: {
      selectusers: function(data) {
          console.log(JSON.parse(data))
          this.addUserData(JSON.parse(data));
      }
  },
 
  methods: {
    addUserData(value) {
        let userIds = [],
            data = {};
        value.forEach(val => {
            userIds.push(val.userId);
        });
        if(userIds.length > 0){
            data = {
                relationKey: this.transCode,
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
            if(window.top.viewInsCommentsUserModal){
                window.top.viewInsCommentsUserModal();
            }
        }
    },
    deleteSubscribeUsers(userId,nickname) {
        let data = {
            relationKey: this.transCode,
            userIds: userId
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
            relationKey:this.transCode,
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
                relationKey:this.transCode,
                sort:JSON.stringify([{property:"crtTime",direction:"DESC"}])
        }
        params = Object.assign(params,this.pageInfo)

        getComments(params).then(res=>{
            this.comments = res.tableContent;
            this.pageInfo.total = res.dataCount;
        }).then(res=>{
            window.top.setInstaceCommentsIframeHeight();
        });
    },

    handlePageChange:function (page) {
        this.pageInfo.page = page;
        this.refreshComments();
    },

    handleSubscribeApp:function () {
        subscribeApp({
            type:'instance',
            relationKey:this.transCode
        }).then(res=>{
            this.subscribeInfo.isSubscribe = 1;
            this.refreshSubscribeInfo();
        });
    },
    handleUnsubscribeApp:function (params) {
        unsubscribeAppByRelationKey({
            relationKey:this.transCode
        }).then(res=>{
            this.subscribeInfo.isSubscribe = 0;
            this.refreshSubscribeInfo();
        });
    },
    refreshSubscribeInfo(){
        this.$forceUpdate();
        getUserByRelationKey({
           relationKey:this.transCode,
           limit:10,
           page:1
        }).then(res=>{
            this.subscribeInfo.subscribeUsers = res.tableContent;
            this.subscribeInfo.subscribeNum = res.dataCount;
        });
    },
    judgeIsSubscribeByRelationKey:function (params) {
        judgeIsSubscribeByRelationKey({
           relationKey:this.transCode
        }).then(res=>{
            this.subscribeInfo.isSubscribe = res;
        });
    }
   
  },
  mounted(){
        this.refreshComments();
        this.refreshSubscribeInfo();
        this.judgeIsSubscribeByRelationKey();
        window.top.addUserData = this.addUserData;
  }
};
</script>

