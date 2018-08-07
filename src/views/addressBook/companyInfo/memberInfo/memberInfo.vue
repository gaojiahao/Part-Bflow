<style lang="less" scoped>
@import "./memberInfo.less";
</style>

<template>
  <div class="member-wrap">
    <div class="member-wrap-table">
      <Button type="info" @click="showAllMember" style="margin-bottom:5px;">添加</Button>
      <Button type="info" @click="delCompanyMember" style="margin-bottom:5px;">删除</Button>
      <br>
      <Table :loading="memberLoading" :columns="columns1" :data="memberData" @on-selection-change="onMemberSelectionChange">
      </Table>
      <div class="member-wrap-page">
        <Page :total="pageTotal" :current="memberCurrentPage" :page-size="pageSize" size="small" @on-change="pageChange" show-sizer show-elevator/>
      </div>
      <Modal v-model="showModal" title="选择用户" @on-ok="addCompanyMember" width="950">
        <Table ref="selection" :highlight-row="true" @on-selection-change="onSelectionChange" height="400" :loading="allMemberLoading" :columns="columns1" :data="allMemberData"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div class="fr">
            <Page @on-page-size-change="onAllMemberPageSizeChange" :total="allMemberTotal" show-elevator show-sizer :current="allMemberCurrentPage" :page-size="allMemberPageSize" @on-change="onMemberPageChange" size="small" show-total></Page>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import {
  getCompanyList,
  getAllUser,
  addCompanyMember,
  removeCompanyMember
} from "@/services/addressBookService.js";
export default {
  data() {
    return {
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
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
          width: 100,
          key: "gender"
        },
        {
          title: "手机",
          width: 150,
          key: "mobile"
        },
        {
          title: "邮箱",
          width: 150,
          key: "email"
        },
        {
          title: "创建时间",
          width: 150,
          key: "crtTime"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            let userStatus = "";
            if (params.row.status === 1) {
              userStatus = "使用中";
            } else if (params.row.status === 0) {
              userStatus = "停用";
            } else {
              userStatus = "未使用";
            }
            return h(
              "span",
              {
                style: {
                  color: "#39f"
                }
              },
              userStatus
            );
          }
        }
        //,
        // {
        //   title: "操作",
        //   key: "action",
        //   width: 150,
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "error",
        //             size: "small"
        //           },
        //           on: {
        //             click: () => {
        //               this.delCompanyMember(params.index);
        //             }
        //           }
        //         },
        //         "删除"
        //       )
        //     ]);
        //   }
        // }
      ],
      groupId: this.$route.params.groupId,
      memberData: [],
      pageTotal: 0,
      memberLoading: false,
      memberCurrentPage: 1,
      pageSize: 10,
      showModal: false,
      allMemberLoading: false,
      allMemberTotal: 0,
      allMemberCurrentPage: 1,
      allMemberPageSize: 10,
      allMemberData: [],
      target: 4,
      memberSelectionData: [],
      nowMemberselectionData: []
    };
  },
  methods: {
    //获取所有公司成员信息
    getAllUser() {
      this.allMemberLoading = true;
      getAllUser(this.allMemberCurrentPage, this.allMemberPageSize).then(
        res => {
          if (res.tableContent[0]) {
            this.allMemberData = res.tableContent;
            this.allMemberTotal = res.summary.total;
            this.allMemberLoading = false;
          }
        }
      );
    },
    //获取公司成员信息
    getCompanyMember() {
      this.memberLoading = true;
      getCompanyList(
        this.groupId,
        this.target,
        this.allMemberCurrentPage,
        this.allMemberPageSize
      ).then(res => {
        if (res.length > 0) {
          this.memberData = res[0].userList;
          this.pageTotal = res.length;
          this.memberLoading = false;
        }
      });
    },
    //删除公司成员
    delCompanyMember() {
      let userIds = [];
      if (this.nowMemberselectionData.length > 0) {
        this.nowMemberselectionData.forEach(function(s) {
          userIds.push(s.userId);
        });
        removeCompanyMember(userIds, this.groupId).then(res => {
          if (res.success) {
            this.$Message.success("删除成功!");
            this.getCompanyMember();
          }
        });
      } else {
        this.$Message.warning("请选择至少一个成员！");
      }
    },
    //当前页改变
    pageChange(memberCurrentPage) {
      this.getCompanyMember(memberCurrentPage, this.pageSize);
    },
    //弹出所有用户
    showAllMember() {
      this.showModal = true;
      this.getAllUser();
    },
    onSelectionChange(selection) {
      this.memberSelectionData = selection;
    },
    onMemberSelectionChange(selection) {
      this.nowMemberselectionData = selection;
    },
    onMemberPageChange(currentPage) {
      this.allMemberCurrentPage = currentPage;
      this.getAllUser();
    },
    onAllMemberPageSizeChange(pageSize) {
      this.allMemberPageSize = pageSize;
      this.getAllUser();
    },
    //新增公司成员
    addCompanyMember() {
      let userIds = [];
      if (this.memberSelectionData.length > 0) {
        this.memberSelectionData.forEach(function(s) {
          userIds.push(s.userId);
        });
        addCompanyMember(userIds, this.groupId).then(res => {
          if (res.success) {
            this.$Message.success("新增成功!");
            this.getCompanyMember();
          }
        });
      } else {
        this.$Message.warning("请选择至少一个公司！");
      }
    }
  },
  mounted() {
    this.getCompanyMember();
  }
};
</script>
