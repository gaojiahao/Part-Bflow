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
              v-click-outside="onClickOutside"
             >
             <!--  :style="{backgroundColor:msg.isMySelf?'rgb(191, 221, 255)':'#eee'}" -->
               
                <div @click="goTop(msg.replayMsg.id)" v-if="msg.replayMsg" class="replayMsg" style="border-left: 3px solid #999;padding:0 8px;cursor: pointer;">
                  <div>{{msg.replayMsg.creatorName}}:</div>
                  <span v-if="msg.replayMsg.imType===1" v-html="msg.replayMsg.content"></span>

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

            
                <span v-if="msg.imType===1" v-html="msg.content"></span>

                <span v-if="[2,3,4].includes(msg.imType)" >
                  <span v-for="(c,index) in msg.content" :key="index">
                    <span v-if="c.imType===1" v-html="c.content"></span>
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
              <!-- <span :ref="`content${msg.id}`" >
            </span> -->
             <!-- @contextmenu.prevent="showContextmenu(msg,$event)" -->
            <!-- <Poptip 
            disabled
            :ref="msg.id"
            width="100%"
            placement="bottom-start" > -->
            <!-- <div slot="content" :style="{width:'100px'}" @click="hiddenPop(msg)">
                <p class="menu-list" @click="copyMessage(msg,$event)">复制</p>
                <p class="menu-list" @click="replyMessage(msg,$event)">回复</p>
            </div>
        </Poptip> -->
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
        var msgDiv = document.getElementById(id)
        if(msgDiv){
          msgDiv.style.backgroundColor = '#f9b24757';
          setTimeout(() => {
            msgDiv.style.backgroundColor = '';
          }, 2000);
          msgDiv.scrollIntoView(true);
        }else{
           Bus.$emit('toMessage',id)
        }
      },
      onDropItemClick(){

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
        },
        showContextmenu(text,e) {

            this.$refs.contextMenu.$refs.reference = event.target;
            this.$refs.contextMenu.currentVisible = !this.$refs.contextMenu.currentVisible;
            
          // let me = this;
          // this.$refs[text.id].visible = true;
          // this.outClickText = text;
          // this.$refs[`content${text.id}`].style.backgroundColor = '#39f';
          // this.$refs[`content${text.id}`].style.color = '#fff';
        }
    },
    mounted(){
        
    }
}
</script>