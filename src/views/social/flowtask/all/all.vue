<style lang="less" scoped>
    @import "./all.less";
</style>
<template>
    <div class="alltask">
        <div class="alltask-header">
            所有任务
        </div>
        <div class="alltask-content">
            <div class="alltask-content-container">
                <div class="alltask-content-container-toolbar">
                    <Input 
                        search  
                        @on-enter="handleSearch" 
                        @on-change="handleSearch" 
                        v-model="searchkeywords" 
                        class="alltask-content-container-toolbar-search" 
                        placeholder="输入交易号查询" />
                </div>
                 
                <Table :columns="columns" :data="data" :height="tableHeight"  class="alltask-content-table"></Table>
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
                    key: 'processName',
                    width:140
                },
                {
                    title: '经办人',
                    key: 'handlerName2',
                    width:80
                },
                {
                    title: '经办人部门',
                    key: 'handlerUnitName',
                    width:120
                },
                {
                    title: '发起人',
                    key: 'crtName',
                    width:80
                },
                {
                    title:'待办创建时间',
                    key:'crtTime'
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
            tableHeight:1
        }
    },
    methods:{
        getFlowAllTasks:function () {
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
            this.pageInfo.filter = JSON.stringify([
                {"operator":"like","value":this.searchkeywords,"property":"businessKey"}
            ]);
            this.getFlowAllTasks();
        }
    },
    mounted(){
        this.getFlowAllTasks();
        this.tableHeight = document.body.clientHeight-200;

        window.onresize = () =>{
            this.tableHeight = document.body.clientHeight-200;
        }
    }
}
</script>
