<style lang="less" scoped>
    @import "./todo.less";
</style>
<template>
    <div class="todotask">
        <div class="todotask-header">
            所有待办任务
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
                        placeholder="输入交易号查询" />
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
                    :columns="columns" 
                    :data="data" 
                    :height="tableHeight"  
                    class="todotask-content-table"
                    ref="selection" 
                    @on-select-all="onSelectAll" 
                    @on-selection-change="handerSelectionChange" 
                    @on-select-cancel="onSelectCancel"
                    >
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
                    key: 'businessKey',
                    width:140,
                    render: (h,params) => {
                        return h('a',{
                            on: {
                                click: () => {
                                    window.open("/Form/index.html?data=" + params.row.businessKey);
                                }
                            }
                        },params.row.businessKey);
                    }
                },
                {
                    title: '操作名称',
                    key: 'nodeName',
                    width:140
                },
                {
                    title: '应用名称',
                    key: 'title',
                    width:140
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
                title: "已过时间",
                key: "crtTime",
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
            onPageSelection:[],
            batchComment:''
        }
    },
    methods:{
        getFlowTodoTasks:function () {
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
            this.pageInfo.filter = JSON.stringify([
                {"operator":"like","value":this.searchkeywords,"property":"businessKey"}
            ]);
            this.getFlowTodoTasks();
        },
        //计算时间差
        calcLeadTime(date) {
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
            outdateTime = dayDiff + '天' + hourDiff + '时' + minuteDiff + '分' + secondDiff + '秒';
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
                        }
                        this.$Message.success({
                            content:res.message,
                            closable:true,
                            duration:0
                        })
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
                        }
                        this.$Message.success({
                            content:res.message,
                            closable:true,
                            duration:0
                        })
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
