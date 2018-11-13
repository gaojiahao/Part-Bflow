<template>
  <div :class="[prefixCls+'-wrap']">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <header :class="[prefixCls+'-wrap-header']">
      <RadioGroup v-model="radioGroupLabel" size="large" @on-change="radioGroupChange">
        <Radio label="mytask">
          <span>我的任务</span>
        </Radio>
        <Radio label="teamtask">
          <span>团队任务</span>
        </Radio>
        <i class="vertical-divide"></i>
      </RadioGroup>
      <RadioGroup v-model="rodioGroupDoOrNot" size="large" @on-change="radioGroupChangeDoneOrTodo">
        <Radio label="todo">
          <span>未完成</span>
        </Radio>
        <Radio label="done">
          <span>已完成</span>
        </Radio>
      </RadioGroup>
      <div :class="[prefixCls+'-dropdown-select']">
        <Poptip content="content" width="560" v-model="visible">
          <span style="margin-left:10px" :class="[prefixCls+'dropdown-select-item']" @click="getSaleOrderList">
            <Tag closable color="primary" @on-close='onHandleClearOrderTag'>{{orderCode?orderCode:'销售订单'}}</Tag>
            <Icon type="ios-arrow-down"></Icon>
          </span>
          <div slot="content">
            <div :class="[prefixCls+'dropdown-select-search']">
              <Input v-model="searchValue" placeholder="请输入交易号" style="width: 300px;margin-bottom:5px" @on-enter="onHandleFilterByCode" @on-click="getSaleOrderList" icon="ios-close-circle" />
              <Button type="primary" size="small" @click="onHandleFilterByCode">查询</Button>
            </div>
            <Table :columns="columns" :data="columnData" :loading="ordersLoading" size="small" @on-row-dblclick="handleDblclick"></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="pageTotal" :current="currentPage" size="small" :page-size="ordersPageSize" @on-change="orderPageChange" show-total show-elevator></Page>
              </div>
            </div>
          </div>
        </Poptip>
      </div>
    </header>
    <main :class="[prefixCls+'-wrap-main']">
      <div class="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="f1" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
              <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="5" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <defs>
            <marker id="arrow" markerUnits="userSpaceOnUse" markerWidth="15" markerHeight="15" viewBox="0 0 15 15" refX="6" refY="6" orient="auto">
              <path d="M2,0 L10,6 L2,12 L6,6 L2,0" style="fill: #00ae9d;" />
            </marker>
          </defs>
          <defs>
            <marker id="arrow1" markerUnits="userSpaceOnUse" markerWidth="15" markerHeight="15" viewBox="0 0 15 15" refX="6" refY="6" orient="auto">
              <path d="M2,0 L10,6 L2,12 L6,6 L2,0" style="fill: #9cd3d3;" />
            </marker>
          </defs>
          <defs>
            <marker id="arrow_hight_color" markerUnits="userSpaceOnUse" markerWidth="15" markerHeight="15" viewBox="0 0 15 15" refX="6" refY="6" orient="auto">
              <path d="M2,0 L10,6 L2,12 L6,6 L2,0" style="fill: red;" />
            </marker>
          </defs>
          <defs>
            <linearGradient id="orange_red" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#ffdfd9;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#ff8069 stop-opacity:1" />
            </linearGradient>
          </defs>

          <g v-for="(item) in ProcessAndProcedureData" :key="item.procedureCode">
            <g v-if="item.procedureCode === 'start'">
              <shape :xAxion="item.pointX+80" :yAxion="item.pointY+25" color="#7da87b" :text="item.procedureName"></shape>
            </g>
            <g v-else-if="item.procedureCode === 'end'">
              <shape :xAxion="item.pointX+25" :yAxion="item.pointY+25" color="#ff0000" :text="item.procedureName"></shape>
            </g>
            <g v-else>
              <ProgressRing :x="item.pointX+60" :y="item.pointY" :radius=25 :progress="percent[item.procedureCode]" :strokeWidth=2 progressColor='#9C27B0'></ProgressRing>
              <image :x="item.pointX" :y="item.pointY" :width="defaultShapeWidth" :height="defaultShapeWidth" :xlink:href="'/H_roleplay-si/ds/download?url='+item.photo" rx="25"></image>
              <text :x="item.pointX+defaultShapeWidth/2" :y="item.pointY+defaultShapeWidth+5" fill="#000" style="font-size:14px" class="svg-text-common-style">
                {{item.procedureName}}
              </text>
            </g>

            <!-- 所有待办 -->
            <g v-if="defaultDisplayTask[item.procedureCode]>0">
              <circle :cx="item.pointX" :cy="item.pointY" r="12" stroke-width="1" fill="red" />
              <text :x="item.pointX" :y="item.pointY-4" fill="#fff" class="svg-text-common-style" style="font-size:10px;font-weight:bold" @click="openTask(item)">
                {{defaultDisplayTask[item.procedureCode]}}
              </text>
            </g>

          </g>
          <g v-for="(line,index) in pointList" :key="index">
            <polyline :points="line.value" marker-end='url(#arrow1)' style="fill:none;stroke:#9cd3d3;stroke-width:2" />
          </g>
        </svg>
        <span class="no-technology" v-if="showTechnology">暂无工序...</span>
      </div>
    </main>

    <task-detail-modal v-model="modalVisable" width="721" footerBtnAlign="right" title="任务列表" :footerHide="true">
      <div style="margin-top: 10px">
        <Table :loading="taskTableLoading" :data="taskTableData" :columns="taskTableColumns" size="small" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="taskModalPage.pageTotal" :current="taskModalPage.currentPage" :page-size="taskModalPage.pageSize" @on-change="changeCurrentPage" size="small" show-total show-elevator></Page>
          </div>
        </div>
      </div>
    </task-detail-modal>
  </div>
