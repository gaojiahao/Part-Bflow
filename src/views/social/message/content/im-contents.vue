<template>
    <div>
        <div v-for="(m,index) in  messages" :key="index">
            <!-- 消息组件 -->
            <content-message :textMessage="m"></content-message>
            <!-- 文件消息组件 -->
        </div>
    </div>
</template>

<script>

import {getMessagesByGroupId} from "@/services/imService";
import ContentMessage from "../message-tpl/content-message";
export default {
    name:'imContents',
    components:{
        ContentMessage
    },
    data(){
        return {
            messages:[]
        }
    },
    watch:{
        groupId:function (val, oldVal) {
            this.getMessages();
        }
    },
    props:{
        groupId:{
            type:String,
            default:function(){
                return '';
            }
        }
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