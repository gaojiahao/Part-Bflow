<style lang="less" scoped>
  @import "./list.less";
</style>

<template>
    <div class="knowledge">
        <div class="knowledge-toolbar">
          <div class="first-bar">
            <span class="knowledge-toolbar-all">所有知识</span>
            <span class="knowledge-toolbar-add" @click="addKnowledge">
              <Icon class="add-icon" type="md-add-circle" />
              <b>添加知识</b>
            </span>
          </div>
          <div class="knowledge-toolbar-search">
              <Input 
                @on-search="knowledgeFilter" 
                :search="true" 
                v-model="searchValue" 
                placeholder="搜索" 
                style="width: 259px">
              </Input>
          </div>
        </div>
        <div class="knowledge-list" id="knowledgeList">
            <div 
              @click="editKnowledgeData(knowledge,index)" 
              :class="{'knowledge-list-item':true,'active-item':index === currentIndex}" 
              v-for="(knowledge,index) of knowledgeData" 
              :key="index">
                <div class="knowledge-img">
                  <img 
                    @error="errorimg(knowledge,index)" 
                    :src="knowledge.photo?knowledge.photo:'resources/images/icon/defaultUserPhoto.png'"/>
                </div>
                <div class="knowledge-list-desc">
                  <div class="knowledge-list-title">
                      <span>{{ knowledge.title }}</span>
                  </div>
                  <span>{{ knowledge.creator }}</span>
                  <span>{{ knowledge.crtTime }}</span>
                </div>
            </div>
            <add-modal ref="addModal" :modalTitle="'添加知识'" :knowledgeId="false"></add-modal>
        </div>
    </div>
</template>

<script>
import { getKnowledgeData } from "@/services/knowledgeBaseService.js";
import AddModal from '../detail/detail';
import Bus from "@/assets/eventBus.js";

export default {
  name: "KnowledgeBase",
  components: {
    AddModal
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      limit: 10,
      isRolling: false,
      currentIndex: 0,
      searchValue: '',
      filter: false,
      isFirst: true,
      knowledgeData: []
    };
  },
  methods: {
    errorimg(knowledge,index) {
        this.knowledgeData[index].photo = 'resources/images/icon/defaultUserPhoto.png';
    },
    addKnowledge(){
      this.$refs['addModal'].showKnowledgeModal = true;
      this.$refs['addModal'].knowledgeForm.content = '';
      this.$refs['addModal'].editor.txt.html('<span></span>');
      this.$refs['addModal'].$refs['formValidate'].resetFields();
    },
    //知识库查询
    knowledgeFilter() {
      this.currentPage = 1;
      this.filter = true;
      this.isFirst = true;
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
          if(this.isFirst){
            if(this.knowledgeData.length > 0){
              this.$router.push({ path: '/knowledge/knowledgeList/view/' + this.knowledgeData[0].id});
              this.currentIndex = 0;
              this.isFirst = false;
            }
          } 
          
          this.total = res.dataCount;
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
    //查看知识库数据
    editKnowledgeData(data,index){
      this.currentIndex = index;
      this.$router.push({
        path: `/knowledge/knowledgeList/view/${data.id}`,
        params: {id: data.id}
      });
    }
  },
  mounted() {
    this.handleScroll();
    Bus.$on('refreshList',() => {
      this.isFirst = true;
      this.getAllKnowledgeData();
    })
    Bus.$on('addUpdate',(data) => {
      this.isFirst = true;
      this.getAllKnowledgeData();
    })
  },
  created() {
    this.getAllKnowledgeData();
  }
};
</script>

