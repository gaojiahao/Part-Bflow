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
     
        <span  @click="showTaskCount">
            <Badge 
                class="task-badge" 
                :count="taskCount" 
                v-if="menu.type != 'subject'"
                >
            </Badge>
        </span>
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
import Bus from "@/assets/eventBus.js";

export default {
    name:'MenuItem',
    components:{
        MyPopTip,
    },
    data(){
        return {
            userInfo: {},
            taskCount:0,
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

        showTaskCount(){
            this.isTaskModal =true;
        },
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
        showTaskCount(e) {
            Bus.$emit('showTaskEvent', this.menu.url.split("/")[1])
        },
      
    },
    mounted(){
        this.taskCount = this.allTaskCount[this.menu.listId];
    }
}
</script>

