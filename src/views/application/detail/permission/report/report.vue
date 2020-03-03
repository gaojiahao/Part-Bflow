<style lang="less" scoped>
@import "./report.less";
</style>

<template>
  <div class="app-report">
    <Row class="app-report-title">
      <h3>
        报表
        <a v-if="isAdmin && appType!='subject'" @click="goCreateView">添加报表</a>
      </h3>
      <span class="marlr" :style="{color:'#aaaaaa'}">用户默认拥有此应用默认报表的权限</span>
    </Row>
    <Row class="app-report-table">
      <Table :columns="columns" :data="reportSources" size="small"></Table>
    </Row>
    <report-modal
      :modalStatis="showReportModal"
      @emitPermissionModal="emitPermissionModal"
      :permissionId="permissionId"
      @reGetData="reGetData"
      :permissionData="permissionData"
    ></report-modal>
  </div>
</template>

<script>
import {
  getListViewPermission,
  deleteAppViews,
  saveDefaultView,
  saveMobileDefaultView
} from "@/services/appService.js";
import AssessModal from "@/components/modal/Modal";
import ReportModal from "./report-modal";
export default {
  name: "reportSource",
  components: {
    ReportModal
  },
  props: {
    appType: String,
    isAdmin: Boolean
  },
  data() {
    return {
      listId: this.$route.params.listId,
      showReportModal: false,
      permissionId: "",
      columns: [],
      reportSources: [],
      permissionData: []
    };
  },
  watch: {
    isAdmin: function(value) {
      this.setColumns();
    },
    deep: true
  },
  methods: {
    emitPermissionModal() {
      this.showReportModal = false;
    },

    //创建视图
    goCreateView() {
      window.top.location.href = `/Site/index.html#appSetting/${this.listId}/null/new`;
    },

    reGetData() {
      this.getViewsData();
    },

    //获取视图数据
    getViewsData() {
      getListViewPermission(this.listId).then(res => {
        res.forEach(t => {
          t.users || (t.users = []),
            t.roles || (t.roles = []),
            t.groups || (t.groups = []),
            (t.permissionList = [...t.groups, ...t.roles, ...t.users]);
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
            content: `确认删除<b style="color:#e4393c;">${params.row.title}</b>视图？`,
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
            content: `确认删除<b style="color:#e4393c;">${params.row.title}</b>视图？`,
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
          element.permissionList = [
            ...element.groups,
            ...element.roles,
            ...element.users
          ];
        });
        this.reportSources = res;
      });
    },

    //点击默认视图方法
    onClickDefaultView(params, isMobile) {
      this.$Modal.confirm({
        title: "确认",
        content: "确认设置此视图为默认视图？",
        onOk: () => {
          this.setDefaultViews(params, isMobile);
        },
        onCancel: () => {
          this.reloadViewData();
          this.setColumns();
        }
      });
    },

    //设置默认视图并重新渲染columns
    setDefaultViews(params, isMobile) {
      let defaultParams = {
        viewId: params.row.viewId,
        listId: this.listId
      };
      if (isMobile) {
        saveMobileDefaultView(defaultParams).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.reloadViewData();
          }
        });
      } else {
        saveDefaultView(defaultParams).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.reloadViewData();
          }
        });
      }
    },

    setColumns() {
      let defaultColumns = [
          {
            title: "报表名称",
            key: "title",
            width: 200
          },
          {
            title: "已授权用户、组织或职位",
            key: "permissionList",
            render: (h, params) => {
              let permissionList = params.row.permissionList,
                renderData = [];
              if (permissionList.length > 0) {
                permissionList.forEach((val, index) => {
                  let pushData = h(
                    "span",
                    {
                      style: {
                        margin: "0px 5px"
                      }
                    },
                    val.name
                  );
                  renderData.push(pushData);
                });
                return h("div", renderData);
              }
            }
          }
        ],
        defaultViewColumn = [
          {
            title: "默认报表（PC）",
            key: "isDefault",
            align: "center",
            render: (h, params) => {
              let defaultView = params.row.isDefault === 1;
              return h("Radio", {
                props: {
                  value: defaultView,
                  disabled: !this.isAdmin
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
            title: "默认报表（移动）",
            key: "isMobile",
            align: "center",
            render: (h, params) => {
              let defaultView = params.row.isMobile === 1;
              return h("Radio", {
                props: {
                  value: defaultView,
                  disabled: !this.isAdmin
                },
                on: {
                  "on-change": e => {
                    this.onClickDefaultView(params, true);
                  }
                }
              });
            }
          }
        ],
        optColumns = [
          {
            title: "操作",
            key: "list",
            width: 300,
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
                    },
                    style: {
                      display:
                        this.appType !== "subject" ? "inline-block" : "none"
                    }
                  },
                  "删除"
                ),
                h("span", {
                  style: {
                    height: "20px",
                    borderLeft: "1px solid #39f",
                    margin: "0px 5px",
                    display: this.appType !== "subject" ? "inline" : "none"
                  }
                }),
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        let href = `/Site/index.html#appSetting/${this.listId}/${params.row.viewUniqueId}/edit`;
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
        ];
      if (this.isAdmin) {
        this.columns = defaultColumns
          .concat(defaultViewColumn)
          .concat(optColumns);
      } else {
        this.columns = defaultColumns;
      }
    }
  },
  mounted() {
    this.setColumns();
    this.getViewsData();
  }
};
</script>

