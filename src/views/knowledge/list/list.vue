<style lang="less" scoped>
  @import "./list.less";
</style>

<template>
    <div class="knowledge">
        <div class="knowledge-toolbar">
          <span class="knowledge-add" @click="addKnowledgeData">新增</span>
        </div>
        <div class="knowledge-list">
          <Row class="knowledge-list-item"  v-for="(knowledge,index) of knowledgeData":key="index" :gutter="8">
              <Col :span="knowledge.img?'22':'24'">
                <h2 @click="editKnowledgeData(knowledge,index)">{{ knowledge.title }}</h2>
                <p v-html="knowledge.content"></p>
                <span>{{ knowledge.creator }}</span>
                <span>{{ knowledge.crtTime }}</span>
              </Col>
              <Col :span="knowledge.img?'2':'0'">
                <div class="knowledge-img">
                  <div v-html="knowledge.img"></div>
                </div>
              </Col>
          </Row>
        </div>
    </div>
</template>

<script>
import { getKnowledgeData } from "@/services/knowledgeBaseService.js";

export default {
  name: "KnowledgeBase",
  components: {},
  data() {
    return {
      knowledgeData: []
    };
  },
  methods: {
    //获取所有知识库数据
    getAllKnowledgeData() {
      getKnowledgeData().then(res => {
        if(res.success){
          this.knowledgeData = res.tableContent;
          this.knowledgeData.forEach((val) => {
            val.img = this.getString(val.content);
            val.content = this.deleteImg(val.content);
          })
        }
      })
    },
    //新增知识库数据
    addKnowledgeData() {
      this.$router.push({
        name: "knowledgeDetail",
        path: "/knowledge/detail",
        params: {}
      });
    },
    //修改知识库数据
    editKnowledgeData(data,index){
      this.$router.push({
        name: "knowledgeDetail",
        path: "/knowledge/detail",
        params: { id: data.id }
      });
    },
    //截取指定字符串
    getString(str) {
      let firstIndex,firstString,secondIndex,resultStr;
      if(str){
        if(str.indexOf('img') > -1){
          firstIndex = str.indexOf('img');
          firstString = str.slice(firstIndex-1);
          secondIndex = firstString.indexOf('>');
          resultStr = firstString.slice(0,secondIndex+1);
        }else{
          resultStr = '';
        }
      }
      return resultStr;
    },
    //去掉img
    deleteImg(str) {
      let firstIndex,firstString,secondIndex,resultStr;
      if(str){
        if(str.indexOf('img') > -1){
          firstIndex = str.indexOf('img');
          firstString = str.slice(firstIndex-1);
          secondIndex = firstString.indexOf('>');
          resultStr = firstString.slice(0,secondIndex+1);
          resultStr = str.replace(resultStr,"");
          this.deleteImg(resultStr)
        }else{
          resultStr = str;
        }
      }
      return resultStr;
    }
  },
  mounted() {
    this.getAllKnowledgeData();
  }
};
</script>

