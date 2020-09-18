<template>
    <div class="project-summary">
       <div class="summary-list">
         <div class="list-right">
          <div class="title">
              <span class="title-left">
                <img src="https://lab.roletask.com/resource/app-icon/project-approval.png" />
              </span>
              <div class="title-right">
                <b>项目日结报告</b>
              </div>
          </div>
          <div class="list-content">
            <div class="content" v-for="(task,index) of content" :key="index">
              <div class="content-task">
                <span>{{task.taskName}}</span> |
                <span>{{task.executor}}</span> |
                <span>{{task.standardWorkingHours}}</span>
              </div>
              <ul class="content-tasklog">
                <li v-for="(log,ldx) of task.log" :key="ldx">
                  <span>{{log.jobLogTitle}}</span> /
                  <span>{{log.handlerName}}</span> /
                  <span>{{log.workingHours}}</span>
                  <p>{{log.result?`成果：${log.result}`:""}}</p>
                </li>
              </ul>
            </div>
          </div>
         </div>
       </div>
    </div>
</template>

<script>
export default {
    name: "MessageTplProjectDaysummary",
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
     methods:{}
}
</script>
<style lang="less" scoped>
.project-summary{
  margin: 10px;
  width: 50%;
  margin: 0 auto;
  .summary-list{
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
          b{
            color: #333;
            vertical-align: top;
          }
        }
      }
      .list-content{
        color: #333;
        padding-top: 8px;
        .content{
          border-bottom: 1px dashed #eee;
          font-size: 12px;
          padding: 2px 0px;
          &-task{
            font-weight: bold;
          }
          &-tasklog{
            list-style: none;
            margin-left: 5px;
          }
        }
        .content:last-child{
          border: none;
        }
      }
    }
  }
}
</style>
