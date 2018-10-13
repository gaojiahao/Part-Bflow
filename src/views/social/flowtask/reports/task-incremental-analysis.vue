<style lang="less" scoped>
    @import "./task-incremental-analysis.less";
</style>
<template>
     <div class="incrementalanalysis shadow">
        <div class="incrementalanalysis-header">
            <strong>
                查看范围:
            </strong>
            <DatePicker 
                type="month" 
                placeholder="选择月份" 
                v-model="month" 
                format="yyyy-MM" 
                style="width:100px;"
                :clearable="false">
            </DatePicker>

            <div class="incrementalanalysis-header-daterange">
                <span v-bind:class="{'customs-tag-active':periodicType==='week'}" class="customs-tag" @click="handleChangePeriodicType('week')">周</span>
                <span v-bind:class="{'customs-tag-active':periodicType==='day'}" class="customs-tag" @click="handleChangePeriodicType('day')">天</span>
            </div>
        </div>
        <div style="width:100%;height:100%;" id="data_source_con"></div>
    </div>
</template>
<script>
const echarts = require("echarts");

import {
    getFlowTaskStatistics
} from "@/services/socialService";
import { FormatDate } from "@/utils/utils";
export default {
    name:'TaskIncrementalAnalysis',
    data () {
        return {
            periodicType:'week',
            month: new Date()
        }
    },
    watch: {
        //监听实例数据日期变化
        month(val) {
            this.renderReport();
        },
        //监听实例数据日期变化
        periodicType(val) {
            this.renderReport();
        },
    },
    methods:{
        handleChangePeriodicType:function (periodicType) {
            this.periodicType = periodicType;
        },
        getFlowTaskStatisticsData:function () {
            return getFlowTaskStatistics({
                date:FormatDate(this.month, "yyyy/MM/dd"),
                type:this.periodicType
            }).then(res=>{
                var xAxis = [];
                var series = [];
                var todoData =  {
                            name:'待办任务',
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:[]
                        };
                var doneData = {
                            name:'已办任务',
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:[]
                        };
                var allData = {
                            name:'所有任务',
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:[]
                        };
                res.map(item=>{
                    xAxis.push(item.xAxis);
                    todoData.data.push(item.todo);
                    doneData.data.push(item.done);
                    allData.data.push(item.todo + item.done);
                });

                series = [todoData,doneData,allData];

                return {
                    xAxis:xAxis,
                    series:series
                }
            });
        },
        initOption:function (xAxis,series) {
            return  {
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                 title: {
                    text: '任务增量分析'
                },
                legend: {
                    data:['待办任务','已办任务','所有任务']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : xAxis
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : series
            };

        },
        renderReport:function () {
            this.getFlowTaskStatisticsData().then(res=>{
            var dataSourcePie = echarts.init(document.getElementById('data_source_con'));

            dataSourcePie.setOption(this.initOption(res.xAxis,res.series));
            window.addEventListener('resize', function () {
                dataSourcePie.resize();
            });
        });
        }

    },
    mounted(){
        this.renderReport();
    }
}
</script>

