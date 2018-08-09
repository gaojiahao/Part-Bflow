<style lang="less">
    .department{
      &-detail{
        background-color: #fff;
        margin: 15px 93px;
        padding: 26px 50px;
        box-shadow: 0px 1px 10px #ddd;
        &-btn{
          margin-bottom:5px;
          color: rgb(0, 150, 136);
          font-size: 17px;
          cursor: pointer;
        }
      }
  }
  .dep-tree{
    height: 350px;
    overflow: auto;
  }
  .user-page {
    margin: 10px;
    overflow: hidden;
  }
</style>

<template>
    <div class="department">
        <div class="department-detail" id="depHeight">
            <b type="info" @click="showGroupModal" class="department-detail-btn">部门</b>
            <span style="color: #7a7676;">-添加部门</span>
            <b type="info" @click="deleteGroup" class="department-detail-btn">删除</b>
            <span style="color: #7a7676;">-批量删除部门</span>
            <Table ref="selection" @on-selection-change="selectDeleteGroup" :columns="columns" :loading="loading" :data="departmentData"></Table>
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
            <Tree :multiple="true" class="dep-tree" :data="groupData" @on-select-change="selectNode" :load-data="loadData"></Tree>
        </Modal>
    </div>
</template>

<script>
import { getDepartmentData,getGroupData,addMember,deleteMember } from "@/services/addressBookService.js";

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
          key: "groupName",
          width: 200
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
                    content: '确认删除此部门？',
                    onOk: () => {
                      deleteMember('sys_group_user',params.row.groupId,this.userId).then(res => {
                        if(res.success){
                          this.$Message.success(res.message);
                          this.getDepartmentData();
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
      departmentData: [],
      groupData: [],
      selectGroup: [],
      selectDeleteGroupData: []
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
      this.groupData = [];
      this.getAllGroupData(6);
    },
    //删除选择的用户部门
    deleteGroup() {
      let groupIds = [];
      if(this.selectDeleteGroupData.length === 0){
        this.$Message.warning('请先选择要删除的用户部门！');
      }else{
        this.selectDeleteGroupData.forEach(val => {
          groupIds.push(val.groupId);
        })
        this.$Modal.confirm({
          title: '确认',
          content: '确认删除选择的用户部门？',
          onOk: () => {
            deleteMember('sys_group_user',groupIds.join(','),this.userId).then(res => {
              if(res.success){
                this.selectDeleteGroupData = [];
                this.$Message.success(res.message);
                this.getDepartmentData();
                this.$emit('changeInstance');
              }
            })
          }
        });
      }
    },
    //选择要删除的用户部门
    selectDeleteGroup(selection) {
      this.selectDeleteGroupData = selection;
    },
    //添加组织部门
    addDepartment() {
      if(this.selectGroup && this.userId){
        let groupIds = [];
        this.selectGroup.forEach(val => {
          groupIds.push(val.groupId);
        });
        addMember('sys_group_user',groupIds.join(','),this.userId).then(res => {
          if(res.success){
            this.selectGroup = [];
            this.$Message.success(res.message);
            this.getDepartmentData();
            this.$emit('changeInstance');
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
      this.selectGroup = node;
    }
  },
  mounted() {
    this.getDepartmentData();
  }
};
</script>
