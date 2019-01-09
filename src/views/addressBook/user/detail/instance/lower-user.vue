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
</style>

<template>
    <div class="lower-user">
        <div class="lower-user-detail" id="lowHeight">
          <div v-if="isUpdate" class="lower-user-header">
            <b @click="showUserModal" class="lower-user-detail-btn">下级用户</b>
            <span style="color: #7a7676;">-添加下级用户</span>
            <b @click="deleteLowUser" class="lower-user-detail-btn">删除</b>
            <span style="color: #7a7676;">-批量删除下级用户</span>
          </div>
          <div class="lower-user-table">
            <Table 
              @on-selection-change="selectLowUser" 
              :columns="columns" 
              :loading="loading" 
              :data="lowerUserData">
            </Table>
            <div class="user-page">
                <div style="float: right;padding-bottom: 5px;">
                  <Page 
                    @on-page-size-change="onPageSizeChange" 
                    :total="lowUser.total" 
                    show-elevator show-sizer 
                    :current="lowUser.currentPage" 
                    :page-size="lowUser.pageSize" 
                    @on-change="onPageChange" 
                    size="small" 
                    show-total>
                  </Page>
                </div>
            </div>
          </div>
        </div>
        <!-- 用户选择器 -->
        <user-selector 
          :showUserSelector="showModal"
          @changeUserModalStatus="changeUserModalStatus"
          @addUserChange="addUserChange">
        </user-selector>
    </div>
</template>

<script>
import { 
  getLowUserData,
  getAllUsers,
  updateHighUser,
  deleteUser 
  } from "@/services/addressBookService.js";
import UserSelector from './user-selector';

export default {
  name: "lowerUser",
  components: {
    UserSelector
  },
  props: {
    isUpdate: {
          type: Boolean
      }
  },
  data() {
    return {
      userId: this.$route.params.userId,
      lowUser: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      loading: true,
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
                  src: params.row.photo?params.row.photo:'resources/images/icon/defaultUserPhoto.jpg'
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
                      deleteUser(params.row.userId).then(res => {
                        this.$Message.success('删除成功！');
                        this.getLowerUserData();
                        this.$emit('changeInstance');
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
      lowerUserData: [],
      selectUserData: [],
      selectLowUserData: []
    };
  },
  methods: {
    changeUserModalStatus() {
      this.showModal = false;
    },
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
    //选择要删除的下级用户
    selectLowUser(selection) {
      this.selectLowUserData = selection;
    },
    //添加下级用户
    addUserChange() {
      this.getLowerUserData();
      this.$emit('changeInstance');
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
              this.$Message.success('删除成功！');
              this.getLowerUserData();
              this.$emit('changeInstance');
            }).catch(error => {
                this.$Message.error(error.data.message);
            })
          }
        });
      }
    },
    //展示所有用户
    showUserModal() {
      this.showModal = true;
    }
  },
  mounted() {
    this.getLowerUserData();
  }
};
</script>
