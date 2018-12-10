<style lang="less">
@import "./BusinessModuleGraph.less";
</style>

<template>
  <div class="view-container">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <header class="header">
      <span>{{title}}</span>
      <span>配置</span>
    </header>
    <div class="svg-board">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">
        <defs>
          <marker id="arrow" markerUnits="userSpaceOnUse" markerWidth="15" markerHeight="15" viewBox="0 0 15 15" refX="6" refY="6" orient="auto">
            <path d="M2,0 L10,6 L2,12 L6,6 L2,0" style="fill: #4672c4;" />
          </marker>
        </defs>
        
        <!-- 列绘制 -->
        <g v-for="item in stageList" :key="item.rowAnchorPoint">
            <text :x="item.xAxion" y="20" class="top-process">
              {{item.title}}
            </text>
          <line :x1="item.xAxionLine" y1="0" :x2="item.xAxionLine" :y2="svgHeight" style="stroke:#eceef6;stroke-width:2" />
        </g>
        <line x1="40" y1="0" x2="40" :y2="svgHeight" style="stroke:#eceef6;stroke-width:2" />
        
        <!-- 行绘制 -->
        <g v-for="(item,index) in positionList" :key="item.columnAnchorPoint">
          <text x="30" :y="topSpace+(defaultHeight/2)*(2*index+1)"  class="top-process left-slide">
              {{item.title.replace(/（/g,"(").split('(')[0]}}
          </text>
          <line x1="0" :y1="topSpace+defaultHeight*index" :x2="topSpace+svgWidth" :y2="topSpace+defaultHeight*index" style="stroke:#eceef6;stroke-width:2" />
        </g>
       
        <line x1="0" :y1="svgHeight" :x2="topSpace+svgWidth" :y2="svgHeight" style="stroke:#eceef6;stroke-width:2" />

        <!-- 节点绘制 -->
        <g v-for="item in nodeList" :key="item.id">
            <!-- <shape v-if="item.id=='-2'||item.id=='end'" :xAxion="item.xAxion+nodeWidth/2" :yAxion="item.yAxion" color="#7da87b"  ></shape> -->
            <polygon 
              v-if="item.type ==='branch'" 
              :points="(item.xAxion+nodeWidth/2)+','+(item.yAxion-nodeHeight/2)+' '
                      +(item.xAxion+nodeWidth)+','+item.yAxion+' '
                      +(item.xAxion+nodeWidth/2)+','+(item.yAxion+nodeHeight/2)+' '
                      +item.xAxion+','+item.yAxion" 
              style="fill: #4672c4;stroke: #4672c4;stroke-width:1"
            />
            <rect v-else
              :x="item.xAxion" 
              :y="item.yAxion-nodeHeight/2" 
              :width="nodeWidth" 
              :height="nodeHeight" 
              :stroke="item.id==='-3'||item.id==='-2'?'#cd5334':'#df8931'"
              :fill ="item.id ==='-3'||item.id==='-2'?'#cd5334':'#df8931'"
              stroke-width="1"
              />
            <text 
              :x="item.xAxion+nodeWidth/2"
              :y="item.yAxion-5"
              fill="#fff" 
              style="font-size:12px; text-anchor: middle;baseline-shift: sub; font-family: sans-serif;">
                {{item.name}}
            </text> 
        </g>

         <g v-for="(line,index) in polyLineList" :key="line.id+'_'+index">
            <polyline :points="line.value" marker-end='url(#arrow)' style="fill:none;stroke:#4672c4;stroke-width:2" />
          </g>
      </svg>
    </div>
  </div>
</template>

