<style lang="less" scoped>
    @import "./detail.less";
</style>

<template>
    <div class="check-detail">
        <Row class="check-detail-bread">
            <h3><span @click.stop="goCheckSheet" style="cursor:pointer">点检表</span>
                / {{checkSheetName}}</h3>
        </Row>
        <Row class="check-detail-title">
            <span><b style="color:#e4393c">*</b>点检表名称：</span>
            <Input v-model="checkSheetName" :autofocus="true" placeholder="请输入点检表名称" style="width:200px;font-size:14px" />

        </Row>

        <Row class="check-detail-desc">
            <span>点检表描述：</span>
            <Input v-model="checkSheetDesc" type="textarea"></Input>
        </Row>
        <Row class="check-detail-table">
          <div style="margin-bottom:15px">
            <span class="check-detail-btn" @click="addCheckItem">新增</span>
            <div class="app-search">
              <Input 
                @on-search="checkSheetItemFilter" 
                :search="true" 
                v-model="searchValue" 
                placeholder="搜索检查项目名称" 
                style="width: 300px">
              </Input>
            </div>
          </div>
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
            <span class="check-detail-save-btn" @click="saveCheckSheet">保存</span>
            <span class="check-detail-save-btn" @click="saveAndAddCheckSheet">保存并继续添加</span>
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
      pageSize: 10,
      checkSheetName: "",
      checkSheetDesc: "",
      searchValue: "",
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
          key: "content",
          width: 400
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
    checkSheetItemFilter() {
      let filter = JSON.stringify([{operator:"like",value:this.searchValue,property:"title"}]);
      this.getCheckSheetItemData(filter);
    },
    //点击分页
    onPageChange(currentPage) {
      let filter = JSON.stringify([{operator:"like",value:this.searchValue,property:"title"}]);
      this.currentPage = currentPage;
      this.getCheckSheetItemData(filter);
    },
    //点击切换下级用户每页显示条数
    onPageSizeChange(size) {
      let filter = JSON.stringify([{operator:"like",value:this.searchValue,property:"title"}]);
      this.pageSize = size;
      this.getCheckSheetItemData(filter);
    },
    goCheckSheet() {
      this.$router.push({
        path: "/checkSheet/list"
      });
    },
    addCheckItem() {
      this.showModal = true;
      this.$refs['formValidate'].resetFields();
      this.formValidate.edit = false;
    },
    cancelAdd() {
      this.showModal = false;
    },
    confirmAdd() {
      this.$refs["formValidate"].validate(v => {
        if (v) {
          if(this.formValidate.edit){
            this.data[this.formValidate.currentIndex].title = this.formValidate.name;
            this.data[this.formValidate.currentIndex].content = this.formValidate.content;
          }else{
            this.data.push({
              title: this.formValidate.name,
              content: this.formValidate.content
            });
          }
          this.showModal = false;
        }
      });
    },
    //保存新增点检表
    saveCheckSheet() {
      if (this.checkSheetName) {
        if(this.data.length > 0){
          let data;
          if (!this.checkSheetId) {
            data = {
              name: this.checkSheetName,
              comment: this.checkSheetDesc,
              jopCheckItemList: this.data
            };
            saveCheckContent(data)
              .then(res => {
                if (res.success) {
                  this.$Message.success(res.message);
                  this.$router.push({path:'/checkSheet/list'});
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
              jopCheckItemList: this.data
            };
            updateCheckContent(data)
              .then(res => {
                if (res.success) {
                  this.$Message.success(res.message);
                  this.$router.push({path:'/checkSheet/list'});
                }
              })
              .catch(error => {
                this.$Message.error(error.data.message);
              });
          }
        }else{
          this.$Message.error('请至少添加一条检查项目！');
        }
      }else{
        this.$Message.error('请输入点检表名称！');
      }
    },
    //保存并继续新增点检表
    saveAndAddCheckSheet() {
      if (this.checkSheetName) {
        if(this.data.length > 0){
          let data;
          if (!this.checkSheetId) {
            data = {
              name: this.checkSheetName,
              comment: this.checkSheetDesc,
              jopCheckItemList: this.data
            };
            saveCheckContent(data)
              .then(res => {
                if (res.success) {
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
              jopCheckItemList: this.data
            };
            updateCheckContent(data)
              .then(res => {
                if (res.success) {
                  this.$Message.success(res.message);
                  this.checkSheetName = "";
                  this.checkSheetDesc = "";
                  this.data = [];
                }
              })
              .catch(error => {
                this.$Message.error(error.data.message);
              });
          }
        }else{
          this.$Message.error('请至少添加一条检查项目！');
        }
      }else{
        this.$Message.error('请输入点检表名称！');
      }
    },
    //获取检查项目数据
    getCheckSheetItemData(filter) {
      listCheckContent(this.checkSheetId, this.currentPage, this.pageSize,filter).then(
        res => {
          this.data = res.tableContent;
          this.total = res.dataCount;
          this.checkSheetDesc = res.checkTableComment;
          this.checkSheetName = res.checkTableName;
        }
      );
    }
  },
  mounted() {
    let column = [{
        title: "修改者",
        key: "menderName"
      },{
        title: "修改时间",
        key: "modTime"
      }],
      actionColumn = {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.data.splice(params.index,1);
                    }
                  }
                },
                "删除"
              ),
              h("span", {
                style: {
                  height: "20px",
                  borderLeft: "1px solid #39f",
                  margin: "0px 5px"
                }
              }),
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.formValidate.name = params.row.title;
                      this.formValidate.content = params.row.content;
                      this.formValidate.currentIndex = params.index;
                      this.formValidate.edit = true;
                      this.showModal = true;
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        };
    if (this.checkSheetId) {
      column.push(actionColumn);
      this.columns.push(...column);
      this.getCheckSheetItemData();
    }else{
      this.columns.push(actionColumn);
    }
  }
};
</script>

