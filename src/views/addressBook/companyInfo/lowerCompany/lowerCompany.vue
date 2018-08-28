<style lang="less">
.lower-company {
  &-detail {
    background-color: #fff;
    padding: 26px 50px;
    width: 75%;
    margin: 0 auto;
    box-shadow: 0px 1px 10px #ddd;
    position: relative;
    &-btn {
      margin-bottom: 5px;
      color: rgb(0, 150, 136);
      font-size: 17px;
      cursor: pointer;
    }
  }
}
.search {
  margin-bottom: 5px;
  &-btn {
    width: 300px;
  }
}
</style>
<template>
  <div class="lower-company">
    <div class="lower-company-detail" id="cliHeight">
      <b @click="showCompanyModal" class="lower-company-detail-btn">添加公司</b>
      <span style="color: #7a7676;">-选择下级公司</span>
      <b @click="delCompany" class="lower-company-detail-btn">删除</b>
      <span style="color: #7a7676;">-批量删除下级公司</span>
      <br>
      <Table ref="selection" :columns="columns" :loading="lowerLoading" :data="lowerCompanyData" @on-selection-change="delCompanyChange"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div class="fr">
          <Page @on-page-size-change="onPageSizeChange" :total="lowerCompanyTotal" show-elevator show-sizer :current="lowerCompanyCurrentPage" :page-size="lowerCompanyPageSize" @on-change="onPageChange" size="small" show-total></Page>
        </div>
      </div>
    </div>
    <Modal v-model="showModal" title="选择下级公司" @on-ok="addlowerCompany" width="1200">
      <div class="serach">
        <Input placeholder="请输入公司名称" @on-search="search" :search="true" class="search-btn" v-model="groupName" />
        <Button type="primary" @click="search">搜索</Button>
      </div>
      <Table ref="selection" :highlight-row="true" @on-selection-change="onSelectionChange" height="400" :loading="companyLoading" :columns="columns1" :data="companyData"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div class="fr">
          <Page @on-page-size-change="onAllCompanyPageSizeChange" :total="companyTotal" show-elevator show-sizer :current="companyCurrentPage" :page-size="companyPageSize" @on-change="onCompanyPageChange" size="small" show-total></Page>
        </div>
      </div>
    </Modal>
  </div>
</template>
   
<script>
import {
  getCompanyList,
  addLowerCompany,
  removeCompany,
  searchCompany
} from "@/services/addressBookService.js";
export default {
  data() {
    return {
      groupId: this.$route.params.groupId,
      lowerLoading: false,
      lowerCompanyData: [],
      lowerCompanyTotal: 0,
      lowerCompanyCurrentPage: 1,
      lowerCompanyPageSize: 10,
      companyLoading: false,
      companyTotal: 0,
      companyCurrentPage: 1,
      companyPageSize: 10,
      companyData: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "公司名称",
          key: "groupName"
        },
        {
          title: "公司简称",
          key: "groupShortName"
        },
        {
          title: "公司类型",
          key: "depFunction"
        },
        {
          title: "修改时间",
          key: "modTime"
        },
        {
          title: "创建时间",
          key: "crtTime"
        },
        {
          title: "创建者",
          key: "creator"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.delLowerCompanyOne(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "公司ID",
          key: "groupId"
        },
        {
          title: "公司名称",
          key: "groupName"
        },
        {
          title: "公司简称",
          key: "groupShortName"
        },
        {
          title: "公司类型",
          key: "depFunction"
        },
        {
          title: "修改时间",
          key: "modTime"
        },
        {
          title: "创建时间",
          key: "crtTime"
        },
        {
          title: "创建者",
          key: "creator"
        }
      ],
      selectCompanyData: {},
      deleteCompanyData: [],
      showModal: false,
      groupName: ""
    };
  },
  methods: {
    //获取所有公司列表
    getAllCompanyList() {
      let target = 3;
      this.companyLoading = true;
      getCompanyList(
        this.groupId,
        target,
        this.companyCurrentPage,
        this.companyPageSize
      ).then(res => {
        this.companyData = res.tableContent;
        this.companyTotal = res.dataCount;
        this.companyLoading = false;
      });
    },
    //获取上级公司信息
    getlowerCompanyData() {
      let target = 2;
      this.lowerLoading = true;
      getCompanyList(
        this.groupId,
        target,
        this.lowerCompanyCurrentPage,
        this.lowerCompanyPageSize
      ).then(res => {
        this.lowerCompanyData = res.tableContent;
        this.lowerCompanyTotal = res.dataCount;
        this.lowerLoading = false;
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
      this.getlowerCompanyData();
    },
    //上级公司页码改变
    onPageChange(currentPage) {
      this.highCompanyCurrentPage = currentPage;
      this.getlowerCompanyData();
    },
    //所有公司列表页码改变
    onAllCompanyPageSizeChange(size) {
      this.companyPageSize = size;
      this.getAllCompanyList();
    },
    //所有公司页码改变
    onCompanyPageChange(currentPage) {
      this.companyCurrentPage = currentPage;
      this.getAllCompanyList();
    },
    //添加下级公司
    addlowerCompany() {
      let parentIds = [];
      if (this.selectCompanyData.length > 0) {
        this.selectCompanyData.forEach(function(s) {
          parentIds.push(s.groupId);
        });
        addLowerCompany(parentIds, this.groupId).then(res => {
          if (res.success) {
            this.$Message.success("新增成功");
            this.$emit("getInstanceCount");
            this.getlowerCompanyData();
          }
        });
      } else {
        this.$Message.warning("请选择至少一个公司！");
      }
    },
    //删除
    delCompany() {
      let groupIds = [];
      if (this.deleteCompanyData.length > 0) {
        this.deleteCompanyData.forEach(function(d) {
          groupIds.push(d.groupId);
        });
        this.$Modal.confirm({
          title: "确认",
          content: "确认批量删除下级公司？",
          onOk: () => {
            removeCompany(groupIds).then(res => {
              if (res.success) {
                this.$Message.success("删除成功!");
                this.$emit("getInstanceCount");
                this.getlowerCompanyData();
              }
            });
          }
        });
      } else {
        this.$Message.warning("请选择至少一个公司！");
      }
    },
    delLowerCompanyOne(index) {
      let groupIds = [];
      groupIds.push(this.lowerCompanyData[index].groupId);
      this.$Modal.confirm({
        title: "确认",
        content: "确认删除此下级公司？",
        onOk: () => {
          removeCompany(groupIds).then(res => {
            if (res.success) {
              this.$Message.success("删除成功!");
              this.$emit("getInstanceCount");
              this.getlowerCompanyData();
            }
          });
        }
      });
    },
    delCompanyChange(selection) {
      this.deleteCompanyData = selection;
    },
    search() {
      searchCompany(this.groupName).then(res => {
        this.companyData = res.tableContent;
        this.companyTotal = res.dataCount;
      });
    }
  },
  mounted() {
    this.getlowerCompanyData();
  }
};
</script>


