<style lang="less" scoped>
    @import './workflow.less';
</style>

<template>
    <div class="app-workflow">
        <Row class="app-workflow-title">
            <h3>工作流   <a v-if="isAdminTrue" @click="showWorkFlowModal">添加工作流</a></h3>
           
        </Row>
        <Row class="app-workflow-table">
            <Table :columns="columns" :data="workflows"></Table>
        </Row>
        <!-- 工作流modal -->
        <workflow-modal @emitWorkFlowModal="emitWorkFlowModal" :deleteRelationWorkflow="deleteRelationWorkflow" :modalWorkflowStatus="showWorkFlow" @addWorkflow="addWorkflow"></workflow-modal>
    </div>
</template>

<script>
import {
  getProcessDataByListId,
  saveWorkFlowInfo
} from "@/services/appService.js";
import WorkflowModal from './workflow-modal';

export default {
  name: "workflowSource",
  components: {
    WorkflowModal
  },
  props: {
      isAdmin: Boolean
  },
  data() {
    return {
      listId: this.$route.params.listId,
      showWorkFlow: false,
      isAdminTrue: false,
      deleteRelationWorkflow: -1,
      columns: [
        {
          title: "工作流名称",
          key: "processName"
        },
        {
          title: "触发动作",
          key: "triggerType",
          render: (h,params) => {
            if(params.row.triggerType === 'create'){
              return h('span',{},'新建');
            }else if(params.row.triggerType === 'update'){
              return h('span',{},'修改');
            }else{
              return h('span',{},'');
            }
          }
        }
      ],
      workflows: []
    };
  },
  watch: {
    isAdmin: function(value) {
      const lastColumn = {
          title: "操作",
          key: "list",
          align: "center",
          render: (h,params) => {
              return h('div',[
                  h('a',{
                    on: {
                      click: () => {
                        this.deleteWorkflow(params.row, params.index);
                      }
                    }
                  },'删除'),
                  h('span',{
                      style: {
                          height: '20px',
                          borderLeft: '1px solid #39f',
                          margin: '0px 5px'
                      }
                  }),
                  h('a',{
                    on: {
                      click: () => {
                        window.open('/myflow/viewFlow.html?processId='+params.row.id+'&listId='+this.listId+'&processCode='+ params.row.processCode);
                      }
                    }
                  },'修改')
              ])
          }
        };
      if(value){
        this.isAdminTrue = true;
        if(this.columns[this.columns.length-1].title !== '操作'){
          this.columns.push(lastColumn);
        }
      }else{
        this.isAdminTrue = false;
        if(this.columns[this.columns.length-1].title === '操作'){
          this.columns.splice(this.columns.length-1,1);
        }
      }
    }
  },
  methods: {
    //获取已关联流程数据
    getRelativeWorkflowData() {
      getProcessDataByListId(this.listId).then(res => {
        this.workflows = res;
      });
    },
    //监听工作流modal返回的状态
    emitWorkFlowModal() {
      this.showWorkFlow = false;
    },
    //展示工作流modal
    showWorkFlowModal() {
      this.showWorkFlow = true;
    },
    //删除已关联的工作流
    deleteWorkflow(row, index) {
      this.$Modal.confirm({
          title: "确认",
          content: "确认删除此工作流？",
          onOk: () => {
            let params = {
              ID: row.id,
              list: 'list_process_rel',
              status: 0
            };
            saveWorkFlowInfo(params).then(res => {
              if(res.success){
                this.$Message.success(res.message);
                this.workflows.splice(index, 1);
                this.deleteRelationWorkflow++;
              }
            })
          }
      });
    },
    //监听modal添加工作流刷新
    addWorkflow() {
      this.getRelativeWorkflowData();
    }
  },
  created() {
    this.getRelativeWorkflowData();
  }
};
</script>

