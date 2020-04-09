<style lang="less" scoped>
  .detail-modal{
      .title{
          text-align: center;
          font-size: 14px;
          margin-bottom: 10px;
      }
      .content{
          color: #8a8686;
          font-size: 10px;
          background-color: #eee;
          padding: 10px;
          &-text{
            color: #333;
            font-size: 13px;
            margin-top: 10px;
          }
      }
      .read-member{
        margin-top: 15px;
        .number{
          display: flex;
          justify-content: space-around;
          &-read{
            text-align: center;
            cursor: pointer;
            p{
              font-size: 30px;
            }
          }
          &-noread{
            text-align: center;
            cursor: pointer;
            p{
              font-size: 30px;
            }
          }
        }
        .member{
          margin-top: 15px;
          height: 270px;
          overflow: auto;
          .list{
            padding: 8px 0px;
            img{
              vertical-align: middle;
              height: 30px;
              border-radius: 2px;
              margin-right: 5px;
            }
          }
        }
      }
  }
    /*滚动条样式*/
  .detail-modal /deep/ .member::-webkit-scrollbar {/*滚动条整体样式*/
      width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
  }
  .detail-modal /deep/ .member::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(117, 112, 112, 0.2);
      background: rgba(117, 112, 112, 0.2);
  }
  .detail-modal /deep/ .member::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: #f4f6f8;
  }
  .detail-modal /deep/ .ivu-modal-close .ivu-icon-ios-close{
      color: #999;
  }
  .detail-modal /deep/ .ivu-modal-content{
      height: 500px;
  }
</style>
<template>
      <Modal
          class="detail-modal"
          width=350
          v-model="showModal"
          :styles="{top:'30px'}"
          footer-hide>
          <p class="title">消息详情</p>
          <div class="content">
            <span>{{ detailMessage.creatorName }}</span>
            <span
              class="text-crtTime">
              {{ detailMessage.crtTime }}
            </span>
            <p v-html="detailMessage.content" class="content-text"></p>
          </div>
          <div class="read-member">
            <div class="number">
              <div 
                class="number-read" 
                :style="{color:isActive?'#333':'#999'}"
                @click="readClick">
                <span>已读</span>
                <p>{{ readMembers.length }}</p>
              </div>
              <div 
                class="number-noread" 
                :style="{color:!isActive?'#333':'#999'}"
                @click="noreadClick">
                <span>未读</span>
                <p>{{ noreadMembers.length }}</p>
              </div>
            </div>
            <div class="member">
              <p class="list" v-for="(list,index) of members" :key="index">
                <img src="https://lab.roletask.com/resource/common-icon/male.png">
                <span>{{ list.nickname }}</span>
              </p>
            </div>
          </div>
      </Modal>
</template>

<script>
import { getMsgCheckStatus } from "@/services/imService";
export default {
    name:'MessageReadDetail',
    data(){
        return {
           showModal: false,
           isActive: true,
           members: [],
           noreadMembers: [],
           readMembers: []
        }
    },
    props:{
        detailMessage:{
            type: Object,
            default:function(){
                return {};
            }
        }
    },
    watch: {
      showModal(value){
        if(value){
          this.getReadMembers();
          this.getNoreadMembers();
        }
      }
    },
    methods:{
      readClick() {
        this.isActive = true;
        this.members = this.readMembers;
      },
      noreadClick() {
        this.isActive = false;
        this.members = this.noreadMembers;
      },
      getReadMembers() {
        getMsgCheckStatus(this.detailMessage.id, 1).then(res => {
          this.readMembers = res;
          this.members = this.readMembers;
        }).catch(err => {
            this.$Message.error(err.data.message);
        })
      },
      getNoreadMembers() {
        getMsgCheckStatus(this.detailMessage.id, 0).then(res => {
          this.noreadMembers = res;
        }).catch(err => {
            this.$Message.error(err.data.message);
        })
      }
    },
    mounted(){
        
    }
}
</script>