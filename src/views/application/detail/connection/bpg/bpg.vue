<style lang="less">
@import "./bpg.less";
</style>

<template>
  <div class="view-container">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <header class="header">
      <span>{{title}}</span>
    </header>
    <div class="svg-board">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">
        <defs>
          <marker id="arrow" markerUnits="userSpaceOnUse" markerWidth="15" markerHeight="15" viewBox="0 0 15 15" refX="6" refY="6" orient="auto">
            <path d="M2,0 L10,6 L2,12 L6,6 L2,0" style="fill: #9cd3d3;" />
          </marker>
        </defs>
        
        <!-- 行绘制 -->
        <g v-for="(item,index) in process" :key="index">
          <text :x="item.xAxion" y="20" class="top-process">
            {{item.name}}
          </text>
          <line :x1="item.xAxionLine" y1="0" :x2="item.xAxionLine" :y2="svgHeight" style="stroke:#bec1cb;stroke-width:1" />
        </g>
        <line x1="40" y1="0" x2="40" :y2="svgHeight" style="stroke:#bec1cb;stroke-width:1" />
        
        <!-- 列绘制 -->
        <g v-for="(item,index) in position" :key="item.id">
          <text x="30" :y="topSpace+(defaultHeight/2)*(2*index+1)" class="top-process left-slide">
            {{item.name}}
          </text>
          <line x1="0" :y1="topSpace+defaultHeight*index" :x2="topSpace+svgWidth" :y2="topSpace+defaultHeight*index" style="stroke:#bec1cb;stroke-width:1" />
        </g>
        <line x1="0" :y1="svgHeight" :x2="topSpace+svgWidth" :y2="svgHeight" style="stroke:#bec1cb;stroke-width:1" />

        <!-- 节点绘制 -->
        <g v-for="item in nodeList" :key="item.id">
            <!-- <shape v-if="item.id=='start'||item.id=='end'" :xAxion="item.xAxion+nodeWidth/2" :yAxion="item.yAxion" color="#7da87b"  ></shape> -->
            <rect
              :x="item.xAxion" 
              :y="item.yAxion-nodeHeight/2" 
              :width="nodeWidth" 
              :height="nodeHeight" 
              style="fill:#ff9234; stroke:#de9002; stroke-width:1px;" />
             
            <text 
              :x="item.xAxion+nodeWidth/2"
              :y="item.yAxion-5"
              fill="#fff" 
              style="font-size:12px; text-anchor: middle;baseline-shift: sub; font-family: sans-serif;">
                {{item.title}}
            </text> 
        </g>

         <g v-for="(line,index) in polyLineList" :key="index">
            <polyline :points="line.value" marker-end='url(#arrow)' style="fill:none;stroke:#9cd3d3;stroke-width:2" />
          </g>
      </svg>
    </div>
  </div>
</template>

