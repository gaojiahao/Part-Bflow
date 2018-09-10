<template>
  <Modal v-model="modelState" :title="'任务列表 - '+taskValue" width="660" @on-visible-change="modalVisibleChange" closable>
    <div style="position: relative">
      <div class="input-filter-box">
        <label class="input-filter-lebal">交易号:</label>
        <Input v-model="filterData.transCode" placeholder="请输入交易号" style="width: 127px;margin-left:12px"></Input>
      </div>
      <div class="input-filter-box">
        <label class="input-filter-lebal">创建者:</label>
        <Input v-model="filterData.creatorName" placeholder="请输入创建者" style="width: 127px;margin-left:12px"></Input>
      </div>
      <div class="input-filter-box">
        <label class="input-filter-lebal">当前用户:</label>
        <Input v-model="filterData.assigneeName" placeholder="请输入审批者" style="width: 127px;margin-left:12px"></Input>
      </div>
      <div class="input-crttime" v-show="expand">
        <div class="input-filter-box">
          <label class="input-filter-lebal">当前节点:</label>
          <Input v-model="filterData.nodeName" placeholder="请输入当前节点" style="width: 127px;margin-left:12px"></Input>
        </div>
        <div class="input-filter-box">
          <label class="input-filter-lebal">创建时间:</label>
          <DatePicker v-model="filterData.crtTime" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请输入过滤时间" style="width: 170px"></DatePicker>
        </div>
      </div>
      <div class="action-btn">
        <Button type="primary" size="small" @click="filterTaskBtn">查询</Button>
        <Button size="small" @click="clearInputValue">重置</Button>
        <span class="expand" @click="expandCrtTime">
          {{expandValue}}
          <i class="iconfont" v-html="expandIcon"></i>
        </span>
      </div>
    </div>

    <!-- <Scroll :on-reach-edge="handleReachBottom" height='233'> -->
    <Table :loading="loading" :data="columnData" :columns="columns" size="small" @on-sort-change="handleSort" stripe></Table>
    <!-- </Scroll> -->
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pageTotal" :current="currentPage" :page-size="pageSize" size="small" @on-change="changeCurrentPage" show-total show-elevator></Page>
      </div>
    </div>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script>
