<style lang="less" scoped>
  @import './workflow-modal.less';
</style>

<template>
  <Modal 
    v-model="showWorkFlow" 
    title="工作流设置" 
    width="1010" 
    @on-ok="selectWorkFlow" 
    :mask-closable="false" 
    @on-visible-change="modalVisibleChange"
    :styles="{top: '20px'}">
    <Row :gutter="8">
      <Col span="12">
      <div class="flow-title">
        <b>所有工作流</b>
        <div class="app-search">
          <Input 
            @on-search="workflowFilter" 
            :search="true" 
            v-model="searchValue" 
            placeholder="搜索工作流名称" 
            style="width: 300px">
          </Input>
        </div>
      </div>
      <Table 
        @on-row-dblclick="addWorkflowData" 
        :loading="loadingAll" 
        stripe height="350" 
        :columns="allWorkFlowColumns" 
        :data="allWorkFlowData"></Table>
      <div class="workflow-page">
        <div style="float: right;">
          <Page 
            :total="allWorkFlowTotal" 
            :current="allCurrentPage" 
            :page-size="pageSize" 
            @on-change="onPageChange" 
            size="small" show-total></Page>
        </div>
      </div>
      </Col>
      <Col span="12">
      <div class="flow-title">
        <b>已关联的工作流</b>
      </div>
      <Table
        :loading="loadingRelative" 
        stripe height="350" 
        :columns="relativeWorkFlowColumns" 
        :data="relativeWorkFlowData"></Table>
      <div class="workflow-page">
        <div style="float: right;">
          <Page 
            :total="relativeWorkFlowTotal" 
            :current="relativeCurrentPage" 
            :page-size="pageSize" 
            @on-change="onRelativePageChange" 
            size="small" show-total></Page>
        </div>
      </div>
      </Col>
    </Row>
  </Modal>
</template>

<script>
import {
  getAllProcessData,
  getProcessDataByListId,
  saveWorkFlowInfo
} from "@/services//appService.js";

export default {
  name: "WorkflowModal",
  props: {
    modalWorkflowStatus: Boolean,
    deleteRelationWorkflow: Number
  },
  data() {
    return {
      listId: this.$route.params.listId,
      searchValue: '',
      showWorkFlow: false,
      relativeWorkFlowTotal: 0,
      allWorkFlowTotal: 0,
      allCurrentPage: 1,
      relativeCurrentPage: 1,
      pageSize: 10,
      loadingAll: true,
      loadingRelative: true,
      allWorkFlowColumns: [
        {
          title: "名称",
          key: "processName"
        },
        {
          title: "查看流程图",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                props: {
                  type: "default",
                  size: "small"
                },
                on: {
                  click: () => {
                    window.open('/myflow/viewProc.html?processId=' + params.row.id);
                  }
                }
              },
              "查看"
            );
          }
        }
      ],
      relativeWorkFlowColumns: [
        {
          title: "名称",
          key: "processName"
        },
        {
          title: "配置节点",
          key: "config",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    window.open('/myflow/viewFlow.html?processId='+params.row.procId+'&listId='+this.listId+'&processCode='+ params.row.processCode);
                  }
                }
              },
              "配置"
            );
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.deleteWorkflow(params.row,params.index);
                  }
                }
              },
              "删除"
            );
          }
        }
      ],
      allWorkFlowData: [],
      relativeWorkFlowData: []
    };
  },
  watch: {
    modalWorkflowStatus: function(value, oldValue) {
      this.showWorkFlow = value;
    },
    deleteRelationWorkflow: function(){
      this.getRelativeWorkflowData();
    }
  },
  methods: {
    //所有工作流查询
    workflowFilter() {
      let filter = JSON.stringify([{operator:"like",value:this.searchValue,property:"processName"}]);
      this.allCurrentPage = 1;
      this.getAllWorkflowData(filter);
    },
    selectWorkFlow() {},
    //获取所有流程数据
    getAllWorkflowData(filter) {
      this.loadingAll = true;
      getAllProcessData(this.allCurrentPage,this.pageSize,filter).then(res => {
        this.allWorkFlowData = res.tableContent;
        this.allWorkFlowTotal = res.dataCount;
        this.loadingAll = false;
      });
    },
    //获取已关联流程数据
    getRelativeWorkflowData() {
      this.loadingRelative = true;
      getProcessDataByListId(this.listId,this.relativeCurrentPage,this.pageSize).then(res => {
        this.relativeWorkFlowData = res;
        this.relativeWorkFlowTotal = res.length;
        this.loadingRelative = false;
      });
    },
    //所有工作流表格分页按钮点击事件
    onPageChange(currentPage) {
      let filter = JSON.stringify([{operator:"like",value:this.searchValue,property:"processName"}]);
      this.allCurrentPage = currentPage;
      this.getAllWorkflowData(filter);
    },
    //已关联工作流表格分页按钮点击事件
    onRelativePageChange(currentPage) {
      this.relativeCurrentPage = currentPage;
      this.getRelativeWorkflowData();
    },
    //通知父组件modal的状态
    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitWorkFlowModal", { modal: false });
      }
    },
    //添加工作流
    addWorkflowData(row, index) {
      if (this.relativeWorkFlowData.length === 0) {
        this.saveWorkFlow(row);
      } else {
        this.$Message.warning("请先删除已关联工作流再添加！");
      }
    },
    //保存工作流公共方法
    saveWorkFlow(row) {
      let params = {
          listId: this.listId,
          procCode: row.processCode,
          creator: '',
          list: 'list_process_rel',
          status: 1
        };
        saveWorkFlowInfo(params).then(res => {
          if(res.success){
            this.$Message.success(res.message);
            this.getRelativeWorkflowData();
            this.$emit('addWorkflow');
          }
        })
    },
    //删除工作流
    deleteWorkflow(row, index) {
      let params = {
        ID: row.id,
        list: 'list_process_rel',
        status: 0
      };
      saveWorkFlowInfo(params).then(res => {
        if(res.success){
          this.$Message.success(res.message);
          this.relativeWorkFlowData.splice(index, 1);
          this.$emit('addWorkflow');
        }
      })
    }
  },
  mounted() {
    this.getAllWorkflowData();
    this.getRelativeWorkflowData();
  }
};
</script>
