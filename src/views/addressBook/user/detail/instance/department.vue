<style lang="less">
    .department{
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
    <div class="department">
        <div class="department-detail" id="depHeight">
            <Button type="info" @click="showGroupModal" style="margin-bottom:5px">选择部门</Button>
            <Table ref="selection" :columns="columns" :loading="loading" :data="departmentData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page @on-page-size-change="onPageSizeChange" :total="total" show-elevator show-sizer :current="currentPage" :page-size="pageSize" @on-change="onPageChange" size="small" show-total></Page>
                </div>
            </div>
        </div>
        <Modal
            v-model="showModal"
            title="选择部门"
            @on-ok="addDepartment"
            width="300">
            <Tree class="dep-tree" :data="groupData" @on-select-change="selectNode" :load-data="loadData"></Tree>
        </Modal>
    </div>
</template>

<script>
import { getDepartmentData,getGroupData,addGroupMember } from "@/services/addressBookService.js";

export default {
  name: "departmentMember",
  components: {},
  props: {},
  data() {
    return {
      userId: this.$route.params.userId,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      loading: true,
      showModal: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "类型",
          key: "groupType",
          render: (h,params) => {
              let type = '';
              switch(params.row.groupType){
                case 'O': 
                  type = '部门';
                  break;
                case 'A': 
                  type = '事业部';
                  break;
                case 'R': 
                  type = '岗位';
                  break;
                case 'M': 
                  type = '主体';
                  break;
                case 'C': 
                  type = '公司';
                  break;
              }
              return h('span',{},type);
          }
        },
        {
          title: "名称",
          key: "groupName"
        },
        {
          title: "标签",
          key: "tag"
        },
        {
          title: "负责人",
          key: "principalName"
        },
        {
          title: "加入时间",
          key: "joinTime"
        },
        {
          title: "离开时间",
          key: "leaveTime"
        }
      ],
      departmentData: [],
      groupData: [],
      selectGroup: {}
    };
  },
  methods: {
    //获取部门数据
    getDepartmentData() {
      if(this.userId){
        this.loading = true;
        getDepartmentData(this.userId,this.pageSize,this.currentPage).then(res => {
          this.departmentData = res.tableContent;
          this.total = res.dataCount;
          this.loading = false;
        })
      }else{
          this.loading = false;
      }
    },
    //点击分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getDepartmentData();
    },
    //点击切换每页显示条数
    onPageSizeChange(size) {
      this.pageSize = size;
      this.getDepartmentData();
    },
    //展示所有组织部门
    showGroupModal() {
      this.showModal = true;
      this.getAllGroupData(6);
    },
    //添加组织部门
    addDepartment() {
      if(this.selectGroup && this.userId){
        addGroupMember(this.selectGroup.groupId,this.userId).then(res => {
          if(res.success){
            this.$Message.success(res.message);
            this.getDepartmentData();
          }else{
            this.$Message.warning('请选择组织！');
          }
        })
      }
    },
    //获取所有组织部门数据
    getAllGroupData(parentId) {
      if(this.groupData.length === 0){
        getGroupData(parentId).then(res => {
          res.tableContent.forEach(val => {
                this.groupData.push({
                title: val.groupName,
                groupId: val.groupId,
                loading: false,
                children: []
              })
          })
        })
      }
    },
    //异步加载组织数据
    loadData(item,callback) {
      getGroupData(item.groupId).then(res => {
        let data = [];
        res.tableContent.forEach(val => {
          if(val.leaf === 0){
            data.push({
              title: val.groupName,
              groupId: val.groupId,
              loading: false,
              children: []
            })
          }else{
            data.push({
              title: val.groupName,
              groupId: val.groupId
            })
          } 
        })
        callback(data);
      });
    },
    //选择树节点
    selectNode(node) {
      this.selectGroup = node[0];
    }
  },
  created(){
    let length = window.location.href.split('#')[1].split('/').length;
    this.userId = window.location.href.split('#')[1].split('/')[length - 1];
  },
  mounted() {
    this.getDepartmentData();
  }
};
</script>
