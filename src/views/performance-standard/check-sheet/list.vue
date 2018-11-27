<style lang="less" scoped>
  @import "./list.less";
</style>

<template>
    <div class="check-list">
        <Row class="check-list-table">
          <div style="margin-bottom:15px;">
            <span 
              class="check-list-btn" 
              type="primary" 
              @click="goAddCheckSheet">
              新增</span>
            <div class="app-search">
              <Input 
                @on-search="checkSheetFilter" 
                :search="true" 
                v-model="searchValue" 
                placeholder="搜索点检表名称" 
                style="width: 300px">
              </Input>
            </div>
          </div>
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
        <Modal
          v-model="showModal"
          title="检查项"
          width=1000
          :styles="{top: '20px'}">
          <Table 
            :columns="itemColumns" 
            :data="itemData" 
            size="small" 
            height="500" 
            style="margin-top:5px;"></Table>
          <div slot="footer"></div>
      </Modal>
    </div>
</template>

<script>
import {
  listCheckKeyTable,
  deleteCheckKeyTable,
  listCheckContent
} from "@/services/performanceStandardService.js";

export default {
  name: "checkSheet",
  components: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      showModal: false,
      searchValue: '',
      itemColumns: [
        {
          type: "index",
          width: 80
        },
        {
          title: "检查项目",
          key: "title"
        },
        {
          title: "检查内容",
          key: "content",
          width: 400
        },
        {
          title: "修改者",
          key: "menderName"
        },
        {
          title: "修改时间",
          key: "modTime"
        }
      ],
      itemData: [],
      columns: [
        {
          type: "index",
          width: 80
        },
        {
          title: "点检表名称",
          key: "name",
          width: 150,
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
          title: "描述",
          key: "comment",
          width: 400
        },
        {
          title: "检查项",
          key: "comment",
          render: (h,params) => {
            return h('a',{
              on: {
                click: () => {
                    this.showModal = true;
                    this.getCheckSheetItemData(params.row.id);
                }
              }
            },params.row.num);
          }
        },
        {
          title: "修改者",
          key: "menderName"
        },
        {
          title: "修改时间",
          key: "modTime",
          width: 180
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.deleteCheckSheetData(params);
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
    //获取检查项目数据
    getCheckSheetItemData(id) {
      listCheckContent(id,1,1000).then(
        res => {
          this.itemData = res.tableContent;
        }
      );
    },
    //点检列表查询
    checkSheetFilter() {
      let filter = JSON.stringify([{operator:"like",value:this.searchValue,property:"name"}]);
      this.currentPage = 1;
      this.getCheckSheetData(filter);
    },
    //点击分页
    onPageChange(currentPage) {
      let filter = JSON.stringify([{operator:"like",value:this.searchValue,property:"name"}]);
      this.currentPage = currentPage;
      this.getCheckSheetData(filter);
    },
    //点击切换下级用户每页显示条数
    onPageSizeChange(size) {
      let filter = JSON.stringify([{operator:"like",value:this.searchValue,property:"name"}]);
      this.pageSize = size;
      this.getCheckSheetData(filter);
    },
    //进入点检列表详情
    goAddCheckSheet() {
      this.$router.push({
        path: "/checkSheet/detail"
      });
    },
    //删除点检表某一条数据
    deleteCheckSheetData(params) {
      this.$Modal.confirm({
        title: "确认",
        content: "确认删除<b style=color:#e4393c;>"+params.row.name+"</b>么？",
        onOk: () => {
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
      });
    },
    //获取点检表数据
    getCheckSheetData(filter) {
      listCheckKeyTable(this.currentPage, this.pageSize,filter).then(res => {
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

