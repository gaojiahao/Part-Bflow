<style lang="less" scoped>
  @import "./list.less";
</style>

<template>
    <div class="knowledge">
        <div class="knowledge-toolbar">
          <span class="knowledge-toolbar-add" @click="addKnowledgeData">新增</span>
          <div class="knowledge-toolbar-search">
              <Input 
                @on-search="knowledgeFilter" 
                :search="true" 
                v-model="searchValue" 
                placeholder="搜索" 
                style="width: 300px">
              </Input>
          </div>
        </div>
        <div class="knowledge-list" id="knowledgeList">
          <Row class="knowledge-list-item"  v-for="(knowledge,index) of knowledgeData":key="index" :gutter="8">
              <Col :span="knowledge.img?'22':'24'">
                <div class="knowledge-list-item-title">
                  <b @click="editKnowledgeData(knowledge,index)">{{ knowledge.title }}</b>
                  <span @click="deleteKnowledge(knowledge,index)" class="knowledge-delete">删除</span>
                </div>
                <p v-html="knowledge.content"></p>
                <span>{{ knowledge.creator }}</span>
                <span>{{ knowledge.crtTime }}</span>
              </Col>
              <Col :span="knowledge.img?'2':'0'">
                <div class="knowledge-img">
                  <img :src="knowledge.img" />
                </div>
              </Col>
          </Row>
        </div>
    </div>
</template>

<script>
import { getKnowledgeData, deleteKnowledgeData } from "@/services/knowledgeBaseService.js";

export default {
  name: "KnowledgeBase",
  components: {},
  data() {
    return {
      currentPage: 1,
      total: 0,
      limit: 10,
      isRolling: false,
      searchValue: '',
      filter: false,
      knowledgeData: []
    };
  },
  methods: {
    //知识库查询
    knowledgeFilter() {
      this.currentPage = 1;
      this.filter = true;
      this.getAllKnowledgeData();
    },
    //滚动加载
    handleScroll () {
        let scrollDiv = document.getElementById('knowledgeList');
        scrollDiv.addEventListener('scroll', () => {
            if(Math.ceil(scrollDiv.clientHeight+scrollDiv.scrollTop) +2 >= scrollDiv.scrollHeight){
                if(this.total > this.knowledgeData.length){
                    this.currentPage++;
                    this.isRolling = true;
                    this.getAllKnowledgeData();
                }else{
                  this.isRolling = false;
                }
            }
        });
    },
    //获取所有知识库数据
    getAllKnowledgeData() {
      getKnowledgeData(this.currentPage,this.limit,this.searchValue).then(res => {
        if(res.success){
          if(!this.filter){
            if(this.isRolling){
              this.knowledgeData = this.knowledgeData.concat(...res.tableContent);
            }else{
                this.knowledgeData = res.tableContent;
            }
          }else{
            this.knowledgeData = res.tableContent;
            this.filter = false
          }
          
          this.total = res.dataCount;
          this.knowledgeData.forEach((val) => {
            if(!val.img){
              val.img = this.getString(val.content);
              val.content = this.deleteImg(val.content);
            }
          });
        }
      })
    },
    //新增知识库数据
    addKnowledgeData() {
      this.$router.push({
        name: "knowledgeAdd",
        path: "/knowledge/add"
      });
    },
    //修改知识库数据
    editKnowledgeData(data,index){
      this.$router.push({
        name: "knowledgeView",
        path: `/knowledge/view/${data.id}`,
        params: {id: data.id}
      });
    },
    //删除知识库数据
    deleteKnowledge(knowledge,index) {
      let knowledgeIds = [];
      this.$Modal.confirm({
        title: "确认",
        content: `确认删除<b style=color:#e4393c;>${knowledge.title}</b>么？`,
        onOk: () => {
          knowledgeIds.push(knowledge.id);
          deleteKnowledgeData(knowledgeIds)
          .then(res => {
            if (res.success) {
              this.$Message.success(res.message);
              this.currentPage = 1;
              this.knowledgeData.splice(index,1);
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
        }
      });
    },
    //截取指定字符串
    getString(str) {
      let firstIndex,firstString,secondIndex,resultStr;
      if(str){
        if(str.indexOf('img') > -1){
          firstIndex = str.indexOf('img');
          firstString = str.slice(firstIndex+9);
          secondIndex = firstString.indexOf('"');
          resultStr = firstString.slice(0,secondIndex);
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
    this.handleScroll();
  }
};
</script>

