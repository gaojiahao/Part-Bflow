<style lang="less" scoped>
    @import "./task-statistics.less";
</style>
<template>
    <div class="statistics shadow">
        <div  class="statistics-item">
            <div class="statistics-item-txt">待办</div>
            <router-link :to="{ name:'todo'}">
                <div class="statistics-item-count todotask" >{{todo}}</div>
            </router-link>
        </div>
        
        <div  class="statistics-item">
            <div class="statistics-item-txt">已办</div>
            <router-link :to="{ name:'done'}">
                <div class="statistics-item-count donetask">{{done}}</div>
            </router-link>
        </div>

        <div  class="statistics-item">
            <div class="statistics-item-txt">所有</div>
            <router-link :to="{ name:'all'}">
                <div class="statistics-item-count">{{all}}</div>
            </router-link>
        </div>
        
        <Divider type="vertical"  style="height: 7em;"/>

        <div  class="statistics-item">
            <i-circle 
                :percent="completionratio"
                :size="100"
                :trail-width="4"
                :stroke-width="8"
                stroke-linecap="square"
                stroke-color="#1fe5bd">
                <div class="demo-Circle-custom">
                    <p style="font-size: 1rem!important;color: #aaa;">完成率</p>
                    <p style="font-size: 2.5em;font-family: lcletter;color: #1fe5bd;">{{completionratio}}%</p>
                </div>
            </i-circle>
        </div>
        
    </div>
</template>

<script>
import {
    getFlowTodoTasks,
    getFlowDoneTasks,
} from "@/services/socialService";
export default {
    name:'TaskStatistics',
    data(){
        return {
            todo:0,
            done:0,
            all:0,
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

                    if(this.done ===0 || this.all ===0){
                        this.completionratio = 0;
                        return;
                    }
                    this.completionratio = parseInt(this.done/this.all*100);

                });
            });
        },
    },
    mounted(){
      this.getData();
    }
}
</script>

