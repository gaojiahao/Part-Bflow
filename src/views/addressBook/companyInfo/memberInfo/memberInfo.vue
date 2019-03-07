<style lang="less" scoped>
@import "./memberInfo.less";
</style>

<template>
  <div class="member-wrap">
    <div class="member-wrap-table">
      <div style="overflow:hidden;margin-bottom:-8px;">
        <div v-if="isPermission" style="display:inline;">
          <b @click="showAllMember" class="member-wrap-table-btn">添加成员</b>
          <span style="color: #7a7676;">-添加成员</span>
          <b @click="delCompanyMember" class="member-wrap-table-btn">移除成员</b>
          <span style="color: #7a7676;">-移除成员</span>
        </div>
        <div class="table-search">
          <Input @on-search="tableSearch" :search="true" placeholder="请输入工号或姓名" class="search-btn" v-model="searchTableValue" />
          <Button type="primary" size="small" @click="tableSearch">查询</Button>
        </div>
      </div>
      <Table style="margin-top:10px;" :loading="memberLoading" :columns="columns1" :data="memberData" @on-selection-change="onMemberSelectionChange">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div class="fr" style="padding-bottom: 5px;">
          <Page :total="pageTotal" @on-page-size-change="memberPageSizeChange" :current="memberCurrentPage" :page-size="memberPageSize" size="small" @on-change="pageChange" show-sizer show-elevator show-total/>
        </div>
      </div>
    </div>
    <Modal v-model="showModal" title="选择公司成员" @on-ok="addCompanyMember" :styles="{top: '15px'}" width="870">
      <div class="search">
        <!-- <Input placeholder="请输入工号" class="serach-btn" v-model="userCode" /> -->
        <Input @on-search="search" :search="true" placeholder="请输入工号或姓名" class="search-btn" v-model="searchValue" />
        <Button type="primary" @click="search">搜索</Button>
      </div>
      <Table ref="selection" :highlight-row="true" @on-selection-change="onSelectionChange" @on-select-all="onSelectAll" @on-select-cancel="onSelectCancel" height="400" :loading="allMemberLoading" :columns="columns2" :data="allMemberData">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div class="fr">
          <Page @on-page-size-change="onAllMemberPageSizeChange" :total="allMemberTotal" show-elevator show-sizer :current="allMemberCurrentPage" :page-size="allMemberPageSize" @on-change="onMemberPageChange" size="small" show-total></Page>
        </div>
      </div>
      <div class="page-selection-warp" v-show="onPageSelection[0] ">
        <Tag v-for="item in onPageSelection" :key="item.userId" @on-close="deleteSelectUser(item,index)" :userId="item.userId" closable type="border" color="primary" size="small">
          {{item.nickname}}
        </Tag>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getAllUser,
  addCompanyMember,
  removeCompanyMember,
  getGroupUser,
  filterUser
} from "@/services/addressBookService.js";
export default {
  props: {
    isPermission: {
      type: Boolean
    }
  },
  data() {
    return {
      columns1: [
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
            let gender = "";
            if (params.row.gender === 0) {
              gender = "女";
            } else if (params.row.gender === 1) {
              gender = "男";
            } else {
              gender = "未知";
            }
            return h(
              "span",
              {
                style: {
                  color: "#39f"
                }
              },
              gender
            );
          }
        },
        {
          title: "手机",
          key: "mobile"
        },
        {
          title: "邮箱",
          key: "email",
          width: 180
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled: !this.isPermission
                  },
                  on: {
                    click: () => {
                      this.delCompanyMemberOne(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      columns2: [
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
          width: 100,
          key: "gender",
          render: (h, params) => {
            let gender = "";
            if (params.row.gender === 0) {
              gender = "女";
            } else if (params.row.gender === 1) {
              gender = "男";
            } else if (params.row.gender === -1) {
              gender = "未知";
            } else {
              gender = params.row.gender;
            }
            return h(
              "span",
              {
                style: {
                  color: "#39f"
                }
              },
              gender
            );
          }
        },
        {
          title: "手机",
          width: 150,
          key: "mobile"
        },
        {
          title: "邮箱",
          key: "email",
          width: 180
        }
      ],
      groupId: this.$route.params.groupId,
      memberData: [],
      pageTotal: 0,
      memberLoading: false,
      memberCurrentPage: 1,
      memberPageSize: 10,
      showModal: false,
      allMemberLoading: false,
      allMemberTotal: 0,
      allMemberCurrentPage: 1,
      allMemberPageSize: 10,
      allMemberData: [],
      target: 4,
      memberSelectionData: [],
      nowMemberselectionData: [],
      searchValue: "",
      searchTableValue: "",
      onPageSelection: []
    };
  },
  methods: {
    //获取所有公司成员信息
    getAllUser() {
      let filter = JSON.stringify([{operator_1:"like",value_1:this.searchValue,property_1:"nickname",link:"or",operator_2:"like",value_2:this.searchValue,property_2:"userCode"}
      ]);
      this.allMemberLoading = true;
      getAllUser(this.allMemberCurrentPage, this.allMemberPageSize,filter).then(
        res => {
          if (res.tableContent[0]) {
            this.allMemberData = res.tableContent;
            this.allMemberTotal = res.summary.total;
            if (this.onPageSelection.length > 0) {
              this.allMemberData.map(item => {
                this.onPageSelection.map(sel => {
                  if (item.userId === sel.userId) {
                    item._checked = true;
                  }
                });
              });
            }
          }
          this.allMemberLoading = false;
        }
      );
    },
    //获取公司成员信息
    getCompanyMember(text) {
      this.memberLoading = true;
      getGroupUser(
        this.groupId,
        this.memberCurrentPage,
        this.memberPageSize,
        text
      ).then(res => {
        this.memberData = res.tableContent;
        this.pageTotal = res.dataCount;
        this.memberLoading = false;
      });
    },
    //删除公司成员
    delCompanyMember() {
      let userIds = [];
      if (this.nowMemberselectionData.length > 0) {
        this.nowMemberselectionData.forEach(function(s) {
          userIds.push(s.userId);
        });
        this.$Modal.confirm({
          title: "确认",
          content: "确认批量删除成员？",
          onOk: () => {
            removeCompanyMember(userIds, this.groupId).then(res => {
              if (res.success) {
                this.$Message.success("删除成功!");
                this.$emit("getInstanceCount");
                this.getCompanyMember(this.searchTableValue);
              }
            }).catch(error => {
                this.$Message.error(error.data.message);
            });
          }
        });
      } else {
        this.$Message.warning("请选择至少一个成员！");
      }
    },
    delCompanyMemberOne(index) {
      let userIds = [];
      userIds.push(this.memberData[index].userId);
      this.$Modal.confirm({
        title: "确认",
        content: "确认删除此成员？",
        onOk: () => {
          removeCompanyMember(userIds, this.groupId).then(res => {
            if (res.success) {
              this.$Message.success("删除成功!");
              this.$emit("getInstanceCount");
              this.getCompanyMember(this.searchTableValue);
            }
          }).catch(error => {
              this.$Message.error(error.data.message);
          });
        }
      });
    },
    //删除选择的用户
    deleteSelectUser(item, index) {
      this.onPageSelection.splice(index, 1);
      this.$refs.selection.data.forEach((data, i) => {
        if (item.userId === data.userId) {
          this.$refs.selection.toggleSelect(i);
        }
      });
    },
    //当前页改变
    pageChange(currentPage) {
      this.memberCurrentPage = currentPage;
      this.getCompanyMember(this.searchTableValue);
    },
    //弹出所有用户
    showAllMember() {
      this.showModal = true;
      this.onPageSelection = [];
      this.searchValue = "";
      this.getAllUser();
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
    //取消单选
    onSelectCancel(selection, row) {
      this.onPageSelection = this.onPageSelection.filter(f => {
        return f.userId !== row.userId;
      });
    },
    onSelectionChange(selection) {
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
      this.memberSelectionData = this.onPageSelection;
    },
    onMemberSelectionChange(selection) {
      this.nowMemberselectionData = selection;
    },
    onMemberPageChange(currentPage) {
      this.allMemberCurrentPage = currentPage;
      this.getAllUser();
    },
    onAllMemberPageSizeChange(pageSize) {
      this.allMemberPageSize = pageSize;
      this.getAllUser();
    },
    memberPageSizeChange(pageSize) {
      this.memberPageSize = pageSize;
      this.getCompanyMember(this.searchTableValue);
    },
    //新增公司成员
    addCompanyMember() {
      let userIds = [];
      if (this.memberSelectionData.length > 0) {
        this.memberSelectionData.forEach(function(s) {
          userIds.push(s.userId);
        });
        addCompanyMember(userIds, this.groupId).then(res => {
          if (res.success) {
            this.$Message.success("更新成功");
            this.$emit("getInstanceCount");
            this.getCompanyMember(this.searchTableValue);
          }
        }).catch(error => {
            this.$Message.error(error.data.message);
        });
      } else {
        this.$Message.warning("请选择至少一个成员！");
      }
    },
    search() {
      this.getAllUser();
    },
    tableSearch() {
      this.getCompanyMember(this.searchTableValue);
    }
  },
  mounted() {
    this.getCompanyMember();
  }
};
</script>
