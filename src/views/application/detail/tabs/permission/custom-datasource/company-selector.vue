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
      <!-- 公司modal -->
      <Modal v-model="showCompanyModal" title="公司选择" :mask-closable="false" @on-ok="confirmCompany" @on-cancel="cancelSelectCom" :transfer="false">
        <div class="app-search">
          <Input v-model="searchComValue" @on-search="comFilter" :search="true" placeholder="搜索" style="width: 300px"></Input>
          <p @click="comFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </p>
        </div>
        <Table ref="companyTable" @on-select-cancel="selectComCancel" @on-select-all="onCompanySelectAll" @on-selection-change="selectCompanyClick" height="400" stripe size="small" :loading="comLoading" :columns="companyColumns" :data="companyData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page :total="comTotal" :current="comCurrentPage" :page-size="pageSize" @on-change="onComPageChange" size="small" show-total></Page>
          </div>
        </div>
        <div class="page-selection-warp" v-show="companySelection[0] ">
          <Tag v-for="(item,index) in companySelection" :key="item.id" @on-close="deleteSelectCompany(item,index)" closable type="border" color="primary" size="small">
            {{item.groupName}}
          </Tag>
        </div>
       </Modal>
    </div>
</template>

<script>
import { getAllCompanys } from "@/services/addressBookService.js";

export default {
  name: "CompanySelector",
  components: {},
  props: {
      showCompanySelector: {
          type: Boolean
      }
  },
  data() {
    return {
      searchComValue: "",
      comTotal: 0,
      comCurrentPage: 1,
      pageSize: 10,
      comLoading: true,
      showCompanyModal: false,
      companyColumns: [
        { type: "selection", width: 60, align: "center" },
        { title: "名称", key: "groupName" }
      ],
      companyData: [],
      companySelectData: [],
      companySelection: [],
    };
  },
  watch: {
      showCompanySelector: function (value) {
          if(value){
              this.showCompanyModal = value;
              this.selectCompanyModal();
              this.companySelection = [];
              this.companySelectData = [];
          }
      }
  },
  methods: {
    // 公司过滤
    comFilter() {
      let currentPageFilter = 1;
      this.selectCompanyModal(this.searchComValue,currentPageFilter);
    },
    //公司数据加载
    selectCompanyModal(filter,currentPageFilter) {
      this.comLoading = true;
      getAllCompanys(this.pageSize, currentPageFilter?currentPageFilter:this.depCurrentPage, filter).then(
        res => {
          this.companyData = res.tableContent;
          this.comTotal = res.dataCount;
          this.comLoading = false;

          if (this.companySelection.length > 0) {
            this.companyData.map(item => {
              this.companySelection.map(sel => {
                if (item.groupId == sel.groupId) {
                  item._checked = true;
                }
              });
            });
          }
        }
      );
    },
    //选择公司
    selectCompanyClick(selection, row) {
      if (selection.length === 0) {
        let s = this.$refs.companyTable.data;
        let p = this.companySelection;
        s.map(item => {
          p = p.filter(f => {
            return f.groupId !== item.groupId;
          });
        });
        this.companySelection = p;
      } else {
        let obj = {};
        this.companySelection.push(...selection);
        //数组去重
        this.companySelection = this.companySelection.reduce((cur, next) => {
          obj[next.groupId] ? "" : (obj[next.groupId] = true && cur.push(next));
          return cur;
        }, []);
      }
    },
    //公司全选
    onCompanySelectAll(selection) {
      let obj = {};
      //触发全选事件
      //全选
      this.companySelection.push(...selection);
      //数组去重
      this.companySelection = this.companySelection.reduce((cur, next) => {
        obj[next.groupId] ? "" : (obj[next.groupId] = true && cur.push(next));
        return cur;
      }, []);
    },
    //取消选择的公司
    selectComCancel(selection, row) {
      this.companySelection.forEach((val, index) => {
        if (val.groupId === row.groupId) {
          this.companySelection.splice(index, 1);
        }
      });
    },
    //删除选择的公司
    deleteSelectCompany(item,index) {
      this.companySelection.splice(index,1);
      this.$refs.companyTable.data.forEach((data,i) => {
        if(item.groupId === data.groupId){
          this.$refs.companyTable.toggleSelect(i);
        }
      })
    },
    //取消modal选择公司
    cancelSelectCom() {
      this.companySelection = this.companySelectData;
    },
    //添加公司权限
    confirmCompany() {
      let obj = {};
      this.companySelectData = this.companySelection.reduce(
        (cur, next) => {
          obj[next.groupId] ? "" : (obj[next.groupId] = true && cur.push(next));
          return cur;
        },
        []
      );
    },
    //通知父组件modal的状态
    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitCompanyModal", { modal: false });
      }
    },
    //公司page点击
    onComPageChange(currentPage) {
      this.comCurrentPage = currentPage;
      this.selectPositionModal(this.searchComValue);
    }
  },
  mounted() {
  }
};
</script>

