<style lang="less">
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

.page-selection-box {
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
    <custom-table apiUrl="/ds/getUsersByGroupId" :columns="memberInfoColumns" :apiParams="memberInfoParams" v-model="reload" @on-selection-change="onSelectionChange" @on-refesh-change='onRefeshChange'>

      <div slot="header" class="header-action">
        <div v-if="isPermission" style="display:inline;">
          <label @click="showMemberModal">添加成员</label>
          <span>-添加成员</span>

          <label @click="deleteMemberInfo">移除成员</label>
          <span>-移除成员</span>
        </div>

        <div class="app-table-search">
          <Input @on-search="userTableFilter" :search="true" v-model="searchTableValue" placeholder="搜索工号或名称" style="width: 300px"></Input>
          <a @click="userTableFilter" class="app-search-icon">
            <Button type="primary" size="small" style="color:#fff">查询</Button>
          </a>
        </div>

      </div>
    </custom-table>

    <member-modal v-model="isShowMemberModal" width="1000" footerBtnAlign="right" title="选择用户" @on-ok="saveSelectionUser">
      <div style="margin-top:10px;">
        <div class="app-search">
          <Input @on-search="userFilter" :search="true" v-model="searchValue" placeholder="搜索工号或名称" style="width: 300px"></Input>
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
      <div class="page-selection-box" v-show="onPageSelection[0] ">
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
  addOrgMember,
  deleteOrgMember,
  getAllUsers
} from "@/services/addressBookService.js";
import CustomTable from "./CustomTable";
export default {
  name: "member-info",

  components: {
    MemberModal,
    CustomTable
  },

  props: {
    groupId: {
      type: String
    },
    isPermission: {
      type: Boolean
    }
  },

  data() {
    return {
      memberInfoLoading: false,
      memberInfoParams: {
        groupId: this.groupId,
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
                  src: params.row.photo?params.row.photo:'resources/images/icon/defaultUserPhoto.jpg'
                }
              })
            ]);
          }
        },
        {
          title: "工号",
          key: "userCode"
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
          width: 100,
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
                        deleteOrgMember(this.groupId, params.row.userId, 0)
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
                  src: params.row.photo?params.row.photo:'resources/images/icon/defaultUserPhoto.jpg'
                }
              })
            ]);
          }
        },
        {
          title: "工号",
          key: "userCode"
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
      searchValue: "",
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
        addOrgMember(this.groupId, multiId.join(","), 1).then(res => {
          if (res.success) {
            this.$Message.success("更新成功");
            this.reload = true;
            this.isShowMemberModal = false;
            this.$emit("on-member-info-change", true);
          }
        });
      }
    },

    deleteMemberInfo() {
      let multiId = [];
      if (this.selectDeleteMemberInfo.length > 0) {
        this.selectDeleteMemberInfo.forEach(val => {
          multiId.push(val.userId);
        });
        if (multiId) {
          deleteOrgMember(this.groupId, multiId.join(","), 0).then(res => {
            if (res.success) {
              this.$Message.success("删除成功!");
              this.reload = true;
              this.$emit("on-member-info-change", true);
            }
          });
        }
      } else {
        this.$Message.info("请选择要删除的成员");
      }
    },

    //获取用户列表
    getListUsers(currentPage, pageSize, filter) {
      this.listUserLoading = true;
      getAllUsers(pageSize, currentPage, filter).then(res => {
        if (res.tableContent[0]) {
          this.listUserPageTotal = res.dataCount;
          this.listUserData = res.tableContent;

          if (this.onPageSelection.length > 0) {
            this.listUserData.map(item => {
              this.onPageSelection.map(sel => {
                if (item.userId === sel.userId) {
                  item._checked = true;
                }
              });
            });
          }
          this.listUserLoading = false;
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
          property_2: "userCode"
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
          property_2: "userCode"
        }
      ]);
      this.getListUsers(1, size, filter);
    },

    //显示模态框-添加成员
    showMemberModal() {
      this.isShowMemberModal = true;
      this.searchValue = "";
      this.onPageSelection = []; //清空选中的用户
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
          property_2: "userCode"
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
          property_2: "userCode"
        }
      ]);
      this.memberInfoParams.filter = filter;
      this.reload = true;
    }
  }
};
</script>

