<style lang="less" scoped>
    @import './report.less';
</style>

<template>
    <div class="app-report">
        <Row class="app-resource-group-title">
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
  getAppviews,
  deleteAppViews,
  saveDefaultView
} from "@/services/appService.js";
import AssessModal from "@/components/modal/Modal";

export default {
  name: "reportSource",
  components: {},
  props: {
    appType: String
  },
  data() {
    return {
      listId: this.$route.params.listId,
      columns: [
        {
          title: "报表名称",
          key: "title"
        },
        {
          title: "视图类型",
          key: "viewType",
          render: (h, params) => {
            if(params.row.type === 'normal'){
              return h('span',{},'列表')
            }
          }
        },
        {
          title: "已授权用户",
          key: "user"
        },
        {
          title: "默认视图",
          key: "isDefault",
          width: 100,
          align: "center",
          render: (h, params) => {
            let defaultView = false;
            if (params.row.isDefault === 1) {
              defaultView = true;
            }
            return h("Radio", {
              props: {
                value: defaultView
              },
              on: {
                "on-change": e => {
                  this.onClickDefaultView(params);
                }
              }
            });
          }
        },
        {
          title: "操作",
          key: "list",
          align: "center",
          render: (h,params) => {
              return h('div',[
                  h('a',{
                    on: {
                        click: () => {
                          this.deleteViews(params, params.index)
                        }
                      }
                  },'删除报表'),
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
      reportSources: []
    };
  },
  methods: {
    //创建视图
    goCreateView() {
      window.top.location.href = '/Site/index.html#appSetting/'+this.listId+'/'+this.appType+'/viewTypes';
    },
     //获取视图数据
    getViewsData() {
      let params = {
        filter: JSON.stringify([
          { operator: "eq", value: this.listId, property: "uniqueId" },
          { operator: "eq", value: 1, property: "listViewStatus" }
        ])
      };
      getAppviews(params).then(res => {
        this.reportSources = res.tableContent;
      });
    },
    deleteViews(params, index) {
      if (this.reportSources.length === 1) {
        this.$Message.warning("不可删除唯一视图！");
      } else {
        if (params.row.isDefault === 1) {
          //调接口设置任意视图为默认视图并更新应用菜单url
          let deleteParams = {
            viewId: params.row.viewId,
            listId: this.listId
          };
          this.$Modal.confirm({
            title: "确认",
            content: '确认删除此视图？',
            onOk: () => {
              deleteAppViews(deleteParams).then(res => {
                if (res.success) {
                  this.reportSources.splice(index, 1);
                  let defaultParams = {
                    viewId: this.reportSources[0].viewId,
                    listId: this.listId
                  };
                  saveDefaultView(defaultParams).then(res => {
                    if (res.success) {
                      this.reloadViewData();
                    }
                  });
                }
              });
            }
          });
        }else{
          let deleteParams = {
            viewId: params.row.viewId,
            listId: this.listId
          };
          this.$Modal.confirm({
            title: "确认",
            content: '确认设置此视图为默认视图？',
            onOk: () => {
              deleteAppViews(deleteParams).then(res => {
                if (res.success) {
                  this.reportSources.splice(index, 1);
                  this.$Message.success(res.message);
                }
              });
            }
          });
        }
      }
    },
    //重新加载视图数据并渲染默认视图
    reloadViewData() {
      let dataParams = {
        filter: JSON.stringify([
          {
            operator: "eq",
            value: this.listId,
            property: "uniqueId"
          },
          {
            operator: "eq",
            value: 1,
            property: "listViewStatus"
          }
        ])
      };
      getAppviews(dataParams).then(res => {
        this.reportSources = res.tableContent;
        this.reRenderDefaultView();
      });
    },
    //点击默认视图方法
    onClickDefaultView(params) {
      this.$Modal.confirm({
        title: "确认",
        content: '确认设置此视图为默认视图？',
        onOk: () => {
          this.setDefaultViews(params);
        },
        onCancel: () => {
          this.reRenderDefaultView();
        }
      });
    },
    //设置默认视图并重新渲染columns
    setDefaultViews(params) {
      let defaultParams = {
        viewId: params.row.viewId,
        listId: this.listId
      };
      saveDefaultView(defaultParams).then(res => {
        if (res.success) {
          this.$Message.success(res.message);
          this.reloadViewData();
        }
      });
    },
    //重新渲染默认视图columns方法
    reRenderDefaultView() {
      this.columns[3].render = (h, params) => {
        let defaultView = false;
        if(params.row.isDefault === 1){
          defaultView = true;
        }
        return h("Radio", {
          props: {
            value: defaultView
          },
          on: {
            'on-change': () => {
              this.onClickDefaultView(params);
            }
          }
        });
      };
    }
  },
  created() {},
  mounted() {
    this.getViewsData();
  }
};
</script>

