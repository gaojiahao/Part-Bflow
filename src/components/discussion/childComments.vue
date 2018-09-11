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
                <span v-html="comment.content"></span>
            </p>
            <p >
                <span v-overTimeDirective="{time:comment.crtTime}"></span>
                <span class="fr">
                    <span  class="cursor-pointer" @click="handleShowReply(comment)">回复</span>
                    
                    <span  class="cursor-pointer" v-bind:class="{ 'comment-isPraise': comment.isPraise }">
                        <Icon 
                        type="md-thumbs-up" 
                        size=18  
                        @click="handleThumbsUp(comment)"/>
                        {{comment.praises.length}}
                    </span>
                    <span  class="cursor-pointer" v-if="comment.praises.length>0" >
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
                :ischild="true"></commentPublish>

            <div class="praises" v-if="comment.showPraises">
                <p>共<b>{{comment.praises.length}}</b>人点赞</p>
                <div class="praises-content">
                    <my-pop-tip :userInfo="userInfo" trigger="click">
                        <img 
                            @click="showUserInfo(p.creator)"
                            slot="userCard"
                            onerror="src='resources/images/icon/defaultUserPhoto.jpg'"
                            v-for="(p,index) in comment.praises" 
                            :key="index" 
                            :src="p.photo?p.photo:'resources/images/icon/defaultUserPhoto.jpg'" 
                            width=40>
                    </my-pop-tip>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

import { 
    commentThumbsUp,
    getCommentThumbaUps,
    saveComment,
    getComments,
    getCommentsByParentId,
    getUserInfoByUserId
    } from "@/services/appService.js";

import MyPopTip from "@/components/poptip/MyPopTip";
import commentPublish from "@/components/discussion/publish";
export default {
    name:'childComments',
    components:{
        MyPopTip,
        commentPublish
    },
    props:{
        comments:{
            type:Array,
            default:function () {
                return []
            }
        },
        superComment:{
            type:Object,
            default:function () {
                return {}
            }
        },
    },
     data() {
        return {
           userInfo:{},
           cmtsMap:{}
        };
    },
    methods:{
         handlerShowThumbsUpInfo:function (comment) {
            this.$forceUpdate();
            this.comments.map(c=>{
                (c.id != comment.id) && (c.showPraises = false);
                comment.showReply = false;
            });
            comment.showPraises = !comment.showPraises;
        },
        handleThumbsUp:function (comment) {
            let commentId = comment.id;
            commentThumbsUp({commentId:commentId}).then(res=>{
                if(!res.success){
                    this.$Notice.warning({
                        title: '系统提示',
                        desc: '点赞,您可以尝试再次点赞或者联系企业管理员哦!'
                    });
                    return;
                }

                var params = {
                        commentId:commentId,  
                        limit:50, 
                        page:1, 
                        sort:JSON.stringify([{property:"crtTime",direction:"DESC"}])
                }
                comment.isPraise = true;
                getCommentThumbaUps(params).then(res=>{
                    comment.praises = res.tableContent;
                });
                
            });
        },
        handleShowReply:function (comment) {
            this.$forceUpdate();
            this.comments.map(c=>{
                (c.id != comment.id) && (c.showReply = false);
                comment.showPraises = false;
            });

            comment.showReply = !comment.showReply;
        },
        handleReplyPublish:function (content,uploadList,superComment,commentAndReply) {
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
                        desc: '添加回复,请联系企业管理员!'
                    });
                    return;
                }
                var params = {
                    parentId:this.superComment.id,  
                    limit:50, 
                    page:1, 
                    sort:JSON.stringify([{property:"crtTime",direction:"DESC"}])
                };
                this.getLowerComments(params,this.superComment);
            });
            
           
        },
        showUserInfo(userId) {
            getUserInfoByUserId(userId).then(res => {
                if (res.dataCount) {
                this.userInfo = res.tableContent[0];
                }
            });
        },
         getLowerComments:function (params,comment) {
            getCommentsByParentId(params).then(res=>{
                comment.childComment = res.tableContent;
                comment.childCommentNum = res.dataCount;
            });
        }
        
    },
    mounted(){
       
    }
}
</script>
