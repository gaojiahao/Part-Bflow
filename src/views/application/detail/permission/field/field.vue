<style lang="less" scoped>
@import "../operation/operation.less";
</style>

<template>
    <div class="app" style="margin-top:15px;">
        <Row class="app-action">
            <Row v-if="!row" class="app-action-title">
                <h3>字段或字段组<a v-if="isAdmin" @click="showModal" class="app-action-title-add">添加</a></h3>
                <span class="marlr" :style="{color:'#aaaaaa'}">应用字段授权给用户或用户组</span>
            </Row>
            <div :class="{'app-action-source':!row}">
                <h3 v-if="isAdmin && row" @click="showModal" class="app-action-title-add"><Icon type="md-add" />添加</h3>
                <Row>
                    <Table :columns="columns" :data="userSources" size="small"></Table>
                </Row>
            </div>
        </Row>
        <!-- 授权modal -->
        <field-modal
          @reGetData="reGetData" 
          :modalStatis="showActionModal"
          :isEdit="isEdit"
          :row="row"
          :resourceId="resourceId"
          @emitPermissionModal="emitPermissionModal">
        </field-modal>
    </div>
</template>

<script>
import {
  getFieldList,
  deleteFieldPermission,
  getFieldListByCalcRelCode,
  deletePermissionByResourceId
} from "@/services/appService.js";
import FieldModal from './field-modal';

export default {
  name: "FieldPermission",
  components: {
    FieldModal
  },
  props: {
    isAdmin: Boolean,
    row: Object
  },
  data() {
    return {
      listId: this.$route.params.listId,
      isEdit: false,
      resourceId: '',
      showActionModal: false,
      isChildSubject: false,
      //监听modal是否添加权限
      isModalConfirm: 1000,
      actionData: [],
      modalName: 'action',
      columns: [],
      userSources: []
    };
  },
  watch: {
    isModalConfirm: function() {
      this.getFieldListData();
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
      this.isEdit = false;
    },
    emitPermissionModal() {
      this.showActionModal = false;
    },
    getFieldListData() {
      if(this.row){
        getFieldListByCalcRelCode(this.row.calcRelCode).then(res => {
          if(res.success){
            this.userSources = res.data;
          }
        })
      }else{
        getFieldList(this.listId).then(res => {
          this.userSources = res;
        });
      }
    },
    //删除字段权限
    deleteFieldSource(resourceId) {
      this.$Modal.confirm({
        title: "确认",
        content: "确认删除此数据源权限？",
        onOk: () => {
          if(this.row){
            deletePermissionByResourceId(resourceId).then(res => {
              if (res.success) {
                this.$Message.success(res.message);
                this.getFieldListData();
              }
            }).catch(err => {
              this.$Message.error(err.data.message);
            });
          }else{
            deleteFieldPermission(resourceId).then(res => {
              if (res.success) {
                this.$Message.success(res.message);
                this.getFieldListData();
              }
            }).catch(err => {
              this.$Message.error(err.data.message);
            });
          }
        }
      });
    },
    setColumns(){
      let defaultColumns = [
        {
          title: '字段或字段组',
          key: 'fields',
          width: 200,
          render: (h,params) => {
            let express = params.row.fields.split('br'),
                renderData = [];
            express.forEach(val => {
              renderData.push(
                h('div',{},val)
              );
            });
            return h('div',renderData);
          }
        },
        {
          title: "已授权用户、组织或职位",
          key: "instance"
        },
         {
          title: "名单类型",
          key: "isBlacklist",
          render: (h,params) => {
            let isBlacklist = '黑名单';
            if(!params.row.isBlacklist){
              isBlacklist = '白名单';
            }
            return h('span',{},isBlacklist);
          }
        }],
        optColumns = [ {
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
                      this.deleteFieldSource(params.row.resourceId);
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
                      this.isEdit = true;
                      this.resourceId = params.row.resourceId;
                      this.showActionModal = true;
                    }
                  }
                },
                "修改"
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
    
  },
  mounted() {
    this.setColumns();
    this.getFieldListData();
  }
};
</script>