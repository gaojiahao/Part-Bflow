<template>
    <div class="rfd-tetechnology-warp">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <header class="rfd-tetechnology-warp-header">
        </header>
        <main class="rfd-tetechnology-warp-main">
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
                            <path d="M2,0 L10,6 L2,12 L6,6 L2,0" style="fill: #808695;" />
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
                        <!-- <shape :xAxion="item.pointX" :yAxion="item.pointY" color="#b9d3ef" borderColor="#739cc3" :width="defaultShapeWidth" :height="defaultShapeWidth"></shape> -->

                        <image :x="item.pointX" :y="item.pointY" :width="defaultShapeWidth" :height="defaultShapeWidth" :xlink:href="item.photo" rx="25"></image>

                        <text :x="item.pointX+defaultShapeWidth/2" :y="item.pointY+defaultShapeWidth+5" fill="#000" style="font-size:14px" class="svg-text-common-style">
                            {{item.spName}}
                        </text>

                        <!-- 所有待办 -->
                        <circle :cx="item.pointX" :cy="item.pointY" r="12" stroke-width="1" fill="red" />
                        <text :x="item.pointX" :y="item.pointY-4" fill="#fff" class="svg-text-common-style" style="font-size:10px;font-weight:bold">
                            12
                        </text>

                    </g>
                    <g v-for="(line,index) in pointList" :key="index">
                        <polyline :points="line.value" marker-end='url(#arrow1)' style="fill:none;stroke:#808695;stroke-width:2" />
                    </g>
                </svg>
            </div>
        </main>
    </div>
</template>

<script>
import Shape from "@/components/Shape";
import {
  getProcedureAndProcess,
  getMockData,
  getProcessRouteProcedureRel
} from "@/services/flowService";
export default {
  name: "TechnologyGraph",

  components: {
    Shape
  },

  data() {
    return {
      processRouteCode: this.$route.params.processRouteCode,
      spinShow: false,
      screenWidth: document.body.clientWidth, // 这里是给到了一个默认值
      xAxion: 50,
      yAxion: 80,

      pointList: [], //存放节点连线坐标
      ProcessAndProcedureData: [],
      defaultxAxion: 40,
      defaultyAxion: 80,
      graphSpace: 100,
      defaultShapeWidth: 50,
      showNumber: 9 //一行显示多少个
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
          data[i].pointX =
            this.defaultxAxion +
            (xCount - 1) * (graphSpace + defaultShapeWidth);
          data[i].pointY =
            this.defaultyAxion + (this.defaultShapeWidth + graphSpace) * yCount;
          nodePointXY[data[i].procedureCode] =
            data[i].pointX + "," + data[i].pointY;
          xCount--;
        }
      }

      data.forEach((item, itemIndex) => {
        if (item.underProcedureCode) {
          if (item.underProcedureCode in nodePointXY) {
            nextPoint = nodePointXY[item.underProcedureCode].split(",");
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
            }
            //线条从左指右
            if (nextPointX > item.pointX && nextPointY === item.pointY) {
              this.pointList.push({
                id: item.procedureCode,
                value:
                  item.pointX +
                  this.defaultShapeWidth +
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
      this.spinShow = true;
      getProcedureAndProcess(processRouteCode)
        .then(res => {
          this.ProcessAndProcedureData = res;
          this.drawGraph();
          this.spinShow = false;
        })
        .catch(error => {
          this.$Message.error(error);
        });
    }
  },

  mounted() {
    let mainMaxHeight = document.body.clientHeight - 45;
    window.document.getElementsByClassName(
      "rfd-tetechnology-warp-main"
    )[0].style.height =
      mainMaxHeight + "px";

    window.document.getElementsByClassName(
      "rfd-tetechnology-warp-main"
    )[0].style.maxHeight =
      mainMaxHeight + "px";

    this.showNumber = Math.floor(
      document.body.clientWidth / (this.defaultShapeWidth + this.graphSpace)
    );
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };

    this.getProcessAndProcedure(processRouteCode);
  }
};
</script>

<style lang="less" >
.rfd-tetechnology-warp {
  background-color: #fff;

  &-header {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #ddd;

    .input-select {
      width: 160px;
      margin: 0 5px;
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
</style>

