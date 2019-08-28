<template>
  <div class="line-container">
    <header>
      <slot name="header"></slot>
    </header>
    <div class="rfd-line-chart" :id="id"></div>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "LineChart",
  props: {
    id: {
      type: String
    },

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
    },

    //主色调
    primaryColor:{
      type:String,
      default:'#26bba0'
    },

    //曲线面积区域颜色
    areaColor:{
      type:String,
      default:'#38cdb27d'
    }
  },

  data() {
    return {};
  },

  methods: {
    draw(seriesData, xAxisData) {
      let lineChart = echarts.init(document.getElementById(this.id));
      let option = {
        title: {
          text: this.title,
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: "axis"
        },
        color: [this.primaryColor],
        legend: {
          selectedMode: false,
          x: 30,
          y: 8,
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
          right: 10,
          top: 5,
          feature: {
            saveAsImage: {
              title: '存为图片'
            }
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
            smooth: true,
            symbolSize: 6,
            label: {
              normal: {
                show: true,
                position: "top",
                color: this.primaryColor
              }
            },
            itemStyle: {
              normal: {
                color: this.primaryColor,
                borderWidth: 2
              }
            },
            lineStyle: {
              color: this.primaryColor
            },
            areaStyle: {
              normal: {
                color: this.areaColor,
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

