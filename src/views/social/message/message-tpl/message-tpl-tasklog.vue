<template>
    <div class="log-container">
       <div class="log-time">{{ content.crtTime }}</div>
       <div class="log-list">
         <span class="list-left">
           <Icon type="md-notifications" />
         </span>
         <div class="list-right">
           <b>日志提交提醒</b>
          <p>工作一天辛苦啦，记得提交日志哦！</p>
         </div>
       </div>
    </div>
</template>

<script>
export default {
    name: "MessageTplTasklog",
    props:{
        msg:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            content: {}
        }
    },
    created:function(){
       try{
            let json = JSON.parse(this.msg.content);
            this.content = json.content;
        }catch(e){
            console.log('msg content parse error',this.msg.content);
        }
    },
     methods:{
     }
}
</script>
<style lang="less" scoped>
.log-container{
  margin: 10px;
  width: 50%;
  margin: 0 auto;
  .log-list{
    border: 1px solid #ddd;
    padding: 10px;
    background-color: #fff;
    border-radius: 2px;
    text-align: left;
    display: flex;
    align-items: center;
    .list-left{
      margin-right: 10px;
      padding: 3px;
      font-size: 18px;
      color: #fff;
      border-radius: 50%;
      background-color: #f90;
      line-height: 20px;
      text-align: center;
      width: 26px;
      height: 26px;
    }
    .list-right{
      b{
        color: #333;
      }
      p{
        font-size: 12px;
        color: #333;
      }
    }
  }
}
</style>
