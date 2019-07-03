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
.app-search {
    margin-bottom: 5px;
    .app-search-icon {
      font-size: 1rem;
      color: #39f;
      display: inline-block;
      cursor: pointer;
    }
  }

  .rfd-principal-table .ivu-table-row-highlight td{
  background-color: #81b2e59c !important;
}
</style>

<template>
  <div>
    <custom-table apiUrl="/ds/getPrincipalByGroupId" :columns="principalColumns" :apiParams="principalParams" v-model="reload" @on-refesh-change='onRefeshChange' :isHiddenPage="true">
      <div v-if="isPermission" slot="header" class="header-action">
        <label @click="addPrincipal">添加负责人</label>
        <span>-添加负责人</span>
      </div>
    </custom-table>

    <principal-modal v-model="isShowPrincipalModal" width="1000" footerBtnAlign="right" title="选择负责人" @on-ok="savaSelectUser">
      <div>
        <div class="app-search">
          <Input @on-search="userFilter" :search="true" v-model="searchValue" placeholder="搜索工号或者名称" style="width: 300px"></Input>
          <a @click="userFilter" class="app-search-icon">
              <Button type="primary" size="small">查询</Button>
          </a>
        </div>
        <Table class="rfd-principal-table" height="400" :loading="listUserLoading" :columns="principalColumnsModel" :data="listUserData" size='small' highlight-row ref="currentRowTable" @on-row-dblclick="handleDblclick" @on-current-change="onSelectUserList"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="listUserPageTotal" :current="listUserCurrentPage" :page-size="pageSize" size="small" @on-change="listUserChangePage" @on-page-size-change="onPageSizeChange" show-total show-elevator show-sizer></Page>
          </div>
        </div>
      </div>
    </principal-modal>
  </div>
</template>

<script>
import PrincipalModal from "@/components/modal/Modal";
import CustomTable from "./CustomTable";
import { listUsers, savePrincipal,getAllUsers } from "@/services/addressBookService.js";
export default {
  name: "principal",

  components: {
    CustomTable,
    PrincipalModal
  },

  props: {
    groupId: {
      type: String
    },
    isPermission: {
      type: Boolean
    }
  },

  data() {
    return {
      principalParams: {
        groupId: this.groupId,
        page: 1,
        limit: 10
      },
      searchValue: '',
      principalColumns: [
        {
          title: "头像",
          key: "photo",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h("Avatar", {
                props: {
                  src: params.row.photo?params.row.photo:'resources/images/icon/defaultUserPhoto.png'
                }
              })
            ]);
          }
        },
         {
          title: "工号",
          width: 100,
          key: "USER_CODE"
        },
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
          title: "邮箱",
          key: "email"
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
                  size: "small",
                  disabled: !this.isPermission
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
                        this.savePrincipal(data,'删除成功！')
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
          title: "头像",
          key: "photo",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h("Avatar", {
                props: {
                  src: params.row.photo?params.row.photo:'resources/images/icon/defaultUserPhoto.png'
                }
              })
            ]);
          }
        },
        {
          title: "工号",
          key: "userCode"
        },
        {
          title: "姓名",
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
          title: "手机号",
          key: "mobile"
        },
        {
          title: "邮箱",
          key: "email"
        }
      ],

      //模态框参数
      isShowPrincipalModal: false,
      listUserLoading: false,
      listUserData: [],
      listUserPageTotal: 0,
      listUserCurrentPage: 1,
      pageSize: 10,

      //模态框参数
      onSelectionModal: [],
      selectDeleteMemberInfo: [],
      reload: false
    };
  },

  methods: {
    addPrincipal() {
      this.isShowPrincipalModal = true;
       this.searchValue = '';
      this.getListUsers(this.listUserCurrentPage, this.pageSize);
    },

    //获取用户列表
    getListUsers(currentPage, pageSize,filter) {
      this.listUserLoading = true;
      getAllUsers(pageSize,currentPage,filter).then(res => {
        this.listUserPageTotal = res.summary.total;
        this.listUserData = res.tableContent;
        this.listUserLoading = false;
      });
    },

    listUserChangePage(currentPage) {
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}
      ]);
      this.getListUsers(currentPage, this.pageSize,filter);
    },

       //点击切换每页显示条数
    onPageSizeChange(size) {
      this.pageSize = size;
       let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}
      ]);
      this.getListUsers(1, size,filter);
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

    savePrincipal(data,message) {
      savePrincipal(data)
        .then(res => {
          if (res.success) {
            this.$Message.success(message?message:'更新成功');
            this.isShowPrincipalModal = false;
            this.reload = true;
            this.$emit("on-principal-change", true);
          }
        })
        .catch(error => {
          this.$Message.error(error.data.message);
        });
    },
    //过滤
    userFilter() {
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}
      ]);
      this.getListUsers(this.listUserCurrentPage,this.pageSize,filter);
    }
  }
};
</script>