<style lang="less" scoped>
@import "./images.less";
</style>

<template>
    <div id="imgHistory" class="img">
        <div v-for="(img,index) in images" :key="index" class="comimg" >
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
         <Modal title="查看图片" v-model="imgModalVisible" width="50%">
            <img 
                :src="imgName" 
                v-if="imgModalVisible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
import {
  getAttachmentByListId
} from "@/services/notificationsService";
export default {
    name:'Images',
    data(){
        return {
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
            this.imgName = img;
            this.imgModalVisible = true;
        },
    },
    mounted(){
        this.listId = this.$route.params.listId;
        this.refreshImages();
        this.handleScroll();
    }
}
</script>

