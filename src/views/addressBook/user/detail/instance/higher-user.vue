<style lang="less">
    .higher-user{
      &-detail{
        background-color: #fff;
        padding: 26px 50px;
        width: 75%;
        margin: 0 auto;
        box-shadow: 0px 1px 10px #ddd;
        position: relative;
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
  .ivu-modal-close .ivu-icon-ios-close{
    color: #fff;
  }

  .rfd-principal-table .ivu-table-row-highlight td{
  background-color: #81b2e59c !important;
}
</style>

<template>
    <div class="higher-user">
        <div class="higher-user-detail" id="cliHeight">
            <div v-if="isUpdate">
              <b @click="showUserModal" class="higher-user-detail-btn">上级用户</b>
              <span style="color: #7a7676;">-添加上级用户</span>
            </div>
            <Table ref="selection" 
              :columns="columns" 
              :loading="loading" 
              :data="higherUserData">
            </Table>
        </div>
        <Modal
            v-model="showModal"
            @on-ok="addHighUser"
            title="选择用户"
            :styles="{top: '20px'}"
            width="1000">
            <div class="app-search">
              <Input 
                @on-search="userFilter" 
                :search="true" 
                v-model="searchValue" 
                placeholder="搜索账号或名称" 
                style="width: 300px">
              </Input>
              <p @click="userFilter" class="app-search-icon">
                  <Button type="primary" size="small">查询</Button>
              </p>
            </div>
            <Table 
              class="rfd-principal-table" 
              @on-row-dblclick="onDbClick" 
              @on-row-click="onRowClick" 
              ref="selection" 
              :highlight-row="true" 
              height="400" 
              :loading="userLoading" 
              :columns="userColumns" 
              :data="userData">
            </Table>
            <div class="user-page">
                <div class="fr" style="padding-bottom: 5px;">
                  <Page 
                    @on-page-size-change="onAllUserPageSizeChange" 
                    :total="highUser.usertotal" 
                    show-elevator show-sizer 
                    :current="highUser.usercurrentPage" 
                    :page-size="highUser.allUserpageSize"
                    @on-change="onUserPageChange" 
                    size="small" 
                    show-total>
                   </Page>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { 
  getHighUserData,
  getAllUsers,
  updateHighUser,
  deleteUser 
  } from "@/services/addressBookService.js";

export default {
  name: "higherUser",
  components: {},
  props: {
    isUpdate: {
          type: Boolean
      }
  },
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
          title: "头像",
          key: "photo",
          width: 80,
          render: (h,params) => {
            return h('div',[
              h('Avatar',{
                props: {
                  src: params.row.photo?params.row.photo:'https://lab.roletask.com/resource/common-icon/male.png'
                },
                on:{
                  'on-error': (e) => {
                    e.target.src = 'https://lab.roletask.com/resource/common-icon/male.png';
                  }
                }
              })
            ])
          }
        },
        {
          title: "用户账号",
          key: "jobNumber"
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
          title: "邮箱",
          key: "email",
          width: 180
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h,params) => {
            return h('Button',{
              props: {
                type: 'error',
                size: 'small',
                disabled: !this.isUpdate
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: '确认',
                    content: '确认删除此用户？',
                    onOk: () => {
                      deleteUser(this.userId).then(res => {
                        if(res.success){
                          this.$Message.success('删除成功！');
                          this.getHigherUserData();
                          this.$emit('changeInstance');
                        }
                      }).catch(error => {
                            this.$Message.error(error.data.message);
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
          title: "头像",
          key: "photo",
          width: 80,
          render: (h,params) => {
            return h('div',[
              h('Avatar',{
                props: {
                  src: params.row.photo?params.row.photo:'https://lab.roletask.com/resource/common-icon/male.png'
                },
                on:{
                  'on-error': (e) => {
                    e.target.src = 'https://lab.roletask.com/resource/common-icon/male.png';
                  }
                }
              })
            ])
          }
        },
        {
          title: "用户账号",
          key: "jobNumber"
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
          title: "邮箱",
          key: "email",
          width: 180
        },
      ],
      higherUserData: [],
      userData: [],
      onRowClickSelectData: {}
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
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"jobNumber"},
      {operator:"ne",value:this.userId,property:"userId"},{operator:"ne",value:0,property:"status"},{operator:"ne",value:-2,property:"status"}
      ]);
      this.highUser.allUserpageSize = size;
      this.getAllUsersData(filter);
    },
    onUserPageChange(currentPage) {
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"jobNumber"},
      {operator:"ne",value:this.userId,property:"userId"},{operator:"ne",value:0,property:"status"},{operator:"ne",value:-2,property:"status"}
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
            this.$Message.success('更新成功');
            this.getHigherUserData();
            this.$emit('changeInstance');
          }
        }).catch(error => {
            this.$Message.error(error.data.message);
        })
      }
    },
    addHighUser() {
      let parentId = this.onRowClickSelectData.userId;
      
      if(parentId && this.userId){
        updateHighUser(this.userId,parentId).then(res => {
          if(res.success){
            this.$Message.success('更新成功');
            this.getHigherUserData();
            this.$emit('changeInstance');
          }
        })
      }
    },
    onRowClick(selection,index) {
      this.onRowClickSelectData = selection;
    },
    //展示所有用户
    showUserModal() {
      this.showModal = true;
      this.searchValue = '';
      this.getAllUsersData();
    },
    //获取所有用户数据
    getAllUsersData(filter) {
      let relFilter = filter?filter:JSON.stringify([{operator:"ne",value:this.userId,property:"userId"},{operator:"ne",value:0,property:"status"},{operator:"ne",value:-2,property:"status"}]);
      this.userLoading = true;
      getAllUsers(this.highUser.allUserpageSize,this.highUser.usercurrentPage,relFilter).then(res => {
        this.userData = res.tableContent;
        this.highUser.usertotal = res.dataCount;
        this.userLoading = false;
      })
    },
    //查询用户
    userFilter() {
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"jobNumber"},
      {operator:"ne",value:this.userId,property:"userId"},{operator:"ne",value:0,property:"status"},{operator:"ne",value:-2,property:"status"}
      ]);
      this.highUser.usercurrentPage = 1;
      this.getAllUsersData(filter);
    }
  },
  mounted() {
    this.getHigherUserData();
  }
};
</script>
