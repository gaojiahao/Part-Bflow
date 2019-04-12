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
</style>

<template>
    <div>
      <!-- 应用名称modal -->
      <Modal 
        v-model="showAppNameModal" 
        title="应用选择" 
        :mask-closable="false" 
        width="800"
        :styles="{top: '15px'}" 
        @on-ok="confirmAppName">
        <div class="app-search">
          <Input 
            v-model="searchValue" 
            @on-search="appNameFilter" 
            :search="true" 
            placeholder="应用名称搜索" 
            style="width: 300px">
          </Input>
        </div>
        <Table 
          ref="appTable" 
          @on-current-change="selectClick"
          @on-row-dblclick="selectDbClick"
          highlight-row 
          :height="tableHeight" 
          stripe size="small" 
          :loading="loading" 
          :columns="columns" 
          :data="appNameData">
        </Table>
        <div class="user-page">
          <div style="float: right;">
            <Page 
              :total="total" 
              :current="currentPage" 
              :page-size="pageSize" 
              @on-change="onPageChange" 
              size="small" 
              show-total>
            </Page>
          </div>
        </div>
      </Modal>
    </div>
</template>

<script>
import { getProcessAppNames } from "@/services/appService.js";

export default {
  name: "UserSelector",
  components: {},
  data() {
    return {
      searchValue: "",
      total: 0,
      currentPage: 1,
      pageSize: 10,
      tableHeight: 400,
      loading: true,
      showAppNameModal: false,
      columns: [
        { title: "应用名称", key: "processApplication" }
      ],
      appNameData: [],
      appNameSelection: [],
    };
  },
  watch: {
      showAppNameModal: function (value) {
          if(value){
              this.showAppNameModal = value;
              this.selectUserModal();
              this.appNameSelection = [];
              this.searchValue = '';
          }
      }
  },
  methods: {
    //应用名称过滤
    appNameFilter() {
      let filter = JSON.stringify([
        {
          operator: "like",
          value: this.searchValue,
          property: "processApplication"
        }
      ]),
      currentPageFilter = 1;
      this.selectUserModal(filter,currentPageFilter);
    },
    //应用数据加载
    selectUserModal(filter,currentPageFilter) {
      this.loading = true;
        getProcessAppNames(currentPageFilter?currentPageFilter:this.currentPage, this.pageSize, filter).then(res => {
          this.appNameData = res.tableContent;
          this.total = res.dataCount;
          this.loading = false;
        });
      
    },
    //选择应用
    selectClick(selection) {
      this.appNameSelection = selection;
    },
    //添加应用名称
    confirmAppName() {
      this.$emit('appSelectData',this.appNameSelection);
    },
    selectDbClick(selection) {
        this.$emit('appSelectData',selection);
        this.showAppNameModal = false;
    },
    //page点击
    onPageChange(currentPage) {
      let filter = JSON.stringify([
        {
          operator: "like",
          value: this.searchValue,
          property: "processApplication"
        }
      ]);
      this.currentPage = currentPage;
      this.selectUserModal(filter);
    }
  },
  mounted() {
  }
};
</script>