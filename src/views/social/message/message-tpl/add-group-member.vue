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
              <Spin class="spin" v-if="isLoading"></Spin>
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
              <span>{{ list.name }}</span>
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
import Bus from "@/assets/eventBus.js";
import { addMember, getAddressBook } from "@/services/imService";
export default {
    name:'AddGroupMember',
    props: {
      groupTitle: {
        type: String,
        default:function(){
            return "添加群聊成员";
        }
      },
      confirmCallback:{
        type: Function
      }
    },
    data(){
        return {
          showModal: false,
          isLoading: false,
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
          if(this.selectList.length === 0) {
            this.$Message.error('请先选择要添加的成员！');
            return;
          }

          this.confirmCallback(this.selectList);
          
        },
        deleteSelectMember(list,index) {
          this.getChildAndSetParentStatus(list);
          this.selectList.splice(index,1);
        },
        //获取删除子节点并设置父节点状态
        getChildAndSetParentStatus(list) {
          let allCheckedNodes = this.$refs["tree"].getCheckedNodes();
          
          this.deleteItems = [];
          this.getDeleteSelect(allCheckedNodes, list)
          this.deleteItems.forEach(d => {
            d.checked = false;
            this.parentNodes = [];
            this.setParentStatus(allCheckedNodes,d);
          }) 
        },
        //获取删除选项在树中的节点
        getDeleteSelect(allCheckedNodes,list) {
          for(let i = 0;i<allCheckedNodes.length;i++){
            if(!allCheckedNodes[i].leaf){
              this.getDeleteSelect(allCheckedNodes[i].children,list);
            }else{
              if(allCheckedNodes[i].id == list.id){
                 this.deleteItems.push(allCheckedNodes[i]);
              }
            }
          }
        },
        //设置删除选项在树中父节点为未选中状态
        setParentStatus(allCheckedNodes,deleteItem) {
          for(let i = 0;i<allCheckedNodes.length;i++){
            if(!allCheckedNodes[i].leaf){
              if(allCheckedNodes[i].id == deleteItem.parentId){
                this.parentNodes.push(allCheckedNodes[i]);
                if(allCheckedNodes[i].parentId === "7") break;
                this.setParentStatus(allCheckedNodes,allCheckedNodes[i]);
              }
            }
          }
          this.parentNodes.forEach(item => {
            item.checked = false;
          })
        },
        getAllGroups() {
          this.isLoading = true;
          getAddressBook(null).then(res => {
            res.forEach(item => {
              if(item.id !== 7){
                let treeItem = {
                  title: item.name,
                  id: item.id,
                  name: item.name,
                  leaf: item.leaf,
                  parentId: item.parentId,
                  photo: item.photo,
                  render: this.renderImgContent
              }

              if(!item.leaf){
                treeItem.loading = false;
                treeItem.children = [];
                treeItem.render = this.renderFileContent;
              }else{
                this.selectMembers.forEach(sel => {
                  if(sel.id == treeItem.id){
                    treeItem.checked = true;
                    treeItem.disabled = true;
                  }
                })
              }

              this.treeList.push(treeItem);
              }
            })
            this.isLoading = false;
          })
        },
        loadData(item, callback) {
          let data = [];
          getAddressBook(item.id).then(res => {
            res.forEach(item => {
              if(!item.leaf){
                data.push({
                  title: item.name,
                  id: item.id,
                  photo: item.photo,
                  name: item.name,
                  children: [],
                  leaf: item.leaf,
                  parentId: item.parentId,
                  loading: false,
                  render: this.renderFileContent
                })
              }else{
                let treeItem = {
                  title: item.name,
                  id: item.id,
                  photo: item.photo,
                  name: item.name,
                  parentId: item.parentId,
                  leaf: item.leaf,
                  render: this.renderImgContent
                }
                this.selectMembers.forEach(sel => {
                  if(sel.id == treeItem.id){
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
                            src: (data && data.photo) || '/resources/images/icon/defaultUserPhoto.png'
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
          if(!currentSelect.leaf){
            this.resultArr = [];
            this.getAllChildrenNodes(currentSelect);
          }else{
            if(!currentSelect.checked){
              this.selectList.forEach((o,i) => {
                  if(o.id === currentSelect.id){
                    this.selectList.splice(i,1);
                  }
              })
              this.getChildAndSetParentStatus(currentSelect);
            }else{
              this.selectList.push(currentSelect);
              this.selectList = this.uniqueArray(this.selectList);
            }
          }
        },
        //数组去重
        uniqueArray(arr) {
          let resultArr = [],ids = [];
          //数组去重
          arr.forEach(item => {
            if(ids.indexOf(item.id) < 0) {
              ids.push(item.id);
              resultArr.push(item);
            }
          });

          return resultArr;
        },
        //删除未选中节点
        deleteUnselect(old,newArr) {
          for (var i = 0; i < old.length; i++) {
            for (var j = 0; j < newArr.length; j++) {
              if (old[i].id == newArr[j].id) {
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
                if(parentTreeItem.children[p].id == this.selectMembers[c].id){
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
            if(!originArr[i].leaf){
              if(currentSelect.id == originArr[i].id){
                parentTreeItem = originArr[i];
                return parentTreeItem;
              }else{
                if(originArr[i].children.length > 0){
                  this.getParentByTreelist(currentSelect,originArr[i]);
                }
              }
            }
          }
        },
        //获取选中父节点下所有子节点
        getAllChildrenNodes(currentSelect,child) {
          let parentId = child ? child.id : currentSelect.id; 
          getAddressBook(parentId).then(res => {
            for(let child of res){
              if(!child.leaf){
                  this.getAllChildrenNodes(currentSelect,child);
              }else{
                this.resultArr.push(child);
              }
              if(!currentSelect.checked){
                this.deleteUnselect(this.selectList,this.resultArr);
                this.selectExistMember(currentSelect);
              }else{
                this.selectList = this.resultArr ? this.selectList.concat(this.resultArr) : this.selectList;
                this.selectList = this.uniqueArray(this.selectList);
                this.deleteUnselect(this.selectList,this.selectMembers);
              }
            }
          })
        }
    },
    mounted(){
        Bus.$on('getGroupMembers', (value) => {
          this.selectMembers = [];
          value.forEach(user =>{
            this.selectMembers.push({
              name: user.nickname,
              id: user.userId,
              photo: user.photo
            })
          })
        })
    }
}
</script>