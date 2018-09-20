<style lang="less" scoped>
@import "../operation/operation.less";
</style>

<template>
    <div class="app" style="margin-top:15px;">
        <Row class="app-action">
            <Row class="app-action-title">
                <h3>动作<a v-if="isAdminTrue" @click="showModal" class="app-action-title-add">授权</a>
                </h3>
                <span class="warning-color marlr">授予用户、组织或职位当前应用动作的权限</span>
            </Row>
            <div class="app-action-source">
                <Row>
                    <Table :columns="columns" :data="userSources" size="small"></Table>
                </Row>
            </div>
        </Row>
        <!-- 授权modal -->
        <action-modal
          @reGetData="reGetData" 
          :modalStatis="showActionModal" 
          @emitPermissionModal="emitPermissionModal">
        </action-modal>
    </div>
</template>

<script>
import {
  getAppResourcesAndAuthoritys,
  deleteRelationPermission,
  getAllPermissionData,
  updateMemberPermission
} from "@/services/appService.js";
import ActionModal from "./action-modal";

export default {
  name: "permissionSource",
  components: {
    ActionModal
  },
  props: {
    isAdmin: Boolean
  },
  data() {
    return {
      listId: this.$route.params.listId,
      showActionModal: false,
      isAdminTrue: false,
      //监听modal是否添加权限
      isModalConfirm: 1000,
      actionData: [],
      columns: [
        {
          title: "已授权用户、组织或职位",
          key: "objNames",
          render: (h, params) => {
            let objNames = params.row.objNames,
                renderData = [];
            if (objNames.length > 0) {
              objNames.forEach((val, index) => {
                let pushData;
                pushData = h("span",{},val.name+'; ');
                renderData.push(pushData);
              });
              return h("div", renderData);
            }
          }
        },
        {
          title: "动作",
          key: "source",
          width: 800,
          render: (h, params) => {
            let actionSource = params.row.action,
                renderData = [],
                actionId = [];

            actionSource.forEach((val,i) => {
              for(let k in val){
                actionId.push(k);
              }
            });

            this.actionData.forEach((val,index) => {
              let pushData,pushDataStatus;
              actionId.forEach(data => {
                if(data == val.id){
                  pushDataStatus = val.id;
                }
              });
              pushData = h('span',{
                style: {
                  marginLeft: '10px'
                }
              },[
                  h('Checkbox',{
                    props: {
                      value: pushDataStatus,
                      trueValue: val.id,
                      falseValue: val.id+'_false',
                      disabled: !this.isAdminTrue
                    },
                    on: {
                     'on-change': (permissionId) => {
                       let userId,groupId,roleId,status;
                       if(params.row.list === 'sys_role_permission'){
                         roleId = params.row.objId;
                       }else if(params.row.list === 'sys_user_permission'){
                         userId = params.row.objId;
                       }else{
                         groupId = params.row.objId;
                       }

                       if(/_/.test(permissionId)){
                         status = 0;
                         permissionId = permissionId.split('_')[0];
                       }else{
                         status = 1;
                       }

                      updateMemberPermission(userId,roleId,groupId,permissionId,this.listId,status).then(res => {
                          if(res.success){
                            this.$Message.success(res.message);
                          }
                      });
                     } 
                    }
                  }),
                  h('span',{},val['name'])
                ]);
              renderData.push(pushData);
            })
            return h("div", renderData);
          }
        }
      ],
      userSources: []
    };
  },
  watch: {
    isModalConfirm: function() {
      this.getActionData();
    },
    isAdmin: function(value) {
      const lastColumn = {
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
                      this.deleteAllPermission(params, params.row.list);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        };
      if(value){
        this.isAdminTrue = true;
        if(this.columns[this.columns.length-1].title !== '操作'){
          this.columns.push(lastColumn);
        }
      }else{
        this.isAdminTrue = false;
        if(this.columns[this.columns.length-1].title === '操作'){
          this.columns.splice(this.columns.length-1,1);
        }
      }
    }
  },
  methods: {
    reGetData(value) {
      this.isModalConfirm = value;
    },
    showModal() {
      this.editActionData = {};
      this.showActionModal = true;
      this.isEdit = "";
    },
    emitPermissionModal() {
      this.showActionModal = false;
    },
    getActionData() {
      getAppResourcesAndAuthoritys('action',this.listId).then(res => {
        this.userSources = res.tableContent;
      });
    },
    //删除用户、组织、职位全部权限公共方法
    deleteAllPermission(params, type) {
      let that = this;
      that.$Modal.confirm({
        title: "确认",
        content: "确认删除此用户权限？",
        onOk: () => {
          let depDeleteParams = {},
              permissionIds = [],
              userId = [],
              groupId = [],
              roleId = [];
          //获取permissionIds的集合
          params.row.action.forEach(val => {
            for (let k in val) {
              permissionIds.push(k);
            }
          });
          //获取用户组织职位ids集合
          params.row.objNames.forEach(val => {
            if(val.type === 'user'){
              userId.push(val.id);
            }else if(val.type === 'group'){
              groupId.push(val.id);
            }else{
              roleId.push(val.id);
            }
          })
          depDeleteParams = {
            user: userId.join(','),
            group: groupId.join(','),
            role: roleId.join(','),
            multi: permissionIds.join(",")
          };
          deleteRelationPermission(depDeleteParams).then(res => {
            if (res.success) {
              that.$Message.success(res.message);
              this.getActionData();
            }
          });
        }
      });
    },
  },
  created() {
    getAllPermissionData(this.listId).then(res => {
      this.actionData = res.tableContent;
    })
  },
  mounted() {
    this.getActionData();
  }
};
</script>

