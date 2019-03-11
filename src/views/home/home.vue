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
    </div>
</template>

<script>

import {
  getMenu,
  getCurrentUserAllTasks
} from "@/services/flowService";
import MenuSection from './menu-section';

export default {
    name:'Home',
    components:{
        MenuSection
    },
    data(){
        return {
            menuTree:[],
            allTaskCount:{},
            spinShow:true
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
    }
}
</script>

