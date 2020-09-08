<style lang="less" scoped>
@import "./comments.less";
.handle-view-img /deep/ .ivu-modal-body{
    text-align: center;
    overflow: auto;
    height: 550px;
}
</style>
<template>
<div class="comments">
    <div class="commnets-content">
        <Row 
            class="comments-content-item" 
            v-for="(comment,index) in comments" 
            :key="index">

            <Col span="2" class="comments-content-item-user" >
                <my-pop-tip 
                :userInfo="userInfo" 
                trigger="click">
                    <img   
                    @click="showUserInfo(comment.creator)"
                    @error="errorimg(comment)" 
                    slot="userCard" :src="comment.photo?comment.photo:'https://lab.roletask.com/resource/common-icon/male.png'">
                </my-pop-tip>
            </Col>

            <Col span="22" class="comments-content-item-content">

                <p><b>{{comment.creatorName}}</b></p>

                <div class="comments-content-item-content-text "  @click="handleViewTextImg($event)" v-html="formatToEmotion(comment.content)">
                </div>

                <div class="comments-content-item-img" v-if="comment.commentAttachments.length>0">
                    <div 
                        class="comimg"
                        v-for="(c,index) in comment.commentAttachments" 
                        :key="index" 
                        v-if="c.type==='image'">
                        <img 
                        :src="c.attachment?c.attachment:'resources/images/icon/defaultUserPhoto.png'" 
                        >
                        <div class="comimg-cover">
                            <Icon 
                            type="ios-eye-outline" 
                            @click.native="handleViewImg(c.attachment,$event)">
                            </Icon>
                        </div>
                    </div>
                </div>

                <div class="comments-content-item-file" v-if="comment.commentAttachments.length>0">
                    <p  v-for="(f,index) in comment.commentAttachments" 
                        :key="index"   
                        v-if="f.type==='file'" >
                        <a @click="handleViewFile(f)">{{f.name}}
                        </a>
                    </p>
                </div>

                <div class="comments-content-item-content-bar" >
                    <span  class="comments-content-item-content-bar-left">
                        <span>
                            {{comment.times}}
                        </span>
                        <span 
                            class="cursor-pointer"
                            @click="handleShowChilds(comment)" 
                            v-if="comment.childCommentNum>0">|&nbsp;查看<strong> {{comment.childCommentNum}}</strong>条回复
                        </span>
                        <span 
                            v-if="$currentUser.userId == comment.creator" 
                            @click="deleteComments(comment)" 
                            class="comments-delete">
                            <span style="color:#333">|&nbsp;</span>删除</span>
                    </span>

                    <span  class="comments-content-item-content-bar-right" >
                        <span class="cursor-pointer" @click="handleShowReply(comment)"> 回复</span>
                        
                        <span v-bind:class="{ 'comment-isPraise': comment.isPraise }">
                            <Icon 
                                type="md-thumbs-up" 
                                size=18  
                                @click.native="handleThumbsUp(comment)"/>
                            {{comment.praiseNum}}
                        </span>

                        <span v-if="comment.praiseNum>0" >
                            <Icon 
                                type="ios-arrow-down" 
                                size=18 
                                @click.native="handlerShowThumbsUpInfo(comment)"  />
                        </span>
                    </span>
                </div>

                <div  v-if="comment.showReply || comment.showChilds" 
                    class="comments-content-item-content-reply" @click="handleViewTextImg($event)">
                    <commentPublish 
                        v-if="comment.showReply" 
                        :handlePublish="handleReplyPublish" 
                        :superComment="comment" 
                        :ischild="true"
                        :allowFile="false">
                    </commentPublish>

                    <child-comments 
                        class="martop5"
                        ref="childComments"
                        v-if="comment.showChilds" 
                        :superComment ="comment"
                        :isInIframe="isInIframe"
                        @hiddenChildComments="hiddenChildComments"
                        >
                    </child-comments>
                </div>

                <praises  ref="praises" :comment="comment" v-if="comment.showPraises"></praises>
            </Col>
        </Row>
    </div>
 </div>

