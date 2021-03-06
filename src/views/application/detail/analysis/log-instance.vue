
<style lang="less" scoped>
@import "./log-instance.less";
</style>
<template>
    <div  v-if="appType !== 'subject'" >
      <div class="app-resource-group-title">
        <h3>数据增量分析</h3>
      </div>
      <!-- 实例图 -->
      <div>
        <div :class="{'line-chart-screen':isAddress,'line-chart':true}">
          <line-chart 
            legendName="新增实例数" 
            :xAxisData="xAxisData" 
            :seriesData="seriesData"
             id="instanceLineChart" 
             primaryColor="#1890ff" 
             areaColor="#1890ff8c">
            <div slot="header" class="line-chart-header">
              查看范围:
              <DatePicker 
                type="month" 
                placeholder="选择月份" 
                style="width: 90px;margin-left:10px;" 
                v-model="month" 
                format="yyyy-MM" 
                :clearable="false">
              </DatePicker>
              <div class="select-range">
                <span v-bind:class="{'customs-tag-active':active}" class="customs-tag" @click="selectDataRange('week')">周</span>
                <span v-bind:class="{'customs-tag-active':!active}" class="customs-tag" @click="selectDataRange('day')">天</span>
              </div>
            </div>
          </line-chart>
        </div>
        <div v-if="!isAddress" class="line-chart">
          <line-chart-time 
            legendName="实例平均工作流耗用时间周期(小时)" 
            :xAxisData="xAxisTimeData" 
            :seriesData="seriesTimeData" 
            id="spendTimeChart" 
            primaryColor="#f9499e" 
            areaColor="#f9499e8c">
            <div slot="header" class="line-chart-header">
              查看范围:
              <DatePicker type="month" 
                placeholder="选择月份" 
                style="width: 90px;margin-left:10px;" 
                v-model="workFlowMonth" 
                format="yyyy-MM" 
                :clearable="false">
              </DatePicker>
              <div class="select-range">
                <span v-bind:class="{'customs-tag-active':workFlowTimeActive}" class="customs-tag" @click="selectSpendTimeRange('week')">周</span>
                <span v-bind:class="{'customs-tag-active':!workFlowTimeActive}" class="customs-tag" @click="selectSpendTimeRange('day')">天</span>
              </div>
            </div>
          </line-chart-time>
        </div>
      </div>
    </div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart";
import LineChartTime from "@/components/Charts/LineChart";
import {
  getInstanceStatistics,
  getWorkFlowTime
} from "@/services/appService.js";
import { FormatDate } from "@/utils/utils";

export default {
  name: "LogInstance",
  components: {
    LineChart,
    LineChartTime
  },
  props: {
    isAdmin: Boolean,
    isAddress: Boolean,
    appType: String
  },
  data() {
    return {
      listId: this.$route.params.listId,
      month: new Date(),
      xAxisData: [],
      seriesData: [],
      active: true,

      xAxisTimeData: [],
      seriesTimeData: [],
      workFlowTimeActive: true,
      workFlowMonth: new Date()
    };
  },

  watch: {
    //监听实例数据日期变化
    month(val) {
      this.getInstanceStatistics();
    },

    workFlowMonth(val) {
      this.getWorkFlowTime();
    }
  },
  methods: {
    //获取去实例数据
    getInstanceStatistics(t) {
      let that = this,
        listId = that.listId,
        date = that.month,
        type = t ? t : this.active ? "week" : "day";
      date = FormatDate(date, "yyyy/MM/dd");

      getInstanceStatistics(listId, type, date).then(res => {
        if (res.list[0]) {
          let xAxis = [],
            series = [];

          res.list.map(function(item) {
            xAxis.push(item.xAxis);
            series.push(item.num);
          });

          that.seriesData = series;
          that.xAxisData = xAxis;
        }
      });
    },

    getWorkFlowTime(t) {
      let that = this,
        listId = that.listId,
        date = that.workFlowMonth,
        type = t ? t : this.workFlowTimeActive ? "week" : "day";
      date = FormatDate(date, "yyyy/MM/dd");

      getWorkFlowTime(listId, type, date).then(res => {
        if (res.list[0]) {
          let xAxis = [],
            series = [];

          res.list.map(function(item) {
            xAxis.push(item.xAxis);
            if (!item.num) {
              series.push(0.0);
            } else {
              series.push(item.num);
            }
          });

          that.seriesTimeData = series;
          that.xAxisTimeData = xAxis;
        }
      });
    },

    selectDataRange(val) {
      if (val === "week") {
        this.active = true;
      } else {
        this.active = false;
      }
      this.getInstanceStatistics(val);
    },

    selectSpendTimeRange(val) {
      if (val === "week") {
        this.workFlowTimeActive = true;
      } else {
        this.workFlowTimeActive = false;
      }
      this.getWorkFlowTime(val);
    }
  },

  mounted() {
    this.getInstanceStatistics();
    this.getWorkFlowTime();
  }
};
</script>

