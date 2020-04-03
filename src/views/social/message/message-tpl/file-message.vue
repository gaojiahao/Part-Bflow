<style lang="less" scoped>
  .file-message{
    margin: 15px 0px;
    .file-content{
      background-color: #eee;
      padding: 5px;
      margin: 5px;
      border-radius: 4px;
    }
    .file-creator{
      margin: 0px 0px 5px 5px;
    }
  }
</style>
<template>
    <div class="file-message">
        <p class="file-creator">{{ fileMessage.creator }}</p>
        <span class="file-content">文件消息组件开发</span>
    </div>
</template>

<script>
export default {
    name:'FileMessage',
    data(){
        return {
           
        }
    },
    props:{
        fileMessage:{
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