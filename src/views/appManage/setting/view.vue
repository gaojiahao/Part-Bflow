<style lang="less" scoped>
.app-card {
  width: 100%;
  padding-bottom: 10px;
  overflow-x: hidden;
  border-top-style: none;
  overflow-y: hidden;
  .app-name {
    font-size: 0.8rem;
  }

  > h2 {
    height: 40px;
    line-height: 40px;
    margin-left: 15px;
  }
  > .create-view{
    margin-bottom: 7px;
    display: inline-block;
    margin-left: 17px;
  }
  .create-view:hover{
    color: #e4393c;
  }
  .app-body {
    &-card {
      float: left;
      width: 200px;
      height: 150px;
      ul {
        list-style: none;
        li {
          margin-top: 5px;
        }
        li:first-child {
          margin-top: 0px;
        }
        .app-setting-dot {
          color: #39f;
        }
      }
    }
  }
}
</style>

<template>
  <div class="app-card">
    <Row style="margin: 10px 15px ">
      <b class="app-name"> 报表视图</b>
      <a class="create-view" @click="goCreateView">创建视图</a>
    </Row>
    <Row>
      <Table :columns="columns" :data="tableData"></Table>
    </Row>
  </div>
</template>

<script>
import {
  getAppviews,
  saveDefaultView,
  deleteAppViews
} from "@/services/appService.js";

export default {
  name: "appView",
  components: {},
  props: {
    listId: String,
    appType: String
  },
  data() {
    return {
      columns: [
        {
          title: "视图名称",
          key: "title",
          render: (h, params) => {
            return h("a", {
              on: {
                click: () => {
                  let href = '/Site/index.html#appSetting/viewConfig/'+this.listId+'/'+params.row.viewId;
                  window.top.location.href = href;
                }
              }
            }, params.row.title);
          }
        },
        {
          title: "创建时间",
          key: "crtTime"
        },
        {
          title: "创建者",
          key: "nickname"
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
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                on: {
                  click: e => {
                    this.deleteViews(params, params.index);
                  }
                }
              },
              "删除"
            );
          }
        }
      ],
      tableData: []
    };
  },
  methods: {
    //获取视图数据
    getViewsData() {
      let params = {
        filter: JSON.stringify([
          { operator: "eq", value: this.listId, property: "uniqueId" },
          { operator: "eq", value: 1, property: "listViewStatus" }
        ])
      };
      getAppviews(params).then(res => {
        this.tableData = res.tableContent;
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
        this.tableData = res.tableContent;
        this.reRenderDefaultView();
      });
    },
    //删除视图
    deleteViews(params, index) {
      if (this.tableData.length === 1) {
        this.$Message.warning("不可删除唯一视图！");
      } else {
        if (params.row.isDefault === 1) {
          //调接口设置任意视图为默认视图并更新应用菜单url
          let deleteParams = {
            viewId: params.row.viewId,
            listId: this.listId
          };
          deleteAppViews(deleteParams).then(res => {
            if (res.success) {
              this.tableData.splice(index, 1);
              let defaultParams = {
                viewId: this.tableData[0].viewId,
                listId: this.listId
              };
              saveDefaultView(defaultParams).then(res => {
                if (res.success) {
                  this.reloadViewData();
                }
              });
            }
          });
        }else{
          let deleteParams = {
            viewId: params.row.viewId,
            listId: this.listId
          };
          deleteAppViews(deleteParams).then(res => {
            if (res.success) {
              this.tableData.splice(index, 1);
              this.$Message.success(res.message);
            }
          });
        }
      }
    },
    //创建视图
    goCreateView() {
      window.top.location.href = '/Site/index.html#appSetting/'+this.listId+'/'+this.appType+'/viewTypes';
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
  created() {
    this.getViewsData();
  },
  mounted() {}
};
</script>

