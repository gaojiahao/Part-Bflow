<style lang="less" scoped>
@import "./files.less";
</style>
<template>
    <ul class="files messagescrollbar">
        <li v-for="(file,index) in files" :key="index" class="files-item">
            <img width="40" :src="'resources/images/file/'+ file.icon" >

            <div  style="display: inline-table;vertical-align: top;line-height: 22px;">
                <div >{{file.attachmentName}} </div>
                <div >{{file.creatorName}}</div>
            </div>
                <div  style="display: inline-table;vertical-align: top;line-height: 22px;float: right;">
                <div >{{file.crtTime}}</div>
            </div>
        </li>
    </ul>
</template>

<script>
import {
  getAttachmentByListId
} from "@/services/notificationsService";
export default {
    name:'Files',
    data(){
        return {
            files:[],
            listId:''
        }
    },
     methods:{
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

                this.files.map((file)=>{
                    if(/.jpg|.png|.PNG/.test(file.attachmentName)){
                        file.icon = 'word.png';
                    }

                    if(/.xlsx/.test(file.attachmentName)){
                        file.icon = 'excel.png';
                    }

                    if(/.docx/.test(file.attachmentName)){
                        file.icon = 'word.png';
                    }

                    if(/.txt/.test(file.attachmentName)){
                        file.icon = 'word.png';
                    }

                    if(!file.icon){
                        file.icon = 'word.png';
                    }
                });
            });
        },
    },
    mounted(){
        this.listId = this.$route.params.listId;
        this.refreshFiles();
    }
}
</script>

