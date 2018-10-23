<style lang="less" scoped>
@import "./dictionaryManage.less";
</style>
 <template>
  <div class="wrap">
    <div class="wrap-table">
      <br>
      <Table :loading="loading" :columns="columns1" :data="dictionaryData">
      </Table>
      <!-- <div style="margin: 10px;overflow: hidden">
                <div class="fr">
                    <Page :total="pageTotal" @on-page-size-change="pageSizeChange" :current="currentPage" :page-size="pageSize" size="small" @on-change="pageChange" show-sizer show-elevator show-total/>
                </div> -->
    </div>
  </div>
  </div>
</template>

<script>
import {
  getMenuByParentId,
  disableMenuItem,
  updateMenuItem
} from "@/services/dictionaryService.js";
import Sortable from "sortablejs";
export default {
  data() {
    return {
      sortable: null,
      dictionaryData: [],
      loading: false,
      columns1: [
        {
          title: "名称",
          key: "name",
          width: 180,
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h("input", {
                domProps: {
                  value: params.row.name
                },
                style: { width: "150px" },
                on: {
                  input: function(event) {
                    params.row.name = event.target.value;
                  }
                }
              });
            } else {
              return h("div", params.row.name);
            }
          }
        },
        {
          title: "简称",
          key: "shortName",
          width: 180,
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h("input", {
                domProps: {
                  value: params.row.shortName
                },
                style: { width: "150px" },
                on: {
                  input: function(event) {
                    params.row.shortName = event.target.value;
                  }
                }
              });
            } else {
              return h("div", params.row.shortName);
            }
          }
        },
        {
          title: "值",
          key: "value",
          width: 180,
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h("input", {
                domProps: {
                  value: params.row.value
                },
                style: { width: "150px" },
                on: {
                  input: function(event) {
                    params.row.value = event.target.value;
                  }
                }
              });
            } else {
              return h("div", params.row.value);
            }
          }
        },
        {
          title: "类型",
          key: "type",
          width: 150,
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h("input", {
                domProps: {
                  value: params.row.type
                },
                style: { width: "100px" },
                on: {
                  input: function(event) {
                    params.row.type = event.target.value;
                  }
                }
              });
            } else {
              return h("div", params.row.type);
            }
          }
        },
        {
          title: "排序",
          key: "sort",
          width: 80,
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
          title: "编辑",
          key: "action",
          width: 80,
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
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
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
                      this.deleteMenuItem(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    getDictionarybyParentId(parentId) {
      this.loading = true;
      getMenuByParentId(parentId).then(res => {
        this.dictionaryData = res;
        this.loading = false;
      });
    },
    handleEdit(row) {
      this.$set(row, "$isEdit", true);
    },
    handleSave(row) {
      let data = {
        id: row.id,
        name: row.name,
        parentId: row.parentId,
        shortName: row.shortName,
        sort: row.sort,
        type: row.type,
        value: row.value
      };
      updateMenuItem(data).then(res => {
        if (res.success === true) {
          this.$Message.info("保存成功");
        } else {
          this.$Message.error(res.message);
        }
      });
      this.$set(row, "$isEdit", false);
    },
    deleteMenuItem(id) {
      this.$Modal.confirm({
        title: "确认",
        content: "确认删除此明细？",
        onOk: () => {
          disableMenuItem(id).then(res => {
            if (res.success === true) {
              this.$Message.info("删除成功");
              this.getDictionarybyParentId(this.$route.params.dicId);
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      });
    }
    // setSort() {
    //   const el = document
    //     .querySelectorAll(".ivu-table-wrapper ")[0]
    //     .querySelectorAll("table")[0];
    //   this.sortable = Sortable.create(el, {
    //     ghostClass: "sortable-ghost",
    //     setData: function(dataTransfer) {
    //       dataTransfer.setData("Text", ""); // to avoid Firefox bug
    //     },
    //     onEnd: evt => {
    //       const targetRow = this.dictionaryData.splice(evt.oldIndex, 1)[0];
    //       const tempIndex = this.numberList.splice(evt.newIndex, 1)[0];
    //       let data = {
    //         anticipationId: targetRow.anticipationId,
    //         priorityNumber: tempIndex
    //       };
    //         codeAnticipationApi
    //           .anticipationPriority(data)
    //           .then(res => {
    //             this.page = 1;
    //             this.$set(this, "dataList", []);
    //             this.$nextTick(() => {
    //               this.$refs.Infinite.$emit("$InfiniteLoading:reset");
    //             });
    //           })
    //           .catch(error => {
    //             this.$message.error("排序失败：" + error);
    //           });
    //     }
    //   });
    // }
  },
  mounted() {
    this.getDictionarybyParentId(this.$route.params.dicId);
  }
};
</script>

