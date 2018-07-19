<style lang="less" scoped>
    @import './report.less';
</style>

<template>
    <div class="app-report">
        <Row class="app-report-title">
            <h3>报表</h3>
        </Row>
        <Row class="app-report-table">
            <Table :columns="columns" :data="reportSources"></Table>
            <a class="app-report-table-add" @click="goCreateView">新建报表</a>
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
  name: "reportSource",
  components: {},
  props: {
    listId: String,
    appType: String
  },
  data() {
    return {
      columns: [
        {
          title: "报表名称",
          key: "reportName"
        },
        {
          title: "视图类型",
          key: "viewType"
        },
        {
          title: "已授权用户",
          key: "user"
        },
        {
          title: "操作",
          key: "list",
          align: "center",
          render: (h,params) => {
              return h('div',[
                  h('a',{},'删除报表'),
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
                        let href = '/Site/index.html#appSetting/viewConfig/'+this.listId+'/'+params.row.viewId;
                        window.top.location.href = href;
                      }
                    }
                  },'修改报表'),
                  h('span',{
                      style: {
                          height: '20px',
                          borderLeft: '1px solid #39f',
                          margin: '0px 5px'
                      }
                  }),
                  h('a',{},'授权')
              ])
          }
        }
      ],
      reportSources: [
        { reportName: "我的销售记录", viewType: "列表",user:"业务员"},
        { reportName: "本部门销售记录", viewType: "列表",user:"销售经理"},
        { reportName: "月销量汇总", viewType: "透视表",user:"销售总监、财务经理"}
      ]
    };
  },
  methods: {
    //创建视图
    goCreateView() {
      window.top.location.href = '/Site/index.html#appSetting/'+this.listId+'/'+this.appType+'/viewTypes';
    },
  },
  created() {},
  mounted() {}
};
</script>

