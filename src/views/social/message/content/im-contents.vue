<template>
    <div>
        <div v-for="(m,index) in  messages" :key="index">
            {{m.content}}

            <!-- 文本消息组件 -->
            <!-- 图片消息组件 -->
            <!-- 文件消息组件 -->
        </div>
    </div>
</template>

<script>

import {getMessagesByGroupId} from "@/services/imService";
export default {
    name:'imContents',
    data(){
        return {
            messages:[]
        }
    },
    watch:{
        groupId:function (val, oldVal) {
            this.getMessages();
        },
    },
    props:{
        groupId:{
            type:String,
            default:function(){
                return '';
            }
        },
    },
    methods:{
        getMessages(){
            getMessagesByGroupId(this.groupId).then(res=>{
                this.messages = res;
            });
        }
    },
    mounted(){
        this.getMessages();
    }
}
</script>