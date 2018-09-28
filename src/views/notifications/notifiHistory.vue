<template>
    <div>
        <Tabs>
            <TabPane label="文档">
                <div v-for="(file,index) in files" :key="index">
                    
                    <a>{{file.attachmentName}}</a>
                </div>
            </TabPane>
            <TabPane label="图片">
                <div v-for="(img,index) in images" :key="index" class="comimg">
                    <img 
                    width="80"
                    :src="img.attachment" 
                    >
                    <div class="comimg-cover">
                        <Icon 
                        type="ios-eye-outline" 
                        @click.native="handleViewImg(img.attachment)">
                        </Icon>
                    </div>
                </div>
            </TabPane>
        </Tabs>

        <Modal title="查看图片" v-model="imgModalVisible">
            <img 
                :src="imgName" 
                v-if="imgModalVisible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
import {
  getAllnotifications,
  readNotice,
  getNavListByMessage,
  getAttachmentByListId,
  getAllWorkFlowTasks
} from "@/services/notificationsService";
export default {
    name:'notifiHistory',
    props:{
        list:'',
        listId:{
            type:String,
            default:''
        },
        expendVisbible:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            images:[],
            imgName:'',
            imgModalVisible:false,
            files:[]
        }
    },
     watch:{
        listId:{
            handler(newValue, oldValue) {
                this.refreshImages();
                this.refreshFiles();
    　　　},
    　　　deep:true
        },
        expendVisbible:{
            handler(newValue, oldValue) {
                this.refreshImages();
                this.refreshFiles();
    　　　},
    　　　deep:true
        },
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
                limit:10,
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
    }

}
</script>

