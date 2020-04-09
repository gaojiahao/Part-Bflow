<style lang="less" scoped>
  @import "./add-group-member.less";
</style>
<template>
    <Modal
        class="add-group"
        v-model="showModal"
        :styles="{top:'30px'}"
        footer-hide>
        <p class="title">{{ groupTitle }}</p>
        <div class="content">
          <div class="content-left">
            <div class="content-left-search">
              <Input
                v-model="searchValue"
                autofocus 
                placeholder="搜索" />
            </div>
            <div class="content-left-list">
              <Tree 
                :data="treeList"
                ref="tree"
                empty-text=" "
                :load-data="loadData"
                @on-check-change="onCheckChange" 
                show-checkbox>
              </Tree>
            </div>
          </div>
          <div class="content-right">
            <span class="content-right-num">已选择了{{ selectList.length }}个联系人</span>
            <p 
              class="content-right-list" 
              v-for="(list,index) of selectList" 
              :key="index">
              <img 
                :src="list.photo || '/resources/images/icon/defaultUserPhoto.png'" 
                @error="onError"/>
              <span>{{ list.nickname }}</span>
              <b @click="deleteSelectMember(list,index)"><Icon type="md-close" /></b>
            </p>
            <div class="content-right-btn">
              <Button size="small" @click="cancelModal">取消</Button>
              <Button size="small" @click="confirmModal" type="primary">确定</Button>
            </div>
          </div>
        </div>
    </Modal>
