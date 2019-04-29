<style lang="less" scoped>
  @import "./view.less";
</style>

<template>
    <div class="knowledge">
        <Row class="knowledge-header">
          <!-- <div class="knowledge-header-mark">
            <Icon class="knowledge-header-icon" type="ios-albums" />
            <span class="knowledge-header-btn">知识库</span>
          </div> -->
          <div class="knowledge-header-drop">
              <Dropdown @on-click="onClickMenu" trigger="click" transfer>
                  <a href="javascript:void(0)">
                    <Tooltip content="更多操作" transfer placement="left-start">
                      <b class="knowledge-header-point" type="ios-arrow-down">...</b>
                    </Tooltip>
                  </a>
                  <DropdownMenu slot="list">
                      <DropdownItem name="edit">编辑知识</DropdownItem>
                      <DropdownItem name="delete">删除知识</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
          </div>
        </Row>
        <Row class="knowledge-content">
          <Row class="knowledge-title">
              <span>{{ knowledgeForm.title }}</span>
          </Row>
          <Row class="knowledge-text">
              <div ref="toolbar" style="display:none"></div>
              <div ref="text" style="display:none"></div>
              <div v-html="knowledgeForm.content" class="w-e-text"></div>
              <div class="knowledge-text-comment" v-if="comments.length>0">
                  <div>最新评论({{pageInfo.total}})</div>
                  <comments 
                      :comments="comments" 
                      :refreshRootComments="refreshComments">
                  </comments>

                  <Page 
                      style="padding-top:10px;"
                      v-if="pageInfo.total>0"
                      :total="pageInfo.total" 
                      :page-size="pageInfo.limit"
                      :current="pageInfo.page"
                      prev-text="上一页" 
                      next-text="下一页" 
                      @on-change="handlePageChange"/>
              </div>
          </Row>
        </Row>
        <Row class="knowledge-footer">
            <!-- <span class="knowledge-footer-btn" @click="editKnowledge">编辑</span>
            <span class="knowledge-footer-btn" @click="goBack">返回</span> -->
            <div style="margin-right:260px;">
              <comment-publish :listId="knowledgeId" :type="'knowledge'" @updateComment="updateComment"></comment-publish>
            </div>
        </Row>
        <add-modal ref="addModal" :modalTitle="'编辑知识'" @editUpdate="editUpdate" :knowledgeId="this.knowledgeId"></add-modal>
    </div>
</template>

<script>
import { 
  updateKnowledgeData, 
  getKnowledgeTypeDataById,
  getKnowledgeTypeData,
  saveKnowledgeData, 
  deleteKnowledgeData
  } from "@/services/knowledgeBaseService.js";
import { getComments } from "@/services/appService.js";
import commentPublish from "./knowledge-comment";
import comments from "@/components/discussion/comments";
import E from 'wangeditor';
import { EMOTION } from "@/assets/const";
import Bus from "@/assets/eventBus.js";
import AddModal from '../detail/detail';

export default {
  name: "KnowledgeView",
  components: { 
    commentPublish,
    comments,
    AddModal
  },
  data() {
    return {
      knowledgeId: this.$route.params.id,
      comments: [],
      pageInfo:{
            limit:10, 
            page:1, 
            total:0
      },
      knowledgeForm: {
        title: '',
        type: '',
        content: '',
        creator: '',
        crtTime: ''
      }
    };
  },
  watch:{
    $route: function(value){
      this.getKnowledgeDataById(value.params.id);
      this.knowledgeId = value.params.id;
      this.refreshComments();
    }
  },
  methods: {
    editUpdate() {
      Bus.$emit('refreshList');
      this.getKnowledgeDataById(this.knowledgeId);
    },
    updateComment: function() {
      this.refreshComments();
    },
    refreshComments:function () {
        let emotion = [...EMOTION];
        let reg = /\[(.+?)\]/g;
        let params = {
            relationKey:this.knowledgeId,
            sort:JSON.stringify([{property:"crtTime",direction:"DESC"}])
        };
        params = Object.assign(params,this.pageInfo);

        getComments(params).then(res=>{
             res.tableContent.forEach(item=>{
               item.content = item.content .replace(reg, (word) => {
                    // 寻找表情索引
                    let idx = emotion.findIndex(item => item === word.replace(/(\[|\])/g, ''));
                    // 没有匹配项则返回原文字
                    if (idx === -1) {
                    return word
                    }
                    return `<span class="comments-content-item-content-img-emotion" style="background-position: -${24 * idx}px 0;"></span>`
                });
            })
            this.comments = res.tableContent;
          
            this.pageInfo.total = res.dataCount;
        });
    },
    handlePageChange:function (page) {
        this.pageInfo.page = page;
        this.refreshComments();
    },
    errorimg() {
          this.knowledgeForm.photo = 'resources/images/icon/defaultUserPhoto.png';
      },
    goBack() {
      this.$router.push({path:'/knowledge/list'});
    },
    editKnowledge() {
      this.$router.push({
        name: "knowledgeDetail",
        path:`/knowledge/detail/${this.$route.params.id}`,
        params: {id: this.$route.params.id}
      });
    },
    //获取编辑知识库信息
    getKnowledgeDataById(knowledgeId) {
      getKnowledgeTypeDataById(knowledgeId).then(res => {
        this.knowledgeForm = res
        this.editor = new E(this.$refs.toolbar,this.$refs.text)
        this.editor.create();
      })
    },
    onClickMenu(name) {
      if(name === 'delete'){
        this.deleteKnowledge();
      }else{
        this.$refs['addModal'].showKnowledgeModal = true;
        this.$refs['addModal'].getKnowledgeDataById();
      }
    },
    //删除知识库数据
    deleteKnowledge() {
      let knowledgeIds = [];
      this.$Modal.confirm({
        title: "确认",
        content: `确认删除当前选择项么？`,
        onOk: () => {
          knowledgeIds.push(this.knowledgeId);
          deleteKnowledgeData(knowledgeIds)
          .then(res => {
            if (res.success) {
              this.$Message.success(res.message);
              Bus.$emit('refreshList');
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
        }
      });
    }
  },
  created() {
    this.refreshComments();
    this.getKnowledgeDataById(this.knowledgeId);
  }
};
</script>

