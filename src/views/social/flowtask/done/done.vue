<style lang="less" scoped>
    @import "./done.less";
</style>
<template>
    <div class="donetask">
        <div class="donetask-header">
            所有已办任务
        </div>
        <div class="donetask-content">
            <div class="donetask-content-container shadow">
                <div class="donetask-content-container-toolbar">
                    <Input 
                        search  
                        @on-enter="handleSearch" 
                        @on-change="handleSearch" 
                        v-model="searchkeywords" 
                        class="donetask-content-container-toolbar-search" 
                        placeholder="输入交易号或往来对象查询" />
                </div>
                <Table :columns="columns" :data="data" :height="tableHeight"  class="donetask-content-table">
                    <template slot-scope="{ row }" slot="transId">
                        <a :href="'/Form/index.html?data='+row.transId" target="_blank">{{row.transId}}</a>
                    </template>
                </Table>
                <Page 
                class="donetask-content-page"
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
import {getFlowDoneTasks} from "@/services/socialService";
export default {
    name:'FlowtaskDone',
    data () {
        return {
            columns: [
                {
                    title: '任务编号',
                    key: 'taskId',
                    width:90
                },
                {
                    title: '交易号',
                    slot: 'transId',
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
                    key: 'title',
                     width:160,
                },
                {
                    title: '经办人',
                    key: 'handlerName',
                    width:80
                },
                {
                    title: '发起人',
                    key: 'creatorName',
                    width:80
                },
                {
                    title:'待办创建时间',
                    key:'crtTime',
                    width:150
                },
                {
                    title:'任务处理时间',
                    key:'endTime',
                    width:150
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
        getFlowDoneTasks:function () {
            this.pageInfo.filter = JSON.stringify([
                {"link":"or","operator_1":"like","value_1":this.searchkeywords,"property_1":"transId",
                "operator_2":"like","value_2":this.searchkeywords,"property_2":"dealerName"}
            ]);
            getFlowDoneTasks(this.pageInfo).then(res=>{
                this.data = res.tableContent;
                this.pageInfo.total = res.dataCount;
            });
        },
        handlePageChange:function (page) {
            this.pageInfo.page = page;
            this.getFlowDoneTasks();
        },
        handlePageSizeChange:function (size) {
            this.pageInfo.limit = size;
            this.getFlowDoneTasks();
        },
        handleSearch:function () {
            this.pageInfo.page = 1;
            this.getFlowDoneTasks();
        },
        //订阅消息
        subscribeMessage: function() {
            let deepstream = this.$deepstream;
            //消息订阅
            deepstream.event.subscribe("taskChange/" + this.$currentUser.userId, msg => {
                this.getFlowDoneTasks();
            });
        }
    },
    mounted(){
        this.getFlowDoneTasks();
        this.subscribeMessage();
        this.tableHeight = document.body.clientHeight-200;

        window.onresize = () =>{
            this.tableHeight = document.body.clientHeight-200;
        }
    }
}
</script>
