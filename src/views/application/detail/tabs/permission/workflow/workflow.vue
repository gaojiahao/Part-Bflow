<style lang="less" scoped>
    @import './workflow.less';
</style>

<template>
    <div class="app-workflow">
        <Row class="app-workflow-title">
            <h3>工作流  
            <Dropdown v-if="isAdminTrue" @on-click="createWorkflow">
              <a href="javascript:void(0)">
                  操作
                  <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                  <DropdownItem name="create">添加创建实例工作流</DropdownItem>
                  <DropdownItem name="update">添加修改实例工作流</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </h3>
        </Row>
        <Row class="app-workflow-table">
            <Table :columns="columns" :data="workflows" size="small"></Table>
        </Row>
        <!-- 工作流modal -->
        <workflow-modal @emitWorkFlowModal="emitWorkFlowModal" :deleteRelationWorkflow="deleteRelationWorkflow" :modalWorkflowStatus="showWorkFlow" @addWorkflow="addWorkflow"></workflow-modal>
    </div>
</template>

<script>
import {
  getProcessDataByListId,
  saveWorkFlowInfo,
  enabledForbiddenWorkFlow
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
          key: "processName",
          align: "left",
        },
        {
          title: "触发动作",
          key: "triggerType",
          align: "left",
          render: (h, params) => {
            if (params.row.triggerType === 'create') {
              return h("span", {}, "创建实例");
            } else  {
              return h("span", {}, "修改实例");
            }
          }
        },
         {
          title: "启用",
          key: "status",
          align: "left",
          render: (h, params) => {
            let status;
            if(params.row.status === 1){
              status = true;
            }else{
              status = false;
            }

            return h("Checkbox", {
              props: {
                value: status,
                disabled: !this.isAdminTrue
              },
              on: {
                "on-change": e => {
                  this.updateWorkFlowStaus(params);
                }
              }
            });
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
            enabledForbiddenWorkFlow(null,null,row.id).then(res => {
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
    },
    //修改应用工作流状态
    updateWorkFlowStaus(record){
      let process =  record.row,
          msContent = '';
      if(process.status === 1){
        msContent = '确认禁用该工作流？';
      }else{
        msContent = '确认启用该工作流？';
      }
      
        this.$Modal.confirm({
          title: "系统提示",
          content: msContent,
          onOk: () => {
            if(process.status === 1){
              enabledForbiddenWorkFlow(null,process.id).then(res => {
                if(res.success){
                  this.$Message.success(res.message);
                  this.getRelativeWorkflowData();
                }
              })
            }else{
              enabledForbiddenWorkFlow(process.id).then(res => {
                if(res.success){
                  this.$Message.success(res.message);
                  this.getRelativeWorkflowData();
                }
              })
            }
          }
      });
    },
    //创建修改实例工作流
    createWorkflow(name) {
      window.open('/myflow/createWorkFlow.html?listId=' + this.listId + '&triggerType=' + name);
    }
  },
  created() {
    this.getRelativeWorkflowData();
  }
};
</script>

