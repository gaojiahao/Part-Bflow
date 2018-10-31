<style lang="less">
  
</style>

<template>
  <Modal v-model="showPermissionModal" title="自定义数据源" width="1000" :styles="{top: '15px'}" :mask-closable="false" @on-visible-change="modalVisibleChange">
    <div>
      <Row :gutter="8" style="margin-bottom:10px;">
        <Button @click="addNewField" type="info" shape="circle" style="margin-bottom:5px;">新增字段</Button>
        <Table ref="actionRef" stripe height="200" :columns="fieldColumns" size="small" no-data-text="请添加新字段" :data="fieldData"></Table>
      </Row>
      <Row :gutter="8" style="margin-bottom:10px;">
        <Col span="4">
        <Button @click="selectUserModal" type="info" shape="circle">选择用户</Button>
        </Col>
        <Col span="4">
        <Button @click="selectGroupModal" type="info" shape="circle">选择组织</Button>
        </Col>
        <Col span="4">
        <Button @click="selectRoleModal" type="info" shape="circle">选择职位</Button>
        </Col>
        <Col v-if="false" span="3">
        <Button type="info" shape="circle">选择公司</Button>
        </Col>
      </Row>
      <Row :gutter="8">
        <Col span="24" class="permission-tab">
          <Row style="margin-top:10px">
            <Col span="3">
              <b class="permission-title">用户</b>
            </Col>
            <Col span="21" class="member-body">
              <Tag @on-close="deleteUser" v-for="(userData, index) of userSelectData" :key="index" :userId="userData.userId" closable color="warning">
                {{ userData.nickname }}
              </Tag>
            </Col>
          </Row>
          <Row class="permission-line"></Row>
          <Row>
            <Col span="3">
            <b class="permission-title">组织</b>
            </Col>
            <Col span="21" class="member-body">
            <Tag @on-close="deleteOrg" v-for="(orgData, index) of orgSelectData" :key="index" :orgId="orgData.id" closable color="success">
              {{ orgData.name }}
            </Tag>
            </Col>
          </Row>
          <Row class="permission-line"></Row>
          <Row>
            <Col span="3">
            <b class="permission-title">职位</b>
            </Col>
            <Col span="21" class="member-body">
            <Tag @on-close="deleteDepartment" v-for="(departmentData, index) of departmentSelectData" :key="index" :depId="departmentData.id" closable color="primary">
              {{ departmentData.name }}
            </Tag>
            </Col>
          </Row>
          <!-- <Row class="permission-line"></Row> -->
          <Row v-if="false">
            <Col span="3">
            <b class="permission-title">公司</b>
            </Col>
            <Col span="21" class="member-body">
            <Tag @on-close="deleteCompany" v-for="(companyData, index) of companySelectData" :key="index" :comId="companyData.groupId" closable color="primary">
              {{ companyData.groupName }}
            </Tag>
            </Col>
          </Row>
        </Col>
      </Row>
      <!-- 用户modal -->
      <user-selector 
        :showUserSelector="showSelector.showUserSelector" 
        @emitUserModal="emitUserModal" 
        @userModalData="getUserModalData">
      </user-selector>
      <!-- 组织modal -->
      <group-selector 
        :showGroupSelector="showSelector.showGroupSelector" 
        @emitGroupModal="emitGroupModal"
        @groupModalData="getGroupModalData">
      </group-selector>
      <!-- 职位modal -->
      <role-selector 
        :showRoleSelector="showSelector.showRoleSelector" 
        @emitRoleModal="emitRoleModal"
        @roleModalData="getRoleModalData">
      </role-selector>
    </div>
    <div slot="footer">
        <Button type="default" @click="cancelAddPermission">取消</Button>
        <Button type="primary" :disabled="isModalDisabled" @click="submitPermission">确定</Button>
    </div>
  </Modal>
</template>

<script>
import {
  saveCustomDatasource,
  getFieldResorce,
  getResourceDetailList,
  updateCustomDatasource
} from "@/services//appService.js";
import UserSelector from './user-selector';
import GroupSelector from './group-selector';
import RoleSelector from './role-selector';