</template>

<script>

import { 
    commentThumbsUp,
    cancelCommentThumbsUp,
    saveComment,
    getComments,
    getUserInfoByUserId,
    deleteComment
    } from "@/services/appService.js";

import MyPopTip from "@/components/poptip/MyPopTip";
import commentPublish from "@/components/discussion/publish";
import childComments from "@/components/discussion/childComments";
import praises from "@/components/discussion/praises";
import comments from "./comments";
export default {
    name:'comments',
    components:{
        commentPublish,
        MyPopTip,
        childComments,
        praises
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
        },
        isInIframe:{
            type:Boolean,
            default:false
        },
        refreshRootComments: {
            type: Function
        }
    },
    data() {
        return {
           userInfo:{},
           imgName:'',
        };
    },
    watch:{
        
    },
    methods: {
        hiddenChildComments () {
            this.$emit('refreshDeleteComments');
        },
        errorimg(comment) {
            comment.photo = 'https://lab.roletask.com/resource/common-icon/male.png';
        },
        handlerShowThumbsUpInfo:function (comment) {
            this.$forceUpdate();
            this.comments.map(c=>{
                (c.id != comment.id) && (c.showPraises = false);
                comment.showReply = false;
                comment.showChilds = false;
            });
            comment.showPraises = !comment.showPraises;
        },
        handleThumbsUp:function (comment) {
            this.$forceUpdate();

            if(comment.isPraise){
                
                 cancelCommentThumbsUp(comment.id).then(res=>{
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
                    comment.isPraise = false;
                    comment.praiseNum--;
                });
            }else{
                 commentThumbsUp({commentId:comment.id}).then(res=>{
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
            }

           
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
                                this.$emit('refreshDeleteComments');
                            }
                        }).catch(err => {
                            this.$Message.success(err.data.message);
                        });
                    }
                });
            }
        },
        handleShowChilds:function (comment) {
            this.$forceUpdate();
            this.comments.map(c=>{
                if(c.id != comment.id){
                    c.showReply = false;
                    c.showChilds = false;
                }
                c.showPraises = false;
            });
            comment.showChilds = !comment.showChilds;
            if(window.top.setInstaceCommentsIframeHeight){
                this.$nextTick(function () {
                    setTimeout(() => {
                        window.top.setInstaceCommentsIframeHeight();
                    },200);
                })
            }
        },
        handleShowReply:function (comment) {
            this.$forceUpdate();
            this.comments.map(c=>{
                (c.id != comment.id) && (c.showReply = false);
                c.showPraises = false;
                c.showChilds = false;
            });

            
            if(window.top.setInstaceCommentsIframeHeight){
                this.$nextTick(function () {
                    setTimeout(() => {
                        window.top.setInstaceCommentsIframeHeight();
                    },200);
                })
            }

            comment.showReply = !comment.showReply;
            
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

            superComment.showChilds = true;
        
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

                superComment.showReply = false;
                
                if(this.$refs.childComments[0]){
                    this.$refs.childComments[0].handleLoadMore();
                }else{
                    this.refreshRootComments();
                }
            });
        },
        handleViewTextImg:function(event){
            var tagName = event.target.tagName;

            if(tagName === 'A' && !!event.target.getAttribute('href')){
                event.preventDefault();
                window.open(event.target.getAttribute('href'));
            }

            if(tagName === 'IMG' && !~event.target.getAttribute('src').indexOf('resources/images')){
                this.handleViewImg(event.target.getAttribute('src'));
            }
        },
        handleViewImg:function (img,e) {
            if(window.top.viewInsCommentsImg){
                window.top.viewInsCommentsImg(img);
            }else{
                this.getApp().showImgModal(img);
            }
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
        }
    },
    created(){
       
    },
    mounted () {}
};
</script>

