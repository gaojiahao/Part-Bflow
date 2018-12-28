<template>
  <div class="card ">
    <Poptip class="badge-custom" width="720" placement="right-end" @on-popper-show="popperShow" v-if="type!=='subject'" >
      <Badge :count="taskCount"></Badge>
      <div slot="title">
        <label>{{appinfo.text+' - 待办任务'}}</label>
        <Button 
            type="primary" 
            style="height:28px;" 
            :disabled="onPageSelection.length === 0"
            @click="handleBatchApproval"
            >
            批量审批
        </Button>
      </div>
      <div slot="content" class="api">
        <Table 
          :loading ="loading"
          :columns="columns" 
          :data="columnData" 
          size="small"
          ref="selection" 
          @on-select-all="onSelectAll" 
          @on-selection-change="handerSelectionChange" 
          @on-select-cancel="onSelectCancel"
          >
        </Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="pageTotal" :current="currentPage" size="small" :page-size="pageSize" @on-change="changeCurrentPage" show-total></Page>
          </div>
        </div>

      </div>
    </Poptip>
    <div class="badge-custom" @click="redirectTo(appinfo)">
      <Badge :count="taskCount" v-if="type==='subject'" type="primary"></Badge>
    </div>

    <img 
      :src="appinfo.icon" 
      :class="'img-radius-'+this.appinfo.type"
      onerror='this.src="resources/images/icon/img-loading-error.png"'/>
    <div class="content">
      <div class="content-title">
        <Tooltip :content="appinfo.text" placement="top-start">
          <h5 @click="redirectTo(appinfo)">{{appinfo.text}}</h5>
        </Tooltip>
        <a @click.stop="goAppSetting(appinfo)" class="content-title-detail"  v-if="this.appinfo.type !== 'system'">详情</a>
      </div>
      <div class="content-instance">
        <span class="content-instance-name">{{appinfo.administrator?appinfo.transName:appinfo.transName}}</span>

        <my-pop-tip :userInfo="userInfo" trigger="click">
          <div @click="showUserInfo" slot="userCard" class="content-instance-admin">{{appinfo.administrator}}</div>
        </my-pop-tip>
        <Tooltip content="创建实例" :transfer="true" style="margin-left: 7px;float: right;">
          <i 
            class="iconfont content-instance-add" 
            @click="handlerAddInstance" 
            v-if="(this.appinfo.type === 'obj'||this.appinfo.type === 'business') && this.appinfo.action.add">
            &#xe620;
          </i>
        </Tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { getAppTaskCount, getFormViews,commitBatchTask } from "@/services/flowService";
