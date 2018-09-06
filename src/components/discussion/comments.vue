<style lang="less">
@import "./comments.less";
</style>
<template>
<div class="discussion">
    <div class="discussion-content">
        <Row class="list">
            <div class="list-content">
                <Row class="list-content-item" 
                    v-for="(comment,index) in comments" 
                    :key="index">

                    <Col span="2" class="list-content-item-user" >
                     <my-pop-tip 
                        :userInfo="userInfo" 
                        trigger="click">
                            <img   
                            @click="showUserInfo(comment.creator)" 
                            onerror="src='resources/images/icon/defaultUserPhoto.jpg'"
                            slot="userCard" :src="comment.photo?comment.photo:'resources/images/icon/contactor.png'">
                    </my-pop-tip>
                    </Col>

                    <Col span="22" class="list-content-item-content">

                        <p><b>{{comment.creatorName}}</b></p>

                        <div class="list-content-item-content-text" 
                            v-html="comment.content">
                        </div>

                        <div class="list-content-item-img" v-if="comment.commentAttachments.length>0">
                            <img 
                            v-for="(c,index) in comment.commentAttachments" 
                            :key="index" 
                            v-if="c.type==='image'"
                            :src="c.attachment?c.attachment:'resources/images/icon/defaultUserPhoto.png'" 
                            width=100 
                            height=100>
                        </div>

                         <div class="list-content-item-file" v-if="comment.commentAttachments.length>0">
                            <p  v-for="(f,index) in comment.commentAttachments" 
                                :key="index"   
                                v-if="f.type==='file'" >
                                <a @click="handleViewFile(f)">{{f.name}}
                                </a>
                            </p>
                        </div>

                        <div class="list-content-item-content-bar" >
                            <span  class="list-content-item-content-bar-left">
                                <span>
                                    <span v-overTimeDirective="{time:comment.crtTime}"></span>发布
                                </span>
                                <span 
                                    class="cursor-pointer"
                                    @click="handleShowChilds(comment)" 
                                    v-if="comment.childCommentNum>0">|&nbsp;查看{{comment.childCommentNum}}条回复
                                    </span>
                            </span>

                            <span  class="list-content-item-content-bar-right" >
                                <span class="cursor-pointer" @click="handleShowReply(comment)"> 回复</span>
                               
                                <span v-bind:class="{ 'comment-isPraise': comment.isPraise }">
                                    <Icon type="md-thumbs-up" size=18  
                                    @click.native="handleThumbsUp(comment)"/>
                                    {{comment.praiseNum}}
                                </span>

                                 <span v-if="comment.praises.length>0" >
                                    <Icon type="ios-arrow-down" size=18 
                                    @click.native="handlerShowThumbsUpInfo(comment)"  />
                                </span>
                            </span>
                        </div>

                      
                        <div  v-if="comment.showReply || comment.showChilds" style="background-color: rgb(240, 240, 240);padding: 10px;border: 1px solid #ddd;">
                            <commentPublish 
                                v-if="comment.showReply" 
                                :handlePublish="handleReplyPublish" 
                                :superComment="comment" 
                                :ischild="true"
                                :allowFile="false"></commentPublish>

                            <child-comments 
                                v-if="comment.showChilds" 
                                :superComment ="comment"
                                :comments="comment.childComment"></child-comments>
                        </div>

                        
                        
                        <div class="list-content-item-praises" v-if="comment.showPraises">
                            <p>共<b>{{comment.praiseNum}}</b>人点赞</p>
                            <div class="list-content-item-praises-content">
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

                        
                    </Col>
                </Row>
            </div>
            
        </Row>
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
import childComments from "@/components/discussion/childComments";
import thumbsup from "@/components/discussion/thumbsup";

import comments from "./comments";
export default {
    name:'comments',
    components:{
        commentPublish,
        comments,
        MyPopTip,
        childComments,
        thumbsup
    },
    props:{
        comments:{
            type:Array,
            default:function () {
                return [];
            }
        },
        allowReply:{
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
           userInfo:{}
        };
    },
    watch:{
        
    },
    methods: {
        handlerShowThumbsUpInfo:function (comment) {
            this.$forceUpdate();
            this.comments.map(c=>{
                (c.id != comment.id) && (c.showPraises = false);
                comment.showReply = false;
                comment.showChilds = false;
            });
            comment.showPraises = !comment.showPraises;
            var params = {
                    commentId:comment.id,  
                    limit:50, 
                    page:1, 
                    sort:JSON.stringify([{property:"crtTime",direction:"DESC"}])
            }
            comment.isPraise = true;
            getCommentThumbaUps(params).then(res=>{
                comment.praises = res.tableContent;
                comment.praiseNum = res.dataCount;
            });
        },
        handleThumbsUp:function (comment) {
            commentThumbsUp({commentId:comment.id}).then(res=>{
                if(!res.success){
                    this.$Notice.warning({
                        title: '系统提示',
                        desc: '点赞,您可以尝试再次点赞或者联系企业管理员哦!'
                    });
                    return;
                }

                var params = {
                        commentId:comment.id,  
                        limit:50, 
                        page:1, 
                        sort:JSON.stringify([{property:"crtTime",direction:"DESC"}])
                }
                comment.isPraise = true;
                getCommentThumbaUps(params).then(res=>{
                    comment.praises = res.tableContent;
                    comment.praiseNum = res.dataCount;
                });
                
            });
        },
        handleShowChilds:function (comment) {
            this.$forceUpdate();
            this.comments.map(c=>{
                (c.id != comment.id) && (c.showReply = false);
                comment.showPraises = false;
            });

            comment.showChilds = !comment.showChilds;

             var params = {
                parentId:comment.id,  
                limit:50, 
                page:1, 
                sort:JSON.stringify([{property:"crtTime",direction:"DESC"}])
            };
           this.getLowerComments(params,comment);

        },
        handleShowReply:function (comment) {
            this.$forceUpdate();
            this.comments.map(c=>{
                (c.id != comment.id) && (c.showReply = false);
                c.showPraises = false;
                c.showChilds = false;
            });

            comment.showReply = !comment.showReply;
            
            if(!comment.showReply || comment.childCommentNum===0) return;

           
        },
        handleReplyPublish:function (content,uploadList,superComment,commentAndReply) {
            this.$forceUpdate();
            let comment ={
                type:superComment.type,       
                content:content, 
                relationKey:superComment.relationKey,
                parentId: superComment.id,
                commentAttachments:uploadList,
                commentAndReply:commentAndReply
            };

            superComment.showChilds = true;

            saveComment(comment).then(res=>{
                if(!res.success){
                    this.$Notice.warning({
                        title: '系统提示',
                        desc: '添加回复,请联系企业管理员!'
                    });
                    return;
                }

                var params = {
                    parentId:superComment.id,  
                    limit:50, 
                    page:1, 
                    sort:JSON.stringify([{property:"crtTime",direction:"DESC"}])
                };
                this.getLowerComments(params,superComment);
            });
            
           
        },
        handleViewFile:function (file) {
          window.open(file.attachment)  
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
    created(){
       
    },
    mounted () {
    }
};
</script>

