<style lang="less" scoped>
@import "./notice-common.less";

</style>
<template>
    
    <div class="message-container" v-bind:class="{'noticefromme':data.creatorName===$currentUser.nickname}">
        <div>{{data.crtTime}}</div>
        <div >
            <template v-if="data.sourceContent.objContent || data.sourceContent.objAttachment">
                
                <div class="message-container-content">
                    <div class="message-container-creator" >
                        <span class="notice-creator">{{data.creatorName}}</span>
                        回复了
                        <span v-if="data.sourceContent.type ==='instance'">实例</span>
                        <span v-if="data.sourceContent.type ==='list'">应用</span>
                        的评论:
                    </div>
                    <span  class="notice-container" v-html="data.tempContent"></span>
                    <div class="notice-container-relpy">
                        <div class="notice-container-relpy-content">
                            <span class="notice-creator">@{{data.sourceContent.objCreator}}</span>:
                            <a v-if="data.sourceContent.type ==='instance'" class="notice-relationKey" @click="handleViewDetail">{{data.sourceContent.relationKey}}</a>:
                            <span  class="notice-container" v-html="data.sourceContent.objContent"></span>
                            <div 
                                class="comimg"
                                v-for="(c,index) in data.sourceContent.objAttachment" 
                                :key="index" 
                                v-if="c.type==='image'">
                                <img 
                                :src="c.attachment?c.attachment:'resources/images/icon/defaultUserPhoto.png'" 
                                >
                                <div class="comimg-cover">
                                    <Icon 
                                    type="ios-eye-outline" 
                                    @click.native="handleViewImg(c.attachment)">
                                    </Icon>
                                </div>
                            </div>
                            <div >
                                <p  v-for="(f,index) in data.sourceContent.objAttachment" 
                                    :key="index"   
                                    v-if="f.type==='file'" >
                                    <a @click="handleViewFile(f)">{{f.name}}
                                    </a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
                  
            </template>
            <template v-else>
                
                <div class="message-container-content">
                    <div class="message-container-creator " >
                    <span class="notice-creator">{{data.creatorName}}:</span>
                    <span v-if="data.sourceContent.type ==='instance'">对实例 </span>
                    <span v-if="data.sourceContent.type ==='list'">对<a @click="handleViewDetail"><strong>应用</strong></a></span>
                    <a v-if="data.sourceContent.type ==='instance'" class="notice-relationKey" @click="handleViewDetail">{{data.sourceContent.relationKey}}</a>
                    发表了评论
                </div>
                    <div  class="notice-content" v-html="data.tempContent" >
                    
                    </div>
                    <div class="notice-comment-images">
                        <div 
                            class="comimg"
                            v-for="(c,index) in data.sourceContent.attachment" 
                            :key="index" 
                            v-if="c.type==='image'">
                            <img 
                            :src="c.attachment?c.attachment:'resources/images/icon/defaultUserPhoto.png'" 
                            >
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
                
            </template>
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
    name:'commentNoticeTpl',
    props:{
        data:{
        }
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
        // if(this.data.content.indexOf('{')===0){
        //     this.data.content = JSON.parse(this.data.content).content;
        // }
    },
    beforeMount(){
        // this.data.content = JSON.parse(this.data.content).content;
    },
}
</script>
