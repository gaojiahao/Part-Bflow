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
      <!-- 职位modal -->
      <Modal 
        v-model="showDepartmentModal" 
        title="职位选择" 
        :mask-closable="false"
        :styles="{top: '15px'}" 
        @on-ok="confirmDepartment" 
        @on-cancel="cancelSelectDep" 
        @on-visible-change="modalVisibleChange" 
        :transfer="false">
        <div class="app-search">
          <Input 
            v-model="searchDepValue" 
            @on-search="depFilter" 
            :search="true" 
            placeholder="搜索" 
            style="width: 300px">
          </Input>
          <p @click="depFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table 
          ref="roleTable" 
          @on-select-cancel="selectDepCancel" 
          @on-select-all="onRoleSelectAll" 
          @on-selection-change="selectDepartmentClick" 
          height="400" 
          stripe size="small" 
          :loading="depLoading" 
          :columns="departmentColumns" 
          :data="departmentData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page 
              :total="depTotal" 
              :current="depCurrentPage" 
              :page-size="pageSize" 
              @on-change="onDepPageChange" 
              size="small" 
              show-total>
            </Page>
          </div>
        </div>
        <div class="page-selection-warp" v-show="departmentSelection[0] ">
          <Tag 
            v-for="(item,index) in departmentSelection" 
            :key="item.id" 
            @on-close="deleteSelectRole(item,index)" 
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
import { getAllDepartmentData } from "@/services//appService.js";

export default {
  name: "RoleSelector",
  components: {},
  props: {
      showRoleSelector: {
          type: Boolean
      }
  },
  data() {
    return {
      searchDepValue: "",
      depTotal: 0,
      depCurrentPage: 1,
      pageSize: 10,
      depLoading: true,
      showDepartmentModal: false,
      departmentColumns: [
        { type: "selection", width: 60, align: "center" },
        { title: "名称", key: "name" }
      ],
      departmentData: [],
      departmentSelectData: [],
      departmentSelection: []
    };
  },
  watch: {
      showRoleSelector: function (value) {
          if(value){
              this.showDepartmentModal = value;
              this.selectPositionModal();
              this.departmentSelection = [];
              this.departmentSelectData = [];
          }
      }
  },
  methods: {
    //职位过滤
    depFilter() {
      let filter = JSON.stringify([
          { operator: "like", value: this.searchDepValue, property: "name" }
        ]),
        currentPageFilter = 1;
      this.selectPositionModal(filter,currentPageFilter);
    },
    //职位数据加载
    selectPositionModal(filter,currentPageFilter) {
      this.depLoading = true;
      getAllDepartmentData(currentPageFilter?currentPageFilter:this.depCurrentPage, this.pageSize, filter).then(
        res => {
          this.departmentData = res.tableContent;
          this.depTotal = res.dataCount;
          this.depLoading = false;

          if (this.departmentSelection.length > 0) {
            this.departmentData.map(item => {
              this.departmentSelection.map(sel => {
                if (item.id == sel.id) {
                  item._checked = true;
                }
              });
            });
          }
        }
      );
    },
    //选择职位
    selectDepartmentClick(selection, row) {
      if (selection.length === 0) {
        let s = this.$refs.roleTable.data;
        let p = this.departmentSelection;
        s.map(item => {
          p = p.filter(f => {
            return f.id !== item.id;
          });
        });
        this.departmentSelection = p;
      } else {
        let obj = {};
        this.departmentSelection.push(...selection);
        //数组去重
        this.departmentSelection = this.departmentSelection.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []);
      }
    },
    //职位全选
    onRoleSelectAll(selection) {
      let obj = {};
      //触发全选事件
      //全选
      this.departmentSelection.push(...selection);
      //数组去重
      this.departmentSelection = this.departmentSelection.reduce((cur, next) => {
        obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
        return cur;
      }, []);
    },
    //取消选择的职位
    selectDepCancel(selection, row) {
      this.departmentSelection.forEach((val, index) => {
        if (val.id === row.id) {
          this.departmentSelection.splice(index, 1);
        }
      });
    },
    //删除选择的职位
    deleteSelectRole(item,index) {
      this.departmentSelection.splice(index,1);
      this.$refs.roleTable.data.forEach((data,i) => {
        if(item.id === data.id){
          this.$refs.roleTable.toggleSelect(i);
        }
      })
    },
    //取消modal选择职位
    cancelSelectDep() {
      this.departmentSelection = this.departmentSelectData;
    },
    //添加职位权限
    confirmDepartment() {
      let obj = {};
      this.departmentSelectData = this.departmentSelection.reduce(
        (cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        },
        []
      );
      this.$emit('roleModalData',this.departmentSelectData);
    },
    //通知父组件modal的状态
    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitRoleModal", { modal: false });
      }
    },
    //职位page点击
    onDepPageChange(currentPage) {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchDepValue, property: "name" }
      ]);
      this.depCurrentPage = currentPage;
      this.selectPositionModal(filter);
    },
  },
  mounted() {
  }
};
</script>

