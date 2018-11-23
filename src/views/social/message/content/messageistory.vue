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
    name:'Messageistory',

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
        },
        //请求文档附件
        refreshFiles(){
           let params = { 
                page:1,
                limit:100,
                listId:this.listId,
                type:'file'
            };

            getAttachmentByListId(params).then(res =>{
                this.files = res.tableContent;
            });
        },
        //请求图片
        refreshImages(){
            let params = { 
                page:1,
                limit:10,
                listId:this.listId,
                type:'image'
            };

            getAttachmentByListId(params).then(res =>{
                this.images = res.tableContent;
            });
        },
      
        handleViewImg:function (img) {
            this.imgName = img;
            this.imgModalVisible = true;
        },
    },
    mounted(){
        this.listId = this.$route.params.listId;
        // this.refreshFiles();
        // this.refreshImages();
    }

}
</script>

