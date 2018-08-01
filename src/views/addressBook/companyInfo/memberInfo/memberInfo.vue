<style lang="less" scoped>
@import "./memberInfo.less";
</style>

<template>
    <div class="member-wrap">
        <div class="member-wrap-table">
            <Button icon="md-add" type="primary">添加</Button>
            <br>
            <Table :loading="memberLoading" :columns="columns1" :data="memberData">
            </Table>
            <div class="member-wrap-page">
                <Page :total="pageTotal" :current="memberCurrentPage" :page-size="pageSize" size="small" @on-change="pageChange" show-sizer show-elevator/>
            </div>
        </div>
    </div>

</template>

<script>
import { getCompanyMemberByCompanyId } from "@/services/addressBookService.js";
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
        }
      ],
      memberData: [],
      pageTotal: 0,
      memberLoading: false,
      memberCurrentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    //获取公司成员信息
    getCompanyMemberByCompanyId(currentPage, pageSize) {
      this.memberLoading = true;
      getCompanyMemberByCompanyId(currentPage, pageSize).then(res => {
        if (res.tableContent[0]) {
          this.memberData = res.tableContent;
          this.pageTotal = res.summary.total;
          this.memberLoading = false;
        }
      });
    },
    //当前页改变
    pageChange(memberCurrentPage) {
      this.getCompanyMemberByCompanyId(memberCurrentPage, this.pageSize);
    }
  },
  mounted() {
    this.getCompanyMemberByCompanyId(this.memberCurrentPage, this.pageSize);
  }
};
</script>
