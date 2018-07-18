<template>
  <div class="line-container">
    <header>
      <slot name="header"></slot>
    </header>
    <div class="rfd-line-chart" id="lineChart"></div>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "LineChart",
  props: {
    title: {
      type: String
    },
    legendName: {
      type: String
    },
    //x轴坐标数据
    xAxisData: {
      type: Array
    },
    //展示数据
    seriesData: {
      type: Array
    }
  },

  data() {
    return {};
  },

  methods: {
    draw(seriesData, xAxisData) {
      let lineChart = echarts.init(document.getElementById("lineChart"));
      let option = {
        title: {
          text: this.title
        },
        tooltip: {
          trigger: "axis"
        },
        color:['#26bba0'],
        legend: {
          selectedMode: false,
          data: [
            {
              name: this.legendName
            }
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xAxisData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: this.legendName,
            type: "line",
            stack: "总量",
            smooth: true,
            symbolSize: 6,
            itemStyle:{
              normal:{
                color:'#26bba0',
                borderWidth:2,
              }
            },
            lineStyle:{
              color:'#26bba0'
            },
            areaStyle: {
              normal: {
                color:'#38cdb27d',
                show: true,
                position: "top"
              }
            },
            data: seriesData
          }
        ]
      };
      lineChart.setOption(option);
    }
  },

  watch: {
    seriesData(val) {
      this.draw(val, this.xAxisData);
    }
  }
};
</script>

<style lang="less">
.line-container {
  height: 450px;
  width: 100%;
  position: relative;

  .rfd-line-chart {
    height: 90%;
    width: 100%;
  }
}
</style>

