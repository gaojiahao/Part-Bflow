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
  .app-table-search{
    float: right;
    .app-search-icon {
      font-size: 1rem;
      color: #fff;
      display: inline-block;
      cursor: pointer;
    }
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
.page-selection-warp {
    width: 100%;
    height: 100%;
    min-height: 30px;
    background-color: #e6e6e6;
    margin-bottom: -8px;
    padding: 1px 5px;
  }
</style>

<template>
  <div class="direct">
    <div class="direct-detail" id="directHeight">
      <div class="direct-header">
        <div v-if="isUpdate" style="display:inline;">
          <b @click="showAddPermission" class="direct-detail-btn">添加权限</b>
          <span style="color: #7a7676;">-添加直接权限</span>
          <b @click="deletePermission" class="direct-detail-btn">删除权限</b>
          <span style="color: #7a7676;">-删除直接权限</span>
        </div>
        <div class="app-table-search">
          <Input 
            @on-search="permissionFilter" 
            :search="true" 
            v-model="searchValue" 
            placeholder="搜索权限名称" 
            style="width: 300px">
          </Input>
          <a @click="permissionFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </a>
        </div>
      </div>
      <div class="direct-table">
        <Table 
          style="margin-top:10px;"  
          @on-selection-change="onSelectionChange" 
          :columns="columns" 
          :loading="loading" 
          :data="dirPermissionData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page 
              size="small" 
              @on-page-size-change="onPageSizeChange" 
              :total="total" 
              :current="currentPage" 
              :page-size="pageSize"
              @on-change="onPageChange" 
              show-total 
              show-elevator 
              show-sizer>
            </Page>
          </div>
        </div>
      </div>
    </div>
    <!-- 权限modal -->
    <permission-modal 
      :target="target"
      :visible="showModal" 
      @changeModalStatus="changeModalStatus"
      @permissionChange="permissionChange">
    </permission-modal>
  </div>
</template>

<script>
import {
  getDirectPermissionData,
  deleteIndirPermission
} from "@/services/addressBookService.js";
import PermissionModal from './permission-modal';

export default {
  name: "directPermission",
  components: {
    PermissionModal
  },
  props: {
    isUpdate: {
          type: Boolean
      }
  },
  data() {
    return {
      userId: this.$route.params.userId,
      searchValue: "",
      target: {
        type: 'sys_user_permission',
        targetId: this.$route.params.userId
      },
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
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small",
                  disabled: !this.isUpdate
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "确认",
                      content: "确认删除此权限？",
                      onOk: () => {
                        deleteIndirPermission(this.userId, params.row.id)
                          .then(res => {
                            if (res.success) {
                              this.$Message.success("删除成功！");
                              this.getDirPermissionData();
                              this.$emit("changeInstance");
                            }
                          })
                          .catch(error => {
                            this.$Message.error(error.data.message);
                          });
                      }
                    });
                  }
                }
              },
              "删除"
            );
          }
        }
      ],
      dirPermissionData: [],
      selectDeletePermission: []
    };
  },
  methods: {
    //添加权限后更新数据
    permissionChange() {
      this.getDirPermissionData();
      this.$emit("changeInstance");
    },
    // //监听modal状态变化
    changeModalStatus() {
      this.showModal = false;
    },
    //获取直接权限数据
    getDirPermissionData(filter) {
      if (this.userId) {
        this.loading = true;
        getDirectPermissionData(
          this.userId,
          this.pageSize,
          this.currentPage,
          filter
        ).then(res => {
          this.dirPermissionData = res.tableContent;
          this.total = res.dataCount;
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    },
    //点击分页
    onPageChange(currentPage) {
      let filter = JSON.stringify([
        {
          operator: "like",
          value: this.searchValue,
          property: "name"
        }
      ]);
      this.currentPage = currentPage;
      this.getDirPermissionData(filter);
    },
    //点击切换每页显示条数
    onPageSizeChange(size) {
      this.pageSize = size;
      this.getDirPermissionData();
    },
    //删除权限
    deletePermission() {
      let multiId = [];
      if (this.selectDeletePermission.length === 0) {
        this.$Message.warning("请先选择要删除的权限！");
      } else {
        this.selectDeletePermission.forEach(val => {
          multiId.push(val.id);
        });
        if (multiId && this.userId) {
          this.$Modal.confirm({
            title: "确认",
            content: "确认删除已选的权限？",
            onOk: () => {
              deleteIndirPermission(this.userId, multiId.join(","))
                .then(res => {
                  if (res.success) {
                    this.selectDeletePermission = [];
                    this.$Message.success("删除成功！");
                    this.getDirPermissionData();
                    this.$emit("changeInstance");
                  }
                })
                .catch(error => {
                  this.$Message.error(error.data.message);
                });
            }
          });
        }
      }
    },
    //选择要删除的权限
    onSelectionChange(selection) {
      this.selectDeletePermission = selection;
    },
    //展示添加权限modal
    showAddPermission() {
      this.showModal = true;
    },
    //权限过滤
    permissionFilter() {
      let filter = JSON.stringify([
        {
          operator: "like",
          value: this.searchValue,
          property: "name"
        }
      ]);
      this.getDirPermissionData(filter);
    }
  },
  mounted() {
    this.getDirPermissionData();
  }
};
</script>
