<style lang="less" scoped>
  @import './list.less';
</style>

<template>
  <div>
    <div v-if="showAppList">
      <header class="top-head">
        <router-link to="/app/add">
          <Button @click="isShowAppList" class="add-btn" icon="plus-round">
            添加应用</Button>
        </router-link>
        <div class="app-layout">
          <div @click="showListView" :class="{'view-cut-focus': isViewCutFocus,'active': isListAcive}">
            <Tooltip content="列表视图" placement="top">
              <Icon type="android-menu"></Icon>
            </Tooltip>
          </div>
          <div @click="showCardView" :class="{'view-cut-focus': isViewCutFocus,'active': isCardAcive}">
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
          <Table size="small" :stripe="true" :columns="columns" :data="tableData" no-data-text="暂无数据">
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
import { getAppListData, deleteApp } from "@/services/appService.js";
import AppCardList from './card-list';

export default {
  name: "appList",
  components: {
    AppCardList
  },
  data() {
    return {
      isListAcive: false,
      isViewCutFocus: true,
      isCardAcive: true,
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
          title: "应用大类",
          key: "type",
          render: (h, params) => {
            let bigType = '';
            if(params.row.type === 'business'){
              bigType = '业务应用';
            }else if(params.row.type === 'obj'){
              bigType = '基础对象';
            }else{
              bigType = '科目应用';
            }
            return h('span',{},bigType);
          }
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
            if (params.row.publish === 1) {
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
                      this.deleteApplication(params.index,params.row.uniqueId);
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
    isShowAppList() {
      this.showAppList = false;
    },
    //删除应用
    deleteApplication(index, uniqueId) {
      let params = {
        uniqueId: uniqueId,
        status: 0
      };
      if(params){
        this.$Modal.confirm({
          title: '确认',
          content: '确认删除此应用？',
          onOk: () => {
            deleteApp(params).then(res => {
              if(res.success){
                this.$Message.success(res.message);
                this.tableData.splice(index,1);
                this.sameTableData.splice(index,1);
              }
            })
          }
        })
      }
    },
    //展示列表视图
    showListView() {
      this.showTableList = true;
      this.isCardAcive = false;
      this.isListAcive = true;
    },
    //展示卡片视图
    showCardView() {
      this.showTableList = false;
      this.isCardAcive = true;
      this.isListAcive = false;
    },
    //点击设置
    goDetail(list) {
      this.showAppList = false;
      this.$router.push({path: `/application/detail/${list.uniqueId}`,params: {listId: list.uniqueId}});
    }
  },
  watch: {
    //监听搜索框值变化
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
        value: "template",
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

