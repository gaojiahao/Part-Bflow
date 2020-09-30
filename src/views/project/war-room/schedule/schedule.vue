<style lang="less" scoped>
  @import "./schedule.less";
</style>
<template>
    <div class="progress-deviation">
        <Spin fix v-if="showSpin">
            <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
            <div>加载中...</div>
        </Spin>
        <div class="progress">
            <div id='line'></div>
            <div class="deviation">
                <Table 
                    ref="deviationTable" 
                    border 
                    size="small"
                    :span-method="handleSpan" 
                    :columns="deviationColumns" 
                    :data="deviationData">
                    <template slot-scope="{ row }" slot="value">
                        <span>{{ row.value | toThousandFilter }}</span>
                    </template>
                </Table>
            </div>
        </div>
        <div class="progress-table">
            <Table 
                highlight-row 
                border 
                height=400
                size="small" 
                ref="progressTable" 
                :columns="progressColumns" 
                :data="progressData"
                @on-row-click="onRowClick">
                <template slot-scope="{ row }" v-for="(tep,tepIdx) of tepKey" :slot="tep">
                    <span :key="tepIdx">{{ !!row[tep]?row[tep].toFixed(2):row[tep] | toThousandFilter }}</span>
                </template>
            </Table>
        </div>
        
    </div>
</template>

