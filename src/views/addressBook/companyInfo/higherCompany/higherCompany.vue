<style lang="less">
.higher-company {
  margin-top: 5px;
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
    display: inline-block;
  }
}

.rfd-principal-table .ivu-table-row-highlight td {
  background-color: #81b2e59c !important;
}
</style>
<template>
  <div class="higher-company">
    <div class="higher-company-detail" id="cliHeight">
      <div v-if="isPermission" style="display:inline;">
        <b @click="showCompanyModal" class="higher-company-detail-btn">添加公司</b>
        <span style="color: #7a7676;">-选择上级公司</span>
      </div>
      <br>
      <Table ref="selection" :columns="columns1" :loading="higherLoading" :data="higherCompanyData"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div class="fr" style="padding-bottom: 5px;">
          <Page @on-page-size-change="onPageSizeChange" :total="higherCompanyTotal" show-elevator show-sizer :current="higherCompanyCurrentPage" :page-size="higherCompanyPageSize" @on-change="onPageChange" size="small" show-total></Page>
        </div>
      </div>
    </div>
    <Modal v-model="showModal" title="选择上级公司" :styles="{top: '15px'}" @on-ok="addHigherCompany" width="1200">
      <div class="search">
        <Input placeholder="请输入公司名称" @on-search="search" :search="true" v-model="groupName" style="width:300px;" />
        <Button type="primary" @click="search" class="search-btn" size="small">查询</Button>
      </div>
      <Table class="rfd-principal-table" ref="selection" :highlight-row="true" @on-row-click="onSelectionChange" @on-row-dblclick="onRowdbclick" height="400" :loading="companyLoading" :columns="columns" :data="companyData"></Table>
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
  addHigherCompany,
  removeCompany
} from "@/services/addressBookService.js";
export default {
  props: {
    isPermission: {
      type: Boolean
    }
  },
  data() {
    return {
      groupId: this.$route.params.groupId,
      higherLoading: false,
      higherCompanyData: [],
      higherCompanyTotal: 0,
      higherCompanyCurrentPage: 1,
      higherCompanyPageSize: 10,
      companyLoading: false,
      companyTotal: 0,
      companyCurrentPage: 1,
      companyPageSize: 10,
      companyData: [],
      columns: [
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
          key: "companyType"
        },
        {
          title: "创建者",
          key: "creator"
        }
      ],
      columns1: [
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
          key: "companyType"
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
                    size: "small",
                    disabled: !this.isPermission
                  },
                  on: {
                    click: () => {
                      this.delCompany(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      selectCompanyData: {},
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
        this.companyPageSize,
        this.groupName
      ).then(res => {
        this.companyData = res.tableContent;
        this.companyTotal = res.dataCount;
        this.companyLoading = false;
      });
    },
    //获取上级公司信息
    getHigherCompanyData() {
      let target = 1;
      this.higherLoading = true;
      getCompanyList(
        this.groupId,
        target,
        this.higherCompanyCurrentPage,
        this.higherCompanyPageSize
      ).then(res => {
        this.higherCompanyData = res;
        this.higherCompanyTotal = res.length;
        this.higherLoading = false;
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
      this.getHigherCompanyData();
    },
    //上级公司页码改变
    onPageChange(currentPage) {
      this.highCompanyCurrentPage = currentPage;
      this.getHigherCompanyData();
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
    //添加上级用户
    addHigherCompany() {
      let parentId;
      if (Object.keys(this.selectCompanyData).length > 0) {
        parentId = this.selectCompanyData.groupId;
        addHigherCompany(this.groupId, parentId).then(res => {
          if (res.success) {
            this.$Message.success("更新成功!");
            this.$emit("getInstanceCount");
            this.getHigherCompanyData();
          }
        }).catch(error => {
            this.$Message.error(error.data.message);
        });
      } else {
        this.$Message.warning("请选择至少一个公司！");
      }
    },
    //删除
    delCompany(index) {
      this.$Modal.confirm({
        title: "确认",
        content: "确认删除上级公司？",
        onOk: () => {
          removeCompany([this.groupId]).then(res => {
            if (res.success) {
              this.$Message.success("删除成功!");
              this.$emit("getInstanceCount");
              this.getHigherCompanyData();
            }
          }).catch(error => {
              this.$Message.error(error.data.message);
          });
        }
      });
    },
    search() {
      this.companyCurrentPage = 1;
      this.getAllCompanyList();
    },
    onRowdbclick(selection, index) {
      let parentId;
      if (Object.keys(selection).length > 0) {
        parentId = selection.groupId;
        addHigherCompany(this.groupId, parentId).then(res => {
          if (res.success) {
            this.showModal = false;
            this.$Message.success("更新成功!");
            this.$emit("getInstanceCount");
            this.getHigherCompanyData();
          }
        }).catch(error => {
            this.$Message.error(error.data.message);
        });
      } else {
        this.$Message.warning("请选择至少一个公司！");
      }
    }
  },
  mounted() {
    this.getHigherCompanyData();
  }
};
</script>


