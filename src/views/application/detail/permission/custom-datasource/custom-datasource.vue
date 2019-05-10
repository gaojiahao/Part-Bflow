<style lang="less" scoped>
@import "../operation/operation.less";
</style>

<template>
    <div class="app" style="margin-top:15px;">
        <Row class="app-action">
            <Row class="app-action-title">
                <h3>自定义数据源<a v-if="isAdmin" @click="showModal" class="app-action-title-add">添加</a>
                </h3>
                <span class="warning-color marlr">自定义应用字段过滤条件以及授权给用户或用户组</span>
            </Row>
            <div class="app-action-source">
                <Row>
                    <Table :columns="columns" :data="userSources" size="small"></Table>
                </Row>
            </div>
        </Row>
        <!-- 授权modal -->
        <custom-datasource-modal
          @reGetData="reGetData" 
          :modalStatis="showActionModal"
          :isEdit="isEdit"
          :resourceId="resourceId"
          @emitPermissionModal="emitPermissionModal">
        </custom-datasource-modal>
    </div>
</template>

<script>
import {
  getResorceList,
  deleteCustomDatasource
} from "@/services/appService.js";
import CustomDatasourceModal from './custom-datasource-modal';

export default {
  name: "CustomDatasource",
  components: {
    CustomDatasourceModal
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
      this.isEdit = false;
    },
    emitPermissionModal() {
      this.showActionModal = false;
    },
    getResourceData() {
      getResorceList(this.listId).then(res => {
        this.userSources = res;
      });
    },
    //删除自定义数据源
    deleteDataSource(resourceId) {
      this.$Modal.confirm({
        title: "确认",
        content: "确认删除此数据源权限？",
        onOk: () => {
          deleteCustomDatasource(resourceId).then(res => {
            if (res.success) {
              this.$Message.success(res.message);
              this.getResourceData();
            }
          });
        }
      });
    },
    setColumns(){
      let defaultColumns = [
        {
          title: '字段过滤',
          key: 'expression',
          width: 200,
          render: (h,params) => {
            let express = params.row.expression.split('br'),
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
        }],
        optColumns = [ {
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
    this.getResourceData();
  }
};
</script>

