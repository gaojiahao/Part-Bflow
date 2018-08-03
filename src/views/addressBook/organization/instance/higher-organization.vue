<template>
    <div>
        <custom-table apiUrl="/ds/getParentGroupByGroupId" :columns="highOrgColumns" :apiParams="highOrganizationParams" v-model="reload" @on-refesh-change='onRefeshChange'>
            <div slot="header">
                <Button icon="md-add" type="primary" @click="showHighOrgModal">添加上级组织</Button>
            </div>
        </custom-table>

        <member-modal v-model="isShowMemberModal" width="1000" footerBtnAlign="right" title="选择用户" @on-ok="saveSelectionHighOrg">
            <div>
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
import { saveHighOrg, getAllGroup } from "@/services/addressBookService.js";
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
          key: "groupType"
        },
        {
          title: "部门职能类型",
          key: "depFunction"
        },
        {
          title: "组织状态",
          key: "status",
          render: (h, params) => {
            let status = params.row.status,
              value = "";
            switch (status) {
              case 0:
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
          key: "groupType"
        },
        {
          title: "部门职能类型",
          key: "depFunction"
        },
        {
          title: "组织状态",
          key: "status",
          render: (h, params) => {
            let status = params.row.status,
              value = "";
            switch (status) {
              case 0:
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

      reload: false,
      onSelectionModal: []
    };
  },

  methods: {
    listUserChangePage(currentPage) {
      this.getAllGroup(currentPage, this.pageSize);
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
      this.getAllGroup();
    },

    //添加上级组织
    saveSelectionHighOrg() {
      let parentId = "";
      parentId = this.onSelectionModal.groupId;
      saveHighOrg(parentId, this.groupId).then(res => {
        if (res.success) {
          this.$Message.success("保存成功");
          this.isShowMemberModal = false;
          this.reload = true;
        }
      });
    },

    getAllGroup() {
      this.listUserLoading = true;
      let filter = [];
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
      getAllGroup(this.listUserCurrentPage, this.pageSize, filter).then(res => {
        if (res.tableContent[0]) {
          this.listUserPageTotal = res.summary.total;
          this.listUserData = res.tableContent;
          this.listUserLoading = false;
        }
      });
    }
  }
};
</script>

<style>
</style>
