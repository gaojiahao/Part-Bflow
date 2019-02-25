<style lang="less">
  .app-search {
    margin-bottom: 5px;
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
      <!-- 成员modal -->
      <Modal 
        v-model="showUserModal" 
        title="成员选择" 
        :mask-closable="false" 
        width="800"
        :styles="{top: '15px'}" 
        @on-ok="confirmUser" 
        @on-cancel="cancelSelectUser">
        <div class="app-search">
          <Input 
            v-model="searchUserValue" 
            @on-search="userFilter" 
            :search="true" 
            placeholder="搜索" 
            style="width: 300px">
          </Input>
        </div>
        <Table 
          ref="userTable" 
          @on-select-cancel="selectUserCancel" 
          @on-select-all="onUserSelectAll" 
          @on-selection-change="selectUserClick" 
          :height="tableHeight" 
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
            :key="item.id" 
            @on-close="deleteSelectUser(item,index)" 
            :id="item.id" 
            closable type="border" 
            color="primary" 
            size="small">
            {{item.name}}
          </Tag>
        </div>
      </Modal>
    </div>
</template>

<script>
import { getAllMemberData } from "@/services/fileCabinetService.js";

export default {
  name: "MemberSelector",
  components: {},
  data() {
    return {
      searchUserValue: "",
      userTotal: 0,
      userCurrentPage: 1,
      pageSize: 10,
      tableHeight: 400,
      userLoading: true,
      showUserModal: false,
      userColumns: [
        { type: "selection", width: 60, align: "center" },
        { title: "成员", key: "name" },
        { title: "部门", key: "gname" }
      ],
      userData: [],
      userSelectData: [],
      userSelection: [],
    };
  },
  methods: {
    //用户过滤
    userFilter() {
      this.userCurrentPage = 1;
      this.selectUserModal();
    },
    //用户数据加载
    selectUserModal() {
      this.userLoading = true;
        getAllMemberData(this.pageSize,this.userCurrentPage,this.searchUserValue).then(res => {
          this.userData = res.tableContent;
          this.userTotal = res.dataCount;
          this.userLoading = false;

          if (this.userSelection.length > 0) {
              this.userData.map(item => {
                this.userSelection.map(sel => {
                  if (item.id == sel.id) {
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
            return f.id !== item.id;
          });
        });
        this.userSelection = p;
      } else {
        let obj = {};
        this.userSelection.push(...selection);
        //数组去重
        this.userSelection = this.userSelection.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
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
        obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
        return cur;
      }, []);
    },
    //取消选择的用户
    selectUserCancel(selection, row) {
      this.userSelection.forEach((val, index) => {
        if (val.id === row.id) {
          this.userSelection.splice(index, 1);
        }
      });
    },
    //删除选择的用户
    deleteSelectUser(item,index) {
      this.userSelection.splice(index,1);
      this.$refs.userTable.data.forEach((data,i) => {
        if(item.id === data.id){
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
        obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
        return cur;
      }, []);
      this.$emit('memberModalData',this.userSelectData);
    },
    //用户page点击
    onUserPageChange(currentPage) {
      this.userCurrentPage = currentPage;
      this.selectUserModal();
    }
  },
  mounted() {
      this.selectUserModal();
  }
};
</script>

