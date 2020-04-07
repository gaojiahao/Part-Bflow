<style lang="less" scoped>
  @import "./content-message.less";
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
          <span
            v-else
            class="message-read" 
            @click="openMessageDetail"
            :style="{color:'#8bc8da',cursor:'pointer',borderColor: '#8bc8da'}">
            {{ textMessage.checked }}
          </span>
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
        },
        openMessageDetail() {
          this.$emit('showDetailModal', this.textMessage);
        }
    },
    mounted(){
        
    }
}
</script>