<style lang="less" scoped>
    .check-detail{
        &-bread{
           color:#39f;
           margin: 10px 10px; 
        }
        &-btn{
            margin: 5px 0px;
            background-color: rgb(0, 150, 136);
            border-radius: 0px;
        }
        &-table{
            margin: 0px 100px;
            background-color:#fff;
            padding:10px 20px;
        }
        &-title{
            margin: 10px 100px;
            font-size:15px;
        }
        &-save{
            width: 100%;
            background-color: #fff;
            position: fixed !important;
            z-index: 10;
            bottom: 0px;
            text-align: center;
            padding: 5px;
            &-btn{
                background-color: rgb(0, 150, 136);
                border-radius: 0px;
            }
        }
    }
    .user-page {
        margin: 10px;
        overflow: hidden;
    }
</style>

<template>
    <div class="check-detail">
        <Row class="check-detail-bread">
            <h3><span @click.stop="goCheckSheet" style="cursor:pointer">点检表</span>
                / {{checkSheetName}}</h3>
        </Row>
        <Row class="check-detail-title">
            <span>点检表名称：</span>
            <Input v-model="checkSheetName" :autofocus="true" placeholder="请输入点检表名称" style="width: 200px" />

        </Row>

        <Row class="check-detail-title">
            <span>点检表描述：</span>
            <Input v-model="checkSheetDesc" type="textarea"></Input>
        </Row>
        <Row class="check-detail-table">
            <Button class="check-detail-btn" type="primary" @click="addCheckItem">新增</Button>
            <Table :columns="columns" :data="data" size="small"></Table>
            <div class="user-page">
                <div style="float: right;">
                    <Page 
                    :total="total" 
                    :current="currentPage" 
                    :page-size="pageSize" 
                    @on-page-size-change="onPageSizeChange" 
                    @on-change="onPageChange" 
                    size="small" 
                    show-elevator show-sizer />
                </div>
            </div>
        </Row>
        <Row class="check-detail-save">
            <Button class="check-detail-save-btn" type="primary" @click="saveCheckSheet">保存</Button>
        </Row>
        <Modal v-model="showModal" title="新增检查项目">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="检查项目" prop="name">
                    <Input v-model="formValidate.name"></Input>
                </FormItem>
                <FormItem label="检查内容" prop="content">
                    <Input v-model="formValidate.content" type="textarea"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="confirmAdd">确定</Button>
                <Button type="default" @click="cancelAdd">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {
  listCheckContent,
  saveCheckContent,
  updateCheckContent
} from "@/services/performanceStandardService.js";

export default {
  name: "checkSheet",
  components: {},
  data() {
    return {
      checkSheetId: this.$route.params.id,
      total: 0,
      currentPage: 1,
      pageSize: 20,
      checkSheetName: "",
      checkSheetDesc: "",
      showModal: false,
      columns: [
        {
          type: "index",
          width: 80
        },
        {
          title: "检查项目",
          key: "title"
        },
        {
          title: "检查内容",
          key: "content"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      formValidate: {
        name: "",
        content: ""
      },
      ruleValidate: {
        name: [
          { required: true, message: "请输入检查项目名称", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入检查内容", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getCheckSheetItemData();
    },
    //点击切换下级用户每页显示条数
    onPageSizeChange(size) {
      this.pageSize = size;
      this.getCheckSheetItemData();
    },
    goCheckSheet() {
      this.$router.push({
        path: "/checkSheet/list"
      });
    },
    addCheckItem() {
      this.showModal = true;
    },
    cancelAdd() {
      this.showModal = false;
    },
    confirmAdd() {
      this.$refs["formValidate"].validate(v => {
        if (v) {
          this.data.push({
            title: this.formValidate.name,
            content: this.formValidate.content
          });
          this.showModal = false;
        }
      });
    },
    saveCheckSheet() {
      if (this.checkSheetName && this.data.length > 0) {
        let data;
        if (!this.checkSheetId) {
          data = {
            name: this.checkSheetName,
            comment: this.checkSheetDesc,
            jopCheckContentList: this.data
          };
          saveCheckContent(data)
            .then(res => {
              if (res.message) {
                this.$Message.success(res.message);
                this.checkSheetName = "";
                this.checkSheetDesc = "";
                this.data = [];
              }
            })
            .catch(error => {
              this.$Message.error(error.data.message);
            });
        } else {
          data = {
            id: this.checkSheetId,
            name: this.checkSheetName,
            comment: this.checkSheetDesc,
            jopCheckContentList: this.data
          };
          updateCheckContent(data)
            .then(res => {
              if (res.success) {
                this.$Message.success(res.message);
              }
            })
            .catch(error => {
              this.$Message.error(error.data.message);
            });
        }
      }
    },
    //获取检查项目数据
    getCheckSheetItemData() {
      listCheckContent(this.checkSheetId, this.currentPage, this.pageSize).then(
        res => {
          this.data = res.tableContent;
          this.total = res.dataCount;
          this.checkSheetDesc = res.checkKeyTableComment;
          this.checkSheetName = res.checkKeyTableName;
        }
      );
    }
  },
  mounted() {
    let column = [
      {
        title: "创建者",
        key: "creator"
      },
      {
        title: "创建时间",
        key: "crtTime"
      },
      {
        title: "修改者",
        key: "modifer"
      },
      {
        title: "修改时间",
        key: "modTime"
      }
    ];
    if (this.checkSheetId) {
      this.columns.push(...column);
      this.getCheckSheetItemData();
    }
  }
};
</script>

