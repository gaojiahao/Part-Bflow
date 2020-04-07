<style lang="less" scoped>
  .text-message{
    margin: 15px 0px;
    .text-content{
      padding: 10px;
      margin: 5px;
      border-radius: 4px;
      max-width: 80%;
      word-wrap: break-word;
      display: inline-block;
      text-align: left;
      /deep/ .paste-img{
        width: 150px;
      }
    }
    .text-creator{
      margin: 0px 0px 0px 5px;
      .text-crtTime{
        color: #afaaaa;
        font-size: 10px;
        margin: 0px 2px;
      }
    }
    .read-message{
      .message-noread{
        border:2px solid #ddd;
        width: 15px;
        height: 15px;
        display: inline-block;
        border-radius: 50%;
      }
      .message-read, 
      .message-allread
      {
        border:1px solid #ddd;
        width: 15px;
        height: 15px;
        display: inline-block;
        border-radius: 50%;
        font-size: 10px;
        color: #ddd;
        text-align: center;
        line-height: 15px;
      }
    }
  }
</style>
<template>
    <div class="text-message" :style="{textAlign: textMessage.isMySelf?'right':'left'}">
        <div class="text-creator">
          <span v-if="!textMessage.isMySelf">{{ textMessage.creatorName }}</span>
          <span 
            :style="{visibility:showTime?'visible':'hidden'}" 
            class="text-crtTime">
            {{ textMessage.crtTime }}
          </span>
        </div>
        <span class="read-message" v-if="textMessage.isMySelf">
          <span v-if="textMessage.allRead" class="message-allread">✓</span>
          <span v-else-if="textMessage.checked === 0" class="message-noread"></span>
          <span v-else class="message-read">{{ textMessage.checked }}</span>
        </span>
        <span 
          class="text-content"
          @mouseenter="enter"
          @mouseleave="leave" 
          :style="{backgroundColor:textMessage.isMySelf?'rgb(191, 221, 255)':'#eee'}" 
          v-html="textMessage.content">
        </span>
    </div>
</template>

<script>
export default {
    name:'ContentMessage',
    data(){
        return {
           showTime: false
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
        enter() {
          this.showTime = true;
        },
        leave() {
          this.showTime = false;
        }
    },
    mounted(){
        
    }
}
</script>