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

}
</style>
<template>
    <div class="financial-analysis">
        <div class="financial-analysis-projectAssets">
            <p class="financial-analysis-title">
                资产负债表
                <Icon type="md-refresh" class="fr" />
            </p>
            <div class="financial-analysis-charts" >
                <div id='projectAssets' style="height:360px;width:260px;display: inline-block;"></div>
                <div id='LbAndPf' style="height:360px;width:260px;display: inline-block;"></div>
            </div>
            <ul >
                <li  v-for="(item,index) in balance" :key="index">
                    <div style="flex: 1;" :class="{'textIndent':!item.title,'item-title':item.title}">{{item.item}}</div>
                    <div style="flex: 1 1 0%;text-align: right;"><a>{{item.amount}}</a></div>
                </li>
            </ul>
        </div >

         <div class="financial-analysis-profit">
            <p class="financial-analysis-title">
                利润表
                <Icon type="md-refresh" class="fr" />
            </p>
           
            <div class="financial-analysis-charts">
                <div id='profit' style="height:360px;width:560px;"></div>
            </div>
            <ul >
                <li  v-for="(item,index) in profit" :key="index">
                    <div style="flex: 1;" :class="{'textIndent':!item.title,'item-title':item.title}">{{item.item}}</div>
                    <div style="flex: 1 1 0%;text-align: right;"><a>{{item.amount}}</a></div>
                </li>
            </ul>
        </div >
    </div>
</template>

<script>
const echarts = require("echarts");
export default {
    name:'financialAnalysis',
    data(){
        return{
               profit: [
                {
                    item: '收入',
                    amount: 18,
                    title:true
                },
                {
                    item: '预算收入',
                    amount: 24,
                },
                {
                    item: '成本',
                    amount: 30,
                    title:true
                },
                {
                    item: '内部服务采购',
                    amount: 26,
                },
                {
                    item: '外部服务采购',
                    amount: 26,
                },
                {
                    item: '费用',
                    amount: 26,
                    title:true
                },
                {
                    item: '租车费',
                    amount: 26,
                },
                {
                    item: '内部服务采购',
                    amount: 26,
                },
                {
                    item: '盈余',
                    amount: 26,
                    title:true
                },{
                    item: '盈余率',
                    amount: 26,
                    title:true
                },
            ],
            balance: [
                {
                    item: '利润',
                    amount: 18,
                    title:true
                },
                {
                    item: '已分配利润',
                    amount: 24,
                    title:true
                },
                {
                    item: '资产',
                    amount: 30,
                    title:true
                },
                {
                    item: '存货',
                    amount: 26,
                },
                {
                    item: '发出商品',
                    amount: 26,
                },
                {
                    item: '应收账款',
                    amount: 26,
                },
                {
                    item: '负债',
                    amount: 26,
                    title:true
                },
                {
                    item: '估价入库',
                    amount: 26,
                },
                {
                    item: '应付账款',
                    amount: 26,
                },
                {
                    item: '可分配利润',
                    amount: 26,
                    title:true
                },
            ]
        }
    },
    methods:{
        init(){
            let profitChart = echarts.init(document.getElementById('profit'));

            let  projectAssetsChart = echarts.init(document.getElementById('projectAssets'));
            let  LbAndPfChart = echarts.init(document.getElementById('LbAndPf'));


            let profitData = [
                {
                    name: "收入",
                    path: "收入",
                    value: 100000,
                    children:[
                    {
                        name: "成本",
                        path: "成本",
                        value: 65000,
                        children:[
                        {
                            name: "内部服务采购",
                            path: "内部服务采购",
                            value: 40000,
                            
                        },
                        {
                            name: "外部服务采购",
                            path: "外部服务采购",
                            value: 25000
                        }]
                    },
                    {
                        name: "费用",
                        path: "费用",
                        value: 28000,
                        children:[
                        {
                            name: "差旅费",
                            path: "差旅费",
                            value: 6000,
                            
                        },
                        {
                            name: "快递费",
                            path: "快递费",
                            value: 300,
                            
                        },
                        {
                            name: "咨询费",
                            path: "咨询费",
                            value: 17700,
                            
                        },
                        {
                            name: "工资",
                            path: "工资",
                            value: 4000
                        }]
                    },{
                        name: "盈余",
                        path: "盈余",
                        value: 7000,
                    }
                    ],
                    
                }
            ]

            let projectAssets = [
                {
                    name: "资产",
                    path: "资产",
                    value: 300000,
                    children:[
                    {
                        name: "存货",
                        path: "存货",
                        value: 60000,
                    },
                    {
                        name: "发出商品",
                        path: "发出商品",
                        value: 10000,
                    },{
                        name: "应收账款",
                        path: "应收账款",
                        value: 140000
                    }
                    ],
                    
                }
            ];

            let LbAndPf = [
                {
                    name: "负债",
                    path: "负债",
                    value: 50000,
                    children:[
                        {
                            name: "估价入库",
                            path: "估价入库",
                            value: 3000,
                        },
                        {
                            name: "应付账款",
                            path: "应付账款",
                            value: 3000,
                        }
                    ],
                },
                 {
                    name: "利润",
                    path: "利润",
                    value: 44000,
                    children:[
                        {
                            name: "已分配利润",
                            path: "已分配利润",
                            value: 0,
                        },
                        {
                            name: "可分配利润",
                            path: "可分配利润",
                            value: 44000,
                        }
                    ],
                }
            ]

            function colorMappingChange(value) {
                var levelOption = getLevelOption(value);
                chart.setOption({
                    series: [{
                        levels: levelOption
                    }]
                });
            }

            var formatUtil = echarts.format;

            function getLevelOption() {
                return [
                    {
                        itemStyle: {
                            borderColor: '#777',
                            borderWidth: 0,
                            gapWidth: 1,
                        },
                        upperLabel: {
                            show: false
                        }
                    },
                    {
                        itemStyle: {
                            borderColor: '#555',
                            borderWidth: 5,
                            gapWidth: 1
                        },
                        emphasis: {
                            itemStyle: {
                                borderColor: '#ddd'
                            }
                        }
                    },
                    {
                        colorSaturation: [0.3, 0.5],
                        itemStyle: {
                            borderWidth: 5,
                            gapWidth: 1,
                            borderColorSaturation: 0.6
                        }
                    }
                ];
            }
            let option;

            profitChart.setOption(option = {
                tooltip: {
                    formatter: function (info) {
                        var value = info.value;
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
                        visibleMin: 300,
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
                        levels: getLevelOption(),
                        data: profitData
                    }
                ]
            });

            projectAssetsChart.setOption(option = {
                tooltip: {
                    formatter: function (info) {
                        var value = info.value;
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
                        name: '项目资产',
                        type: 'treemap',
                        visibleMin: 300,
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
                        levels: getLevelOption(),
                        data: projectAssets
                    }
                ]
            });

            LbAndPfChart.setOption(option = {
                tooltip: {
                    formatter: function (info) {
                        var value = info.value;
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
                        name: '负债与利润',
                        type: 'treemap',
                        visibleMin: 300,
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
                        levels: getLevelOption(),
                        data: LbAndPf
                    }
                ]
            });

        }

    },
    mounted(){
        this.init();
    }
}
</script>