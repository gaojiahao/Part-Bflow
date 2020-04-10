<style lang="less" scoped>
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
    margin-bottom: -8px;
    padding: 1px 5px;
  }
</style>

<template>
    <div class="lower-user">
        <Modal
            v-model="showUserModal"
            :title="userModalTitle"
            @on-ok="addLowUser"
            @on-visible-change="modalVisibleChange"
            :styles="{top: '15px'}"
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
              ref="selection" 
              @on-selection-change="onSelectionChange" 
              @on-select-all="onSelectAll" 
              @on-select-cancel="onSelectCancel" 
              height="400" 
              :loading="userLoading" 
              :columns="userColumns" 
              :data="userData">
            </Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page 
                    @on-page-size-change="onAllUserPageSizeChange" 
                    :total="user.usertotal" 
                    show-elevator show-sizer 
                    :current="user.usercurrentPage" 
                    :page-size="user.allUserpageSize" 
                    @on-change="onUserPageChange" 
                    size="small" 
                    show-total>
                  </Page>
                </div>
            </div>
            <div class="page-selection-warp" v-show="onPageSelection[0] ">
              <Tag 
                v-for="(item,index) in onPageSelection" 
                :key="item.userId" 
                @on-close="deleteSelectUser(item,index)" 
                :userId="item.userId" 
                closable 
                type="border" 
                color="primary" 
                size="small">
                {{item.nickname}}
              </Tag>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getAllUsers,updateHighUser } from "@/services/addressBookService.js";

export default {
  name: "UserSelector",
  components: {},
  props: {
      showUserSelector: {
          type: Boolean
      },
      userModalTitle: {
          type: String,
          default: '用户选择'
      }
  },
  data() {
    return {
      userId: this.$route.params.userId,
      user: {
        usertotal: 0,
        usercurrentPage: 1,
        allUserpageSize: 10,
      },
      searchValue: '',
      userLoading: true,
      showUserModal: false,
      onPageSelection: [],
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
                  src: params.row.photo?params.row.photo:'/resources/images/icon/defaultUserPhoto.png'
                },
                on:{
                  'on-error': (e) => {
                    e.target.src = '/resources/images/icon/defaultUserPhoto.png';
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
          key: "mobile",
          width: 130
        },
        {
          title: "邮箱",
          key: "email",
          width: 180
        }
      ],
      userData: []
    };
  },
  watch: {
      showUserSelector: function (value) {
          if(value){
              this.showUserModal = value;
              this.searchValue = '';
              this.onPageSelection = []; //清空选中的用户
              this.getAllUsersData();
          }
      }
  },
  methods: {
    //通知父组件modal的状态
    modalVisibleChange(state) {
      if (!state) {
        this.$emit("changeUserModalStatus", { modal: false });
      }
    },
    //点击切换所有用户每页显示条数
    onAllUserPageSizeChange(size) {
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"jobNumber"},
      {operator:"ne",value:this.userId,property:"userId"},{operator:"ne",value:0,property:"status"},{operator:"ne",value:-2,property:"status"}
      ]);
      this.user.allUserpageSize = size;
      this.getAllUsersData(filter);
    },
    onUserPageChange(currentPage) {
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"jobNumber"},
      {operator:"ne",value:this.userId,property:"userId"},{operator:"ne",value:0,property:"status"},{operator:"ne",value:-2,property:"status"}
      ]);
      this.user.usercurrentPage = currentPage;
      this.getAllUsersData(filter);
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
      }
      if(parentId.length>0 && this.userId){
        updateHighUser(parentId.join(','),this.userId).then(res => {
          if(res.success){
            this.$Message.success('更新成功');
            this.$emit('addUserChange');
          }
        }).catch(error => {
            this.$Message.error(error.data.message);
        })
      }
    },
    //选择下级用户
    onSelectionChange(selection) {
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
    //获取所有用户数据
    getAllUsersData(filter) {
      let relFilter = filter?filter:JSON.stringify([{operator:"ne",value:this.userId,property:"userId"},{operator:"ne",value:0,property:"status"},{operator:"ne",value:-2,property:"status"}]);
      this.userLoading = true;
      getAllUsers(this.user.allUserpageSize,this.user.usercurrentPage,relFilter).then(res => {
        this.userData = res.tableContent;
        this.user.usertotal = res.dataCount;
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
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"jobNumber"},
      {operator:"ne",value:this.userId,property:"userId"},{operator:"ne",value:0,property:"status"},{operator:"ne",value:-2,property:"status"}
      ]);
      this.user.usercurrentPage = 1;
      this.getAllUsersData(filter);
    }
  },
  mounted() {}
};
</script>
