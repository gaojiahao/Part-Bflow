<style lang="less" scoped>
  @import "./add-group-member.less";
</style>
<template>
    <Modal
        class="add-group"
        v-model="showModal"
        :styles="{top:'30px'}"
        :mask-closable="false"
        footer-hide>
        <p class="title">{{ groupTitle }}</p>
        <div class="content">
          <div class="content-left">
            <div class="content-left-search">
              <Input
                v-model="searchValue"
                autofocus 
                search
                @on-search="onSearch"
                placeholder="搜索" />
            </div>
            <div class="content-left-list">
              <Tree 
                :data="treeList"
                ref="tree"
                empty-text=" "
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
              <Button size="small" @click="confirmModal" type="primary">确定</Button>
              <Button size="small" @click="cancelModal">取消</Button>
            </div>
          </div>
        </div>
    </Modal>
</template>
<script>
import Bus from "@/assets/eventBus.js";
import { addMember, getAddressBook, getAddressBookName } from "@/services/imService";
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
          copyTreeData: [],
          selectList: [],
          selectMembers: []
        }
    },
    watch: {
      showModal: function(value) {
        if(value) {
          this.searchValue = "";
          this.treeList = [];
          this.copyTreeData = [];
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
        onSearch() {
          let searchArr = [];
          if(this.searchValue){
            this.treeList = [];
            this.getDataBySearchValue();
          }else{
            this.treeList = this.copyTreeData;
          }
          
        },
        getDataBySearchValue(arr) {
          let resultArr = [],
              treeArr = arr || this.copyTreeData;
          treeArr.forEach(child => {
            if(!child.leaf){
              if(child.name.indexOf(this.searchValue) > -1){
                this.treeList.push(child);
              }else{
                this.getDataBySearchValue(child.children);
              }
            }else{
              if(child.name.indexOf(this.searchValue) > -1){
                this.treeList.push(child);
              }
            }
          })
          this.treeList = this.uniqueArray(this.treeList);
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
        },
        //获取删除选项在树中的节点
        getDeleteSelect(allCheckedNodes,list) {
          for(let i = 0;i<allCheckedNodes.length;i++){
            if(!allCheckedNodes[i].leaf){
              this.getDeleteSelect(allCheckedNodes[i].children,list);
            }else{
              if(allCheckedNodes[i].id == list.id){
                this.$refs.tree.handleCheck({checked:false,nodeKey:allCheckedNodes[i].nodeKey});
              }
            }
          }
        },
        getAllGroups() {
          this.isLoading = true;
          getAddressBook().then(res => {
            this.createTreeData(res);
            this.isLoading = false;
          })
        },
        createTreeData(data) {
          let me = this;
          for(let item of data){
            if(item.parentId === "7"){
              this.treeList.push(this.createTreeItem(item));
              this.copyTreeData.push(this.createTreeItem(item));
            }
          }
          this.setChildren(data);
          this.setChildrenCopy(data);
        },
        createTreeItem(item) {
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
            treeItem.children = [];
            treeItem.render = this.renderFileContent;
          }else{
            if(["G","A","D","J","M","O"].indexOf(item.type) > -1 || this.$currentUser.userId == item.id){
              treeItem.disabled = true;
            }
            this.selectMembers.forEach(sel => {
              if(sel.id == treeItem.id){
                treeItem.checked = true;
                treeItem.disabled = true;
              }
            })
          }
          return treeItem;
        },
        //递归设置子节点
        setChildren(data,arr){
          let childArr = arr || this.treeList;
          for(let i=0;i<childArr.length;i++){
            if(!childArr[i].leaf){
                for(let c=0;c<data.length;c++){
                  if(data[c].parentId == childArr[i].id){
                    if(data[c].parentId != "0"){
                      childArr[i].children.push(this.createTreeItem(data[c]));
                    }
                  }
               }
               this.setChildren(data,childArr[i].children);
            }
          }
        },
        //递归设置子节点
        setChildrenCopy(data,arr){
          let childArr = arr || this.copyTreeData;
          for(let i=0;i<childArr.length;i++){
            if(!childArr[i].leaf){
                for(let c=0;c<data.length;c++){
                  if(data[c].parentId == childArr[i].id){
                    if(data[c].parentId != "0"){
                      childArr[i].children.push(this.createTreeItem(data[c]));
                    }
                  }
               }
               this.setChildren(data,childArr[i].children);
            }
          }
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
            this.allChildrenNodes = [];
            let selectNodes = this.getAllChildrenNodes(currentSelect);
            if(!currentSelect.checked){
              this.deleteUnselect(this.selectList,this.allChildrenNodes);
              this.selectExistMember(currentSelect);
            }else{
              this.selectList = this.selectList.concat(this.allChildrenNodes);
              this.selectList = this.uniqueArray(this.selectList);
              this.deleteUnselect(this.selectList,this.selectMembers);
            }
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
              this.deleteUnselect(this.selectList,this.selectMembers);
            }
          }
          this.selectOtherNodes(currentSelect);
        },
        //选中节点关联其他节点相同的也选中
        selectOtherNodes(currentSelect) {
          this.selectChildNodes = [];
          if(!currentSelect.leaf){
           this.getAllChildrenNodes(currentSelect);
          }else{
            this.selectChildNodes.push(currentSelect);
          }
          this.deleteUnselect(this.selectChildNodes,this.selectMembers);
          this.selectChildNodes && this.selectChildNodes.forEach(sel => {
            this.setSelectedSameNode(sel,currentSelect);
            this.setSelectedSameNodeCopy(sel,currentSelect);
          })
        },
        setSelectedSameNode(sel,currentSelect,data) {
          let allData = data || this.copyTreeData;
          allData.forEach(all => {
            if(sel.id == all.id){
              all.checked = currentSelect.checked;
            }else{
              if(!all.leaf){
                this.setSelectedSameNode(sel,currentSelect,all.children);
              }
            }
          })
        },
        setSelectedSameNodeCopy(sel,currentSelect,data) {
          let allData = data || this.treeList;
          allData.forEach(all => {
            if(sel.id == all.id){
              all.checked = currentSelect.checked;
            }else{
              if(!all.leaf){
                this.setSelectedSameNodeCopy(sel,currentSelect,all.children);
              }
            }
          })
        },
        //获取树列表中指定选中的父节点
        getParentByTreelist(sel,arr) {
          let originArr = arr || this.copyTreeData;
          for(let i=0;i<originArr.length;i++){
            if(!originArr[i].leaf){
              if(sel.parentId == originArr[i].id){
                let checkedArr = [];
                for(let k of originArr[i].children){
                  checkedArr.push(k.checked);
                }
                if(checkedArr.indexOf(true)>-1 && checkedArr.indexOf(false)>-1){
                  originArr[i].checked = false;
                  originArr[i].indeterminate = true;
                }else if(checkedArr.indexOf(true)>-1){
                  originArr[i].checked = true;
                  originArr[i].indeterminate = false;
                }else{
                  originArr[i].checked = false;
                  originArr[i].indeterminate = false;
                }
                if(originArr[i].parentId != "7"){
                  this.getParentByTreelist(originArr[i]);
                }
              }else{
                if(originArr[i].children.length > 0){
                  this.getParentByTreelist(sel,originArr[i].children);
                }
              }
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
          if(currentSelect.children.length > 0){
            for(let p=0;p<currentSelect.children.length;p++){
              if(!currentSelect.children[p].leaf){
                this.selectExistMember(currentSelect.children[p]);
              }else{
                for(let c=0;c<this.selectMembers.length;c++){
                  if(currentSelect.children[p].id == this.selectMembers[c].id){
                    this.$refs.tree.handleCheck({checked:true,nodeKey:currentSelect.children[p].nodeKey});
                    break;
                  }
                }
              }
            }
          }
        },
        //获取选中父节点下所有子节点
        getAllChildrenNodes(currentSelect) {
          for(let child of currentSelect.children){
            if(!child.leaf){
                this.getAllChildrenNodes(child);
            }else{
              this.allChildrenNodes && this.allChildrenNodes.push(child);
              this.selectChildNodes && this.selectChildNodes.push(child);
            }
          }
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