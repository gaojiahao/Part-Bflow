<style lang="less">
.lower-company {
  &-detail {
    background-color: #fff;
    margin: 15px 93px;
    padding: 26px 50px;
    box-shadow: 0px 1px 10px #ddd;
  }
}
</style>
<template>
    <div class="lower-company">
        <div class="lower-company-detail" id="cliHeight">
            <Button type="info" @click="showCompanyModal" style="margin-bottom:5px">选择下级用户</Button>
            <Table ref="selection" :columns="columns" :loading="lowerLoading" :data="lowerCompanyData"></Table>
            <div>
                <div style="float: right; ">
                    <Page @on-page-size-change="onPageSizeChange" :total="lowerCompanyTotal" show-elevator show-sizer :current="lowerCompanyCurrentPage" :page-size="lowerCompanyPageSize" @on-change="onPageChange" size="small" show-total></Page>
                </div>
            </div>
        </div>
        <Modal v-model="showModal" title="选择用户" @on-ok="addlowerCompany" width="1000">
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
  addLowerCompany
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
          title: "公司简称",
          key: "groupShortName"
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
          key: "principalInfo.nikeName"
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
        this.companyData = res;
        this.companyTotal = res.length;
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
        this.lowerCompanyData = res;
        this.lowerCompanyTotal = res.length;
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
    },
    //确认选择
    //添加上级用户
    addlowerCompany() {
      let parentId;
      if (Object.keys(this.selectCompanyData).length > 0) {
        parentId = this.selectCompanyData.groupId;
      } else {
        this.$Message.warning("请选择至少一个公司！");
      }

      if (parentId && this.groupId) {
        addLowerCompany(Number(parentId), Number(this.groupId)).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.getlowerCompanyData();
          }
        });
      } else {
        this.$Message.warning("无公司ID，请先保存公司再进行编辑！");
      }
    }
  },
  mounted() {
    this.getlowerCompanyData();
  }
};
</script>


