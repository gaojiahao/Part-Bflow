<style lang="less" scoped>
  .permission-page {
    margin-top: 10px;
    overflow: hidden;
  }
  .app-table-search{
    float: right;
    .app-search-icon {
      font-size: 1rem;
      color: #fff;
      display: inline-block;
      cursor: pointer;
    }
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
    <Modal 
      v-model="showModal" 
      title="权限列表" 
      @on-ok="addPermissions" 
      width="800" 
      :styles="{top: '20px'}"
      @on-visible-change="onVisibleChange">
      <div class="app-search">
          <Input 
            @on-search="handleFilter" 
            :search="true" 
            v-model="searchValue" 
            placeholder="搜索权限名称" 
            style="width: 300px">
          </Input>
          <p @click="handleFilter" class="app-search-icon">
              <Button type="primary" size="small">查询</Button>
          </p>
      </div>
        <Table
          @on-selection-change="onSelectionChange" 
          @on-select-all="onSelectAll" 
          @on-select-cancel="onSelectCancel"
          ref="permissionTable" 
          :data="data"
          :columns="column"
          :loading="loading"
          height="400">
        </Table>
        <div class="permission-page">
            <div style="float: right;">
                <Page 
                  @on-page-size-change="onPageSizeChange" 
                  :total="total" 
                  show-elevator show-sizer 
                  :current="currentPage" 
                  :page-size="pageSize" 
                  @on-change="onPageChange" 
                  size="small" 
                  show-total>
                </Page>
            </div>
        </div>
        <div class="page-selection-warp" v-show="selectPermission[0] ">
            <Tag 
            v-for="(item,index) in selectPermission" 
            :key="item.id" 
            @on-close="deleteSelectPermission(item,index)" 
            :userId="item.id" 
            closable 
            type="border" 
            color="primary" 
            size="small">
            {{item.name}}
            </Tag>
        </div>
    </Modal>
</template>

<script>
import {
  getAllPermissionData,
  addPermission
} from "@/services/addressBookService.js";

export default {
  name: "PermissionModal",
  components: {},
  props: {
      target: {
          type: Object
      },
      visible: {
          type: Boolean
      }
  },
  data() {
    return {
      searchValue: "",
      pageSize: 10,
      currentPage: 1,
      total: 0,
      loading: true,
      showModal: false,
      column: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          key: "name"
        }
      ],
      data: [],
      selectPermission: []
    };
  },
  watch: {
      visible: function (value) {
          if(value){
              this.showModal = true;
              this.searchValue = "";
              this.getAllPermissionDatas();
          }
      }
  },
  methods: {
    //modal状态发生改变
    onVisibleChange(status) {
        if(!status) this.$emit('changeModalStatus');
    },
    //添加权限
    addPermissions() {
      let multiId = [];
      this.selectPermission.forEach(val => {
        multiId.push(val.id);
      });
      if (multiId && this.target) {
        addPermission(this.target.type,this.target.targetId, multiId.join(","))
          .then(res => {
            if (res.success) {
              this.selectPermission = [];
              this.$Message.success("更新成功");
              this.$emit('permissionChange');
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
      }
    },
    
    //加载所有权限数据
    getAllPermissionDatas(filter) {
      this.loading = true;
      getAllPermissionData(0,this.pageSize,this.currentPage,filter).then(res => {
        this.data = res.tableContent;
        this.total = res.dataCount;
        this.loading = false;

        if (this.selectPermission.length > 0) {
            this.data.map(item => {
              this.selectPermission.map(sel => {
                if (item.id === sel.id) {
                  item._checked = true;
                }
              });
            });
          }
      });
    },
    //选择权限列表权限
    onSelectionChange(selection) {
      //取消全选
      if (selection.length === 0) {
        let s = this.$refs.permissionTable.data;
        let p = this.selectPermission;
        s.map(item => {
          p = p.filter(f => {
            return f.id !== item.id;
          });
        });
        this.selectPermission = p;
      } else {
        let obj = {};
        this.selectPermission.push(...selection);
        //数组去重
        this.selectPermission = this.selectPermission.reduce((cur, next) => {
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
      this.selectPermission.push(...selection);
      //数组去重
      this.selectPermission = this.selectPermission.reduce((cur, next) => {
        obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
        return cur;
      }, []);
    },
    //单选取消
    onSelectCancel(selection, row) {
      this.selectPermission = this.selectPermission.filter(f => {
        return f.id !== row.id;
      });
    },
    //删除权限列表已选择的权限
    deleteSelectPermission(item,index) {
      this.selectPermission.splice(index,1);
      this.$refs.permissionTable.data.forEach((data,i) => {
        if(item.id === data.id){
          this.$refs.permissionTable.toggleSelect(i);
        }
      })
    },
    //点击切换权限列表每页显示条数
    onPageSizeChange(size) {
      let filter = JSON.stringify([{ operator: "like", value: this.searchValue, property: "name" }]);
      this.pageSize = size;
      this.getAllPermissionDatas(filter);
    },
    //点击页码切换事件
    onPageChange(currentPage) {
      let filter = JSON.stringify([{ operator: "like", value: this.searchValue, property: "name" }]);
      this.currentPage = currentPage;
      this.getAllPermissionDatas(filter);
    },
    //权限列表过滤
    handleFilter() {
      let filter = JSON.stringify([{ operator: "like", value: this.searchValue, property: "name" }]);
      this.getAllPermissionDatas(filter);
    }
  },
  mounted() {
      this.getAllPermissionDatas();
  }
};
</script>
