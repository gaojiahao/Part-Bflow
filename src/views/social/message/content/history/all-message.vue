<style lang="less" scoped>
.all-message{
    height: 100%;
    overflow-y: auto;

    &-item{
        margin: 18px 15px;
        word-wrap: break-word;

        /deep/ .paste-img{
            width: 100px;
        }

         /deep/ .file-content{
                display: inline-block;
                cursor: pointer;
                width: 200px;
                border: 1px solid #ddd;
                border-radius: 3px;
                padding: 5px;
                margin: 3px;
                background-color: white;

                &-info{
                    display: inline-table;
                    vertical-align: top;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    p{
                    width: 145px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    }
                }
            }   
    }
}
.isMySelf{
    color: #2d8cf0;
}
</style>
<template>
    <div class="all-message compactscrollbar" ref="allMessage">
        <div class="all-message-item" v-for="(m,index) in msgs" :key="index">
            <div class="font12" v-bind:class="{isMySelf:m.isMySelf}">{{m.creatorName}} {{m.crtTime}}</div>
            <div class="all-mess-item-content">
                <p v-html="m.content"></p>
            </div>
        </div>
    </div>
</template>

<script>
import {
  getMessagesByGroupId
} from "@/services/imService";
export default {
    name:'allMessage',
    data(){
        return {
            msgs:[],
            pageParam:{
                start:1,
                limit:30
            },
            allLoad:false
        }
    },
     watch: {
        $route(to, from) {
            this.getMessages();
        }
    },
    methods:{
         getMessages(){
            getMessagesByGroupId({
                ...this.pageParam,
                groupId:this.$route.params.groupId
            }).then(res=>{
                if(res.length<this.pageParam.limit){
                    this.allLoad = true;
                }
                this.msgs.unshift(...res);
            });
        },
        initEvents(){
            var that= this;
            this.$refs.allMessage.addEventListener('scroll', function() {
                if(arguments[0].target.scrollTop===0 && !that.allLoad){
                    that.pageParam.start++;
                    that.getMessages();
                }
            });
        },
        scrollToBottom(){
            this.$nextTick(() => {
                if(this.pageParam.start===1){
                this.$refs.allMessage.scrollTop  = this.$refs.allMessage.scrollHeight;
                }else{
                this.$refs.allMessage.scrollTop  = 200;
                }
            });
        }
    },
    mounted(){
        this.getMessages();
        this.initEvents();
    },
     updated(){
        this.scrollToBottom();
    }
}
</script>