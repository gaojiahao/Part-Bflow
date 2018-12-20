<style lang="less" scoped>
  @import "./view.less";
</style>

<template>
    <div class="knowledge">
        <Row class="knowledge-title">
            <span>{{ knowledgeForm.title }}</span>
        </Row>
        <Row class="knowledge-desc">
            <img :src="knowledgeForm.photo"/>
            <span class="knowledge-desc-type">{{ knowledgeForm.typeName }}</span>
            <span class="knowledge-desc-creator">{{ knowledgeForm.creator }}</span>
            <span class="knowledge-desc-crtTime">{{ knowledgeForm.crtTime }}</span>
        </Row>
        <Row class="knowledge-content">
            <div ref="editor" class="knowledge-content-desc"></div>
            <div v-html="knowledgeForm.content" class="w-e-text"></div>
            <knowledge-comments></knowledge-comments>
        </Row>
        <Row class="knowledge-toolbar">
            <span class="knowledge-toolbar-btn" @click="editKnowledge">编辑</span>
            <span class="knowledge-toolbar-btn" @click="goBack">返回</span>
        </Row>
    </div>
</template>

<script>
import { 
  updateKnowledgeData, 
  getKnowledgeTypeDataById,
  getKnowledgeTypeData,
  saveKnowledgeData
  } from "@/services/knowledgeBaseService.js";
import KnowledgeComments from './knowledge-comments.vue';
import E from 'wangeditor';

export default {
  name: "KnowledgeView",
  components: { KnowledgeComments },
  data() {
    return {
      knowledgeId: this.$route.params.id,
      knowledgeForm: {
        title: '',
        type: '',
        content: '',
        creator: '',
        crtTime: ''
      }
    };
  },
  methods: {
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
    getKnowledgeDataById() {
      getKnowledgeTypeDataById(this.knowledgeId).then(res => {
        this.knowledgeForm = res
        this.editor = new E(this.$refs.editor)
        this.editor.create();
      })
    }
  },
  created() {
    this.getKnowledgeDataById();
  }
};
</script>

