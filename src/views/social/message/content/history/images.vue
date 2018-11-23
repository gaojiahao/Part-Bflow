<style lang="less" scoped>
@import "./images.less";
</style>

<template>
    <div>
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
            listId:''
        };
    },
    methods:{
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
        this.refreshImages();
    }
}
</script>

