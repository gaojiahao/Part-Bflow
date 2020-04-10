<style lang="less" scoped>
  .group-member{
      .member-title{
        padding: 5px 10px;
        color: #999;
      }
      .member-content{
          &-list{
              padding: 5px;
              .img{
                  color: #39f;
                  font-size: 18px;
              }
              .menu-list{
                  padding: 3px;
                  cursor: pointer;
              }
              .menu-list:hover{
                  background-color: #ddd;
                  border-radius: 2px;
              }
          }
          .member-header{
              display: flex;
              &-left{
                  img{
                    border: 1px solid #ddd;
                    width: 70px;
                  }
              }
              &-right{
                  line-height: 60px;
                  margin-left: 10px;
              }
          }
          .member-detail{
              border-top: 1px solid #ddd;
              p{
                  padding: 5px 0px;
                  .label{
                      color: #999;
                  }
              }
          }
      }
  }
  .member-content-list:hover{
      background-color: #ddd;
  }
</style>
<template>
    <div class="group-member">
        <div class="member-title">
            <span>群成员 • {{members.length}}</span>
        </div>
        <div class="member-content">
            <div 
                v-for="(m,index) in members" 
                :key="index" 
                 @contextmenu.prevent="showContextmenu"
                class="member-content-list">
                <Tooltip placement="right">
                    <Poptip trigger="click" placement="bottom-start">
                        <div>
                            <span class="img">
                                <Icon type="ios-person" /> 
                            </span>
                            <span class="name">
                                <span>{{m.nickname}}</span>
                                <span 
                                    v-if="m.isOwner" 
                                    :style="{fontSize:'10px',color:'#999'}">
                                    .群主
                                </span>
                            </span>
                        </div>
                        <div slot="content">
                            <p v-if="$currentUser.userId==groupOwner && !m.isOwner" class="menu-list" @click="removeMembers(m,index)">移除成员</p>
                            <p v-else class="menu-list" @click="removeMembers(m,index)">退出群聊</p>
                        </div>
                    </Poptip>
                    <div slot="content">
                        <div class="member-header">
                            <div class="member-header-left">
                                <img :src="m.photo || '/resources/images/icon/defaultUserPhoto.png'" />
                            </div>
                            <div class="member-header-right">
                                <p>{{m.nickname}}</p>
                            </div>
                        </div>
                        <div class="member-detail">
                            <p>
                                <span class="label">手机：</span>
                                <span>135623569846</span>
                            </p>
                            <p>
                                <span class="label">邮箱：</span>
                                <span>135623569846@163.com</span>
                            </p>
                            <p>
                                <span class="label">部门：</span>
                                <span>开发中心</span>
                            </p>
                        </div>
                    </div>
                </Tooltip>
            </div>
        </div>
    </div>
</template>

<script>
import { getMembers, removeMember } from "@/services/imService";
import Bus from "@/assets/eventBus.js";
export default {
    name:'groupMenber',
    data(){
        return{
            groupOwner: "",
            members:[],
            showPop: false
        }
    },
    methods:{
        init(){
            getMembers(this.$route.params.groupId).then(res=>{
                this.members = res;
                this.members.forEach(item => {
                    if(item.isOwner) this.groupOwner = item.userId;
                })
                Bus.$emit('getGroupMembers',this.members);
            });
        },
        showContextmenu() {
            this.showPop = true;
        },
        removeMembers(m, index) {
            let params = {
                groupId: m.groupId,
			    userId: m.userId
            };

            removeMember(params).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    this.members.splice(index,1);
                }
            }).catch(err => {
                this.$Message.error(res.data.message);
            })
        }
    },
     watch: {
        $route(to, from) {
            this.init();
        }
    },
    mounted(){
        this.$nextTick(()=>{
           this.init();
        })
        Bus.$on('addMembers',() => {
            this.init();
        });
    },
    updated: function () {
            // this.init();

        // this.$nextTick(function () {
        // })
    }
}
</script>