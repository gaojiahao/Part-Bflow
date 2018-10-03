<style lang="less" scoped>
    @import './workflow.less';
</style>

<template>
    <div class="app-workflow">
        <Row class="app-workflow-title">
            <h3>工作流
            <span 
            v-if="isAdminTrue && workflows.length===0" 
            class="app-workflow-create"
            @click="goCreateWorkflow">新建</span>  
            <!-- <Dropdown v-if="isAdminTrue && isOperationShow" @on-click="createWorkflow">
              <a href="javascript:void(0)">
                  操作
                  <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                  <DropdownItem v-show="isCreateShow" name="create">添加创建实例工作流</DropdownItem>
                  <DropdownItem v-show="isUpdateShow" name="update">添加修改实例工作流</DropdownItem>
              </DropdownMenu>
            </Dropdown> -->
            </h3>
        </Row>
        <Row class="app-workflow-table">
            <Table :columns="columns" :data="workflows" size="small"></Table>
        </Row>
    </div>
</template>

<script>
import {
  getProcessDataByListId,
  enabledForbiddenWorkFlow
} from "@/services/appService.js";

export default {
  name: "workflowSource",
  components: {
    
  },
  props: {
    isAdmin: Boolean
  },
  data() {
    return {
      listId: this.$route.params.listId,
      isAdminTrue: false,
      isOperationShow: true,
      isCreateShow: true,
      isUpdateShow: true,
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
                        window.open('/myflow/viewFlow.html?processId='+params.row.processId+'&listId='+this.listId+'&processCode='+ params.row.processCode);
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
        let triggerType = [];
        this.workflows = res;
        //控制修改或创建实例权限
        if(this.workflows.length > 0){
          this.workflows.forEach(val => {
            triggerType.push(val.triggerType);
          });
          if(/create/.test(triggerType) && /update/.test(triggerType)){
            this.isOperationShow = true;
            this.isCreateShow = true;
            this.isUpdateShow = true;
          }else if(/create/.test(triggerType)){
            this.isOperationShow = true;
            this.isCreateShow = true;
            this.isUpdateShow = false;
          }else if(/update/.test(triggerType)){
            this.isOperationShow = true;
            this.isCreateShow = false;
            this.isUpdateShow = true;
          }else{
            this.isOperationShow = false;
          }
        }
      });
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
                this.getRelativeWorkflowData();
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
    //创建工作流
    goCreateWorkflow() {
      window.open('/myflow/createWorkFlow.html?listId=' + this.listId + '&triggerType=create');
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

