<style lang="less" scoped>
    .lower-user{
      &-detail{
        background-color: #fff;
        width: 75%;
        margin: 0 auto;
        padding: 26px 50px;
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
  .page-selection-warp {
    width: 100%;
    height: 100%;
    min-height: 30px;
    background-color: #e6e6e6;
    margin-bottom: 10px;
    padding: 1px 5px;
  }
</style>

<template>
    <div class="lower-user">
        <div class="lower-user-detail" id="lowHeight">
            <b @click="showUserModal" class="lower-user-detail-btn">下级用户</b>
            <span style="color: #7a7676;">-添加下级用户</span>
            <b @click="deleteLowUser" class="lower-user-detail-btn">删除</b>
            <span style="color: #7a7676;">-批量删除下级用户</span>
            <Table ref="selection" @on-selection-change="selectLowUser" :columns="columns" :loading="loading" :data="lowerUserData"></Table>
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
            <div class="app-search">
              <Input @on-search="userFilter" :search="true" v-model="searchValue" placeholder="搜索工号或姓名" style="width: 300px"></Input>
              <p @click="userFilter" class="app-search-icon">
                  <Button type="primary" size="small">查询</Button>
              </p>
            </div>
            <Table ref="selection" @on-selection-change="onSelectionChange" @on-select-all="onSelectAll" @on-select-cancel="onSelectCancel" height="400" :loading="userLoading" :columns="userColumns" :data="userData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page @on-page-size-change="onAllUserPageSizeChange" :total="lowUser.usertotal" show-elevator show-sizer :current="lowUser.usercurrentPage" :page-size="lowUser.allUserpageSize" @on-change="onUserPageChange" size="small" show-total></Page>
                </div>
            </div>
            <div class="page-selection-warp" v-show="onPageSelection[0] ">
              <Tag v-for="(item,index) in onPageSelection" :key="item.userId" @on-close="deleteSelectUser(item,index)" :userId="item.userId" closable type="border" color="primary" size="small">
                {{item.nickname}}
              </Tag>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getLowUserData,getAllUsers,updateHighUser,deleteUser } from "@/services/addressBookService.js";

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
      searchValue: '',
      loading: true,
      userLoading: true,
      showModal: false,
      onPageSelection: [],
      columns: [
        {
          type: "selection",
          align: "center"
        },
        {
          title: "头像",
          key: "photo",
          width: 80,
          render: (h,params) => {
            return h('div',[
              h('Avatar',{
                props: {
                  src: params.row.photo
                }
              })
            ])
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
          key: "email"
        },
        {
          title: '操作',
          key: 'action',
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
                      deleteUser(params.row.userId).then(res => {
                        this.$Message.success(res.message);
                        this.getLowerUserData();
                        this.$emit('changeInstance');
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
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "头像",
          key: "photo",
          width: 80,
          render: (h,params) => {
            return h('div',[
              h('Avatar',{
                props: {
                  src: params.row.photo
                }
              })
            ])
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
          title: "邮箱",
          key: "email"
        }
      ],
      lowerUserData: [],
      userData: [],
      selectUserData: [],
      selectLowUserData: []
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
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"},
      {operator:"ne",value:this.userId,property:"userId"}
      ]);
      this.lowUser.allUserpageSize = size;
      this.getAllUsersData(filter);
    },
    onUserPageChange(currentPage) {
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"},
      {operator:"ne",value:this.userId,property:"userId"}
      ]);
      this.lowUser.usercurrentPage = currentPage;
      this.getAllUsersData(filter);
    },
    //选择要删除的下级用户
    selectLowUser(selection) {
      this.selectLowUserData = selection;
    },
    //删除选择的用户
    deleteSelectUser(item,index) {
      this.onPageSelection.splice(index,1);
      this.$refs.selection.data.forEach((data,i) => {
        if(item.userId === data.userId){
          this.$refs.selection.toggleSelect(i);
        }
      })
    },
    //添加下级用户
    addLowUser() {
      let parentId = [];
      if(this.onPageSelection.length > 0){
        this.onPageSelection.forEach(val => {
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
            this.$emit('changeInstance');
          }
        })
      }else{
        this.$Message.warning('无用户ID，请先保存用户再进行编辑！');
      }
    },
    //删除下级用户
    deleteLowUser() {
      let userIds = [];
      if(this.selectLowUserData.length === 0){
        this.$Message.warning('请先选择要删除的用户！');
      }else{
        this.selectLowUserData.forEach(val => {
          userIds.push(val.userId);
        })
        this.$Modal.confirm({
          title: '确认',
          content: '确认删除选择的用户？',
          onOk: () => {
            deleteUser(userIds.join(',')).then(res => {
              this.selectLowUserData = [];
              this.$Message.success(res.message);
              this.getLowerUserData();
              this.$emit('changeInstance');
            })
          }
        });
      }
    },
    //选择下级用户
    onSelectionChange(selection) {
      // this.selectUserData = selection;
      //取消全选
      if (selection.length === 0) {
        let s = this.$refs.selection.data;
        let p = this.onPageSelection;
        s.map(item => {
          p = p.filter(f => {
            return f.userId !== item.userId;
          });
        });
        this.onPageSelection = p;
      } else {
        let obj = {};
        this.onPageSelection.push(...selection);
        //数组去重
        this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
          obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
          return cur;
        }, []);
      }
    },
    //全选
    onSelectAll(selection) {
      let obj = {};
      //触发全选事件
      //全选
      this.onPageSelection.push(...selection);
      //数组去重
      this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
        obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
        return cur;
      }, []);
    },
    //单选取消
    onSelectCancel(selection, row) {
      this.onPageSelection = this.onPageSelection.filter(f => {
        return f.userId !== row.userId;
      });
    },
    //展示所有用户
    showUserModal() {
      this.showModal = true;
      this.searchValue = '';
      this.onPageSelection = []; //清空选中的用户
      this.getAllUsersData();
    },
    //获取所有用户数据
    getAllUsersData(filter) {
      let relFilter = filter?filter:JSON.stringify([{operator:"ne",value:this.userId,property:"userId"}]);
      this.userLoading = true;
      getAllUsers(this.lowUser.allUserpageSize,this.lowUser.usercurrentPage,relFilter).then(res => {
        this.userData = res.tableContent;
        this.lowUser.usertotal = res.dataCount;
        this.userLoading = false;

        if (this.onPageSelection.length > 0) {
            this.userData.map(item => {
              this.onPageSelection.map(sel => {
                if (item.userId === sel.userId) {
                  item._checked = true;
                }
              });
            });
          }
      })
    },
    //查询用户
    userFilter() {
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"},
      {operator:"ne",value:this.userId,property:"userId"}
      ]);
      this.getAllUsersData(filter);
    }
  },
  mounted() {
    this.getLowerUserData();
  }
};
</script>
