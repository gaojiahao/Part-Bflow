<style lang="less" scoped>
    @import "./all.less";
</style>
<template>
    <div class="alltask">
        <div class="alltask-header">
            我的所有任务
        </div>
        <div class="alltask-content">
            <div class="alltask-content-container shadow">
                <div class="alltask-content-container-toolbar">
                    <Input 
                        search  
                        @on-enter="handleSearch" 
                        @on-change="handleSearch" 
                        v-model="searchkeywords" 
                        class="alltask-content-container-toolbar-search" 
                        placeholder="输入交易号或往来对象查询" />
                </div>
                 
                <Table @on-sort-change="onSortChange" :columns="columns" :data="data" :height="tableHeight"  class="alltask-content-table">
                    <template slot-scope="{ row }" slot="businessKey">
                        <a :href="'/Form/index.html?data='+row.businessKey" target="_blank">{{row.businessKey}}</a>
                    </template>
                </Table>
                <Page 
                class="alltask-content-page"
                :total="pageInfo.total" 
                :page-size="pageInfo.limit"
                :current="pageInfo.page"
                show-total
                size="small" 
                show-elevator 
                show-sizer
                prev-text="上一页" 
                next-text="下一页" 
                @on-page-size-change='handlePageSizeChange'
                @on-change="handlePageChange"/>
            </div>
        </div>
    </div>
</template>
<script>
import {getFlowAllTasks} from "@/services/socialService";
export default {
    name:'FlowtaskAll',
    data () {
        return {
            columns: [
                {
                    title: '任务编号',
                    key: 'taskId',
                    width:90,
                    render: (h,params) => {
                        let isDot = true;
                        if(params.row.type === 1){
                            isDot = false;
                        }
                        return h('div',[
                            h('Badge',{
                                props: {
                                    dot: isDot
                                },
                                style:{
                                    marginRight: '5px',
                                    paddingBottom: '8px'
                                }
                            }),
                            h('span',{},params.row.taskId)
                        ]);
                    }
                    
                },
                {
                    title: '交易号',
                    slot: 'businessKey',
                    width:160,
                },
                {
                    title: '往来',
                    key: 'dealerName',
                    width:140,
                },
                {
                    title: '操作名称',
                    key: 'nodeName',
                     width:160,
                },
                {
                    title: '应用名称',
                    key: 'processName',
                     width:160,
                },
                {
                    title: '经办人',
                    key: 'handlerName2',
                    width:80
                },
                {
                    title: '发起人',
                    key: 'crtName',
                    width:80
                },
                {
                    title:'待办创建时间',
                    key:'crtTime',
                    width:150
                },
                {
                    title: "已过小时数",
                    key: "pastTimeHour",
                    width:120,
                    sortable: 'custom',
                    render: (h,params) => {
                            let outTime = this.calcLeadTime(params.row.startTime, true);
                            return h('span',{},outTime);
                        }
                },
                {
                title: "已过时间",
                key: "crtTime",
                 width:150,
                render: (h,params) => {
                        let outTime = this.calcLeadTime(params.row.startTime);
                        return h('span',{},outTime);
                    }
                }
            ],
            data: [],
            pageInfo:{
                limit:30, 
                page:1, 
                total:0,
                filter:[]
            },
            sortColumn: null,
            searchkeywords:'',
            tableHeight:1
        }
    },
    methods:{
        //排序
        onSortChange(column) {
            if(column.order === 'normal'){
                delete this.pageInfo.sort;
                this.sortColumn = null;
            }else{
                this.sortColumn = [{property:column.key,direction:column.order}];
            }
            this.getFlowAllTasks();
        },
        getFlowAllTasks:function () {
            this.pageInfo.filter = JSON.stringify([
                {"link":"or","operator_1":"like","value_1":this.searchkeywords,"property_1":"businessKey",
                "operator_2":"like","value_2":this.searchkeywords,"property_2":"dealerName"}
            ]);
            if(this.sortColumn){
                this.pageInfo.sort= JSON.stringify(this.sortColumn);
            }
            getFlowAllTasks(this.pageInfo).then(res=>{
                this.data = res.tableContent;
                this.pageInfo.total = res.dataCount;
            });
        },
        handlePageChange:function (page) {
            this.pageInfo.page = page;
            this.getFlowAllTasks();
        },
        handlePageSizeChange:function (size) {
            this.pageInfo.limit = size;
            this.getFlowAllTasks();
        },
        handleSearch:function () {
            this.pageInfo.page = 1;
            this.getFlowAllTasks();
        },
        //计算时间差
        calcLeadTime(date,isPastHour) {
            let startDate = new Date(date.replace(/-/g,"/")),
                currentDate = new Date(),
                dateDiff = currentDate.getTime() - startDate.getTime(),//时间差的毫秒数
                dayDiff = Math.floor(dateDiff/(24*3600*1000)),//相差天数
                restMilliSeconds1 = dateDiff%(24*3600*1000),//计算天数后剩余的毫秒数
                hourDiff = Math.floor(restMilliSeconds1/(3600*1000)),//计算出小时数
                restMilliSeconds2 = restMilliSeconds1%(3600*1000),//计算小时数后剩余的毫秒数
                minuteDiff = Math.floor(restMilliSeconds2/(60*1000)),//计算相差分钟数
                restMilliSeconds3 = restMilliSeconds2%(60*1000),//计算分钟数后剩余的毫秒数
                secondDiff = Math.round(restMilliSeconds3/1000),//计算出相差秒数
                outdateTime;
            if(isPastHour){
                outdateTime = (dayDiff*24 + hourDiff) + '小时';
            }else{
                outdateTime = dayDiff + '天' + hourDiff + '时' + minuteDiff + '分' + secondDiff + '秒';
            }
            return outdateTime;
        },
        //订阅消息
        subscribeMessage: function() {
            let deepstream = this.$deepstream;
            //消息订阅
            deepstream.event.subscribe("taskChange/" + this.$currentUser.userId, msg => {
                this.getFlowAllTasks();
            });
        }
    },
   
    mounted(){
        this.getFlowAllTasks();
        this.subscribeMessage();
        this.tableHeight = document.body.clientHeight-200;

        window.onresize = () =>{
            this.tableHeight = document.body.clientHeight-200;
        }
    }
}
</script>
