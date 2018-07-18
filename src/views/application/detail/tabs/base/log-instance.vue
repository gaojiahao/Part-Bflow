<style lang="less" scoped>
.line-chart-header {
  position: absolute;
  top: 0px;
  right: 38px;
  z-index: 1;
}
.customs-tag {
  background-color: #d8d9db;
  padding: 2px 10px;
  color: #403b3b;
  font-size: 13px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  cursor: pointer;
}

.customs-tag-active {
  background-color: #19be6b;
  color: #fff;
}

.select-range {
  border: 1px solid #d8d9db;
  display: inline-block;
  background-color: #19be6b;
}
.app-tabs {
  border-top: 1px solid #ddd;
}
</style>

<template>
    <div>
        <change-log :listId="listId"></change-log>
        <line-chart title="数据分析" legendName="新增实例数" :xAxisData="xAxisData" :seriesData="seriesData">
            <div slot="header" class="line-chart-header">
                查看范围:
                <DatePicker type="month" placeholder="选择月份" style="width: 150px;margin-left:10px;" v-model="month" format="yyyy-MM" :clearable="false"></DatePicker>
                <div class="select-range">
                    <span v-bind:class="{'customs-tag-active':active}" class="customs-tag" @click="selectDataRange('week')">周</span>
                    <span v-bind:class="{'customs-tag-active':!active}" class="customs-tag" @click="selectDataRange('day')">天</span>
                </div>
            </div>
        </line-chart>
    </div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart";
import ChangeLog from "./change-log";
import { getInstanceData } from "@/services/appService.js";
import {getDateFormat} from "@/utils/utils"
export default {
  name:"LogInstance",

  components: {
    LineChart,
    ChangeLog
  },

  data() {
    return {
      listId: this.$route.params.listId,
      month: new Date(),
      xAxisData: [],
      seriesData: [],
      active: true
    };
  },

  watch: {
    //监听实例数据日期变化
    month(val) {
      this.getInstanceData();
    }
  },
  methods: {
    //获取去实例数据
    getInstanceData(t) {
      let that = this;
      let listId = this.listId,
        date = that.month,
        type = t ? t : this.active ? "week" : "day";
      date = getDateFormat(date, "yyyy/MM/dd");
      getInstanceData(listId, type, date).then(
        res => {
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
        }
      );
    },

    selectDataRange(val) {
      if (val === "week") {
        this.active = true;
      } else {
        this.active = false;
      }
      this.getInstanceData(val);
    },

    callTimeLineRefesh() {
      this.getChangeLog();
    
    }
  },

  created(){
      this.getInstanceData();
  }
};
</script>

