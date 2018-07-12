<style lang="less" scoped>
.app-card{
  border-top: 1px solid #ddd;
  > h2 {
    height: 40px;
    line-height: 40px;
    margin-left: 15px;
  }
  .app-name {
    font-size: 1rem;
  }

  .app-card-item-title{
    font-size: 16px;
    font-weight: bold
  }
}

.app-permission-content {
  border-bottom: 1px solid #ddd;
  padding: 30px;
}

.isRed {
  color: #e4393c;
}
.user-permission-desc {
  border-left: 1px solid #39f;
  padding: 0px 5px;
  color: #737171;
  font-size: 12px;
}
</style>

<template>
  <div class="app-card">
    <h2 class="app-name">
      应用权限
    </h2>
    <Row v-for="item in appItem" :key="item.type">
      <Row style="margin: 10px 15px ">
        <span class="app-card-item-title">{{item.title}}</span>
        <span class="user-permission-desc" v-html="`设置${item.title}相对于当前应用的权限`"></span>
      </Row>
      <Row>
        <Col span="24">
        <Table height="200" :columns="userColumns" :data="authorityList[item.type]" class="user-table"></Table>
        </Col>
      </Row>
    </Row>
  </div>
</template>

<script>
import {
  deleteRelationPermission,
  getAppResourcesAndAuthoritys
} from "@/services/appService.js";
export default {
  name: "appPermission",
  components: {},
  props: {
    listId: String,
    regetData: Number
  },
  data() {
    return {
      isUserEdit: false,
      isOrgEdit: false,
      isDepEdit: false,
      userColumns: [
        {
          title: "姓名",
          key: "objName",
          width: 200,
          hidden: true
        },
        {
          title: "资源",
          key: "resource",
          align: "center",
          render: (h, params) => {
            let renderData = [];
            let resource = JSON.parse(params.row.resource);
            if (resource.length > 0) {
              resource.forEach((val, index) => {
                let pushData;
                for (let k in val) {
                  pushData = h(
                    "Tag",
                    {
                      props: {
                        closable: true,
                        color: "yellow"
                      },
                      on: {
                        "on-close": event => {
                          this.deleteOnlyPermission(
                            event,
                            params,
                            k,
                            params.row.list
                          );
                        }
                      }
                    },
                    val[k]
                  );
                }
                renderData.push(pushData);
              });
              return h("div", renderData);
            }
          }
        },
        {
          title: "查看范围",
          key: "scope",
          render: (h, params) => {
            let me = this;
            let renderData = [];
            let scope = JSON.parse(params.row.scope);
            if (scope.length > 0) {
              scope.forEach((val, index) => {
                let pushData;
                for (let k in val) {
                  pushData = h(
                    "Tag",
                    {
                      props: {
                        // type: "border",
                        closable: true,
                        color: "green"
                      },
                      on: {
                        "on-close": event => {
                          this.deleteOnlyPermission(
                            event,
                            params,
                            k,
                            params.row.list
                          );
                        }
                      }
                    },
                    val[k]
                  );
                }
                renderData.push(pushData);
              });
              return h("div", renderData);
            }
          }
        },
        {
          title: "动作",
          key: "action",
          render: (h, params) => {
            let renderData = [];
            let actions = JSON.parse(params.row.action);
            if (actions.length > 0) {
              actions.forEach((val, index) => {
                let pushData;
                for (let k in val) {
                  pushData = h(
                    "Tag",
                    {
                      props: {
                        closable: true,
                        color: 'blue'
                      },
                      on: {
                        "on-close": event => {
                          this.deleteOnlyPermission(
                            event,
                            params,
                            k,
                            params.row.list
                          );
                        }
                      }
                    },
                    val[k]
                  );
                }
                renderData.push(pushData);
              });
              return h("div", renderData);
            }
          }
        },
        {
          title: "操作",
          key: "delete",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: event => {
                    this.deleteAllPermission(event, params, params.row.list);
                  }
                }
              },
              "删除"
            );
          }
        }
      ],
      userData: [],
      authorityList: {},
      appItem: [
        {
          title: "用户",
          type: "sys_user_permission"
        },
        {
          title: "组织",
          type: "sys_group_permission"
        },
        {
          title: "职位",
          type: "sys_role_permission"
        }
      ]
    };
  },
  watch: {
    regetData(value) {
      this.getAllData();
    }
  },
  methods: {
    //删除用户、组织、职位全部权限公共方法
    deleteAllPermission(event, params, type) {
      let that = this;
      that.$Modal.confirm({
        title: "确认",
        content: "确认删除此用户权限？",
        onOk: () => {
          let depDeleteParams = {},
            permissionIds = [];
          //获取permissionIds的集合
          JSON.parse(params.row.action).forEach(val => {
            for (let k in val) {
              permissionIds.push(k);
            }
          });
          JSON.parse(params.row.resource).forEach(val => {
            for (let k in val) {
              permissionIds.push(k);
            }
          });
          JSON.parse(params.row.scope).forEach(val => {
            for (let k in val) {
              permissionIds.push(k);
            }
          });
          depDeleteParams = {
            list: type,
            single: params.row.objId,
            multi: permissionIds.join(",")
          };
          deleteRelationPermission(depDeleteParams).then(res => {
            if (res.success) {
              that.$Message.success(res.message);
              event.target.parentElement.parentElement.parentElement.style.display =
                "none";
            }
          });
        }
      });
    },
    //删除用户、组织、职位某一权限公共方法
    deleteOnlyPermission(event, params, k, type) {
      let that = this;
      let content = params.row.leaf
        ? "确认删除此权限？"
        : '<b style="color:red;">注意</b>：这个操作会将<b>' +
          params.row.objName +
          "</b>从该列表中移除(如果<b>" +
          params.row.objName +
          "</b>没有其他权限的话)";
      that.$Modal.confirm({
        title: "确认",
        content: content,
        onOk: () => {
          let deleteParams = {
            list: type,
            single: params.row.objId,
            multi: k
          };
          if (deleteParams) {
            deleteRelationPermission(deleteParams).then(res => {
              if (res.success) {
                that.$Message.success(res.message);
                event.target.parentElement.style.display = "none";
              }
            });
          }
        }
      });
    },
    //拿到用户、组织、职位数据
    getAllData() {
      var that = this;
      getAppResourcesAndAuthoritys(this.listId).then(res => {
        if (res.tableContent[0]) {
          that.authorityList = res["tableContent"].reduce(function(
            pre,
            current,
            index
          ) {
            pre[current.list] = pre[current.list] || [];
            pre[current.list].push(current);
            return pre;
          },
          {});
        }
      });
    }
  },
  created() {
    this.getAllData();
  }
};
</script>