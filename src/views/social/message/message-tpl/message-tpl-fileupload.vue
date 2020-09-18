<template>
    <div class="fileupload-message">
       <div class="message-list">
         <div class="list-right">
          <div class="title">
              <span class="title-left">
                <Icon type="md-attach" />
              </span>
              <div class="title-right">
                <b>新附件</b>
              </div>
          </div>
          <div class="list-content">
            <div class="content">
              <div class="content-task">
                <span style="color: #39f;cursor: pointer;" @click="goTask">{{content.taskName}}</span> |
                <span>{{content.executor}}</span>
              </div>
              <div class="content-file">
                  <img class="flie-img" width="38" :src="content.content|fileTypeFilter" />
                  <div class="content-file-info">
                    <div class="content-file-info-content">
                      <a :href="'/H_roleplay-si/ds/downloadById?id='+content.id " target="_blank" >{{content.content}}</a>
                    </div>
                    <div class="content-file-info-other font12">
                      {{content.size}}|{{content.creator}}
                    </div>
                  </div>
                </div>
            </div>
          </div>
         </div>
       </div>
    </div>
</template>

<script>
export default {
    name: "MessageTplFileupload",
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
      goTask() {
        window.open(`/Form/index.html?data=${this.content.transCode}`);
      }
     }
}
</script>
<style lang="less" scoped>
.fileupload-message{
  margin: 10px;
  width: 50%;
  margin: 0 auto;
  .message-list{
    border: 1px solid #ddd;
    padding: 0rem 10px;
    background-color: #fff;
    border-radius: 2px;
    text-align: left;
    .list-right{
      .title{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        .title-left{
            font-size: 30px;
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
          &-file{
            padding: 5px;
            &-info {
              display: inline-block;
              vertical-align: top;
              line-height: 20px;
              width: calc(100% - 50px);
              &-content {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
              }
              &-other {
                color: #999;
                width: 100%;
              }
            }
          }
          .content-file:hover {
            cursor: pointer;
            background-color: #ddd;
            border-radius: 2px;
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
