<template>
    <div class="financeDeviation-container">
        <Row type="flex" justify="space-around" class="code-row-bg">
            <Col span="14" class="financeDeviation-container-chart">
                <div id='finance-echarts' style="height:660px;width:100%"></div>
            </Col>
            <Col span="9">
                <Table   
                    height=660 
                    :loading="loading"  
                    border 
                    size="small" 
                    ref="table" 
                    :columns="columns1" 
                    :data="data1"  
                    highlight-row
                >
                <template slot-scope="{ row }" slot="budget" >
                    <span>{{ row.budget | toThousandFilter }}</span>
                </template>
                <template slot-scope="{ row }" slot="actualCost" >
                    <span>{{ row.actualCost | toThousandFilter }}</span>
                </template>
                
                </Table>
            </Col>
        </Row>
    </div>
</template>
<script>
const echarts = require("echarts");
import { getPojectFinancialBias } from "@/services/projectService.js";
import { toThousandFilter } from "@/utils/utils";

export default {
    name:'FinanceDeviation',
    components:{
    },
    data(){
        return{
            loading: true,
            projectId:'',
            dataTitle:{
                expenseItem:'收支项',
                budget:'预算',
                actualCost:'实际',
                difference:'差异',
                comment:'备注'
            },
            columns1: [
                {
                    title: '收支项',
                    key: 'expenseItem'
                },
                {
                    title: '预算',
                    slot: 'budget',
                    align: "right",
                },
                {
                    title: '实际',
                    slot: 'actualCost',
                    align: "right"
                },
                {
                    title: '差异',
                    key: 'difference',
                    align: "right"
                },
                {
                    title: '备注',
                    key: 'comment',
                    align: "right"
                }
            ],
            data1: [],
            data:{
                "expenseItem": [],
                "budget": [],
                "actualCost": [],
                "difference": [],
                "comment": [],
            }    
        }
    },
    methods:{
        async init(){
            await this.getPojectFinancialBias();
            let lineChart = echarts.init(document.getElementById('finance-echarts'));
            let option = 
                {
                    color: ["#5b9bd5", "#ed7d31"],
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
                        show: true,
                        bottom: "0%"
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.data.expenseItem,
                            axisPointer: {
                                type: 'shadow'
                            },
                             axisLabel: {
                                rotate: 40
                            }
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '',
                            axisLabel: {
                                formatter: '{value}'
                            },
                            position: "left"
                        },
                        {
                            type: 'value',
                            name: '',
                        },
                    ],
                    series: [
                        {
                            name: '预算',
                            type: 'bar',
                            data: this.data.budget,
                        },
                        {
                            name: '实际',
                            type: 'bar',
                            data: this.data.actualCost,
                        }
                    ]
                };
            lineChart.setOption(option);
        },
         rowClassName (row, index) {
            if (row.difference<0) {
                return 'warring-cell';
            }
            return '';
        },
        dealData(data){
            this.data1 = data;
            for(var i=0;i<data.length;i++){
                this.data['expenseItem'].push(data[i]['expenseItem']);
                this.data['budget'].push(data[i]['budget']);
                this.data['actualCost'].push(data[i]['actualCost']);
                this.data['difference'].push(data[i]['difference']);
                this.data['comment'].push(data[i]['comment']);
            }
        },
        getPojectFinancialBias(){
            this.transCode = this.$route.params.projectTransCode;
            return getPojectFinancialBias({transCode:this.transCode}).then(res=>{  
                if(res.length){
                    this.dealData(res);
                }
            });
        }

    },
    mounted(){
        this.init();
        this.loading=false;
    },
    created(){

    }
}
</script>
<style lang="less" scoped>
.financeDeviation-container {
    width: 100%;
    padding: 10px;

    &-chart{
        border: 1px solid #dedede;
    }

    /deep/.ivu-table .warring-cell {
        background-color: #ff6600;
        color: #fff;
    }
     /deep/.ivu-table .expenseItemColumns {
        font-weight: bold;
    }

    
}

</style>>
