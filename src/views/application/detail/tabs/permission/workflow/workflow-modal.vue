<style lang="less" scoped>
  @import './workflow-modal.less';
</style>

<template>
  <Modal v-model="showWorkFlow" title="工作流设置" width="1010" @on-ok="selectWorkFlow" :mask-closable="false" @on-visible-change="modalVisibleChange">
    <Row :gutter="8">
      <Col span="12">
      <h4 class="flow-title">所有工作流
        <Button class="create-button" @click="createWorkflow">创建工作流</Button>
      </h4>
      <Table @on-row-dblclick="addWorkflow" :loading="loadingAll" stripe height="350" :columns="allWorkFlowColumns" :data="allWorkFlowData"></Table>
      <div class="workflow-page">
        <div style="float: right;">
          <Page :total="allWorkFlowTotal" :current="allCurrentPage" :page-size="pageSize" @on-change="onPageChange" size="small" show-total></Page>
        </div>
      </div>
      </Col>
      <Col span="12">
      <h4 class="flow-title">已关联的工作流
        <Button class="create-button" @click="createWorkflow">创建工作流</Button>
      </h4>
      <Table @on-row-dblclick="deleteWorkflow" :loading="loadingRelative" stripe height="350" :columns="relativeWorkFlowColumns" :data="relativeWorkFlowData"></Table>
      <div class="workflow-page">
        <div style="float: right;">
          <Page :total="relativeWorkFlowTotal" :current="relativeCurrentPage" :page-size="pageSize" @on-change="onRelativePageChange" size="small" show-total></Page>
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
          title: "编码",
          key: "processCode"
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
          title: "编码",
          key: "processCode"
        },
        {
          title: "配置节点",
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
                    window.open('/myflow/viewFlow.html?processId='+params.row.id+'&listId='+this.listId+'&processCode='+ params.row.processCode);
                  }
                }
              },
              "配置"
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
    selectWorkFlow() {},
    //获取所有流程数据
    getAllWorkflowData() {
      this.loadingAll = true;
      getAllProcessData(this.allCurrentPage,this.pageSize).then(res => {
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
      this.allCurrentPage = currentPage;
      this.getAllWorkflowData();
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
    addWorkflow(row, index) {
      if (this.relativeWorkFlowData.length === 0) {
        this.saveWorkFlow(row);
      } else {
        for(let i=0;i<this.relativeWorkFlowData.length;i++){
          if(row.id === this.relativeWorkFlowData[i].id){
            this.$Message.warning("已有选择的工作流！");
            break;
          }else{
            this.saveWorkFlow(row);
            break;
          }
        }
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
    },
    //创建工作流
    createWorkflow() {
      window.open('/myflow/createWorkFlow.html?listId=' + this.listId + '&triggerType=create');
    }
  },
  mounted() {
    this.getAllWorkflowData();
    this.getRelativeWorkflowData();
  }
};
</script>
