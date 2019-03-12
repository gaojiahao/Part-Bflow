<style lang="less" scoped>
@import "./home.less";
</style>

<template>
    <div class="home-wrap">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="home-wrap-container">
            <menu-section 
                v-for="section in menuTree"  
                :key="section.id" 
                :section=section
                :allTaskCount=allTaskCount>
            </menu-section >    
        </div>

            <task-modal v-model="isTaskModal" width="800" title="待办任务" :footerHide="true" > 
            <div style="margin-top:10px;">
                    <Button 
                        type="primary" 
                        style="height:28px;margin-bottom:5px" 
                        :disabled="onPageSelection.length === 0"
                        @click="handleBatchApproval"
                        >
                        批量审批
                    </Button>
                <Table 
                    :loading ="loading"
                    :columns="columns" 
                    :data="columnData" 
                    size="small"
                    ref="selection" 
                    @on-select-all="onSelectAll" 
                    @on-selection-change="handerSelectionChange" 
                    @on-select-cancel="onSelectCancel"
                >
                </Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="pageTotal" :current="currentPage" size="small" :page-size="pageSize" @on-change="changeCurrentPage" show-total></Page>
                    </div>
                </div>
            </div>
        </task-modal>
    </div>
    
</template>

<script>

import {
  getMenu,
  getCurrentUserAllTasks,
  getAppTaskCount
} from "@/services/flowService";
import MenuSection from './menu-section';
import TaskModal from "@/components/modal/Modal";
import Bus from "@/assets/eventBus.js";
export default {
    name:'Home',
    components:{
        MenuSection,
        TaskModal
    },
    data(){
        return {
            menuTree:[],
            allTaskCount:{},
            spinShow:true,
            isTaskModal:false,
            pageListId:"",
            onPageSelection:[],
            batchComment:"",//审批意见
            columnData: [],
            loading: false,
            pageTotal: 0, //table总数
            pageSize: 10,
            currentPage: 1, //table当前页
            columns: [
                {
                type: 'selection',
                width: 60,
                align: 'center',
                key:'unableEdit',
                },
                {
                title: "交易号",
                key: "transCode",
                sortable: true,
                width: 160,
                align: "center",
                render: (h, params) => {
                    return h(
                    "a",
                    {
                        attrs: {
                        href: "/Form/index.html?data=" + params.row.transCode,
                        target: "_blank"
                        }
                    },
                    params.row.transCode
                    );
                }
                },
                {
                title: "当前节点",
                key: "nodeName"
                },
                {
                title: "当前用户",
                key: "assigneeName",
                width: 90
                },
                {
                title: "创建者",
                key: "creatorName",
                sortable: true
                },
                {
                title: "任务创建时间",
                key: "crtTime",
                width: 160,
                align: "center",
                sortable: true,
                render: (h, params) => {
                    //时间戳转换为日期格式
                    function formatDateTime(inputTime) {
                    let date = new Date(inputTime);
                    let y = date.getFullYear();
                    let m = date.getMonth() + 1;
                    m = m < 10 ? "0" + m : m;
                    let d = date.getDate();
                    d = d < 10 ? "0" + d : d;
                    let h = date.getHours();
                    h = h < 10 ? "0" + h : h;
                    let minute = date.getMinutes();
                    let second = date.getSeconds();
                    minute = minute < 10 ? "0" + minute : minute;
                    second = second < 10 ? "0" + second : second;
                    return (
                        y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second
                    );
                    }
                    return h("span", formatDateTime(params.row.crtTime));
                }
                }
            ]
        }
    },
    methods:{
        //订阅消息
        handlerSubscribeMsg: function() {
            let ds = this.$deepstream;
            ds.event  &&  ds.event.subscribe("taskChange/" + this.$currentUser.userId, res => {
                res.tableContent.map(item=>{
                    this.$set(this.allTaskCount,item.listId,item.total);
                });
            });
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
        //分页加载
        changeCurrentPage(currentPage) {
            let params = {
                type: "myToDo",
                page: currentPage,
                listId: this.menu.listId,
                limit: this.pageSize
            };
            this.loading = true;
            getAppTaskCount(params).then(res => {
                if (res.tableContent.length > 0) {
                this.columnData = res.tableContent;

                this.columnData.forEach(item=>{
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
                }
            });
        },
         //批量审批任务
        handleBatchApproval(){
            this.batchComment = "";
            this.$Modal.confirm({
                title: '审批',
                content: '<p>审批意见</p>',
                closable:true,
                okText:"同意",
                cancelText:"不同意",
                transfer:true,
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
                            transCode:sel.transCode,
                            result:1,
                            comment:this.batchComment
                        })
                    })
                    commitBatchTask(data).then(res=>{
                    this.onPageSelection = [];
                    if(res.success){
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
                            transCode:sel.transCode,
                            result:0,
                            comment:this.batchComment
                        })
                    })
                    commitBatchTask(data).then(res=>{
                    this.onPageSelection = [];
                    if(res.success){
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
        }
    },
    created(){

        this.$nextTick(function name(params) {
            let cache = window.sessionStorage.getItem('roletask.com.r2.cache');
            this.spinShow = true;
            if(cache){
                cache = cache?JSON.parse(cache):{};
                this.menuTree = cache['/ds/getMenu'];
                this.spinShow = false;
            }else{
                getMenu().then(res =>{
                    this.spinShow = false;
                    this.menuTree = res || [];
                });
            }
        });
    },
    mounted(){
        this.handlerSubscribeMsg();
        getCurrentUserAllTasks().then(res => {
            res.tableContent.map(item=>{
                this.allTaskCount[item.listId] = item.total;
            });
        });

        Bus.$on('showTaskEvent',id=>{
            this.pageListId = id;
            this.isTaskModal = true;
            this.onPageSelection = [];
            this.loading = true;
            let params = {
                type: "myToDo",
                page: this.currentPage,
                listId: id,
                limit: this.pageSize
            };
            getAppTaskCount(params).then(res => {
                this.pageTotal = res.total;
                if (res.tableContent.length > 0) {
                this.columnData = res.tableContent;

                this.columnData.forEach(item=>{
                    if(!item.unableEdit){
                        item._disabled = true;
                    }
                })
                this.loading = false;
                }
            });
        })
    }
}
</script>

