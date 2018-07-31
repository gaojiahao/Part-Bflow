<style lang="less">
    .role{
      &-detail{
        background-color: #fff;
        margin: 5px 93px;
        padding: 26px 50px;
        box-shadow: 0px 1px 40px #ddd;
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
                  <Page :total="total" show-elevator show-sizer :current="currentPage" :page-size="pageSize" @on-change="onPageChange" size="small" show-total></Page>
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
                  <Page :total="roletotal" show-elevator show-sizer :current="rolecurrentPage" :page-size="pageSize" @on-change="onRolePageChange" size="small" show-total></Page>
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
      clientHeight: document.body.clientHeight,
      total: 0,
      roletotal: 0,
      currentPage: 1,
      rolecurrentPage: 1,
      pageSize: 10,
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
              let type = params.row.type==='C'?'操作类':'';
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
      this.loading = true;
      getRoleData(15383,this.pageSize,this.currentPage).then(res => {
        this.roleData = res.tableContent;
        this.total = res.dataCount;
        this.loading = false;
      })
    },
    //点击分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getRoleData();
    },
    onRolePageChange(currentPage) {
      this.rolecurrentPage = currentPage;
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
      if(multiId){
        addRoleMember(15383,multiId.join(',')).then(res => {
          if(res.success){
            this.$Message.success(res.message);
            this.getRoleData();
          }
        })
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
      getAllRoleData(this.pageSize,this.rolecurrentPage).then(res => {
        this.allRoleData = res.tableContent;
        this.roletotal = res.dataCount;
        this.roleLoading = false;
      })
    }
  },
  mounted() {
    let relHeight = document.body.clientHeight-190;
    this.getRoleData();
    document.getElementById('roleHeight').style.minHeight = relHeight+'px';
  }
};
</script>
