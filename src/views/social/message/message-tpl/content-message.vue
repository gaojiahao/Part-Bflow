<style lang="less" scoped>
  @import "./content-message.less";
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
               
                <div @click="goTop(msg.replayMsg.id)" v-if="msg.replayMsg" class="replayMsg" style="border-left: 3px solid #999;padding:0 8px;cursor: pointer;">
                  <div>{{msg.replayMsg.creatorName}}:</div>
                  <span v-if="msg.replayMsg.imType===1" v-html="formatToEmotion(msg.replayMsg.content)"></span>

                  <span v-if="[2,3,4].includes(msg.replayMsg.imType)" >
                    <span v-for="(r,index) in msg.replayMsg.content" :key="index">
                      <span v-if="r.imType===1" v-html="r.content"></span>
                      <img class="paste-img" v-if="r.imType===2" :src="'/H_roleplay-si/ds/downloadById?id='+r.id" />
                      <br v-if="r.imType===4">
                      <span  contenteditable="false" class="file-content" v-if="r.imType===4" >
                        <img class="flie-img" width="38" :src="r.content|filedTypeFilter">
                        <div class="file-content-info">
                          <p>
                          <a :href="'/H_roleplay-si/ds/downloadById?id='+r.id">{{r.content}}</a>
                          </p>{{r.size}}<p>
                          </p>
                        </div>
                      </span>
                      </span>
                  </span>
                </div>

                <span v-if="msg.imType===1" v-html="formatToEmotion(msg.content)"></span>

                <span v-if="[2,3,4].includes(msg.imType)" >
                  <span v-for="(c,index) in msg.content" :key="index">
                    <span v-if="c.imType===1" v-html="formatToEmotion(c.content)"></span>
                    <img class="paste-img" v-if="c.imType===2" :src="'/H_roleplay-si/ds/downloadById?id='+c.id" />
                    <br v-if="c.imType===4">
                    <span  contenteditable="false" class="file-content" v-if="c.imType===4" >
                      <img class="flie-img" width="38" :src="c.content|filedTypeFilter">
                      <div class="file-content-info">
                        <p>
                        <a :href="'/H_roleplay-si/ds/downloadById?id='+c.id">{{c.content}}</a>
                        </p>{{c.size}}<p>
                        </p>
                      </div>
                    </span>
                    </span>
                </span>
              </span>
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
           showTime: false
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