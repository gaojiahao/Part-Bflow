<style lang="less" scoped>
    @import "./all-flowtask.less";
</style>
<template>
    <div class="alltask">
        <div class="alltask-header">
            所有工作流任务
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
                        placeholder="输入交易号查询" />
                    <Button @click="exportFlowtask" type="info" style="float:right;">导出</Button>
                </div>
                 
                <Table 
                    ref="flowTable" 
                    @on-sort-change="onSortChange"
                    :columns="columns" 
                    :data="data" 
                    :height="tableHeight"  
                    class="alltask-content-table">
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
import { getAllFlowTasks,exportToExcel } from "@/services/socialService";
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
                        if(params.row.assigneeName && this.$currentUser.nickname != params.row.assigneeName){
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
                    title: '工作流节点名称',
                    key: 'nodeName',
                    width:140,
                },
                {
                    title: '当前审批职位',
                    key: 'assigneeRoleName',
                     width:160,
                },
                {
                    title: '当前审批人',
                    key: 'assigneeName',
                     width:160,
                },
                {
                    title:'任务接收时间',
                    key:'crtTime',
                    width:150
                },
                {
                    title: "已过小时数",
                    key: "pastTimeHour",
                    width:120,
                    sortable: 'custom',
                    render: (h,params) => {
                            let outTime = this.calcLeadTime(params.row.crtTime, true);
                            return h('span',{},outTime);
                        }
                },
                {
                    title: "已过时间",
                    key: "pastTime",
                    width:150,
                    render: (h,params) => {
                        let outTime = this.calcLeadTime(params.row.crtTime);
                        return h('span',{},outTime);
                    }
                },
                {
                    title: '应用名称',
                    key: 'processName',
                    width:150
                },
                {
                    title: '经办人',
                    key: 'handlerName',
                    width:80
                },
                {
                    title: '发起人',
                    key: 'crtName',
                    width:80
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
        //导出
        exportFlowtask() {
            let params = {},exportColumns = [];
            
            this.columns.forEach(item => {
                exportColumns.push({
                    text: item.title,
                    dataIndex: item.key || item.slot,
                    width: item.width
                })
            });
            params = {
                fileName: '所有工作流',
                columns: JSON.stringify(exportColumns),
                filter: this.pageInfo.filter
            };

            exportToExcel(params).then(res => {
                if(res.success){
                    let downloadLink = document.createElement("a");
                    downloadLink.href = res.message;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }
            }).catch(res => {
                this.$Message.error(res.data.message);
            })
        },
        getFlowAllTasks:function () {
            this.pageInfo.filter = JSON.stringify([
                {"operator":"like","value":this.searchkeywords,"property":"businessKey"}
            ]);
            if(this.sortColumn){
                this.pageInfo.sort= JSON.stringify(this.sortColumn);
            }
            getAllFlowTasks(this.pageInfo).then(res=>{
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
        calcLeadTime(date, isPastHour) {
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