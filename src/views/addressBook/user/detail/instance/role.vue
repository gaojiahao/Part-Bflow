<style lang="less" scoped>
    .role{
      &-detail{
        background-color: #fff;
        margin: 15px 93px;
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
</style>

<template>
    <div class="role">
        <div class="role-detail" id="roleHeight">
            <b @click="showRoleModal"  class="role-detail-btn">职位</b>
            <span style="color: #7a7676;">-添加职位</span>
            <b @click="deleteUserRole"  class="role-detail-btn">删除</b>
            <span style="color: #7a7676;">-批量删除职位</span>
            <Table ref="selection" @on-selection-change="selectDeleteRole" :columns="columns" :loading="loading" :data="roleData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page @on-page-size-change="onPageSizeChange" :total="rolePage.total" show-elevator show-sizer :current="rolePage.currentPage" :page-size="rolePage.pageSize" @on-change="onPageChange" size="small" show-total></Page>
                </div>
            </div>
        </div>
        <Modal
            v-model="showModal"
            title="选择职位"
            @on-ok="addRole"
            width="1000">
            <div class="app-search">
              <Input @on-search="roleFilter" :search="true" v-model="searchValue" placeholder="搜索职位名称" style="width: 300px"></Input>
              <p @click="roleFilter" class="app-search-icon">
                  <Button type="primary" size="small">查询</Button>
              </p>
            </div>
            <Table ref="selection" @on-selection-change="onSelectionChange" height="400" :loading="roleLoading" :columns="RoleColumns" :data="allRoleData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page @on-page-size-change="onAllRolePageSizeChange" :total="rolePage.roletotal" show-elevator show-sizer :current="rolePage.rolecurrentPage" :page-size="rolePage.allRolepageSize" @on-change="onRolePageChange" size="small" show-total></Page>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getRoleData,getAllRoleData,addMember,deleteMember } from "@/services/addressBookService.js";

export default {
  name: "roleMember",
  components: {},
  props: {},
  data() {
    return {
      userId: this.$route.params.userId,
      rolePage: {
        total: 0,
        roletotal: 0,
        currentPage: 1,
        rolecurrentPage: 1,
        pageSize: 10,
        allRolepageSize: 10,
      },
      searchValue: '',
      loading: true,
      roleLoading: true,
      showModal: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "职位名称",
          key: "name"
        },
        {
          title: "职位类型",
          key: "type",
          render: (h,params) => {
              let type = '';
              switch(params.row.type){
                case 'Y': 
                  type = '营销类';
                  break;
                case 'C': 
                  type = '操作类';
                  break;
                case 'J': 
                  type = '技术类';
                  break;
                case 'M': 
                  type = '管理类';
                  break;
                case 'Z': 
                  type = '专职类';
                  break;
              }
              return h('span',{},type);
          }
        },
        {
          title: "说明",
          key: "describe"
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                    content: '确认删除此职位？',
                    onOk: () => {
                      deleteMember('sys_user_role',this.userId,params.row.id).then(res => {
                        if(res.success){
                          this.$Message.success(res.message);
                          this.getRoleData();
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
      RoleColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "职位名称",
          key: "name"
        },
        {
          title: "职位类型",
          key: "type",
          render: (h,params) => {
              let type = '';
              switch(params.row.type){
                case 'Y': 
                  type = '营销类';
                  break;
                case 'C': 
                  type = '操作类';
                  break;
                case 'J': 
                  type = '技术类';
                  break;
                case 'M': 
                  type = '管理类';
                  break;
                case 'Z': 
                  type = '专职类';
                  break;
              }
              return h('span',{},type);
          }
        },
        {
          title: "说明",
          key: "describe"
        }
      ],
      roleData: [],
      selectRoleData: [],
      allRoleData: [],
      selectDeleteRoleData: []
    };
  },
  methods: {
    //获取部门数据
    getRoleData() {
      if(this.userId){
        this.loading = true;
        getRoleData(this.userId,this.rolePage.pageSize,this.rolePage.currentPage).then(res => {
          this.roleData = res.tableContent;
          this.rolePage.total = res.dataCount;
          this.loading = false;
        })
      }else{
          this.loading = false;
      }
    },
    //点击分页
    onPageChange(currentPage) {
      this.rolePage.currentPage = currentPage;
      this.getRoleData();
    },
    //点击切换下级用户每页显示条数
    onPageSizeChange(size) {
      this.rolePage.pageSize = size;
      this.getRoleData();
    },
    //点击切换所有用户每页显示条数
    onAllRolePageSizeChange(size) {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchValue, property: "name" },
        { operator: "eq", value: 1, property: "status" }
      ]);
      this.rolePage.allRolepageSize = size;
      this.getAllRoleData(filter);
    },
    onRolePageChange(currentPage) {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchValue, property: "name" },
        { operator: "eq", value: 1, property: "status" }
      ]);
      this.rolePage.rolecurrentPage = currentPage;
      this.getAllRoleData(filter);
    },
    //选择要删除的用户职位
    selectDeleteRole(selection) {
      this.selectDeleteRoleData = selection;
    },
    //删除已选择的用户职位
    deleteUserRole() {
      let roleIds = [];
      if(this.selectDeleteRoleData.length === 0){
        this.$Message.warning('请先选择要删除的用户职位！');
      }else{
        this.selectDeleteRoleData.forEach(val => {
          roleIds.push(val.id);
        })
        this.$Modal.confirm({
          title: '确认',
          content: '确认删除选择的用户职位？',
          onOk: () => {
            deleteMember('sys_user_role',this.userId,roleIds.join(',')).then(res => {
              if(res.success){
                this.selectDeleteRoleData = [];
                this.$Message.success(res.message);
                this.getRoleData();
                this.$emit('changeInstance');
              }
            })
          }
        });
      }
    },
    //添加职位
    addRole() {
      let multiId = [];
      if(this.selectRoleData.length > 0){
        this.selectRoleData.forEach(val => {
          multiId.push(val.id);
        });
      }else{
        this.$Message.warning('请选择至少一个职位！');
      }
      if(multiId && this.userId){
        addMember('sys_user_role',this.userId,multiId.join(',')).then(res => {
          if(res.success){
            this.$Message.success(res.message);
            this.getRoleData();
            this.$emit('changeInstance');
          }
        })
      }else{
        this.$Message.warning('无用户ID，请先保存用户再进行编辑！');
      }
    },
    //选择职位
    onSelectionChange(selection) {
      this.selectRoleData = selection;
    },
    //展示所有职位
    showRoleModal() {
      this.showModal = true;
      this.getAllRoleData();
    },
    //获取所有职位数据
    getAllRoleData(filter) {
      let relFilter = filter?filter:JSON.stringify([
        { operator: "eq", value: 1, property: "status" }
      ]);
      this.roleLoading = true;
      getAllRoleData(this.rolePage.allRolepageSize,this.rolePage.rolecurrentPage,relFilter).then(res => {
        this.allRoleData = res.tableContent;
        this.rolePage.roletotal = res.dataCount;
        this.roleLoading = false;
      })
    },
    roleFilter() {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchValue, property: "name" },
        { operator: "eq", value: 1, property: "status" }
      ]);
      this.getAllRoleData(filter);
    }
  },
  mounted() {
    this.getRoleData();
  }
};
</script>
