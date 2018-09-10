<template>
  <div class="flow_container right_container">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div id="flow-box">
      <RadioGroup class="taskbtn" v-model="radioGroupLabel" size="large" @on-change="radioGroupChange">
        <Radio label="mytask">
          <span>我的任务</span>
        </Radio>
        <Radio label="teamtask">
          <span>团队任务</span>
        </Radio>
        <i class="vertical-divide"></i>
      </RadioGroup>
      <RadioGroup class="taskbtn_1" v-model="rodioGroupDoOrNot" size="large" @on-change="radioGroupChangeDoneOrTodo">
        <Radio label="todo">
          <span>未完成</span>
        </Radio>
        <Radio label="done">
          <span>已完成</span>
        </Radio>
        <i class="vertical-divide"></i>
      </RadioGroup>
      <RadioGroup class="taskbtn_2" size="large">
        <Radio label="no-overdue">
          <span>未逾期</span>
        </Radio>
        <Radio label="overdue ">
          <span>逾期</span>
        </Radio>
        <i class="vertical-divide"></i>
      </RadioGroup>
      <div class="app-dropdown-select">
        <Poptip title="项目立项" width="660" content="content" v-model="projectPopTipVisible">
          <span class="app-dropdown-select-item" @click="getProjectList">
            <Tag closable color="primary" @on-close="onHandleClearProjectTag">{{projectName?projectName:'项目立项'}}</Tag>
            <Icon type="ios-arrow-down"></Icon>
          </span>
           <div slot="content" class="api">
            <div class="app-search">
              <Input v-model="projectSearchValue" placeholder="请输入项目名称" style="width: 300px" @on-enter="onHandleFilterByProjectName" @on-click="getProjectList" icon="ios-close-circle" />
              <Button type="primary" size="small" @click="onHandleFilterByProjectName">查询</Button>
            </div>
            <Table :columns="projectColumns" :data="projectColumnData" :loading="projectLoading" size="small" @on-row-dblclick="handleDbSelectProject"></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="projectPageTotal" :current="projectCurrentPage" size="small" :page-size="projectPageSize" @on-change="projectPageChange" show-total show-elevator></Page>
              </div>
            </div>
          </div>
        </Poptip>
        <Poptip title="销售订单" content="content" width="560" v-model="visible">
          <span style="margin-left:10px" class="app-dropdown-select-item" @click="getSaleOrderList">
            <Tag closable color="primary" @on-close='onHandleClearOrderTag'>{{orderCode?orderCode:'销售订单'}}</Tag>
            <Icon type="ios-arrow-down"></Icon>
          </span>
          <div slot="content" class="api">
            <div class="app-search">
              <Input v-model="searchValue" placeholder="请输入交易号" style="width: 300px" @on-enter="onHandleFilterByCode" @on-click="getSaleOrderList" icon="ios-close-circle" />
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

      <div class="divide"></div>
      <div class="business_item" style="width:50px">
        <div class="left-name" v-for="(item,index) in dataItem" :key="index">
          <span></span>
        </div>
      </div>
      <div class="svg_box" @click="outBlur">
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
              <path d="M2,0 L10,6 L2,12 L6,6 L2,0" style="fill: gray;" />
            </marker>
          </defs>
          <defs>
            <marker id="arrow1" markerUnits="userSpaceOnUse" markerWidth="15" markerHeight="15" viewBox="0 0 15 15" refX="6" refY="6" orient="auto">
              <path d="M2,0 L10,6 L2,12 L6,6 L2,0" style="fill: #fff;" />
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
          <g v-for="(business,i) in dataItem" :key="i">
            <g v-for="(item,j) in business.child" :key="j">

              <image :x="40+(baseLength+graphSpace)*item.sort" :y="50+170*i" :width="baseLength" :height="baseLength" :xlink:href="item.icon" rx='10' v-on:click.stop="doAction(item)">
              </image>
              <!-- 科目与业务节点title -->

              <a @click="redirectTo(item)" class="svg-title-style">
                <text :x="40+baseLength/2+(baseLength+graphSpace)*item.sort" :y="65+baseLength+170*i">
                  {{item.value}}
                </text>
              </a>
              <!-- 所有待办 -->
              <circle :cx="40+(baseLength+graphSpace)*item.sort" :cy="50+170*i" r="12" stroke-width="1" :fill="item.type==='list'?'red':'#2d8cf0'" v-if="(item.listId?item.listId:item.id) in defaultDisplayTask" />
              <text :x="40+(baseLength+graphSpace)*item.sort" :y="45+170*i" fill="#fff" class="svg-text-common-style" style="font-size:12px" :listId="item.type==='subject'?item.id:item.listId" :taskValue="item.value" @click="opentask(item)">
                {{item.type==='subject'?defaultDisplayTask[item.id]:defaultDisplayTask[item.listId]}}
              </text>

              <!--  <circle :cx="40+baseLength+(baseLength+graphSpace)*j" :cy="item.type==='list'?25+170*i:45+170*i" r="13" stroke-width="1" fill="red" v-if="item.type==='list' && item.notToDo" />
                    <text :x="40+baseLength+(baseLength+graphSpace)*j" :y="item.type==='list'?20+170*i:45+170*i" fill="#fff" v-if="item.type==='list' && item.notToDo" class="svg-text-common-style">
                      {{item.notToDo}}
                    </text> -->
            </g>

          </g>

          <g v-for="(point) in pointList" :key="point.id">
            <polyline :points="point.value" :marker-end="waterFlow[point.id]!==undefined?'url(#arrow_hight_color)':'url(#arrow1)'" v-bind:class="waterFlow[point.id]!==undefined?'path':''" style="fill:none;stroke:#fff;stroke-width:1" />
          </g>
          <!-- 应用与应用之间的关系 -->
          <g v-for="(point) in transTypePointList" :key="point.id">
            <polyline :points="point.value" class="transTypeRel_style" marker-end='url(#arrow)' />
          </g>

        </svg>
      </div>
    </div>
    <task-modal :modal='modal' :listId="pageListId" @emitModal="emitModal" :taskValue="taskValue" :type="type" :orderCode="orderCode" :projectName="projectName"></task-modal>
  </div>
