<style lang="less" scoped>
    @import "./home.less";
</style>
<template>
    <div class="menu-section-list-item-container">

        <Badge 
            :count="taskCount" 
            class="task-badge"
            v-if="menu.type==='subject'" type="primary">
        </Badge>

         <Poptip  
            width="720"  
            class="task-badge aaaaaa"  
            @on-popper-show="popperShow" 
            placement="right-end" 
            trigger="click"
            v-if="menu.type != 'subject'"  :transfer='true'>

            <Badge :count="taskCount"></Badge>
            <div slot="title">
                <label>{{menu.text+' - 待办任务'}}</label>
                <Button 
                    type="primary" 
                    style="height:28px;" 
                    :disabled="onPageSelection.length === 0"
                    @click="handleBatchApproval"
                    >
                    批量审批
                </Button>
            </div>
            <div slot="content">
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
                    <Page 
                        :total="pageTotal" 
                        :current="currentPage" 
                        size="small" 
                        :page-size="pageSize"
                         @on-change="changeCurrentPage" 
                         show-total>
                        </Page>
                </div>
                </div>

            </div>
        </Poptip>

        <img 
            class="menu-section-list-item-icon" 
            v-bind:class="{ 'obj-icon': menu.type=='obj' ||  menu.type=='hr', 'subject-icon': menu.type=='subject' }"
            v-lazy="menu.icon"
            onerror='this.lazy="resources/images/icon/img-loading-error.png"'>
        <div class="menu-section-list-item-info">
            <div class="menu-section-list-item-info-base">

                <Tooltip 
                    :content="menu.text" 
                    placement="top-start">
                    <div 
                        class="menu-section-list-item-info-base-name" 
                        @click="redirectTo(menu)">{{menu.text}} 
                    </div>
                </Tooltip>

                <a 
                    class="menu-section-list-item-info-base-detail" 
                    v-if="menu.type !== 'system'"
                    @click.stop="handlerViewDetail">详情
                </a>
            </div>

            <div class="menu-section-list-item-info-other">
                <div class="menu-section-list-item-info-other-transtype">{{menu.transName}}</div>
                
                <my-pop-tip :userInfo="userInfo" trigger="click">
                    <a 
                    class="menu-section-list-item-info-other-user" 
                    @click="handlerShowUserInfo" 
                    slot="userCard"> 
                    {{menu.administrator}}
                    </a>
                </my-pop-tip>

                <Icon 
                    class="menu-section-list-item-info-other-addbutton" type="ios-add-circle-outline" 
                    v-if="(menu.type === 'obj'||menu.type === 'business') && menu.action.add"
                    @click="handlerToAddingPage" 
                />
            </div>
        </div>
    </div>
</template>

<script>
import MyPopTip from "@/components/poptip/MyPopTip";
import { getUserInfoByUserId } from "@/services/appService.js";
import { getAppTaskCount, getFormViews,commitBatchTask } from "@/services/flowService";

export default {
    name:'MenuItem',
    components:{
        MyPopTip
    },
    data(){
        return {
            userInfo: {},
            taskCount:0,
            onPageSelection:[],
            batchComment:"",//审批意见
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
            ],
            columnData: [],
            loading: false,
            pageTotal: 0, //table总数
            pageSize: 10,
            currentPage: 1, //table当前页
        }
    },
    props:{
        menu:{
            type:Object,
            default:function () {
                return {};
            }
        },
        allTaskCount:{
            type:Object,
            default:function () {
                return {};
            }
        }
    },
    watch: {
        allTaskCount: {
            handler: function(val, oldValue) {
                this.taskCount = val[this.menu.listId];
            },
            deep: true
        }
    },
    methods:{
        //查看应用详情
        handlerViewDetail() {
            this.menu.listId && window.top.postMessage({type: "redirect",url: "appSetting/" + this.menu.listId},"*");
        },
        //快捷新增按钮
        handlerToAddingPage(){
            let uniqueId = "";
            getFormViews(this.menu.listId).then(res => {
                if (res.length > 0) {

                    uniqueId = res.filter(f => {
                        return f.viewType === "submit";
                    })[0].uniqueId;
                    
                    window.open(
                        "/Form/index.html?model=new&view=" +
                        uniqueId +
                        "&list=" +
                        this.menu.listId
                    );

                } else {
                    this.$Message.info("抱歉,当前点击的应用,表单模板为空,请联系企业管理员!");
                }
            });
        },
        //显示应用管理员信息
        handlerShowUserInfo(){
            getUserInfoByUserId(this.menu.adminId).then(res => {
                if (res.dataCount) {
                    this.userInfo = res.tableContent[0];
                }
            });
        },
        //点击应用名称跳转
        redirectTo: function(menu) {
            let url = menu.url;
            let nr = window.top.document.getElementById("frame1").getAttribute("nr");
            if (menu.target === "_blank") {
                window.open(url, "_blank");
            } else {
                if (!nr) {
                    if (~url.indexOf("outlink")) {
                        url = url;
                    } else if (~menu.url.indexOf("app")) {
                        url = "appReport/" + url;
                    } else {
                        url = "report/" + url;
                    }
                }
                window.top.postMessage({type: "redirect",url: url},"*");
            }
        },
        popperShow(e) {
            let params = {
                type: "myToDo",
                page: this.currentPage,
                listId: this.menu.listId,
                limit: this.pageSize
            };
            this.onPageSelection = [];
            this.loading = true;
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
    mounted(){
        this.taskCount = this.allTaskCount[this.menu.listId];
    }
}
</script>

