<style lang="less" scoped>
  .text-message{
    margin: 15px 0px;
    .text-content{
      background-color: #eee;
      padding: 5px;
      margin: 5px;
      border-radius: 4px;
    }
    .text-creator{
      margin: 0px 0px 5px 5px;
    }
  }
</style>
<template>
    <div class="text-message">
        <p class="text-creator">{{ textMessage.creator }}</p>
        <span class="text-content" v-html="textMessage.content"></span>
    </div>
</template>

<script>
export default {
    name:'ContentMessage',
    data(){
        return {
           
        }
    },
    props:{
        textMessage:{
            type: Object,
            default:function(){
                return {};
            }
        }
    },
    methods:{
        
    },
    mounted(){
        
    }
}
</script>