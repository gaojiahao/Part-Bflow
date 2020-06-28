<template>
    <div>
        <Card style="margin-bottom: 10px" :padding=0>
            <p slot="title">
                工时分析
            </p>
            <a href="#" slot="extra">
                <Icon type="md-refresh" />
            </a>
            <div style="border-bottom: 1px solid #ddd;">
                <div id='time' style="height:360px;width:560px;"></div>
            </div>
        </Card >
    </div>
</template>

<script>
const echarts = require("echarts");
export default {
    name:'timeAnalysis',
    data(){
        return{
          
        }
    },
    methods:{
        init(){
            let lineChart = echarts.init(document.getElementById('time'));
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
                        data: ['计划工时', '实际工时']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['6月1日', '6月2日', '6月3日', '6月4日', '6月5日', '6月6日', '6月7日', '6月8日', '6月9日', '6月10日', '6月11日', '6月12日'],
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '计划工时',
                            axisLabel: {
                                formatter: '{value} h'
                            }
                        },
                        {
                            type: 'value',
                            name: '实际工时',
                        }
                    ],
                    series: [
                        {
                            name: '计划工时',
                            type: 'bar',
                            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                        },
                        {
                            name: '实际工时',
                            type: 'bar',
                            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        }
                    ]
                };
            lineChart.setOption(option);
        }

    },
    mounted(){
        this.init();
    }
}
</script>