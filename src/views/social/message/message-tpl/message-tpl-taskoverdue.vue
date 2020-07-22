<template>
    <div class="overdue-container">
       <div class="overdue-list">
         <div class="list-right">
          <div class="title">
              <span class="title-left">
                <img src="https://lab.roletask.com/resource/app-icon/project-task.png" />
              </span>
              <div class="title-right">
                <b>任务逾期提醒</b>
                <p>重要事件，您今天有{{content.length}}个任务需要完成！！！</p>
              </div>
          </div>
          <div class="list-content">
            <div class="header">
              <span>项目</span>
              <span>计划/申报工时</span>
            </div>
            <div class="content" v-for="(list,index) of content" :key="index"  @click="goDetail(list)">
              <ul>
                <li>{{list.projectName}}</li>
                <li>{{list.projectManager}}</li>
                <li>{{list.taskName}}</li>
              </ul>
              <div>{{`${list.declareWorkingHoursSubtotal}/${list.standardWorkingHours}`}}</div>
            </div>
          </div>
         </div>
       </div>
    </div>
</template>

<script>
export default {
    name: "MessageTplTaskoverdue",
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
            let json = JSON.parse(this.msg.content);
            this.content = json.content;
        }catch(e){
            console.log('msg content parse error',this.msg.content);
        }
    },
     methods:{
       goDetail(list){
         let href = `/Form/index.html?data=${list.transCode}`;
         window.open(href);
       }
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
        padding: 5px 0px;
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
      ul{
        font-size: 12px;
        color: #333;
        list-style: none;
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
        }
        .content{
            padding: 2px 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px dashed #eee;
        }
        .content:hover{
          background-color: #eee;
          cursor: pointer;
        }
        .content:last-child{
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
