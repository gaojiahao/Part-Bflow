<template>
  <div class="flow_container right_container">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div id="flow-box">
      <RadioGroup class="taskbtn" v-model="radioGroupLabel" size="large" @on-change="radioGroupChange">
        <Radio label="mytask">
          <i class="iconfont">&#xe636;</i>
          <span>我的任务</span>
        </Radio>
        <i class="vertical-divide"></i>
        <Radio label="teamtask">
          <i class="iconfont">&#xe685;</i>
          <span>团队任务</span>
        </Radio>
      </RadioGroup>
      <RadioGroup class="taskbtn_1" v-model="rodioGroupDoOrNot" size="large" @on-change="radioGroupChangeDoneOrTodo">
        <i class="vertical-divide"></i>
        <Radio label="todo">
          <i class="iconfont">&#xe6a9;</i>
          <span>未完成</span>
        </Radio>
        <i class="vertical-divide"></i>
        <Radio label="done">
          <i class="iconfont">&#xe670;</i>
          <span>已完成</span>
        </Radio>
      </RadioGroup>
      <div class="divide"></div>
      <div class="business_item" style="width:50px">
        <div class="left-name" v-for="(item,index) in dataItem" :key="index">
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="svg_box">
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
              <path d="M2,0 L10,6 L2,12 L6,6 L2,0" style="fill: #4c4c4c;" />
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
              
              <image :x="40+(baseLength+graphSpace)*j" :y="22+170*i" :width="baseLength" :height="baseLength" :xlink:href="item.icon" @click="doAction(item)" rx='10' v-bind:class="{ 'svg-image-style-opacity': !item.isPermitted, 'svg-image-style': true }"></image>
              <!-- 科目与业务节点title -->

              <a @click="redirectTo(item)" :class="item.type==='list'?'svg-title-style':'svg-title-style-default'">
                <text :x="40+baseLength/2+(baseLength+graphSpace)*j" :y="37+baseLength+170*i">
                  {{item.value}}
                </text>
              </a>
              <!-- 所有待办 -->
              <circle :cx="40+(baseLength+graphSpace)*j" :cy="item.type==='list'?25+170*i:45+170*i" r="13" stroke-width="1" fill="red" v-if="item.type==='list' && item.listId in defaultDisplayTask" />
              <text :x="40+(baseLength+graphSpace)*j" :y="item.type==='list'?20+170*i:45+170*i" fill="#fff" class="svg-text-common-style" style="font-size:14px" :listId="item.listId" :taskValue="item.value" @click="opentask"  v-if="item.type==='list'">
                {{defaultDisplayTask[item.listId]}}
              </text>

              <!--  <circle :cx="40+baseLength+(baseLength+graphSpace)*j" :cy="item.type==='list'?25+170*i:45+170*i" r="13" stroke-width="1" fill="red" v-if="item.type==='list' && item.notToDo" />
                    <text :x="40+baseLength+(baseLength+graphSpace)*j" :y="item.type==='list'?20+170*i:45+170*i" fill="#fff" v-if="item.type==='list' && item.notToDo" class="svg-text-common-style">
                      {{item.notToDo}}
                    </text> -->
            </g>
            <polyline :points="business.point" style="fill: none;stroke: #cecece;stroke-width: 0.5px;" />
          </g>

          <g v-for="(point) in pointList" :key="point.id">
            <polyline :points="point.value" :marker-end="waterFlow[point.id]!==undefined?'url(#arrow_hight_color)':'url(#arrow)'" v-bind:class="waterFlow[point.id]!==undefined?'path':''" style="fill:none;stroke:#9d9d9d;stroke-width:1" />
          </g>
          <!-- 应用与应用之间的关系 -->
          <g v-for="(point) in transTypePointList" :key="point.id">
            <polyline :points="point.value" class="transTypeRel_style" marker-end='url(#arrow)' />
          </g>

        </svg>
      </div>
    </div>
    <task-modal :modal='modal' :listId="pageListId" @emitModal="emitModal" :taskValue="taskValue"></task-modal>
  </div>
