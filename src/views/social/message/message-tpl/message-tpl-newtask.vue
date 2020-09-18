<template>
    <div class="new-task">
       <div class="task-list">
         <span class="list-left">
           <Icon type="md-notifications" />
         </span>
         <div class="list-right">
           <b>您有新的任务</b>
           <p>
             <span>{{content.projectName}}</span> /
             <span>{{content.taskName}}</span> /
             <span>{{`${content.startTime}至${content.endTime}`}}</span>
           </p>
         </div>
       </div>
    </div>
</template>

<script>
export default {
    name: "MessageTplNewtask",
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
            this.content = JSON.parse(this.msg.content);
        }catch(e){
            console.log('msg content parse error',this.msg.content);
        }
    },
     methods:{
     }
}
</script>
<style lang="less" scoped>
.new-task{
  margin: 10px;
  width: 50%;
  margin: 0 auto;
  .task-list{
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
