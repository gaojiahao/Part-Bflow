<style lang="less">
    .lower-user{
      &-detail{
        background-color: #fff;
        margin: 15px 93px;
        padding: 26px 50px;
        box-shadow: 0px 1px 10px #ddd;
        &-btn{
          margin-bottom:5px;
          color: rgb(0, 150, 136);
          font-size: 17px;
          cursor: pointer;
        }
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
            <b @click="showUserModal" class="lower-user-detail-btn">下级用户</b>
            <span style="color: #7a7676;">-选择下级用户</span>
            <Table ref="selection" :columns="columns" :loading="loading" :data="lowerUserData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page @on-page-size-change="onPageSizeChange" :total="lowUser.total" show-elevator show-sizer :current="lowUser.currentPage" :page-size="lowUser.pageSize" @on-change="onPageChange" size="small" show-total></Page>
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
                  <Page @on-page-size-change="onAllUserPageSizeChange" :total="lowUser.usertotal" show-elevator show-sizer :current="lowUser.usercurrentPage" :page-size="lowUser.allUserpageSize" @on-change="onUserPageChange" size="small" show-total></Page>
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
      userId: this.$route.params.userId,
      lowUser: {
        total: 0,
        usertotal: 0,
        currentPage: 1,
        usercurrentPage: 1,
        pageSize: 10,
        allUserpageSize: 10,
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
      if(this.userId){
        this.loading = true;
        getLowUserData(this.userId,this.lowUser.pageSize,this.lowUser.currentPage).then(res => {
          this.lowerUserData = res.tableContent;
          this.lowUser.total = res.dataCount;
          this.loading = false;
        })
      }else{
          this.loading = false;
      }
    },
    //点击分页
    onPageChange(currentPage) {
      this.lowUser.currentPage = currentPage;
      this.getLowerUserData();
    },
    //点击切换下级用户每页显示条数
    onPageSizeChange(size) {
      this.lowUser.pageSize = size;
      this.getLowerUserData();
    },
    //点击切换所有用户每页显示条数
    onAllUserPageSizeChange(size) {
      this.lowUser.allUserpageSize = size;
      this.getAllUsersData();
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
      if(parentId && this.userId){
        updateHighUser(parentId.join(','),this.userId).then(res => {
          if(res.success){
            this.$Message.success(res.message);
            this.getLowerUserData();
          }
        })
      }else{
        this.$Message.warning('无用户ID，请先保存用户再进行编辑！');
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
      getAllUsers(this.lowUser.allUserpageSize,this.lowUser.usercurrentPage).then(res => {
        this.userData = res.tableContent;
        this.lowUser.usertotal = res.dataCount;
        this.userLoading = false;
      })
    }
  },
  created(){
    let length = window.location.href.split('#')[1].split('/').length;
    this.userId = window.location.href.split('#')[1].split('/')[length - 1];
  },
  mounted() {
    this.getLowerUserData();
  }
};
</script>
