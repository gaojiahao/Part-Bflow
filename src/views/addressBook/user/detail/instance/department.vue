<style lang="less">
    .department{
      &-detail{
        background-color: #fff;
        margin: 5px 93px;
        padding: 26px 50px;
        box-shadow: 0px 1px 40px #ddd;
      }
  }
</style>

<template>
    <div class="department">
        <div class="department-detail" id="depHeight">
            <Button type="info" @click="showGroupModal" style="margin-bottom:5px">选择部门</Button>
            <Table ref="selection" :columns="columns" :loading="loading" :data="departmentData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page :total="total" show-elevator show-sizer :current="currentPage" :page-size="pageSize" @on-change="onPageChange" size="small" show-total></Page>
                </div>
            </div>
        </div>
        <Modal
            v-model="showModal"
            title="选择部门"
            @on-ok="addDepartment"
            width="300">
            <Tree :data="groupData" @on-select-change="selectNode" :load-data="loadData"></Tree>
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
              if(params.row.groupType === 'O'){
                  type = '部门';
              }else if(params.row.groupType === 'A'){
                  type = '事业部';
              }else{
                  type = '岗位';
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
      this.loading = true;
      getDepartmentData(15383,this.pageSize,this.currentPage).then(res => {
        this.departmentData = res.tableContent;
        this.total = res.dataCount;
        this.loading = false;
      })
    },
    //点击分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getDepartmentData();
    },
    //展示所有组织部门
    showGroupModal() {
      this.showModal = true;
      this.getAllGroupData(6);
    },
    //添加组织部门
    addDepartment() {
      if(this.selectGroup){
        addGroupMember(this.selectGroup.groupId,15383).then(res => {
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
  mounted() {
    let relHeight = document.body.clientHeight-190;
    this.getDepartmentData();
    document.getElementById('depHeight').style.minHeight = relHeight+'px';
  }
};
</script>
