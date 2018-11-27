<style lang="less" scoped>
@import "./messageistory.less";
</style>
<template>
    <div class="message-history">
        
        <Row type="flex" justify="space-around" class="message-history-header" >
            <Col span="4">
                <router-link :to="{ name:'files'}">
                    <Button size=small  :type="$route.name=='files'?'primary':'text'" >文档</Button>
                </router-link>
            </Col>
            <Col span="4">
                <router-link :to="{ name:'images'}">
                    <Button size=small :type="$route.name=='images'?'primary':'text'">图片</Button>
                </router-link>
            </Col>
            <Col span="4">
                <Button size=small :type="$route.name=='tasks'?'primary':'text'" >工作流任务</Button>
            </Col>
        </Row>

        <div class="message-history-content">
            <router-view></router-view>
        </div>
        
       
    </div>
</template>

<script>
import {
  getAttachmentByListId,
  getAllWorkFlowTasks
} from "@/services/notificationsService";
export default {
    name:'MessageHistory',

    data(){
        return {
            files:[]
        }
    },
    methods:{
         refreshAllWorkFlowTasks(){
            let filter=[{property:"listid",value:this.listId,operator:"eq"}];
            this.notiParams.filter = JSON.stringify(filter);
             getAllWorkFlowTasks(this.notiParams).then(res =>{
               
            });
        }
    },
    mounted(){
        this.listId = this.$route.params.listId;
    }

}
</script>

