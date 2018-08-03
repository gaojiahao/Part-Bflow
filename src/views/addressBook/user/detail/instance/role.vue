<style lang="less">
    .role{
      &-detail{
        background-color: #fff;
        margin: 15px 93px;
        padding: 26px 50px;
        box-shadow: 0px 1px 10px #ddd;
      }
  }
  .user-page {
    margin: 10px;
    overflow: hidden;
  }
</style>

<template>
    <div class="role">
        <div class="role-detail" id="roleHeight">
            <Button type="info" @click="showRoleModal" style="margin-bottom:5px">选择职位</Button>
            <Table ref="selection" :columns="columns" :loading="loading" :data="roleData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page @on-page-size-change="onPageSizeChange" :total="rolePage.total" show-elevator show-sizer :current="rolePage.currentPage" :page-size="rolePage.pageSize" @on-change="onPageChange" size="small" show-total></Page>
                </div>
            </div>
        </div>
        <Modal
            v-model="showModal"
            title="选择用户"
            @on-ok="addRole"
            width="1000">
            <Table ref="selection" @on-selection-change="onSelectionChange" height="400" :loading="roleLoading" :columns="columns" :data="allRoleData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page @on-page-size-change="onAllRolePageSizeChange" :total="rolePage.roletotal" show-elevator show-sizer :current="rolePage.rolecurrentPage" :page-size="rolePage.allRolepageSize" @on-change="onRolePageChange" size="small" show-total></Page>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getRoleData,getAllRoleData,addRoleMember } from "@/services/addressBookService.js";

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
              switch(params.row.groupType){
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
      allRoleData: []
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
      this.rolePage.allRolepageSize = size;
      this.getAllRoleData();
    },
    onRolePageChange(currentPage) {
      this.rolePage.rolecurrentPage = currentPage;
      this.getAllRoleData();
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
        addRoleMember(this.userId,multiId.join(',')).then(res => {
          if(res.success){
            this.$Message.success(res.message);
            this.getRoleData();
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
    getAllRoleData() {
      this.roleLoading = true;
      getAllRoleData(this.rolePage.allRolepageSize,this.rolePage.rolecurrentPage).then(res => {
        this.allRoleData = res.tableContent;
        this.rolePage.roletotal = res.dataCount;
        this.roleLoading = false;
      })
    }
  },
  created(){
    let length = window.location.href.split('#')[1].split('/').length;
    this.userId = window.location.href.split('#')[1].split('/')[length - 1];
  },
  mounted() {
    this.getRoleData();
  }
};
</script>
