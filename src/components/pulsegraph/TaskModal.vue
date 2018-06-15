<template>
  <Modal v-model="modelState" :title="'任务列表 - '+taskValue" width="560" @on-visible-change="modalVisibleChange" closable>
    <div>
      <div class="input-filter-box">
        <label>交易号:</label>
        <Input v-model="transCode" placeholder="请输入交易号" style="width: 127px;margin-left:12px" class="input-transcode"></Input>
      </div>
      <div class="input-filter-box">
        <label>创建者:</label>
        <Input v-model="creatorName" placeholder="请输入创建者" style="width: 127px;margin-left:12px"></Input>
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
    <div class="input-crttime" v-show="expand">
      <label>创建时间:</label>
      <DatePicker v-model="crtTime" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请输入过滤时间" style="width: 170px"></DatePicker>
    </div>

    <!-- <Scroll :on-reach-edge="handleReachBottom" height='233'> -->
    <Table :loading="loading" :data="columnData" :columns="columns" size="small" stripe></Table>
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
import { getDateFormat } from "@/utils/utils";
export default {
  name: "TaskModal",
  data() {
    return {
      columns: [
        {
          title: "交易号",
          key: "transCode",
          sortable: true,
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
          title: "创建者",
          key: "creatorName",
          sortable: true
        },
        {
          title: "任务创建时间",
          key: "crtTime",
          sortable: true,
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
      transCode: "",
      creatorName: "",
      crtTime: [],
      expand: false,
      expandValue: "展开",
      expandIcon: "&#xe617;"
    };
  },
  props: ["listId", "modal", "taskValue","type"],

  watch: {
    listId: {
      handler: function(value, oldValue) {
        this.filterTaskBtn();
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
      this.filterTaskBtn();
    },

    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitModal", { modal: false, listId: "" });
        this.transCode = "";
        this.creatorName = "";
        this.crtTime = "";
        this.currentPage = 1;
      }
    },

    //清空输入框
    clearInputValue: function() {
      this.transCode = "";
      this.creatorName = "";
      this.crtTime = "";
      this.filterTaskBtn();
    },

    //查询过滤
    filterTaskBtn: function(e) {
      let crtTime = "";
      if (this.crtTime.length > 0 && this.crtTime[0]) {
        crtTime =
          getDateFormat(this.crtTime[0], "yyyy-MM-dd") +
          "/" +
          getDateFormat(this.crtTime[1], "yyyy-MM-dd");
      }
      let params = {
        type: this.type,
        page: this.currentPage,
        listId: this.listId,
        limit: this.pageSize,
        filter: {
          transCode: this.transCode,
          creatorName: this.creatorName,
          crtTime: crtTime
        }
      };
      if (!crtTime && !this.transCode && !this.creatorName) {
        delete params.filter;
      }
      this.loading = true;
      getAppTaskCount(params).then(res => {
        this.pageTotal = res.total;
       // if (res.tableContent.length > 0) {
          this.columnData = res.tableContent;
          this.loading = false;
       // }
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
  margin-right: 5px;
}
.action-btn {
  position: absolute;

  display: inline-block;
  margin-bottom: 5px;
  height: 35px;

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
  margin-bottom: 5px;
}



</style>


