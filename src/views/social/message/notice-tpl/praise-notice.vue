<style lang="less" scoped>
@import "./notice-common.less";
.message-container-content{
    width: auto;
}
.message-pop{
    position: relative;
    .message-pop{
        width: 0; 
        height: 0; 
        border-width: 12px; 
        border-style: solid; 
        border-color: transparent #f0f0f0  transparent transparent; 
        font-size: 0; 
        line-height: 0;
        position: absolute;
        left: -24px;
        top: 10px;
    }
    .message-right{
        border-color: transparent  transparent transparent #B3E5FC;
        left: 100%;
    }
}
.message-photo{
    width: 5%;
    img{
        width: 70%;
        border-radius: 50%;
        border: 1px solid #ddd;
    }
    p{
        text-align: center;
    }
}
</style>
<template>
    <div class="message-container" 
        :class="{'noticefromme':isOwn}" 
        style="overflow:hidden">
        <div 
            :style="{'margin-left':!isOwn?'5%':'none','margin-right':isOwn?'5%':'none'}">
            {{data.crtTime}}
        </div>
        <div class="message-photo" :style="{float:isOwn?'right':'left'}">
            <img 
                @error="imgError" 
                :src="data.photo?data.photo:'resources/images/icon/defaultUserPhoto.png'">
            <p 
                :style="{margin:isOwn?'0px 0px 0px 11px':'0px 11px 0px 0px'}">
                {{ data.creatorName || '未知' }}
            </p>
        </div>
        <div class="message-container-content message-pop" :style="{float:isOwn?'right':'left'}">
            <div :class="{'message-pop':true,'message-right':isOwn}"></div>
            <span>
                <a v-if="data.sourceContent.type ==='instance'" class="notice-relationKey" @click="handleViewDetail">{{data.sourceContent.relationKey}}</a>
                我给你点个赞
                <Icon type="md-thumbs-up" size=18  color='#FF5722'/>
                <div  class="notice-container-comment" >
                    <div class="notice-container-comment-content">
                    <span class="notice-creator">@{{data.sourceContent.creator}}</span>:
                    <span v-html="data.tempContent"></span>

                    <div class="notice-comment-images">
                        <div 
                            class="comimg"
                            v-for="(c,index) in imgArray" 
                            :key="index">
                            <img 
                            :src="c.attachment?c.attachment:'resources/images/icon/defaultUserPhoto.png'" >
                            <div class="comimg-cover">
                                <Icon 
                                type="ios-eye-outline" 
                                @click.native="handleViewImg(c.attachment)">
                                </Icon>
                            </div>
                        </div>
                    </div>

                    <div class="notice-comment-files">
                        <p  v-for="(f,index) in fileArray" 
                            :key="index" >
                            <a @click="handleViewFile(f)">{{f.name}}
                            </a>
                        </p>
                    </div>
                </div>
                </div> 
            </span>
        </div>

         <Modal title="查看图片" v-model="imgModalVisible" width='60%'>
            <img 
                :src="imgName" 
                v-if="imgModalVisible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
export default {
    name:'praiseNoticeTpl',
    props:{
        data:{}
    },
     data(){
        return {
            imgModalVisible:false,
            imgName:''
        }
    },
    computed: {
        isOwn() {
            return  this.data.creatorName === this.$currentUser.nickname;
        },
        imgArray() {
            return this.data.sourceContent.attachment.filter(item => {
                return item.type === 'image';
            })
        },
        fileArray() {
            return this.data.sourceContent.attachment.filter(item => {
                return item.type === 'file';
            })
        }
    },
    methods:{
        imgError() {
            this.data.photo = 'resources/images/icon/defaultUserPhoto.png';
        },
        handleViewDetail:function () {
            let href;
            switch (this.data.sourceContent.type) {
                case 'list':
                    href = '/Site/index.html#appSetting/'+this.data.sourceContent.relationKey;
                    break;
                case 'instance':
                    href = '/Form/index.html?data='+this.data.sourceContent.relationKey;
                    break;
            }

            if(href){
                window.open(href);
            }
        },
        handleViewImg:function (img) {
            this.imgName = img;
            this.imgModalVisible = true;
        },
        handleViewFile:function (file) {
          window.open(file.attachment)  
        }
    },
    mounted(){
       
    },
    beforeMount(){
    },
}
</script>
