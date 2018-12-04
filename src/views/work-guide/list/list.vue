<style lang="less" scoped>
  @import "./list.less";
</style>

<template>
    <div class="workguide">
        <div class="workguide-toolbar">
          <span class="workguide-toolbar-add" @click="addWorkGuideData">新增</span>
          <div class="workguide-toolbar-search">
              <Input 
                @on-search="workGuideFilter" 
                :search="true" 
                v-model="searchValue" 
                placeholder="搜索" 
                style="width: 300px">
              </Input>
          </div>
        </div>
        <div class="workguide-list" id="workguideList">
          <Row class="workguide-list-item"  v-for="(workguide,index) of workGuideData" :key="index" :gutter="8">
            <div class="workguide-list-item-title">
                <b @click="editKnowledgeData(workguide,index)">{{ workguide.title }}</b>
                <span @click="deleteKnowledge(workguide,index)" class="workguide-delete">删除</span>
            </div>
            <div class="workguide-list-item-step">
                <div class="step-content" v-for="(list,idx) of workguide.workStepList" :key="idx">
                    <img :src="list.image" width="150"/>
                    <p>{{ list.comment }}</p>
                </div>
            </div>
          </Row>
        </div>
    </div>
</template>

<script>
import { getWorkGuideData,deleteWorkGuideData } from "@/services/workGuideService.js";

export default {
  name: "wokdGuideList",
  components: {},
  data() {
    return {
      currentPage: 1,
      total: 0,
      limit: 10,
      isRolling: false,
      searchValue: '',
      filter: false,
      workGuideData: []
    };
  },
  methods: {
    //作业指导查询
    workGuideFilter() {
      this.currentPage = 1;
      this.filter = true;
      this.getAllKnowledgeData();
    },
    //滚动加载
    handleScroll () {
        let scrollDiv = document.getElementById('workguideList');
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
    //获取所有作业指导数据
    getAllWorkGuideData() {
      getWorkGuideData(this.currentPage,this.limit,this.searchValue).then(res => {
        if(res.success){
          if(!this.filter){
            if(this.isRolling){
              this.workGuideData = this.workGuideData.concat(...res.tableContent);
            }else{
                this.workGuideData = res.tableContent;
            }
          }else{
            this.workGuideData = res.tableContent;
            this.filter = false
          }
          this.total = res.dataCount;
        }
      })
    },
    //新增知识库数据
    addWorkGuideData() {
      this.$router.push({
        name: "wokdGuideAdd",
        path: "/wokdGuide/add"
      });
    },
    //查看知识库数据
    editKnowledgeData(data,index){
      this.$router.push({
        name: "wokdGuideView",
        path: "/wokdGuide/view/"+data.id,
        params: {id: data.id}
      });
    },
    //删除知识库数据
    deleteKnowledge(workguide,index) {
      this.$Modal.confirm({
        title: "确认",
        content: "确认删除<b style=color:#e4393c;>"+workguide.title+"</b>么？",
        onOk: () => {
          deleteWorkGuideData(workguide.id)
          .then(res => {
            if (res.success) {
              this.$Message.success(res.message);
              this.currentPage = 1;
              this.workGuideData.splice(index,1);
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
        }
      });
    }
  },
  mounted() {
    this.getAllWorkGuideData();
    this.handleScroll();
  }
};
</script>

