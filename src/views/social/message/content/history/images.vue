<style lang="less" scoped>
@import "./images.less";
</style>

<template>
    <div id="imgHistory" class="imgs compactscrollbar">
        <div v-for="(img,index) in images" :key="index" class="comimg" >
            <img 
            width="100"
            :src="'/H_roleplay-si/ds/downloadById?id='+img.attrId" 
            >
             <Icon 
                title="查看图片"
                type="ios-eye-outline" 
                @click.native="handleViewImg(img.attrId)">
                </Icon>
            <div class="comimg-cover" @click="goTop(img.id)">
                <div class="comimg-cover-text">查看源消息</div>
            </div>
        </div>
         <Modal class="imgModal" v-model="imgModalVisible" width="50%" footer-hide>
            <img 
                :src="imgName" 
                v-if="imgModalVisible" style="width: 100%;margin-top: 20px;">
        </Modal>
    </div>
</template>

<script>
import {
  getAttachmentByListId
} from "@/services/notificationsService";
import { getMessagesByImType } from "@/services/imService";
import Bus from "@/assets/eventBus.js";
export default {
    name:'Images',
    data(){
        return {
            pageParam:{
                page:1,
                limit:30
            },
            images:[],
            imgName:'',
            imgModalVisible:false,
            isRolling: false,
            listId:'',
            imgParams: { 
                page:1,
                limit:100,
                total: 0,
                listId:this.$route.params.listId,
                type:'image'
            }
        };
    },
    methods:{
        goTop(id){
        Bus.$emit('toMessage',id);
        },
        //滚动加载
        handleScroll () {
            let scrollDiv = document.getElementById('imgHistory'),
                that= this;
            scrollDiv.addEventListener('scroll', function() {
                if(Math.ceil(scrollDiv.clientHeight+scrollDiv.scrollTop) +2 >= scrollDiv.scrollHeight){
                    if(that.imgParams.total > that.images.length){
                        that.imgParams.page++;
                        that.isRolling = true;
                        that.refreshImages();
                    }
                }
            });
        },
        //请求图片
        refreshImages(){
            getAttachmentByListId(this.imgParams).then(res =>{
                this.imgParams.total = res.dataCount;
                if(this.isRolling){
                    this.images = this.images.concat(...res.tableContent);
                }else{
                    this.images = res.tableContent;
                }
            });
        },
      
        handleViewImg:function (img) {
            this.imgName = '/H_roleplay-si/ds/downloadById?id='+img;
            this.imgModalVisible = true;
        },
         init(){
            getMessagesByImType({
                 ...this.pageParam,
                groupId:this.$route.params.groupId,
                imType:2
            }).then(res=>{
                console.log(res);
                this.images = res;
            });
        }
    },
    mounted(){
        this.init();
        // this.listId = this.$route.params.listId;
        // this.refreshImages();
        // this.handleScroll();
    }
}
</script>

