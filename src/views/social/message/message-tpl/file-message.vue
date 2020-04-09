<style lang="less" scoped>
  .file-message{
    margin: 15px 0px;
    .file-content{
      padding: 5px 10px;
      margin: 5px;
      width: 40%;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      &-right{
        img{
          width: 50px;
        }
      }
    }
    .file-creator{
      margin: 0px 0px 5px 5px;
    }
    .file-crtTime{
      color: #afaaaa;
      font-size: 10px;
      margin-left: 2px;
    }
  }
</style>
<template>
    <div class="file-message">
        <div class="file-creator">
          <span v-if="!fileMessage.isMySelf">{{ fileMessage.creatorName }}</span>
          <span 
            :style="{visibility:showTime?'visible':'hidden'}" 
            class="file-crtTime">
            {{ fileMessage.crtTime }}
          </span>
        </div>
        <div 
          @mouseenter="enter"
          @mouseleave="leave"
          class="file-content" 
          @click="downLoadfile('/H_roleplay-si/ds/download?url=/61de1662-6f15-4583-9a72-7f634a443d59/5d54d1bf-26bc-424c-8526-c6e0e09a70fb.xlsx')">
          <div class="file-content-left">
            <span>用户1</span>
            <p>13k</p>
          </div>
          <div class="file-content-right">
            <img src="resources/images/file/all.png" />
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'FileMessage',
    data(){
        return {
           showTime: false
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
        downLoadfile(url) {
            window.open(url);
        },
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