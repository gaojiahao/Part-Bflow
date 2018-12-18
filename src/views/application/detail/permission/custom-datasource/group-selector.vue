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
      <!-- 组织modal -->
      <Modal 
        v-model="showOrgModal" 
        title="组织选择" 
        :mask-closable="false" 
        :styles="{top: '15px'}"
        @on-ok="confirmOrg" 
        @on-cancel="cancelSelectOrg" 
        @on-visible-change="modalVisibleChange">
        <div class="app-search">
          <Input 
            v-model="searchOrgValue" 
            @on-search="orgFilter" 
            :search="true" 
            placeholder="搜索" 
            style="width: 300px">
          </Input>
          <p @click="orgFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table 
          ref="orgTable" 
          @on-select-cancel="selectOrgCancel" 
          @on-select-all="onOrgSelectAll" 
          @on-selection-change="selectOrgClick" 
          height="400" 
          stripe size="small" 
          :loading="orgLoading" 
          :columns="orgColumns" 
          :data="orgData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page 
              :total="orgTotal" 
              :current="orgCurrentPage" 
              :page-size="pageSize" 
              @on-change="onOrgPageChange" 
              size="small" 
              show-total>
            </Page>
          </div>
        </div>
        <div class="page-selection-warp" v-show="orgSelection[0] ">
          <Tag 
            v-for="(item,index) in orgSelection" 
            :key="item.id" 
            @on-close="deleteSelectOrg(item,index)" 
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
import { getAllOrgData } from "@/services//appService.js";

export default {
  name: "GroupSelector",
  components: {},
  props: {
      showGroupSelector: {
          type: Boolean
      }
  },
  data() {
    return {
      searchOrgValue: "",
      orgTotal: 0,
      orgCurrentPage: 1,
      pageSize: 10,
      orgLoading: true,
      showOrgModal: false,
      orgColumns: [
        { type: "selection", width: 60, align: "center" },
        { title: "名称", key: "name" }
      ],
      orgData: [],
      orgSelectData: [],
      orgSelection: [],
    };
  },
  watch: {
      showGroupSelector: function (value) {
          if(value){
              this.showOrgModal = value;
              this.selectOrgModal();
              this.orgSelection = [];
              this.orgSelectData = [];
              this.searchOrgValue = '';
          }
      }
  },
  methods: {
    //组织过滤
    orgFilter() {
      let filter = JSON.stringify([
          { operator: "like", value: this.searchOrgValue, property: "name" }
        ]),
        currentPageFilter = 1;
      this.selectOrgModal(filter,currentPageFilter);
    },
    //组织数据加载
    selectOrgModal(filter,currentPageFilter) {
      this.orgLoading = true;
      getAllOrgData(currentPageFilter?currentPageFilter:this.orgCurrentPage, this.pageSize, filter).then(res => {
        this.orgData = res.tableContent;
        this.orgTotal = res.dataCount;
        this.orgLoading = false;

        if (this.orgSelection.length > 0) {
            this.orgData.map(item => {
              this.orgSelection.map(sel => {
                if (item.id == sel.id) {
                  item._checked = true;
                }
              });
            });
          }
      });
    },
    //选择组织
    selectOrgClick(selection, row) {
       if (selection.length === 0) {
        let s = this.$refs.orgTable.data;
        let p = this.orgSelection;
        s.map(item => {
          p = p.filter(f => {
            return f.id !== item.id;
          });
        });
        this.orgSelection = p;
      } else {
        let obj = {};
        this.orgSelection.push(...selection);
        //数组去重
        this.orgSelection = this.orgSelection.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []);
      }
    },
    //组织全选
    onOrgSelectAll(selection) {
      let obj = {};
      //触发全选事件
      //全选
      this.orgSelection.push(...selection);
      //数组去重
      this.orgSelection = this.orgSelection.reduce((cur, next) => {
        obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
        return cur;
      }, []);
    },
    //取消选择的组织
    selectOrgCancel(selection, row) {
      this.orgSelection.forEach((val, index) => {
        if (val.id === row.id) {
          this.orgSelection.splice(index, 1);
        }
      });
    },
    //删除选择的组织
    deleteSelectOrg(item,index) {
      this.orgSelection.splice(index,1);
      this.$refs.orgTable.data.forEach((data,i) => {
        if(item.id === data.id){
          this.$refs.orgTable.toggleSelect(i);
        }
      })
    },
    //取消modal选择组织
    cancelSelectOrg() {
      this.orgSelection = this.orgSelectData;
    },
    //添加组织权限
    confirmOrg() {
      let obj = {};
      this.orgSelectData = this.orgSelection.reduce((cur, next) => {
        obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
        return cur;
      }, []);
      this.$emit('groupModalData',this.orgSelectData);
    },
    //通知父组件modal的状态
    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitGroupModal", { modal: false });
      }
    },
    //组织page点击
    onOrgPageChange(currentPage) {
      let filter = JSON.stringify([
        { operator: "like", value: this.searchOrgValue, property: "name" }
      ]);
      this.orgCurrentPage = currentPage;
      this.selectOrgModal(filter);
    }
  },
  mounted() {
  }
};
</script>

