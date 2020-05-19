<style lang="less" scoped>
  .detail-modal{
      .title{
          text-align: center;
          font-size: 14px;
          margin-bottom: 10px;
      }
      .content{
          color: #8a8686;
          font-size: 12px;
          background-color: #eee;
          padding: 8px;
          &-text{
            color: #333;
            font-size: 13px;
            margin-top: 10px;
            max-height: 100px;
            overflow-y: auto;
              /deep/ .paste-img{
                height: 80px;
                margin: 1px;
              }

              /deep/ .face{
                width: 20px;
              }

              /deep/ .file-content{
                display: inline-block;
                cursor: pointer;
                width: 200px;
                border: 1px solid #ddd;
                border-radius: 3px;
                padding: 5px;
                margin: 3px;
                background-color: white;

                &-info{
                  display: inline-table;
                  vertical-align: top;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  p{
                    width: 145px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }
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
          height: 300px;
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
  .detail-modal /deep/ .ivu-modal-close .ivu-icon-ios-close{
      color: #999;
  }
  .detail-modal /deep/ .ivu-modal-content{
      height: 600px;
  }
</style>
<template>
      <Modal
          class="detail-modal"
          width=350
          v-model="showModal"
          footer-hide>
          <p class="title">消息详情</p>
          <div class="content">
            <span>{{ detailMessage.creatorName }}</span>
            <span class="text-crtTime">{{ detailMessage.crtTime }}</span>
            <p class="content-text compactscrollbar" > 
                <span v-if="detailMessage.imType===1" v-html="detailMessage.content"></span>

                <span v-if="[2,3,4].includes(detailMessage.imType)" >
                  
                  <span v-for="(c,index) in detailMessage.content" :key="index">

                    <span v-if="c.imType==1" v-html="c.content"></span>

                    <img class="paste-img" v-if="c.imType==2" :src="'/H_roleplay-si/ds/downloadById?id='+c.content.id" />
                    <span  contenteditable="false" class="file-content" v-if="c.imType===4" >
                      <img class="flie-img" width="38" src="resources/images/file/word.png">
                      <div class="file-content-info">
                        <p>
                        <a :href="'/H_roleplay-si/ds/downloadById?id='+c.id">{{c.content}}</a>
                        </p>{{c.size}}<p>
                        </p>
                      </div>
                    </span>
                    </span>
                </span>
            </p>

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
            <div class="member compactscrollbar">
              <p class="list" v-for="(member,index) of members" :key="index">
                <img :src="member.photo" onerror="src='https://lab.roletask.com/resource/common-icon/male.png'">
                <span>{{ member.nickname }}</span>
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