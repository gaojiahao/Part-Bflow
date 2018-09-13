<style lang="less" >
.header-action {
  label {
    color: #009688;
    font-size: 17px;
    cursor: pointer;
    font-weight: bold;
  }

  span {
    color: rgb(122, 118, 118);
  }
}
.app-search {
  margin-bottom: 5px;
  .app-search-icon {
    font-size: 1rem;
    color: #39f;
    display: inline-block;
    cursor: pointer;
  }
}

.rfd-table .ivu-table-row-highlight td {
  background-color: #81b2e59c !important;
}
</style>

<template>
  <div>
    <custom-table apiUrl="/ds/getParentGroupByGroupId" :columns="highOrgColumns" :apiParams="highOrganizationParams" v-model="reload" @on-refesh-change='onRefeshChange' :isHiddenPage="true">
      <div slot="header" class="header-action">
        <label @click="showHighOrgModal">上级组织</label>
        <span>-选择上级组织</span>
      </div>
    </custom-table>

    <member-modal v-model="isShowMemberModal" width="1000" footerBtnAlign="right" title="选择组织" @on-ok="saveSelectionHighOrg">
      <div style="margin-top:10px;">
        <div class="app-search">
          <Input @on-search="orgFilter" :search="true" v-model="searchValue" placeholder="搜索组织名称" style="width: 300px"></Input>
          <a @click="orgFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </a>
        </div>
        <Table class="rfd-table" height="400" :loading="listUserLoading" :columns="highOrgColumnsModal" :data="listUserData" size='small' highlight-row ref="currentRowTable" @on-row-dblclick="handleDblclick" @on-current-change="onSelectUserList"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="listUserPageTotal" :current="listUserCurrentPage" :page-size="pageSize" size="small" @on-change="listUserChangePage" @on-page-size-change="onPageSizeChange" show-total show-elevator show-sizer></Page>
          </div>
        </div>
      </div>
    </member-modal>
  </div>
</template>

