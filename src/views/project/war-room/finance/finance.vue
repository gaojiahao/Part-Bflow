<template>
    <div class="content">
        <div id='finance-echarts' style="height:400px;width:800px"></div>
        <div class='finance-table' style="height:300px;width:641px;">
            <Table height=400 :loading="loading" stripe border size="small" ref="table" 
            :columns="columns1" :data="data1" :row-class-name="rowClassName" highlight-row
            >
            </Table>
        </div>
    </div>
</template>
<script>
const echarts = require("echarts");
import { Button, Table ,Icon} from 'view-design';
import { getPojectFinancialBias } from "@/services/projectService.js";

export default {
    components:{
        Table,
        Button,
        Icon
    },
    data(){
        return{
            loading: true,
            transCode:'',
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
                    key: 'expenseItem',
                    align: "right"
                },
                {
                    title: '预算',
                    key: 'budget',
                    align: "right"
                },
                {
                    title: '实际',
                    key: 'actualCost',
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
                return 'demo-table-red';
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
<style lang="less">
.content {
    .finance-table {
        margin-top: 1rem;
        margin-left: 5rem;
    }
}
.ivu-table .demo-table-red td:nth-child(4){
    color:brown;
}
</style>>