export default {
  name: "permissionModal",
  components: {
      UserSelector,
      GroupSelector,
      RoleSelector
  },
  props: {
    modalStatis: Boolean,
    resourceId: String,
    isEdit: Boolean
  },
  data() {
    return {
      appListId: this.$route.params.listId,
      //监听数据变化刷新权限table
      emitChange: 0,

      showPermissionModal: false,
      isModalDisabled: true,
      fieldData: [],
      allFieldData: [],
      fieldColumns: [
        {
          title: "字段",
          key: "fieldName",
          render: (h,params) => {
              let renderData = [];
              this.allFieldData.forEach(val => {
                renderData.push(
                  h('Option',{
                      props: {
                        value: val.fieldCode,
                        parentCode: val.parentCode
                      }
                    },val.fieldName)
                )
              });
            return h('div',[
              h('Select',{
                props: {
                  value: params.row.fieldCode
                },
                on: {
                  'on-change': value => {
                    this.fieldData[params.index].fieldCode = value;
                  }
                }
              },renderData)
            ]);
          }
        },
        {
          title: "规则",
          key: "rule",
          render: (h,params) => {
            let data = [
              {name: '大于',value: 'gt'},
              {name: '小于',value: 'lt'},
              {name: '等于',value: 'eq'},
              {name: '小于等于',value: 'le'},
              {name: '大于等于',value: 'ge'},
              {name: '不等于',value: 'ne'},
              {name: '包含',value: 'like'},
              {name: '不包含',value: 'nlike'}],
            renderData = [];
            data.forEach(val => {
              renderData.push(
                h('Option',{
                    props: {
                      value: val.value
                    }
                  },val.name)
              )
            })
            return h('div',[
              h('Select',{
                props: {
                  value: params.row.operator
                },
                on: {
                  'on-change': value => {
                    this.fieldData[params.index].operator = value;
                  }
                }
              },renderData)
            ]);
          }
        },
        {
          title: "值",
          key: "value",
          render: (h,params) => {
            return h('div',[
              h('Input',{
                props: {
                  value: params.row.value
                },
                on: {
                  'on-blur': value => {
                    this.fieldData[params.index].value = value.target.value;
                  }
                }
              })
            ]);
          }
        },
        {
          title: "且/或",
          key: "or",
          render: (h,params) => {
            let data = [{name: '且',value: 'and'},{name: '或',value: 'or'}],
            renderData = [];
            data.forEach(val => {
              renderData.push(
                h('Option',{
                    props: {
                      value: val.value
                    }
                  },val.name)
              )
            })
            return h('div',[
              h('Select',{
                props: {
                  value: params.row.logicOperator
                },
                on: {
                  'on-change': value => {
                    this.fieldData[params.index].logicOperator = value;
                  }
                }
              },renderData)
            ]);
          }
        },
        {
          title: "操作",
          key: "list",
          align: "center",
          render: (h, params) => {
              return h("Button",
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.fieldData.splice(params.index,1);
                    }
                  }
                },
                "删除"
              );
          }
        }
      ],

      userSelectData: [],
      orgSelectData: [],
      departmentSelectData: [],
      companySelectData: [],
      showSelector: {
          showUserSelector: false,
          showGroupSelector: false,
          showRoleSelector: false
      }
    };
  },
  watch: {
    //监听modal状态变化
    modalStatis: function(value, oldValue) {
      if(this.isEdit){
        this.userSelectData = [];
        this.orgSelectData = [];
        this.departmentSelectData = [];
        getResourceDetailList(this.appListId,this.resourceId).then(res => {
          this.fieldData = res.resource;
          res.instance.forEach(val => {
            let pushData = {};
            if(val.substanceType === 'U'){
              pushData.nickname = val.substanceName;
              pushData.userId = val.substanceId;
              this.userSelectData.push(pushData);
            }else if(val.substanceType === 'G'){
              pushData.name = val.substanceName;
              pushData.id = val.substanceId;
              this.orgSelectData.push(pushData);
            }else if(val.substanceType === 'R'){
              pushData.name = val.substanceName;
              pushData.id = val.substanceId;
              this.departmentSelectData.push(pushData);
            }
          })
        })
      }else{
        this.fieldData = [];
        this.userSelectData = [];
        this.orgSelectData = [];
        this.departmentSelectData = [];
      }
      this.showPermissionModal = value;
      
    },
    //监听权限modal确定按钮的禁用启用状态
    fieldData: function(value){
      if(value.length > 0){
        if(this.userSelectData.length>0 || 
          this.orgSelectData.length>0 || 
          this.departmentSelectData.length>0 ||
          this.companySelectData.length>0
        ){
          this.isModalDisabled = false;
        }else{
          this.isModalDisabled = true;
        }
      }else{
        this.isModalDisabled = true;
      }
    },
    userSelectData: function(value) {
      if(value.length > 0){
        if(this.fieldData.length > 0){
          this.isModalDisabled = false;
        }else{
          this.isModalDisabled = true;
        }
      }else{
        if(this.orgSelectData.length > 0 || this.departmentSelectData.length > 0){
          if(this.fieldData.length > 0){
            this.isModalDisabled = false;
          }else{
            this.isModalDisabled = true;
          }
        }else{
          this.isModalDisabled = true;
        }
      }
    },
    orgSelectData: function(value) {
      if(value.length > 0){
        if(this.fieldData.length > 0){
          this.isModalDisabled = false;
        }else{
          this.isModalDisabled = true;
        }
      }else{
        if(this.userSelectData.length > 0 || this.departmentSelectData.length > 0){
          if(this.fieldData.length > 0){
            this.isModalDisabled = false;
          }else{
            this.isModalDisabled = true;
          }
        }else{
          this.isModalDisabled = true;
        }
      }
    },
    departmentSelectData: function(value) {
      if(value.length > 0){
        if(this.fieldData.length > 0){
          this.isModalDisabled = false;
        }else{
          this.isModalDisabled = true;
        }
      }else{
        if(this.orgSelectData.length > 0 || this.userSelectData.length > 0){
          if(this.fieldData.length > 0){
            this.isModalDisabled = false;
          }else{
            this.isModalDisabled = true;
          }
        }else{
          this.isModalDisabled = true;
        }
      }
    }
  },
  methods: {
    emitUserModal() {
        this.showSelector.showUserSelector = false;
    },
    emitGroupModal() {
      this.showSelector.showGroupSelector = false;
    },
    emitRoleModal() {
      this.showSelector.showRoleSelector = false;
    },
    //新增字段
    addNewField() {
      this.fieldData.push({fieldName: '',parentCode: '',fieldCode: '',operator:'',value:'',logicOperator:''});
    },
    //取消添加权限
    cancelAddPermission() {
      this.showPermissionModal = false;
    },
    //提交权限
    submitPermission() {
      let userId = this.userSelectData.map(item => {
          return item.userId;
        }),
        groupId = this.orgSelectData.map(item => {
          return item.id;
        }),
        roleId = this.departmentSelectData.map(item => {
          return item.id;
        }),
        companyId = this.companySelectData.map(item => {
          return item.groupId;
        }),
        params = {
          user: userId,
          role: roleId,
          group: groupId,
          listId: this.appListId,
          resourceId: this.resourceId,
          resource: this.fieldData
        };
        if (params) {
          if(this.isEdit){
            updateCustomDatasource(JSON.stringify(params)).then(res => {
              if (res.success) {
                this.$Message.success(res.message);
                this.showPermissionModal = false;
                let Num = this.emitChange++;
                this.$emit("reGetData", Num);
              }
            }).catch(err => {
              this.$Message.error(err.data.message);
            });
          }else{
            saveCustomDatasource(JSON.stringify(params)).then(res => {
              if (res.success) {
                this.$Message.success(res.message);
                this.showPermissionModal = false;
                let Num = this.emitChange++;
                this.$emit("reGetData", Num);
              }
            }).catch(err => {
              this.$Message.error(err.data.message);
            });
          }
        }
    },
    //通知父组件modal的状态
    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitPermissionModal", { modal: false });
      }
    },
    //展开userModal
    selectUserModal() {
        this.showSelector.showUserSelector = true;
    },
    //展开groupModal
    selectGroupModal() {
      this.showSelector.showGroupSelector = true;
    },
    //展开roleModal
    selectRoleModal() {
      this.showSelector.showRoleSelector = true;
    },
    //获取选择的用户数据
    getUserModalData(value) {
      if(this.userSelectData.length > 0){
        let obj = {};
        this.userSelectData.push(...value);
        this.userSelectData = this.userSelectData.reduce((cur, next) => {
          obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
          return cur;
        }, []);
      }else{
        this.userSelectData = value;
      }
    },
    //获取选择的组织数据
    getGroupModalData(value) {
      if(this.orgSelectData.length > 0){
        let obj = {};
        this.orgSelectData.push(...value);
        this.orgSelectData = this.orgSelectData.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []);
      }else{
        this.orgSelectData = value;
      }
    },
    //获取选择的职位数据
    getRoleModalData(value) {
      if(this.departmentSelectData.length > 0){
        let obj = {};
        this.departmentSelectData.push(...value);
        this.departmentSelectData = this.departmentSelectData.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []);
      }else{
        this.departmentSelectData = value;
      }
    },
    //删除用户
    deleteUser(event) {
        let userId = event.target.parentElement.getAttribute("userid");
        this.userSelectData = this.userSelectData.filter(f => {
            return f.userId != userId;
        });
    },
    //删除组织
    deleteOrg(event) {
        let orgId = event.target.parentElement.getAttribute("orgid");
        this.orgSelectData = this.orgSelectData.filter(f => {
            return f.id != orgId;
          });
    },
    //删除职位
    deleteDepartment(data, index) {
        let depId = event.target.parentElement.getAttribute("depid");
        this.departmentSelectData = this.departmentSelectData.filter(f => {
            return f.id != depId;
          });
    }
  },
  created() {
    getFieldResorce(this.appListId).then(res => {
      this.allFieldData = res;
    })
  },
  mounted() {
  }
};
</script>

