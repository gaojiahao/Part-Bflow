<style lang="less" >
@import "./comments.less";
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
                    slot="userCard" :src="comment.photo?comment.photo:'resources/images/icon/defaultUserPhoto.jpg'">
                </my-pop-tip>
            </Col>

            <Col span="22" class="comments-content-item-content">

                <p><b>{{comment.creatorName}}</b></p>

                <div class="comments-content-item-content-text" v-html="comment.content">
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
                            @click.native="handleViewImg(c.attachment)">
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
                    class="comments-content-item-content-reply">
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
                        >
                    </child-comments>
                </div>

                <praises  ref="praises" :comment="comment" v-if="comment.showPraises"></praises>
            </Col>
        </Row>
    </div>
     <Modal title="查看图片" v-model="imgModalVisible" width='80%'>
        <img 
            :src="imgName" 
            v-if="imgModalVisible" style="width: 100%">
    </Modal>
 </div>

</template>

<script>

import { 
    commentThumbsUp,
    cancelCommentThumbsUp,
    saveComment,
    getComments,
    getUserInfoByUserId
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
        }
    },
    data() {
        return {
           userInfo:{},
           imgName:'',
           imgModalVisible:false
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
        },
        handleShowReply:function (comment) {
            this.$forceUpdate();
            this.comments.map(c=>{
                (c.id != comment.id) && (c.showReply = false);
                c.showPraises = false;
                c.showChilds = false;
            });

            
            if(window.top.setInstaceCommentsIframeHeight){
                window.top.setInstaceCommentsIframeHeight();
            }

            comment.showReply = !comment.showReply;
            
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
                        desc: res.message
                    });
                    return;
                }
                superComment.showReply = false;
                
                this.$refs.childComments[0].handleLoadMore();
            });
        },
        handleViewImg:function (img) {
            if(window.top.viewInsCommentsImg){
                window.top.viewInsCommentsImg(img);
            }else{
                this.imgName = img;
                this.imgModalVisible = true;
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
    mounted () {
    }
};
</script>

