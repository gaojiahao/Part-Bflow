<template>
  <div class="loadding" v-show="show">
    <Spin></Spin>
  </div>
</template>

<script>

  import { Spin } from 'iview';

  export default {
    name: "Loading",
    components: { Spin },
    data(){
      return{
        show : false
      }
    }
  }
</script>

<style scoped lang="less">
  .loadding { //加载动画
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: #fff;
    z-index: 100;
    .ivu-spin{
        position: absolute;
        top: 50%;
        left: 50%;
    }
  }
</style>