</template>

<script>
import Shape from "@/components/Shape";
import ProgressRing from "@/components/progress-ring";
import TaskDetailModal from "@/components/modal/Modal";
import CustomTable from "@/views/addressBook/organization/instance/CustomTable";
import {
  getProcedureAndProcess,
  getMockData,
  getOrders,
  getProcedureInfoFilter,
  getTaskCountFilter
} from "@/services/flowService";

const prefixCls = "rfd-technology";

export default {
  name: "TechnologyGraph",

  components: {
    Shape,
    TaskDetailModal,
    CustomTable,
    ProgressRing
  },

  data() {
    return {
      showTechnology: false,
      prefixCls: prefixCls,
      processRouteCode: this.$route.params.processRouteCode,
      spinShow: false,
      screenWidth: document.body.clientWidth, // 这里是给到了一个默认值
      xAxion: 50,
      yAxion: 80,

      pointList: [], //存放节点连线坐标
      ProcessAndProcedureData: [],
      defaultxAxion: 40,
      defaultyAxion: 80,
      graphSpace: 160,
      defaultShapeWidth: 50,
      showNumber: 9, //一行显示多少个

      radioGroupLabel: "mytask",
      rodioGroupDoOrNot: "todo",

      defaultDisplayTask: {}, //任务数量
      percent: {}, //任务比例
      taskType: "mytask",
      taskStatus: "todo",
      type: "myToDo",

      //订单列表配置项
      visible: false,
      ordersLoading: false,
      searchValue: "",
      orderCode: "",
      columnData: [],
      columns: [
        {
          title: "交易号",
          key: "transCode",

          align: "center"
        },
        {
          title: "创建者",
          key: "creatorName",
          align: "center",
          width: 80
        },
        {
          title: "创建时间",
          key: "crtTime",
          align: "center"
        },
        {
          title: "生效时间",
          key: "effectiveTime",
          align: "center"
        }
      ],
      pageTotal: 0,
      currentPage: 1,
      ordersPageSize: 6,

      modalVisable: false,

      taskTableLoading: false,
      taskTableColumns: [],
      todoColumns: [
        {
          title: "任务单号",
          key: "transCode",
          align: "center",
          render: function(h, params) {
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
          title: "执行者",
          key: "worker",
          align: "center",
        },
        {
          title: "任务数量",
          key: "todonum",
          align: "center",
        },
        {
          title: "创建时间",
          key: "crtTime",
          align: "center",
        }
      ],
      doneColumns: [
        {
          title: "任务单号",
          key: "transCode",
          align: "center",
          render: function(h, params) {
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
          title: "执行者",
          key: "worker",
          width: 75
        },
        {
          title: "验收单号",
          align: "center",
          key: "checkCode",
          render: function(h, params) {
            return h(
              "a",
              {
                attrs: {
                  href: "/Form/index.html?data=" + params.row.checkCode,
                  target: "_blank"
                }
              },
              params.row.checkCode
            );
          }
        },
        {
          title: "验收者",
          key: "checker",
          width: 75
        },
        {
          title: "验收数量",
          key: "donenum",
          align: "center",
          width: 85
        },
        {
          title: "创建时间",
          key: "crtTime",
          align: "center",
          width: 150
        }
      ],
      taskTableData: [],
      taskModalPage: {
        pageTotal: 0,
        currentPage: 1,
        pageSize: 6,
        procedureCode: ""
      }
    };
  },

  watch: {
    screenWidth(val) {
      this.screenWidth = val;
      this.showNumber = Math.floor(
        val / (this.defaultShapeWidth + this.graphSpace)
      );
      this.pointList = [];
      this.drawGraph();
    }
  },

  methods: {
    drawGraph() {
      let graphSpace = this.graphSpace,
        defaultShapeWidth = this.defaultShapeWidth,
        yCount = 0,
        xCount = 0,
        nodePointXY = {}, //存放所有节点坐标
        nextPoint,
        nextPointX,
        nextPointY,
        nextNode = {},
        peerNode,
        preNodeId = "",
        consumeNode = 0,
        data = this.ProcessAndProcedureData;

      //构造开始节点，以及结束节点
      if (data[0].procedureCode !== "start") {
        let start = {
          procedureCode: "start",
          procedureName: "开始",
          procedureStatus: 1,
          underProcedure: data[0].procedureCode,
          sort: "0",
          myToDo: 0,
          start: 1
        };
        data.unshift(start);
      }
      if (data[data.length - 1].procedureCode !== "end") {
        let end = {
          procedureCode: "end",
          procedureName: "结束",
          procedureStatus: 1,
          myToDo: 0,
          sort: data.length,
          start: 1
        };
        data[data.length - 1].underProcedure = "end";
        data.push(end);
      }
      for (let i = 0; i < data.length; i++) {
        if (i % this.showNumber === 0 && i !== 0) {
          yCount++;
        }
        //判断当前节点顺序是从左往右还是从右往左
        if (yCount % 2 === 0) {
          //第一次从左往右
          data[i].pointX =
            this.defaultxAxion + xCount * (graphSpace + defaultShapeWidth);
          data[i].pointY =
            this.defaultyAxion + (this.defaultShapeWidth + graphSpace) * yCount;
          nodePointXY[data[i].procedureCode] =
            data[i].pointX + "," + data[i].pointY;
          xCount++;
        } else {
          //从右往左
          if (data[i].procedureCode === "end") {
            data[i].pointX =
              this.defaultxAxion +
              (xCount - 1) * (graphSpace + defaultShapeWidth);
          } else {
            data[i].pointX =
              this.defaultxAxion +
              (xCount - 1) * (graphSpace + defaultShapeWidth);
          }
          data[i].pointY =
            this.defaultyAxion + (this.defaultShapeWidth + graphSpace) * yCount;
          nodePointXY[data[i].procedureCode] =
            data[i].pointX + "," + data[i].pointY;
          xCount--;
        }

        this.defaultDisplayTask[data[i].procedureCode] = data[i].myToDo;
      }

      data.forEach((item, itemIndex) => {
        if (item.underProcedure) {
          if (item.underProcedure in nodePointXY) {
            nextPoint = nodePointXY[item.underProcedure].split(",");
            nextPointX = Number(nextPoint[0]);
            nextPointY = Number(nextPoint[1]);
            //线条从上指下
            if (nextPointX === item.pointX) {
              this.pointList.push({
                id: item.procedureCode,
                value:
                  item.pointX +
                  defaultShapeWidth / 2 +
                  "," +
                  (item.pointY + this.defaultShapeWidth + 20) +
                  " " +
                  (nextPointX + defaultShapeWidth / 2) +
                  "," +
                  (nextPointY - 4)
              });
            }
            //线条从右指左
            if (nextPointX < item.pointX && nextPointY === item.pointY) {
              if (item.underProcedure === "end") {
                this.pointList.push({
                  id: item.procedureCode,
                  value:
                    item.pointX +
                    "," +
                    (item.pointY + this.defaultShapeWidth / 2) +
                    " " +
                    (nextPointX + defaultShapeWidth + 4) +
                    "," +
                    (nextPointY + this.defaultShapeWidth / 2)
                });
              } else {
                this.pointList.push({
                  id: item.procedureCode,
                  value:
                    item.pointX +
                    "," +
                    (item.pointY + this.defaultShapeWidth / 2) +
                    " " +
                    (nextPointX + defaultShapeWidth + 4 + 75) +
                    "," +
                    (nextPointY + this.defaultShapeWidth / 2)
                });
              }
            }
            //线条从左指右
            if (nextPointX > item.pointX && nextPointY === item.pointY) {
              this.pointList.push({
                id: item.procedureCode,
                value:
                  item.pointX +
                  this.defaultShapeWidth +
                  65 +
                  "," +
                  (item.pointY + this.defaultShapeWidth / 2) +
                  " " +
                  (nextPointX - 4) +
                  "," +
                  (nextPointY + this.defaultShapeWidth / 2)
              });
            }
          }
        }
      });
    },

    //查询工艺和工序关系
    getProcessAndProcedure(processRouteCode) {
      let percent = {};
      this.spinShow = true;
      getProcedureAndProcess(processRouteCode)
        .then(res => {
          if (res[0]) {
            let showNumber = this.showNumber;
            if (
              Math.ceil((res.length + 2) / showNumber) * 220 >
              document.body.clientHeight - 45
            ) {
              window.document.getElementsByClassName(
                "rfd-technology-wrap-main"
              )[0].style.height =
                Math.ceil((res.length + 2) / showNumber) * 220 + "px";
            }

            this.ProcessAndProcedureData = res;
            res.forEach(item => {
              if (item["mytask"] === 0) {
                percent[item.procedureCode] = 0;
              } else {
                percent[item.procedureCode] = Math.round(
                  (item["myToDo"] / item["mytask"]) * 100
                );
              }
            });
            this.percent = percent;
            this.showTechnology = false;
            this.drawGraph();
          } else {
            this.showTechnology = true;
          }
          this.spinShow = false;
        })
        .catch(error => {
          this.$Message.error(error);
        });
    },

     /**
     * 选择任务类型
     */
    radioGroupChange: function(e) {
      this.taskType = e;
      let actions = new Map([
        ['teamtask_done',()=>{return 'teamDone'}],
        ['teamtask_todo',()=>{return 'teamTodo'}],
        ['mytask_done',()=>{return 'myDone'}],
        ['mytask_todo',()=>{return 'myToDo'}]
      ]);
      this.type = actions.get(`${e}_${this.taskStatus}`)();
      this.getTaskCountFilter(this.type, this.orderCode);
    },

    /**
     * 选择任务状态
     */
    radioGroupChangeDoneOrTodo: function(e) {
      this.taskStatus = e;
       let actions = new Map([
        ['teamtask_done',()=>{return 'teamDone'}],
        ['teamtask_todo',()=>{return 'teamTodo'}],
        ['mytask_done',()=>{return 'myDone'}],
        ['mytask_todo',()=>{return 'myToDo'}]
      ]);
      this.type = actions.get(`${this.taskType}_${e}`)();
      this.getTaskCountFilter(this.type, this.orderCode);
    },

    getTaskCountFilter(type, value) {
      let filter;
      if (value) {
        filter = JSON.stringify([
          {
            property: "a.orderCode",
            value: value,
            operator: "eq"
          }
        ]);
      }
      getTaskCountFilter(type, this.processRouteCode, filter).then(res => {
        let keyType = "",
          percent = {},
          taskNum = {};
        if (res[0]) {
          Object.keys(res[0]).forEach(function(item) {
            if (~type.toLowerCase().indexOf(item)) {
              keyType = item;
            }
          });
        }
        res.forEach(item => {
          let total = item["todo"] + item["done"];
          if (total === 0) {
            percent[item.procedureCode] = 0;
          } else {
            percent[item.procedureCode] = Math.round(
              (item[keyType] / total) * 100
            );
          }
          taskNum[item.procedureCode] = item[keyType];
        });
        this.percent = percent;
        this.defaultDisplayTask = taskNum;
      });
    },

    //获取销售订单列表
    getSaleOrderList() {
      this.searchValue = "";
      this.currentPage = 1;
      this.ordersLoading = true;
      getOrders(this.currentPage).then(res => {
        this.pageTotal = res.dataCount;
        this.columnData = res.tableContent;
        this.ordersLoading = false;
      });
    },

    //清空销售订单选中项
    onHandleClearOrderTag() {
      this.orderCode = "";
      this.getTaskCountFilter(this.type, this.orderCode);
    },

    //根据交易号过滤销售订单列表
    onHandleFilterByCode() {
      let filter = [];
      if (this.searchValue) {
        filter = JSON.stringify([
          { operator: "like", value: this.searchValue, property: "transCode" }
        ]);
      }
      this.currentPage = 1;
      this.ordersLoading = true;
      getOrders(this.currentPage, filter).then(res => {
        this.pageTotal = res.dataCount;
        this.columnData = res.tableContent;
        this.ordersLoading = false;
      });
    },

    /**
     * 双击选中订单
     */
    handleDblclick(row, index) {
      let type = this.type;
      this.orderCode = row.transCode;
      this.visible = false;
      let filter = JSON.stringify([
        {
          property: "a.orderCode",
          value: row.transCode,
          operator: "eq"
        }
      ]);
      getTaskCountFilter(type, this.processRouteCode, filter).then(res => {
        let keyType = "",
          percent = {},
          taskNum = {};
        if (res[0]) {
          Object.keys(res[0]).forEach(function(item) {
            if (~type.toLowerCase().indexOf(item)) {
              keyType = item;
            }
          });
        }
        res.forEach(item => {
          let total = item["todo"] + item["done"];
          if (total === 0) {
            percent[item.procedureCode] = 0;
          } else {
            percent[item.procedureCode] = Math.round(
              (item[keyType] / total) * 100
            );
          }
          taskNum[item.procedureCode] = item[keyType];
        });
        this.percent = percent;
        this.defaultDisplayTask = taskNum;
      });
    },

    /**
     * 销售订单分页加载
     */
    orderPageChange(currentPage) {
      let filter = [];
      if (this.searchValue) {
        filter = JSON.stringify([
          { operator: "like", value: this.searchValue, property: "transCode" }
        ]);
      }
      this.currentPage = currentPage;
      this.ordersLoading = true;
      getOrders(this.currentPage, filter).then(res => {
        this.pageTotal = res.dataCount;
        this.columnData = res.tableContent;
        this.ordersLoading = false;
      });
    },

    /**
     * 打开任务列表
     */
    openTask(item) {
      let type = this.type,
          filter = "";
      this.modalVisable = true;
      this.taskTableLoading = true;
      this.taskModalPage.procedureCode = item.procedureCode;
      //判断当前是已办任务还是待办任务
      if (~type.toLowerCase().indexOf("todo")) {
        this.taskTableColumns = [...this.todoColumns]
      }else{
        this.taskTableColumns = [...this.doneColumns]
      }
     
      if (this.orderCode) {
        filter = JSON.stringify([
          { operator: "eq", value: this.orderCode, property: "a.orderCode" }
        ]);
      }
      getProcedureInfoFilter(
        item.procedureCode,
        this.type,
        this.taskModalPage.currentPage,
        this.taskModalPage.pageSize,
        filter
      ).then(res => {
        this.taskTableLoading = false;
        this.taskModalPage.pageTotal = res.dataCount;
        this.taskTableData = res.tableContent;
      });
    },
    /**
     * 分页加载
     */
    changeCurrentPage(currentPage) {
      this.taskModalPage.currentPage = currentPage;
      this.taskTableLoading = true;
      getProcedureInfoFilter(
        this.taskModalPage.procedureCode,
        this.type,
        this.taskModalPage.currentPage,
        this.taskModalPage.pageSize
      ).then(res => {
        this.taskTableLoading = false;
        this.taskModalPage.pageTotal = res.dataCount;
        this.taskTableData = res.tableContent;
      });
    }
  },

  mounted() {
    let mainMaxHeight = document.body.clientHeight - 45;
    window.document.getElementsByClassName(
      "rfd-technology-wrap-main"
    )[0].style.height = mainMaxHeight + "px";

    // window.document.getElementsByClassName(
    //   "rfd-technology-wrap-main"
    // )[0].style.maxHeight = mainMaxHeight + "px";

    this.showNumber = Math.floor(
      document.body.clientWidth / (this.defaultShapeWidth + this.graphSpace)
    );
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };

    this.getProcessAndProcedure(this.processRouteCode);
  }
};
</script>

<style lang="less" scoped>
@borderColor: #dddee1;

.rfd-technology-wrap {
  background-color: #fff;

  &-header {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #ddd;

    .input-select {
      width: 160px;
      margin: 0 5px;
    }

    .vertical-divide {
      height: 20px;
      vertical-align: middle;
      display: inline-block;
      width: 1px;
      border-left: 1px solid @borderColor;
      margin-right: 8px;
    }

    .rfd-technology-dropdown-select {
      display: inline-block;
      z-index: 999;
      &-item:hover {
        color: #2d8cf0;
        cursor: pointer;
      }

      &-search {
        margin-bottom: 5px;
      }
    }
  }

  &-main {
    background-color: #f8f8f9;
    overflow: auto;

    .svg-container {
      position: relative;
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;

      svg {
        height: 100%;
        width: 100%;
        position: absolute;
        overflow: hidden;
        left: 0;
      }

      .svg-text-common-style {
        text-anchor: middle;
        baseline-shift: sub;
        font-size: 5px;
        font-family: sans-serif;
      }

      .svg-text-common-style:hover {
        cursor: pointer;
      }
    }
  }
}

.no-technology {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 16px;
  color: #6d6a6a;
}
</style>

