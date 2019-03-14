<style lang="less" scoped>
    .direct{
      &-detail{
        background-color: #fff;
        width: 35%;
        margin: 0 auto;
        padding: 26px 50px;
        box-shadow: 0px 1px 10px #ddd;
        position: relative;
        &-btn{
          margin-bottom:5px;
          color: rgb(0, 150, 136);
          font-size: 17px;
          cursor: pointer;
        }
      }
  }
  .app-table-search{
    margin-bottom: 5px;
    .app-search-icon {
      font-size: 1rem;
      color: #fff;
      display: inline-block;
      cursor: pointer;
    }
}

.permission-tree{
    .ivu-tree-arrow i{
      font-size: 18px;
    }
  }
</style>

<template>
  <div class="direct">
    <div class="direct-detail" id="directHeight">
      <div class="direct-header">
        <div class="app-table-search">
          <Input 
            @on-search="permissionFilter" 
            :search="true" 
            v-model="searchValue" 
            placeholder="搜索权限名称" 
            style="width: 300px">
          </Input>
        </div>
      </div>
      <div class="direct-table">
        <Tree
          ref="permissionTree"
          @on-check-change="onCheckChange"
          :data="data"
          :load-data="loadData"
          show-checkbox
          class="permission-tree"
        >
        </Tree>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllPermissionData,
  addPermission,
  deletePermission
} from "@/services/addressBookService.js";

export default {
  name: "directPermission",
  components: {},
  props: {
    isUpdate: {
        type: Boolean
    },
    target: {
        type: Object
      }
  },
  data() {
    return {
      userId: this.$route.params.userId,
      loading: false,
      searchValue: "",
      data: [],
      selectPermission: [],
      
    };
  },
  methods: {
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
              if(this.target.type === 'user'){
                this.$emit("changeInstance");
              }else{
                this.$emit("on-permission-change", true);
              }
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
      }
    },
    //选择树节点
    onCheckChange(selectArray, currentSelect) {
      if(!currentSelect.checked){
        deletePermission(this.target.targetId,currentSelect.id,this.target.type).then(res => {
          if (res.success) {
            this.$Message.success("删除成功");
            this.$emit("permissionChange");
          }
        }).catch(error => {
            this.$Message.error(error.data.message);
        });
      }else{
        this.selectPermission = selectArray;
        this.addPermissions();
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
    },
    //权限过滤
    permissionFilter() {
      this.getAllPermissionDatas();
    }
  },
  mounted() {
    this.getAllPermissionDatas();
  }
};
</script>
