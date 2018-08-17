<style lang="less" scoped>
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
</style>

<template>
  <div>
    <custom-table apiUrl="/ds/getParentGroupByGroupId" :columns="highOrgColumns" :apiParams="highOrganizationParams" v-model="reload" @on-refesh-change='onRefeshChange'>
      <div slot="header" class="header-action">
        <label @click="showHighOrgModal">上级组织</label>
        <span>-选择上级用户</span>
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
        <Table :loading="listUserLoading" :columns="highOrgColumnsModal" :data="listUserData" size='small' highlight-row ref="currentRowTable" @on-current-change="onSelectUserList"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="listUserPageTotal" :current="listUserCurrentPage" :page-size="pageSize" size="small" @on-change="listUserChangePage" show-total show-elevator></Page>
          </div>
        </div>
      </div>
    </member-modal>
  </div>
</template>

<script>
import MemberModal from "@/components/modal/Modal";
import { updateBaseinfo, getAllGroup } from "@/services/addressBookService.js";
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
        limit: 8
      },
      highOrgColumns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
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
              case "G":
                groupType = "小组";
                break;
            }
            return h("span", groupType);
          }
        },
        {
          title: "部门职能类型",
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
        },
        {
          title: "组织说明",
          key: "comment"
        }
      ],

      highOrgColumnsModal: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
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
              case "G":
                groupType = "小组";
                break;
            }
            return h("span", groupType);
          }
        },
        {
          title: "部门职能类型",
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
        },
        {
          title: "组织说明",
          key: "comment"
        }
      ],

      isShowMemberModal: false,
      listUserLoading: false,
      listUserData: [],
      listUserPageTotal: 0,
      listUserCurrentPage: 1,
      pageSize: 8,
      searchValue: '',

      reload: false,
      onSelectionModal: []
    };
  },

  methods: {
    listUserChangePage(currentPage) {
      let filter = [
        { operator: "like", value: this.searchValue, property: "groupName" }
      ];
      this.getAllGroup(currentPage,filter);
    },

    //监听模态框选中的用户
    onSelectUserList(currentRow, oldCurrentRow) {
      this.onSelectionModal = currentRow;
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
      this.getAllGroup(this.listUserCurrentPage);
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
          this.$Message.success("保存成功");
          this.isShowMemberModal = false;
          this.reload = true;
          this.$emit("on-high-organization-change", true);
        }
      });
    },

    getAllGroup(currentPage,relfilter) {
      this.listUserLoading = true;
      let filter = relfilter ? relfilter : [];
      if (this.groupType) {
        switch (this.groupType) {
          case "小组":
            filter.push({
              operator: "ne",
              value: "岗位",
              property: "groupType"
            }); //岗位
            filter.push({
              operator: "ne",
              value: "小组",
              property: "groupType"
            }); //小组
            break;
          case "部门":
            filter.push({
              operator: "ne",
              value: "岗位",
              property: "groupType"
            }); //岗位
            filter.push({
              operator: "ne",
              value: "小组",
              property: "groupType"
            }); //小组
            filter.push({
              operator: "ne",
              value: "部门",
              property: "groupType"
            }); //部门
            break;
          case "事业部":
            filter.push({
              operator: "ne",
              value: "岗位",
              property: "groupType"
            }); //岗位
            filter.push({
              operator: "ne",
              value: "小组",
              property: "groupType"
            }); //小组
            filter.push({
              operator: "ne",
              value: "部门",
              property: "groupType"
            }); //部门
            filter.push({
              operator: "ne",
              value: "事业部",
              property: "groupType"
            }); //事业部
            break;
        }
        filter = JSON.stringify(filter);
      }
      getAllGroup(currentPage, this.pageSize, filter).then(res => {
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
      this.getAllGroup(this.listUserCurrentPage,filter);
    }
  }
};
</script>
