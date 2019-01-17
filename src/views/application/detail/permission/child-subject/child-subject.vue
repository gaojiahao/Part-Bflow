<style lang="less" scoped>
@import "../operation/operation.less";
</style>

<template>
    <div class="app" style="margin-top:15px;">
        <Row class="app-action">
            <Row class="app-action-title">
                <h3>管理子科目<a v-if="isAdmin" @click="showModal" class="app-action-title-add">添加</a></h3>
                <span class="warning-color marlr">（科目）管理子科目</span>
            </Row>
            <div class="app-action-source">
                <Row>
                    <Table :columns="columns" :data="subjectData" size="small"></Table>
                </Row>
            </div>
        </Row>
        <!-- 授权modal -->
        <field-modal
          @reGetData="reGetData" 
          :modalStatis="showActionModal"
          :isEdit="isEdit"
          :resourceId="resourceId"
          :isChildSubject="isChildSubject"
          @emitPermissionModal="emitPermissionModal">
        </field-modal>
    </div>
</template>

<script>
import { 
  getSubAccountData,
  startSubAccountData,
  blockSubAccountData,
  getChildPermissionListByListId } from "@/services/appService.js";
import FieldModal from '../field/field-modal';

export default {
  name: "ChildSubject",
  components: {
    FieldModal
  },
  props: {
    isAdmin: Boolean
  },
  data() {
    return {
      listId: this.$route.params.listId,
      showActionModal: false,
      isEdit: false,
      isChildSubject: true,
      resourceId: '',
      isModalConfirm: 1000,
      subjectData: [],
      columns: []
    };
  },
  watch: {
    isModalConfirm: function() {
      this.getChildSubjectData();
    },
    isAdmin: function(value) {
      this.setColumns();
    }
  },
  methods: {
    showModal() {
      this.showActionModal = true;
    },
    reGetData(value) {
      this.isModalConfirm = value;
    },
    emitPermissionModal() {
      this.showActionModal = false;
    },
    getChildSubjectData() {
      getSubAccountData(this.listId).then(res => {
        if(res.success){
          // this.subjectData = res.obj;
          console.log(res.obj)
          getChildPermissionListByListId(this.listId).then(data => {
            console.log(data);
          }).catch(error => {
            this.$Message.error(error.data.message);
          });
        }
      })
      .catch(error => {
        this.$Message.error(error.data.message);
      });
    },
    setColumns(){
      let defaultColumns = [
        {
          title: "子科目名称",
          key: "calcRelName"
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
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            let isDisabled = false;

            if(params.accountType === 1){
              isDisabled = true;
            }

            return h('Checkbox', {
              props: {
                value: params.row.status === 1? true : false,
                disabled: isDisabled
              },
              on: {
                'on-change': (status) => {
                  if(status){
                    startSubAccountData(params.row.calcRelCode).then(res => {
                      if(res.success){
                        this.$Message.success(res.message);
                      }else{
                        this.$Message.error(res.message);
                      }
                    });
                  }else{
                    blockSubAccountData(params.row.calcRelCode).then(res => {
                      if(res.success){
                        this.$Message.success(res.message);
                      }else{
                        this.$Message.error(res.message);
                      }
                    });
                  }
                }
              }
            }, '启用');
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
  mounted() {
    this.getChildSubjectData();
    this.setColumns();
  }
};
</script>

