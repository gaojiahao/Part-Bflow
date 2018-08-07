<style lang="less" scoped>
@import "./memberInfo.less";
</style>

<template>
  <div class="member-wrap">
    <div class="member-wrap-table">
      <Button icon="md-add" type="primary" @click="showAllMember">添加</Button>
      <br>
      <Table :loading="memberLoading" :columns="columns1" :data="memberData">
      </Table>
      <div class="member-wrap-page">
        <Page :total="pageTotal" :current="memberCurrentPage" :page-size="pageSize" size="small" @on-change="pageChange" show-sizer show-elevator/>
      </div>
      <Modal v-model="showModal" title="选择用户" @on-ok="addCompanyMember" width="950">
        <Table ref="selection" :highlight-row="true" @on-row-click="onSelectionChange" height="400" :loading="allMemberLoading" :columns="columns1" :data="allMemberData"></Table>
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
  addCompanyMember
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
        }
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
      memberSelectionData: []
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
    onMemberPageChange(currentPage) {
      this.allMemberCurrentPage = currentPage;
      this.getAllUser();
    },
    onAllMemberPageSizeChange(pageSize) {
      this.allMemberPageSize = pageSize;
      this.getAllUser();
    },
    addCompanyMember() {
      let data = [];
      if (Object.keys(this.memberSelectionData.length > 0)) {
        this.memberSelectionData.forEach(function(s) {
          data.push({
            groupId: this.groupId,
            userId: s.userId
          });
        });
        addCompanyMember(data).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
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
