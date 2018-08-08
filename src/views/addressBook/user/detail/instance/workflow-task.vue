<style lang="less">
    .workflow{
      &-detail{
        background-color: #fff;
        margin: 15px 93px;
        padding: 26px 50px;
        box-shadow: 0px 1px 10px #ddd;
      }
  }
  .user-page {
    margin: 10px;
    overflow: hidden;
  }
</style>

<template>
    <div class="workflow">
        <div class="workflow-detail">
            <Table ref="selection" :columns="columns" :loading="loading" :data="worlflowTaskData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page @on-page-size-change="onPageSizeChange" :total="total" show-elevator show-sizer :current="currentPage" :page-size="pageSize" @on-change="onPageChange" size="small" show-total></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getWorkFlowTaskByUserId } from "@/services/addressBookService.js";

export default {
  name: "workflowTask",
  components: {},
  props: {},
  data() {
    return {
      userId: this.$route.params.userId,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      loading: true,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "任务编号",
          key: "taskId",
          render: (h,params) => {
              let isDot = true;
              if(params.row.type === 1){
                  isDot = false;
              }
              return h('div',[
                  h('Badge',{
                      props: {
                          dot: isDot
                      },
                      style:{
                          marginRight: '5px',
                          paddingBottom: '8px'
                      }
                  }),
                  h('span',{},params.row.taskId)
              ]);
          }
        },
        {
          title: "流程交易号",
          key: "businessKey",
          render: (h,params) => {
              return h('a',{
                  on: {
                      click: () => {
                          window.open("/Form/index.html?data=" + params.row.businessKey);
                      }
                  }
              },params.row.businessKey);
          }
        },
        {
          title: "操作名称",
          key: "nodeName",
          render: (h,params) => {
              return h('a',{
                  on: {
                      click: () => {
                          window.open("/Form/index.html?data=" + params.row.businessKey);
                      }
                  }
              },params.row.nodeName);
          }
        },
        {
          title: "流程名称",
          key: "processName"
        },
        {
          title: "流程版本号",
          key: "procDefId",
          render: (h,params) => {
              let workflowDefId = params.row.procDefId.split(':')[1];
              return h('span',{},workflowDefId);
          }
        },
        {
          title: "经办人",
          key: "handlerName2"
        },
        {
          title: "发起人",
          key: "crtName"
        },
        {
          title: "部门",
          key: "handlerUnitName"
        },
        {
          title: "待办创建时间",
          key: "startTime"
        },
        {
          title: "表单状态",
          key: "baseinfoStatus",
          render: (h,params) => {
              if(params.row.baseinfoStatus === 0){
                  return h('b',{
                    style: {
                        color: '#999'
                    }
                },'草稿');
              }else if(params.row.baseinfoStatus === 1){
                  return h('b',{
                    style: {
                        color: '#e4393c'
                    }
                },'已生效');
              }else{
                  return h('b',{
                    style: {
                        color: '#19be6b'
                    }
                },'进行中');
              }
          }
        },
        {
          title: "已过时间",
          key: "orig",
          render: (h,params) => {
              let outDate = '',
                  outYear,outMonth,outDay,outH,outM,outS;
              outYear = new Date().getFullYear() - new Date(params.row.startTime).getFullYear();
              outMonth = new Date().getMonth() - new Date(params.row.startTime).getMonth();
              outDay = new Date().getDate() - new Date(params.row.startTime).getDate();
              outH = new Date().getHours() - new Date(params.row.startTime).getHours();
              outM = new Date().getMinutes() - new Date(params.row.startTime).getMinutes();
              outS = new Date().getSeconds() - new Date(params.row.startTime).getSeconds();
              outDate = (outYear*365+outMonth*30+outDay)+'天'+outH+'时'+outM+'分'+outS+'秒';
              return h('span',{},outDate);
          }
        }
      ],
      worlflowTaskData: []
    };
  },
  methods: {
    //获取工作流任务数据
    getWorkflowTaskData() {
      if(this.userId){
        this.loading = true;
        getWorkFlowTaskByUserId(this.userId,this.currentPage,this.pageSize).then(res => {
          this.worlflowTaskData = res.tableContent;
          this.total = res.dataCount;
          this.loading = false;
        })
      }else{
          this.loading = false;
      }
    },
    //点击分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getWorkflowTaskData();
    },
    //点击切换每页显示条数
    onPageSizeChange(size) {
      this.pageSize = size;
      this.getWorkflowTaskData();
    }
  },
  mounted() {
    this.getWorkflowTaskData();
  }
};
</script>
