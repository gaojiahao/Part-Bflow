<style lang="less" scoped>
  @import "./schedule.less";
</style>
<template>
    <div class="progress-deviation">
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
                    <!-- <template slot-scope="{ row }" slot="analysis">
                        <strong v-if="['进度符合预期','预算符合预期'].includes(row.analysis)">{{ row.analysis }}</strong>
                        <strong style="color:#6beb53;" v-if="['进度超前','低于预算'].includes(row.analysis)">{{ row.analysis }}</strong>
                        <strong style="color:#e4393c;" v-if="['进度延误','超出预算'].includes(row.analysis)">{{ row.analysis }}</strong>
                    </template> -->
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
                <template slot-scope="{ row }" slot="plannedHoursTotal">
                    <span>{{ !!row.plannedHoursTotal?row.plannedHoursTotal.toFixed(2):row.plannedHoursTotal | toThousandFilter }}</span>
                </template>
                <template slot-scope="{ row }" slot="plannedBudgetCostsTotal">
                    <span>{{ !!row.plannedBudgetCostsTotal?row.plannedBudgetCostsTotal.toFixed(2):row.plannedBudgetCostsTotal | toThousandFilter }}</span>
                </template>
                <template slot-scope="{ row }" slot="logDeclarationHoursTotal">
                    <span>{{ !!row.logDeclarationHoursTotal?row.logDeclarationHoursTotal.toFixed(2):row.logDeclarationHoursTotal | toThousandFilter }}</span>
                </template>
                <template slot-scope="{ row }" slot="logDeclarationCostsTotal">
                    <span>{{ !!row.logDeclarationCostsTotal?row.logDeclarationCostsTotal.toFixed(2):row.logDeclarationCostsTotal | toThousandFilter }}</span>
                </template>
                <template slot-scope="{ row }" slot="plannedPrice">
                    <span>{{ !!row.plannedPrice?row.plannedPrice.toFixed(2):row.plannedPrice | toThousandFilter }}</span>
                </template>
                <template slot-scope="{ row }" slot="actualPrice">
                    <span>{{ !!row.actualPrice?row.actualPrice.toFixed(2):row.actualPrice | toThousandFilter }}</span>
                </template>
                <template slot-scope="{ row }" slot="earnedValue">
                    <span>{{ !!row.earnedValue?row.earnedValue.toFixed(2):row.earnedValue | toThousandFilter }}</span>
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
const echarts = require("echarts");
import { toThousandFilter } from "@/utils/utils";
import Bus from "@/assets/eventBus.js";
export default {
    name:'ScheduleLine',
    data(){
        return{
          progressData: [
               {plannedDate: "9/11",plannedHoursTotal: 9,plannedBudgetCostsTotal: 1573,logDeclarationHoursTotal: 57.5,logDeclarationCostsTotal: 7652.5,plannedPrice: 11.276971,actualPrice: 133.09,earnedValue: 648.4258612},
               {plannedDate: "9/12",plannedHoursTotal: 41,plannedBudgetCostsTotal: 5719,logDeclarationHoursTotal: 57.5,logDeclarationCostsTotal: 7652.5,plannedPrice: 139.4878,actualPrice: 133.09,earnedValue: 8020.54878},
               {plannedDate: "9/14",plannedHoursTotal: 42,plannedBudgetCostsTotal: 5900,logDeclarationHoursTotal: 70.5,logDeclarationCostsTotal: 9277.5,plannedPrice: 140.47619,actualPrice: 131.60,earnedValue: 9903.571429},
               {plannedDate: "9/15",plannedHoursTotal: 46,plannedBudgetCostsTotal: 6312,logDeclarationHoursTotal: 77.5,logDeclarationCostsTotal: 10152.5,plannedPrice: 137.21739,actualPrice: 131.00,earnedValue: 10634.34783},
               {plannedDate: "9/16",plannedHoursTotal: 59,plannedBudgetCostsTotal: 7937,logDeclarationHoursTotal: 87.5,logDeclarationCostsTotal: 11402.5,plannedPrice: 134.52542,actualPrice: 130.31,earnedValue: 11770.97458},
               {plannedDate: "9/17",plannedHoursTotal: 64,plannedBudgetCostsTotal: 8562,logDeclarationHoursTotal: 99.5,logDeclarationCostsTotal: 12858.5,plannedPrice: 133.78125,actualPrice: 129.23,earnedValue: 13311.23438},
               {plannedDate: "9/18",plannedHoursTotal: 79,plannedBudgetCostsTotal: 10437,logDeclarationHoursTotal: 111.5,logDeclarationCostsTotal: 14358.5,plannedPrice: 132.11392,actualPrice: 128.78,earnedValue: 14730.70253},
               {plannedDate: "9/19",_highlight:true,plannedHoursTotal: 107,plannedBudgetCostsTotal: 13761,logDeclarationHoursTotal: 111.5,logDeclarationCostsTotal: 14358.5,plannedPrice: 128.60748,actualPrice: 128.78,earnedValue: 14339.73364},
               {plannedDate: "9/23",plannedHoursTotal: 121,plannedBudgetCostsTotal: 15423,logDeclarationHoursTotal: null,logDeclarationCostsTotal: null,plannedPrice: null,actualPrice: null,earnedValue: null},
               {plannedDate: "9/24",plannedHoursTotal: 137,plannedBudgetCostsTotal: 17247,logDeclarationHoursTotal: null,logDeclarationCostsTotal: null,plannedPrice: null,actualPrice: null,earnedValue: null},
               {plannedDate: "9/25",plannedHoursTotal: 146,plannedBudgetCostsTotal: 18428,logDeclarationHoursTotal: null,logDeclarationCostsTotal: null,plannedPrice: null,actualPrice: null,earnedValue: null},
               {plannedDate: "9/26",plannedHoursTotal: 168,plannedBudgetCostsTotal: 21594,logDeclarationHoursTotal: null,logDeclarationCostsTotal: null,plannedPrice: null,actualPrice: null,earnedValue: null},
               {plannedDate: "9/28",plannedHoursTotal: 180,plannedBudgetCostsTotal: 23094,logDeclarationHoursTotal: null,logDeclarationCostsTotal: null,plannedPrice: null,actualPrice: null,earnedValue: null},
               {plannedDate: "9/29",plannedHoursTotal: 188,plannedBudgetCostsTotal: 24094,logDeclarationHoursTotal: null,logDeclarationCostsTotal: null,plannedPrice: null,actualPrice: null,earnedValue: null},
               {plannedDate: "9/30",plannedHoursTotal: 204,plannedBudgetCostsTotal: 26094,logDeclarationHoursTotal: null,logDeclarationCostsTotal: null,plannedPrice: null,actualPrice: null,earnedValue: null},
               {plannedDate: "10/1",plannedHoursTotal: 226,plannedBudgetCostsTotal: 29180,logDeclarationHoursTotal: null,logDeclarationCostsTotal: null,plannedPrice: null,actualPrice: null,earnedValue: null},
          ],
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
                    title: '累计计划预算成本',
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
                        data: ['累计计划预算成本', '累计申报成本', '申报工时计划成本']
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
                            name: '累计计划预算成本',
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
                CVanalysis = CPI === 1 ? "预算符合预期" : (CPI > 1 ? "低于预算" : "超出预算"),
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
              {name: "累计计划预算成本",value: !!row.plannedBudgetCostsTotal?row.plannedBudgetCostsTotal.toFixed(2):row.plannedBudgetCostsTotal,analysis:""},
              {name: "累计申报成本",value: !!row.logDeclarationCostsTotal?row.logDeclarationCostsTotal.toFixed(2):row.logDeclarationCostsTotal,analysis:""},
              {name: "申报工时计划成本",value: !!row.earnedValue?row.earnedValue.toFixed(2):row.earnedValue,analysis:""},
              {name: "进度偏差",value: SV.toFixed(2),analysis:SVanalysis,cellClassName: {analysis: SVclassName}},
              {name: "SPI进度执行指标",value: SPI.toFixed(2),analysis:SVanalysis},
              {name: "CV成本偏差",value: CV.toFixed(2),analysis:CVanalysis,cellClassName: {analysis: CVclassName}},
              {name: "CPI成本执行指标",value: CPI.toFixed(2),analysis:CVanalysis}
            ]
        }
    },
    mounted(){
        this.init();
        for(let i=0;i<this.progressData.length;i++){
            if(!this.progressData[i].logDeclarationHoursTotal){
                this.progressData[i-1]._highlight = true;
                this.onRowClick(this.progressData[i-1]);
                return;
            }
        }
    },
    created(){}
}
</script>