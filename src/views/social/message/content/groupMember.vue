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
                 @contextmenu.prevent="showContextmenu(m)"
                class="member-content-list">
                <Tooltip placement="right" transfer :disabled="isDisabled">
                    <Poptip 
                        disabled
                        :ref="m.userId" 
                        placement="bottom-start" 
                        @on-popper-show="onPopperShow"
                        @on-popper-hide="onPopperHide">
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
                        <div slot="content" :style="{width:'100px'}">
                            <p 
                                v-if="$currentUser.userId==groupOwner && !m.isOwner" 
                                class="menu-list" 
                                @click="removeMembers(m,index)">
                                移除成员
                            </p>
                            <p 
                                v-if="($currentUser.userId==groupOwner && m.isOwner) || $currentUser.userId==m.userId" 
                                class="menu-list" 
                                @click="removeMembers(m,index)">
                                退出群聊
                            </p>
                            <p class="menu-list" @click="sentMemberMessage(m)">发送消息</p>
                            <p class="menu-list" @click="linkMember(m)">@{{m.nickname}}</p>
                            <p class="menu-list" @click="isDisabled=false">查看资料</p>
                            <p class="menu-list" @click="copyEmail(m)">复制邮箱</p>
                        </div>
                    </Poptip>
                    <div slot="content" style="padding:10px">
                        <div class="member-header" :style="{display: 'flex'}">
                            <div class="member-header-left">
                                <img 
                                :src="m.photo || '/resources/images/icon/defaultUserPhoto.png'"
                                :style="{width:'70px',height:'70px',border:'1px solid #ddd'}" />
                            </div>
                            <div :style="{marginLeft:'10px',marginTop:'10px'}">
                                <p>
                                    <p
                                        :style="{fontSize:'15px'}">
                                        {{m.nickname}}
                                    </p>
                                    <span 
                                        :style="{}">
                                        {{m.role}}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="member-detail">
                            <p>
                                <span class="label">手机：</span>
                                <span>{{m.mobile}}</span>
                            </p>
                            <p>
                                <span class="label">邮箱：</span>
                                <span>{{m.email}}</span>
                            </p>
                            <p>
                                <span class="label">部门：</span>
                                <span>{{m.group}}</span>
                            </p>
                        </div>
                        <div :style="{marginTop:'10px'}" @click="sentMemberMessage(m)">
                            <Button long>发消息</Button>
                        </div>
                    </div>
                </Tooltip>
            </div>
        </div>
    </div>
</template>

<script>
import { getMembers, removeMember, getGroupByUserId } from "@/services/imService";
import Bus from "@/assets/eventBus.js";
export default {
    name:'groupMenber',
    data(){
        return{
            groupOwner: "",
            members:[],
            showPop: false,
            isDisabled: false
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
        onPopperShow() {
            this.isDisabled = true;
        },
        onPopperHide() {
            this.isDisabled = false;
        },
        showContextmenu(m) {
            this.$refs[m.userId][0].visible = true;
        },
        sentMemberMessage(m) {
            let params = {
                userId: m.userId
            };
            getGroupByUserId(params).then(res => {
                Bus.$emit('updateGroupName');
            }).catch(err => {
                this.$Message.error(err.data.message);
            })
        },
        linkMember(m) {
            Bus.$emit('setLinkMember',{name:`@${m.nickname}&nbsp;`});
        },
        copyEmail(m) {
            let input = document.createElement('input');
            input.value = m.email;
            document.body.appendChild(input);
            input.select();
            if(document.execCommand("Copy")){
                document.execCommand("Copy"); // 执行浏览器复制命令
                this.$Message.success('复制成功!');
            }else{
                this.$Message.error('无法复制！');
            }
            
            input.remove()
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