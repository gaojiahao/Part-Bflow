<style lang="less" scoped>
@import "./notifications.less";
@import "./notifilist.less";
</style>
<template>
    <div class="msg-comment">
        <div class="msg-comment-title">
            <Icon type="ios-notifications-outline" :size=18 color="#3AA373"/>
            <span v-if="data.sourceContent.type ==='instance'">
                实例
            </span>
                <span v-if="data.sourceContent.type ==='list'">
                应用
            </span>
            <span>评论</span>
            <span v-if="data.noticeSource.includes('commentRelpy')">回复</span>
            <span>通知</span>
        </div>

        <div class="msg-comment-content">

            <span 
                class="notice-creator"
                v-if="data.sourceContent.type=='list' || data.sourceContent.type ==='instance'">
                {{data.creatorName}}
            </span>
            :
            <span v-if="data.sourceContent.type ==='instance' || data.sourceContent.type ==='list'">
                <template v-if="data.noticeSource.includes('commentRelpy')">
                   发表了评论:
                   <span  class="notice-container" v-html="data.tempContent"></span>
                    <div class="notice-container-relpy">
                        <div class="notice-container-relpy-content">
                            <span class="notice-creator">@{{data.sourceContent.objCreator}}</span>:
                            <span v-if="data.sourceContent.type ==='instance'" class="notice-relationKey">{{data.sourceContent.relationKey}}</span>:
                            <span  class="notice-container" v-html="data.sourceContent.objContent"></span>
                        </div>
                    </div>
                </template>

                <template v-else>
                    <span v-if="data.sourceContent.type ==='instance'">对实例 </span>
                     <span v-if="data.sourceContent.type ==='list'">对应用</span>
                    <span v-if="data.sourceContent.type ==='instance'" class="notice-relationKey">{{data.sourceContent.relationKey}}</span>
                    发表了评论
                    <div  class="notice-container-comment" >
                        <div class="notice-container-comment-content">
                            <span v-html="data.tempContent"></span>
                        </div>
                    </div> 
                </template>
            </span>
        </div>

        <div class="msg-comment-href">
            <a @click="handleViewDetail">详情 <Icon class="fr" type="ios-arrow-forward" /></a>
        </div>
    </div>
</template>

<script>
export default {
    name:'commentNoticeTpl',
    props:{
        data:{}
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
