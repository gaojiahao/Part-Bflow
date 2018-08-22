<template>
  <div class="card ivu-card ivu-card-bordered">
    <Poptip class="badge-custom" width="630" placement="right-end" @on-popper-show="popperShow" v-if="type!=='subject'">
      <Badge :count="taskCount"></Badge>
      <div slot="title">
        <h3>{{appinfo.text+' - 待办任务'}}</h3>
      </div>
      <div slot="content" class="api">
        <Table :columns="columns" :data="columnData"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="pageTotal" :current="currentPage" size="small" :page-size="pageSize" @on-change="changeCurrentPage" show-total></Page>
          </div>
        </div>
      </div>
    </Poptip>
    <div style="display:inline-block" @click="redirectTo(appinfo)">
      <Badge class="badge-custom" :count="taskCount" v-if="type==='subject'"></Badge>
    </div>

    <img :src="appinfo.icon" />
    <div @click="redirectTo(appinfo)" class="content">
      <a @click="goAppSetting(appinfo)" class="content-detail">详情</a>
      <h5>{{appinfo.text}}</h5>
      <span>{{appinfo.administrator?appinfo.transName+', ':appinfo.transName}}</span>
      <span>{{appinfo.administrator}}</span>
    </div>
  </div>
</template>

<script>
import { getAppTaskCount } from "@/services/flowService";
export default {
  props: ["appinfo", "allTaskCount"],
  data() {
    return {
      taskCount: 0,
      type: this.appinfo.url.split("/")[0],
      columns: [
        {
          title: "交易号",
          key: "transCode",
          sortable: true,
          width: 160,
          align: "center",
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
          sortable: true
        },
        {
          title: "任务创建时间",
          key: "crtTime",
          width: 150,
          align: "center",
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
      loading: true,
      pageTotal: 0, //table总数
      pageSize: 5,
      currentPage: 1, //table当前页
      pageListId: ""
    };
  },
  created() {
    if (!~this.appinfo.icon.indexOf("/dist/")) {
      this.appinfo.icon = "/dist/" + this.appinfo.icon;
    }
    let listId = this.appinfo.url.split("/")[1];
    let f = this.allTaskCount.filter(f => {
      return f.listId === listId;
    });
    if (f.length > 0) {
      this.taskCount = f[0].total;
    }
  },

  watch: {
    allTaskCount: {
      handler: function(val, oldValue) {
        let listId = this.appinfo.url.split("/")[1];
        let f = val.filter(f => {
          return f.listId === listId;
        });
        if (f.length > 0) {
          this.taskCount = f[0].total;
        }
      },
      deep: true
    }
  },
  methods: {
    /**
     * 新怡环境下应用链接跳转
     */
    redirectTo: function(appInfo) {
      let url = appInfo.url;
      let nr = window.top.document.getElementById("frame1").getAttribute("nr");
      if (appInfo.target === "_blank") {
        window.open(url, "_blank");
      } else {
        if (!nr) {
          if (~url.indexOf("outlink")) {
            url = url;
          } else if (~appInfo.url.indexOf("app")) {
            url = "appReport/" + url;
          } else {
            url = "report/" + url;
          }
        }

        window.top.postMessage(
          {
            type: "redirect",
            url: url
          },
          "*"
        );
      }
    },

    popperShow(e) {
      this.pageListId = this.appinfo.url.split("/")[1];
      let params = {
        type: "myToDo",
        page: this.currentPage,
        listId: this.pageListId,
        limit: this.pageSize
      };
      getAppTaskCount(params).then(res => {
        this.pageTotal = res.total;
        if (res.tableContent.length > 0) {
          this.columnData = res.tableContent;
          this.loading = false;
        }
      });
    },

    /**
     * 分页加载
     */
    changeCurrentPage(currentPage) {
      let params = {
        type: "myToDo",
        page: currentPage,
        listId: this.pageListId,
        limit: this.pageSize
      };
      this.loading = true;
      getAppTaskCount(params).then(res => {
        if (res.tableContent.length > 0) {
          this.columnData = res.tableContent;
          this.loading = false;
        }
      });
    },
    goAppSetting(list) {
      let url = "appReport/" + list.id;
      window.top.postMessage(
        {
          type: "redirect",
          url: url
        },
        "*"
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "./common.less";

.card {
  height: 70px;
  padding: 10px 12px;
  margin: 10px 0;
  border-radius: 0px;
  img {
    height: 50px;
    width: 50px;
    z-index: 1;
    cursor: pointer;
    // position: relative;
  }

  img:hover {
    cursor: auto;
  }
  .content {
    cursor: pointer;
    font-size: @card-text-font-size;
    width: 60%;
    text-overflow: ellipsis;
    overflow: hidden;
    z-index: 1;
    white-space: nowrap;
    color: #000;
    position: absolute;
    top: 50%;
    left: 80px;
    transform: translateY(-50%);

    &-detail {
      display: none;
      float: right;
      font-size: 14px;
    }

    h5 {
      position: relative;
      z-index: -99;
      font-size: 16px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    span {
      font-size: 12px;
      color: #5f5e5e;
    }
  }

  .badge-custom {
    top: -13px;
    cursor: pointer;
    left: -10px;
    z-index: 10;
    position: absolute;
    transform: translateX(0);
  }
}

.api {
  position: relative;
  z-index: 100;
}

.card:hover {
  .content-detail {
    display: inline-block;
  }
  -webkit-transition: box-shadow 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0s;
  -moz-transition: box-shadow 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0s;
  -o-transition: box-shadow 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0s;
  transition: box-shadow 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0s;
  box-shadow: 0 15px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.05);
}

.ivu-card {
  background: #fff;
  font-size: 16px;
  position: relative;
  transition: all 0.2s ease-in-out;
}
.ivu-card-bordered {
  border: 1px solid #dddee1;
  border-color: #e9eaec;
  box-shadow: 4px 4px 10px #bbb8b8;
}
</style>
