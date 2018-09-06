<style lang="less" scoped>
@import "./user-comments.less";
</style>

<template>
  <div class="bg_ff ">
        <Row class="app-resource-group-title">
            <h3>评论 </h3>
        </Row>
        <Row class="comments">
            <commentPublish :handlePublish="handlePublish" ></commentPublish>

            <div class="comments-header martop10" v-if="comments.length>0">
                <strong>最新评论({{pageInfo.total}})</strong>
            </div>

            <comments :comments="comments" :refreshRootComments="refreshComments"></comments>

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
        listId:this.$route.params.listId,
        type:'list',
        comments:[],
        commentsCount:0,
        pageInfo:{
            limit:10, 
            page:1, 
            total:0
        }
    };
  },
 
  methods: {
    handlePublish:function (content,uploadList) {
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
                    desc: '添加评论失败,请联系企业管理员!'
                });
                return;
            }
            this.refreshComments();
        });
    },
    refreshComments:function () {
        var params = {
                relationKey:this.listId,
                sort:JSON.stringify([{property:"crtTime",direction:"DESC"}])
        }
        params = Object.assign(params,this.pageInfo)

        getComments(params).then(res=>{
            this.comments = res.tableContent;
          
            this.pageInfo.total = res.dataCount;
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

