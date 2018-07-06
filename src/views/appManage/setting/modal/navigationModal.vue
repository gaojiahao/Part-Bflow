<style lang="less" scoped>
  .nav-tree{
    height: 400px;
    overflow-y: auto;
  }
</style>
<template>
  <Modal v-model="showNav" title="工作流设置" width="300" @on-ok="publishApp" @on-visible-change="modalVisibleChange">
    <Tree class="nav-tree" :data="navData" :load-data="loadData" show-checkbox></Tree>
  </Modal>
</template>

<script>
import {
  getAllProcessData,
  getProcessDataByListId,
  getNavData
} from "@/services//appService.js";

export default {
  name: "navModal",
  props: {
    modalNavStatus: Boolean
  },
  data() {
    return {
      showNav: false,
      navData: []
    };
  },
  watch: {
    modalNavStatus: function(value, oldValue) {
      this.showNav = value;
    }
  },
  methods: {
    //通知父组件modal的状态
    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitNavModal", { modal: false });
      }
    },
    //发布应用到菜单
    publishApp() {},
    //获取菜单
    getNavData() {
      let rootParams = {
        parentId: 'root'
      };
      getNavData(rootParams).then(res => {
        res.forEach((val, index) => {
          if(val.leaf === 1){
              this.navData.push({
                title: val.text,
                id: val.id
            });
          }else{
              this.navData.push({
              title: val.text,
              id: val.id,
              loading: false,
              children: []
            });
          }
        });
      });
    },
    //异步加载菜单数据
    loadData(item, callback) {
      let childrenParams = {
        parentId: item.id
      };
      getNavData(childrenParams).then(res => {
        const data = [];
        res.forEach(val => {
          if(val.leaf === 1){
            data.push({
              title: val.text,
              id: val.id
            })
          }else{
            data.push({
              title: val.text,
              id: val.id,
              loading: false,
              children: []
            })
          }
        });
        callback(data);
      })
    }
  },
  mounted() {
    this.getNavData();
  }
};
</script>
