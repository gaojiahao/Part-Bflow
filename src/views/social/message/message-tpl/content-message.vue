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
        <Poptip 
            disabled
            :ref="textMessage.id"
            width="100%"
            placement="bottom-start" 
            @on-popper-show="onPopperShow"
            @on-popper-hide="onPopperHide">
            <span 
              :class="{'text-content':true}"
              @mouseenter="enter"
              @mouseleave="leave"
              v-click-outside="onClickOutside"
              @contextmenu.prevent="showContextmenu(textMessage,$event)"
              :style="{backgroundColor:textMessage.isMySelf?'rgb(191, 221, 255)':'#eee'}">
              <span :ref="`content${textMessage.id}`" v-html="textMessage.content"></span>
            </span>
            <div slot="content" :style="{width:'100px'}" @click="hiddenPop(textMessage)">
                <p class="menu-list" @click="copyMessage(textMessage,$event)">复制</p>
                <p class="menu-list" @click="replyMessage(textMessage,$event)">回复</p>
            </div>
        </Poptip>
    </div>
</template>

<script>
import Bus from "@/assets/eventBus.js";
import * as vClickOutside from 'v-click-outside-x';
export default {
    name:'ContentMessage',
    directives: {
      clickOutside: vClickOutside.directive,
    },
    data(){
        return {
           showTime: false,
           isDisabled: true
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
        onPopperShow() {
            this.isDisabled = true;
        },
        onPopperHide() {
            this.isDisabled = false;
        },
        openMessageDetail() {
          this.$emit('showDetailModal', this.textMessage);
        },
        copyMessage(text,e) {
          this.$refs[text.id].visible = false;
          let input = document.createElement('input');
            input.value = this.$refs[`content${text.id}`].innerText;
            document.body.appendChild(input);
            input.select();
            if(document.execCommand("Copy")){
                document.execCommand("Copy"); // 执行浏览器复制命令
            }else{
                this.$Message.error('无法复制！');
            }
            
            input.remove()
        },
        replyMessage(text) {
          Bus.$emit('setLinkMember',{
            name:`@${text.creatorName}&nbsp;`,
            value:`<div style="
                    -webkit-user-modify: read-only;
                    color:#999;
                    font-size:12px;
                    border-left:3px solid #ddd;
                    padding:3px">
                    <span>${text.creatorName}：</span>
                    <p>${text.content}</p>
                  </div>`
          });
        },
        showContextmenu(text,e) {
          let me = this;
          this.$refs[text.id].visible = true;
          this.outClickText = text;
          this.$refs[`content${text.id}`].style.backgroundColor = '#39f';
          this.$refs[`content${text.id}`].style.color = '#fff';
        }
    },
    mounted(){
        
    }
}
</script>