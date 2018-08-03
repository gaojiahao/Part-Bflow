<style lang="less" scoped>
@import "./higherCompany.less";
</style>
<template>
    <div class="higher-">
        <div class="higher-company-detail" id="cliHeight">
            <Button type="info" @click="showCompanyModal" style="margin-bottom:5px">选择上级用户</Button>
            <Table ref="selection" :columns="columns" :loading="higherLoading" :data="higherCompanyData"></Table>
            <div class="user-page">
                <div style="float: right;">
                    <Page @on-page-size-change="onPageSizeChange" :total="highCompanyTotal" show-elevator show-sizer :current="highCompanyCurrentPage" :page-size="highCompanyPageSize" @on-change="onPageChange" size="small" show-total></Page>
                </div>
            </div>
        </div>
        <Modal v-model="showModal" title="选择用户" @on-ok="addHighCompany" width="1000">
            <Table ref="selection" :highlight-row="true" @on-row-click="onSelectionChange" height="400" :loading="companyLoading" :columns="columns" :data="companyData"></Table>
            <div class="company-page">
                <div class="fr">
                    <Page @on-page-size-change="onAllCompanyPageSizeChange" :total="companyTotal" show-elevator show-sizer :current="companyCurrentPage" :page-size="companyPageSize" @on-change="onCompanyPageChange" size="small" show-total></Page>
                </div>
            </div>
        </Modal>
    </div>
</template>
   
<script>
import { getCompanyList } from "@/services/addressBookService.js";
export default {
  data() {
    return {
      groupId: this.$route.params.groupId,
      higherLoading: false,
      higherCompanyData: [],
      highCompanyTotal: 0,
      highCompanyCurrentPage: 1,
      highCompanyPageSize: 10,
      companyLoading: false,
      companyTotal: 0,
      companyCurrentPage: 1,
      companyPageSize: 10,
      companyData: [],
      columns: [],
      taget: 1, //上级公司标识
      selectCompanyData: {},
      showModal: false
    };
  },
  methods: {
    //获取所有公司列表
    getAllCompanyList() {
      this.companyLoading = true;
      getCompanyList(
        this.groupId,
        this.taget,
        this.companyCurrentPage,
        this.companyPageSize
      ).then(res => {
        this.companyData = res.tableContent;
        this.companyTotal = res.dataCount;
        this.companyLoading = false;
      });
    },
    //选择上级公司
    onSelectionChange(selection) {
      this.selectCompanyData = selection;
    },
    //显示所有公司列表
    showCompanyModal() {
      this.showModal = true;
      this.getAllCompanyList();
    },
    //上级公司页数改变
    onPageSizeChange(size) {
      this.highCompanyPageSize = size;
      //this.getHigherCompanyData();
    },
    //上级公司页码改变
    onPageChange(currentPage) {
      this.highCompanyCurrentPage = currentPage;
      //this.getHigherCompanyData();
    },
    //所有公司列表页码改变
    onAllCompanyPageSizeChange(size) {
      this.companyPageSize = size;
      this.getAllCompanyList();
    },
    //所有公司页码改变
    onCompanyPageChange(currentPage) {
      this.companyCurrentPage = currentPage;
    },
    //确认选择
    addHighCompany() {}
  },
  mounted() {
    // this.getAllCompanyList();
  }
};
</script>


