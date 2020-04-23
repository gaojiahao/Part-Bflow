<style lang="less" scoped>
  .group-member{
        overflow: hidden;
        height: 100%;
      .member-title{
        padding: 5px 10px;
        color: #999;
      }
      .member-content{
        height: 100%;
        background-color: #f6f6f6;
        overflow-y: auto;
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
                  padding: 10px 0px;
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
  .active{
      background-color: #ccc !important;
  }
</style>
<template>
    <div class="group-member">
        <div class="member-title">
            <span>群成员 • {{members.length}}</span>
        </div>
        <div class="member-content compactscrollbar">
            <div 
                v-for="(m,index) in members" 
                :key="index" 
                @contextmenu.prevent="onContextmenu(m)"
                :class="{'active':curContextMember.userId === m.userId}"
                class="member-content-list">
                <Poptip  placement="right" transfer trigger="hover"  >
                    <div slot="content" style="padding:10px">
                        <div class="member-header" :style="{display: 'flex'}">
                            <div class="member-header-left">
                                <img 
                                onerror="src='https://lab.roletask.com/resource/common-icon/male.png'" 
                                :src="m.photo "
                                :style="{width:'70px',height:'70px',border:'1px solid #ddd'}" />
                            </div>
                            <div :style="{marginLeft:'10px',marginTop:'10px'}">
                                <div style="font-size: 14px;">
                                    {{m.nickname}}<Icon size=20 type="ios-person" /> 
                                </div>
                                <div>{{m.role}}</div>
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
                            <Button long type="primary">发消息</Button>
                        </div>
                    </div>
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
                </Poptip >
            </div>
        </div>
        <!--     <DropdownItem name="copyEmail" divided>复制邮箱地址</DropdownItem>
                <DropdownItem name="copyMobile" >复制手机号</DropdownItem> -->
        <Dropdown 
            @on-click="onDropItemClick"
            ref="contextMenu"  
            trigger="click"
            placement="bottom-start">
            <DropdownMenu slot="list">
                <DropdownItem name="senMessage" >发送消息</DropdownItem>
                <DropdownItem name="atUser"  >@{{curContextMember.nickname}}</DropdownItem>
                <DropdownItem name="removeMember" v-if="$currentUser.userId==groupOwner" divided>移除群聊</DropdownItem>
            </DropdownMenu>
        </Dropdown>
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
            isDisabled: false,
            curContextMember:{}
        }
    },
    methods:{
        onDropItemClick(k){
            switch (k) {
                case 'senMessage':
                    this.sentMemberMessage(this.curContextMember);
                    break;
                case 'atUser':
                    this.linkMember(this.curContextMember);
                    break;
                case 'copyEmail':
                    this.copyEmail(this.curContextMember);
                    break;
                 case 'copyMobile':
                    this.copyMobile(this.curContextMember);
                    break;
                case 'removeMember':
                    this.removeMember(this.curContextMember);
                    break;
            }
        },
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
        // showContextmenu(m) {
        //     this.$refs[m.userId][0].visible = true;
        // },
       
        onContextmenu(member) {
            this.curContextMember = member;
            this.$refs.contextMenu.$refs.reference = event.target;
            this.$refs.contextMenu.currentVisible = !this.$refs.contextMenu.currentVisible;
        },
        sentMemberMessage(m) {
            let params = {
                userId: m.userId
            };
            getGroupByUserId(params).then(res => {
                Bus.$emit('updateGroupName');
                this.$router.push({
                    name: 'group',
                    params: {groupId: res.groupId},
                    query: {groupName: res.groupName,groupType: res.groupType}
                })
            }).catch(err => {
                this.$Message.error(err.data.message);
            })
        },
        linkMember(m) {
            Bus.$emit('setLinkMember',{name:`@${m.nickname}&nbsp;`});
        },
        copyMobile(m){
            let input = document.createElement('input');
            input.value = m.mobile;
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
        removeMember(m) {
            let params = {
                groupId: m.groupId,
			    userId: m.userId
            };

            removeMember(params).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    this.members.map((item,index)=>{
                        if(item.userId === m.userId){
                            this.members.splice(index,1);
                        }
                    });
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