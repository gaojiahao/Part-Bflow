<style lang="less" scoped>
.permission-container-btn-export {
  float: right;
}

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
</style>


<template>
  <div>
    <custom-table apiUrl="/ds/getUsersByGroupId" :columns="memberInfoColumns" :apiParams="memberInfoParams" v-model="reload" @on-selection-change="onSelectionChange" @on-refesh-change='onRefeshChange'>
      <!-- <div slot="header">
        <Button icon="md-add" type="primary" @click="showMemberModal">添加成员</Button>
        <Button icon="md-remove" type="info" @click="deleteMemberInfo" :disabled="deleteBtnDisable">移除成员</Button>
        <Button icon="ios-download-outline" type="primary" class="permission-container-btn-export" @click="exportData">导出</Button>
      </div> -->

      <div slot="header" class="header-action">
        <label @click="showMemberModal">添加成员</label>
        <span>-添加成员</span>

        <label @click="deleteMemberInfo">移除成员</label>
        <span>-移除成员</span>

        <label @click="exportData" class="permission-container-btn-export">导出</label>
      </div>
    </custom-table>

    <member-modal v-model="isShowMemberModal" width="1000" footerBtnAlign="right" title="选择用户" @on-ok="saveSelectionUser">
      <div style="margin-top:10px;">
        <div class="app-search">
          <Input @on-search="userFilter" :search="true" v-model="searchValue" placeholder="搜索工号或名称" style="width: 300px"></Input>
          <a @click="userFilter" class="app-search-icon">
              <Button type="primary" size="small">查询</Button>
          </a>
        </div>
        <Table :loading="listUserLoading" :columns="memberInfoColumnsModel" :data="listUserData" size='small' ref="selection" @on-selection-change="onSelectUserList"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="listUserPageTotal" :current="listUserCurrentPage" :page-size="pageSize" size="small" @on-change="listUserChangePage" show-total show-elevator></Page>
          </div>
        </div>
      </div>
    </member-modal>
  </div>
</template>

<script>
import MemberModal from "@/components/modal/Modal";
import {
  listUsers,
  addOrgMember,
  deleteOrgMember,
  getAllUsers
} from "@/services/addressBookService.js";
import CustomTable from "./CustomTable";
export default {
  name: "member-info",

  components: {
    MemberModal,
    CustomTable
  },

  props: {
    groupId: {
      type: String
    }
  },

  data() {
    return {
      memberInfoLoading: false,
      memberInfoParams: {
        groupId: this.groupId,
        page: 1,
        limit: 8
      },
      memberInfoColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
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
          title: "操作",
          key: "action",
          width: 100,
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
                  cursor: "pointer",
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "确认",
                      content: "确认删除该成员？",
                      onOk: () => {
                        deleteOrgMember(
                          this.groupId,
                          params.row.userId,
                          0
                        ).then(res => {
                          if (res.success) {
                            this.$Message.success(res.message);
                            this.reload = true;
                            this.$emit("on-member-info-change", true);
                          }
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
      memberInfoColumnsModel: [
        {
          type: "selection",
          width: 60,
          align: "center"
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
        }
      ],

      //模态框参数
      searchValue: '',
      isShowMemberModal: false,
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
    //选中的成员信息
    onSelectionChange(selection) {
      if (selection.length > 0) {
        this.selectDeleteMemberInfo = selection;
      }
    },

    onRefeshChange(val) {
      if (!val) {
        this.reload = val;
      }
    },

    //监听模态框选中的用户
    onSelectUserList(selection) {
      this.onSelectionModal = selection;
    },

    //保存选中的用户
    saveSelectionUser() {
      let multiId = [];
      this.onSelectionModal.forEach(val => {
        multiId.push(val.userId);
      });
      if (multiId) {
        addOrgMember(this.groupId, multiId.join(","), 1).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.reload = true;
            this.isShowMemberModal = false;
            this.$emit("on-member-info-change", true);
          }
        });
      }
    },

    deleteMemberInfo() {
      let multiId = [];
      this.selectDeleteMemberInfo.forEach(val => {
        multiId.push(val.userId);
      });
      if (multiId) {
        deleteOrgMember(this.groupId, multiId.join(","), 0).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.reload = true;
            this.$emit("on-member-info-change", true);
          }
        });
      }
    },

    //获取用户列表
    getListUsers(currentPage, pageSize,filter) {
      this.listUserLoading = true;
      getAllUsers(pageSize,currentPage,filter).then(res => {
        if (res.tableContent[0]) {
          this.listUserPageTotal = res.dataCount;
          this.listUserData = res.tableContent;
          this.listUserLoading = false;
        }
      });
    },

    listUserChangePage(currentPage) {
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}
      ]);
      this.getListUsers(currentPage, this.pageSize,filter);
    },

    //显示模态框-添加成员
    showMemberModal() {
      this.isShowMemberModal = true;
      this.getListUsers(this.listUserCurrentPage, this.pageSize);
    },
    //成员信息导出xmls
    exportData() {
      this.$refs.selection.exportCsv({
        filename: "成员信息"
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

