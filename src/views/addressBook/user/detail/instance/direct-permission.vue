<style lang="less" scoped>
    .direct{
      &-detail{
        background-color: #fff;
        width: 75%;
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
  .user-page {
    margin-top: 10px;
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
            <b @click="showAddPermission" class="direct-detail-btn">添加权限</b>
            <span style="color: #7a7676;">-添加直接权限</span>
            <b @click="deletePermission" class="direct-detail-btn">删除权限</b>
            <span style="color: #7a7676;">-删除直接权限</span>
            <Table ref="selection" @on-selection-change="onSelectionChange" :columns="columns" :loading="loading" :data="dirPermissionData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page size="small" @on-page-size-change="onPageSizeChange" :total="total" :current="currentPage" :page-size="pageSize" @on-change="onPageChange" show-total show-elevator show-sizer></Page>
                </div>
            </div>
        </div>
        <Modal
            v-model="showModal"
            title="权限列表"
            @on-ok="addPermission"
            width="400">
            <Tree class="app-tree" :data="allPermissionData" :multiple="true" @on-select-change="onCheckChange" :load-data="loadData"></Tree>
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
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h,params) => {
            return h('Button',{
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: '确认',
                    content: '确认删除此权限？',
                    onOk: () => {
                      deleteIndirPermission(this.userId,params.row.id).then(res => {
                        if(res.success){
                          this.$Message.success('删除成功！');
                          this.getDirPermissionData();
                          this.$emit('changeInstance');
                        }
                      }).catch(error => {
                          this.$Message.error(error.data.message);
                      })
                    }
                  });
                }
              }
            },'删除')
          }
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
      if(this.userId){
        this.loading = true;
        getDirectPermissionData(this.userId,this.pageSize,this.currentPage).then(res => {
          this.dirPermissionData = res.tableContent;
          this.total = res.dataCount;
          this.loading = false;
        })
      }else{
          this.loading = false;
      }
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
    //选择要删除的权限
    onSelectionChange(selection) {
        this.selectDeletePermission = selection;
    },
    //展示添加权限modal
    showAddPermission() {
      this.showModal = true;
      this.allPermissionData = [];
      this.getAllPermissionDatas();
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
      if(multiId && this.userId){
        addIndirPermission(this.userId,multiId.join(',')).then(res => {
          if(res.success){
            this.selectPermissionNode = [];
            this.$Message.success('更新成功');
            this.getDirPermissionData();
            this.$emit('changeInstance');
          }
        }).catch(error => {
            this.$Message.error(error.data.message);
        })
      }
    },
    //删除权限
    deletePermission() {
      let multiId = [];
      if(this.selectDeletePermission.length === 0){
        this.$Message.warning('请先选择要删除的权限！');
      }else{
        this.selectDeletePermission.forEach(val => {
          multiId.push(val.id);
        });
        if(multiId && this.userId){
          this.$Modal.confirm({
            title: '确认',
            content: '确认删除已选的权限？',
            onOk: () => {
              deleteIndirPermission(this.userId,multiId.join(',')).then(res => {
                if(res.success){
                  this.selectDeletePermission = [];
                  this.$Message.success('删除成功！');
                  this.getDirPermissionData();
                  this.$emit('changeInstance');
                }
              }).catch(error => {
                  this.$Message.error(error.data.message);
              })
            }
          });
        }
      }
    },
    //加载所有权限数据
    getAllPermissionDatas() {
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
