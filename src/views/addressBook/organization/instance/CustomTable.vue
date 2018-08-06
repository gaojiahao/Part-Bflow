<template>
  <div class="rfd-cs">
    <header class="rfd-cs-header">
      <slot name="header"></slot>
    </header>
    <div class="rfd-cs-table">
      <Table :loading="loading" :columns="columns" :data="columnsData" ref="selection" @on-selection-change='onSelectionChange'></Table>
    </div>
    <div class="rfd-cs-table">
      <div style="float: right;">
        <Page :total="pageTotal" :current="currentPage" :page-size="pageSize" size="small" @on-change="changeCurrentPage" @on-page-size-change="onPageSizeChange" show-total show-elevator show-sizer></Page>
      </div>
    </div>
    <footer class="rfd-cs-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import { getTableData } from "@/services/addressBookService.js";

export default {
  name: "CustomTable",

  props: {
    columns: {
      type: Array
    },

    apiUrl: {
      type: String
    },
    apiParams: {
      type: Object
    },

    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      pageTotal: 0,
      currentPage: 1,
      pageSize: 8,
      loading: false,
      columnsData: []
    };
  },

  watch: {
    value(val) {
      if (val) {
        this.getTableData(this.apiParams);
      }
    }
  },

  methods: {
    changeCurrentPage(currentPage) {
      let params = this.apiParams;
      params.page = currentPage;
      this.getTableData(params);
    },

    onSelectionChange(selection) {
      this.$emit("on-selection-change", selection);
    },

    //点击切换每页显示条数
    onPageSizeChange(size) {
      let params = this.apiParams;
      params.limit = size;
      this.getTableData(params);
    },

    getTableData(params) {
      this.loading = true;
      getTableData(this.apiUrl, params).then(res => {
        if (res.tableContent[0]) {
          this.pageTotal = res.summary.total;
          this.columnsData = res.tableContent;
          if (this.value) {
            this.$emit("on-refesh-change", false);
          }
        }
        this.loading = false;
      });
    }
  },

  mounted() {
    this.getTableData(this.apiParams);
  }
};
</script>

<style lang="less">
.rfd-cs {
  width: 100%;
  min-height: 500px;
  background-color: #fff;
  padding: 20px 20px;

  &-header {
    .ivu-btn-primary {
      background-color: #2db7f5;
      border-color: #2db7f5;
    }
  }

  &-table {
    margin-top: 10px;
  }

  &-page {
    margin: 10px;
    overflow: hidden;
  }
}
</style>
