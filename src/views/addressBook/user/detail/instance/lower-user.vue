<style lang="less">
    .lower-user{
      &-detail{
        background-color: #fff;
        margin: 5px 93px;
        padding: 26px 50px;
        box-shadow: 0px 1px 40px #ddd;
      }
  }
  .user-page {
    margin: 10px;
    overflow: hidden;
  }
</style>

<template>
    <div class="lower-user">
        <div class="lower-user-detail" id="lowHeight">
            <Button type="info" @click="showUserModal" style="margin-bottom:5px">选择下级用户</Button>
            <Table ref="selection" :columns="columns" :loading="loading" :data="lowerUserData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page :total="lowUser.total" show-elevator show-sizer :current="lowUser.currentPage" :page-size="lowUser.pageSize" @on-change="onPageChange" size="small" show-total></Page>
                </div>
            </div>
        </div>
        <Modal
            v-model="showModal"
            title="选择用户"
            @on-ok="addLowUser"
            width="1000">
            <Table ref="selection" @on-selection-change="onSelectionChange" height="400" :loading="userLoading" :columns="columns" :data="userData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page :total="lowUser.usertotal" show-elevator show-sizer :current="lowUser.usercurrentPage" :page-size="lowUser.pageSize" @on-change="onUserPageChange" size="small" show-total></Page>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getLowUserData,getAllUsers,updateHighUser } from "@/services/addressBookService.js";

export default {
  name: "lowerUser",
  components: {},
  props: {},
  data() {
    return {
      lowUser: {
        total: 0,
        usertotal: 0,
        currentPage: 1,
        usercurrentPage: 1,
        pageSize: 10,
      },
      loading: true,
      userLoading: true,
      showModal: false,
      columns: [
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
            let gender = params.row.gender === 1 ? "男" : "女";
            return h("span", {}, gender);
          }
        },
        {
          title: "手机号",
          key: "mobile"
        },
        {
          title: "部门",
          key: "dept"
        },
        {
          title: "小组",
          key: "dept"
        },
        {
          title: "职位",
          key: "role"
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
            return h('span',{
              style: {
                color: '#39f'
              }
            },userStatus);
          }
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
      lowerUserData: [],
      userData: [],
      selectUserData: []
    };
  },
  methods: {
    //获取下级用户数据
    getLowerUserData() {
      this.loading = true;
      getLowUserData(15383,this.pageSize,this.currentPage).then(res => {
        this.lowerUserData = res.tableContent;
        this.lowUser.total = res.dataCount;
        this.loading = false;
      })
    },
    //点击分页
    onPageChange(currentPage) {
      this.lowUser.currentPage = currentPage;
      this.getLowerUserData();
    },
    onUserPageChange(currentPage) {
      this.lowUser.usercurrentPage = currentPage;
      this.getAllUsersData();
    },
    //添加上级用户
    addLowUser() {
      let parentId = [];
      if(this.selectUserData.length > 0){
        this.selectUserData.forEach(val => {
          parentId.push(val.userId);
        });
      }else{
        this.$Message.warning('请选择至少一个用户！');
      }
      if(parentId){
        updateHighUser(parentId.join(','),15383).then(res => {
          if(res.success){
            this.$Message.success(res.message);
            this.getLowerUserData();
          }
        })
      }
    },
    //选择下级用户
    onSelectionChange(selection) {
      this.selectUserData = selection;
    },
    //展示所有用户
    showUserModal() {
      this.showModal = true;
      this.getAllUsersData();
    },
    //获取所有用户数据
    getAllUsersData() {
      this.userLoading = true;
      getAllUsers(this.pageSize,this.usercurrentPage).then(res => {
        this.userData = res.tableContent;
        this.lowUser.usertotal = res.dataCount;
        this.userLoading = false;
      })
    }
  },
  mounted() {
    let relHeight = document.body.clientHeight-190;
    this.getLowerUserData();
    document.getElementById('lowHeight').style.minHeight = relHeight+'px';
  }
};
</script>
