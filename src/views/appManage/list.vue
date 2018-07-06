<style lang="less" scoped>
@gray: #ddd;
@white: #fff;
@blue: #39f;

.ivu-table .demo-table-info-row td span {
  color: #eee;
}

.app-body {
  position: relative;
  top: 60px;
  left: 0px;
}
.ivu-table-wrapper {
  border: none;
}

.top-head {
  position: fixed;
  width: 100%;
  height: 60px;
  line-height: 60px;
  z-index: 99;
  background-color: @white;
  border-bottom: 1px solid @gray;
  padding: 0 15px;

  &-search {
    float: right;
    
    .app-search-icon {
      font-size: 1rem;
      color: @blue;
    }
  }
  .app-layout {
    float: right;
  
    .view-cut-focus {
      display: inline;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 2px 7px;
      border-radius: 3px;
    }
   
     .view-cut-focus:hover {
      background-color: @blue;
      color: @white;
    }
    
  }
}
.ivu-btn {
  border-radius: 0px;
}
</style>

<template>
  <div>
    <div v-if="showAppList">
      <header class="top-head">
        <router-link to="/app/add">
          <Button @click="isShowAppList" class="add-btn" icon="plus-round">
            添加应用</Button>
        </router-link>
        <Button v-if="showDeleteAll" class="top-head" type="error" icon="android-delete">
          批量删除</Button>
        <div class="app-layout">
          <div @click="showListView" class=" view-cut-focus">
            <Tooltip content="列表视图" placement="top">
              <Icon type="android-menu"></Icon>
            </Tooltip>
          </div>
          <div @click="showCardView" class="view-cut-focus">
            <Tooltip content="卡片视图" placement="top">
              <Icon type="android-apps"></Icon>
            </Tooltip>
          </div>
        </div>
        <div class="top-head-search">
          <Icon class="app-search-icon" type="search"></Icon>
          <Input v-model="searchValue" placeholder="搜索" style="width: 300px"></Input>
        </div>
      </header>
      <!-- 分类显示所有应用 -->
      <div class="app-body">
        <!-- 列表展示应用 -->
        <div v-if="showTableList">
          <Table size="small" :stripe="true" :row-class-name="rowClassName" @on-select="selectApp" @on-select-cancel="cancelSelectApp" :columns="columns" :data="tableData" no-data-text="暂无数据">
          </Table>
        </div>
        <!-- card展示应用 -->
        <div v-else>
          <app-card-list :listData="tableData"></app-card-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { getAppListData } from "../../services/appService.js";
import AppCardList from "./cardList";
=======
import { getAppListData } from "@/services/appService.js";
import AppCardList from './cardList';
>>>>>>> 33cbab039c1cc069ed3d673ca448d3909e9acfc5

export default {
  name: "appList",
  components: {
    AppCardList
  },
  data() {
    return {
      value1: "0",
      showDeleteAll: false,
      modal1: false,
      showAppList: true,
      showTableList: false,
      searchValue: "",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          key: "title"
        },
        {
          title: "类型",
          key: "transType"
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "创建者",
          key: "creator"
        },
        {
          title: "状态",
          key: "status",
          width: 150,
          render: (h, params) => {
            if (params.row.publish) {
              return h("div", [
                h(
                  "b",
                  {
                    style: {
                      marginRight: "5px",
                      fontSize: "1rem",
                      color: "#00DB00"
                    }
                  },
                  "●"
                ),
                h("b", {}, "已发布")
              ]);
            } else {
              return h("div", [
                h(
                  "b",
                  {
                    style: {
                      marginRight: "5px",
                      fontSize: "1rem",
                      color: "#e4393c"
                    }
                  },
                  "●"
                ),
                h("b", {}, "未发布")
              ]);
            }
          }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.goDetail(params.row);
                    }
                  }
                },
                "设置"
              ),
              h("span", {
                style: {
                  height: "1rem",
                  borderLeft: "1px solid #ddd",
                  marginRight: "1rem",
                  marginLeft: "0.7rem"
                }
              }),
              h(
                "a",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: [],
      sameTableData: []
    };
  },
  methods: {
    selectApp(selection, row) {
      if (selection.length > 0) {
        this.showDeleteAll = true;
      }
    },
    cancelSelectApp(selection, row) {
      if (selection.length === 0) {
        this.showDeleteAll = false;
      }
    },
    isShowAppList() {
      this.showAppList = false;
    },
    rowClassName(row, index) {
      if (!row.publish) {
        return "demo-table-info-row";
      }
    },
    showListView() {
      this.showTableList = true;
    },
    showCardView() {
      this.showTableList = false;
    },
    goDetail(list) {
      this.showAppList = false;
<<<<<<< HEAD
      this.$router.push({
        path: "/app/detail",
        name: "detail",
        params: { appData: listData }
      });
=======
      this.$router.push({path: `/app/detail/${list.uniqueId}`,params: {listId: list.uniqueId}});
>>>>>>> 33cbab039c1cc069ed3d673ca448d3909e9acfc5
    }
  },
  watch: {
    searchValue(text) {
      const result = [];
      if (text) {
        this.sameTableData.forEach((val, index) => {
          if (val.title.indexOf(text) > -1) {
            result.push(val);
          }
        });
        this.tableData = result;
      } else {
        this.tableData = this.sameTableData;
      }
    }
  },
  mounted() {
    let filterParam = JSON.stringify([
      {
        operator: "ne",
        value: "value",
        property: "type"
      }
    ]);
    getAppListData(filterParam).then(res => {
      this.tableData = res.tableContent;
      this.sameTableData = res.tableContent;
    });
  }
};
</script>