</template>

<script>
import * as ds from "deepstream.io-client-js";
import TaskModal from "@/components/pulsegraph/TaskModal";
import CircularGraph from "./circularGraph";
import {
  getPulseGraph,
  getCurrentUserInfo,
  getAppTaskCount,
  getMockData,
  getOrders,
  getProject,
  getMyTaskCountAll
} from "@/services/flowService";
import { getToken } from "@/utils/utils";
import { ICON_LIST } from "@/assets/const";
export default {
  data() {
    return {
      spinShow: true,
      baseLength: 45, //图形大小
      graphSpace: 65, //图形间距
      circleFillColor: "#646b86",
      circleBorderColor: "#e0a527",
      squareFillColor: "#00ae9d",
      squareBorderColor: "#77b745",
      isActive: false,
      arr: [],
      title: "",
      dataItem: [],
      pointList: [],
      transTypePointList: [], //应用与应用之间得连线
      waterFlow: {},
      flowType: true,
      businessItemWidth: "50px",
      ds: ds("wss://192.168.3.160:6021/deepstream"),
      books$$: null,

      radioGroupLabel: "mytask",
      rodioGroupDoOrNot: "todo",
      doneortodo: "todo",
      taskType: "mytask",

      defaultDisplayTask: {}, //默认显示我的未完成任务
      teamDone: {}, //团队已完成任务
      teamTodo: {}, //团队待办任务
      myDone: {}, //我的已完成任务
      myToDo: {}, //我的未完成任务
      subjectTodo: {}, //科目待办数量

      modal: false, //弹出框是否显示
      taskValue: "",
      pageListId: "",
      type: "myToDo",

      subjectList: ICON_LIST,
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

      //项目立项配置项
      projectPopTipVisible: false,
      projectLoading: false,
      projectSearchValue: "",
      projectName:'',
      projectColumnData: [],
      projectColumns: [
        {
          title:'项目名称',
          key:'projectName',
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
      projectPageTotal: 0,
      projectCurrentPage: 1,
      projectPageSize: 6,
    };
  },

  components: {
    TaskModal,
    CircularGraph
  },

  props: ["caseId"],

  methods: {
    draw() {
      let baseLength = this.baseLength;
      let graphSpace = this.graphSpace;
      let data = this.dataItem,
        nodePointXY = {},
        child = [],
        nextChildId,
        preChildId,
        nextRelevantId,
        preRelevantId,
        endNode = [],
        targetTransType = "", //当前节点坐标
        smpley = 0, //同一业务类型下不相邻节点线y轴每次+5px
        tempPoint,
        tempX,
        tempY;

      for (let i = 0; i < data.length; i++) {
        let y = 170 + 170 * i;
        data[i].point = "0," + y + " 2100," + y;
        if (data[i].child.length > 0) {
          for (let i2 = 0; i2 < data[i].child.length; i2++) {
            this.dataItem[i].child[i2].pointX =
              40 + (baseLength + graphSpace) * data[i].child[i2].sort;
            this.dataItem[i].child[i2].pointY = 50 + baseLength / 2 + 170 * i;

            nodePointXY[this.dataItem[i].child[i2].id] =
              this.dataItem[i].child[i2].pointX +
              "," +
              this.dataItem[i].child[i2].pointY;

            let childNode = data[i].child[i2];
            if (childNode.teamDone > 0) {
              this.teamDone[childNode.listId] =
                childNode.teamDone > 99 ? "99+" : childNode.teamDone;
            }
            if (childNode.teamTodo > 0) {
              this.teamTodo[childNode.listId] =
                childNode.teamTodo > 99 ? "99+" : childNode.teamTodo;
            }
            if (childNode.myDone > 0) {
              this.myDone[childNode.listId] =
                childNode.myDone > 99 ? "99+" : childNode.myDone;
            }
            if (childNode.myToDo > 0) {
              this.myToDo[childNode.listId] =
                childNode.myToDo > 99 ? "99+" : childNode.myToDo;
            }
            if (childNode.subjectTodo > 0) {
              this.subjectTodo[childNode.id] =
                childNode.subjectTodo > 99 ? "99+" : childNode.subjectTodo;
            }
          }
        }
      }

      let that = this;
      data.forEach(function(item, itemIndex) {
        item.child.forEach(function(child, childIndex) {
          if (child.relevantNode && child.relevantNode.length > 0) {
            // 构造应用与应用之间关系
            child.relevantNode.forEach(function(relevantNode, relIndex) {
              if (relevantNode.id in nodePointXY) {
                tempPoint = nodePointXY[relevantNode.id].split(",");
                tempX = Number(tempPoint[0]);
                tempY = Number(tempPoint[1]);

                //线条朝上
                if (relevantNode.groupIndex < item.index) {
                  that.transTypePointList.push({
                    id: child.id + "_" + relevantNode.id,
                    value:
                      child.pointX +
                      baseLength / 2 +
                      "," +
                      (child.pointY - baseLength / 2) +
                      " " +
                      (tempX + baseLength / 2) +
                      "," +
                      (tempY + baseLength / 2 + 20)
                  });
                } else if (relevantNode.groupIndex > item.index) {
                  //线条朝下

                  that.transTypePointList.push({
                    id: child.id + "_" + relevantNode.id,
                    value:
                      child.pointX +
                      baseLength / 2 +
                      "," +
                      (child.pointY + baseLength / 2 + 20) +
                      " " +
                      (tempX + baseLength / 2) +
                      "," +
                      (tempY - baseLength / 2 - 4.3)
                  });
                } else {
                  if (child.pointX < tempX - 40 - baseLength - graphSpace) {
                    //判断应用是否跨节点
                    that.transTypePointList.push({
                      id: child.id + "_" + relevantNode.id,
                      value:
                        child.pointX +
                        baseLength / 2 +
                        "," +
                        (child.pointY - baseLength / 2) +
                        " " +
                        (child.pointX + baseLength / 2) +
                        "," +
                        (child.pointY - baseLength / 2 - 20) +
                        " " +
                        (tempX + baseLength / 2) +
                        "," +
                        (tempY - baseLength / 2 - 20) +
                        " " +
                        (tempX + baseLength / 2) +
                        "," +
                        (tempY - baseLength / 2 - 4.3)
                    });
                  } else {
                    that.transTypePointList.push({
                      id: child.id + "_" + relevantNode.id,
                      value:
                        child.pointX +
                        baseLength +
                        "," +
                        child.pointY +
                        " " +
                        (tempX - 4.3) +
                        "," +
                        tempY
                    });
                  }
                }
              }
            });
          }

          if (child.endNode && child.endNode.length > 0) {
            child.endNode.forEach(function(endNode, endIndex) {
              if (endNode.id in nodePointXY) {
                tempPoint = nodePointXY[endNode.id].split(",");
                tempX = Number(tempPoint[0]);
                tempY = Number(tempPoint[1]);
                //线条朝上
                if (endNode.groupIndex < item.index) {
                  let baseNum =
                    (tempX - child.pointX) / (baseLength + graphSpace) * 8.5;
                  that.pointList.push({
                    id: child.id + "_" + endNode.id,
                    value:
                      child.pointX +
                      baseLength / 2 +
                      "," +
                      (child.pointY - baseLength / 2) +
                      " " +
                      (tempX + baseLength / 2 - baseNum) +
                      "," +
                      (tempY + baseLength / 2 + 20)
                  });
                } else if (endNode.groupIndex > item.index) {
                  //线条朝下
                  let baseNum =
                    (tempX - child.pointX) / (baseLength + graphSpace) * 8.5;
                  that.pointList.push({
                    id: child.id + "_" + endNode.id,
                    value:
                      child.pointX +
                      baseLength / 2 +
                      "," +
                      (child.pointY + baseLength / 2 + 20) +
                      " " +
                      (tempX + baseLength / 2 - baseNum) +
                      "," +
                      (tempY - baseLength / 2 - 4.3)
                  });
                }
              }
            });
          }
        });
      });
    },

    //计算svg宽度
    calcSvgWidth: function(dataItem) {
      let nodeNumber = 0;
      if (dataItem.length > 0) {
        nodeNumber = dataItem[0].child.length;

        for (let i = 1; i < dataItem.length; i++) {
          if (nodeNumber < dataItem[i].child.length) {
            nodeNumber = dataItem[i].child.length;
          }
        }
      }
      let sreenWidth =
        nodeNumber * (30 + this.baseLength + this.graphSpace) + 50;
      if (document.body.clientWidth > sreenWidth) {
        return document.body.clientWidth;
      } else {
        return sreenWidth;
      }
    },

    //计算svg宽度
    calcSvgHeight: function(dataItem) {
      let h = dataItem.length > 0 ? dataItem.length * 171 + 79 : 215;
      if (document.body.clientHeight > h) {
        return document.body.clientHeight;
      } else {
        return h;
      }
    },

    //高亮应用与科目的关系
    doAction: function(item, event) {
      this.waterFlow = {};

      if (item.endNode && item.endNode.length > 0) {
        for (let i = 0; i < item.endNode.length; i++) {
          this.waterFlow[item.id + "_" + item.endNode[i].id] = item.endNode[i];
        }
      }

      if (item.lastNode && item.lastNode.length > 0) {
        for (let j = 0; j < item.lastNode.length; j++) {
          this.waterFlow[item.lastNode[j].id + "_" + item.id] =
            item.lastNode[j];
        }
      }
    },

    outBlur: function(e) {
      this.waterFlow = {};
    },

    /**
     * 应用链接跳转
     */
    redirectTo: function(item, event) {
      let url = item.url;
      let nr = window.top.document.getElementById("frame1").getAttribute("nr");
      if (item.target === "_blank") {
        window.open(item.url, "_blank");
      } else {
        if (!nr) {
          if (~url.indexOf("outlink")) {
            url = item.url;
          } else if (~url.indexOf("app")) {
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

    //订阅消息
    subscribeMessage: function() {
      let token = getToken();
      this.ds.event.subscribe("taskChange/" + token, msg => {});
    },

    radioGroupChange: function(e) {
      this.taskType = e;
      if (this.taskType === "teamtask" && this.doneortodo === "done") {
        this.type = "teamDone";
      } else if (this.taskType === "teamtask" && this.doneortodo === "todo") {
        this.type = "teamTodo";
      } else if (this.taskType === "mytask" && this.doneortodo === "done") {
        this.type = "myDone";
      } else if (this.taskType === "mytask" && this.doneortodo === "todo") {
        this.type = "myToDo";
      }
      if (!this.orderCode && !this.projectName) {
        switch (this.type) {
          case "teamDone":
            this.defaultDisplayTask = this.teamDone;
            break;
          case "teamTodo":
            this.defaultDisplayTask = this.teamTodo;
            break;
          case "myDone":
            this.defaultDisplayTask = this.myDone;
            break;
          case "myToDo":
            this.defaultDisplayTask = this.myToDo;
            break;
        }
        this.defaultDisplayTask = Object.assign(
          this.defaultDisplayTask,
          this.subjectTodo
        );
      } else {
        let type = this.type;
        getMyTaskCountAll(type,this.projectName, this.orderCode).then(res => {
          this.defaultDisplayTask = {};
          this.defaultDisplayTask = res;
        });
      }
    },

    radioGroupChangeDoneOrTodo: function(e) {
      this.doneortodo = e;
      if (this.taskType === "teamtask" && this.doneortodo === "done") {
        this.type = "teamDone";
      } else if (this.taskType === "teamtask" && this.doneortodo === "todo") {
        this.type = "teamTodo";
      } else if (this.taskType === "mytask" && this.doneortodo === "done") {
        this.type = "myDone";
      } else if (this.taskType === "mytask" && this.doneortodo === "todo") {
        this.type = "myToDo";
      }
      if (!this.orderCode && !this.projectName) {
        switch (this.type) {
          case "teamDone":
            this.defaultDisplayTask = this.teamDone;
            break;
          case "teamTodo":
            this.defaultDisplayTask = this.teamTodo;
            break;
          case "myDone":
            this.defaultDisplayTask = this.myDone;
            break;
          case "myToDo":
            this.defaultDisplayTask = this.myToDo;
            break;
        }
        this.defaultDisplayTask = Object.assign(
          this.defaultDisplayTask,
          this.subjectTodo
        );
      } else {
        let type = this.type;
        getMyTaskCountAll(type,this.projectName, this.orderCode).then(res => {
          this.defaultDisplayTask = {};
          this.defaultDisplayTask = res;
        });
      }
    },

    /**
     * 查看待办任务
     */
    opentask(item) {
      if (item.type === "subject") {
        this.redirectTo(item, event);
      } else {
        this.modal = true;

        this.pageListId = event.target.getAttribute("listId");
        this.taskValue = event.target.getAttribute("taskValue");
      }
    },

    //监听弹出框返回得状态值
    emitModal(val, e) {
      this.pageListId = val.listId;
      this.modal = false;
    },

    /**
     * 分页加载
     */
    changeCurrentPage(currentPage) {
      let params = {
        type: this.type,
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

    //清空销售订单选中项
    onHandleClearOrderTag() {
      this.orderCode = "";
      getMyTaskCountAll(this.type,this.projectName).then(res => {
        this.defaultDisplayTask = {};
        this.defaultDisplayTask = res;
      });
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
     * 双击选中订单
     */
    handleDblclick(row, index) {
      let type = this.type;
      this.orderCode = row.transCode;
      getMyTaskCountAll(type, this.projectName,this.orderCode).then(res => {
        this.defaultDisplayTask = {};
        this.visible = false;
        this.defaultDisplayTask = res;
      });
    },



    //清空项目立项选中项
    onHandleClearProjectTag() {
      this.projectName = "";
      getMyTaskCountAll(this.type,'',this.orderCode).then(res => {
        this.defaultDisplayTask = {};
        this.defaultDisplayTask = res;
      });
    },

    // //根据项目名称过滤项目立项列表
    onHandleFilterByProjectName() {
      let filter = [];
      if (this.projectSearchValue) {
        filter = JSON.stringify([
          { operator: "like", value: this.projectSearchValue, property: "projectName" }
        ]);
      }
       this.projectCurrentPage = 1;
      this.projectLoading = true;
      getProject(this.currentPage, filter).then(res => {
         this.projectPageTotal = res.dataCount;
        this.projectColumnData = res.tableContent;
        this.projectLoading = false;
      });
    },
    //获取项目立项类别
    getProjectList(){
      this.projectSearchValue = '';
      this.projectCurrentPage = 1;
      this.projectLoading = true;
      getProject(this.projectCurrentPage).then(res => {
        this.projectPageTotal = res.dataCount;
        this.projectColumnData = res.tableContent;
        this.projectLoading = false;
      });
    },

    /**
     * 项目立项分页加载
     */
    projectPageChange(currentPage) {
      let filter = [];
      if (this.projectSearchValue) {
        filter = JSON.stringify([
            { operator: "like", value: this.projectSearchValue, property: "projectName" }
        ]);
      }
      this.projectCurrentPage = currentPage;
       this.projectLoading = true;
      getProject(this.projectCurrentPage, filter).then(res => {
       this.projectPageTotal = res.dataCount;
        this.projectColumnData = res.tableContent;
        this.projectLoading = false;
      });
    },

   /**
     * 双击选中项目立项
     */
    handleDbSelectProject(row, index) {
      let type = this.type;
      this.projectName = row.projectName;
      getMyTaskCountAll(type, this.projectName,this.orderCode).then(res => {
        this.defaultDisplayTask = {};
        this.projectPopTipVisible = false;
        this.defaultDisplayTask = res;
      });
    },
  },

  created() {
    var that = this;
    let currentUser = this.$currentUser;
    let username = [currentUser.nickname, currentUser.userId].join("|");
    let token = getToken();
    that.ds.login(
      {
        token: token,
        username: username
      },
      data => {
        console.log("connect success!");
      }
    );

    this.subscribeMessage();
  },
  mounted() {
    var that = this;
    getPulseGraph(this.caseId)
      .then(res => {
        var getSubjectIicon = subjectName => {
          var icon = "";
          this.subjectList.map(s => {
            if (s.name === subjectName) {
              icon = s.icon;
            }
          });

          return icon;
        };
        res.dataItem.map(d => {
          if (d.child) {
            d.child.map(c => {
              var subjectList = ["", "", ""];
              if (c.type === "subject" && c.value) {
                c.icon = "resources/images/icon/" + getSubjectIicon(c.value);
              }
            });
          }
        });

        that.title = res.title;
        that.dataItem = res.dataItem;

        let calcSvgWidth =
          that.calcSvgWidth(res.dataItem) > 1400
            ? that.calcSvgWidth(res.dataItem)
            : 1400;
        let calcSvgHeight = that.calcSvgHeight(res.dataItem);
        if (window.document.getElementById("flow-box")) {
          window.document.getElementById("flow-box").style.width =
            calcSvgWidth + "px";
          window.document.getElementById("flow-box").style.height =
            calcSvgHeight + "px";

          that.draw();
          this.defaultDisplayTask = Object.assign(
            this.myToDo,
            this.subjectTodo
          );
          that.spinShow = false;
        }
      })
      .catch(error => {
        let me = this;
        const title = "提示";
        const content = "<p>" + error + "</p>";
        me.$Modal.error({
          title: title,
          content: content,
          closable: true
        });
      });
  }
};
</script>

<style lang="less">
@bg: #3e96ae;
@bg-text-color: #000;
@borderColor: #dddee1;

.bg_white {
  background-color: white;
}

.flow_container {
  min-width: 1020px;
  overflow-x: scroll;
}

.right_container {
  position: relative;
  margin: auto 0px;
  overflow: auto;
  min-height: 509px;
  margin-left: 1px;
  border-left: 1px solid #9e9e9e57;
}

#flow-box {
  background-color: #ffffff;
}

.switch-box {
  position: relative;
  height: 45px;
  line-height: 45px;
  width: 100%;
  padding: 0px 20px;
  border-bottom: 1px solid @borderColor;
  span:first-child {
    width: 70px;
  }
  .ivu-switch-large.ivu-switch-checked:after {
    left: 46px;
  }
}
.ivu-tabs-bar {
  margin-bottom: 0px;
}

.vertical-divide {
  height: 20px;
  vertical-align: middle;
  display: inline-block;
  width: 1px;
  border-left: 1px solid @borderColor;
  margin-right: 8px;
}

.divide {
  height: 1px;
  background-color: @borderColor;
}
.taskbtn {
  position: fixed;
  top: 10px;
  z-index: 999;
}

.taskbtn_1 {
  position: fixed;
  top: 10px;
  left: 200px;
  z-index: 999;
}

.taskbtn_2 {
  position: fixed;
  top: 10px;
  left: 380px;
  z-index: 999;
}

.taskbtn_3 {
  position: fixed;
  top: 10px;
  left: 480px;
  z-index: 999;
}

.app-dropdown-select {
  display: inline-block;
  position: fixed;
  top: 8px;
  left: 540px;
  z-index: 999;
  font-size: 14px;

  &-item:hover {
    color: #2d8cf0;
    cursor: pointer;
  }
}

.app-search {
  margin-bottom: 5px;
  .app-search-icon {
    font-size: 1rem;
    color: #39f;
    display: inline-block;
    cursor: pointer;
  }
}

.main-flow {
  display: table;
  width: 100%;
  table-layout: fixed;
  border: 1px solid @borderColor;
  margin-top: 10px;
}

.business_item {
  display: table-cell;
  height: 100%;
  overflow: hidden;
}

.image-style {
  border-radius: 5px;
}

.left-name {
  padding: 15px;
  height: 170px;
  // border-right: 1px solid @borderColor;
  // border-bottom: 1px solid @borderColor;
  // background-color: @bg;
  // text-align: center;
  span {
    font-size: 18px;
    height: 100%;
    color: @bg-text-color;
    writing-mode: tb-rl;
  }
}

.svg_box {
  // border-bottom: 1px solid @borderColor;
  display: table-cell;
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
}

.svg-image-style-opacity {
  opacity: 0.2;
}

.svg-image-style:hover {
  cursor: pointer;
}

.svg-title-style {
  text-anchor: middle;
  baseline-shift: sub;
  font-size: 12px;
  font-family: sans-serif;
  fill: #000;
  font-size: 13px;
  cursor: pointer;
  font-weight: bold;
}

.svg-title-style-default {
  text-anchor: middle;
  baseline-shift: sub;
  font-size: 12px;
  font-family: sans-serif;
  fill: #2d8cf0;
  font-size: 13px;
  cursor: default;
  font-weight: bold;
}

.svg-title-style:hover {
  fill: red;
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

.path {
  stroke-dasharray: 10;
  stroke: rgb(253, 7, 7) !important;
  stroke-width: 2px !important;
  animation: dash 2s linear 0s infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -100;
  }
}

.transTypeRel_style {
  fill: none;
  stroke: gray;
  stroke-width: 1;
  // stroke-dasharray: 2;
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>