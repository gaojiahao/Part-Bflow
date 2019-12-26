<style lang="less">
@import "./childComments.less";
</style>
<template>
    <div class="child-comments font14">
        <div class="child-comments-item" v-for="(comment,index) in  comments" :key="index">
            <p>
                <my-pop-tip 
                    :userInfo="userInfo" 
                    trigger="click">
                    <span 
                        class="child-comments-user"
                        @click="showUserInfo(comment.creator)"
                        slot="userCard">{{comment.creatorName}}
                    </span>
                </my-pop-tip>
                <span  v-if="comment.parentId!=superComment.id">:回复</span>
                <my-pop-tip 
                    v-if="comment.parentId!=superComment.id"
                    :userInfo="userInfo" 
                    trigger="click">
                    <span 
                        class="child-comments-user"
                        @click="showUserInfo(comment.replyUserId)"
                        slot="userCard"><span class="child-comments-user">@</span>{{comment.replyUserName}}
                        </span>
                </my-pop-tip>

                <span>:</span>
                <span v-html="comment.content" class="child-comment-content"></span>
            </p>
            <p>
                <span>
                    {{comment.times}}
                </span>
                <span 
                    v-if="comment.replyUserId == $currentUser.userId" 
                    @click="deleteComments(comment)" 
                    class="comments-delete">
                    <span style="color:#333">|&nbsp;</span>
                    删除
                </span>
                <span class="fr">
                    <span  class="cursor-pointer" @click="handleShowReply(comment)">回复</span>
                    
                    <span  class="cursor-pointer" v-bind:class="{ 'comment-isPraise': comment.isPraise }">
                        <Icon 
                        type="md-thumbs-up" 
                        size=18  
                        @click="handleThumbsUp(comment)"/>
                        {{comment.praiseNum}}
                    </span>
                    <span  class="cursor-pointer" v-if="comment.praiseNum>0" >
                        <Icon 
                        type="ios-arrow-down" 
                        size=18 
                        @click="handlerShowThumbsUpInfo(comment)"  />
                    </span>

                </span>
            </p>
            <commentPublish 
                class="reply"
                v-if="comment.showReply" 
                :handlePublish="handleReplyPublish" 
                :superComment="comment" 
                :allowFile="false"
                :ischild="true">
            </commentPublish>
           
            <praises ref="praises" :comment="comment" v-if="comment.showPraises"></praises>
        </div>
        <div  
            class="load-more" 
            @click="handleLoadMore" 
            v-if="showloadMore"> 查看更多 
            <Icon type="ios-arrow-down" size=18 />
        </div>
    </div>
</template>

<script>

import { 
    commentThumbsUp,
    saveComment,
    getCommentsByParentId,
    getUserInfoByUserId,
    deleteComment
    } from "@/services/appService.js";

import MyPopTip from "@/components/poptip/MyPopTip";
import commentPublish from "@/components/discussion/publish";
import praises from "@/components/discussion/praises";
export default {
    name:'childComments',
    components:{
        MyPopTip,
        commentPublish,
        praises
    },
    props:{
        superComment:{
            type:Object,
            default:function () {
                return {}
            }
        },
        isInIframe:{
            type:Boolean,
            default:false
        }
    },
     data() {
        return {
           userInfo:{},
           comments:[],
           childPage:{
            limit:10, 
            page:1, 
            sort:JSON.stringify([{property:"crtTime",direction:"ASC"}])
           },
           showloadMore:false
        };
    },
    methods:{
        handleLoadMore:function () {
            this.childPage.limit = (this.childPage.page+1)*this.childPage.limit
            this.refreshComments();
        },
        handlerShowThumbsUpInfo:function (comment) {
            this.$forceUpdate();
            this.comments.map(c=>{
                (c.id != comment.id) && (c.showPraises = false);
                comment.showReply = false;
            });
            comment.showPraises = !comment.showPraises;
        },
        handleThumbsUp:function (comment) {
            this.$forceUpdate();
            let commentId = comment.id;
            commentThumbsUp({commentId:commentId}).then(res=>{
                if(!res.success){
                    this.$Notice.warning({
                        title: '系统提示',
                        desc: '点赞,您可以尝试再次点赞或者联系企业管理员哦!'
                    });
                    return;
                }

               if(this.$refs.praises){
                    (this.$refs.praises.length>0) && (this.$refs.praises[0].refreshPraises());
                }
                comment.isPraise = true;
                comment.praiseNum++;
                
            });
        },
        handleShowReply:function (comment) {
            this.$forceUpdate();
            this.comments.map(c=>{
                (c.id != comment.id) && (c.showReply = false);
                comment.showPraises = false;
            });

            comment.showReply = !comment.showReply;
            if(window.top.setInstaceCommentsIframeHeight){
                this.$nextTick(function () {
                    setTimeout(() => {
                        window.top.setInstaceCommentsIframeHeight();
                    },200);
                })
            }
        },
        handleReplyPublish:function (content,uploadList,userIds=[],superComment,commentAndReply,sendComponent) {
             this.$forceUpdate();
            let comment ={
                type:superComment.type,       
                content:content, 
                relationKey:superComment.relationKey,
                parentId: superComment.id,
                commentAttachments:uploadList,
                commentAndReply:commentAndReply
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
                
                comment.showReply = false;
                this.refreshComments();
            });
        },
        //删除评论
        deleteComments (comment) {
            if(comment.id){
                this.$Modal.confirm({
                    title: "确认",
                    content: "确认删除此条评论？",
                    onOk: () => {
                        deleteComment(comment.id).then(res => {
                            if(res.success){
                                this.$Message.success(res.message);
                                this.refreshComments();
                            }
                        }).catch(err => {
                            this.$Message.success(err.data.message);
                        });
                    }
                });
            }
        },
        showUserInfo(userId) {
            getUserInfoByUserId(userId).then(res => {
                if (res.dataCount) {
                    this.userInfo = res.tableContent[0];
                }
            });
        },
        refreshComments:function () {
             this.$forceUpdate();
            var params = {
                parentId: this.superComment.id
            };
            params = Object.assign(params,this.childPage);

            getCommentsByParentId(params).then(res=>{
                this.comments = res.tableContent;
                this.superComment.childCommentNum = res.dataCount;
                res.dataCount === 0 && this.$emit('hiddenChildComments');
                if(this.comments.length<res.dataCount){
                    this.showloadMore = true;
                }
            }).then(res=>{
                if(this.isInIframe){
                    if(window.top.setInstaceCommentsIframeHeight){
                        this.$nextTick(function () {
                            setTimeout(() => {
                                window.top.setInstaceCommentsIframeHeight();
                            },200);
                        })
                    }
                }
            });
        }
        
    },
    mounted(){
        this.refreshComments();
    }
}
</script>
