<style lang="less" scoped>
    @import "./draftbox.less";
</style>
<template>
    <div class="draftbox">
        <div class="draftbox-header">
            所有任务
        </div>
        <div class="draftbox-content">
            <div class="draftbox-content-container shadow">
                <div class="draftbox-content-container-toolbar">
                    <Input 
                        search  
                        @on-enter="handleSearch" 
                        @on-change="handleSearch" 
                        v-model="searchkeywords" 
                        class="draftbox-content-container-toolbar-search" 
                        placeholder="输入交易号查询" />
                </div>
                <Table :columns="columns" :data="data" :height="tableHeight"  class="draftbox-content-table"></Table>
                <Page 
                class="draftbox-content-page"
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
import {getDraftData} from "@/services/socialService";
export default {
    name:'Draftbox',
    data () {
        return {
            columns: [
                {
                    title: '交易号',
                    key: 'transCode',
                    width:140,
                    render: (h,params) => {
                        return h('a',{
                            on: {
                                click: () => {
                                    window.open("/Form/index.html?data=" + params.row.transCode);
                                }
                            }
                        },params.row.transCode);
                    }
                },
                {
                    title: '应用名称',
                    key: 'transType',
                    width:140
                },
                {
                    title: '经办人',
                    key: 'handlerName',
                    width:80
                },
                {
                    title: '经办人组织',
                    key: 'handlerUnitName',
                    width:120
                },
                {
                    title: '经办人职位',
                    key: 'handlerRoleName',
                    width:120
                },
                {
                    title:'创建时间',
                    key:'createdTime',
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
        getDraftData:function () {
            getDraftData(this.pageInfo).then(res=>{
                this.data = res.tableContent;
                this.pageInfo.total = res.dataCount;
            });
        },
        handlePageChange:function (page) {
            this.pageInfo.page = page;
            this.getDraftData();
        },
        handlePageSizeChange:function (size) {
            this.pageInfo.limit = size;
            this.getDraftData();
        },
        handleSearch:function () {
            this.pageInfo.filter = JSON.stringify([
                {"operator":"like","value":this.searchkeywords,"property":"transCode"}
            ]);
            this.getDraftData();
        }
    },
    mounted(){
        this.getDraftData();
        this.tableHeight = document.body.clientHeight-200;

        window.onresize = () =>{
            this.tableHeight = document.body.clientHeight-200;
        }
    }
}
</script>
