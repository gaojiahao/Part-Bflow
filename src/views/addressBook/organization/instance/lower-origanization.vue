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
    <custom-table apiUrl="/ds/getAllGroup" :columns="lowerOrgColumns" :apiParams="lowOrganizationParams" v-model="reload" @on-refesh-change='onRefeshChange' @on-selection-change="onSelectionChange">

      <div slot="header" class="header-action">
        <label @click="showLoverOrgModal">添加下级组织</label>
        <span>-添加下级组织</span>

        <label @click="deleteLoverOrg">删除下级组织</label>
        <span>-删除下级组织</span>
      </div>
    </custom-table>

    <member-modal v-model="isShowMemberModal" width="1000" footerBtnAlign="right" title="选择组织" @on-ok="saveSelectionLowerOrg">
      <div style="margin-top:10px;">
        <div class="app-search">
          <Input @on-search="orgFilter" :search="true" v-model="searchValue" placeholder="搜索组织名称" style="width: 300px"></Input>
          <a @click="orgFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </a>
        </div>
        <Table height="400" :loading="listUserLoading" :columns="lowerOrgColumnsModel" :data="listUserData" size='small' ref="selection" @on-selection-change="onSelectLowerUser"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="listUserPageTotal" :current="listUserCurrentPage" :page-size="pageSize" size="small" @on-page-size-change="onPageSizeChange" @on-change="listUserChangePage" show-total show-elevator show-sizer></Page>
          </div>
        </div>
      </div>
    </member-modal>
  </div>
</template>

<script>
import MemberModal from "@/components/modal/Modal";
import CustomTable from "./CustomTable";
import {
  saveBatchChildGroup,
  deleteBatchGroup,
  getAllGroup
} from "@/services/addressBookService.js";
export default {
  name: "lower-organization",

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
      //下级组织
      lowOrganizationParams: {
        filter: JSON.stringify([
          { operator: "eq", value: this.groupId, property: "parentId" }
        ]),
        page: 1,
        limit: 8
      },
      lowerOrgColumns: [
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
        },
        {
          title: "操作",
          key: "action",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                style: {
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "确认",
                      content: "确认删除此组织？",
                      onOk: () => {
                        let del = { groupId: params.row.groupId, parentId: "" };
                        deleteBatchGroup(del).then(res => {
                          if (res.success) {
                            this.$Message.success(res.message);
                            this.reload = true;
                            this.$emit("on-lower-organization-change", true);
                          }
                        });
                      }
                    });
                  }
                }
              },
              "删除"
            );
          }
        }
      ],

      lowerOrgColumnsModel: [
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
      deleteBtnDisable: true,
      reload: false,
      onSelectionModal: [],
      selectDeleteLowerOrg: [],
      searchValue: ""
    };
  },

  methods: {
    listUserChangePage(currentPage) {
      let filter = [
        { operator: "like", value: this.searchValue, property: "groupName" }
      ];
      this.getAllGroup(currentPage, filter);
    },

    //点击切换每页显示条数
    onPageSizeChange(size) {
      this.pageSize = size;
      let filter = [
        { operator: "like", value: this.searchValue, property: "groupName" }
      ];
      this.getAllGroup(1, size, filter);
    },

    //监听模态框选中的用户
    onSelectLowerUser(currentRow) {
      this.onSelectionModal = currentRow;
    },

    //选中的下级组织信息
    onSelectionChange(selection) {
      if (selection.length > 0) {
        this.deleteBtnDisable = false;
        this.selectDeleteLowerOrg = selection;
      } else {
        this.deleteBtnDisable = true;
      }
    },

    onRefeshChange(val) {
      if (!val) {
        this.reload = val;
      }
    },

    //显示上级组织模态框
    showLoverOrgModal() {
      this.isShowMemberModal = true;
       this.searchValue = '';
      this.getAllGroup(this.listUserCurrentPage);
    },

    //添加组织
    saveSelectionLowerOrg() {
      let childrenId = [];
      this.onSelectionModal.forEach(val => {
        childrenId.push(val.groupId);
      });
      saveBatchChildGroup(this.groupId, childrenId.join(",")).then(res => {
        if (res.success) {
          this.$Message.success("保存成功");
          this.isShowMemberModal = false;
          this.reload = true;
          this.$emit("on-lower-organization-change", true);
        }
      });
    },
    //删除下级组织
    deleteLoverOrg() {
      let delData = [];
      this.selectDeleteLowerOrg.forEach(val => {
        delData.push({ groupId: val.groupId, parentId: "" });
      });
      if (delData) {
        deleteBatchGroup(delData).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.reload = true;
            this.$emit("on-lower-organization-change", true);
          }
        });
      }
    },

    getAllGroup(currentPage, relfilter) {
      this.listUserLoading = true;
      let filter = relfilter ? relfilter : [];
      if (this.groupType) {
        switch (this.groupType) {
          case "小组":
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
            filter.push({
              operator: "ne",
              value: "管理层",
              property: "groupType"
            }); //小组
            break;
          case "部门":
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
            filter.push({
              operator: "ne",
              value: "管理层",
              property: "groupType"
            }); //小组
            break;
          case "事业部":
            filter.push({
              operator: "ne",
              value: "事业部",
              property: "groupType"
            }); //事业部
            filter.push({
              operator: "ne",
              value: "管理层",
              property: "groupType"
            }); //小组
            break;
        }
        filter = JSON.stringify(filter);
      }
      getAllGroup(currentPage, this.pageSize, filter).then(res => {
        if (res.tableContent[0]) {
          this.listUserPageTotal = res.summary.total;
          this.listUserData = res.tableContent;
        }
        this.listUserLoading = false;
      });
    },
    //过滤
    orgFilter() {
      let filter = [
        { operator: "like", value: this.searchValue, property: "groupName" }
      ];
      this.getAllGroup(this.listUserCurrentPage, filter);
    }
  }
};
</script>

