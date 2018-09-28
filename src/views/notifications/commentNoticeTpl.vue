<template>
    <div class="msg-comment">
        <div class="msg-comment-title">
            <Icon type="ios-notifications-outline" :size=18 color="#3AA373"/>
            <span v-if="data.noticeSource=='praise'">评论点赞通知</span>
            <span v-if="( data.noticeSource.includes('commentlist') || data.noticeSource.includes('subscribe'))">应用评论通知</span>
            
            <span v-if="data.noticeSource=='replyComment'">评论回复通知</span>
            <span v-if="data.noticeSource=='instanceComment'">实例评论通知</span>
        </div>
        <div class="msg-comment-content">
            <span v-if="data.noticeSource=='commentlist'">@{{data.creatorName}}发表评论:</span>
            <span v-if="data.noticeSource=='replyComment'">@{{data.creatorName}}回复了您:</span>
            <p v-if="data.noticeSource=='praise'">{{data.creatorName}}:对你的评论发表了态度
               <span> <Icon type="md-thumbs-up" color="#FF5722" /></span>
            </p>
            <span v-if="data.noticeSource=='praise'">@我</span>
            <div style="display: -webkit-inline-box;padding: 5px;border-radius: 5px;" v-html="data.tempContent"></div>
        </div>
        <div class="msg-comment-href">
            <a>详情 <Icon class="fr" type="ios-arrow-forward" /></a>
        </div>
    </div>
</template>

<script>
export default {
    name:'commentNoticeTpl',
    props:{
        data:{}
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
