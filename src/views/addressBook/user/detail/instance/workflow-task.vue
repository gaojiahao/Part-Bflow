<style lang="less" scoped>
    .workflow{
      &-detail{
        background-color: #fff;
        width: 90%;
        margin: 0 auto;
        padding: 26px 50px;
        box-shadow: 0px 1px 10px #ddd;
        position: relative;
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
          title: "应用名称",
          key: "processName"
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
          key: "handlerUnitName",
          ellipsis: true
        },
        {
          title: "创建时间",
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
            let outTime = this.calcLeadTime(params.row.startTime);
            return h('span',{},outTime);
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
    },
    //计算时间差
    calcLeadTime(date) {
      let startDate = new Date(date.replace(/-/g,"/")),
          currentDate = new Date(),
          dateDiff = currentDate.getTime() - startDate.getTime(),//时间差的毫秒数
          dayDiff = Math.floor(dateDiff/(24*3600*1000)),//相差天数
          restMilliSeconds1 = dateDiff%(24*3600*1000),//计算天数后剩余的毫秒数
          hourDiff = Math.floor(restMilliSeconds1/(3600*1000)),//计算出小时数
          restMilliSeconds2 = restMilliSeconds1%(3600*1000),//计算小时数后剩余的毫秒数
          minuteDiff = Math.floor(restMilliSeconds2/(60*1000)),//计算相差分钟数
          restMilliSeconds3 = restMilliSeconds2%(60*1000),//计算分钟数后剩余的毫秒数
          secondDiff = Math.round(restMilliSeconds3/1000),//计算出相差秒数
          outdateTime;
      outdateTime = dayDiff + '天' + hourDiff + '时' + minuteDiff + '分' + secondDiff + '秒';
      return outdateTime;
    }
  },
  mounted() {
    this.getWorkflowTaskData();
  }
};
</script>
