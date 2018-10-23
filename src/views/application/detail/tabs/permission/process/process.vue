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
      <Modal v-model="showModal" title="新增流程状态" @on-ok="addProcessStatus" @on-cancel="cancel">
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
        <div slot="footer">
          <Button type="text" size="large" @click="showModal=false">取消</Button>
          <Button type="primary" size="large" @click="addProcessStatus">确定</Button>
        </div>
      </Modal>
      <Table :columns="columns" :data="processData" size="small"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div class="fr">
          <Page @on-page-size-change="onPageSizeChange" :total="dataTotal" show-elevator :current="pageIndex" :page-size="pageSize" @on-change="pageChange" size="small" show-total></Page>
        </div>
      </div>
    </Row>
  </div>
</template>
<script>
import {
  getProcessStatus,
  deleteProcessStatus,
  updateProcessStatus,
  addProcessStatus
} from "@/services/appService.js";
export default {
  data() {
    return {
      columns: [
        {
          title: "流程状态",
          key: "fieldValue",
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h("input", {
                domProps: {
                  value: params.row.fieldValue
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
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h("input", {
                domProps: {
                  value: params.row.sort
                },
                style: { width: "50px" },
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
        {
          title: "操作",
          key: "opt",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.delProcessStatus(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        },
        {
          title: "编辑",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      if (params.row.$isEdit) {
                        this.handleSave(params.row);
                      } else {
                        this.handleEdit(params.row);
                      }
                    }
                  }
                },
                params.row.$isEdit ? "保存" : "编辑"
              )
            ]);
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
  methods: {
    getProcessStatusByListId() {
      let param = {
        listId: this.$route.params.listId,
        limit: this.pageSize,
        page: this.pageIndex
      };
      getProcessStatus(param).then(res => {
        this.processData = res.tableContent;
        this.dataTotal = res.dataCount;
      });
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
              this.$Message.info("删除成功");
              this.getProcessStatusByListId();
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
    }
  },
  mounted() {
    this.getProcessStatusByListId();
  }
};
</script>


