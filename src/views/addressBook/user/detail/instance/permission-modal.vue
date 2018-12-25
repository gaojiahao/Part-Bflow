<style lang="less">
  .permission-tree{
    .ivu-tree-arrow i{
      font-size: 20px;
    }
  }
</style>

<template>
    <Modal 
      v-model="showModal" 
      title="权限列表" 
      @on-ok="addPermissions" 
      width="400" 
      :styles="{top: '20px'}"
      @on-visible-change="onVisibleChange">
        <Tree
          ref="permissionTree"
          @on-check-change="onCheckChange" 
          :data="data"
          :load-data="loadData"
          show-checkbox
          class="permission-tree">
        </Tree>
    </Modal>
</template>

<script>
import {
  getAllPermissionData,
  addPermission
} from "@/services/addressBookService.js";

export default {
  name: "PermissionModal",
  components: {},
  props: {
      target: {
          type: Object
      },
      visible: {
          type: Boolean
      }
  },
  data() {
    return {
      loading: false,
      showModal: false,
      data: [],
      selectPermission: []
    };
  },
  watch: {
      visible: function (value) {
          if(value){
              this.showModal = true;
              this.getAllPermissionDatas();
          }
      }
  },
  methods: {
    //modal状态发生改变
    onVisibleChange(status) {
        if(!status) this.$emit('changeModalStatus');
    },
    //添加权限
    addPermissions() {
      let multiId = [];
      this.selectPermission.forEach(val => {
        multiId.push(val.id);
      });
      if (multiId.length>0 && this.target) {
        addPermission(this.target.type,this.target.targetId, multiId.join(","))
          .then(res => {
            if (res.success) {
              this.selectPermission = [];
              this.$Message.success("更新成功");
              this.$emit('permissionChange');
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
      }
    },
    //选择树节点
    onCheckChange(selectArray, currentSelect) {
      console.log(selectArray,currentSelect)
    },
    //加载所有权限数据
    getAllPermissionDatas(id,callback) {
      let treeData = [];
      getAllPermissionData(0).then(res => {
        res.tableContent.forEach(val => {
          if(val.leaf === 1){
            treeData.push({
              title: val.inventoryName
            });
          }else{
            treeData.push({
              title: val.inventoryName,
              loading: false,
              children: []
            });
          }
        })
        if(callback){
          callback(treeData)
        }else{
          this.data = treeData;
        }
      });
    },
    //异步加载树形数据
    loadData(item, callback) {
      this.getAllPermissionDatas(item.id,callback);
    }
  },
  mounted() {
      this.getAllPermissionDatas();
  }
};
</script>
