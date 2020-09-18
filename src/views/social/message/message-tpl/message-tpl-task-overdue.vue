<template>
    <div class="overdue-container">
       <div class="overdue-list">
         <div class="list-right">
          <div class="title">
              <span class="title-left">
                <img src="https://lab.roletask.com/resource/app-icon/project-task.png" />
              </span>
              <div class="title-right">
                <b>任务逾期通知</b>
              </div>
          </div>
          <div class="list-content">
            <div class="header">
              <span>任务名称</span>
              <span>执行者</span>
              <span>计划结束日期</span>
              <span>逾期天数</span>
            </div>
            <ul class="content">
                <li v-for="(list,index) of content" :key="index">
                  <span>{{list.taskName}}</span>
                  <span>{{list.executor}}</span>
                  <span>{{list.endTime}}</span>
                  <span>{{list.overdueDays}}</span>
                </li>
            </ul>
          </div>
         </div>
       </div>
    </div>
</template>

<script>
export default {
    name: "MessageTplTaskOverdue",
    props:{
        msg:{
            type: Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            content: []
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
.overdue-container{
  margin: 10px;
  width: 50%;
  margin: 0 auto;
  .overdue-list{
    border: 1px solid #ddd;
    padding: 0rem 10px;
    background-color: #fff;
    border-radius: 2px;
    text-align: left;
    .list-right{
      .title{
        padding-top: 5px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        .title-left{
          img{
            width: 35px;
            height: 35px;
            border-radius: 2px;
          }
        }
        .title-right{
            margin-left: 5px;
           p{
            color: #333;
            font-size: 12px;
          }
          b{
            color: #333;
            vertical-align: top;
          }
        }
      }
      .list-content{
        color: #333;
        margin: 0px -5px;
        .header{
          display: flex;
          font-size: 12px;
          justify-content: space-between;
          border-bottom: 1px dashed #eee;
          padding: 10px 5px 2px 5px;
          span{
            flex: 1;
          }
          span:last-child{
            text-align: right;
          }
        }
        .content{
            font-size: 12px;
            color: #333;
            list-style: none;
            li{
              padding: 2px 5px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px dashed #eee;
              span{
                flex: 1;
              }
              span:last-child{
                text-align: right;
              }
            }
        }
        li:hover{
          background-color: #eee;
          cursor: pointer;
        }
        li:last-child{
          border: none;
        }
      }
    }
  }
  .content:last-child{
    border: none;
  }
}

</style>
