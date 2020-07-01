<style lang="less" scoped>
.financial-analysis{
    font-size: 14px;
    &-title{
        padding: 5px 10px;
        font-size: 16px;
        border-bottom: 1px dotted #ddd;
    }

    &-projectAssets{
        margin-bottom: 10px;
    }

    &-profit{
        margin-bottom: 10px;
        border-top: 1px solid #ddd;
        
    }

    &-charts{
        border-bottom: 1px dotted #ddd;

    }

    ul{
        padding: 5px 25px;
        li{
            list-style: none;
            display: flex;
        }
    }

    
    .textIndent{
        text-indent:14px
    }
    .item-title{
        font-weight: bold;
    }
    .item-amount{
        color: #333;
        cursor: default;
    }
}
</style>
<template>
    <div class="financial-analysis">
        <div class="financial-analysis-projectAssets">
            <p class="financial-analysis-title">
                资产负债表
                <Icon 
                    type="md-refresh" 
                    @click="refreshZCFZ"
                    :style="{cursor:'pointer'}" 
                    class="fr" />
            </p>
            <!-- <div class="financial-analysis-charts" >
                <div id='projectAssets' style="height:360px;width:560px;display: inline-block;"></div>
            </div> -->
            <ul >
                <li  v-for="(item,index) in balance" :key="index">
                    <div style="flex: 1;" :class="{'textIndent':!item.title,'item-title':item.title}">{{item.item}}</div>
                    <div style="flex: 1 1 0%;text-align: right;">
                        <a @click="goDebtWater(item)" :class="{'item-amount':item.title && !item.isDeep}">{{item.amount}}</a>
                    </div>
                </li>
            </ul>
        </div >

         <div class="financial-analysis-profit">
            <p class="financial-analysis-title">
                利润表
                <Icon 
                type="md-refresh" 
                @click="refreshLR"
                :style="{cursor:'pointer'}"
                class="fr" />
            </p>
           
            <!-- <div class="financial-analysis-charts">
                <div id='profit' style="height:360px;width:560px;"></div>
            </div> -->
            <ul >
                <li  v-for="(item,index) in profit" :key="index">
                    <div style="flex: 1;" :class="{'textIndent':!item.title,'item-title':item.title}">{{item.item}}</div>
                    <div style="flex: 1 1 0%;text-align: right;">
                        <a @click="goProfitWater(item)" :class="{'item-amount':item.title}">{{item.amount}}</a>
                    </div>
                </li>
            </ul>
        </div >
        <project-water-modal ref="projectWaterModal" :itemData="itemData" :waterType="waterType"></project-water-modal>
        <project-obj-water-modal ref="projectObjWaterModal" :itemData="itemData"></project-obj-water-modal>
    </div>
</template>

<script>
import { 
    getProjectDistributiveProfit, 
    getInsideProjectProfitStatement, 
    getOutsideProjectProfitStatement } from "@/services/projectService.js";
