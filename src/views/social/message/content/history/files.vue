<style lang="less" scoped>
@import "./files.less";
</style>
<template>
    <ul class="files messagescrollbar" id="fileHistory">
        <li v-for="(file,index) in files" :key="index" class="files-item">
            <img width="40" :src="'resources/images/file/'+ file.icon" >

            <div  style="display: inline-table;vertical-align: top;line-height: 22px;">
                <div ><a @click="downLoadfiles(file.attachment)">{{file.attachmentName}} </a></div>
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
            isRolling: false,
            files:[],
            listId:'',
            wordParams: { 
                page:1,
                limit:20,
                total: 0,
                listId:this.$route.params.listId,
                type:'file'
            }
        }
    },
     methods:{
         //滚动加载
        handleScroll () {
            let scrollDiv = document.getElementById('fileHistory'),
                that= this;
            scrollDiv.addEventListener('scroll', function() {
                if(Math.ceil(scrollDiv.clientHeight+scrollDiv.scrollTop) +2 >= scrollDiv.scrollHeight){
                    if(that.wordParams.total > that.files.length){
                        that.wordParams.page++;
                        that.isRolling = true;
                        that.refreshFiles();
                    }
                }
            });
        },
        //请求文档附件
        refreshFiles(){

            getAttachmentByListId(this.wordParams).then(res =>{
                this.wordParams.total = res.dataCount;
                if(this.isRolling){
                    this.files = this.files.concat(...res.tableContent);
                }else{
                    this.files = res.tableContent;
                }

                this.files.map((file)=>{
                    if(/.jpg|.png|.PNG/.test(file.attachmentName)){
                        file.icon = 'image.png';
                    }

                    if(/.xlsx/.test(file.attachmentName)){
                        file.icon = 'excel.png';
                    }

                    if(/.docx/.test(file.attachmentName)){
                        file.icon = 'word.png';
                    }

                    if(/.txt/.test(file.attachmentName)){
                        file.icon = 'txt.png';
                    }

                    if(!file.icon){
                        file.icon = 'word.png';
                    }
                });
            });
        },
        downLoadfiles(url) {
            window.open(url);
        }
    },
    mounted(){
        this.listId = this.$route.params.listId;
        this.refreshFiles();
        this.handleScroll();
    }
}
</script>

