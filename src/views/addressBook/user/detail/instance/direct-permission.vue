<style lang="less" scoped>
    .direct{
      &-detail{
        background-color: #fff;
        margin: 15px 93px;
        padding: 26px 50px;
        box-shadow: 0px 1px 40px #ddd;
      }
  }
  .user-page {
    margin: 10px;
    overflow: hidden;
  }
  .app-tree{
    height: 350px;
    overflow: auto;
  }
</style>

<template>
    <div class="direct">
        <div class="direct-detail" id="directHeight">
            <Button type="info" @click="showAddPermission" icon="md-add" size="small" style="margin-bottom:5px">添加权限</Button>
            <Button type="info" @click="deletePermission" icon="md-remove" :disabled="isDisabled" size="small" style="margin-bottom:5px">删除权限</Button>
            <Table ref="selection" @on-selection-change="onSelectionChange" :columns="columns" :loading="loading" :data="dirPermissionData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page @on-page-size-change="onPageSizeChange" :total="total" show-elevator show-sizer :current="currentPage" :page-size="pageSize" @on-change="onPageChange" size="small" show-total></Page>
                </div>
            </div>
        </div>
        <Modal
            v-model="showModal"
            title="选择权限"
            @on-ok="addPermission"
            width="400">
            <Tree class="app-tree" :data="allPermissionData" :multiple="false" @on-check-change="onCheckChange" :load-data="loadData" show-checkbox></Tree>
        </Modal>
    </div>
</template>

<script>
import { getDirectPermissionData,getAllPermissionData,addIndirPermission,deleteIndirPermission } from "@/services/addressBookService.js";

export default {
  name: "directPermission",
  components: {},
  props: {},
  data() {
    return {
      userId: this.$route.params.userId,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      loading: true,
      isDisabled: true,
      showModal: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          key: "name"
        }
      ],
      dirPermissionData: [],
      allPermissionData: [],
      selectPermissionNode: [],
      selectDeletePermission: []
    };
  },
  methods: {
    //获取直接权限数据
    getDirPermissionData() {
      this.loading = true;
      getDirectPermissionData(this.userId,this.pageSize,this.currentPage).then(res => {
        this.dirPermissionData = res.tableContent;
        this.total = res.dataCount;
        this.loading = false;
      })
    },
    //点击分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getDirPermissionData();
    },
    //点击切换每页显示条数
    onPageSizeChange(size) {
      this.pageSize = size;
      this.getDirPermissionData();
    },
    //未选中禁用删除权限按钮
    onSelectionChange(selection) {
        if(selection.length === 0) {
            this.isDisabled = true;
        }else{
            this.isDisabled = false;
        }
        this.selectDeletePermission = selection;
    },
    //展示添加权限modal
    showAddPermission() {
      this.showModal = true;
      this.getAllPermissionData();
    },
    //点击节点选择权限
    onCheckChange(node) {
      this.selectPermissionNode = node;
    },
    //添加权限
    addPermission() {
      let multiId = [];
      this.selectPermissionNode.forEach(val => {
        multiId.push(val.id);
      });
      if(multiId){
        addIndirPermission(this.userId,multiId.join(',')).then(res => {
          if(res.success){
            this.$Message.success(res.message);
            this.getDirPermissionData();
          }
        })
      }
    },
    //删除权限
    deletePermission() {
      let multiId = [];
      this.selectDeletePermission.forEach(val => {
        multiId.push(val.id);
      });
      if(multiId){
        deleteIndirPermission(this.userId,multiId.join(',')).then(res => {
          if(res.success){
            this.$Message.success(res.message);
            this.getDirPermissionData();
            this.isDisabled = true;
          }
        })
      }
    },
    //加载所有权限数据
    getAllPermissionData() {
      if(this.allPermissionData.length === 0){
        getAllPermissionData(0).then(res => {
          res.tableContent.forEach(val => {
            this.allPermissionData.push({
              title: val.name,
              id: val.id,
              loading: false,
              children: []
            });
          })
        })
      }
    },
    //异步加载权限数据
    loadData(item,callback) {
      getAllPermissionData(item.id).then(res => {
        let data = [];
        res.tableContent.forEach(val => {
          if(val.leaf === 'false'){
            data.push({
              title: val.name,
              id: val.id,
              loading: false,
              children: []
            })
          }else{
            data.push({
              title: val.name,
              id: val.id,
            })
          } 
        })
        callback(data);
      })
    }
  },
  mounted() {
    this.getDirPermissionData();
  }
};
</script>
