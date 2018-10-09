<style lang="less" scoped>
.header-action {
  label {
    color: #009688;
    font-size: 17px;
    cursor: pointer;
    font-weight: bold;
  }

  span {
    color: rgb(122, 118, 118);
  }
}
.user-page {
    margin: 10px;
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
.page-selection-warp {
    width: 100%;
    height: 100%;
    min-height: 30px;
    background-color: #e6e6e6;
    margin-bottom: 10px;
    padding: 1px 5px;
  }
</style>

<template>
  <div>
    <custom-table apiUrl="/ds/getObjectPermission2Oneself" :columns="permissionColumns" :apiParams="permissionParams" v-model="reload" @on-selection-change="onSelectionChange" @on-refesh-change='onRefeshChange'>
      <!-- <div slot="header" class="permission-container-btn">
        <Button icon="md-add" type="primary" @click="addPermission">添加权限</Button>
        <Button icon="md-remove" type="info" @click="deletePermission" :disabled="deleteBtnDisable">移除权限</Button>
      </div> -->

      <div slot="header" class="header-action">
        <label @click="addPermission">添加权限</label>
        <span>-添加权限</span>

        <label @click="deletePermission">移除权限</label>
        <span>-移除权限</span>

        <div class="app-table-search">
          <Input @on-search="permissionFilter" :search="true" v-model="searchValue" placeholder="搜索权限名称" style="width: 300px"></Input>
          <a @click="permissionFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </a>
        </div>

      </div>
    </custom-table>
    <!-- 权限modal -->
    <permission-modal 
    :permissionId="groupId" 
    :permissionType="type"
    :isShowModal="isShowModal" 
    @changeModalStatus="changeModalStatus"
    @permissionChange="permissionChange">
    </permission-modal>
  </div>
</template>

<script>
import { deleteOrgPermission } from "@/services/addressBookService.js";
import CustomTable from "./CustomTable";
import PermissionModal from '../../user/detail/instance/permission-modal';

export default {
  name: "principal",

  components: {
    CustomTable,
    PermissionModal
  },

  props: {
    groupId: {
      type: String
    }
  },

  data() {
    return {
      permissionParams: {
        objectName: "group",
        objectId: this.groupId,
        page: 1,
        limit: 10,
        start: 0
      },
      permissionColumns: [
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
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                style: {
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "确认",
                      content: "确认删除该权限？",
                      onOk: () => {
                        deleteOrgPermission(this.groupId, params.row.id).then(
                          res => {
                            if (res.success) {
                              this.$Message.success("删除成功!");
                              this.reload = true;
                              this.isShowModal = false;
                              this.$emit("on-permission-change", true);
                            }
                          }
                        );
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

      //模态框参数
      isShowModal: false,
      selectDeletePermission: [],
      reload: false,
      searchValue: "",
      type: 'sys_group_permission'
    };
  },

  methods: {
    //添加权限后更新数据
    permissionChange() {
      this.reload = true;
      this.$emit("on-permission-change", true);
    },
    //监听modal状态变化
    changeModalStatus() {
      this.isShowModal = false;
    },

    listUserChangePage(currentPage) {
      this.getListUsers(currentPage, this.pageSize);
    },

    addPermission() {
      this.isShowModal = true;
      this.searchPermissionListValue = "";
      this.getAllPermissionDatas();
    },

    deletePermission() {
      let that = this;
      let multiId = [];
      this.selectDeletePermission.forEach(val => {
        multiId.push(val.id);
      });
      if (multiId) {
        deleteOrgPermission(this.groupId, multiId.join(",")).then(res => {
          if (res.success) {
            that.$Message.success("删除成功!");
            that.reload = true;
            that.isShowModal = false;
            this.$emit("on-permission-change", true);
          }
        });
      }
    },

    onSelectionChange(selection) {
      if (selection.length > 0) {
        this.selectDeletePermission = selection;
      }
    },

    onRefeshChange(val) {
      if (!val) {
        this.reload = val;
      }
    },

    //点击节点选择权限
    onCheckChange(node) {
      this.selectPermissionNode = node;
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
      this.permissionParams.filter = filter;
      this.reload = true;
    }
  }
};
</script>
