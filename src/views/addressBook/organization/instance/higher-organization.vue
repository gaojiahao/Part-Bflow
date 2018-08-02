<template>
    <div>
        <custom-table apiUrl="/ds/getParentGroupByGroupId" :columns="highOrgColumns" :apiParams="highOrganizationParams" @on-selection-change="onSelectionChange" @on-refesh-change='onRefeshChange'>
            <div slot="header">
                <Button icon="md-add" type="primary" @click="showHighOrgModal">添加上级组织</Button>
                <Button icon="md-remove" type="primary" @click="deleteHighOrg" :disabled="deleteBtnDisable">移除上级组织</Button>
            </div>
        </custom-table>

        <member-modal v-model="isShowMemberModal" width="1000" footerBtnAlign="right" title="选择用户" @on-ok="saveSelectionOrg">
            <div>
                <Table :loading="listUserLoading" :columns="highOrgColumns" :data="listUserData" size='small' ref="selection"></Table>
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
import {
  getAllGroup,
  addOrgMember,
  deleteOrgMember
} from "@/services/addressBookService.js";
import CustomTable from "./CustomTable";
export default {
  name: "higher-organization",

  components: {
    CustomTable,
    MemberModal
  },

  data() {
    return {
      //上级组织
      highOrganizationParams: {
        groupId: 990345,
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
          key: "OrgUnitType"
        },
        {
          title: "部门职能类型",
          key: "depFunction"
        },
        {
          title: "组织状态",
          key: "OrgUnitStatus",
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

      deleteBtnDisable: false,
      reload: false
    };
  },

  methods: {
    listUserChangePage(currentPage) {
      this.getAllGroup(currentPage, this.pageSize);
    },

    //显示模态框-添加上级组织
    showMemberModal() {
      this.isShowMemberModal = true;
      this.getListUsers(this.listUserCurrentPage, this.pageSize);
    },

    //选中的成员信息
    onSelectionChange(selection) {
      if (selection.length > 0) {
        this.deleteBtnDisable = false;
        this.selectDeleteMemberInfo = selection;
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
    showHighOrgModal() {
      this.isShowMemberModal = true;
      this.getAllGroup();
    },

    //
    deleteHighOrg() {},

    saveSelectionOrg() {},

    getAllGroup() {
      this.listUserLoading = true;
      getAllGroup(this.listUserCurrentPage, this.pageSize).then(res => {
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
