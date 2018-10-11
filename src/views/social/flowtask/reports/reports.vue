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
                     <i-circle 
                    :percent="completionratio"
                    :size="120"
                    :trail-width="4"
                    :stroke-width="8"
                    stroke-linecap="square"
                    stroke-color="#1fe5bd">
                    <div class="demo-Circle-custom">
                        <strong style="font-size: 1rem!important;color: #aaa;">完成率</strong>
                        <p style="font-size: 2.5em;font-family: lcletter;color: #1fe5bd;">{{completionratio}}%</p>
                    </div>
                </i-circle>
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
        getData:function () {
            getFlowTodoTasks(this.pageInfo).then(res=>{
                this.todo = res.dataCount;
                getFlowDoneTasks(this.pageInfo).then(res=>{
                    this.done = res.dataCount;
                    this.all = this.todo + this.done;

                    this.completionratio = parseInt(this.done/this.all*100);

                });
            });
        }

    },
    mounted(){
      this.getData();
    }
}
</script>