<script>
import { getMockData } from "@/services/flowService";
import Shape from "@/components/Shape";
export default {
  components: {
    Shape,
  },

  data() {
    return {
      spinShow: false,
      title: "",
      topSpace: 40, 
      graphSpace:30,//节点间间距
      defaultWidth: 130, //单元格默认宽度
      defaultHeight: 100, //单元格默认高度
      nodeWidth: 80, //节点宽度
      nodeHeight: 40, //节点高度
      nodeList: [],   //节点数据
      process: [],    //流程布置
      position: [],   //节点职位
      svgWidth: 0,    //svg画布宽度
      svgHeight: 0,   //svg画布高度
      localPoint: {},  //每块区域节点定位坐标集合
      nodePointAxion:{},//节点坐标集合
      polyLineList:[]
    };
  },

  methods: {
    handleProcssData(process) {
      let preWidth = 40;
      for (let i = 0; i < process.length; i++) {
        if (i != 0) {
          preWidth = process[i - 1].xAxionLine;
        }
        process[i].xAxion =
          (process[i].length * this.defaultWidth) / 2 + preWidth;
        process[i].xAxionLine =
          process[i].length * this.defaultWidth + preWidth;

        if (i == process.length - 1) {
          this.svgWidth = process[i].xAxionLine; //svg 画布宽度
        }
      }
      return process;
    },

    //构造每块区域坐标定位点
    setLocalPoint(pro, pos) {
      let localPoint = {},
        xAxion = 0,
        yAxion = 0,
        key = "";
      for (let j = 0; j < pos.length; j++) {
        for (let i = 0; i < pro.length; i++) {
          key = pro[i].id + "_" + pos[j].id;
          xAxion = pro[i].xAxionLine - pro[i].length * this.defaultWidth;
          yAxion = this.topSpace + (this.defaultHeight / 2) * (2 * j + 1);
          localPoint[key] = xAxion + "," + yAxion;
        }
      }
      return localPoint;
    },

    //绘制节点坐标点
    drawNodePoint(nodes) {
      let groupItem = {},
        group = [];
      //数组对象分组  分组格式[{id:**,arr:[{},{}]},{id:**,arr:[{},{}]}]
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (!groupItem[node.process+'_'+node.position]) {
          group.push({
            id:node.process+'_'+node.position,
            arr: [node]
          });
          groupItem[node.process+'_'+node.position] = node;
        } else {
          for (let j = 0; j < group.length; j++) {
            let dj = group[j];
            if (dj.id == node.process+'_'+node.position) {
              dj.arr.push(node);
              break;
            }
          }
        }
      }
      
      let res = [],
       nodePointAxion ={},
       localPoint = this.localPoint,
       preNodeXAion = 0;
      let firstProcessId = this.process[0].id;
      let flag = false;
      group.forEach(item => {
        //给流程节点为一的里面区域内节点向右多偏移一个单位
        flag = ~item.id.indexOf(firstProcessId)? true:false;  
        if(flag){
          let f = item['arr'].filter(node=>{
            return node.id === 'start';
          })
          flag = f.length>0?false:true;
        }

        item['arr'].forEach((node,index) =>{
          let axion = localPoint[item.id].split(',');
          
          if(flag){
            node['xAxion'] = +axion[0] + this.graphSpace*(index+1) +preNodeXAion+(this.graphSpace+this.nodeWidth);
            node['yAxion'] = +axion[1];
            preNodeXAion =  this.nodeWidth*(index+1);   //记录当前区域内节点占据宽度
            nodePointAxion[node.id] = node['xAxion']+','+node['yAxion'];
          }else{
            node['xAxion'] = +axion[0] + this.graphSpace*(index+1) +preNodeXAion;
            node['yAxion'] = +axion[1];
            preNodeXAion =  this.nodeWidth*(index+1);   //记录当前区域内节点占据宽度
            nodePointAxion[node.id] = node['xAxion']+','+node['yAxion'];
          }
          res.push(node);
        })
        preNodeXAion = 0;
      });

      this.nodePointAxion = nodePointAxion;
      return res;
    },

    //绘制节点之间连线
    drawLine(node){
      let nodePointAxion = this.nodePointAxion;
      const actionMap = new Map([
        [1,(parentNode,nextNode)=>{
          let parentNodeXAxion = +parentNode[0],
              parentNodeYAxion = +parentNode[1],
              nextNodeXAxion = +nextNode[0],
              nextNodeYAxion = +nextNode[1];
            if(Math.abs(parentNodeXAxion-nextNodeXAxion)>(this.graphSpace*2+this.nodeWidth)){
               return (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (parentNodeYAxion+this.nodeHeight/2) +
                      " " +
                    (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (parentNodeYAxion+this.nodeHeight/2+20) +
                      " " +
                     (nextNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (nextNodeYAxion+this.nodeHeight/2+20) +
                     " " +
                   (nextNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (nextNodeYAxion+this.nodeHeight/2+3);
            } else{
              return (parentNodeXAxion+this.nodeWidth) +
                      "," +
                      parentNodeYAxion +
                      " " +
                      (nextNodeXAxion-3) +
                      "," +
                      nextNodeYAxion;
            } 
        }],
        [2,(parentNode,nextNode)=>{
          let parentNodeXAxion = +parentNode[0],
              parentNodeYAxion = +parentNode[1],
              nextNodeXAxion = +nextNode[0],
              nextNodeYAxion = +nextNode[1];
            return (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (parentNodeYAxion+this.nodeHeight/2) +
                    " " +
                    (nextNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (nextNodeYAxion-this.nodeHeight/2-3);
        }],
        [3,(parentNode,nextNode)=>{
           let point = "0,0,0,0";
           let parentNodeXAxion = +parentNode[0],
              parentNodeYAxion = +parentNode[1],
              nextNodeXAxion = +nextNode[0],
              nextNodeYAxion = +nextNode[1];
              //判断下节点在父节点什么位置
              if(parentNodeXAxion-nextNodeXAxion>0 && parentNodeYAxion-nextNodeYAxion>0){ //左上
                point =  (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (parentNodeYAxion-this.nodeHeight/2) +
                    " " +
                    (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (parentNodeYAxion-this.nodeHeight/2-10) +
                    " " +
                    (nextNodeXAxion-10) +
                    "," +
                    (parentNodeYAxion-this.nodeHeight/2-10) +
                    " " +
                     (nextNodeXAxion-10) +
                    "," +
                    nextNodeYAxion+
                     " " +
                    (nextNodeXAxion-3) +
                    "," +
                    nextNodeYAxion;
              }else if(parentNodeXAxion-nextNodeXAxion<0 && parentNodeYAxion-nextNodeYAxion<0){ //右下
                point =  (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (parentNodeYAxion+this.nodeHeight/2) +
                    " " +
                     (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    nextNodeYAxion+
                     "," +
                    (nextNodeXAxion-3) +
                    "," +
                    nextNodeYAxion;
              }else if(parentNodeXAxion-nextNodeXAxion<0 && parentNodeYAxion-nextNodeYAxion>0){ //右上
                point =  (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (parentNodeYAxion-this.nodeHeight/2) +
                    " " +
                    (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (parentNodeYAxion-this.nodeHeight/2-10) +
                    " " +
                    (parentNodeXAxion+this.nodeWidth+10) +
                    "," +
                    (parentNodeYAxion-this.nodeHeight/2-10) +
                    " " +
                     (parentNodeXAxion+this.nodeWidth+10) +
                    "," +
                    nextNodeYAxion+
                     " " +
                    (nextNodeXAxion-3) +
                    "," +
                    nextNodeYAxion;
              }else if(parentNodeXAxion-nextNodeXAxion>0 && parentNodeYAxion-nextNodeYAxion<0){ //左下
                point =  parentNodeXAxion +
                    "," +
                    parentNodeYAxion +
                    " " +
                    (parentNodeXAxion-10) +
                    "," +
                    parentNodeYAxion +
                    " " +
                     (parentNodeXAxion-10) +
                    "," +
                     (nextNodeYAxion+this.nodeHeight/2+10) +
                     " " +
                    (nextNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (nextNodeYAxion+this.nodeHeight/2+10) +
                     " " +
                   (nextNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (nextNodeYAxion+this.nodeHeight/2+3);
              }
              return point
        }]
      ]);
      node.forEach(parentNode =>{
        if(parentNode.nextNode && parentNode.nextNode.length>0){   //判断当前节点是否存在下一节点
            parentNode.nextNode.forEach(next =>{
              let nextPoint = nodePointAxion[next.id].split(','),
                  parentPoint = nodePointAxion[parentNode.id].split(',');
                  if(nextPoint[0] != parentPoint[0] && nextPoint[1] == parentPoint[1]){ //X轴坐标不相同,y轴相同
                    this.polyLineList.push({id:parentNode.id,value:actionMap.get(1)(parentPoint,nextPoint)})
                  } else if(nextPoint[0] == parentPoint[0] && nextPoint[1] != parentPoint[1]){    //X轴坐标相同,y轴不相同
                     this.polyLineList.push({id:parentNode.id,value:actionMap.get(2)(parentPoint,nextPoint)})
                  }else if(nextPoint[0] != parentPoint[0] && nextPoint[1] != parentPoint[1]){
                     this.polyLineList.push({id:parentNode.id,value:actionMap.get(3)(parentPoint,nextPoint)})
                  }
            })
        }
      })
    }
  },

  errorCaptured (err, vm, info) {
    this.error = `${err.stack}\n\nfound in ${info} of component`
    return false
  },

  mounted() {
    this.spinShow = true;
    getMockData().then(res => {
      let that = this;
      that.title = res.title;
      that.position = res.position;
      that.svgHeight = res.position.length * that.defaultHeight + 40; //svg 画布高度

      window.document.getElementsByClassName(
      "svg-board"
    )[0].style.height = (that.svgHeight+20)+'px';

      //处理流程步骤数据
      that.process = that.handleProcssData(res.process);

      that.localPoint = that.setLocalPoint(that.process, that.position);

      that.nodeList = that.drawNodePoint(res.nodeList);
      //绘制线条
      that.drawLine(that.nodeList);

      this.spinShow = false;
    });
  }
};
</script>
