<style lang="less" scoped>
@import "./process.less";
</style>
<template>
  <div class="app-process">
    <Row class="app-process-title">
      <h3>流程状态管理</h3>
      <span class="warning-color marlr">管理员用户可以管理状态
        <a @click="addProcess">添加</a>
      </span>
    </Row>
    <Row class="app-process-table">
      <Modal v-model="showModal" title="新增流程状态" @on-ok="addProcessStatus">
        <Form :model="processInfoItem" ref="processInfoItem" :label-width="100" :rules="ruleValidate">
          <FormItem label="流程状态:" prop="fieldValue">
            <Input v-model="processInfoItem.fieldValue"></Input>
          </FormItem>
          <!-- <FormItem label="流程状态编码:" prop="fieldCode">
            <Input v-model="processInfoItem.fieldCode"></Input>
          </FormItem> -->
          <FormItem label="排序:" prop="sort">
            <Input v-model="processInfoItem.sort"></Input>
          </FormItem>
        </Form>
      </Modal>
      <Table :loading="loading" :columns="columns" :data="processData" size="small"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div class="fr">
          <Page @on-page-size-change="onPageSizeChange" :total="dataTotal" show-elevator show-sizer :current="pageIndex" :page-size="pageSize" @on-change="pageChange" size="small" show-total></Page>
        </div>
      </div>
    </Row>
  </div>