<script>
import MemberModal from "@/components/modal/Modal";
import { updateBaseinfo, getAllHigherGroupByGroupType } from "@/services/addressBookService.js";
import CustomTable from "./CustomTable";
export default {
  name: "higher-organization",

  components: {
    CustomTable,
    MemberModal
  },

  props: {
    groupId: {
      type: String
    },
    groupType: {
      type: String
    }
  },

  data() {
    return {
      //上级组织
      highOrganizationParams: {
        groupId: this.groupId,
        page: 1,
        limit: 10
      },
      highOrgColumns: [
        {
          title: "组织名称",
          key: "groupName"
        },
        {
          title: "组织类型",
          key: "groupType",
          render: (h, params) => {
            let groupType = params.row.groupType;
            switch (groupType) {
              case "M":
                groupType = "管理层";
                break;
              case "A":
                groupType = "事业部";
                break;
              case "O":
                groupType = "部门";
                break;
              case "D":
                groupType = "直营店";
                break;
              case "J":
                groupType = "加盟店";
                break;
              case "G":
                groupType = "小组";
                break;
            }
            return h("span", groupType);
          }
        },
        {
          title: "组织职能",
          key: "depFunction",
          render: (h, params) => {
            let depFunction = params.row.depFunction;
            switch (depFunction) {
              case "M":
                depFunction = "管理";
                break;
              case "S":
                depFunction = "销售";
                break;
              case "C":
                depFunction = "制造";
                break;
              case "R":
                depFunction = "研发";
                break;
            }
            return h("span", depFunction);
          }
        },
        {
          title: "组织状态",
          key: "status",
          render: (h, params) => {
            let status = params.row.status,
              value = "";
            switch (status) {
              case -1:
                value = "停用";
                break;
              case 1:
                value = "使用中";
                break;
              case 2:
                value = "未使用";
                break;
              case 3:
                value = "草稿";
                break;
            }
            return h(
              "span",
              {
                style: {
                  color: status ? "#0279f6" : "#f03707",
                  cursor: "default"
                }
              },
              value
            );
          }
        }
      ],

      highOrgColumnsModal: [
        {
          title: "组织名称",
          key: "groupName"
        },
        {
          title: "组织类型",
          key: "groupType",
          render: (h, params) => {
            let groupType = params.row.groupType;
            switch (groupType) {
              case "M":
                groupType = "管理层";
                break;
              case "A":
                groupType = "事业部";
                break;
              case "O":
                groupType = "部门";
                break;
              case "D":
                groupType = "直营店";
                break;
              case "J":
                groupType = "加盟店";
                break;
              case "G":
                groupType = "小组";
                break;
            }
            return h("span", groupType);
          }
        },
        {
          title: "组织职能",
          key: "depFunction",
          render: (h, params) => {
            let depFunction = params.row.depFunction;
            switch (depFunction) {
              case "M":
                depFunction = "管理";
                break;
              case "S":
                depFunction = "销售";
                break;
              case "C":
                depFunction = "制造";
                break;
              case "R":
                depFunction = "研发";
                break;
            }
            return h("span", depFunction);
          }
        },
        {
          title: "组织状态",
          key: "status",
          render: (h, params) => {
            let status = params.row.status,
              value = "";
            switch (status) {
              case -1:
                value = "停用";
                break;
              case 1:
                value = "使用中";
                break;
              case 2:
                value = "未使用";
                break;
              case 3:
                value = "草稿";
                break;
            }
            return h(
              "span",
              {
                style: {
                  color: status ? "#0279f6" : "#f03707",
                  cursor: "default"
                }
              },
              value
            );
          }
        }
      ],

      isShowMemberModal: false,
      listUserLoading: false,
      listUserData: [],
      listUserPageTotal: 0,
      listUserCurrentPage: 1,
      pageSize: 10,
      searchValue: "",

      reload: false,
      onSelectionModal: []
    };
  },

  methods: {
    listUserChangePage(currentPage) {
      let filter = [
        { operator: "like", value: this.searchValue, property: "groupName" }
      ];
      this.getAllHigherGroupByGroupType(currentPage, this.pageSize, filter);
    },

    //点击切换每页显示条数
    onPageSizeChange(size) {
      this.pageSize = size;
      let filter = [
        { operator: "like", value: this.searchValue, property: "groupName" }
      ];
      this.getAllHigherGroupByGroupType(1, size, filter);
    },

    //监听模态框选中的用户
    onSelectUserList(currentRow, oldCurrentRow) {
      this.onSelectionModal = currentRow;
    },

    //双击选中
    handleDblclick(row, index) {
      let params = {
        groupId: this.groupId,
        parentId: row.groupId
      };
      updateBaseinfo(params).then(res => {
        if (res.success) {
          this.$Message.success("更新成功");
          this.isShowMemberModal = false;
          this.reload = true;
          this.$emit("on-high-organization-change", true);
        } else {
          this.$Message.error(res.message);
        }
      });
    },

    //显示模态框-添加上级组织
    showMemberModal() {
      this.isShowMemberModal = true;
      this.getListUsers(this.listUserCurrentPage, this.pageSize);
    },

    onRefeshChange(val) {
      if (!val) {
        this.reload = val;
      }
    },

    //显示上级组织模态框
    showHighOrgModal() {
      this.isShowMemberModal = true;
      this.searchValue = "";
      this.getAllHigherGroupByGroupType(this.listUserCurrentPage, this.pageSize);
    },

    //添加上级组织
    saveSelectionHighOrg() {
      let parentId = "";
      parentId = this.onSelectionModal.groupId;
      let params = {};
      params.parentId = parentId;
      params.groupId = this.groupId;
      updateBaseinfo(params).then(res => {
        if (res.success) {
          this.$Message.success("更新成功");
          this.isShowMemberModal = false;
          this.reload = true;
          this.$emit("on-high-organization-change", true);
        } else {
          this.$Message.error(res.message);
        }
      });
    },

    getAllHigherGroupByGroupType(currentPage, pageSize, relfilter) {
      this.listUserLoading = true;
      let filter = relfilter ? relfilter : [];
      
      getAllHigherGroupByGroupType(currentPage, pageSize,this.groupType, filter).then(res => {
        if (res.tableContent[0]) {
          this.listUserPageTotal = res.summary.total;
          this.listUserData = res.tableContent;
          this.listUserLoading = false;
        }
      });
    },
    //过滤
    orgFilter() {
      let filter = [
        { operator: "like", value: this.searchValue, property: "groupName" }
      ];
      this.getAllHigherGroupByGroupType(this.listUserCurrentPage, this.pageSize, filter);
    }
  }
};
</script>
