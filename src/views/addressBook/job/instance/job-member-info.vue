<style lang="less" scoped>
.permission-container-btn-export {
  float: right;
}

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
</style>


<template>
  <div>
    <custom-table apiUrl="/ds/getRoleUser2Oneself" :columns="memberInfoColumns" :apiParams="memberInfoParams" v-model="reload" @on-selection-change="onSelectionChange" @on-refesh-change='onRefeshChange'>
      <!-- <div slot="header">
        <Button icon="md-add" type="primary" @click="showMemberModal">添加成员</Button>
        <Button icon="md-remove" type="primary" @click="deleteMemberInfo" :disabled="deleteBtnDisable">移除成员</Button>
        <Button icon="ios-download-outline" type="primary" class="permission-container-btn-export" @click="exportData">导出</Button>
      </div> -->

       <div slot="header" class="header-action">
        <label @click="showMemberModal">添加成员</label>
        <span>-添加成员</span>

        <label @click="deleteMemberInfo">移除成员</label>
        <span>-移除成员</span>

        <label @click="exportData" class="permission-container-btn-export">导出</label>
      </div>
    </custom-table>

   <member-modal v-model="isShowMemberModal" width="1000" footerBtnAlign="right" title="选择用户" @on-ok="saveSelectionUser">
      <div>
        <Table :loading="listUserLoading" :columns="memberInfoColumns" :data="listUserData" size='small' ref="selection" @on-selection-change="onSelectUserList"></Table>
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
import {  listUsers,deleteBatchRole, saveBatchChildRole } from "@/services/addressBookService.js";
import CustomTable from "@/views/addressBook/organization/instance/CustomTable";
export default {
  name: "job-member-info",

  components: {
    MemberModal,
    CustomTable
  },

   props: {
    jobId: {
      type: String
    }
  },

  data() {
    return {
      memberInfoLoading: false,
      memberInfoParams: {
        roleId: this.jobId,
        page: 1,
        limit: 8
      },
      memberInfoColumns: [
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
          title: "工号",
          width: 100,
          key: "userCode"
        },
        {
          title: "姓名",
          width: 100,
          key: "nickname"
        },
        {
          title: "性别",
          key: "gender",
          width: 60,
          render: (h, params) => {
            let gender = params.row.gender;
            return h(
              "span",
              gender === 1 ? "男" : gender === 0 ? "女" : "未知"
            );
          }
        },
        {
          title: "手机号",
          key: "mobile"
        },
        {
          title: "状态",
          width: 60,
          key: "status",
          render: (h, params) => {
            let status = params.row.status;
            return h(
              "span",
              {
                style: {
                  color: status ? "#0279f6" : "#f03707",
                  cursor: "default"
                }
              },
              status ? "在职" : "离职"
            );
          }
        },
        {
          title: "创建者",
          key: "creator",
          width: 100
        },
        {
          title: "创建时间",
          key: "crtTime"
        },
        {
          title: "修改时间",
          key: "changeTime"
        }
      ],

      //模态框参数
      isShowMemberModal: false,
      listUserLoading: false,
      listUserData: [],
      listUserPageTotal: 0,
      listUserCurrentPage: 1,
      pageSize: 8,

      //模态框参数
      onSelectionModal: [],
      selectDeleteMemberInfo: [],
      reload: false
    };
  },

  methods: {
    //选中的成员信息
    onSelectionChange(selection) {
      if (selection.length > 0) {
        this.selectDeleteMemberInfo = selection;
      }
    },

    onRefeshChange(val){
      if(!val){
        this.reload = val;
      }
    },

    //监听模态框选中的用户
    onSelectUserList(selection) {
      this.onSelectionModal = selection;
    },

    //保存选中的用户
    saveSelectionUser() {
      let multiId = [];
      this.onSelectionModal.forEach(val => {
        multiId.push(val.userId);
      });
      if (multiId) {
        saveBatchChildRole(this.jobId, multiId.join(","),1).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.reload = true;
            this.isShowMemberModal = false;
            this.$emit('on-member-info-change',true)
          }
        });
      }
    },

    deleteMemberInfo() {
      let multiId = [];
      this.selectDeleteMemberInfo.forEach(val => {
        multiId.push(val.userId);
      });
      if (multiId) {
        deleteBatchRole(this.jobId, multiId.join(","),0).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
             this.reload = true;
              this.$emit('on-member-info-change',true)
          }
        });
      }
    },

    //获取用户列表
    getListUsers(currentPage, pageSize) {
      this.listUserLoading = true;
      listUsers(currentPage, pageSize).then(res => {
        if (res.tableContent[0]) {
          this.listUserPageTotal = res.summary.total;
          this.listUserData = res.tableContent;
          this.listUserLoading = false;
        }
      });
    },

    listUserChangePage(currentPage) {
      this.getListUsers(currentPage, this.pageSize);
    },

    //显示模态框-添加成员
    showMemberModal() {
      this.isShowMemberModal = true;
      this.getListUsers(this.listUserCurrentPage, this.pageSize);
    },
    //成员信息导出xmls
    exportData() {
      this.$refs.table.exportCsv({
        filename: "成员信息"
      });
    }
  }
};
</script>
