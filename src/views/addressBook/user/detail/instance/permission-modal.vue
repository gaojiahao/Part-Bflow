<style lang="less">
  .permission-tree{
    height: 500px;
    overflow: hidden;
    overflow-y: auto;
    overflow-x: auto;
    .ivu-tree-arrow i{
      font-size: 18px;
    }
  }
  /*滚动条样式*/
.permission-tree::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.permission-tree::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(117, 112, 112, 0.2);
    background: rgba(117, 112, 112, 0.2);
}
.permission-tree::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: #f4f6f8;
}
</style>

<template>
  <Modal
    v-model="showModal"
    title="权限列表"
    @on-ok="addPermissions"
    width="400"
    :styles="{top: '20px'}"
    height="600"
    @on-visible-change="onVisibleChange"
  >
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
  addPermission,
  deletePermission
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
    visible: function(value) {
      if (value) {
        this.showModal = true;
        this.getAllPermissionDatas();
      }
    }
  },
  methods: {
    //modal状态发生改变
    onVisibleChange(status) {
      if (!status) this.$emit("changeModalStatus");
    },
    //添加权限
    addPermissions() {
      let permissionIds = [],
          menuIds = [],
          data = {};

      this.selectPermission.forEach(val => {
        if (val.leaf) {
          permissionIds.push(val.id);
        } else {
          menuIds.push(val.id);
        }
      });
      
      if (this.selectPermission.length > 0 && this.target) {
        addPermission(
          JSON.stringify(permissionIds),
          JSON.stringify(menuIds),
          this.target.targetId,
          this.target.type
        )
          .then(res => {
            if (res.success) {
              this.selectPermission = [];
              this.$Message.success("更新成功");
              this.$emit("permissionChange");
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
      }
    },
    //选择树节点
    onCheckChange(selectArray, currentSelect) {
      this.selectPermission = selectArray;
      if(!currentSelect.checked){
        deletePermission(this.target.targetId,currentSelect.id,this.target.type).then(res => {
          if (res.success) {
            this.$Message.success("删除成功");
            this.$emit("permissionChange");
          }
        }).catch(error => {
            this.$Message.error(error.data.message);
        });
      }
    },
    //加载所有权限数据
    getAllPermissionDatas(id, callback) {
      let treeData = [],
        parentId = id ? id : "root";
      getAllPermissionData(
        parentId,
        this.target.targetId,
        this.target.type
      ).then(res => {
        res.forEach(val => {
          if (val.leaf) {
            treeData.push({
              title: val.text,
              id: val.id,
              leaf: val.leaf,
              checked: val.check
            });
          } else {
            treeData.push({
              title: val.text,
              id: val.id,
              loading: false,
              indeterminate: val.halfSelected,
              leaf: val.leaf,
              checked: val.check,
              children: []
            });
          }
        });
        if (callback) {
          callback(treeData);
        } else {
          this.data = treeData;
        }
      });
    },
    //异步加载树形数据
    loadData(item, callback) {
      this.getAllPermissionDatas(item.id, callback);
    }
  },
  mounted() {
    this.getAllPermissionDatas();
  }
};
</script>