</template>

<script>
import * as ds from "deepstream.io-client-js";
import TaskModal from "@/components/pulsegraph/TaskModal";
import CircularGraph from "./circularGraph";
import {
  getPulseGraph,
  getCurrentUserInfo,
  getAppTaskCount
} from "@/services/flowService";
import { getToken } from "@/utils/utils";
export default {
  data() {
    return {
      spinShow: true,
      baseLength: 65, //图形大小
      graphSpace: 100, //图形间距
      circleFillColor: "#646b86",
      circleBorderColor: "#e0a527",
      squareFillColor: "#00ae9d",
      squareBorderColor: "#77b745",
      isActive: false,
      arr: [],
      title: "",
      dataItem: [],
      pointList: [],
      transTypePointList: [],
      waterFlow: {},
      flowType: true,
      businessItemWidth: "50px",
      ds: ds("wss://192.168.3.160:6021/deepstream"),
      books$$: null,

      radioGroupLabel: "mytask",
      rodioGroupDoOrNot: "todo",
      doneortodo: "todo",
      taskType: "mytask",

      defaultDisplayTask:{},  //默认显示我的未完成任务
      teamDone: {}, //团队已完成任务
      teamTodo: {}, //团队待办任务
      myDone: {}, //我的已完成任务
      myToDo: {}, //我的未完成任务

      modal: false, //弹出框是否显示
      taskValue:'',
      pageListId: '',
      type: "myToDo"
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
        child = [],
        nextChildId,
        preChildId,
        nextRelevantId,
        preRelevantId,
        endNode = [],
        targetTransType = "", //当前节点坐标
        smpley = 0, //同一业务类型下不相邻节点线y轴每次+5px
        tempPoint;
      for (let i = 0; i < data.length; i++) {
        let y = 170 + 170 * i;
        data[i].point = "0," + y + " 2100," + y;
        if (data[i].child.length > 0) {
          for (let i2 = 0; i2 < data[i].child.length; i2++) {
            this.dataItem[i].child[i2].pointX =
              40 + (baseLength + graphSpace) * i2;
            this.dataItem[i].child[i2].pointY = 22 + baseLength / 2 + 170 * i;

            let childNode = data[i].child[i2];
            if (childNode.teamDone > 0) {
              this.teamDone[childNode.listId] = childNode.teamDone;
            }
            if (childNode.teamTodo > 0) {
              this.teamTodo[childNode.listId] = childNode.teamTodo;
            }
            if (childNode.myDone > 0) {
              this.myDone[childNode.listId] = childNode.myDone;
            }
            if (childNode.myToDo > 0) {
              this.myToDo[childNode.listId] = childNode.myToDo;
            }
          }
        }
      }
      for (let j = 0; j < data.length; j++) {
        child = data[j].child; //子节点
        if (child.length > 0) {
          for (let k = 0; k < child.length; k++) {
            if (child[k].lastNode.length > 0) {
              this.dataItem[j].child[k].preNodes = [];
            }

            if (child[k].endNode && child[k].endNode.length > 0) {
              this.dataItem[j].child[k].endPoints = [];
              endNode = child[k].endNode;
              //记录同一组下节点的下一个节点
              if (k < child.length - 1) {
                nextChildId = child[k + 1].id;
              } else {
                nextChildId = "0";
              }
              //记录同一组下节点的前一个节点

              if (k > 0) {
                preChildId = child[k - 1].id;
              } else {
                preChildId = "0";
              }

              for (let i1 = 0; i1 < endNode.length; i1++) {
                if (endNode[i1].id === nextChildId) {
                  //判断是否为节点下节点

                  tempPoint =
                    child[k].pointX +
                    baseLength +
                    "," +
                    child[k].pointY +
                    " " +
                    (child[k].pointX + baseLength + graphSpace - 4.3) +
                    "," +
                    child[k].pointY;

                  this.pointList.push({
                    id: child[k].id + "_" + endNode[i1].id,

                    value: tempPoint
                  });
                } else if (endNode[i1].id === preChildId) {
                  //判断是否为节点前一节点

                  tempPoint =
                    child[k].pointX +
                    "," +
                    child[k].pointY +
                    " " +
                    (child[k].pointX - graphSpace + 4.3) +
                    "," +
                    child[k].pointY;

                  this.pointList.push({
                    id: child[k].id + "_" + endNode[i1].id,

                    value: tempPoint
                  });
                } else {
                  if (endNode[i1].groupId === data[j].id) {
                    for (let k1 = 0; k1 < child.length; k1++) {
                      //判断为同一类型不相邻节点

                      if (endNode[i1].id === child[k1].id) {
                        tempPoint =
                          child[k].pointX +
                          baseLength / 2 +
                          "," +
                          (child[k].pointY + baseLength / 2 + 20) +
                          " " +
                          (child[k].pointX + baseLength / 2) +
                          "," +
                          (child[k].pointY +
                            baseLength / 2 +
                            20 +
                            15 +
                            smpley) +
                          " " +
                          (child[k1].pointX + baseLength / 2) +
                          "," +
                          (child[k1].pointY +
                            baseLength / 2 +
                            20 +
                            15 +
                            smpley) +
                          " " +
                          (child[k1].pointX + baseLength / 2) +
                          "," +
                          (child[k1].pointY + baseLength / 2 + 4.3 + 20);

                        this.pointList.push({
                          id: child[k].id + "_" + endNode[i1].id,

                          value: tempPoint
                        });

                        smpley += 10;
                      }
                    }
                  } else {
                    //相邻的不同业务类型,

                    if (data[j].index - endNode[i1].groupIndex === 1) {
                      //判断线条向上走

                      targetTransType = data[endNode[i1].groupIndex];

                      for (let t = 0; t < targetTransType.child.length; t++) {
                        if (endNode[i1].id === targetTransType.child[t].id) {
                          if (k === t) {
                            //判断节点y坐标是否相同

                            tempPoint =
                              child[k].pointX +
                              baseLength / 2 +
                              "," +
                              (child[k].pointY - baseLength / 2) +
                              " " +
                              (targetTransType.child[t].pointX +
                                baseLength / 2) +
                              "," +
                              (targetTransType.child[t].pointY +
                                baseLength / 2 +
                                20 +
                                4.3);

                            this.pointList.push({
                              id: child[k].id + "_" + endNode[i1].id,

                              value: tempPoint
                            });
                          } else {
                            tempPoint =
                              child[k].pointX +
                              baseLength / 2 +
                              "," +
                              (child[k].pointY - baseLength / 2) +
                              " " +
                              (child[k].pointX + baseLength / 2) +
                              "," +
                              (child[k].pointY -
                                baseLength / 2 -
                                20 -
                                (100 - baseLength)) +
                              " " +
                              (targetTransType.child[t].pointX +
                                baseLength / 2) +
                              "," +
                              (targetTransType.child[t].pointY +
                                baseLength / 2 +
                                20 +
                                30) +
                              " " +
                              (targetTransType.child[t].pointX +
                                baseLength / 2) +
                              "," +
                              (targetTransType.child[t].pointY +
                                baseLength / 2 +
                                20 +
                                4.3);

                            this.pointList.push({
                              id: child[k].id + "_" + endNode[i1].id,

                              value: tempPoint
                            });
                          }
                        }
                      }
                    }

                    if (data[j].index - endNode[i1].groupIndex === -1) {
                      //判断线条向下走

                      targetTransType = data[endNode[i1].groupIndex];

                      for (let t = 0; t < targetTransType.child.length; t++) {
                        if (endNode[i1].id === targetTransType.child[t].id) {
                          if (k === t) {
                            //判断节点y坐标是否相同

                            tempPoint =
                              child[k].pointX +
                              baseLength / 2 +
                              "," +
                              (child[k].pointY + baseLength / 2 + 20) +
                              " " +
                              (targetTransType.child[t].pointX +
                                baseLength / 2) +
                              "," +
                              (targetTransType.child[t].pointY -
                                baseLength / 2 -
                                4.3);

                            this.pointList.push({
                              id: child[k].id + "_" + endNode[i1].id,

                              value: tempPoint
                            });
                          } else {
                            tempPoint =
                              child[k].pointX +
                              baseLength / 2 +
                              "," +
                              (child[k].pointY + baseLength / 2 + 20) +
                              " " +
                              (child[k].pointX + baseLength / 2) +
                              "," +
                              (child[k].pointY + baseLength / 2 + 55) +
                              " " +
                              (targetTransType.child[t].pointX +
                                baseLength / 2) +
                              "," +
                              (targetTransType.child[t].pointY -
                                baseLength / 2 -
                                (100 - baseLength) -
                                15) +
                              " " +
                              (targetTransType.child[t].pointX +
                                baseLength / 2) +
                              "," +
                              (targetTransType.child[t].pointY -
                                baseLength / 2 -
                                4.3);

                            this.pointList.push({
                              id: child[k].id + "_" + endNode[i1].id,

                              value: tempPoint
                            });
                          }
                        }
                      }
                    }

                    //不相邻的业务类型

                    if (Math.abs(data[j].index - endNode[i1].groupIndex) > 1) {
                      //判断线条向下走

                      targetTransType = data[endNode[i1].groupIndex];

                      for (let t = 0; t < targetTransType.child.length; t++) {
                        if (endNode[i1].id === targetTransType.child[t].id) {
                          if (k === t && k === 0) {
                            //判断节点y坐标是否相同

                            tempPoint =
                              child[k].pointX +
                              "," +
                              child[k].pointY +
                              " " +
                              (child[k].pointX - 20) +
                              "," +
                              child[k].pointY +
                              " " +
                              (targetTransType.child[t].pointX - 20) +
                              "," +
                              targetTransType.child[t].pointY +
                              " " +
                              (targetTransType.child[t].pointX - 4.3) +
                              "," +
                              targetTransType.child[t].pointY;

                            this.pointList.push({
                              id: child[k].id + "_" + endNode[i1].id,

                              value: tempPoint
                            });
                          } else {
                            tempPoint =
                              child[k].pointX +
                              baseLength +
                              "," +
                              child[k].pointY +
                              " " +
                              (child[k].pointX + baseLength + 20) +
                              "," +
                              child[k].pointY +
                              " " +
                              (child[k].pointX + baseLength + 20) +
                              "," +
                              (targetTransType.child[t].pointY -
                                baseLength / 2 -
                                (100 - baseLength) -
                                15) +
                              " " +
                              (targetTransType.child[t].pointX +
                                baseLength / 2) +
                              "," +
                              (targetTransType.child[t].pointY -
                                baseLength / 2 -
                                (100 - baseLength) -
                                15) +
                              " " +
                              (targetTransType.child[t].pointX +
                                baseLength / 2) +
                              "," +
                              (targetTransType.child[t].pointY -
                                baseLength / 2 -
                                4.3);

                            this.pointList.push({
                              id: child[k].id + "_" + endNode[i1].id,

                              value: tempPoint
                            });
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

            /*
            *  应用与应用的关系
            */
            if (child[k].relevantNode && child[k].relevantNode.length > 0) {
              let relevantNode = child[k].relevantNode;
              //记录同一组下节点的下一个节点
              if (k < child.length - 1) {
                nextRelevantId = child[k + 1].id;
              } else {
                nextRelevantId = "0";
              }
              //记录同一组下节点的前一个节点

              if (k > 0) {
                preRelevantId = child[k - 1].id;
              } else {
                preRelevantId = "0";
              }

              for (let i3 = 0; i3 < relevantNode.length; i3++) {
                if (relevantNode[i3].type === "list") {
                  if (String(relevantNode[i3].id) === nextRelevantId) {
                    //判断是否为节点下节点

                    tempPoint =
                      child[k].pointX +
                      baseLength +
                      "," +
                      child[k].pointY +
                      " " +
                      (child[k].pointX + baseLength + graphSpace - 4.3) +
                      "," +
                      child[k].pointY;

                    this.transTypePointList.push({
                      id: child[k].id + "_" + relevantNode[i3].id,
                      value: tempPoint
                    });
                  } else if (String(relevantNode[i3].id) === preRelevantId) {
                    //判断是否为节点前一节点

                    tempPoint =
                      child[k].pointX +
                      "," +
                      child[k].pointY +
                      " " +
                      (child[k].pointX - graphSpace + 4.3) +
                      "," +
                      child[k].pointY;

                    this.transTypePointList.push({
                      id: child[k].id + "_" + relevantNode[i3].id,
                      value: tempPoint
                    });
                  } else {
                    if (String(relevantNode[i3].groupId) === data[j].id) {
                      for (let k1 = 0; k1 < child.length; k1++) {
                        //判断为同一类型不相邻节点

                        if (String(relevantNode[i3].id) === child[k1].id) {
                          tempPoint =
                            child[k].pointX +
                            baseLength / 2 +
                            "," +
                            (child[k].pointY + baseLength / 2 + 20) +
                            " " +
                            (child[k].pointX + baseLength / 2) +
                            "," +
                            (child[k].pointY + baseLength / 2 + 20 + 15) +
                            " " +
                            (child[k1].pointX + baseLength / 2) +
                            "," +
                            (child[k1].pointY + baseLength / 2 + 20 + 15) +
                            " " +
                            (child[k1].pointX + baseLength / 2) +
                            "," +
                            (child[k1].pointY + baseLength / 2 + 20 + 4.3);

                          this.transTypePointList.push({
                            id: child[k].id + "_" + relevantNode[i3].id,
                            value: tempPoint
                          });
                        }
                      }
                    } else {
                      //相邻的不同业务类型,

                      if (data[j].index - relevantNode[i3].groupIndex === 1) {
                        //判断线条向上走
                        targetTransType = data[relevantNode[i3].groupIndex];
                        for (
                          let t1 = 0;
                          t1 < targetTransType.child.length;
                          t1++
                        ) {
                          if (
                            String(relevantNode[i3].id) ===
                            targetTransType.child[t1].id
                          ) {
                            if (k === t1) {
                              //判断节点y坐标是否相同

                              tempPoint =
                                child[k].pointX +
                                baseLength / 2 +
                                "," +
                                (child[k].pointY - baseLength / 2) +
                                " " +
                                (targetTransType.child[t1].pointX +
                                  baseLength / 2) +
                                "," +
                                (targetTransType.child[t1].pointY +
                                  baseLength / 2 +
                                  +20 +
                                  4.3);

                              this.transTypePointList.push({
                                id: child[k].id + "_" + relevantNode[i3].id,
                                value: tempPoint
                              });
                            } else {
                              tempPoint =
                                child[k].pointX +
                                baseLength / 2 +
                                "," +
                                (child[k].pointY - baseLength / 2) +
                                " " +
                                (child[k].pointX + baseLength / 2) +
                                "," +
                                (child[k].pointY -
                                  baseLength / 2 -
                                  25 -
                                  (100 - baseLength)) +
                                " " +
                                (targetTransType.child[t1].pointX +
                                  baseLength / 2) +
                                "," +
                                (targetTransType.child[t1].pointY +
                                  baseLength / 2 +
                                  20 +
                                  35) +
                                " " +
                                (targetTransType.child[t1].pointX +
                                  baseLength / 2) +
                                "," +
                                (targetTransType.child[t1].pointY +
                                  baseLength / 2 +
                                  20 +
                                  4.3);

                              this.transTypePointList.push({
                                id: child[k].id + "_" + relevantNode[i3].id,

                                value: tempPoint
                              });
                            }
                          }
                        }
                      }

                      if (data[j].index - relevantNode[i3].groupIndex === -1) {
                        //判断线条向下走

                        targetTransType = data[relevantNode[i3].groupIndex];

                        for (
                          let t2 = 0;
                          t2 < targetTransType.child.length;
                          t2++
                        ) {
                          if (
                            String(relevantNode[i3].id) ===
                            targetTransType.child[t2].id
                          ) {
                            if (k === t2) {
                              //判断节点y坐标是否相同

                              tempPoint =
                                child[k].pointX +
                                baseLength / 2 +
                                "," +
                                (child[k].pointY + baseLength / 2 + 20) +
                                " " +
                                (targetTransType.child[t2].pointX +
                                  baseLength / 2) +
                                "," +
                                (targetTransType.child[t2].pointY -
                                  baseLength / 2 -
                                  4.3);

                              this.transTypePointList.push({
                                id: child[k].id + "_" + relevantNode[i3].id,

                                value: tempPoint
                              });
                            } else {
                              tempPoint =
                                child[k].pointX +
                                baseLength / 2 +
                                "," +
                                (child[k].pointY + baseLength / 2 + 20) +
                                " " +
                                (child[k].pointX + baseLength / 2) +
                                "," +
                                (child[k].pointY + baseLength / 2 + 50) +
                                " " +
                                (targetTransType.child[t2].pointX +
                                  baseLength / 2) +
                                "," +
                                (targetTransType.child[t2].pointY -
                                  baseLength / 2 -
                                  (100 - baseLength) -
                                  20) +
                                " " +
                                (targetTransType.child[t2].pointX +
                                  baseLength / 2) +
                                "," +
                                (targetTransType.child[t2].pointY -
                                  baseLength / 2 -
                                  4.3);

                              this.transTypePointList.push({
                                id: child[k].id + "_" + relevantNode[i3].id,

                                value: tempPoint
                              });
                            }
                          }
                        }
                      }

                      //不相邻的业务类型
                      if (
                        Math.abs(data[j].index - relevantNode[i3].groupIndex) >
                        1
                      ) {
                        //判断线条向下走

                        targetTransType = data[relevantNode[i3].groupIndex];

                        for (
                          let t3 = 0;
                          t3 < targetTransType.child.length;
                          t3++
                        ) {
                          if (
                            String(relevantNode[i3].id) ===
                            targetTransType.child[t3].id
                          ) {
                            if (k === t3 && k === 0) {
                              //判断节点y坐标是否相同

                              tempPoint =
                                child[k].pointX +
                                "," +
                                child[k].pointY +
                                " " +
                                (child[k].pointX - 20) +
                                "," +
                                child[k].pointY +
                                " " +
                                (targetTransType.child[t3].pointX - 20) +
                                "," +
                                targetTransType.child[t3].pointY +
                                " " +
                                (targetTransType.child[t3].pointX - 4.3) +
                                "," +
                                targetTransType.child[t3].pointY;

                              this.transTypePointList.push({
                                id: child[k].id + "_" + relevantNode[i3].id,

                                value: tempPoint
                              });
                            } else {
                              tempPoint =
                                child[k].pointX +
                                baseLength +
                                "," +
                                child[k].pointY +
                                " " +
                                (child[k].pointX + baseLength + 20) +
                                "," +
                                child[k].pointY +
                                " " +
                                (child[k].pointX + baseLength + 20) +
                                "," +
                                (targetTransType.child[t3].pointY -
                                  baseLength / 2 -
                                  (100 - baseLength) -
                                  25) +
                                " " +
                                (targetTransType.child[t3].pointX +
                                  baseLength / 2) +
                                "," +
                                (targetTransType.child[t3].pointY -
                                  baseLength / 2 -
                                  (100 - baseLength) -
                                  25) +
                                " " +
                                (targetTransType.child[t3].pointX +
                                  baseLength / 2) +
                                "," +
                                (targetTransType.child[t3].pointY -
                                  baseLength / 2 -
                                  4.3);

                              this.transTypePointList.push({
                                id: child[k].id + "_" + relevantNode[i3].id,

                                value: tempPoint
                              });
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          smpley = 0; //清除
        }
      }
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

    /**
     * 应用链接跳转
     */
    redirectTo: function(item, event) {
      let url = item.url;
      if (item.type === "subject") return;

      if (item.target === "_blank") {
        window.open(item.url, "_blank");
      } else {
        if (~url.indexOf("outlink")) {
          url = item.url;
        } else if (~url.indexOf("app")) {
          url = "appReport/" + url;
        } else {
          url = "report/" + url;
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
        this.defaultDisplayTask = this.teamDone;
      } else if (this.taskType === "teamtask" && this.doneortodo === "todo") {
        this.type = "teamTodo";
        this.defaultDisplayTask = this.teamTodo;
      } else if (this.taskType === "mytask" && this.doneortodo === "done") {
        this.type = "myDone";
        this.defaultDisplayTask = this.myDone;
      } else if (this.taskType === "mytask" && this.doneortodo === "todo") {
        this.type = "myToDo";
        this.defaultDisplayTask = this.myToDo;
      }
    },

    radioGroupChangeDoneOrTodo: function(e) {
      this.doneortodo = e;
      if (this.taskType === "teamtask" && this.doneortodo === "done") {
        this.type = "teamDone";
        this.defaultDisplayTask = this.teamDone;
      } else if (this.taskType === "teamtask" && this.doneortodo === "todo") {
        this.type = "teamTodo";
        this.defaultDisplayTask = this.teamTodo;
      } else if (this.taskType === "mytask" && this.doneortodo === "done") {
        this.type = "myDone";
        this.defaultDisplayTask = this.myDone;
      } else if (this.taskType === "mytask" && this.doneortodo === "todo") {
        this.type = "myToDo";
        this.defaultDisplayTask = this.myToDo;
      }
    },

    /**
     * 查看待办任务
     */
    opentask(e) {
      this.modal = true;
      this.pageListId = e.target.getAttribute("listId");
      this.taskValue = e.target.getAttribute('taskValue');
    },

    //监听弹出框返回得状态值
    emitModal(val,e){
      this.pageListId = val.listId;
      this.modal = false
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
    }
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
        var getSubjectIicon = function(subjectName) {
          var icon = "";
          var subjectList = [
            { name: "计划", icon: "plan.png" },
            { name: "需求", icon: "requirement.png" },
            { name: "领料", icon: "collar-material.png" },
            { name: "结项", icon: "check.png" },
            { name: "验收", icon: "check.png" },
            { name: "交付", icon: "pay.png" },
            { name: "存货", icon: "stock.png" },
            { name: "毛利", icon: "gross-profit.png" },
            { name: "开票", icon: "open-ticket.png" },
            { name: "收票", icon: "put-ticket.png" },
            { name: "资金", icon: "fund.png" },
            { name: "往来", icon: "dealings.png" },
            { name: "设施", icon: "facilities.png" },
            { name: "费用", icon: "cost-sub.png" },
            { name: "税支", icon: "taxexpenditure.png" }
          ];

          subjectList.map(s => {
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
              if (c.type === "subject") {
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
        window.document.getElementById("flow-box").style.width =
          calcSvgWidth + "px";
        window.document.getElementById("flow-box").style.height =
          calcSvgHeight + "px";
        that.draw();
        this.defaultDisplayTask = this.myToDo;
        that.spinShow = false;
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
  min-height: 765px;
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
  left: 260px;
  z-index: 999;
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
  border-right: 1px solid @borderColor;
  border-bottom: 1px solid @borderColor;
  // background-color: @bg;
  text-align: center;

  span {
    font-size: 18px;
    height: 100%;
    color: @bg-text-color;
    writing-mode: tb-rl;
  }
}

.svg_box {
  border-bottom: 1px solid @borderColor;
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
  fill: #2d8cf0;
  font-size: 13px;
  cursor: pointer;
  font-weight: bold;
}

.svg-title-style-default {
  text-anchor: middle;
  baseline-shift: sub;
  font-size: 12px;
  font-family: sans-serif;
  fill: #000;
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
  stroke: #00ae9d;
  stroke-width: 2;
  stroke-dasharray: 2;
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