import { getUserInfoByUserId } from "@/services/appService.js";
import MyPopTip from "@/components/poptip/MyPopTip";
export default {
  props: ["appinfo", "allTaskCount"],
  components: {
    MyPopTip
  },
  data() {
    return {
      taskCount: 0,
      type: this.appinfo.url.split("/")[0],
      onPageSelection:[],
      batchComment:"",//审批意见
      columns: [
         {
          type: 'selection',
          width: 60,
          align: 'center',
          key:'unableEdit',
        },
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
          width: 160,
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
      loading: false,
      pageTotal: 0, //table总数
      pageSize: 10,
      currentPage: 1, //table当前页
      pageListId: "",

      userInfo: {}
    };
  },
  created() {
    if (~this.appinfo.icon.indexOf("/dist/")) {
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

    showUserInfo() {
      let userId = this.appinfo.adminId;
      getUserInfoByUserId(userId).then(res => {
        if (res.dataCount) {
          this.userInfo = res.tableContent[0];
        }
      });
    },

    popperShow(e) {
      this.pageListId = this.appinfo.url.split("/")[1];
      let params = {
        type: "myToDo",
        page: this.currentPage,
        listId: this.pageListId,
        limit: this.pageSize
      };
      this.onPageSelection = [];
        this.loading = true;
      getAppTaskCount(params).then(res => {
        this.pageTotal = res.total;
        if (res.tableContent.length > 0) {
          this.columnData = res.tableContent;

          this.columnData.forEach(item=>{
            if(!item.unableEdit){
                item._disabled = true;
            }
          })
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

          this.columnData.forEach(item=>{
            if(this.onPageSelection.length>0){
                this.onPageSelection.forEach(sel=>{
                    if(sel.listId === item.listId){
                    item._checked = true;
                }
                })
            }
            if(!item.unableEdit){
                item._disabled = true;
            }
          })
          this.loading = false;
        }
      });
    },
    goAppSetting(list) {
      let url = "appSetting/" + list.listId;
      window.top.postMessage(
        {
          type: "redirect",
          url: url
        },
        "*"
      );
    },

    //创建应用实例
    handlerAddInstance() {
      let uniqueId = "";
      getFormViews(this.appinfo.listId).then(res => {
        if (res.length > 0) {
          uniqueId = res.filter(f => {
            return f.viewType === "submit";
          })[0].uniqueId;
          window.open(
            "/Form/index.html?model=new&view=" +
              uniqueId +
              "&list=" +
              this.appinfo.listId
          );
        } else {
          this.$Message.info("表单模板为空");
        }
      });
    },

    //批量审批任务
    handleBatchApproval(){
      this.batchComment = "";
        this.$Modal.confirm({
            title: '审批',
            content: '<p></p>',
            closable:true,
            okText:"同意",
            cancelText:"不同意",
            transfer:true,
            render:(h) => {
                return h('Input', {
                    props: {
                        value: this.batchComment,
                        autofocus: true,
                    },
                    on: {
                        input: (val) => {
                            this.batchComment = val;
                        }
                    }
                })
            },
            onOk: () => {
                let selection = this.onPageSelection;
                let data = [];
                selection.forEach(sel=>{
                    data.push({
                        taskId:sel.taskId,
                        transCode:sel.transCode,
                        result:1,
                        comment:this.batchComment
                    })
                })
                commitBatchTask(data).then(res=>{
                  this.onPageSelection = [];
                  this.$Message.success({
                    content:res.message,
                    closable:true,
                    duration:0
                  })
                })
            },
            onCancel: () => {
                let selection = this.onPageSelection;
                let data = [];
                selection.forEach(sel=>{
                    data.push({
                        taskId:sel.taskId,
                        transCode:sel.transCode,
                        result:0,
                        comment:this.batchComment
                    })
                })
                commitBatchTask(data).then(res=>{
                  this.onPageSelection = [];
                   this.$Message.success({
                      content:res.message,
                      closable:true,
                      duration:0
                    })
                })
            }
        })

    },

    //全选
    onSelectAll(selection) {
        let obj = {};
        //触发全选事件
        //全选
        this.onPageSelection.push(...selection);
        //数组去重
        this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
            obj[next.listId] ? "" : (obj[next.listId] = true && cur.push(next));
            return cur;
        }, []);
    },

    //保存分页选中
    handerSelectionChange(selection) {
        //取消全选
        if (selection.length === 0) {
            let s = this.$refs.selection.data;
            let p = this.onPageSelection;
            s.map(item => {
            p = p.filter(f => {
                return f.listId !== item.listId;
            });
            });
            this.onPageSelection = p;
        } else {
            let obj = {};
            this.onPageSelection.push(...selection);
            //数组去重
            this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
            obj[next.listId] ? "" : (obj[next.listId] = true && cur.push(next));
            return cur;
            }, []);
        }
    },

    //单选取消
    onSelectCancel(selection, row) {
        this.onPageSelection = this.onPageSelection.filter(f => {
            return f.listId !== row.listId;
        });
    },
  }
};
</script>

<style lang="less" scoped>
@import "./common.less";

.card {
  height: 70px;
  width: 230px;
  padding: 10px 12px;
  margin: 10px 0;
  border-radius: 0px;
  background-color: #fbfbfb !important;
  box-shadow: 4px 4px 10px #bbb8b8;
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

  .img-radius-hr {
    border-radius: 50%;
  }

  .img-radius-obj {
    border-radius: 50%;
  }

  .img-radius-subject {
    border-radius: 8px;
  }

  .content {
    position: absolute;
    top: 50%;
    left: 70px;
    transform: translateY(-50%);
    cursor: default;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #000;

    &-title {
      overflow: hidden;
      line-height: 18px;
      &-detail {
        float: right;
        font-size: 12px;
        display: none;
      }
      h5 {
        display: inline-block;
        position: relative;
        width: 120px;
        cursor: pointer;
        color: #000;
        font-size: 16px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    &-instance {
      line-height: 14px;
      &-name {
        width: 80px;
        font-size: 12px;
        color: #5f5e5e;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        vertical-align: middle;
      }

      &-admin {
        color: #4b8cf0 !important;
        cursor: pointer;
        font-size: 12px;
      }

      &-add {
        color: #0cc348;
        cursor: pointer;
        display: none;
      }
    }
  }
  .badge-custom {
    top: 0px;
    cursor: pointer;
    left: 0px;
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
  .content-title-detail {
    display: inline-block;
  }

  .content-instance-add {
    display: inline-block;
  }
  -webkit-transition: box-shadow 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0s;
  -moz-transition: box-shadow 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0s;
  -o-transition: box-shadow 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0s;
  transition: box-shadow 0.3s cubic-bezier(0.55, 0, 0.1, 1) 0s;
  box-shadow: 0 15px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.05);
}

// .ivu-card {
//   background: #fff;
//   font-size: 16px;
//   position: relative;
//   transition: all 0.2s ease-in-out;
// }
// .ivu-card-bordered {
//   border: 1px solid #dddee1;
//   border-color: #e9eaec;
//   box-shadow: 4px 4px 10px #bbb8b8;
// }
</style>
