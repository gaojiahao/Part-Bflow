<style lang="less" scoped>
  @import "./list.less";
</style>

<template>
    <div class="check-list">
        <Row>
            <h2 class="check-list-title">点检表</h2>
        </Row>
        <Row class="check-list-table">
            <Button class="check-list-btn" type="primary" @click="goAddCheckSheet">新增</Button>
            <Table :columns="columns" :data="data" size="small"></Table>
            <div class="user-page">
                <div style="float: right;">
                    <Page 
                    :total="total" 
                    :current="currentPage" 
                    :page-size="pageSize"
                    @on-page-size-change="onPageSizeChange" 
                    @on-change="onPageChange" 
                    size="small" show-elevator show-sizer />
                </div>
            </div>
        </Row>
    </div>
</template>

<script>
import {
  listCheckKeyTable,
  deleteCheckKeyTable
} from "@/services/performanceStandardService.js";

export default {
  name: "checkSheet",
  components: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      columns: [
        {
          type: "index",
          width: 80
        },
        {
          title: "点检表名称",
          key: "name",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.$router.push({
                      name: "checkSheetDetail",
                      path: "/checkSheet/detail",
                      params: { id: params.row.id }
                    });
                  }
                }
              },
              params.row.name
            );
          }
        },
        {
          title: "检查内容项",
          key: "comment"
        },
        {
          title: "创建者",
          key: "creatorName"
        },
        {
          title: "创建时间",
          key: "crtTime"
        },
        {
          title: "修改者",
          key: "menderName"
        },
        {
          title: "修改时间",
          key: "modTime"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      deleteCheckKeyTable(params.row.id)
                        .then(res => {
                          if (res.success) {
                            this.$Message.success(res.message);
                            this.getCheckSheetData();
                          }
                        })
                        .catch(error => {
                          this.$Message.error(error.data.message);
                        });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  methods: {
    //点击分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getCheckSheetData();
    },
    //点击切换下级用户每页显示条数
    onPageSizeChange(size) {
      this.pageSize = size;
      this.getCheckSheetData();
    },
    goAddCheckSheet() {
      this.$router.push({
        path: "/checkSheet/detail"
      });
    },
    //获取点检表数据
    getCheckSheetData() {
      listCheckKeyTable(this.currentPage, this.pageSize).then(res => {
        this.data = res.tableContent;
        this.total = res.dataCount;
      });
    }
  },
  mounted() {
    this.getCheckSheetData();
  }
};
</script>

