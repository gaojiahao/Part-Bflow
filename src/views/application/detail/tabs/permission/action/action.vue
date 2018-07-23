<style lang="less" scoped>
    @import './action.less';
</style>

<template>
    <div class="app">
        <!-- <Row class="app-des">
            <span>说明：黑、白名单，只能设置其一，如果都空着，表示所有用户都有权限</span>
        </Row> -->
        <Row class="app-action">
            <Row class="app-action-title">
                <h3>动作  <a @click="showModal">添加动作</a></h3>
              
            </Row>
            <div class="app-action-source">
                <Row class="app-action-source-list">
                    <Col span="6" class="app-action-source-item" v-for="(list,index) of actionData" :key="index">

                        <Col span="2" class="app-action-source-item-check">
                            <Checkbox @on-change="isForbidden(list,index)" :value="list.atype===0?true:false"></Checkbox>
                        </Col>

                        <Col span="21" class="app-action-source-item-content">
                            <h3>{{ list.name }}</h3>
                            <div class="app-action-source-item-desc">{{ list.desc }}</div>
                        </Col>
                    </Col>
                </Row>

                <Row>
                    <Table :columns="columns" :data="userSources"></Table>
                </Row>
            </div>
        </Row>
        <!-- 授权modal -->
        <action-modal @reGetData="reGetData" :modalStatis="showActionModal" :isEdit="isEdit" :memberType="memberType" @emitPermissionModal="emitPermissionModal" :editActionData="editActionData"></action-modal>
    </div>
</template>

<script>
import {
  getAppResourcesAndAuthoritys,
  getAllPermissionData,
  ProhibitApp,
  deleteRelationPermission
} from "@/services/appService.js";
import ActionModal from './action-modal';

export default {
  name: "permissionSource",
  components: {
    ActionModal
  },
  data() {
    return {
      listId: this.$route.params.listId,
      showActionModal: false,
      isEdit: '',
      editActionData: {},
      memberType: '',
      actionData: [],
      //监听modal是否添加权限
      isModalConfirm: 1000,
      columns: [
        {
          title: "已授权用户",
          key: "objName"
        },
        {
          title: "动作",
          key: "source",
          render: (h,params) => {
            let actionSource = params.row.action?JSON.parse(params.row.action): [],
                renderData = [];
            if (actionSource.length > 0) {
              actionSource.forEach((val, index) => {
                let pushData;
                for (let k in val) {
                  pushData = h("span",{
                    style: {
                      margin: '0px 5px'
                    }
                  },val[k]);
                }
                renderData.push(pushData);
              });
              return h("div", renderData);
            }
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
                          this.deleteAllPermission(params,params.row.list);
                        }
                      }},'删除'),
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
                        if(params.row.list === 'sys_user_permission'){
                          this.memberType = "user";
                        }else if(params.row.list === 'sys_role_permission'){
                          this.memberType = "role";
                        }else{
                          this.memberType = "group";
                        }
                        this.isEdit = 'edit';
                        this.editActionData = params.row;
                        this.showActionModal = true;
                      }
                    }
                  },'修改')
              ])
          }
        }
      ],
      userSources: [
        { user: "张三", source: "新增、查看、删除、修改"},
        { user: "采购部", source: "新增、查看、删除"}
      ]
    };
  },
  watch: {
    isModalConfirm: function(){
      this.getActionData();
    }
  },
  methods: {
    reGetData(value) {
      this.isModalConfirm = value;
    },
    showModal() {
      this.editActionData = {};
      this.showActionModal = true;
      this.isEdit = '';
    },
    emitPermissionModal() {
      this.showActionModal = false;
    },
    getActionData() {
      let filter = JSON.stringify([
          {
            operator: "like",
            value: '操作',
            property: "type"
          }
        ]);
      getAppResourcesAndAuthoritys(this.listId,filter).then(res => {
        this.userSources = res.tableContent;
      })
    },
    //启用禁用动作权限
    isForbidden(list,index) {
      let actionStatus = list.atype===0?true:false,
          relStatus;
      if(actionStatus){
        relStatus = 1;
      }else{
        relStatus = 0;
      }
      ProhibitApp(list.id,relStatus).then(res => {
          if(res.success){
            this.$Message.success(res.message);
            this.actionData[index].atype = relStatus;
          }
        })
    },
    //删除用户、组织、职位全部权限公共方法
    deleteAllPermission(params, type) {
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
          depDeleteParams = {
            list: type,
            single: params.row.objId,
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
    getData() {
      let params = { 
          listId: this.listId, 
          filter: JSON.stringify([
          {
            operator: "eq",
            value: '操作',
            property: "type"
          }
        ])
        };
      //获取应用权限数据
      getAllPermissionData(params).then(res => {
        this.actionData = res.tableContent;
      });
    }
  },
  created() {},
  mounted() {
    this.getActionData();
    this.getData();
  }
};
</script>

