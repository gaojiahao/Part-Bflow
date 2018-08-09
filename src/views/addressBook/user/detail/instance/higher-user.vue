<style lang="less" scoped>
    .higher-user{
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
    <div class="higher-user">
        <div class="higher-user-detail" id="cliHeight">
            <b @click="showUserModal" class="higher-user-detail-btn">上级用户</b>
            <span style="color: #7a7676;">-添加上级用户</span>
            <Table ref="selection" :columns="columns" :loading="loading" :data="higherUserData"></Table>
        </div>
        <Modal
            v-model="showModal"
            title="选择用户"
            :footer-hide="true"
            width="1000"
            :draggable="true">
            <div class="app-search">
              <Input @on-search="userFilter" :search="true" v-model="searchValue" placeholder="搜索工号或名称" style="width: 300px"></Input>
              <p @click="userFilter" class="app-search-icon">
                  <Button type="primary" size="small">查询</Button>
              </p>
            </div>
            <Table @on-row-dblclick="onDbClick" ref="selection" :highlight-row="true" height="400" :loading="userLoading" :columns="userColumns" :data="userData"></Table>
            <div class="user-page">
                <div class="fr">
                  <Page @on-page-size-change="onAllUserPageSizeChange" :total="highUser.usertotal" show-elevator show-sizer :current="highUser.usercurrentPage" :page-size="highUser.allUserpageSize" @on-change="onUserPageChange" size="small" show-total></Page>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getHighUserData,getAllUsers,updateHighUser,deleteUser } from "@/services/addressBookService.js";

export default {
  name: "higherUser",
  components: {},
  props: {},
  data() {
    return {
      userId: this.$route.params.userId,
      highUser: {
        total: 0,
        currentPage: 1,
        usertotal: 0,
        usercurrentPage: 1,
        pageSize: 10,
        allUserpageSize: 10,
      },
      searchValue: '',
      loading: true,
      userLoading: true,
      showModal: false,
      columns: [
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
          key: "mobile",
          width: 130
        },
        {
          title: "部门",
          key: "dept",
          width: 200
        },
        {
          title: "小组",
          key: "dept",
          width: 200
        },
        {
          title: "职位",
          key: "role",
          width: 150
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
          title: '操作',
          key: 'action',
          width: 80,
          align: 'center',
          render: (h,params) => {
            return h('Button',{
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: '确认',
                    content: '确认删除此用户？',
                    onOk: () => {
                      deleteUser(this.userId).then(res => {
                        if(res.success){
                          this.$Message.success(res.message);
                          this.getHigherUserData();
                          this.$emit('changeInstance');
                        }
                      })
                    }
                  });
                }
              }
            },'删除')
          }
        }
      ],
      userColumns: [
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
          key: "mobile",
          width: 100
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
          key: "role",
          width: 150
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
        }
      ],
      higherUserData: [],
      userData: []
    };
  },
  methods: {
    //获取上级用户数据
    getHigherUserData() {
      if(this.userId){
        this.loading = true;
        getHighUserData(this.userId,this.highUser.pageSize,this.highUser.currentPage).then(res => {
          this.higherUserData = res.tableContent;
          this.highUser.total = res.dataCount;
          this.loading = false;
        })
      }else{
          this.loading = false;
      }
    },
    //点击分页
    onPageChange(currentPage) {
      this.highUser.currentPage = currentPage;
      this.getHigherUserData();
    },
    //点击切换上级用户每页显示条数
    onPageSizeChange(size) {
      this.highUser.pageSize = size;
      this.getHigherUserData();
    },
    //点击切换所有用户每页显示条数
    onAllUserPageSizeChange(size) {
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}
      ]);
      this.highUser.allUserpageSize = size;
      this.getAllUsersData(filter);
    },
    onUserPageChange(currentPage) {
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}
      ]);
      this.highUser.usercurrentPage = currentPage;
      this.getAllUsersData(filter);
    },
    //添加上级用户
    onDbClick(selection,index) {
      let parentId = selection.userId;
      
      if(parentId && this.userId){
        updateHighUser(this.userId,parentId).then(res => {
          if(res.success){
            this.showModal = false;
            this.$Message.success(res.message);
            this.getHigherUserData();
            this.$emit('changeInstance');
          }
        })
      }
    },
    //展示所有用户
    showUserModal() {
      this.showModal = true;
      this.getAllUsersData();
    },
    //获取所有用户数据
    getAllUsersData(filter) {
      this.userLoading = true;
      getAllUsers(this.highUser.allUserpageSize,this.highUser.usercurrentPage,filter).then(res => {
        this.userData = res.tableContent;
        this.highUser.usertotal = res.dataCount;
        this.userLoading = false;
      })
    },
    //查询用户
    userFilter() {
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}
      ]);
      this.getAllUsersData(filter);
    }
  },
  mounted() {
    this.getHigherUserData();
  }
};
</script>
