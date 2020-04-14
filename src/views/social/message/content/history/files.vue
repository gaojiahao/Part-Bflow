<style lang="less" scoped>
@import "./files.less";
.all-message{
    height: 100%;
    overflow-y: auto;

    &-item{
        margin: 18px 15px;
        word-wrap: break-word;

        /deep/ .paste-img{
            width: 100px;
        }

         /deep/ .file-content{
                display: inline-block;
                cursor: pointer;
                width: 200px;
                border: 1px solid #ddd;
                border-radius: 3px;
                padding: 5px;
                margin: 3px;
                background-color: white;

                &-info{
                    display: inline-table;
                    vertical-align: top;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    p{
                    width: 145px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    }
                }
            }   

        &-content{
            
        }
    }
}
.isMySelf{
    color: #2d8cf0;
}
</style>
<template>
    <ul class="files messagescrollbar" id="fileHistory">
        <!-- <li v-for="(file,index) in files" :key="index" class="files-item">
            <img width="40" :src="'resources/images/file/'+ file.icon" >

            <div  style="display: inline-table;vertical-align: top;line-height: 22px;">
                <div ><a @click="downLoadfiles(file.attachment)">{{file.attachmentName}} </a></div>
                <div >{{file.creatorName}}</div>
            </div>
                <div  style="display: inline-table;vertical-align: top;line-height: 22px;float: right;">
                <div >{{file.crtTime}}</div>
            </div>
        </li> -->
        <div class="all-message-item" v-for="(m,index) in msgs" :key="index">
            <div class="font12" v-bind:class="{isMySelf:m.isMySelf}">{{m.creatorName}} {{m.crtTime}}</div>
            <div class="all-mess-item-content">
                <p v-html="m.content"></p>
            </div>
        </div>
    </ul>
</template>

<script>
import {
  getAttachmentByListId
} from "@/services/notificationsService";
import { getMessagesByImType } from "@/services/imService";
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
            },
            msgs:[]
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
        },

        init(){
            getMessagesByImType(this.$route.params.groupId,2).then(res=>{
                console.log(res);
                this.msgs = res;
            });
        }
    },
    mounted(){
        this.listId = this.$route.params.listId;
        this.refreshFiles();
        this.handleScroll();
        this.init();
    }
}
</script>

