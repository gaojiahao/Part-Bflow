<style lang="less" scoped>
@import "./notice-common.less";
</style>
<template>
    <div class="msg-comment">
        <div class="msg-comment-title">
            <Icon type="ios-notifications-outline" :size=18 color="#3AA373"/>
            <span v-if="data.sourceContent.type ==='instance'">实例</span>
            <span v-if="data.sourceContent.type ==='list'">应用</span>
            <span>评论点赞</span>
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
                <span v-if="data.sourceContent.type ==='instance'">对实例 </span>
                <span v-if="data.sourceContent.type ==='list'">对应用</span>
                <span v-if="data.sourceContent.type ==='instance'" class="notice-relationKey">{{data.sourceContent.relationKey}}</span>
                的评论发表了态度: 
                <Icon type="md-thumbs-up" size=18  color='#FF5722'/>
                <div  class="notice-container-comment" >
                    <div class="notice-container-comment-content">
                            <span class="notice-creator">@{{data.sourceContent.creator}}</span>:
                        <span v-html="data.tempContent"></span>
                    </div>
                </div> 
            </span>
        </div>

        <div class="msg-comment-href">
            <a @click="handleViewDetail">详情 <Icon class="fr" type="ios-arrow-forward" /></a>
        </div>
    </div>
</template>

<script>
export default {
    name:'praiseNoticeTpl',
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
       
    },
    beforeMount(){
    },
}
</script>
