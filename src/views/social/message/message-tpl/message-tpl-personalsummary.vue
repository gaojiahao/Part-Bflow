<template>
    <div class="personal-summary">
       <div class="summary-list">
          <div class="title">
              <span class="title-left">
                <img :src="getDefaultPhoto()" />
              </span>
              <div class="title-right">
                <b>个人日结报告</b>
                <b class="total-hour">总计：{{content.workingHoursTotal}}小时</b>
              </div>
          </div>
          <div class="list-content">
            <div class="content" v-for="(project,pidx) of content.project" :key="pidx">
              <div class="content-task">
                <span>{{project.projectName}}</span>
                <span>{{project.workingHoursSubtotal}}小时</span>
              </div>
              <ul class="content-tasklog">
                <li v-for="(task,tidx) of project.task" :key="tidx">
                  <span>{{task.taskName}}</span> /
                  <span>{{task.jobLogTitle}}</span> /
                  <span>{{task.workingHours}}</span>
                  <p>{{task.result?`成果：${task.result}`:""}}</p>
                </li>
              </ul>
            </div>
          </div>
       </div>
    </div>
</template>

<script>
export default {
    name: "MessageTplPersonalsummary",
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
       getDefaultPhoto() {
          let url = "resources/images/icon/ava01.png";
          if (this.content.photo) {
              url = this.content.photo;
          }
          return url;
        }
     }
}
</script>
<style lang="less" scoped>
.personal-summary{
  margin: 10px;
  width: 50%;
  margin: 0 auto;
  .summary-list{
    border: 1px solid #ddd;
    padding: 0rem 10px;
    background-color: #fff;
    border-radius: 2px;
    text-align: left;
    .title{
      padding-top: 5px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      .title-left{
        img{
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 1px solid #ddd;
        }
      }
      .title-right{
        margin-left: 5px;
        display: flex;
        justify-content: space-between;
        flex: 1;
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
          display: flex;
          justify-content: space-between;
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
</style>
