<template>
    <div>
        <custom-table apiUrl="/ds/getPrincipalByGroupId" :columns="principallumns" :apiParams="principalParams">
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
  name: "principal",

  components: {
    CustomTable
  },

  props:{
      groupId:{
          type:String
      }
  },

  data() {
    return {
      principalParams: {
        groupId: this.groupId,
        page: 1,
        limit: 8
      },
      principallumns: [
        {
          title: "名称",
          key: "nickname"
        },
        {
          title: "性别",
          key: "gender",
           render: (h, params) => {
            let gender = params.row.gender;
            return h(
              "span",
              gender === 1 ? "男" : gender === 0 ? "女" : "未知"
            );
          }
        },
        {
          title: "联系电话",
          key: "phone"
        }
      ]
    };
  }
};
</script>

<style>
</style>
