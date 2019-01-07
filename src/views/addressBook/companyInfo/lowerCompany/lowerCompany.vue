<style lang="less">
.lower-company {
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
  <div class="lower-company">
    <div class="lower-company-detail" id="cliHeight">
      <div v-if="isPermission" style="display:inline;">
        <b @click="showCompanyModal" class="lower-company-detail-btn">添加公司</b>
        <span style="color: #7a7676;">-选择下级公司</span>
        <b @click="delCompany" class="lower-company-detail-btn">删除</b>
        <span style="color: #7a7676;">-批量删除下级公司</span>
      </div>
      <br>
      <Table ref="selection" :columns="columns" :loading="lowerLoading" :data="lowerCompanyData" @on-selection-change="delCompanyChange"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div class="fr" style="padding-bottom: 5px;">
          <Page @on-page-size-change="onPageSizeChange" :total="lowerCompanyTotal" show-elevator show-sizer :current="lowerCompanyCurrentPage" :page-size="lowerCompanyPageSize" @on-change="onPageChange" size="small" show-total></Page>
        </div>
      </div>
    </div>
    <Modal v-model="showModal" title="选择下级公司" @on-ok="addlowerCompany" :styles="{top: '15px'}" width="1200">
      <div class="search">
        <Input placeholder="请输入公司名称" @on-search="search" :search="true" v-model="groupName" style="width:300px;" />
        <Button type="primary" @click="search" class="search-btn" size="small">查询</Button>
      </div>
      <Table ref="selection" :highlight-row="true" @on-selection-change="onSelectionChange" @on-select-all="onSelectAll" @on-select-cancel="onSelectCancel" height="400" :loading="companyLoading" :columns="columns1" :data="companyData"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div class="fr" style="padding-bottom: 5px;">
          <Page @on-page-size-change="onAllCompanyPageSizeChange" :total="companyTotal" show-elevator show-sizer :current="companyCurrentPage" :page-size="companyPageSize" @on-change="onCompanyPageChange" size="small" show-total></Page>
        </div>
      </div>
      <div class="page-selection-warp" v-show="onPageSelection[0] ">
        <Tag v-for="item in onPageSelection" :key="item.groupId" @on-close="deleteSelectUser(item,index)" :groupId="item.groupId" closable type="border" color="primary" size="small">
          {{item.groupName}}
        </Tag>
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
  props: {
    isPermission: {
      type: Boolean
    }
  },
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
      selectCompanyData: {},
      deleteCompanyData: [],
      showModal: false,
      groupName: "",
      onPageSelection: []
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
    //获取下级公司信息
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
    //选择下级公司
    onSelectionChange(selection) {
      //取消全选
      if (selection.length === 0) {
        let s = this.$refs.selection.data;
        let p = this.onPageSelection;
        s.map(item => {
          p = p.filter(f => {
            return f.groupId !== item.groupId;
          });
        });
        this.onPageSelection = p;
      } else {
        let obj = {};
        this.onPageSelection.push(...selection);
        //数组去重
        this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
          obj[next.groupId] ? "" : (obj[next.groupId] = true && cur.push(next));
          return cur;
        }, []);
      }
      this.selectCompanyData = this.onPageSelection;
    },
    //全选
    onSelectAll(selection) {
      let obj = {};
      //触发全选事件
      this.onPageSelection.push(...selection);
      //数组去重
      this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
        obj[next.groupId] ? "" : (obj[next.groupId] = true && cur.push(next));
        return cur;
      }, []);
    },
    //取消单选
    onSelectCancel(selection, row) {
      this.onPageSelection = this.onPageSelection.filter(f => {
        return f.groupId !== row.groupId;
      });
    },
    //删除选择的用户
    deleteSelectUser(item, index) {
      this.onPageSelection.splice(index, 1);
      this.$refs.selection.data.forEach((data, i) => {
        if (item.groupId === data.groupId) {
          this.$refs.selection.toggleSelect(i);
        }
      });
    },
    //显示所有公司列表
    showCompanyModal() {
      this.showModal = true;
      this.getAllCompanyList();
      this.onPageSelection = [];
    },
    //下级公司页数改变
    onPageSizeChange(size) {
      this.highCompanyPageSize = size;
      this.getlowerCompanyData();
    },
    //下级公司页码改变
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
            this.$Message.success("更新成功");
            this.$emit("getInstanceCount");
            this.getlowerCompanyData();
          }
        }).catch(error => {
            this.$Message.error(error.data.message);
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
            }).catch(error => {
                this.$Message.error(error.data.message);
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
          }).catch(error => {
              this.$Message.error(error.data.message);
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


