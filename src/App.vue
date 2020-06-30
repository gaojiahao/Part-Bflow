<template>
  <div id="main" class="app-main">
    <router-view/>
    <Modal class="imgModal" v-model="imgModal.imgModalVisible" :fullscreen="imgModal.fullscreenVisible" :closable='false' footer-hide>
          <div slot="header" class="imgModal-hedaer">
              <div class="imgModal-hedaer-title">图片预览</div>
              <div class="imgModal-hedaer-tools">
                <Icon type="ios-square-outline" size="18"  v-if="!imgModal.fullscreenVisible" @click="imgModal.fullscreenVisible=true"/>
                <Icon type="ios-photos-outline" size="18" v-if="imgModal.fullscreenVisible" @click="imgModal.fullscreenVisible=false"/>
                <Icon type="md-close"  size="18"  @click="imgModal.imgModalVisible=false"/>
              </div>
          </div>
        <img 
            :src="imgModal.imgUrl" 
            v-if="imgModal.imgModalVisible" style="width: 100%;margin-top: 20px;">
    </Modal>
  </div>

  
  
</template>

<script>
export default {
  name: 'App',
  data () {
      return {
          imgModal: {
            imgModalVisible:false,
            fullscreenVisible:false,
            imgUrl:''
          }
      }
  },
  methods: {
    showImgModal(url){
      this.imgModal.imgUrl = url;
      this.fullscreenVisible = false;
      this.imgModal.imgModalVisible = true;
    }
  },
  created(){
    var Vue = this.$parent.constructor;
    Vue.prototype.getApp= ()=> this;
  }
}
</script>

<style>

html,body{
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
}
.app-main{
    width: 100%;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
}
</style>

<style lang="less" scoped>
.imgModal{
    max-width: 80%;
    min-width: 60%;
    /deep/ .ivu-modal-header{
      background-color: white;
      border-bottom: 1px solid #ddd !important;
    }
    &-hedaer{
        display: flex;
        color: #444;
        &-title{
            flex: 1;
            text-align: right;
        }
        &-tools{
            flex: 1;
            text-align: right;
            i{
                cursor: pointer;
            }
        }
    }
}
</style>
