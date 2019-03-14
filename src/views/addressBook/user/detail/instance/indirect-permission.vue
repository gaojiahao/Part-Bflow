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
          :data="data"
          :load-data="loadData"
          class="permission-tree">
        </Tree>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllPermissionData } from "@/services/addressBookService.js";

export default {
  name: "indirectPermission",
  data() {
    return {
      userId: this.$route.params.userId,
      loading: false,
      searchValue: "",
      data: []
      
    };
  },
  methods: {
    //加载所有权限数据
    getAllPermissionDatas(id, callback) {
      let treeData = [],
        parentId = id ? id : "root";
      getAllPermissionData(
        parentId,
        this.userId,
        'user'
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
