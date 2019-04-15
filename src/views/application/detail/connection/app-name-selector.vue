<style lang="less">
  .app-search {
    margin-bottom: 5px;
    .app-search-icon {
      font-size: 1rem;
      color: #39f;
      display: inline-block;
      cursor: pointer;
    }
  }
  .user-page {
    margin: 10px;
    overflow: hidden;
  }
</style>

<template>
    <div>
      <!-- 应用名称modal -->
      <Modal 
        v-model="showAppNameModal" 
        title="应用选择" 
        :mask-closable="false" 
        width="800"
        :styles="{top: '15px'}" 
        @on-ok="confirmAppName">
        <Tree
          ref="permissionTree"
          @on-check-change="onCheckChange"
          :data="data"
          :load-data="loadData"
          show-checkbox
          class="permission-tree">
        </Tree>
      </Modal>
    </div>
</template>

<script>
import { getProcessAppNames } from "@/services/appService.js";

export default {
  name: "UserSelector",
  components: {},
  data() {
    return {
      showAppNameModal: false,
      data: [],
      appNameSelection: []
    };
  },
  watch: {
      showAppNameModal: function (value) {
          if(value){
              this.showAppNameModal = value;
              this.selectAppModal();
          }
      }
  },
  methods: {
    //应用数据加载
    selectAppModal(id, callback) {
        let treeData = [],
        parentId = id ? id : "root";
      getProcessAppNames(
        parentId
      ).then(res => {
        res.forEach(val => {
          if (val.leaf) {
            treeData.push({
              title: val.processApplication,
              id: val.listId,
              leaf: val.leaf
            });
          } else {
            treeData.push({
              title: val.processApplication,
              id: val.listId,
              loading: false,
              leaf: val.leaf,
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
      this.selectAppModal(item.id, callback);
    },
    //选择应用
    onCheckChange(selectArray, currentSelect) {
      this.appNameSelection = selectArray;
    },
    //添加应用名称
    confirmAppName() {
      this.$emit('appSelectData',this.appNameSelection);
    }
  },
  mounted() {
  }
};
</script>