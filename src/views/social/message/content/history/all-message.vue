<style lang="less" scoped>
.all-message{
    height: 100%;
    overflow-y: auto;

    &-item{
        margin: 18px 15px;
        word-wrap: break-word;

        /deep/ img{
            width: 100px;
        }

        &-content{
          
        }
    }
}
.isMySelf{
    color: #2d8cf0;
}
</style>
<template>
    <div class="all-message messagescrollbar">
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
            msgs:[]
        }
    },
     watch: {
        $route(to, from) {
            this.init();
        }
    },
    methods:{
         init(){
            getMessagesByGroupId(this.$route.params.groupId).then(res=>{
                this.msgs = res;
            });
        }
    },
    mounted(){
        this.init();
    }
}
</script>