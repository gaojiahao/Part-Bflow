<style lang="less" scoped>
  .text-message{
    margin: 15px 0px;
    .text-content{
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
    <div class="text-message" :style="{textAlign: textMessage.isMySelf?'right':'left'}">
        <p class="text-creator" v-if="!textMessage.isMySelf">{{ textMessage.creator }}</p>
        <span 
          class="text-content" 
          :style="{backgroundColor:textMessage.isMySelf?'rgb(229, 243, 237)':'#eee'}" 
          v-html="textMessage.content">
        </span>
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