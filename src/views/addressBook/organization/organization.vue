<style lang="less">
@import "./organization.less";
</style>

<template>
    <div class="organization-wrap">
        <header class="organization-wrap-header">
            <h2>
                <span>管理员</span>
                <span>/岗位/</span>
                <span>001</span>
            </h2>
        </header>

        <div class="organization-wrap-tabs">
            <Tabs value="baseinfo">
                <TabPane label="基本信息" name="baseinfo">
                    <section class="baseinfo-container rfd-tab-container-common">
                        <Form :model="formItem" :labelWidth="100">
                            <FormItem label="组织名称:" style="font-size:16px">
                                <Input v-model="formItem.OrgUnitName" />
                            </FormItem>
                            <FormItem label="组织状态" :labelWidth="100">
                                <Select v-model="formItem.OrgUnitStatus">
                                    <Option value="inUse">使用中</Option>
                                    <Option value="noUse">未使用</Option>
                                    <Option value="draft">草稿</Option>
                                    <Option value="stop">停用</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="组织类型" :labelWidth="100">
                                <RadioGroup v-model="formItem.OrgUnitType">
                                    <Radio label="manage">管理层</Radio>
                                    <Radio label="business">事业部</Radio>
                                    <Radio label="department">部门</Radio>
                                    <Radio label="group">小组</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="部门职能类型" :labelWidth="100">
                                <RadioGroup v-model="formItem.DepFunction">
                                    <Radio label="manage">管理</Radio>
                                    <Radio label="sale">销售</Radio>
                                    <Radio label="make">制造</Radio>
                                    <Radio label="develop">研发</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="组织说明" :labelWidth="100">
                                <Input v-model="formItem.OrgUnitMemo" type="textarea" :autosize="{minRows: 3,maxRows: 5}" />
                            </FormItem>
                        </Form>
                        <div class="baseinfo-container-action">
                            <Button type="success">编辑</Button>
                            <Button type="success">删除</Button>
                            <Button type="success">保存</Button>
                        </div>
                    </section>
                </TabPane>
                <TabPane label="成员信息" name="memberinfo">
                    <section class="memberinfo-container rfd-tab-container-common">
                        <div class="memberinfo-container-btn">
                            <Button icon="md-add" type="primary" @click="showMemberModal">添加成员</Button>
                            <Button icon="md-remove" type="primary">移除成员</Button>
                            <Button icon="ios-download-outline" type="primary" class="permission-container-btn-export" @click="exportData">导出</Button>
                        </div>
                        <div class="memberinfo-container-table">
                            <Table :loading="memberInfoLoading" :columns="memberInfoColumns" :data="memberInfoData"></Table>
                        </div>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="pageTotal" :current="currentPage" :page-size="pageSize" size="small" @on-change="changeCurrentPage" show-total show-elevator></Page>
                            </div>
                        </div>
                    </section>
                </TabPane>
                <TabPane label="权限" name="permission">
                    <section class="permission-container rfd-tab-container-common">
                        <div class="permission-container-btn">
                            <Button icon="md-add" type="primary">添加权限</Button>
                            <Button icon="md-remove" type="primary">移除权限</Button>

                        </div>
                        <div class="permission-container-table">
                            <Table :loading="permissionLoading" :columns="permissionColumns" :data="permissionData" ref="selection"></Table>
                        </div>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="pageTotal" :current="currentPage" :page-size="pageSize" size="small" @on-change="changeCurrentPage" show-total show-elevator></Page>
                            </div>
                        </div>
                    </section>
                </TabPane>
            </Tabs>
        </div>

        <member-modal v-model="isShowMemberModal" width="1000" footerBtnAlign="right" title="选择用户" @on-ok="addUser">
            <div>
                <Table :loading="listUserLoading" :columns="memberInfoColumns" :data="listUserData" size='small' ref="selection"></Table>
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
import { getUsersByGroupId, listUsers } from "@/services/addressBookService.js";
import MemberModal from "@/components/modal/Modal";

export default {
  name: "organization",

  components: {
    MemberModal
  },

  data() {
    return {
      formItem: {
        OrgUnitName: "",
        OrgUnitType: "",
        DepFunction: "",
        OrgUnitMemo: "",
        OrgUnitStatus: "inUse"
      },

      //成员信息参数
      memberInfoLoading: false,
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
      memberInfoData: [],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 8,

      permissionLoading: false,
      permissionColumns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          key: "nickname"
        }
      ],
      permissionData: [],

      //模态框参数
      isShowMemberModal: false,
      listUserLoading: false,
      listUserData: [],
      listUserPageTotal: 0,
      listUserCurrentPage: 1
    };
  },

  methods: {
    changeCurrentPage(currentPage) {
      let groupId = 347;
      this.getUsersByGroupId(groupId, currentPage, this.pageSize);
    },

    //获取成员信息
    getUsersByGroupId(groupId, currentPage, pageSize) {
      this.memberInfoLoading = true;
      getUsersByGroupId(groupId, currentPage, pageSize).then(res => {
        if (res.tableContent[0]) {
          this.c = res.summary.total;
          this.memberInfoData = res.tableContent;
          this.memberInfoLoading = false;
        }
      });
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

    //添加成员
    addUser() {},

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
  },

  mounted() {
    let groupId = 347;
    this.getUsersByGroupId(groupId, this.currentPage, this.pageSize);

    let tabsMaxHight = document.body.clientHeight - 81;
    window.document.getElementsByClassName("ivu-tabs-content")[0].style.height =
      tabsMaxHight + "px";
  }
};
</script>
