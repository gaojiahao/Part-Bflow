<style lang="less" scoped>
  @import "./message-tpl-layout.less";
</style>
<template>
    <div class="text-message" :style="{textAlign: msg.isMySelf?'right':'left'}">
      <div class="text-creator">
        <span v-if="!msg.isMySelf">{{ msg.creatorName }}</span>
        <span 
          :style="{visibility:showTime?'visible':'hidden'}" 
          class="text-crtTime">
          {{ msg.crtTime }}
        </span>
      </div>
      <span class="read-message" v-if="msg.isMySelf">
        <span v-if="msg.allRead" class="message-allread">✓</span>
        <span v-else-if="msg.checked === 0" class="message-noread"></span>
        <span
          v-else
          class="message-read" 
          @click="openMessageDetail"
          :style="{color:'#8bc8da',cursor:'pointer',borderColor: '#8bc8da'}">
          {{ msg.checked }}
        </span>
      </span>
      
      <span 
        :id="msg.id"
        :class="{isMySelf:msg.isMySelf}"
        class="text-content"
        @mouseenter="enter"
        @mouseleave="leave"
        @contextmenu.prevent="showContextmenu(msg)"
        v-click-outside="onClickOutside"
        >
          
          <div @click="goTop(msg.replayMsg.id)" v-if="msg.replayMsg" class="replayMsg">
            <div>{{msg.replayMsg.creatorName}}:</div>

            <Text-Message v-if="msg.replayMsg.imType===1" :msg="msg.replayMsg"></Text-Message>
            <Img-Message  v-if="msg.replayMsg.imType===2" :resourceId="msg.replayMsg.content.id"></Img-Message>
            <File-Message  v-if="msg.replayMsg.imType===4" :msg="msg.replayMsg"></File-Message>
            <span v-if="msg.replayMsg.imType===3">
              <span v-for="(r,index) in msg.replayMsg.content" :key="index">
                <Text-Message v-if="r.imType===1" :msg="r"></Text-Message>
                <Img-Message  v-if="r.imType===2" :resourceId="r.content.id"></Img-Message>
                <File-Message  v-if="r.imType===4" :msg="r"></File-Message>
              </span>
           </span>
          </div>

          <Text-Message v-if="msg.imType===1" :msg="msg"></Text-Message>
          <Img-Message  v-if="msg.imType===2" :resourceId="msg.content.id"></Img-Message>
          <File-Message  v-if="msg.imType===4" :file="msg.content"></File-Message>
          <span v-if="msg.imType===3">
            <span v-for="(r,index) in msg.content" :key="index">
              <Text-Message v-if="r.imType===1" :msg="r"></Text-Message>
              <Img-Message  v-if="r.imType===2" :resourceId="r.content.id"></Img-Message>
              <File-Message  v-if="r.imType===4" :msg="r"></File-Message>
            </span>
          </span>
      </span>

        <Modal class="imgModal" v-model="imgModalVisible" width="50%" footer-hide>
            <img 
                :src="imgName" 
                v-if="imgModalVisible" style="width: 100%;margin-top: 20px;">
        </Modal>
    </div>
</template>

<script>
import Bus from "@/assets/eventBus.js";
import * as vClickOutside from 'v-click-outside-x';
import TextMessage from "../message-tpl/text-message";
import ImgMessage from "../message-tpl/img-message";
import FileMessage from "../message-tpl/file-message";
export default {
    name:'ContentMessage',
    directives: {
      clickOutside: vClickOutside.directive,
    },
    components:{
      TextMessage,
      ImgMessage,
      FileMessage
    },
    data(){
        return {
           showTime: false,
           imgName:'',
           imgModalVisible:false
        }
    },
    props:{
        msg:{
            type: Object,
            default:function(){
                return {};
            }
        }
    },
    methods:{
      goTop(id){
        Bus.$emit('toMessage',id);

      },
      showContextmenu(m){
         Bus.$emit('showContextmenu',{
           msg:m,
           e:event
         });
      },
        enter() {
          this.showTime = true;
        },
        leave() {
          this.showTime = false;
        },
        hiddenPop(text) {
          this.$refs[text.id].visible = false;
        },
        onClickOutside() {
          if(this.outClickText){
            if(this.$refs[`content${this.outClickText.id}`]){
              this.$refs[`content${this.outClickText.id}`].style.backgroundColor = '';
              this.$refs[`content${this.outClickText.id}`].style.color = '#333';
            }
          }
        },
        openMessageDetail() {
          this.$emit('showDetailModal', this.msg);
        }
    },
    mounted(){
        
    }
}
</script>