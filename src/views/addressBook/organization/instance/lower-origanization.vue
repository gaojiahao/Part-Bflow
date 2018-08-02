<template>
    <div>
        <custom-table apiUrl="/ds/getUserGroupByParentId" :columns="highOrgColumns" :apiParams="lowOrganizationParams">
            <div slot="header">
                <Button icon="md-add" type="primary">添加下级组织</Button>
                <Button icon="md-remove" type="primary">移除下级组织</Button>
            </div>
        </custom-table>

        <!-- <member-modal v-model="isShowModal" width="1000" footerBtnAlign="right" title="选择用户" @on-ok="addUser">
            <div>
                <Table :loading="listUserLoading" :columns="highOrgColumns" :data="listUserData" size='small' ref="selection"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="listUserPageTotal" :current="listUserCurrentPage" :page-size="pageSize" size="small" @on-change="listUserChangePage" show-total show-elevator></Page>
                    </div>
                </div>
            </div>
        </member-modal> -->
    </div>
</template>

<script>
import MemberModal from "@/components/modal/Modal";
import CustomTable from "./CustomTable";
export default {
  name: "lower-organization",

  props: {
    groupId: {
      type: String
    }
  },

  data() {
    return {
      //下级组织
      lowOrganizationParams: {
        parentId: this.groupId,
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

      isShowModal: false,

      listUserLoading: false
    };
  },

  components: {
    CustomTable
  }
};
</script>

<style>
</style>
