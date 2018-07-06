<style lang="less" scoped>
  .flow-title{
        color: #e4393c;
        padding: 5px 4px;
        border-bottom: 2px solid #79b2ef;
        margin-bottom: 5px;
        .create-button{
          margin-left: 40px
        }
    }
  .ivu-modal-footer{
      padding: 3px 15px;
  }
  .workflow-page{
    margin: 10px;
    overflow: hidden
  }
</style>
<template>
  <Modal v-model="showWorkFlow" title="工作流设置" width="1010" @on-ok="selectWorkFlow" @on-visible-change="modalVisibleChange">
    <Row :gutter="8">
      <Col span="12">
      <h4 class="flow-title">所有工作流
        <Button class="create-button">创建工作流</Button>
      </h4>
      <Table @on-select="addWorkflow" :loading="loading" stripe height="350" :columns="allWorkFlowColumns" :data="allWorkFlowData"></Table>
      <div class="workflow-page">
        <div style="float: right;">
          <Page :total="allWorkFlowTotal" :current="allCurrentPage" :page-size="pageSize" @on-change="onPageChange" size="small" show-total></Page>
        </div>
      </div>
      </Col>
      <Col span="12">
      <h4 class="flow-title">已关联的工作流
        <Button class="create-button">创建工作流</Button>
      </h4>
      <Table :loading="loading" stripe height="350" :columns="relativeWorkFlowColumns" :data="relativeWorkFlowData"></Table>
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
  getProcessDataByListId
} from "@/services//appService.js";

export default {
  name: "WorkflowModal",
  props: {
    modalWorkflowStatus: Boolean,
    listId: String
  },
  data() {
    return {
      showWorkFlow: false,
      relativeWorkFlowTotal: 0,
      allWorkFlowTotal: 0,
      allCurrentPage: 1,
      relativeCurrentPage: 1,
      pageSize: 10,
      loading: true,
      allWorkFlowColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
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
              "Button",
              {
                props: {
                  type: "default",
                  size: "small"
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
          key: "procName"
        },
        {
          title: "编码",
          key: "procCode"
        },
        {
          title: "配置节点",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "default",
                  size: "small"
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
    }
  },
  methods: {
    selectWorkFlow() {},
    //获取所有流程数据
    getAllWorkflowData() {
      let allProcessParams = {
        page: this.allCurrentPage,
        limit: this.pageSize
      };
      this.loading = true;
      getAllProcessData(allProcessParams).then(res => {
        this.allWorkFlowData = res.tableContent;
        this.allWorkFlowTotal = res.dataCount;
        this.loading = false;
      });
    },
    //获取已关联流程数据
    getRelativeWorkflowData() {
      let relativeProcessParams = {
        page: this.relativeCurrentPage,
        limit: this.pageSize,
        listId: this.listId
      };
      this.loading = true;
      getProcessDataByListId(relativeProcessParams).then(res => {
        this.relativeWorkFlowData = res;
        this.relativeWorkFlowTotal = res.length;
        this.loading = false;
      });
    },
    //表格分页按钮点击事件
    onPageChange(currentPage) {
      this.allCurrentPage = currentPage;
      let processPage = {
        page: this.allCurrentPage,
        limit: this.pageSize
      };
      //分页加载所有流程数据
      this.loading = true;
      getAllProcessData(processPage).then(res => {
        this.allWorkFlowData = res.tableContent;
        this.allWorkFlowTotal = res.dataCount;
        this.loading = false;
      });
    },
    onRelativePageChange() {
      this.loading = false;
    },
    //通知父组件modal的状态
    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitWorkFlowModal", { modal: false });
      }
    },
    //添加工作流
    addWorkflow(selection, row) {
      let obj = {},
          selectData = this.relativeWorkFlowData.concat(selection);
      //去掉重复数据
      this.relativeWorkFlowData = selectData.reduce((cur,next) => {
        obj[next.id] ? '' : obj[next.id] = true && cur.push(next);
        return cur;
      },[]);
    }
  },
  mounted() {
    this.getAllWorkflowData();
    this.getRelativeWorkflowData();
  }
};
</script>
