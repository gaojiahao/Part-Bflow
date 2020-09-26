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
                    key: 'actudifferencealCost',
                    align: "right"
                },
                {
                    title: '备注',
                    key: 'comment',
                    align: "right"
                }
            ],
            data1: [
                    {
                        expenseItem: '收入',
                        budget: 150000,
                        actualCost: 155000 ,
                        actudifferencealCost: 5000,
                         cellClassName: {
                            actudifferencealCost: 'warring-cell'
                        },
                        comment:'-'
                    },
                    {
                        expenseItem: '成本',
                        budget: 90000,
                        actualCost: 80900,
                        actudifferencealCost:-9100,
                        comment:'-'
                    },
                    {
                        expenseItem: '毛利',
                        budget: 60000,
                        actualCost: 74100,
                        actudifferencealCost: 14100,
                        comment:'-',
                         cellClassName: {
                            actudifferencealCost: 'warring-cell'
                        },
                    },
                    {
                        expenseItem: '工资',
                        budget: 20000,
                        actualCost: 22000,
                        actudifferencealCost: 2000,
                        cellClassName: {
                            actudifferencealCost: 'warring-cell'
                        },
                        comment:'-'
                    },
                    {
                        expenseItem: '水电费',
                        budget: 500,
                        actualCost: 450,
                        actudifferencealCost: -50,
                        comment:'-'
                    },
                    {
                        expenseItem: '快递费',
                        budget: 200,
                        actualCost: 155,
                        actudifferencealCost: -45,
                        comment:'-'
                    },
                    {
                        expenseItem: '停车费',
                        budget: 100,
                        actualCost: 80,
                        actudifferencealCost: -20,
                        comment:'-'
                    },
                    {
                        expenseItem: '加油费',
                        budget: 400,
                        actualCost: 300,
                        actudifferencealCost: -100,
                        comment:'-'
                    },
                    {
                        expenseItem: '租车费',
                        budget: 1000,
                        actualCost: 1500,
                        actudifferencealCost: 500,
                         cellClassName: {
                            actudifferencealCost: 'warring-cell'
                        },
                        comment:'-'
                    },
                    {
                        expenseItem: '办公用品',
                        budget: 500,
                        actualCost: 100,
                        actudifferencealCost: -400,
                        comment:'-'
                    },
                     {
                        expenseItem: '运输费',
                        budget: 400,
                        actualCost: 300,
                        actudifferencealCost: -100,
                        comment:'-'
                    },
                     {
                        expenseItem: '包装费',
                        budget: 300,
                        actualCost: 300,
                        actudifferencealCost: 0,
                        comment:'-'
                    },
                     {
                        expenseItem: '培训费',
                        budget: 20000,
                        actualCost: 18000,
                        actudifferencealCost: -2000,
                        comment:'-'
                    },
                    {
                        expenseItem: '利润',
                        budget: 16000,
                        actualCost: 20915,
                        actudifferencealCost: 14315,
                         cellClassName: {
                            actudifferencealCost: 'warring-cell'
                        },
                        comment:'-'
                    },
            ],
            data:{
                "expenseItem": ['收入','成本','毛利','工资','水电费','快递费','停车费','加油费','租车费','办公用品','运输费','包装费','培训费','利润'],
                "budget": [150000,90000,60000,20000,500,200,100,400,1000,500,400,300,20000,60000],
                "actualCost": [155000,80900,74100,22000,450,155,80,300,1500,100,300,300,18000,30915],
                "difference": [100,-200,300,-10,0,0,0,0,0,100,310],
                "comment": ['23范德萨1', '-', '梵蒂冈', '工和规范化资', '-', '321', '金刚经', '借古讽今', '换个', '士', '也'],
            }    
        }
    },
    methods:{
        init(){
            this.getPojectFinancialBias();
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
            if (row.actudifferencealCost<0) {
                return 'warring-cell';
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
