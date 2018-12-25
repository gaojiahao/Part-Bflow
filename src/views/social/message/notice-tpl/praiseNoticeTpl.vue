<style lang="less" scoped>
@import "./notice-common.less";
</style>
<template>
    <div class="message-container" v-bind:class="{'noticefromme':data.creatorName===$currentUser.nickname}">
        <div>{{data.crtTime}}</div>
        <div class="message-container-content">
            <span 
                class="notice-creator">
                {{data.creatorName}}
            </span>
            :
            <span>
                <span v-if="data.sourceContent.type ==='instance'">对实例 </span>
                <span v-if="data.sourceContent.type ==='list'">对应用</span>
                <a v-if="data.sourceContent.type ==='instance'" class="notice-relationKey" @click="handleViewDetail">{{data.sourceContent.relationKey}}</a>
                的评论发表了态度
                <Icon type="md-thumbs-up" size=18  color='#FF5722'/>
                <div  class="notice-container-comment" >
                    <div class="notice-container-comment-content">
                    <span class="notice-creator">@{{data.sourceContent.creator}}</span>:
                    <span v-html="data.tempContent"></span>

                    <div class="notice-comment-images">
                        <div 
                            class="comimg"
                            v-for="(c,index) in data.sourceContent.attachment" 
                            :key="index" 
                            v-if="c.type==='image'">
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
                        <p  v-for="(f,index) in data.sourceContent.attachment" 
                            :key="index"   
                            v-if="f.type==='file'" >
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
    methods:{
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
