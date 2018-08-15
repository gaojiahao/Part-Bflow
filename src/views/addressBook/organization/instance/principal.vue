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
</style>

<template>
  <div>
    <custom-table apiUrl="/ds/getPrincipalByGroupId" :columns="principalColumns" :apiParams="principalParams" v-model="reload" @on-refesh-change='onRefeshChange'>
      <div slot="header" class="header-action">
        <label @click="addPrincipal">添加负责人</label>
        <span>-添加负责人</span>
      </div>
    </custom-table>

    <principal-modal v-model="isShowPrincipalModal" width="1000" footerBtnAlign="right" title="选择负责人" @on-ok="savaSelectUser">
      <div>
        <Table :loading="listUserLoading" :columns="principalColumnsModel" :data="listUserData" size='small' highlight-row ref="currentRowTable" @on-row-dblclick="handleDblclick" @on-current-change="onSelectUserList"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="listUserPageTotal" :current="listUserCurrentPage" :page-size="pageSize" size="small" @on-change="listUserChangePage" show-total show-elevator></Page>
          </div>
        </div>
      </div>
    </principal-modal>
  </div>
</template>

<script>
import PrincipalModal from "@/components/modal/Modal";
import CustomTable from "./CustomTable";
import { listUsers, savePrincipal } from "@/services/addressBookService.js";
export default {
  name: "principal",

  components: {
    CustomTable,
    PrincipalModal
  },

  props: {
    groupId: {
      type: String
    }
  },

  data() {
    return {
      principalParams: {
        groupId: this.groupId,
        page: 1,
        limit: 8
      },
      principalColumns: [
        {
          title: "名称",
          key: "nickname"
        },
        {
          title: "性别",
          key: "gender",
          render: (h, params) => {
            let gender = params.row.gender;
            return h(
              "span",
              gender === 1 ? "男" : gender === 0 ? "女" : "未知"
            );
          }
        },
        {
          title: "联系电话",
          key: "mobile"
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
                      content: "确认删除该负责人？",
                      onOk: () => {
                        let data = {
                          groupId:this.groupId,
                          principal:''
                        }
                        this.savePrincipal(data)
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

      principalColumnsModel: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "工号",
          width: 100,
          key: "userCode"
        },
        {
          title: "姓名",
          width: 100,
          key: "nickname"
        },
        {
          title: "性别",
          key: "gender",
          width: 60,
          render: (h, params) => {
            let gender = params.row.gender;
            return h(
              "span",
              gender === 1 ? "男" : gender === 0 ? "女" : "未知"
            );
          }
        },
        {
          title: "手机号",
          key: "mobile"
        },
        {
          title: "状态",
          width: 60,
          key: "status",
          render: (h, params) => {
            let status = '';
            switch (params.row.status) {
                case 1:
                    status = "使用中";
                    break;
                case 3:
                    status = "草稿";
                    break;
                case 2:
                    status = "未使用";
                    break;
                case 0:
                    status = "停用";
                    break;
            }
            return h(
              "span",
              {
                style: {
                  color: "#0279f6",
                  cursor: "default"
                }
              },
              status
            );
          }
        },
        {
          title: "创建者",
          key: "creator",
          width: 100
        },
        {
          title: "创建时间",
          key: "crtTime"
        },
        {
          title: "修改时间",
          key: "modTime"
        }
      ],

      //模态框参数
      isShowPrincipalModal: false,
      listUserLoading: false,
      listUserData: [],
      listUserPageTotal: 0,
      listUserCurrentPage: 1,
      pageSize: 8,

      //模态框参数
      onSelectionModal: [],
      selectDeleteMemberInfo: [],
      reload: false
    };
  },

  methods: {
    addPrincipal() {
      this.isShowPrincipalModal = true;
      this.getListUsers(this.listUserCurrentPage, this.pageSize);
    },

    //获取用户列表
    getListUsers(currentPage, pageSize) {
      this.listUserLoading = true;
      listUsers(currentPage, pageSize).then(res => {
        if (res.tableContent[0]) {
          this.listUserPageTotal = res.summary.total;
          this.listUserData = res.tableContent;
          this.listUserLoading = false;
        }
      });
    },

    listUserChangePage(currentPage) {
      this.getListUsers(currentPage, this.pageSize);
    },

    //监听自定义table传回来的状体值
    onRefeshChange(val) {
      if (!val) {
        this.reload = val;
      }
    },

    //监听模态框选中的用户
    onSelectUserList(currentRow, oldCurrentRow) {
      this.onSelectionModal = currentRow;
    },

    //双击选中
    handleDblclick(row, index) {
      let data = {
        groupId: this.groupId,
        principal: row.userId
      };
      this.savePrincipal(data);
    },

    //点击确定保存
    savaSelectUser() {
      let data = {
        groupId: this.groupId,
        principal: this.onSelectionModal.userId
      };
      this.savePrincipal(data);
    },

    savePrincipal(data) {
      savePrincipal(data)
        .then(res => {
          if (res.success) {
            this.$Message.success("保存成功");
            this.isShowPrincipalModal = false;
            this.reload = true;
            this.$emit("on-principal-change", true);
          }
        })
        .catch(error => {
          this.$Message.error(error.data.message);
        });
    }
  }
};
</script>