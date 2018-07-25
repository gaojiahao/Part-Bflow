<style lang="less" scoped>
@import "./report.less";
</style>

<template>
  <div class="app-report">
    <Row class="app-report-title">
      <h3>报表 <a @click="goCreateView">添加报表</a></h3>
    </Row>
    <Row class="app-report-table">
      <Table :columns="columns" :data="reportSources" size="small"></Table>

    </Row>
    <report-modal :modalStatis="showReportModal" @emitPermissionModal="emitPermissionModal" :permissionId="permissionId" @reGetData="reGetData" :permissionData="permissionData"></report-modal>
  </div>
</template>

<script>
import {
  getListViewPermission,
  deleteAppViews,
  saveDefaultView
} from "@/services/appService.js";
import AssessModal from "@/components/modal/Modal";
import ReportModal from "./report-modal";
export default {
  name: "reportSource",
  components: {
    ReportModal
  },
  props: {
    appType: String
  },
  data() {
    return {
      listId: this.$route.params.listId,
      showReportModal: false,
      permissionId: "",
      columns: [
        {
          title: "报表名称",
          key: "title"
        },
        {
          title: "视图类型",
          key: "viewType",
          width: 150,
          render: (h, params) => {
            if (params.row.type === "normal") {
              return h("span", {}, "列表");
            }
          }
        },
        {
          title: "已授权用户",
          key: "permissionList",
          width: 500,
          render:(h,params) =>{
            let permissionList = params.row.permissionList,
                renderData = [];
            if (permissionList.length > 0) {
              permissionList.forEach((val, index) => {
                  let pushData = h("span",{
                    style: {
                      margin: '0px 5px'
                    }
                  },val.name);
                renderData.push(pushData);
              });
              return h("div", renderData);
            }
          }
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
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.deleteViews(params, params.index);
                    }
                  }
                },
                "删除"
              ),
              h("span", {
                style: {
                  height: "20px",
                  borderLeft: "1px solid #39f",
                  margin: "0px 5px"
                }
              }),
              h(
                "a",
                {
                  on: {
                    click: () => {
                      let href =
                        "/Site/index.html#appSetting/viewConfig/" +
                        this.listId +
                        "/" +
                        params.row.viewId;
                      window.top.location.href = href;
                    }
                  }
                },
                "修改"
              ),
              h("span", {
                style: {
                  height: "20px",
                  borderLeft: "1px solid #39f",
                  margin: "0px 5px"
                }
              }),
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.permissionId = params.row.permissionId;
                      this.showReportModal = true;
                      this.permissionData = params.row.permissionList;
                    }
                  }
                },
                "授权"
              )
            ]);
          }
        }
      ],
      reportSources: [],

      permissionData:[]
    };
  },
  methods: {
    emitPermissionModal() {
      this.showReportModal = false;
    },

    //创建视图
    goCreateView() {
      window.top.location.href =
        "/Site/index.html#appSetting/" +
        this.listId +
        "/" +
        this.appType +
        "/viewTypes";
    },

     reGetData(){
      this.getViewsData();
    },

    //获取视图数据
    getViewsData() {
      getListViewPermission(this.listId).then(res => {
        res.forEach(element => {
          if(!element.users){
            element.users = [];
          }
          if(!element.roles){
            element.roles = [];
          }
          if(!element.groups){
            element.groups = [];
          }
          element.permissionList = [...element.groups,...element.roles,...element.users]
        });
        this.reportSources = res;
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
            content: "确认删除此视图？",
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
        } else {
          let deleteParams = {
            viewId: params.row.viewId,
            listId: this.listId
          };
          this.$Modal.confirm({
            title: "确认",
            content: "确认设置此视图为默认视图？",
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
      getListViewPermission(this.listId).then(res => {
         res.forEach(element => {
          element.permissionList = [...element.groups,...element.roles,...element.users]
        });
        this.reportSources = res;
        this.reRenderDefaultView();
      });
    },

    //点击默认视图方法
    onClickDefaultView(params) {
      this.$Modal.confirm({
        title: "确认",
        content: "确认设置此视图为默认视图？",
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
        if (params.row.isDefault === 1) {
          defaultView = true;
        }
        return h("Radio", {
          props: {
            value: defaultView
          },
          on: {
            "on-change": () => {
              this.onClickDefaultView(params);
            }
          }
        });
      };
    }
  },
  mounted() {
    this.getViewsData();
  }
};
</script>