</template>
<script>
import {
  getProcessStatusByListId,
  deleteProcessStatus,
  updateProcessStatus,
  addProcessStatus,
  unsubscribeAppByRelationKey,
  subscribeApp
} from "@/services/appService.js";
export default {
  data() {
    return {
      listId: this.$route.params.listId,
      loading: false,
      columns: [
        {
          title: "流程状态",
          key: "fieldValue",
          width: 180,
          align: "center",
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h("input", {
                domProps: {
                  value: params.row.fieldValue
                },
                style: {
                  border: "none",
                  borderBottom: "1px solid #c5c8ce",
                  backgroundColor: "#fff",
                  outline: "none"
                },
                on: {
                  input: function(event) {
                    params.row.fieldValue = event.target.value;
                  }
                }
              });
            } else {
              return h("div", params.row.fieldValue);
            }
          }
        },
        {
          title: "排序",
          key: "sort",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h("input", {
                domProps: {
                  value: params.row.sort
                },
                style: {
                  border: "none",
                  borderBottom: "1px solid #c5c8ce",
                  backgroundColor: "#fff",
                  outline: "none"
                },
                on: {
                  input: function(event) {
                    params.row.sort = event.target.value;
                  }
                }
              });
            } else {
              return h("div", params.row.sort);
            }
          }
        },
        // {
        //   title: "标准周期(小时)",
        //   width: 180,
        //   key: "delayHour",
        //   align: "center",
        //   render: function(h, params) {
        //     if (params.row.$isEdit) {
        //       return h("input", {
        //         domProps: {
        //           value: params.row.delayHour
        //         },
        //         style: {
        //           border: "none",
        //           borderBottom: "1px solid #c5c8ce",
        //           backgroundColor: "#fff",
        //           outline: "none"
        //         },
        //         on: {
        //           input: function(event) {
        //             params.row.delayHour = event.target.value;
        //           }
        //         }
        //       });
        //     } else {
        //       return h("div", params.row.delayHour);
        //     }
        //   }
        // },
        {
          title: "操作",
          key: "opt",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                on: {
                  click: event => {
                    let that = this;
                    let target = event.target || event.srcElement;
                    switch (target.id) {
                      case "delete":
                        that.delProcessStatus(params);
                        break;
                      case "edit":
                        if (params.row.$isEdit) {
                          that.handleSave(params.row);
                        } else {
                          that.handleEdit(params.row);
                        }
                        break;
                      case "focus":
                        that.handleIsSubscribe(params.row);
                        break;
                    }
                  }
                }
              },
              [
                h(
                  "a",
                  {
                    attrs: {
                      id: "delete"
                    },
                    style:{
                      display:(this.isCompanyAdmin||this.isAdmin) ? 'inline-block':'none'
                    }
                  },
                  "删除"
                ),
                h("span", {
                  style: {
                    height: "10px",
                    borderLeft: "1px solid #39f",
                    margin: "0px 5px",
                    display:(this.isCompanyAdmin||this.isAdmin) ? 'inline-block':'none'
                  }
                }),
                h(
                  "a",
                  {
                    attrs: {
                      id: "edit"
                    },
                    style:{
                      display:(this.isCompanyAdmin||this.isAdmin) ? 'inline-block':'none'
                    }
                  },
                  params.row.$isEdit ? "保存" : "编辑"
                ),
                h("span", {
                  style: {
                    height: "10px",
                    borderLeft: "1px solid #39f",
                    margin: "0px 5px",
                    display:(this.isCompanyAdmin||this.isAdmin) ? 'inline-block':'none'
                  }
                }),
                h(
                  "a",
                  {
                    attrs: {
                      id: "focus"
                    }
                  },
                  params.row.isSubscribe ? "关注中" : "关注"
                )
              ]
            );
          }
        }
      ],
      processData: [],
      dataTotal: 0,
      pageIndex: 1,
      pageSize: 5,
      processValue: "",
      showModal: false,
      processInfoItem: {
        fieldValue: "",
        fieldCode: "biProcessStatus",
        sort: ""
      },
      ruleValidate: {
        fieldValue: [
          {
            required: true,
            message: "流程状态不能为空",
            trigger: "blur"
          }
        ],
        fieldCode: [
          {
            required: true,
            message: "流程状态编码不能为空",
            trigger: "blur"
          }
        ],
        sort: [
          {
            required: true,
            message: "排序值不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },

  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },

    isCompanyAdmin: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    getProcessStatusByListId() {
      this.loading = true;
      getProcessStatusByListId(this.listId, this.pageIndex, this.pageSize).then(
        res => {
          this.loading = false;
          this.processData = res.tableContent;
          this.dataTotal = res.dataCount;
        }
      );
    },
    onPageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getProcessStatusByListId();
    },
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getProcessStatusByListId();
    },
    delProcessStatus(params) {
      let param = [params.row];
      this.$Modal.confirm({
        title: "确认",
        content: "确认删除此状态？",
        onOk: () => {
          deleteProcessStatus(param).then(res => {
            if (res.success === true) {
              this.getProcessStatusByListId();
              this.$Message.info(res.message);
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      });
    },
    handleSave(param) {
      updateProcessStatus([param]).then(res => {
        if (res.success === true) {
          this.$Message.info("更新成功");
          this.getProcessStatusByListId();
        } else {
          this.$Message.error(res.message);
        }
      });
      this.$set(param, "$isEdit", false);
    },
    handleEdit(param) {
      this.$set(param, "$isEdit", true);
    },

    /**
     * 流程管理--是否关注
     */
    handleIsSubscribe(row) {
      let id = row.id;
      //取消关注
      if (row.isSubscribe) {
        unsubscribeAppByRelationKey(id).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.$set(row, "isSubscribe", 0);
          }
        });
      } else {
        subscribeApp(id).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.$set(row, "isSubscribe", 1);
          }
        });
      }
    },

    addProcessStatus() {
      this.processInfoItem.listId = this.$route.params.listId;
      this.$refs["processInfoItem"].validate(valid => {
        if (valid) {
          addProcessStatus([this.processInfoItem]).then(res => {
            if (res.success === true) {
              this.$Message.info("添加成功");
              this.getProcessStatusByListId();
              this.$refs["processInfoItem"].resetFields();
              this.processInfoItem.fieldValue = "";
              this.processInfoItem.sort = "";
              this.showModal = false;
            }
          });
        } else {
          this.$Message.error("请输入必填项");
        }
      });
    },
    addProcess() {
      this.showModal = true;
      this.processInfoItem.fieldValue = '';
      this.processInfoItem.sort = '';
    }
  },
  mounted() {
    this.getProcessStatusByListId();
  }
};
</script>


