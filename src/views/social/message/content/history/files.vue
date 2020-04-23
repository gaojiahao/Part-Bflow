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
    }
}
.isMySelf{
    color: #2d8cf0;
}
</style>
<template>
    <div class="files compactscrollbar" id="fileHistory">
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
        <div class="files-header">
            <span>
                类型
                <Icon type="ios-arrow-down" />
                <Icon type="ios-arrow-up" />
            </span>
            <span>
                名称
            </span>
            <span>
                大小
            </span>
            <span>
                来源
            </span>
            <span>
                时间
            </span>
        </div>
        <div class="files-item" v-for="(m,index) in msgs" :key="index">
            <div class="files-item-content">
                 <img class="flie-img" width="38" :src="m.content|filedTypeFilter">
                      <div class="file-content-info">
                        <p>
                        <a :href="'/H_roleplay-si/ds/downloadById?id='+m.id">{{m.content}}</a>
                        </p>
                        <p>
                        {{m.size}}|{{m.creatorName}}
                        </p>
                      </div>
            </div>
        </div>
    </div>
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
            pageParam:{
                page:1,
                limit:30
            },
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
            getMessagesByImType({
                 ...this.pageParam,
                groupId:this.$route.params.groupId,
                imType:4
            }).then(res=>{
                console.log(res);
                this.msgs = res;
            });
        }
    },
    mounted(){
        // this.listId = this.$route.params.listId;
        // this.refreshFiles();
        this.handleScroll();
        this.init();
    }
}
</script>

