<style lang="less" scoped>
    @import "./todo.less";
</style>
<template>
    <div class="todotask">
        <div class="todotask-header">
            我的待办
        </div>
        <div class="todotask-content">
            <div class="todotask-content-container shadow">
                <div class="todotask-content-container-toolbar">
                    <Input 
                        search  
                        @on-enter="handleSearch" 
                        @on-change="handleSearch" 
                        v-model="searchkeywords" 
                        class="todotask-content-container-toolbar-search" 
                        placeholder="输入交易号或往来对象查询" />
                    <Button 
                        type="primary" 
                        style="float:right;height:29px;" 
                        :disabled="onPageSelection.length===0"
                        @click="handleBatchApproval"
                        >
                        批量审批
                    </Button>
                </div>

                <Table 
                    :loading="loading" 
                    @on-sort-change="onSortChange"
                    :columns="columns" 
                    :data="data" 
                    :height="tableHeight"  
                    class="todotask-content-table"
                    ref="selection" 
                    @on-select-all="onSelectAll" 
                    @on-selection-change="handerSelectionChange" 
                    @on-select-cancel="onSelectCancel"
                    >
                    <template slot-scope="{ row }" slot="businessKey">
                        <a :href="'/Form/index.html?data='+row.businessKey" target="_blank">{{row.businessKey}}</a>
                    </template>
                </Table>
                <Page 
                class="todotask-content-page"
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
                <i class="iconfont icon-refresh" @click="getFlowTodoTasks">&#xe783;</i>
            </div >
        </div>
    </div>
</template>
<script>
import {getFlowTodoTasks,commitBatchTask} from "@/services/socialService";
export default {
    name:'FlowtaskToDo',
    data () {
        return {
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    key:'unableEdit',
                },
                {
                    title: '任务编号',
                    key: 'taskId',
                    width:90,
                    render: (h,params) => {
                        return h('div',[
                            h('Badge',{
                                props: {
                                    dot: true
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
                    width:165,
                },
                {
                    title: '往来',
                    key: 'dealerName',
                    width:140,
                },
                {
                    title: '操作名称',
                    key: 'nodeName',
                    width:165
                },
                {
                    title: '应用名称',
                    key: 'title',
                    width:165
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
                            let outTime = this.calcLeadTime(params.row.crtTime, true);
                            return h('span',{},outTime);
                        }
                },
                {
                    title: "已过时间",
                    key: "crtTime",
                    width:150,
                    render: (h,params) => {
                            let outTime = this.calcLeadTime(params.row.crtTime);
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
            searchkeywords:'',
            tableHeight:1,

            loading:false,
            sortColumn: null,
            onPageSelection:[],
            batchComment:''
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
            this.getFlowTodoTasks();
        },
        getFlowTodoTasks:function () {
            this.pageInfo.filter = JSON.stringify([
                {"link":"or","operator_1":"like","value_1":this.searchkeywords,"property_1":"businessKey",
                "operator_2":"like","value_2":this.searchkeywords,"property_2":"dealerName"}
            ]);
            if(this.sortColumn){
                this.pageInfo.sort= JSON.stringify(this.sortColumn);
            }
            this.loading = true;
            getFlowTodoTasks(this.pageInfo).then(res=>{
                this.data = res.tableContent;
                this.pageInfo.total = res.dataCount;

                this.data.forEach(item=>{
                    if(this.onPageSelection.length>0){
                        this.onPageSelection.forEach(sel=>{
                            if(sel.taskId === item.taskId){
                            item._checked = true;
                        }
                        })
                    }
                    if(!item.unableEdit){
                        item._disabled = true;
                    }
                })
                this.loading = false;
            });
        },
        handlePageChange:function (page) {
            this.pageInfo.page = page;
            this.getFlowTodoTasks();
        },
        handlePageSizeChange:function (size) {
            this.pageInfo.limit = size;
            this.getFlowTodoTasks();
        },
        handleSearch:function () {
            this.pageInfo.page = 1;
            this.getFlowTodoTasks();
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
                this.getFlowTodoTasks();
            });
        },

        //批量审批任务
        handleBatchApproval(){
            this.batchComment = "";
            this.$Modal.confirm({
                title: '系统提示',
                content: '<p>审批意见</p>',
                closable:true,
                okText:"同意",
                cancelText:"不同意",
                render:(h) => {
                    return h('div', [ 
                        h('label','审批意见: '),
                        h('Input',{
                            props: {
                                value: this.batchComment,
                                autofocus: true,
                            },
                            style:{
                                width:'75%',
                                marginLeft:'10px'
                            },
                            on: {
                                input: (val) => {
                                    this.batchComment = val;
                                }
                            }
                        })
                    ])
                },
                onOk: () => {
                    let selection = this.onPageSelection;
                    let data = [];
                    selection.forEach(sel=>{
                        data.push({
                            taskId:sel.taskId,
                            transCode:sel.businessKey,
                            result:1,
                            comment:this.batchComment
                        })
                    })
                    commitBatchTask(data).then(res=>{
                        if(res.success){
                            this.getFlowTodoTasks();
                            this.onPageSelection = [];
                            this.$Notice.success({
                                title:'提示',
                                desc:res.message,
                            })
                        }else{
                            this.$Notice.error({
                                title:'提示',
                                desc:res.message,
                            })
                        }
                    })
                },
                onCancel: () => {
                    let selection = this.onPageSelection;
                    let data = [];
                    selection.forEach(sel=>{
                        data.push({
                            taskId:sel.taskId,
                            transCode:sel.businessKey,
                            result:0,
                            comment:this.batchComment
                        })
                    })
                    commitBatchTask(data).then(res=>{
                        if(res.success){
                            this.getFlowTodoTasks();
                            this.onPageSelection = [];
                            this.$Notice.success({
                                title:'提示',
                                desc:res.message,
                            })
                        }else{
                            this.$Notice.error({
                                title:'提示',
                                desc:res.message,
                            })
                        }
                    })
                }
            })

        },

        //全选
        onSelectAll(selection) {
            let obj = {};
            //触发全选事件
            //全选
            this.onPageSelection.push(...selection);
            //数组去重
            this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
                obj[next.taskId] ? "" : (obj[next.taskId] = true && cur.push(next));
                return cur;
            }, []);
        },

        //保存分页选中
        handerSelectionChange(selection) {
            //取消全选
            if (selection.length === 0) {
                let s = this.$refs.selection.data;
                let p = this.onPageSelection;
                s.map(item => {
                p = p.filter(f => {
                    return f.taskId !== item.taskId;
                });
                });
                this.onPageSelection = p;
            } else {
                let obj = {};
                this.onPageSelection.push(...selection);
                //数组去重
                this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
                obj[next.taskId] ? "" : (obj[next.taskId] = true && cur.push(next));
                return cur;
                }, []);
            }
        },

        //单选取消
        onSelectCancel(selection, row) {
            this.onPageSelection = this.onPageSelection.filter(f => {
                return f.taskId !== row.taskId;
            });
        },
     
    },
    mounted(){
        this.getFlowTodoTasks();
        this.subscribeMessage();
        this.tableHeight = document.body.clientHeight-200;

        window.onresize = () =>{
            this.tableHeight = document.body.clientHeight-200;
        }
    }
}
</script>
