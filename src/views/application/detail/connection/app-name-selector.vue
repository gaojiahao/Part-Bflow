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
.app-search {
    margin-bottom: 5px;
    .app-search-icon {
      font-size: 1rem;
      color: #39f;
      display: inline-block;
      cursor: pointer;
    }
  }
</style>

<template>
    <div>
      <!-- 应用名称modal -->
      <Modal 
        v-model="showAppNameModal" 
        title="应用选择" 
        :mask-closable="false" 
        width="400"
        :styles="{top: '15px'}" 
        @on-ok="confirmAppName">
        <div class="app-search">
          <Input 
            v-model="searchValue" 
            @on-search="appNameFilter" 
            :search="true" 
            placeholder="应用名称搜索" 
            style="width: 300px">
          </Input>
        </div>
        <Tree
          ref="permissionTree"
          @on-check-change="onCheckChange"
          :data="data"
          :load-data="loadData"
          show-checkbox
          class="permission-tree"
          empty-text=" ">
        </Tree>
      </Modal>
    </div>
</template>

<script>
import { getProcessAppNames,searchProcessAppNames } from "@/services/appService.js";

export default {
  name: "UserSelector",
  components: {},
  data() {
    return {
      searchValue: "",
      showAppNameModal: false,
      data: [],
      appNameSelection: []
    };
  },
  watch: {
      showAppNameModal: function (value) {
          if(value){
              this.showAppNameModal = value;
              this.appNameSelection = [];
              this.selectAppModal();
          }
      }
  },
  methods: {
    appNameFilter() {
      this.data = [];
      if(this.searchValue){
        searchProcessAppNames(this.searchValue).then(res => {
          res.tableContent.forEach(val => {
            this.data.push({
                title: val.text,
                listId: val.listId,
                id: val.id,
                leaf: val.leaf
            })
          })
        })
      }else{
        this.selectAppModal('root');
      }
      
    },
    //应用数据加载
    selectAppModal(id, callback) {
        let treeData = [],
        parentId = id ? id : "root";
      getProcessAppNames(
        parentId
      ).then(res => {
        res.forEach(val => {
          if (val.leaf) {
            let appTitle = val.comment ? `${val.text}(${val.comment})` : `${val.text}`;
            treeData.push({
              title: appTitle,
              listId: val.listId,
              id: val.id,
              leaf: val.leaf
            });
          } else {
            treeData.push({
              title: val.text,
              listId: val.listId,
              id: val.id,
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
      for(let i=0;i<this.appNameSelection.length;i++){
        if(!this.appNameSelection[i].leaf){
          this.appNameSelection.splice(i,1);
        }
      }
      this.$emit('appSelectData',this.appNameSelection);
    }
  },
  mounted() {
  }
};
</script>