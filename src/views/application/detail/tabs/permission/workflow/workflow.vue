<style lang="less" scoped>
    @import './workflow.less';
</style>

<template>
    <div class="app-workflow">
        <Row class="app-workflow-title">
            <h3>工作流   <a @click="createWorkflow">添加工作流</a></h3>
           
        </Row>
        <Row class="app-workflow-table">
            <Table :columns="columns" :data="workflows"></Table>
        </Row>
    </div>
</template>

<script>
import {
  getAssessmentByListId,
  saveAssessment
} from "@/services/appService.js";
import AssessModal from "@/components/modal/Modal";

export default {
  name: "workflowSource",
  components: {},
  props: {
    listId: String
  },
  data() {
    return {
      columns: [
        {
          title: "工作流名称",
          key: "workflowName"
        },
        {
          title: "触发动作",
          key: "action"
        },
        {
          title: "操作",
          key: "list",
          align: "center",
          render: (h,params) => {
              return h('div',[
                  h('a',{},'删除工作流'),
                  h('span',{
                      style: {
                          height: '20px',
                          borderLeft: '1px solid #39f',
                          margin: '0px 5px'
                      }
                  }),
                  h('a',{},'修改工作流')
              ])
          }
        }
      ],
      workflows: [
        { workflowName: "创建订单", action: "新建实例"},
        { workflowName: "修改订单", action: "修改实例"}
      ]
    };
  },
  methods: {
      //创建工作流
    createWorkflow() {
      window.open('/myflow/createWorkFlow.html?listId=' + this.listId);
    }
  },
  created() {},
  mounted() {}
};
</script>

