<style lang="less" scoped>
@import "../operation/operation.less";
</style>

<template>
    <div class="app" style="margin-top:15px;">
        <Row class="app-action">
            <Row class="app-action-title">
                <h3>数据源<a v-if="isAdmin" @click="showModal" class="app-action-title-add">授权</a>
                </h3>
                <span class="marlr" :style="{color:'#aaaaaa'}">用户默认可查看我创建的实例、我经办的实例、我负责的组织经办的实例</span>
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
          :modalName="modalName"
          @emitPermissionModal="emitPermissionModal">
        </action-modal>
    </div>
</template>

<script>
import {
  getAppResourcesAndAuthoritys,
  deleteRelationPermission,
  getAllResourcePermissionData,
  updateMemberPermission
} from "@/services/appService.js";
import ActionModal from "../action/action-modal";

export default {
  name: "permissionSourceData",
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
      //监听modal是否添加权限
      isModalConfirm: 1000,
      resourceData: [],
      modalName: 'resource',
      columns: [],
      userSources: []
    };
  },
  watch: {
    isModalConfirm: function() {
      this.getResourceData();
    },
    isAdmin: function(value) {
      this.setColumns();
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
    getResourceData() {
      getAppResourcesAndAuthoritys('resource',this.listId).then(res => {
        this.userSources = res.tableContent;
      });
    },
    //删除用户、组织、职位全部权限公共方法
    deleteAllPermission(params, type) {
      let that = this;
      that.$Modal.confirm({
        title: "确认",
        content: "确认删除此权限？",
        onOk: () => {
          let depDeleteParams = {},
              permissionIds = [],
              userId = [],
              groupId = [],
              roleId = [],
              companyId = [];
          //获取permissionIds的集合
          params.row.resource.forEach(val => {
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
            }else if(val.type === 'role'){
              roleId.push(val.id);
            }else{
              companyId.push(val.id);
            }
          })
          depDeleteParams = {
            user: userId.join(','),
            group: groupId.join(','),
            role: roleId.join(','),
            company: companyId.join(','),
            multi: permissionIds.join(",")
          };
          deleteRelationPermission(depDeleteParams).then(res => {
            if (res.success) {
              that.$Message.success(res.message);
              this.getResourceData();
            }
          });
        }
      });
    },
    setColumns(){
      let defaultColumns = [ 
        {
          title: "已授权用户、用户组",
          key: "objNames",
          width: 200,
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
          title: "数据源",
          key: "source",
          render: (h, params) => {
            let actionSource = params.row.resource,
                renderData = [],
                actionId = [];

            actionSource.forEach((val,i) => {
              for(let k in val){
                actionId.push(k);
              }
            });

            this.resourceData.forEach((val,index) => {
              let pushData,pushDataStatus;
              for(let i=0;i<actionId.length;i++){
                if(actionId[i] == val.id){
                  pushDataStatus = val.id;
                  break;
                }else{
                  pushDataStatus = `${val.id}_false`;
                }
              }
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
                      disabled: !this.isAdmin
                    },
                    on: {
                     'on-change': (permissionId) => {
                       let userId,groupId,roleId,companyId,status;
                       if(params.row.list === 'sys_role_permission'){
                         roleId = params.row.objId;
                       }else if(params.row.list === 'sys_user_permission'){
                         userId = params.row.objId;
                       }else if(params.row.list === 'sys_group_permission'){
                         groupId = params.row.objId;
                       }else{
                         companyId = params.row.objId;
                       }

                       if(/_/.test(permissionId)){
                         status = 0;
                         permissionId = permissionId.split('_')[0];
                       }else{
                         status = 1;
                       }

                      updateMemberPermission(userId,roleId,groupId,companyId,permissionId,this.listId,status).then(res => {
                          if(res.success){
                            this.$Message.success(res.message);
                          }
                      });
                     } 
                    }
                  }),
                  h('span',{
                    style: {
                      marginLeft: '-7px'
                    }
                  },val['name'])
                ]);
              renderData.push(pushData);
            })
            return h("div", renderData);
          }
        }],
        optColumns = [{
          title: "操作",
          key: "list",
          align: "center",
          width: 300,
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
        }];
      
      if(this.isAdmin){
        this.columns = defaultColumns.concat(optColumns);
      }else{
        this.columns = defaultColumns;
      }
    }
  },
  created() {
    getAllResourcePermissionData(this.listId).then(res => {
      this.resourceData = res.tableContent;
    })
  },
  mounted() {
    this.setColumns();
    this.getResourceData();
  }
};
</script>

