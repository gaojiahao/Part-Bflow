<style lang="less" scoped>
@import "./customer-comments.less";
</style>

<template>
  <div class="bg_ff" style="padding:5px;">
       <Row class="app-resource-group-title">
            <div  class="commnet-title">评论 
                    <span class="fr" v-if="comments.length>0">
                        <Tooltip class="hidden-form" v-if="!hiddenForm" content="打开评论表单" placement="left">
                            <span @click="openForm">
                                <Icon type="md-arrow-dropup-circle" />
                            </span>
                        </Tooltip>
                        <Tooltip class="hidden-form" v-else content="关闭评论表单" placement="left">
                            <span @click="closeForm">
                                <Icon type="md-arrow-dropdown-circle" />
                            </span>
                        </Tooltip>
                    </span>
            </div>
       </Row>
        <Row class="comments">
            <commentPublish v-if="hiddenForm" :handlePublish="handlePublish" ></commentPublish>

            <div class="comments-header martop10" v-if="comments.length>0">
                <strong>最新评论({{pageInfo.total}})</strong>
            </div>

            <comments 
                :isInIframe="true" 
                :comments="comments" 
                :refreshRootComments="refreshComments"
                @refreshDeleteComments="refreshDeleteComments"></comments>

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
        relationKey:this.$route.params.relationkey,
        type:this.$route.params.commmentType,
        comments:[],
        commentsCount:0,
        pageInfo:{
            limit:10, 
            page:1, 
            total:0
        },
        isInstance: false,
        hiddenForm: true,
    };
  },
  watch: {
    $route(to, from) {
        this.transCode = to.params.transCode;
        this.refreshComments();
    }
  },
 
  methods: {
    openForm() {
      this.hiddenForm = true;
      if(window.top.setInstaceCommentsIframeHeight){
        setTimeout(function(){
          window.top.setInstaceCommentsIframeHeight();
        },500)
      }
    },
    closeForm() {
      this.hiddenForm = false;
      if(window.top.setInstaceCommentsIframeHeight){
        setTimeout(function(){
          window.top.setInstaceCommentsIframeHeight();
        },500)
      }
    },
    refreshDeleteComments () {
        this.refreshComments();
    },
    handlePublish:function (content,uploadList,userIds=[],superComment,commentAndReply,sendComponent) {
        let comment ={
            type:this.type,       
            content:content, 
            relationKey:this.relationKey,
            parentId: -1,
            commentAndReply:false,
            commentAttachments:uploadList,
            userIds:userIds
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
            }

            this.refreshComments();
        });
    },
    refreshComments:function () {
        let params = {
                relationKey:this.relationKey,
                sort:JSON.stringify([{property:"crtTime",direction:"DESC"}])
        }
        params = Object.assign(params,this.pageInfo)

        getComments(params).then(res=>{
            this.comments = res.tableContent;

            this.pageInfo.total = res.dataCount;
        }).then(res=>{
             this.$nextTick(function () {
                 setTimeout(() => {
                     window.top.setInstaceCommentsIframeHeight && window.top.setInstaceCommentsIframeHeight();
                 },1000);
            })
            
        });
    },

    handlePageChange:function (page) {
        this.pageInfo.page = page;
        this.refreshComments();
    }
  },
  mounted(){
        this.refreshComments();
  }
};
</script>

