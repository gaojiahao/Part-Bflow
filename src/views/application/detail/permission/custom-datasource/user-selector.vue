<style lang="less">
  .app-search {
    margin-bottom: 5px;
    .app-search-icon {
      font-size: 1rem;
      color: #39f;
      display: inline-block;
      cursor: pointer;
    }
  }
  .user-page {
    margin: 10px;
    overflow: hidden;
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
    <div>
      <!-- 用户modal -->
      <Modal 
        v-model="showUserModal" 
        title="用户选择" 
        :mask-closable="false" 
        width="800" 
        @on-ok="confirmUser" 
        @on-cancel="cancelSelectUser" 
        @on-visible-change="modalVisibleChange" 
        :transfer="false">
        <div class="app-search">
          <Input 
            v-model="searchUserValue" 
            @on-search="userFilter" 
            :search="true" 
            placeholder="名称或工号搜索" 
            style="width: 300px">
          </Input>
          <p @click="userFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table 
          ref="userTable" 
          @on-select-cancel="selectUserCancel" 
          @on-select-all="onUserSelectAll" 
          @on-selection-change="selectUserClick" 
          height="400" 
          stripe size="small" 
          :loading="userLoading" 
          :columns="userColumns" 
          :data="userData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page 
              :total="userTotal" 
              :current="userCurrentPage" 
              :page-size="pageSize" 
              @on-change="onUserPageChange" 
              size="small" 
              show-total>
            </Page>
          </div>
        </div>
        <div class="page-selection-warp" v-show="userSelection[0] ">
          <Tag 
            v-for="(item,index) in userSelection" 
            :key="item.userId" 
            @on-close="deleteSelectUser(item,index)" 
            :userId="item.userId" 
            closable type="border" 
            color="primary" 
            size="small">
            {{item.nickname}}
          </Tag>
        </div>
      </Modal>
    </div>
</template>

<script>
import { getAllUserData } from "@/services//appService.js";

export default {
  name: "UserSelector",
  components: {},
  props: {
      showUserSelector: {
          type: Boolean
      }
  },
  data() {
    return {
      searchUserValue: "",
      userTotal: 0,
      userCurrentPage: 1,
      pageSize: 10,
      userLoading: true,
      showUserModal: false,
      userColumns: [
        { type: "selection", width: 60, align: "center" },
        {
          title: "头像",
          key: "photo",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.photo?params.row.photo:'/resources/images/icon/defaultUserPhoto.jpg'
                },
                style: {
                  borderRadius:'50%',
                  height:'32px',
                  width:'32px'
                }
              })
            ]);
          }
        },
        { title: "姓名", key: "nickname" },
        { title: "工号", key: "userCode" },
        { title: "手机",key: "mobile" },
        { title: "邮箱",key: "email" }
      ],
      userData: [],
      userSelectData: [],
      userSelection: [],
    };
  },
  watch: {
      showUserSelector: function (value) {
          if(value){
              this.showUserModal = value;
              this.selectUserModal();
              this.userSelection = [];
              this.userSelectData = [];
          }
      }
  },
  methods: {
    //用户过滤
    userFilter() {
      let filter = JSON.stringify([
        {
          operator_1: "like",
          value_1: this.searchUserValue,
          property_1: "nickname",
          link: "or",
          operator_2: "like",
          value_2: this.searchUserValue,
          property_2: "userCode"
        }
      ]),
      currentPageFilter = 1;
      this.selectUserModal(filter,currentPageFilter);
    },
    //用户数据加载
    selectUserModal(filter,currentPageFilter) {
      this.userLoading = true;
      getAllUserData(currentPageFilter?currentPageFilter:this.userCurrentPage, this.pageSize, filter).then(res => {
        this.userData = res.tableContent;
        this.userTotal = res.dataCount;
        this.userLoading = false;

        if (this.userSelection.length > 0) {
            this.userData.map(item => {
              this.userSelection.map(sel => {
                if (item.userId == sel.userId) {
                  item._checked = true;
                }
              });
            });
          }
      });
    },
    //选择用户
    selectUserClick(selection, row) {
      if (selection.length === 0) {
        let s = this.$refs.userTable.data;
        let p = this.userSelection;
        s.map(item => {
          p = p.filter(f => {
            return f.userId !== item.userId;
          });
        });
        this.userSelection = p;
      } else {
        let obj = {};
        this.userSelection.push(...selection);
        //数组去重
        this.userSelection = this.userSelection.reduce((cur, next) => {
          obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
          return cur;
        }, []);
      }
    },
    //用户全选
    onUserSelectAll(selection) {
      let obj = {};
      //触发全选事件
      //全选
      this.userSelection.push(...selection);
      //数组去重
      this.userSelection = this.userSelection.reduce((cur, next) => {
        obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
        return cur;
      }, []);
    },
    //取消选择的用户
    selectUserCancel(selection, row) {
      this.userSelection.forEach((val, index) => {
        if (val.userId === row.userId) {
          this.userSelection.splice(index, 1);
        }
      });
    },
    //删除选择的用户
    deleteSelectUser(item,index) {
      this.userSelection.splice(index,1);
      this.$refs.userTable.data.forEach((data,i) => {
        if(item.userId === data.userId){
          this.$refs.userTable.toggleSelect(i);
        }
      })
    },
    //取消modal选择用户
    cancelSelectUser() {
      this.userSelection = this.userSelectData;
    },
    //添加用户权限
    confirmUser() {
      let obj = {};
      //去掉重复数据
      this.userSelectData = this.userSelection.reduce((cur, next) => {
        obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
        return cur;
      }, []);
      this.$emit('userModalData',this.userSelectData);
    },
    //通知父组件modal的状态
    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitUserModal", { modal: false });
      }
    },
    //用户page点击
    onUserPageChange(currentPage) {
      let filter = JSON.stringify([
        {
          operator_1: "like",
          value_1: this.searchUserValue,
          property_1: "nickname",
          link: "or",
          operator_2: "like",
          value_2: this.searchUserValue,
          property_2: "userCode"
        }
      ]);
      this.userCurrentPage = currentPage;
      this.selectUserModal(filter);
    }
  },
  mounted() {
  }
};
</script>

