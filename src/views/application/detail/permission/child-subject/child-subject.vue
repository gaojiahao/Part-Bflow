<style lang="less" scoped>
@import "../operation/operation.less";
</style>

<template>
    <div class="app" style="margin-top:15px;">
        <Row class="app-action">
            <Row class="app-action-title">
                <h3>管理子科目</h3>
                <span class="warning-color marlr">（科目）管理子科目</span>
            </Row>
            <div class="app-action-source">
                <Row>
                    <Table :columns="columns" :data="subjectData" size="small"></Table>
                </Row>
            </div>
        </Row>
    </div>
</template>

<script>
import { 
  getSubAccountData,
  startSubAccountData,
  blockSubAccountData,
  getChildPermissionListByListId } from "@/services/appService.js";
import FieldPermission from '../field/field';

export default {
  name: "ChildSubject",
  components: {
    FieldPermission
  },
  props: {
    isAdmin: Boolean
  },
  data() {
    return {
      listId: this.$route.params.listId,
      subjectData: [],
      columns: [
         {
            type: 'expand',
            width: 50,
            render: (h, params) => {
                return h(FieldPermission, {
                    props: {
                        row: params.row,
                        isAdmin: this.isAdmin
                    }
                })
            }
        },
        {
          title: "子科目名称",
          key: "calcRelName"
        },
        {
          title: "状态",
          key: "status",
          render: (h,params) => {
            let isDisabled = false;
            if(params.accountType === 1){
              isDisabled = true;
            }
            if(!this.isAdmin){
              isDisabled = true;
            }
            return h('Checkbox', {
              props: {
                value: params.row.status === 1,
                disabled: isDisabled
              },
              on: {
                'on-change': status => {
                  if(status) {
                    startSubAccountData(params.row.calcRelCode).then(res => {
                      if(res.success) {
                        this.$Message.success(res.message);
                      }else{
                        this.$Message.error(res.message);
                      }
                    })
                  }else{
                    blockSubAccountData(params.row.calcRelCode).then(res => {
                      if(res.success) {
                        this.$Message.success(res.message);
                      }else{
                        this.$Message.error(res.message);
                      }
                    })
                  }
                }
              }
            }, '启用');
          }
        }
      ]
    };
  },
  methods: {
    getChildSubjectData() {
      getSubAccountData(this.listId).then(res => {
        if(res.success){
          this.subjectData = res.obj;
        }
      })
      .catch(error => {
        this.$Message.error(error.data.message);
      });
    }
  },
  mounted() {
    this.getChildSubjectData();
  }
};
</script>