<script>
const echarts = require("echarts");
import { toThousandFilter } from "@/utils/utils";
import Bus from "@/assets/eventBus.js";
import { getProjectScheduleVariance } from "@/services/projectService.js";
export default {
    name:'ScheduleLine',
    data(){
        return{
        showSpin:true,
          tepKey: [
              "plannedHoursTotal",
              "plannedBudgetCostsTotal",
              "logDeclarationHoursTotal",
              "logDeclarationCostsTotal",
              "plannedPrice",
              "actualPrice",
              "earnedValue"
          ],
          progressData: [],
          deviationData: [],
          deviationColumns: [
                {
                    title: '项目',
                    key: 'name'
                },
                {
                    title: '值',
                    slot: 'value',
                    align: "right"
                },
                {
                    title: '分析',
                    key: 'analysis'
                }
            ],
            progressColumns: [
                {
                    title: '计划日期',
                    key: 'plannedDate'
                },
                {
                    title: '累计计划工时',
                    slot: 'plannedHoursTotal',
                    align: "right"
                },
                {
                    title: '累计计划成本',
                    slot: 'plannedBudgetCostsTotal',
                    align: "right"
                },
                {
                    title: '累计申报工时',
                    slot: 'logDeclarationHoursTotal',
                    align: "right"
                },
                {
                    title: '累计申报成本',
                    slot: 'logDeclarationCostsTotal',
                    align: "right"
                },
                {
                    title: '计划单价',
                    slot: 'plannedPrice',
                    align: "right"
                },
                {
                    title: '实际单价',
                    slot: 'actualPrice',
                    align: "right"
                },
                {
                    title: '申报工时计划成本',
                    slot: 'earnedValue',
                    align: "right"
                }
            ]
        }
    },
    methods:{
        init(){
            let lineChart = echarts.init(document.getElementById('line'));
            let xdata = [],
                plannedBudgetCostsTotalData = [],
                logDeclarationCostsTotalData = [],
                earnedValueData = [];
            this.progressData.forEach(item => {
                xdata.push(item.plannedDate);
                plannedBudgetCostsTotalData.push(item.plannedBudgetCostsTotal);
                logDeclarationCostsTotalData.push(item.logDeclarationCostsTotal);
                earnedValueData.push(item.earnedValue);
            })
            let option = 
                {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    legend: {
                        bottom: 10,
                        left: 'center',
                        data: ['累计计划成本', '累计申报成本', '申报工时计划成本']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xdata,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '累计计划成本',
                            type: 'line',
                            data: plannedBudgetCostsTotalData,
                            itemStyle: {
                                color: "#be2b2d"
                            }
                        },
                        {
                            name: '累计申报成本',
                            type: 'line',
                            data: logDeclarationCostsTotalData,
                            itemStyle: {
                                color: "#e5a544"
                            }
                        },
                        {
                            name: '申报工时计划成本',
                            type: 'line',
                            data: earnedValueData,
                            itemStyle: {
                                color: "#23d2c2"
                            }
                        }
                    ]
                };
            lineChart.setOption(option);
        },
        handleSpan ({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 4 && columnIndex === 2) {
                return {
                    rowspan: 2,
                    colspan: 2
                };
            } else if (rowIndex === 5 && columnIndex === 2) {
                return {
                    rowspan: 0,
                    colspan: 0
                };
            }
            if (rowIndex === 6 && columnIndex === 2) {
                return {
                    rowspan: 2,
                    colspan: 2
                };
            } else if (rowIndex === 7 && columnIndex === 2) {
                return {
                    rowspan: 0,
                    colspan: 0
                };
            }
        },
        onRowClick(row,index){
            let SV = (!row.earnedValue?0:row.earnedValue) - (!row.plannedBudgetCostsTotal?0:row.plannedBudgetCostsTotal),
                SPI = (!row.earnedValue?0:row.earnedValue) / (!row.plannedBudgetCostsTotal?0:row.plannedBudgetCostsTotal),
                CV = (!row.earnedValue?0:row.earnedValue) - (!row.logDeclarationCostsTotal?0:row.logDeclarationCostsTotal),
                CPI = !row.logDeclarationCostsTotal ? 0 : (!row.earnedValue?0:row.earnedValue) / (!row.logDeclarationCostsTotal?0:row.logDeclarationCostsTotal),
                SVanalysis = SV === 0 ? "进度符合预期" : (SV > 0 ? "进度超前" : "进度延误"),
                CVanalysis = CV === 0 ? "预算符合预期" : (CV > 0 ? "低于预算" : "超出预算"),
                SVclassName,CVclassName,showDeviation;

            if(SV > 0) {
                SVclassName = "demo-table-info-cell-success";
            }else if(SV < 0){
                SVclassName = "demo-table-info-cell-error";
            }
            if(CPI > 1) {
                CVclassName = "demo-table-info-cell-success";
            }else if(CPI < 1){
                CVclassName = "demo-table-info-cell-error";
            }

            showDeviation = (SV < 0 || CPI < 1) ? true : false;
            Bus.$emit('showDeviation',showDeviation);
            
            this.deviationData = [
              {name: "日期",value: row.plannedDate,analysis:""},
              {name: "累计计划成本",value: !!row.plannedBudgetCostsTotal?row.plannedBudgetCostsTotal.toFixed(2):row.plannedBudgetCostsTotal,analysis:""},
              {name: "累计申报成本",value: !!row.logDeclarationCostsTotal?row.logDeclarationCostsTotal.toFixed(2):row.logDeclarationCostsTotal,analysis:""},
              {name: "申报工时计划成本",value: !!row.earnedValue?row.earnedValue.toFixed(2):row.earnedValue,analysis:""},
              {name: "进度偏差",value: SV.toFixed(2),analysis:SVanalysis,cellClassName: {analysis: SVclassName}},
              {name: "进度执行指标",value: SPI.toFixed(2),analysis:SVanalysis},
              {name: "成本偏差",value: CV.toFixed(2),analysis:CVanalysis,cellClassName: {analysis: CVclassName}},
              {name: "成本执行指标",value: CPI.toFixed(2),analysis:CVanalysis}
            ]
        },
        getProjectScheduleVariance(){
            getProjectScheduleVariance(this.$route.params.projectTransCode).then(res => {
                this.showSpin = false;
                this.progressData = res;
                this.init();
                this.isFirst = true;
                this.progressData.forEach((item,index) => {
                    if(new Date(item.plannedDate) > new Date()){
                        item.logDeclarationHoursTotal = null;
                        item.logDeclarationCostsTotal = null;
                        item.plannedPrice = null;
                        item.actualPrice = null;
                        item.earnedValue = null;
                        if(this.isFirst){
                            let idx = index === 0 ? 0 : (index - 1);
                            this.progressData[idx]._highlight = true;
                            this.onRowClick(this.progressData[idx]);
                            this.isFirst = false;
                        }
                    }
                })
                if(this.isFirst){
                    this.progressData[this.progressData.length-1]._highlight = true;
                    this.onRowClick(this.progressData[this.progressData.length-1]);
                }
            })
        }
    },
    mounted(){
        
    },
    created(){
        this.getProjectScheduleVariance();
    }
}
</script>