<template>
    <div class="content">
        <div id='finance-echarts' style="height:400px;width:800px"></div>
        <div class='finance-table' style="height:300px;width:641px;">
            <Table :loading="loading" stripe border size="small" ref="table" :columns="columns1" :data="data1" :row-class-name="rowClassName"></Table>
        </div>
    </div>
</template>
<script>
const echarts = require("echarts");
import { Button, Table ,Icon} from 'view-design';
import {getPojectFinancialBias} from "./finance";

export default {
    components:{
        Table,
        Button,
        Icon
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
                    key: 'expenseItem',

                },
                {
                    title: '预算',
                    key: 'budget',
                },
                {
                    title: '实际',
                    key: 'actualCost',
                },
                {
                    title: '差异',
                    key: 'actudifferencealCost',
                },
                {
                    title: '备注',
                    key: 'comment',
                }
            ],
            data1: [
                    {
                        expenseItem: '收入',
                        budget: 2300,
                        actualCost: 2400,
                        actudifferencealCost: 100,
                        comment:'-'
                    },
                    {
                        expenseItem: '成本',
                        budget: 1100,
                        actualCost: 900,
                        actudifferencealCost:-200,
                        comment:'-'
                    },
                    {
                        expenseItem: '毛利',
                        budget: 1200,
                        actualCost: 1500,
                        actudifferencealCost: 300,
                        comment:'-'
                    },
                    {
                        expenseItem: '工资',
                        budget: 100,
                        actualCost: 90,
                        actudifferencealCost: -10,
                        comment:'-'
                    },
                    {
                        expenseItem: '社保',
                        budget: 5,
                        actualCost: 5,
                        actudifferencealCost: 0,
                        comment:'-'
                    },
                    {
                        expenseItem: '公积金',
                        budget: 10,
                        actualCost: 10,
                        actudifferencealCost: 0,
                        comment:'-'
                    },
                    {
                        expenseItem: '停车费',
                        budget: 10,
                        actualCost: 10,
                        actudifferencealCost: 0,
                        comment:'-'
                    },
                    {
                        expenseItem: '差旅费',
                        budget: 20,
                        actualCost: 20,
                        actudifferencealCost: 0,
                        comment:'-'
                    },
                    {
                        expenseItem: '工时费用',
                        budget: 20,
                        actualCost: 20,
                        actudifferencealCost: 0,
                        comment:'-'
                    },
                    {
                        expenseItem: '金融机构手续费',
                        budget: 0,
                        actualCost: 100,
                        actudifferencealCost: 100,
                        comment:'-'
                    },
                    {
                        expenseItem: '利润',
                        budget: 1035,
                        actualCost: 1345,
                        actudifferencealCost: 310,
                        comment:'-'
                    },
            ],
            data:{
                "expenseItem": ['收入', '成本', '毛利', '工资', '社保', '公积金', '停车费', '差旅费', '工时费用', '金融机构手续费', '利润'],
                "budget": [2300,1100,1200,100,5,10,10,20,20,0,1035],
                "actualCost": [2400,900,1500,90,5,10,10,20,20,100,1345],
                "difference": [100,-200,300,-10,0,0,0,0,0,100,310],
                "comment": ['23范德萨1', '-', '梵蒂冈', '工和规范化资', '-', '321', '金刚经', '借古讽今', '换个', '士', '也'],
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
                            position: "right"
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
            if (row.actudifferencealCost<0) {
                return 'demo-table-red';
            }
            return '';
        },
        dealData(data){
            this.data = {};
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
            this.projectId = this.$route.params.projectTransCode;
            return getPojectFinancialBias({projectId:this.projectId}).then(res=>{  
                if(res.length){
                    this.dealData(res);
                    //console.log(res);
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