import { toThousandFilter } from "@/utils/utils";
import ProjectWaterModal from "./projectWaterModal";
import ProjectObjWaterModal from "./projectObjWaterModal";
const echarts = require("echarts");
export default {
    name:'financialAnalysis',
    components: {
        ProjectWaterModal,
        ProjectObjWaterModal
    },
    data(){
        return{
            profit: [],
            balance: [],
            itemData: {},
            waterType: "L"
        }
    },
    props: {
        transType: {
            type: String,
            default: ""
        }
    },
    watch: {
        transType: function(value){
            if(value){
                this.getProjectProfitStatementData();
            }
        }
    },
    methods:{
        refreshZCFZ(){
            this.getProjectDistributiveProfitData();
        },
        refreshLR(){
            this.getProjectProfitStatementData();
        },
        goDebtWater(item){
            if((item.title && !item.isDeep)) return;
            this.waterType = 'Z';
            this.itemData = item;
            if(item.isDeep){
                this.$refs['projectWaterModal'].showProjectWater = true;
            }else{
                this.$refs['projectObjWaterModal'].showObjWater = true;
            }
        },
        goProfitWater(item){
            if(item.title) return;
            this.waterType = 'L';
            this.itemData =  item;
            this.$refs['projectWaterModal'].showProjectWater = true;
        },
        colorMappingChange(){
            var levelOption = getLevelOption(value);
            chart.setOption({
                series: [{
                    levels: levelOption
                }]
            });
        },
        getLevelOption(){
            return [
                {
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 0,
                        gapWidth: 5
                    },
                    upperLabel: {
                        show: false
                    }
                },
                {
                    itemStyle: {
                        borderColor: '#999',
                        borderWidth: 5,
                        gapWidth: 5
                    },
                    color: ['#f2b373'],
                    emphasis: {
                        itemStyle: {
                            borderColor: '#ddd'
                        }
                    }
                },
                {
                    itemStyle: {
                        borderWidth: 1,
                        gapWidth: 5
                    }
                }
            ];
        },
        initProfit(){
            let profitChart = echarts.init(document.getElementById('profit'));

            let formatUtil = echarts.format;
            let option;

            profitChart.setOption(option = {
                tooltip: {
                    formatter: function (info) {
                        var value = info.value[1];
                        var treePathInfo = info.treePathInfo;
                        var treePath = [];

                        for (var i = 1; i < treePathInfo.length; i++) {
                            treePath.push(treePathInfo[i].name);
                        }

                        return [
                            '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
                            '金额: ' + formatUtil.addCommas(value) + '',
                        ].join('');
                    }
                },
                series: [
                    {
                        name: '利润表',
                        type: 'treemap',
                        label: {
                            show: true,
                            formatter: '{b}'
                        },
                        upperLabel: {
                            show: true,
                            height: 30
                        },
                        itemStyle: {
                            borderColor: '#fff'
                        },
                        levels: this.getLevelOption(),
                        data: this.profitData
                    }
                ]
            });
            
        },
        initDept(){
            let  projectAssetsChart = echarts.init(document.getElementById('projectAssets'));
            let formatUtil = echarts.format;
            let option;
            projectAssetsChart.setOption(option = {
                tooltip: {
                    formatter: function (info) {
                        var value = info.value[1];
                        var treePathInfo = info.treePathInfo;
                        var treePath = [];

                        for (var i = 1; i < treePathInfo.length; i++) {
                            treePath.push(treePathInfo[i].name);
                        }

                        return [
                            '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
                            '金额: ' + formatUtil.addCommas(value) + '',
                        ].join('');
                    }
                },

                series: [
                    {
                        name: '项目资产负债表',
                        type: 'treemap',
                        label: {
                            show: true,
                            formatter: '{b}'
                        },
                        upperLabel: {
                            show: true,
                            height: 30
                        },
                        itemStyle: {
                            borderColor: '#fff'
                        },
                        levels: this.getLevelOption(),
                        data: this.projectAssets
                    }
                ]
            });
        },
        getProjectDistributiveProfitData(){
            getProjectDistributiveProfit(this.$route.params.transCode).then(res => {
                this.balance = [
                    {item:'利润',amount:toThousandFilter(res.tableContent[0].profit),title:true,isDeep: true},
                    {item:'已分配利润',amount:toThousandFilter(res.tableContent[0].distributedProfit),title:true,isDeep: true},
                    {item:'资产',amount:toThousandFilter(res.tableContent[0].assetsSum),title:true},
                    {item:'存货',amount:toThousandFilter(res.tableContent[0].inventory)},
                    {item:'发出商品',amount:toThousandFilter(res.tableContent[0].salesInventory)},
                    {item:'应收账款',amount:toThousandFilter(res.tableContent[0].accountsReceivable)},
                    {item:'负债',amount:toThousandFilter(res.tableContent[0].debtSum),title:true},
                    {item:'估价入库',amount:toThousandFilter(res.tableContent[0].valuationAndStorage)},
                    {item:'应付账款',amount:toThousandFilter(res.tableContent[0].accountsPayable)},
                    {item:'可分配利润',amount:toThousandFilter(res.tableContent[0].distributiveProfit),title:true}
                ];
                // this.chartsDistributiveData(res.tableContent[0]);
                // this.initDept();
            }).catch(err => {
                this.$Message.error(err.data.message);
            })
        },
        getProjectProfitStatementData(){
            let request = getOutsideProjectProfitStatement;
            if(this.transType === 'YW159') request = getInsideProjectProfitStatement;
            request(this.$route.params.transCode).then(res => {
                // this.initProfit();
                this.transType === 'YW159' ? this.createInsideData(res.obj) : this.createOutsideData(res.obj);
            })
        },
        createInsideData(obj){
            this.profit = [
                {item:'收入',amount:toThousandFilter(obj.income.incomeSum),title:true},
                {item:'预算收入',amount:toThousandFilter(obj.income.budgetReceipts || '-')},
                {item:'成本',amount:toThousandFilter(obj.productsCost.productsCostSum),title:true},
                {item:'内部服务采购',amount:toThousandFilter(obj.productsCost.insideServerPurchase)},
                {item:'外部服务采购',amount:toThousandFilter(obj.productsCost.outsideServerPurchase)},
                {item:'其他成本',amount:toThousandFilter(obj.productsCost.otherCost || '-')},
                {item:'费用',amount:toThousandFilter(obj.cost.costSum),title:true}
            ];
            this.setCostListData(obj);
            this.profit.push({
                item: '盈余',
                amount: toThousandFilter(obj.profit),
                title:true
            });
            this.profit.push({
                item: '盈余率',
                amount: obj.profitRate,
                title:true
            });
            // this.insideChartsProfitData(obj);
        },
        createOutsideData(obj){
            this.profit = [
                {item:'收入',amount:toThousandFilter(obj.income.incomeSum),title:true},
                {item:'销售收入',amount:toThousandFilter(obj.income.saleIncome)},
                {item:'成本',amount:toThousandFilter(obj.productsCost.productsCostSum),title:true},
                {item:'标准用料',amount:toThousandFilter(obj.productsCost.material)},
                {item:'直接人工',amount:toThousandFilter(obj.productsCost.artificial)},
                {item:'制造费用',amount:toThousandFilter(obj.productsCost.madeCost)},
                {item:'外部服务采购',amount:toThousandFilter(obj.productsCost.outsideServerPurchase)},
                {item:'内部服务采购',amount:toThousandFilter(obj.productsCost.insideServerPurchase)},
                {item:'费用',amount:toThousandFilter(obj.cost.costSum),title:true}
            ];
            this.setCostListData(obj);
            this.profit.push({
                item: '利润额',
                amount: toThousandFilter(obj.profit),
                title:true
            });
            this.profit.push({
                item: '利润率',
                amount: obj.profitRate,
                title:true
            });
            // this.outsideChartsProfitData(obj);
        },
        setCostListData(obj){
            obj.cost.costList.forEach(it => {
                this.profit.push({
                    item: it.costName,
                    projectCode: it.costCode,
                    amount: toThousandFilter(it.amount)
                });
            });
        },
        createCostChildrenData(obj){
            let costChildArray = [];
            obj.cost.costList.forEach(it => {
                costChildArray.push(it.amount || 0);
            });
            let newCostChildArray = this.getAmountMapping(costChildArray);
            
            let costChildren = [];
            obj.cost.costList.forEach((it,index) => {
                costChildren.push({
                    name: it.costName,
                    path: it.costName,
                    projectCode: it.costCode,
                    value: [newCostChildArray[index],it.amount],
                    color: ['#2898b0']
                });
            });
            return costChildren;
        },
        outsideChartsProfitData(obj){
            let newIncomeSumArray = this.getAmountMapping([
                obj.income.incomeSum,
                obj.income.saleIncome,
                obj.productsCost.productsCostSum,
                obj.cost.costSum,
                obj.profit
            ]);
            let newIncomeChildrenArray = this.getAmountMapping([obj.income.saleIncome]);
            let newProductsCostSumChildArray = this.getAmountMapping([
                obj.productsCost.material,
                obj.productsCost.artificial,
                obj.productsCost.madeCost,
                obj.productsCost.insideServerPurchase,
                obj.productsCost.outsideServerPurchase
            ]);

            this.profitData = [
                {
                    name: "收入",
                    path: "收入",
                    value: [newIncomeSumArray[0],obj.income.incomeSum],
                    children:[
                        {
                            name: "销售收入",
                            path: "销售收入",
                            value: [newIncomeChildrenArray[0],obj.income.saleIncome]
                        }
                    ]
                },
                {
                    name: "成本",
                    path: "成本",
                    value: [newIncomeSumArray[1],obj.productsCost.productsCostSum],
                    children:[
                        {
                            name: "标准用料",
                            path: "标准用料",
                            value: [productsCostSumChildArray[0],obj.productsCost.material]
                        },
                        {
                            name: "直接人工",
                            path: "直接人工",
                            value: [productsCostSumChildArray[1],obj.productsCost.artificial]
                        },
                        {
                            name: "制造费用",
                            path: "制造费用",
                            value: [productsCostSumChildArray[2],obj.productsCost.madeCost]
                        },
                        {
                            name: "内部服务采购",
                            path: "内部服务采购",
                            value: [productsCostSumChildArray[3],obj.productsCost.insideServerPurchase]
                        },
                        {
                            name: "外部服务采购",
                            path: "外部服务采购",
                            value: [productsCostSumChildArray[4],obj.productsCost.outsideServerPurchase]
                        }
                    ]
                },
                {
                    name: "费用",
                    path: "费用",
                    value: [newIncomeSumArray[2],obj.cost.costSum],
                    children:this.createCostChildrenData(obj)
                },{
                    name: "利润额",
                    path: "利润额",
                    value: [newIncomeSumArray[3],obj.profit],
                }
            ]
        },
        insideChartsProfitData(obj){
            let newIncomeSumArray = this.getAmountMapping([
                obj.income.incomeSum,
                obj.productsCost.productsCostSum,
                obj.profit,obj.cost.costSum
            ]);
            let newIncomeChildrenArray = this.getAmountMapping([obj.income.budgetReceipts || 0,]);
            let newProductsCostSumChildArray = this.getAmountMapping(
                [obj.productsCost.insideServerPurchase,obj.productsCost.outsideServerPurchase,obj.productsCost.otherCost || 0]
            );

            this.profitData = [
                {
                    name: "收入",
                    path: "收入",
                    value: [newIncomeSumArray[0],obj.income.incomeSum],
                    color: ['#46ad51'],
                    children:[
                        {
                            name: "预算收入",
                            path: "预算收入",
                            value: [newIncomeChildrenArray[0],obj.income.budgetReceipts || 0],
                            color: ['#2898b0']
                        }
                    ]
                },
                {
                    name: "成本",
                    path: "成本",
                    value: [newIncomeSumArray[1],obj.productsCost.productsCostSum],
                    color: ['#46ad51'],
                    children:[
                        {
                            name: "内部服务采购",
                            path: "内部服务采购",
                            value: [newProductsCostSumChildArray[0],obj.productsCost.insideServerPurchase],
                            color: ['#2898b0']
                        },
                        {
                            name: "外部服务采购",
                            path: "外部服务采购",
                            value: [newProductsCostSumChildArray[1],obj.productsCost.outsideServerPurchase],
                            color: ['#2898b0']
                        },
                        {
                            name: "其他成本",
                            path: "其他成本",
                            value: [newProductsCostSumChildArray[2],obj.productsCost.otherCost || 0],
                            color: ['#2898b0']
                        },
                    ]
                },{
                    name: "盈余",
                    path: "盈余",
                    value: [newIncomeSumArray[2],obj.profit],
                    color: ['#46ad51']
                },
                {
                    name: "费用",
                    path: "费用",
                    value: [newIncomeSumArray[3],obj.cost.costSum],
                    color: ['#46ad51'],
                    children:this.createCostChildrenData(obj)
                }
            ]
        },
        chartsDistributiveData(obj){
            let newAssetsSumArray = this.getAmountMapping([obj.assetsSum,obj.debtSum,obj.profit]);
            let newAssetsSumChildArray = this.getAmountMapping([obj.inventory,obj.salesInventory,obj.accountsReceivable]);
            let newDebtSumChildArray = this.getAmountMapping([obj.valuationAndStorage,obj.accountsPayable]);
            let newProfitChildArray = this.getAmountMapping([obj.distributedProfit,obj.distributiveProfit]);

            this.projectAssets = [
                {
                    name: "资产",
                    path: "资产",
                    value: [newAssetsSumArray[0],obj.assetsSum],
                    color: ['#46ad51'],
                    children:[
                        {
                            name: "存货",
                            path: "存货",
                            value: [newAssetsSumChildArray[0],obj.inventory],
                            color: ['#2898b0']
                        },
                        {
                            name: "发出商品",
                            path: "发出商品",
                            value: [newAssetsSumChildArray[1],obj.salesInventory],
                            color: ['#2898b0']
                        },{
                            name: "应收账款",
                            path: "应收账款",
                            value: [newAssetsSumChildArray[2],obj.accountsReceivable],
                            color: ['#2898b0']
                        }
                    ]
                },
                {
                    name: "负债",
                    path: "负债",
                    value: [newAssetsSumArray[1],obj.debtSum],
                    color: ['#46ad51'],
                    children:[
                        {
                            name: "估价入库",
                            path: "估价入库",
                            value: [newDebtSumChildArray[0],obj.valuationAndStorage],
                            color: ['#2898b0']
                        },
                        {
                            name: "应付账款",
                            path: "应付账款",
                            value: [newDebtSumChildArray[1],obj.accountsPayable],
                            color: ['#2898b0']
                        }
                    ]
                },
                {
                    name: "利润",
                    path: "利润",
                    value: [newAssetsSumArray[2],obj.profit],
                    color: ['#46ad51'],
                    children:[
                        {
                            name: "已分配利润",
                            path: "已分配利润",
                            value: [newProfitChildArray[0],obj.distributedProfit],
                            color: ['#2898b0']
                        },
                        {
                            name: "可分配利润",
                            path: "可分配利润",
                            value: [newProfitChildArray[1],obj.distributiveProfit],
                            color: ['#2898b0']
                        }
                    ]
                }
            ];
        },
        getAmountMapping(amountArray){
            let oldAmountArray = [];
            const rangeMin = 30;
            const rangeMax = 300;
            Object.assign(oldAmountArray,amountArray);
            amountArray.sort(sortNumber);
            
            function sortNumber(a,b){ return a - b };
            if(amountArray[0] === amountArray[amountArray.length - 1] && !amountArray[0]) return amountArray;
            const sumValue = Math.abs(this.sumArray(amountArray));
            let newAmountArray = [];
            if(oldAmountArray.length === 1){
                newAmountArray.push(rangeMax + rangeMin);
                return newAmountArray;
            }
            oldAmountArray.forEach(v => {
                if(!v){
                    newAmountArray.push(0);
                } else {
                    newAmountArray.push(((v - amountArray[0]) / sumValue) * (rangeMax - rangeMin) + rangeMin);
                }
            })
            return newAmountArray;
        },
        sumArray(arr){
            return arr.reduce(function(prev, curr, idx, arr){
                return Math.abs(prev) + Math.abs(curr);
            });
        }
    },
    mounted(){
        this.getProjectDistributiveProfitData();
    }
}
</script>