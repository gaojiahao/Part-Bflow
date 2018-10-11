<style lang="less" scoped>
    @import "./reports.less";
</style>
<template>
    <div class="reports">
        <div class="reports-header">
            统计报表
        </div>
        <div class="reports-content">
            <div class="reports-content-tasks">
                
                    <div  class="reports-content-tasks-item">
                        <div class="reports-content-tasks-item-txt">待办</div>
                        <router-link :to="{ name:'todo'}">
                            <div class="reports-content-tasks-item-count todotask" >{{todo}}</div>
                        </router-link>
                    </div>
                
                <div  class="reports-content-tasks-item">
                    
                    <div class="reports-content-tasks-item-txt">已办</div>
                    <router-link :to="{ name:'done'}">
                        <div class="reports-content-tasks-item-count donetask">{{done}}</div>
                    </router-link>
                </div>
                <div  class="reports-content-tasks-item">
                    <div class="reports-content-tasks-item-txt">所有</div>
                    <router-link :to="{ name:'all'}">
                        <div class="reports-content-tasks-item-count">{{all}}</div>
                    </router-link>
                </div>

                <div  class="reports-content-tasks-item">
                    <div class="reports-content-tasks-item-txt" style="height:35px;">完成率</div>
                    <ProgressRing  :radius=40  :progress=completionratio :strokeWidth=5 progressColor='#9C27B0'></ProgressRing>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import {getFlowAllTasks,getFlowTodoTasks,getFlowDoneTasks,getDraftData} from "@/services/socialService";
import ProgressRing from "@/components/progress-ring";
export default {
    name:'Reports',
    components:{
        ProgressRing
    },
    watch:{
        done:{
            handler (newvalue,oldValue) {
                this.completionratio = parseInt((this.done/this.all*100));
            }
        },
        all:{
            handler (newvalue,oldValue) {
                this.completionratio = parseInt((this.done/this.all*100));
            }
        },
        deep:true
    },
    data () {
        return {
            todo:0,
            done:0,
            all:0,
            draft:0,
            pageInfo:{
                limit:30, 
                page:1, 
                total:0
            },
            completionratio: 0
        }
    },
    methods:{
        getFlowAllTasks:function () {
            getFlowAllTasks(this.pageInfo).then(res=>{
                this.all = res.dataCount;
            });
        },
        getFlowTodoTasks:function () {
            getFlowTodoTasks(this.pageInfo).then(res=>{
                this.todo = res.dataCount;
            });
        },
        getFlowDoneTasks:function () {
            getFlowDoneTasks(this.pageInfo).then(res=>{
                this.done = res.dataCount;
            });
        },
        getDraftData:function () {
            getDraftData(this.pageInfo).then(res=>{
                this.draft = res.dataCount;
            });
        }
    },
    mounted(){
       this.getFlowAllTasks();
       this.getFlowTodoTasks();
       this.getFlowDoneTasks();
       this.getDraftData();
    }
}
</script>
