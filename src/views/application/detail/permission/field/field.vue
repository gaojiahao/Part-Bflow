<style lang="less" scoped>
@import "../operation/operation.less";
</style>

<template>
    <div class="app" style="margin-top:15px;">
        <Row class="app-action">
            <Row class="app-action-title">
                <h3>字段或字段组<a v-if="isAdmin" @click="showModal" class="app-action-title-add">添加</a>
                </h3>
                <span class="warning-color marlr">应用字段授权给用户或用户组</span>
            </Row>
            <div class="app-action-source">
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
          :resourceId="resourceId"
          @emitPermissionModal="emitPermissionModal">
        </field-modal>
    </div>
</template>

<script>
import {
  getFieldList,
  deleteFieldPermission
} from "@/services/appService.js";
import FieldModal from './field-modal';

export default {
  name: "FieldPermission",
  components: {
    FieldModal
  },
  props: {
    isAdmin: Boolean
  },
  data() {
    return {
      listId: this.$route.params.listId,
      isEdit: false,
      resourceId: '',
      showActionModal: false,
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
      getFieldList(this.listId).then(res => {
        this.userSources = res;
      });
    },
    //删除自定义数据源
    deleteDataSource(resourceId) {
      this.$Modal.confirm({
        title: "确认",
        content: "确认删除此数据源权限？",
        onOk: () => {
          deleteFieldPermission(resourceId).then(res => {
            if (res.success) {
              this.$Message.success(res.message);
              this.getFieldListData();
            }
          });
        }
      });
    },
    setColumns(){
      let defaultColumns = [
        {
          title: '字段或字段组',
          key: 'fields',
          render: (h,params) => {
            return h('div',{},params.row.fields);
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
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.deleteDataSource(params.row.resourceId);
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