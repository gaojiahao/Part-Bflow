<style lang="less" scoped>
    @import "./reports.less";
</style>
<template>
    <div class="reports">
        <div class="reports-header">
            统计报表
        </div>
        <div class="reports-content">
            <task-statistics></task-statistics>
            <task-incremental-analysis></task-incremental-analysis>
          
        </div>
    </div>
</template>
<script>
import {
    getFlowTodoTasks,
    getFlowDoneTasks,
} from "@/services/socialService";
import ProgressRing from "@/components/progress-ring";

import TaskStatistics from "./task-statistics";
import TaskIncrementalAnalysis from "./task-incremental-analysis";
export default {
    name:'Reports',
    components:{
        ProgressRing,
        TaskStatistics,
        TaskIncrementalAnalysis
    },
    data () {
        return {
            active:false,
            month:'',
        }
    },
    methods:{
        handleSelectDataRange:function (dataRange) {
        }

    },
    mounted(){
       this.$nextTick(() => {
            var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
            const option = {
    
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    selectedMode: false,
                    x: 30,
                    y: 8,
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
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'待办任务',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'已办任务',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'所有任务',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                ]
            };

            dataSourcePie.setOption(option);
            window.addEventListener('resize', function () {
                dataSourcePie.resize();
            });
        });
    }
}
</script>
