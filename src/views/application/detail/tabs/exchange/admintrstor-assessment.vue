<style lang="less" scoped>
  @import './admintrstor-assessment.less';
</style>

<template>
  <div class="app-card">
    <Row style="margin: 10px 15px ">
      <Col span="2">
      <b class="app-name">管理员自评：</b>
      </Col>
      <Col span="22">
      <Button icon="plus-round" type="info" class="app-add" size="small" @click="addAssess">新增</Button>
      <Table :columns="columns" width=753 :data="tableData"></Table>
      </Col>
    </Row>
    <assess-modal title="管理员自评" v-model="showAssessModal" width="650" @on-ok="submitAdminAssess">
      <div style="margin:20px auto;width:85%;">
        <Form ref="formValidate" :label-width="150" :model="adminAssessData" :rules="ruleValidate">
          <FormItem label="期间（月份）:" prop="duringDate">
            <DatePicker format="yyyy年MM月" type="month" placeholder="选择日期" style="width: 200px" v-model="adminAssessData.duringDate"></DatePicker>
          </FormItem>
          <FormItem label="效率与成本改进成果:" prop="result">
            <Input type="textarea" v-model="adminAssessData.result"></Input>
          </FormItem>
          <FormItem label="效率与成本改进机会:" prop="opportunity">
            <Input type="textarea" v-model="adminAssessData.opportunity"></Input>
          </FormItem>
        </Form>
      </div>
    </assess-modal>
  </div>
</template>

<script>
import {
  getAssessmentByListId,
  saveAssessment
} from "@/services/appService.js";
import AssessModal from "@/components/modal/Modal";

export default {
  name: "admintrstorAssessment",
  components: {
    AssessModal
  },
  props: {
    listId: String
  },
  data() {
    return {
      showAssessModal: false,
      changeResult: "",
      adminAssessData: {
        duringDate: "",
        result: "",
        opportunity: ""
      },
      ruleValidate: {
        duringDate: [
          {
            type: "date",
            required: true,
            message: "不允许为空"
          }
        ],
        result: [
          {
            required: true,
            message: "不允许为空",
            type: "string"
          }
        ],
        opportunity: [
          {
            required: true,
            message: "不允许为空",
            type: "string"
          }
        ]
      },
      columns: [
        {
          title: "期间（月份）",
          key: "crtTime",
          width: 150,
          align: "center",
          render: (h, params) => {
            let renderDate = this.formatDate(params.row.crtTime);
            return h("span", {}, renderDate);
          }
        },
        {
          title: "效率与成本改进成果",
          key: "achievement",
          width: 300,
          align: "center"
        },
        {
          title: "效率与成本改进机会",
          key: "chance",
          width: 300,
          align: "center"
        }
      ],
      tableData: []
    };
  },
  methods: {
    //展示管理员自评
    addAssess() {
      this.showAssessModal = true;
      this.$refs["formValidate"].resetFields();
    },
    //添加管理员自评
    submitAdminAssess() {
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          saveAssessment(
            this.listId,
            this.adminAssessData.opportunity,
            this.adminAssessData.result,
            this.adminAssessData.duringDate
          ).then(res => {
            if (res.success) {
              this.$Message.success(res.message);
              this.getAssessmentData();
              this.showAssessModal = false;
            }
          });
        }
      });
    },
    //获取管理员自评数据
    getAssessmentData() {
      getAssessmentByListId(this.listId).then(res => {
        this.tableData = res.tableContent;
      });
    },
    //格式化日期方法
    formatDate(currentDate) {
      let date = new Date(currentDate),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        relDate;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      relDate = year + "-" + month;
      return relDate;
    }
  },
  created() {
    this.getAssessmentData();
  },
  mounted() {}
};
</script>

