<style lang="less">
.higher-company {
  &-detail {
    background-color: #fff;
    margin: 15px 93px;
    padding: 26px 50px;
    box-shadow: 0px 1px 10px #ddd;
    &-btn {
      margin-bottom: 5px;
      color: rgb(0, 150, 136);
      font-size: 17px;
      cursor: pointer;
    }
  }
  .serach {
    margin-bottom: 5px;
    &-btn {
      width: 150px;
      border: 1px solid #ddd;
      border-bottom: none;
    }
  }
}
</style>
<template>
  <div class="higher-company">
    <div class="higher-company-detail" id="cliHeight">
      <b @click="showCompanyModal" class="higher-company-detail-btn">添加公司</b>
      <span style="color: #7a7676;">-选择上级公司</span>
      <!-- <b @click="delCompany" class="lower-company-detail-btn">删除</b>
      <span style="color: #7a7676;">-批量删除公司成员</span> -->
      <br>
      <Table ref="selection" :columns="columns1" :loading="higherLoading" :data="higherCompanyData"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div class="fr">
          <Page @on-page-size-change="onPageSizeChange" :total="higherCompanyTotal" show-elevator show-sizer :current="higherCompanyCurrentPage" :page-size="higherCompanyPageSize" @on-change="onPageChange" size="small" show-total></Page>
        </div>
      </div>
    </div>
    <Modal v-model="showModal" title="选择用户" @on-ok="addHigherCompany" width="1000">
      <div class="serach">
        <Input placeholder="请输入公司名称" class="serach-btn" v-model="groupName" />
        <Button type="primary" shape="circle" icon="ios-search" @click="search">搜索</Button>
      </div>
      <Table ref="selection" :highlight-row="true" @on-row-click="onSelectionChange" height="400" :loading="companyLoading" :columns="columns" :data="companyData"></Table>
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
  removeCompany,
  searchCompany
} from "@/services/addressBookService.js";
export default {
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
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            let userStatus = "";
            if (params.row.status === 1) {
              userStatus = "使用中";
            } else if (params.row.status === 0) {
              userStatus = "停用";
            } else {
              userStatus = "未使用";
            }
            return h(
              "span",
              {
                style: {
                  color: "#39f"
                }
              },
              userStatus
            );
          }
        }
      ],
      columns1: [
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
          title: "状态",
          key: "status",
          render: (h, params) => {
            let userStatus = "";
            if (params.row.status === 1) {
              userStatus = "使用中";
            } else if (params.row.status === 0) {
              userStatus = "停用";
            } else {
              userStatus = "未使用";
            }
            return h(
              "span",
              {
                style: {
                  color: "#39f"
                }
              },
              userStatus
            );
          }
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
      showModal: false
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
    },
    //添加上级用户
    addHigherCompany() {
      let parentId;
      if (Object.keys(this.selectCompanyData).length > 0) {
        parentId = this.selectCompanyData.groupId;
        addHigherCompany(this.groupId, parentId).then(res => {
          if (res.success) {
            this.$Message.success("新增成功!");
            this.getHigherCompanyData();
          }
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
              this.getHigherCompanyData();
            }
          });
        }
      });
    },
    search() {
      searchCompany(this.groupName).then(res => {
        this.companyData = res.tableContent;
        this.companyTotal = res.dataCount;
      });
    }
  },
  mounted() {
    this.getHigherCompanyData();
  }
};
</script>