import { getAppTaskCount } from "@/services/flowService";
import { FormatDate } from "@/utils/utils";
export default {
  name: "TaskModal",
  data() {
    return {
      columns: [
        {
          title: "交易号",
          key: "transCode",
          sortable: "custom",
          width: 160,
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: "/Form/index.html?data=" + params.row.transCode,
                  target: "_blank"
                }
              },
              params.row.transCode
            );
          }
        },
        {
          title: "当前节点",
          key: "nodeName"
        },
        {
          title: "当前用户",
          key: "assigneeName",
          width: 90
        },
        {
          title: "创建者",
          key: "creatorName",
          width: 90
        },
        {
          title: "创建时间",
          key: "crtTime",
          sortable: "custom",
          width: 160,
          render: (h, params) => {
            //时间戳转换为日期格式
            function formatDateTime(inputTime) {
              let date = new Date(inputTime);
              let y = date.getFullYear();
              let m = date.getMonth() + 1;
              m = m < 10 ? "0" + m : m;
              let d = date.getDate();
              d = d < 10 ? "0" + d : d;
              let h = date.getHours();
              h = h < 10 ? "0" + h : h;
              let minute = date.getMinutes();
              let second = date.getSeconds();
              minute = minute < 10 ? "0" + minute : minute;
              second = second < 10 ? "0" + second : second;
              return (
                y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second
              );
            }
            return h("span", formatDateTime(params.row.crtTime));
          }
        }
      ],
      columnData: [],
      loading: true, //table是否加载
      pageTotal: 0, //table总数
      pageSize: 6,
      currentPage: 1, //table当前页
      modelState: false,
      filterData: {
        //过滤所需参数绑定
        transCode: "",
        creatorName: "",
        crtTime: [],
        assigneeName: "",
        nodeName: ""
      },
      sort: "",
      expand: false,
      expandValue: "展开",
      expandIcon: "&#xe617;"
    };
  },
  props: {
    listId: {
      type: String
    },
    modal: {
      type: Boolean
    },
    taskValue: {
      type: String
    },
    type: {
      type: String
    },
    orderCode: {
      type: String
    },
    projectName:{
      type:String
    }
  },

  watch: {
    listId: {
      handler: function(value, oldValue) {
        this.getTaskList();
      }
    },
    modal: function(value, oldValue) {
      this.modelState = value;
    }
  },

  methods: {
    /**
     * 分页加载
     */
    changeCurrentPage(currentPage) {
      this.currentPage = currentPage;
      this.getAppTaskCount(this.sort, currentPage);
    },

    /** 
       column：当前列数据
        key：排序依据的指标
          order：排序的顺序，值为 asc 或 desc
      */
    handleSort(column, key, order) {
      let sort = {};
      sort[column.key] = column.order;
      this.sort = sort;
      this.getAppTaskCount(sort, this.currentPage);
    },

    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitModal", { modal: false, listId: "" });
        this.filterData.transCode = "";
        this.filterData.creatorName = "";
        this.filterData.crtTime = "";
        this.filterData.assigneeName = "";
        this.filterData.nodeName = "";
        this.expand = false;
        this.sort = "";
        this.currentPage = 1;
        this.expandValue = "展开";
      }
    },

    //清空输入框
    clearInputValue: function() {
      this.filterData.transCode = "";
      this.filterData.creatorName = "";
      this.filterData.crtTime = "";
      this.filterData.assigneeName = "";
      this.filterData.nodeName = "";
      this.filterTaskBtn();
    },

    getTaskList: function() {
      let params = {
        type: this.type,
        page: this.currentPage,
        listId: this.listId,
        limit: this.pageSize
      };
      if (this.orderCode) {
        params.filter = { orderCode: this.orderCode };
      }
      if('filter' in params.filter && this.projectName){
        params.filter.projectName = this.projectName
      }else{
        params.filter = {projectName:this.projectName};
      }
      params.filter = JSON.stringify(params.filter);
      this.loading = true;
      getAppTaskCount(params).then(res => {
        this.pageTotal = res.total;
        this.columnData = res.tableContent;
        this.loading = false;
      });
    },

    //查询过滤
    filterTaskBtn: function(e) {
      this.currentPage = 1;
      this.getAppTaskCount("", 1);
    },

    getAppTaskCount(sort, page) {
      let crtTime = "";
      if (this.filterData.crtTime.length > 0 && this.filterData.crtTime[0]) {
        crtTime =
          FormatDate(this.filterData.crtTime[0], "yyyy-MM-dd") +
          "/" +
          FormatDate(this.filterData.crtTime[1], "yyyy-MM-dd");
      }
      if (this.orderCode) {
        this.filterData.orderCode = this.orderCode;
      }
      if(this.projectName){
        this.filterData.projectName=this.projectName;
      }
      this.filterData.crtTime = crtTime;
      let params = {
        type: this.type,
        page: page,
        listId: this.listId,
        limit: this.pageSize,
        filter: JSON.stringify(this.filterData)
      };

      if (sort) {
        params.sort = JSON.stringify(sort);
      }

      this.loading = true;
      getAppTaskCount(params).then(res => {
        this.pageTotal = res.total;
        this.columnData = res.tableContent;
        this.loading = false;
      });
    },

    expandCrtTime: function() {
      if (!this.expand) {
        this.expand = true;
        this.expandValue = "收起";
        this.expandIcon = "&#xe618;";
      } else {
        this.expand = false;
        this.expandValue = "展开";
        this.expandIcon = "&#xe617;";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.input-filter-box {
  display: inline-block;
  margin-bottom: 5px;
}

.input-filter-lebal {
  width: 60px;
  display: inline-block;
  text-align: right;
  text-overflow: ellipsis;
  overflow: hidden;
}

.action-btn {
  // position: absolute;
  display: inline-block;
  margin-bottom: 5px;
  height: 35px;
  margin-left: 13px;
  button {
    margin-left: 5px;
  }
}
.expand {
  font-size: 13px;
  margin-left: 5px;
}

.expand:hover {
  cursor: pointer;
  color: red;
}

.input-crttime {
  display: inline-block;
}
</style>


