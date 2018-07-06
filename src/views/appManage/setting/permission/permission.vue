<style lang="less" scoped>
    .app-name{
        font-size: 1rem;
    }
    .app-permission-content{
      border-bottom: 1px solid #ddd;
      padding: 30px;
    }
    .permission-line{
      border-bottom:1px solid #39f;
      margin:10px 0px;
    }
    .isRed{
      color: #e4393c;
    }
    .user-permission-desc{
      border-left: 1px solid #39f;
      padding: 0px 5px;
      color: #737171;
      font-size: 12px;
    }
    .user-table{
      max-height: 562px;
    }
    .dep-table{
      max-height: 281px;
    }
    .org-table{
      max-height: 281px;
    }
</style>

<template>
  <div>
    <Row>
      <Card class="app-card">
        <p class="app-name" slot="title">
          应用权限
        </p>
        <Row>
          <Row style="margin: 20px 0px">
            <Col span="1">
            <b>用户</b>
            </Col>
            <Col span="23">
            <a @click="showUserAction" :class="{isRed: isUserEdit}">修改</a>
            <span class="user-permission-desc">设置用户相对于当前应用的权限</span>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <Table stripe :columns="userColumns" :data="userData" class="user-table"></Table>
            </Col>
          </Row>
        </Row>
        <Row class="permission-line"></Row>
        <Row>
          <Row style="margin: 20px 0px">
            <Col span="1">
            <b>组织</b>
            </Col>
            <Col span="23">
            <a @click="showOrgAction" :class="{isRed: isOrgEdit}">修改</a>
            <span class="user-permission-desc">设置组织相对于当前应用的权限</span>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <Table stripe :columns="orgColumns" :data="orgData" class="org-table"></Table>
            </Col>
          </Row>
        </Row>
        <Row class="permission-line"></Row>
        <Row>
          <Row style="margin: 20px 0px">
            <Col span="1">
            <b>职位</b>
            </Col>
            <Col span="23">
            <a @click="showDepartmentAction" :class="{isRed: isDepEdit}">修改</a>
            <span class="user-permission-desc">设置职位相对于当前应用的权限</span>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <Table stripe :columns="departmentColumns" :data="departmentData" class="dep-table"></Table>
            </Col>
          </Row>
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
import {
  getAppUserPermissionData,
  getAppOrgPermissionData,
  getAppDepartmentPermissionData,
  deleteRelationPermission
} from "@/services//appService.js";
export default {
  name: "appPermission",
  components: {},
  props: {
    listId: String
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
          width: 100
        },
        {
          title: "资源",
          key: "resource",
          align: 'center',
          render: (h, params) => {
            console.log(params);
            let renderData = [];
            params.row.resource.forEach((val, index) => {
              let pushData;
              for (let k in val) {
                pushData = h(
                  "Tag",
                  {
                    props: {
                      type: "border",
                      closable: true,
                      color: "yellow"
                    },
                    on: {
                      'on-close': () => {
                        this.deleteOnlyPermission(params, k, 'sys_user_permission');
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
        },
        {
          title: "查看范围",
          key: "scope",
          render: (h, params) => {
            let renderData = [];
            params.row.scope.forEach((val, index) => {
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
                      'on-close': (a) => {
                        this.deleteOnlyPermission(params, k, 'sys_user_permission');
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
        },
        {
          title: "动作",
          key: "action",
          render: (h, params) => {
            let renderData = [];
            params.row.action.forEach((val, index) => {
              let pushData;
              for (let k in val) {
                pushData = h(
                  "Tag",
                  {
                    props: {
                      type: "border",
                      closable: true,
                      color: "blue"
                    },
                    on: {
                      'on-close': (a) => {
                        this.deleteOnlyPermission(params, k, 'sys_user_permission');
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
      ],
      userData: [],
      orgColumns: [
        {
          title: "名称",
          key: "objName",
          width: 100
        },
        {
          title: "资源",
          align: 'center',
          key: "resource",
          render: (h, params) => {
            let renderData = [];
            params.row.resource.forEach((val, index) => {
              let pushData;
              for (let k in val) {
                pushData = h(
                  "Tag",
                  {
                    props: {
                      type: "border",
                      closable: true,
                      color: "yellow"
                    },
                    on: {
                      'on-close': (a) => {
                        this.deleteOnlyPermission(params, k, 'sys_group_permission');
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
        },
        {
          title: "查看范围",
          key: "scope",
          render: (h, params) => {
            let renderData = [];
            params.row.scope.forEach((val, index) => {
              let pushData;
              for (let k in val) {
                pushData = h(
                  "Tag",
                  {
                    props: {
                      type: "border",
                      closable: true,
                      color: "green"
                    },
                    on: {
                      'on-close': (a) => {
                        this.deleteOnlyPermission(params, k, 'sys_group_permission');
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
        },
        {
          title: "动作",
          key: "action",
          render: (h, params) => {
            let renderData = [];
            params.row.action.forEach((val, index) => {
              let pushData;
              for (let k in val) {
                pushData = h(
                  "Tag",
                  {
                    props: {
                      type: "border",
                      closable: true,
                      color: "blue"
                    },
                    on: {
                      'on-close': (a) => {
                        this.deleteOnlyPermission(params, k, 'sys_group_permission');
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
      ],
      orgData: [],
      departmentColumns: [
        {
          title: "名称",
          key: "objName",
          width: 170
        },
        {
          title: "资源",
          align: 'center',
          key: "resource",
          render: (h, params) => {
            let renderData = [];
            params.row.resource.forEach((val, index) => {
              let pushData;
              for (let k in val) {
                pushData = h(
                  "Tag",
                  {
                    props: {
                      type: "border",
                      closable: true,
                      color: "yellow"
                    },
                    on: {
                      'on-close': (a) => {
                        this.deleteOnlyPermission(params, k, 'sys_role_permission');
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
        },
        {
          title: "查看范围",
          key: "scope",
          render: (h, params) => {
            let renderData = [];
            params.row.scope.forEach((val, index) => {
              let pushData;
              for (let k in val) {
                pushData = h(
                  "Tag",
                  {
                    props: {
                      type: "border",
                      closable: true,
                      color: "green"
                    },
                    on: {
                      'on-close': (a) => {
                        this.deleteOnlyPermission(params, k, 'sys_role_permission');
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
        },
        {
          title: "动作",
          key: "action",
          render: (h, params) => {
            let renderData = [];
            params.row.action.forEach((val, index) => {
              let pushData;
              for (let k in val) {
                pushData = h(
                  "Tag",
                  {
                    props: {
                      type: "border",
                      closable: true,
                      color: "blue"
                    },
                    on: {
                      'on-close': (a) => {
                        this.deleteOnlyPermission(params, k, 'sys_role_permission');
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
      ],
      departmentData: []
    };
  },
  methods: {
    //展示表格用户删除权限列
    showUserAction() {
      this.isClose = !this.isClose;
      this.isUserEdit = !this.isUserEdit;
      if(this.isUserEdit){
          this.userColumns.push({
          title: "操作",
          key: "delete",
          render: (h, params) => {
            return h("a", {
              on: {
                click: () => {
                  this.deleteAllPermission(params, 'sys_user_permission');
                }
              }
            }, "删除");
          }
        });
      }else{
        this.userColumns.pop();
      }
    },
    //展示表格组织删除权限列
    showOrgAction() {
      this.isOrgEdit = !this.isOrgEdit;
      if(this.isOrgEdit){
          this.orgColumns.push({
          title: "操作",
          key: "delete",
          render: (h, params) => {
            return h("a", {
              on: {
                click: () => {
                  this.deleteAllPermission(params, 'sys_group_permission');
                }
              }
            }, "删除");
          }
        });
      }else{
        this.orgColumns.pop();
      }
    },
    //展示表格职位删除权限列
    showDepartmentAction() {
      this.isDepEdit = !this.isDepEdit;
      if(this.isDepEdit){
          this.departmentColumns.push({
          title: "操作",
          key: "delete",
          render: (h, params) => {
            return h("a", {
              on: {
                click: () => {
                  this.deleteAllPermission(params, 'sys_role_permission');
                }
              }
            }, "删除");
          }
        });
      }else{
        this.departmentColumns.pop();
      }
    },
    //删除用户、组织、职位全部权限公共方法
    deleteAllPermission(params,type) {
      this.$Modal.confirm({
        title: '确认',
        content: '确认删除此用户权限？',
        onOk: () => {
          let depDeleteParams = {},
              permissionIds = [];
          //获取permissionIds的集合
          params.row.action.forEach(val => {
            for(let k in val){
              permissionIds.push(k);
            }
          });
          params.row.resource.forEach(val => {
            for(let k in val){
              permissionIds.push(k)
            }
          });
          params.row.scope.forEach(val => {
            for(let k in val){
              permissionIds.push(k)
            }
          });
          depDeleteParams = {
            list: type,
            single: params.row.objId,
            multi: permissionIds.join(',')
          };
          deleteRelationPermission(depDeleteParams).then(res => {
            if(res.success){
              this.$Message.success(res.message);
              if(type === 'sys_user_permission'){
                this.getUserPermissionData();
              }else if(type === 'sys_group_permission'){
                this.getOrgPermissionData();
              }else{
                this.getDepPermissionData();
              }
            }
          })
        }
      })
    },
    //删除用户、组织、职位某一权限公共方法
    deleteOnlyPermission(params, k, type) {
      if(params.row.leaf === 0){
          this.$Modal.confirm({
          title: '确认',
          content: '<b style="color:red;">注意</b>：这个操作会将<b>'+params.row.objName+'</b>从该列表中移除（如果<b>'+params.row.objName+'</b>没有其他权限的话）',
          onOk: () => {
            let deleteParams = {
              list: type,
              single: params.row.objId,
              multi: k
            };
            if(deleteParams){
              deleteRelationPermission(deleteParams).then(res => {
                if(res.success){
                  this.$Message.success(res.message);
                  if(type === 'sys_user_permission'){
                    this.getUserPermissionData();
                  }else if(type === 'sys_group_permission'){
                    this.getOrgPermissionData();
                  }else{
                    this.getDepPermissionData();
                  }
                }
              })
            }
          }
        });
      }else{
        this.$Modal.confirm({
          title: '确认',
          content: '确认删除此权限？',
          onOk: () => {
            let deleteParams = {
              list: type,
              single: params.row.objId,
              multi: k
            };
            if(deleteParams){
              deleteRelationPermission(deleteParams).then(res => {
                if(res.success){
                  this.$Message.success(res.message);
                  if(type === 'sys_user_permission'){
                    this.getUserPermissionData();
                  }else if(type === 'sys_group_permission'){
                    this.getOrgPermissionData();
                  }else{
                    this.getDepPermissionData();
                  }
                }
              })
            }
          }
        });
      }
    },
    //获取用户权限数据
    getUserPermissionData() {
      let userParams = {
        listId: this.listId,
        objectType: "user"
      };
      getAppUserPermissionData(userParams).then(res => {
        let datas = [];
        res.tableContent.forEach((val, index) => {
          val.action = JSON.parse(val.action);
          val.resource = JSON.parse(val.resource);
          val.scope = JSON.parse(val.scope);
          datas.push(val);
          this.userData = datas;
        });
      });
    },
    //获取组织权限数据
    getOrgPermissionData() {
      let orgParams = {
        listId: this.listId,
        objectType: "group"
      };
      getAppOrgPermissionData(orgParams).then(res => {
      let datas = [];
      res.tableContent.forEach((val, index) => {
        val.action = JSON.parse(val.action);
        val.resource = JSON.parse(val.resource);
        val.scope = JSON.parse(val.scope);
        datas.push(val);
        this.orgData = datas;
      });
    });
    },
    //获取职位权限数据
    getDepPermissionData() {
      let departmentParams = {
        listId: this.listId,
        objectType: "role"
      };
      getAppUserPermissionData(departmentParams).then(res => {
        let datas = [];
        res.tableContent.forEach((val, index) => {
          val.action = JSON.parse(val.action);
          val.resource = JSON.parse(val.resource);
          val.scope = JSON.parse(val.scope);
          datas.push(val);
          this.departmentData = datas;
        });
      });
    }
  },
  mounted() {
    this.getUserPermissionData();
    this.getOrgPermissionData();
    this.getDepPermissionData();
  }
};
</script>