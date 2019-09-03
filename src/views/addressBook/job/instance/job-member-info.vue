<style lang="less" scoped>
.permission-container-btn-export {
  float: right;
}

.header-action {
  overflow: hidden;
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
.app-table-search{
  float: right;
  .app-search-icon {
    font-size: 1rem;
    color: #fff;
    display: inline-block;
    cursor: pointer;
  }
}

.page-selection-warp {
  width: 100%;
  height: 100%;
  min-height: 30px;
  background-color: #e6e6e6;
  margin-bottom: 10px;
  padding: 1px 5px;
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
        <div v-if="isPermission" style="display:inline;">
          <label @click="showMemberModal">添加成员</label>
          <span>-添加成员</span>

          <label @click="deleteMemberInfo">移除成员</label>
          <span>-移除成员</span>
        </div>

        <div class="app-table-search">
          <Input @on-search="userTableFilter" :search="true" v-model="searchTableValue" placeholder="搜索账号或名称" style="width: 300px"></Input>
          <a @click="userTableFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </a>
        </div>

      </div>
    </custom-table>

    <member-modal v-model="isShowMemberModal" width="1000" footerBtnAlign="right" title="选择用户" @on-ok="saveSelectionUser">
      <div style="margin-top:10px">
        <div class="app-search">
          <Input @on-search="userFilter" :search="true" v-model="searchValue" placeholder="搜索账号或名称" style="width: 300px"></Input>
          <a @click="userFilter" class="app-search-icon">
            <Button type="primary" size="small">查询</Button>
          </a>
        </div>
        <Table height="400" size='small' ref="selection" :loading="listUserLoading" :columns="memberInfoColumnsModel" :data="listUserData" @on-select-all="onSelectAll" @on-selection-change="handerSelectionChange" @on-select-cancel="onSelectCancel">
        </Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="listUserPageTotal" :current="listUserCurrentPage" :page-size="pageSize" size="small" @on-page-size-change="onPageSizeChange" @on-change="listUserChangePage" show-total show-elevator show-sizer></Page>
          </div>
        </div>
      </div>
      <div class="page-selection-warp" v-show="onPageSelection[0] ">
        <Tag v-for="item in onPageSelection" :key="item.userId" :userId="item.userId" :closable="true" @on-close="deletePageSelection" type="border" color="primary" size="small">
          {{item.nickname}}
        </Tag>
      </div>
    </member-modal>
  </div>
</template>

<script>
import MemberModal from "@/components/modal/Modal";
import {
  listUsers,
  deleteBatchRole,
  saveBatchChildRole,
  getAllUsers
} from "@/services/addressBookService.js";
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
    },
    isPermission: {
      type: Boolean
    }
  },

  data() {
    return {
      memberInfoLoading: false,
      searchValue: "",
      searchTableValue: "",
      memberInfoParams: {
        roleId: this.jobId,
        page: 1,
        limit: 10
      },
      memberInfoColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "头像",
          key: "photo",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h("Avatar", {
                props: {
                  src: params.row.photo
                    ? params.row.photo
                    : "resources/images/icon/defaultUserPhoto.png"
                }
              })
            ]);
          }
        },
        {
          title: "用户账号",
          key: "jobNumber"
        },
        {
          title: "姓名",
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
          title: "手机号",
          key: "mobile"
        },
        {
          title: "邮箱",
          key: "email"
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
                  size: "small",
                  disabled: !this.isPermission
                },
                style: {
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "确认",
                      content: "确认删除该成员？",
                      onOk: () => {
                        deleteBatchRole(this.jobId, params.row.userId)
                          .then(res => {
                            if (res.success) {
                              this.$Message.success("删除成功!");
                              this.reload = true;
                              this.$emit("on-member-info-change", true);
                            }
                          })
                          .catch(error => {
                            this.$Message.error(error.data.message);
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

      memberInfoColumnsModel: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "头像",
          key: "photo",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h("Avatar", {
                props: {
                  src: params.row.photo
                    ? params.row.photo
                    : "resources/images/icon/defaultUserPhoto.png"
                }
              })
            ]);
          }
        },
        {
          title: "用户账号",
          key: "jobNumber"
        },
        {
          title: "姓名",
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
          title: "手机号",
          key: "mobile"
        },
        {
          title: "邮箱",
          key: "email"
        }
      ],

      //模态框参数
      isShowMemberModal: false,
      listUserLoading: false,
      listUserData: [],
      listUserPageTotal: 0,
      listUserCurrentPage: 1,
      pageSize: 10,

      //模态框参数
      onPageSelection: [],
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

    onRefeshChange(val) {
      if (!val) {
        this.reload = val;
      }
    },

    //全选
    onSelectAll(selection) {
      let obj = {};
      //触发全选事件
      //全选
      this.onPageSelection.push(...selection);
      //数组去重
      this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
        obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
        return cur;
      }, []);
    },

    handerSelectionChange(selection) {
      //取消全选
      if (selection.length === 0) {
        let s = this.$refs.selection.data;
        let p = this.onPageSelection;
        s.map(item => {
          p = p.filter(f => {
            return f.userId !== item.userId;
          });
        });
        this.onPageSelection = p;
      } else {
        let obj = {};
        this.onPageSelection.push(...selection);
        //数组去重
        this.onPageSelection = this.onPageSelection.reduce((cur, next) => {
          obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
          return cur;
        }, []);
      }
    },
    //删除分页选中
    deletePageSelection(event) {
      let id = Number(event.target.parentElement.getAttribute("userId"));
      this.onPageSelection = this.onPageSelection.filter(f => {
        return f.userId !== id;
      });

      this.$refs.selection.data.forEach((item, index) => {
        if (id === item.userId) {
          this.$refs.selection.toggleSelect(index);
        }
      });
    },

    //单选取消
    onSelectCancel(selection, row) {
      this.onPageSelection = this.onPageSelection.filter(f => {
        return f.userId !== row.userId;
      });
    },

    //保存选中的用户
    saveSelectionUser() {
      let multiId = [];
      this.onPageSelection.forEach(val => {
        multiId.push(val.userId);
      });
      if (multiId) {
        saveBatchChildRole(this.jobId, multiId.join(","), 1).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.reload = true;
            this.isShowMemberModal = false;
            this.$emit("on-member-info-change", true);
          }
        });
      }
    },

    deleteMemberInfo() {
      let multiId = [];

      this.selectDeleteMemberInfo.forEach(val => {
        multiId.push(val.userId);
      });
      if (multiId.length > 0) {
        deleteBatchRole(this.jobId, multiId.join(","), 0)
          .then(res => {
            if (res.success) {
              this.$Message.success("删除成功!");
              this.reload = true;
              this.$emit("on-member-info-change", true);
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
      } else {
        this.$Message.error("请选择要移除的成员");
      }
    },

    //获取用户列表
    getListUsers(currentPage, pageSize, filter) {
      this.listUserLoading = true;
      getAllUsers(pageSize, currentPage, filter).then(res => {
          this.listUserPageTotal = res.dataCount;
          this.listUserData = res.tableContent;
          this.listUserLoading = false;
          if (this.onPageSelection.length > 0) {
            this.listUserData.map(item => {
              this.onPageSelection.map(sel => {
                if (item.userId === sel.userId) {
                  item._checked = true;
                }
              });
            });
          }
          
      });
    },

    listUserChangePage(currentPage) {
      let filter = JSON.stringify([
        {
          operator_1: "like",
          value_1: this.searchValue,
          property_1: "nickname",
          link: "or",
          operator_2: "like",
          value_2: this.searchValue,
          property_2: "jobNumber"
        }
      ]);
      this.getListUsers(currentPage, this.pageSize, filter);
    },

    //点击切换每页显示条数
    onPageSizeChange(size) {
      this.pageSize = size;
      let filter = JSON.stringify([
        {
          operator_1: "like",
          value_1: this.searchValue,
          property_1: "nickname",
          link: "or",
          operator_2: "like",
          value_2: this.searchValue,
          property_2: "jobNumber"
        }
      ]);
      this.getListUsers(1, size, filter);
    },

    //显示模态框-添加成员
    showMemberModal() {
      this.isShowMemberModal = true;
      this.searchValue = "";
      this.onPageSelection = [];
      this.getListUsers(this.listUserCurrentPage, this.pageSize);
    },

    //过滤
    userFilter() {
      let filter = JSON.stringify([
        {
          operator_1: "like",
          value_1: this.searchValue,
          property_1: "nickname",
          link: "or",
          operator_2: "like",
          value_2: this.searchValue,
          property_2: "jobNumber"
        }
      ]);
      this.getListUsers(this.listUserCurrentPage, this.pageSize, filter);
    },
    //职位成员过滤
    userTableFilter() {
      let filter = JSON.stringify([
        {
          operator_1: "like",
          value_1: this.searchTableValue,
          property_1: "nickname",
          link: "or",
          operator_2: "like",
          value_2: this.searchTableValue,
          property_2: "jobNumber"
        }
      ]);
      this.memberInfoParams.filter = filter;
      this.reload = true;
    }
  }
};
</script>
