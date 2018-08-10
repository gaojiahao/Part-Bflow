<style lang="less" scoped>
@import "./admintrstor-assessment.less";
</style>

<template>
  <div class="bg_ff">
    <div>
    <Row class="app-resource-group-title">
      <h3>管理员自评
        <a v-if="isAdminTrue" @click="addAssess">添加自评</a>
      </h3>
    </Row>
        <div v-for="(assess, index) of assessments" :key="index" class="pad10 bg_ff">
          <img :src="assess.photo?assess.photo:'resources/images/icon/contactor.png'"  class="user-icon">
          <div class="font14 content" >
            <div >
              <h4>{{ assess.creator }} <span class="fr">{{ formatDate(assess.date) }}</span></h4>
              </div>
            <div class="assessment-info">
              <div>
                <span style="color: #a06970">改进成果:</span>
                <span class="assessment-info-text">{{assess.achievement}}</span>
              </div>
              <div>
                <span style="color: #a06970">改进机会:</span>
                <span class="assessment-info-text">{{assess.chance}}</span>
              </div>
            </div>
          </div>
        </div>
    </div>

   
    <assess-modal title="管理员自评" v-model="showAssessModal" width="650" @on-ok="submitAdminAssess">
      <div style="margin:20px auto;width:85%;">
        <Form ref="formValidate" :label-width="150" :model="adminAssessData" :rules="ruleValidate">
          <FormItem label="期间（月份）:" prop="duringDate">
            <DatePicker format="yyyy-MM" type="month" placeholder="选择日期" style="width: 200px" v-model="adminAssessData.duringDate"></DatePicker>
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
import EditTable from "@/components/table/edit-table";
import AssessModal from "@/components/modal/Modal";

export default {
  name: "admintrstorAssessment",
  components: {
    AssessModal,
    EditTable
  },
  props: {
    listId: {
      type: String
    },
    isAdmin: {
      type: Boolean
    }
  },
  data() {
    return {
      showAssessModal: false,
      isAdminTrue: false,
      isEdit: "",
      IsEditId: "",
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
      assessments: []
    };
  },
  watch: {
    isAdmin: function(value) {
      (value) && (this.isAdminTrue=true);
    }
  },
  methods: {
    //展示管理员自评
    addAssess() {
      this.showAssessModal = true;
      this.$refs["formValidate"].resetFields();
    },
    //添加管理员自评
    submitAdminAssess() {
      let params = {
        listId: this.listId,
        opportunity: this.adminAssessData.opportunity,
        result: this.adminAssessData.result,
        date: this.formatDate(this.adminAssessData.duringDate)
      };

      if (this.isEdit === "edit") {
        params.id = this.IsEditId;
      }
      let v = false;
      this.$refs["formValidate"].validate(valid => {
        v = valid;
      });
      if (v) {
        saveAssessment(params).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.getAssessmentData();
            this.showAssessModal = false;
            this.isEdit = "";
          } else {
            this.$Message.error(res.message);
          }
        });
      }
    },
    //获取管理员自评数据
    getAssessmentData() {
      getAssessmentByListId(this.listId).then(res => {
        this.assessments = res.tableContent;
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
  }
};
</script>