</template>
<script>
import { getOrgBaseInfo, getUsersByGroupId } from "@/services/addressBookService";
import Bus from "@/assets/eventBus.js";
import { addMember } from "@/services/imService";
export default {
    name:'AddGroupMember',
    props: {
      groupTitle: {
        type: String,
        default:function(){
            return "添加群成员";
        }
      },
      confirmCallback:{
        type:Function
      }
    },
    data(){
        return {
          showModal: false,
          searchValue: "",
          treeList: [],
          selectList: [],
          selectMembers: []
        }
    },
    watch: {
      showModal: function(value) {
        if(value) {
          this.treeList = [];
          this.selectList = [];
          this.getAllGroups();
        }
      }
    },
    methods:{
        cancelModal() {
          this.showModal = false;
        },
        confirmModal() {
          let userIds = [];
          if(this.selectList.length === 0) {
            this.$Message.error('请先选择要添加的成员！');
            return;
          }

          this.selectList.forEach(user =>{
            userIds.push(user.userId);
          })

          this.confirmCallback(userIds.join(','));
          
          // addMember(this.$route.params.groupId,userIds.join(',')).then(res => {
          //   if(res.success){
          //     this.$Message.success(res.message);
          //     this.showModal = false;
          //     Bus.$emit('addMembers');
          //   }
          // })
        },
        deleteSelectMember(list,index) {
          let allCheckedNodes = this.$refs["tree"].getCheckedNodes(),
              deleteItem = this.getDeleteSelect(allCheckedNodes, list);
          
          if(deleteItem) deleteItem.checked = false;
          this.selectList.splice(index,1);
        },
        //获取删除选项在树中的节点
        getDeleteSelect(allCheckedNodes,list) {
          let deleteItem;
          for(let i = 0;i<allCheckedNodes.length;i++){
            if(allCheckedNodes[i].leaf === 0){
              this.getDeleteSelect(allCheckedNodes[i].children,list);
            }else{
              if(allCheckedNodes[i].userId == list.userId){
                deleteItem = allCheckedNodes[i];
                return deleteItem;
              }
            }
          }
        },
        getAllGroups() {
          getOrgBaseInfo().then(res => {
            res.tableContent.forEach(item => {
              let treeItem = {
                  title: item.groupName,
                  groupId: item.groupId,
                  userId: item.groupId,
                  nickname: item.groupName,
                  leaf: item.leaf,
                  render: this.renderImgContent
              }

              if(item.leaf === 0){
                treeItem.loading = false;
                treeItem.children = [];
                treeItem.render = this.renderFileContent;
              }else{
                this.selectMembers.forEach(sel => {
                  if(sel.userId == treeItem.userId){
                    treeItem.checked = true;
                    treeItem.disabled = true;
                  }
                })
              }

              this.treeList.push(treeItem);
            })
          })
        },
        loadData(item, callback) {
          let data = [];
          getUsersByGroupId(item.groupId).then(res => {
            res.tableContent.forEach(item => {
              if(item.leaf === 0){
                data.push({
                  title: item.nickname,
                  userId: item.userId,
                  photo: item.photo,
                  groupId: item.groupId,
                  nickname: item.nickname,
                  children: [],
                  leaf: item.leaf,
                  loading: false,
                  render: this.renderFileContent
                })
              }else{
                let treeItem = {
                  title: item.nickname,
                  userId: item.userId,
                  photo: item.photo,
                  nickname: item.nickname,
                  leaf: 1,
                  render: this.renderImgContent
                }
                this.selectMembers.forEach(sel => {
                  if(sel.userId == treeItem.userId){
                    treeItem.checked = true;
                    treeItem.disabled = true;
                  }
                })

                data.push(treeItem); 
              }
            })
            callback(data);
          })
        },
        renderImgContent(h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('img', {
                        attrs: {
                            src: data.photo || '/resources/images/icon/defaultUserPhoto.png'
                        },
                        on:{
                          'error': (e) => {
                            this.onError(e);
                          }
                        },
                        style: {
                            marginRight: '8px',
                            width: '20px',
                            verticalAlign: 'bottom'
                        }
                    }),
                    h('span', data.title)
                ])
            ]);
        },
        renderFileContent(h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'md-folder'
                        },
                        style: {
                            marginRight: '8px',
                            color: 'rgb(109, 173, 236)',
                            fontSize: '16px'
                        }
                    }),
                    h('span', data.title)
                ])
            ]);
        },
        onError(e) {
          e.target.src = '/resources/images/icon/defaultUserPhoto.png';
        },
        onCheckChange(currentArray, currentSelect) {
          if(currentSelect.leaf === 0){
            getUsersByGroupId(currentSelect.groupId).then(res => {
              if(!currentSelect.checked){
                this.deleteUnselect(this.selectList,res.tableContent);
                this.selectExistMember(currentSelect);
              }else{
                this.selectList = this.selectList.concat(res.tableContent);
                this.selectList = this.uniqueArray(this.selectList);
                this.deleteUnselect(this.selectList,this.selectMembers);
              }
            })
          }else{
            if(!currentSelect.checked){
              this.selectList.forEach((o,i) => {
                  if(o.userId === currentSelect.userId){
                    this.selectList.splice(i,1);
                  }
              })
            }else{
              this.selectList.push(currentSelect);
              this.selectList = this.uniqueArray(this.selectList);
            }
          }
        },
        //数组去重
        uniqueArray(arr) {
          let resultArr = [],userIds = [];
          //数组去重
          arr.forEach(item => {
            if(userIds.indexOf(item.userId) < 0) {
              userIds.push(item.userId);
              resultArr.push(item);
            }
          });

          return resultArr;
        },
        //删除未选中节点
        deleteUnselect(old,newArr) {
          for (var i = 0; i < old.length; i++) {
            for (var j = 0; j < newArr.length; j++) {
              if (old[i].userId == newArr[j].userId) {
                old.splice(i, 1);
                i = i - 1;
                break;
              }
            }
          }
        },
        //选中已有成员
        selectExistMember(currentSelect) {
          let parentTreeItem = this.getParentByTreelist(currentSelect);
          if(parentTreeItem.children.length > 0){
            for(let p=0;p<parentTreeItem.children.length;p++){
              for(let c=0;c<this.selectMembers.length;c++){
                if(parentTreeItem.children[p].userId == this.selectMembers[c].userId){
                  parentTreeItem.children[p].checked = true;
                  break;
                }
              }
            }
          }
        },
        //获取树列表中指定选中的父节点
        getParentByTreelist(currentSelect,arr) {
          let parentTreeItem,
              originArr = arr || this.treeList;
          for(let i=0;i<originArr.length;i++){
            if(originArr[i].leaf === 0){
              if(currentSelect.groupId == originArr[i].groupId){
                parentTreeItem = originArr[i];
                return parentTreeItem;
              }else{
                if(originArr[i].children.length > 0){
                  this.getParentByTreelist(currentSelect,originArr[i]);
                }
              }
            }
          }
        }
    },
    mounted(){
        Bus.$on('getGroupMembers', (value) => {
            this.selectMembers = value;
        })
    }
}
</script>