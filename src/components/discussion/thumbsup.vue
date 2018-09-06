<style lang="less">
    @import "./thumbsup.less";
</style>
<template>
    <div class="thumbsup">
        <span v-if="comment.praises.length>0" >
            <Icon 
            type="ios-arrow-down" 
            size=18 
            @click.native="handlerShowThumbsUpInfo"  />
        </span>
        <span v-bind:class="{ 'comment-isPraise': comment.isPraise }">
            <Icon 
            type="md-thumbs-up" 
            size=18  
            @click.native="handleThumbsUp"/>
            {{comment.praises.length}}
        </span>
    </div>
</template>

<script>
import { commentThumbsUp,getCommentThumbaUps} from "@/services/appService.js";
export default {
    name:'thumbsup',
    props:{
        comment:{
            type:Object,
            default:function () {
                return {}
            }
        }
    },
    data(){
        return {
        };
    },
    methods: {
        handlerShowThumbsUpInfo:function () {
            this.$forceUpdate();
            // this.comments.map(c=>{
            //     (c.id != comment.id) && (c.showPraises = false);
            //     comment.showReply = false;
            // });
            // this.$parent.$forceUpdate();
            this.comment.showPraises = !this.comment.showPraises;

            // this.refreshThumbaUps();
        },
        handleThumbsUp:function () {
            let commentId = this.tempComment.id;
            commentThumbsUp({commentId:commentId}).then(res=>{
                if(!res.success){
                    this.$Notice.warning({
                        title: '系统提示',
                        desc: res.message
                    });
                    return;
                }

            this.refreshThumbaUps();
                
            });
        },

        refreshThumbaUps:function () {
            let params = {
                commentId:this.tempComment.id,  
                limit:50, 
                page:1, 
                sort:[{property:"crtTime",direction:"DESC"}]
            }

            this.tempComment.isPraise = true;
            getCommentThumbaUps(params).then(res=>{
                this.comment.praises = res.tableContent;
            });
        }
    },
    mounted(){
        
    },
    created(){
    }
}
</script>

