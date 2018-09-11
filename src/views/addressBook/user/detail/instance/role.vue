<style lang="less" scoped>
    .role{
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
    <div class="role">
        <div class="role-detail" id="roleHeight">
            <b @click="showRoleModal"  class="role-detail-btn">职位</b>
            <span style="color: #7a7676;">-添加职位</span>
            <b @click="deleteUserRole"  class="role-detail-btn">删除</b>
            <span style="color: #7a7676;">-批量删除职位</span>
            <Table @on-selection-change="selectDeleteRole" :columns="columns" :loading="loading" :data="roleData"></Table>
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
            :styles="{top: '15px'}"
            width="1000">
            <div class="app-search">
              <Input @on-search="roleFilter" :search="true" v-model="searchValue" placeholder="搜索职位名称" style="width: 300px"></Input>
              <p @click="roleFilter" class="app-search-icon">
                  <Button type="primary" size="small">查询</Button>
              </p>
            </div>
            <Table ref="selection" @on-selection-change="onSelectionChange" @on-select-all="onSelectAll" @on-select-cancel="onSelectCancel" height="400" :loading="roleLoading" :columns="RoleColumns" :data="allRoleData"></Table>
            <div class="user-page">
                <div style="float: right;">
                  <Page @on-page-size-change="onAllRolePageSizeChange" :total="rolePage.roletotal" show-elevator show-sizer :current="rolePage.rolecurrentPage" :page-size="rolePage.allRolepageSize" @on-change="onRolePageChange" size="small" show-total></Page>
                </div>
            </div>
            <div class="page-selection-warp" v-show="selectRoleData[0] ">
              <Tag v-for="(item,index) in selectRoleData" :key="item.id" @on-close="deleteSelectUser(item,index)" :userId="item.id" closable type="border" color="primary" size="small">
                {{item.name}}
              </Tag>
            </div>
        </Modal>
    </div>
</template>

<script>
import { 
  getRoleData,
  getAllRoleData,
  addMember,
  deleteMember,
  setUserDefaultDepOrRole
   } from "@/services/addressBookService.js";

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
          title: "默认职位",
          key: "isDefault",
          align: "center",
          render: (h, params) => {
            let defaultView = false;
            if (params.row.isDefault === 1) {
              defaultView = true;
            }
            return h("Radio", {
              props: {
                value: defaultView
              },
              on: {
                "on-change": e => {
                  this.onClickDefaultView(params);
                }
              }
            });
          }
        },
        {
          title: '操作',
          key: 'action',
          maxWidth: 150,
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
                          this.$Message.success('删除成功！');
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
     //点击默认职位方法
    onClickDefaultView(params) {
      this.$Modal.confirm({
        title: "确认",
        content: "确认设置此部门为默认部门？",
        onOk: () => {
          this.setDefaultViews(params);
        },
        onCancel: () => {
          this.reRenderDefaultView();
        }
      });
    },
    //设置默认职位并重新渲染columns
    setDefaultViews(params) {
      setUserDefaultDepOrRole(this.userId,'role',params.row.id).then(res => {
        if (res.success) {
          this.$Message.success(res.message);
          this.getRoleData();
        }
      });
    },
    //重新渲染默认职位columns方法
    reRenderDefaultView() {
      this.columns[4].render = (h, params) => {
        let defaultView = false;
        if (params.row.isDefault === 1) {
          defaultView = true;
        }
        return h("Radio", {
          props: {
            value: defaultView
          },
          on: {
            "on-change": () => {
              this.onClickDefaultView(params);
            }
          }
        });
      };
    },
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
                this.$Message.success('删除成功！');
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
            this.$Message.success('更新成功');
            this.getRoleData();
            this.$emit('changeInstance');
          }
        })
      }else{
        this.$Message.warning('无用户ID，请先保存用户再进行编辑！');
      }
    },
    //删除选择的用户
    deleteSelectUser(item,index) {
      this.selectRoleData.splice(index,1);
      this.$refs.selection.data.forEach((data,i) => {
        if(item.id === data.id){
          this.$refs.selection.toggleSelect(i);
        }
      })
    },
    //选择职位
    onSelectionChange(selection) {
      // this.selectRoleData = selection;
      //取消全选
      if (selection.length === 0) {
        let s = this.$refs.selection.data;
        let p = this.selectRoleData;
        s.map(item => {
          p = p.filter(f => {
            return f.id !== item.id;
          });
        });
        this.selectRoleData = p;
      } else {
        let obj = {};
        this.selectRoleData.push(...selection);
        //数组去重
        this.selectRoleData = this.selectRoleData.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []);
      }
    },
    //全选
    onSelectAll(selection) {
      let obj = {};
      //触发全选事件
      //全选
      this.selectRoleData.push(...selection);
      //数组去重
      this.selectRoleData = this.selectRoleData.reduce((cur, next) => {
        obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
        return cur;
      }, []);
    },
    //单选取消
    onSelectCancel(selection, row) {
      this.selectRoleData = this.selectRoleData.filter(f => {
        return f.id !== row.id;
      });
    },
    //展示所有职位
    showRoleModal() {
      this.showModal = true;
      this.searchValue = '';
      this.selectRoleData = [];
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

        if (this.selectRoleData.length > 0) {
            this.allRoleData.map(item => {
              this.selectRoleData.map(sel => {
                if (item.id === sel.id) {
                  item._checked = true;
                }
              });
            });
          }
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