<script>
import {getBusinessModuleById } from "@/services/flowService";
import Shape from "@/components/Shape";
export default {
  name:"BusinessModuleGraph",
  components: {
    Shape,
  },

  data() {
    return {
      moduleId:this.$route.params.moduleId,
      spinShow: false,
      title: "",
      topSpace: 40, 
      graphSpace:30,//节点间间距
      defaultWidth: 130, //单元格默认宽度
      defaultHeight: 140, //单元格默认高度
      nodeWidth: 80, //节点宽度
      nodeHeight: 40, //节点高度
      nodeList: [],   //节点数据
      stageList: [],    //流程布置
      positionList: [],   //节点职位
      svgWidth: 0,    //svg画布宽度
      svgHeight: 0,   //svg画布高度
      localPoint: {},  //每块区域节点定位坐标集合
      nodePointAxion:{},//节点坐标集合
      polyLineList:[],
    };
  },

  methods: {
    getBusinessModuleById(moduleId){
      getBusinessModuleById(moduleId).then(res => {
      let that = this;
      that.title = res.title;
      that.positionList = res.positionList;
      that.svgHeight = res.positionList.length * that.defaultHeight + 40; //svg 画布高度
      //处理流程步骤数据
      that.stageList = that.handleProcssData(res.stageList);

      that.localPoint = that.setLocalPoint(that.stageList, that.positionList);

      that.nodeList = that.drawNodePoint(res.nodeList);
      //绘制线条
      that.drawLine(that.nodeList);
       window.document.getElementsByClassName(
      "svg-board"
      )[0].style.height = (that.svgHeight+20)+'px';
      window.document.getElementsByClassName(
        "svg-board"
      )[0].style.width = that.svgWidth+'px';

      this.spinShow = false;
    });
  },

    handleProcssData(stageList) {
      let preWidth = 40;
      for (let i = 0; i < stageList.length; i++) {
        if (i != 0) {
          preWidth = stageList[i - 1].xAxionLine;
        }
        stageList[i].xAxion =
          (stageList[i].length * this.defaultWidth) / 2 + preWidth;
        stageList[i].xAxionLine =
          stageList[i].length * this.defaultWidth + preWidth;

        if (i == stageList.length - 1) {
          this.svgWidth = stageList[i].xAxionLine; //svg 画布宽度
        }
      }
      return stageList;
    },

    //构造每块区域坐标定位点
    setLocalPoint(pro, pos) {
      let localPoint = {},
        xAxion = 0,
        yAxion = 0,
        key = "";
      for (let j = 0; j < pos.length; j++) {
        for (let i = 0; i < pro.length; i++) {
          key = pro[i].columnAnchorPoint + "_" + pos[j].rowAnchorPoint;
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
        if (!groupItem[node.columnAnchorPoint+'_'+node.rowAnchorPoint]) {
          group.push({
            id:node.columnAnchorPoint+'_'+node.rowAnchorPoint,
            arr: [node]
          });
          groupItem[node.columnAnchorPoint+'_'+node.rowAnchorPoint] = node;
        } else {
          for (let j = 0; j < group.length; j++) {
            let dj = group[j];
            if (dj.id == node.columnAnchorPoint+'_'+node.rowAnchorPoint) {
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
      let firstProcessId = this.stageList[0].columnAnchorPoint;
      let flag = false;
      group.forEach(item => {
        //给流程节点为一的里面区域内节点向右多偏移一个单位
        flag = ~item.id.indexOf(firstProcessId)? true:false;  
        if(flag){
          let f = item['arr'].filter(node=>{
            return node.id === '-2';
          })
          flag = f.length>0?true:false;
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
            if(Math.abs(parentNodeXAxion-nextNodeXAxion)>(this.graphSpace*4+this.nodeWidth)){
               return (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (parentNodeYAxion-this.nodeHeight/2) +
                      " " +
                    (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (parentNodeYAxion-this.nodeHeight/2-10) +
                      " " +
                     (nextNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (nextNodeYAxion-this.nodeHeight/2-10) +
                     " " +
                   (nextNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (nextNodeYAxion-this.nodeHeight/2-3);
            } else{
              return (parentNodeXAxion<nextNodeXAxion?(parentNodeXAxion+this.nodeWidth):(parentNodeXAxion)) +
                      "," +
                      parentNodeYAxion +
                      " " +
                      (parentNodeXAxion<nextNodeXAxion?((nextNodeXAxion-3)):(nextNodeXAxion+this.nodeWidth+3)) 
                       +
                      "," +
                      nextNodeYAxion;
            } 
        }],
        [2,(parentNode,nextNode)=>{
          let parentNodeXAxion = +parentNode[0],
              parentNodeYAxion = +parentNode[1],
              nextNodeXAxion = +nextNode[0],
              nextNodeYAxion = +nextNode[1];
            if(Math.abs(parentNodeYAxion-nextNodeYAxion)>=this.defaultHeight*2){
                  return parentNodeXAxion +
                    "," +
                    parentNodeYAxion +
                    " " +
                    (parentNodeXAxion-10) +
                    "," +
                    parentNodeYAxion +
                    " " +
                    (nextNodeXAxion-10) +
                    "," +
                    nextNodeYAxion +
                    " " +
                    (parentNodeXAxion-3) +
                    "," +
                    nextNodeYAxion;
              }else{
                return (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (nextNodeYAxion<parentNodeYAxion?(parentNodeYAxion-this.nodeHeight/2):(parentNodeYAxion+this.nodeHeight/2)) +
                    " " +
                    (nextNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (nextNodeYAxion<parentNodeYAxion?(nextNodeYAxion+this.nodeHeight/2+3):(nextNodeYAxion-this.nodeHeight/2-3));
              }
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
                    (parentNodeYAxion-this.nodeHeight/2-20) +
                    " " +
                    (nextNodeXAxion-10) +
                    "," +
                    (parentNodeYAxion-this.nodeHeight/2-20) +
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
                    (parentNodeYAxion+this.nodeHeight/2+20)+
                     " " +
                    (nextNodeXAxion-20) +
                    "," +
                    (parentNodeYAxion+this.nodeHeight/2+20)+
                     " " +
                    (nextNodeXAxion-20) +
                    "," +
                    nextNodeYAxion+
                     " " +
                    (nextNodeXAxion-3) +
                    "," +
                    nextNodeYAxion;
              }else if(parentNodeXAxion-nextNodeXAxion<0 && parentNodeYAxion-nextNodeYAxion>0){ //右上
                point =  (parentNodeXAxion+this.nodeWidth) +
                    "," +
                    parentNodeYAxion +
                    " " +               
                    (parentNodeXAxion+this.nodeWidth+10) +
                    "," +
                    parentNodeYAxion +
                    " " +
                     (parentNodeXAxion+this.nodeWidth+10) +
                    "," +
                    nextNodeYAxion+
                     " " +
                    (nextNodeXAxion-3) +
                    "," +
                    nextNodeYAxion;
              }else if(parentNodeXAxion-nextNodeXAxion>0 && parentNodeYAxion-nextNodeYAxion<0){ //左下
                point =  (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (parentNodeYAxion+this.nodeHeight/2) +
                    " " +
                     (parentNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (parentNodeYAxion+this.nodeHeight/2+20) +
                    " " +
                     (parentNodeXAxion-20) +
                    "," +
                    (parentNodeYAxion+this.nodeHeight/2+20) +
                    " " +
                   (parentNodeXAxion-20) +
                    "," +
                   (nextNodeYAxion+this.nodeHeight/2+20) +
                    " " +
                    (nextNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (nextNodeYAxion+this.nodeHeight/2+20) +
                     " " +
                   (nextNodeXAxion+this.nodeWidth/2) +
                    "," +
                    (nextNodeYAxion+this.nodeHeight/2+3);
              }
              return point
        }]
      ]);
      node.forEach(parentNode =>{
        if(parentNode.nextNodeList && parentNode.nextNodeList.length>0){   //判断当前节点是否存在下一节点
            parentNode.nextNodeList.forEach(next =>{
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
    },
  },

  watch:{
    moduleId(id) {
      this.getBusinessModuleById(id);
    },
  },

  mounted() {
    this.spinShow = true;
    this.getBusinessModuleById(this.moduleId);
  }
};
</script>
