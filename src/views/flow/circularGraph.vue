<template>
    <div class="graph-box">
        <div id="circularGraph" class="graph"></div>
    </div>
</template>

<script>
import { getPulseGraph } from "@/services/flowService";

const echarts = require("echarts");

export default {
  props:['caseId'],
  data() {
    return {
      nodes: [],
      links: [],
      groupLength: 0,
      dataItem: [],
      title:'',
    };
  },

  methods: {
    drawECharts() {
      //   基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("circularGraph"));
      // 添加点击事件
      myChart.on("click", this.redirectTo);
      // 绘制图表
      for (let n in this.nodes) {
        // delete this.nodes[n].x;
        // delete this.nodes[n].y;
        delete this.nodes[n].symbol;
        // graph.nodes[n].x = Math.ceil(Math.random() * 10);
        // graph.nodes[n].y = Math.ceil(Math.random() * 10);
      }
      let categories = this.dataItem.map((item,index)=>{
        return {
          name:item.name
        }
      });

      this.nodes.forEach(function(node) {
        node.category = node.index;
        node.draggable = true;
        node.symbol = 'image://'+'/resources/images/icon/'+node.icon+'.png';

      });

      // 指定图表的配置项和数据
      let option = {
        tooltip: {},
        clickable: true,
        legend: [
          {
            data: categories.map(function(a) {
              return a.name;
            }),
          }
        ],
        animationDuration: 3000,
        animationDurationUpdate: 3000,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            name: this.title,
            type: "graph",
            width: "400px",
            height: "400px",
            top:'80px',
            layout: "circular",
            circular: {
              rotateLabel: true
            },
            data: this.nodes,
            links: this.links,
            categories: categories,
            draggable: true,
            edgeSymbol: ["none", "arrow"],
            // roam: true,
            // legendHoverLink:true,
            label: {
              normal: {
                position: ["50%", "50%"],
                formatter: "{b}"
              }
            },
            lineStyle: {
              normal: {
                color: "source",
                curveness: 0.1
              }
            },
            force: {
              repulsion: 12
            }
          }
        ]
      };
      myChart.setOption(option);
    },

    redirectTo(param) {
      if (typeof param.seriesIndex == "undefined") {
        return;
      }
      if (param.type == "click") {
        if(param.data.type === 'list'){
            if(param.data.url){
               let url = "appReport/" + param.data.url;
                window.top.postMessage({
                    type: "redirect",
                    url: url
                }, "*");
            }
        }else{
            return;
        }
      }
    }
  },

  created() {
    let that = this;
    getPulseGraph(this.caseId).then(res => {
      let nodes = [];
      this.groupLength = res.dataItem.length;
      this.dataItem = res.dataItem;
      this.title  = res.title;
      if (res) {
        res.dataItem.map(function(item, index) {
          for (let n = 0; n < item.child.length; n++) {
            item.child[n].index = index;
            item.child[n].icon = index+'_'+n;
          }
          nodes = [...nodes, ...item.child];
        });
      }
      console.log(nodes);
      nodes.map(item => {
        this.nodes.push({
          name: item.value,
          id: item.id,
          index: item.index,
          icon:item.icon,
          value: 10,
          url:item.url,
          type:item.type,
          // symbolSize: item.type == "list" ? 30 : 30,
          symbol: "rect",
          label: {
            show: true
          },
          itemStyle:{
              borderColor:'#ddd',
              shadowBlur:10,
              shadowOffsetX:2,
              shadowOffsetY:2
              
          }
        });

        item.endNode.map(target => {
          this.links.push({
            source: item.id,
            target: target.id
          });
        });
      });
      that.drawECharts();
    });
  },

  mounted() {}
};
</script>

<style lang="less" scoped>
.graph-box {
  width: 100%;
  position: relative;
  height: 100%;

  .graph {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    // height: 800px;
  }
}
</style>
